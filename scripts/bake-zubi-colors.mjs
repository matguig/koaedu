/**
 * Colorise le mesh nu de Zubi par projection de la vue de face.
 *
 * Le modèle 3D généré (assets/source/zubi-white.glb) est un « white mesh » :
 * géométrie seule, sans texture ni couleur. Ce script projette la vue de face
 * (détectée automatiquement sur la planche 3 vues) sur les sommets orientés vers
 * l'avant, écrit les couleurs par sommet (COLOR_0) + les normales, et exporte
 * public/models/zubi.glb prêt à l'emploi.
 *
 * Usage :  node scripts/bake-zubi-colors.mjs
 * Réglages (env) : SX, SY, OX, OY (alignement), SAT (saturation), FIG (forcer
 * l'index de la figure), FRONT_SIGN, MIRROR_U, BG_TOL.
 *
 * Limite connue : c'est une projection depuis une seule vue (perspective) sur un
 * maillage — l'avant/3-4 est fidèle, l'arrière reste turquoise uni. Pour un
 * rendu parfait, prévoir un vrai dépliage UV + texture (Blender) ou un export
 * texturé.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { PNG } from 'pngjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const GLB_IN = path.join(ROOT, 'assets/source/zubi-white.glb')
const GLB_OUT = path.join(ROOT, 'public/models/zubi.glb')
const IMG = path.join(ROOT, 'assets/references/zubi-turnaround.png')

const N = (k, d) => (process.env[k] ? Number(process.env[k]) : d)
const FRONT_SIGN = N('FRONT_SIGN', 1)
const MIRROR_U = process.env.MIRROR_U === '1'
const SX = N('SX', 0.9) // échelle horizontale
const SY = N('SY', 0.95) // échelle verticale
const OX = N('OX', 0) // décalage horizontal
const OY = N('OY', -0.03) // décalage vertical
const SAT = N('SAT', 1.35) // boost de saturation
const FIG = process.env.FIG !== undefined ? Number(process.env.FIG) : -1
const BG_TOL = N('BG_TOL', 46)

// ---------- image ----------
const png = PNG.sync.read(fs.readFileSync(IMG))
const { width: IW, height: IH, data: PIX } = png
const at = (x, y) => {
  x = Math.max(0, Math.min(IW - 1, x | 0)); y = Math.max(0, Math.min(IH - 1, y | 0))
  const i = (y * IW + x) * 4; return [PIX[i], PIX[i + 1], PIX[i + 2]]
}
const dist = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])
const BG = at(3, 3)
const isBg = (c) => dist(c, BG) < BG_TOL

// segmentation en figures (colonnes)
const colCount = new Array(IW).fill(0)
for (let x = 0; x < IW; x++) { let n = 0; for (let y = 0; y < IH; y++) if (!isBg(at(x, y))) n++; colCount[x] = n }
const seuil = IH * 0.02
const figures = []
let start = -1
for (let x = 0; x < IW; x++) {
  const plein = colCount[x] > seuil
  if (plein && start < 0) start = x
  else if (!plein && start >= 0) { if (x - start > IW * 0.05) figures.push([start, x - 1]); start = -1 }
}
if (start >= 0) figures.push([start, IW - 1])

function analyse([x0, x1]) {
  let y0 = IH, y1 = 0
  for (let x = x0; x <= x1; x++) for (let y = 0; y < IH; y++) if (!isBg(at(x, y))) { if (y < y0) y0 = y; if (y > y1) y1 = y }
  const cx = (x0 + x1) / 2
  let sym = 0, tot = 0
  const w = Math.min(cx - x0, x1 - cx)
  for (let y = y0; y <= y1; y += 3) for (let d = 0; d < w; d += 3) { if ((!isBg(at(cx - d, y))) === (!isBg(at(cx + d, y)))) sym++; tot++ }
  return { x0, x1, y0, y1, symScore: sym / tot }
}
const infos = figures.map(analyse)
const choix = FIG >= 0 ? FIG : infos.reduce((best, f, i) => (f.symScore > infos[best].symScore ? i : best), 0)
const F = infos[choix]
console.log('figures:', infos.map((f) => f.symScore.toFixed(3)).join(', '), '=> face', choix)

function patchAvg(cx, cy, r) {
  let R = 0, G = 0, B = 0, n = 0
  for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) { const c = at(x, y); if (!isBg(c)) { R += c[0]; G += c[1]; B += c[2]; n++ } }
  return n ? [R / n, G / n, B / n] : BG
}
const BASE = patchAvg(F.x0 + (F.x1 - F.x0) * 0.22, F.y0 + (F.y1 - F.y0) * 0.66, 6)

// ---------- GLB ----------
const buf = fs.readFileSync(GLB_IN)
const jsonLen = buf.readUInt32LE(12)
const json = JSON.parse(buf.slice(20, 20 + jsonLen).toString('utf8'))
const binStart = 20 + jsonLen + 8
const bin = buf.slice(binStart, binStart + json.buffers[0].byteLength)
const prim = json.meshes[0].primitives[0]
const acc = json.accessors, bv = json.bufferViews
const posA = acc[prim.attributes.POSITION], idxA = acc[prim.indices]
const V = posA.count
const pos = new Float32Array(bin.buffer, bin.byteOffset + bv[posA.bufferView].byteOffset, V * 3)
const idx = new Uint32Array(bin.buffer, bin.byteOffset + bv[idxA.bufferView].byteOffset, idxA.count)

let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9, cx = 0, cy = 0, cz = 0
for (let i = 0; i < V; i++) {
  const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2]
  if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y
  cx += x; cy += y; cz += z
}
cx /= V; cy /= V; cz /= V

const nrm = new Float32Array(V * 3)
for (let t = 0; t < idx.length; t += 3) {
  const a = idx[t], b = idx[t + 1], c = idx[t + 2]
  const ax = pos[a * 3], ay = pos[a * 3 + 1], az = pos[a * 3 + 2]
  const e1x = pos[b * 3] - ax, e1y = pos[b * 3 + 1] - ay, e1z = pos[b * 3 + 2] - az
  const e2x = pos[c * 3] - ax, e2y = pos[c * 3 + 1] - ay, e2z = pos[c * 3 + 2] - az
  const nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x
  nrm[a * 3] += nx; nrm[a * 3 + 1] += ny; nrm[a * 3 + 2] += nz
  nrm[b * 3] += nx; nrm[b * 3 + 1] += ny; nrm[b * 3 + 2] += nz
  nrm[c * 3] += nx; nrm[c * 3 + 1] += ny; nrm[c * 3 + 2] += nz
}
let outward = 0
for (let i = 0; i < V; i++) {
  let nx = nrm[i * 3], ny = nrm[i * 3 + 1], nz = nrm[i * 3 + 2]
  const len = Math.hypot(nx, ny, nz) || 1; nx /= len; ny /= len; nz /= len
  nrm[i * 3] = nx; nrm[i * 3 + 1] = ny; nrm[i * 3 + 2] = nz
  outward += nx * (pos[i * 3] - cx) + ny * (pos[i * 3 + 1] - cy) + nz * (pos[i * 3 + 2] - cz)
}
if (outward < 0) for (let i = 0; i < nrm.length; i++) nrm[i] = -nrm[i]

const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t) }
const boostSat = (r, g, b) => { const l = 0.3 * r + 0.59 * g + 0.11 * b; const cl = (v) => Math.max(0, Math.min(255, l + (v - l) * SAT)); return [cl(r), cl(g), cl(b)] }

const col = new Uint8Array(V * 4)
for (let i = 0; i < V; i++) {
  const x = pos[i * 3], y = pos[i * 3 + 1]
  const w = smooth(0.05, 0.5, nrm[i * 3 + 2] * FRONT_SIGN)
  let r = BASE[0], g = BASE[1], b = BASE[2]
  if (w > 0) {
    let u = (x - minX) / (maxX - minX); u = 0.5 + (u - 0.5) * SX + OX; if (MIRROR_U) u = 1 - u
    const v = 0.5 + ((maxY - y) / (maxY - minY) - 0.5) * SY + OY
    const sc = at(F.x0 + u * (F.x1 - F.x0), F.y0 + v * (F.y1 - F.y0))
    if (!isBg(sc)) { r += (sc[0] - r) * w; g += (sc[1] - g) * w; b += (sc[2] - b) * w }
  }
  const [sr, sg, sb] = boostSat(r, g, b)
  col[i * 4] = Math.round(sr); col[i * 4 + 1] = Math.round(sg); col[i * 4 + 2] = Math.round(sb); col[i * 4 + 3] = 255
}

// ---------- écriture GLB ----------
const pad4 = (n) => (4 - (n % 4)) % 4
const p0 = pad4(bin.length), offN = bin.length + p0
const nrmBuf = Buffer.from(nrm.buffer, nrm.byteOffset, nrm.byteLength)
const offC = offN + nrmBuf.length
const colBuf = Buffer.from(col.buffer, col.byteOffset, col.byteLength)
const newBin = Buffer.concat([bin, Buffer.alloc(p0), nrmBuf, colBuf])
bv.push({ buffer: 0, byteOffset: offN, byteLength: nrmBuf.length, target: 34962 })
bv.push({ buffer: 0, byteOffset: offC, byteLength: colBuf.length, target: 34962 })
acc.push({ bufferView: bv.length - 2, componentType: 5126, count: V, type: 'VEC3' })
acc.push({ bufferView: bv.length - 1, componentType: 5121, normalized: true, count: V, type: 'VEC4' })
prim.attributes.NORMAL = acc.length - 2
prim.attributes.COLOR_0 = acc.length - 1
json.materials = [{ name: 'zubi', pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], metallicFactor: 0, roughnessFactor: 0.55 } }]
prim.material = 0
json.buffers[0].byteLength = newBin.length
let js = JSON.stringify(json); js += ' '.repeat(pad4(js.length))
const jb = Buffer.from(js, 'utf8')
const total = 12 + 8 + jb.length + 8 + newBin.length
const out = Buffer.alloc(total)
out.writeUInt32LE(0x46546c67, 0); out.writeUInt32LE(2, 4); out.writeUInt32LE(total, 8)
out.writeUInt32LE(jb.length, 12); out.writeUInt32LE(0x4e4f534a, 16); jb.copy(out, 20)
const o = 20 + jb.length
out.writeUInt32LE(newBin.length, o); out.writeUInt32LE(0x004e4942, o + 4); newBin.copy(out, o + 8)
fs.writeFileSync(GLB_OUT, out)
console.log(`écrit ${path.relative(ROOT, GLB_OUT)} (${(out.length / 1e6).toFixed(1)} Mo)`)
