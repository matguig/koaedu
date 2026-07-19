import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows, Center } from '@react-three/drei'
import * as THREE from 'three'
import type { Humeur } from './Mascotte'

const MODELE = '/models/zubi.glb'
const TURQUOISE = '#2fe0cb'

interface Props {
  humeur?: Humeur
  hauteur?: number
  interactif?: boolean
}

/**
 * Affiche Zubi en 3D (React Three Fiber).
 * Le modèle actuel est un « white mesh » (géométrie seule) : on lui applique
 * un matériau turquoise et on recalcule les normales. Dès qu'un .glb TEXTURÉ
 * sera déposé au même emplacement, ses couleurs seront conservées telles quelles.
 */
export function Zubi3D({ humeur = 'neutre', hauteur = 320, interactif = true }: Props) {
  return (
    <div style={{ width: '100%', height: hauteur }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.4, 5], fov: 40 }}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-5, 2, -3]} intensity={0.4} color="#a9c4ff" />
        <Suspense fallback={null}>
          <ModeleZubi humeur={humeur} />
          <ContactShadows
            position={[0, -1.05, 0]}
            opacity={0.35}
            blur={2.6}
            scale={6}
            far={3}
          />
        </Suspense>
        {interactif && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={1.4}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.9}
          />
        )}
      </Canvas>
    </div>
  )
}

function ModeleZubi({ humeur }: { humeur: Humeur }) {
  const { scene } = useGLTF(MODELE)
  const groupe = useRef<THREE.Group>(null)

  // Clone le modèle et prépare le rendu (normales + matériau si non texturé).
  const modele = useMemo(() => {
    const clone = scene.clone(true)
    const matTurquoise = new THREE.MeshStandardMaterial({
      color: new THREE.Color(TURQUOISE),
      roughness: 0.4,
      metalness: 0,
    })
    clone.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (!mesh.isMesh) return
      // Le white mesh n'a pas de normales → sinon éclairage tout plat/noir.
      mesh.geometry.computeVertexNormals()
      const materiau = mesh.material as THREE.MeshStandardMaterial | undefined
      const estTexture = Boolean(materiau && materiau.map)
      if (!estTexture) mesh.material = matTurquoise
      mesh.castShadow = true
    })
    return clone
  }, [scene])

  // Animation « respiration » / rebond selon l'humeur.
  useFrame((state) => {
    if (!groupe.current) return
    const t = state.clock.elapsedTime
    const amplitude = humeur === 'celebre' ? 0.14 : 0.045
    const vitesse = humeur === 'celebre' ? 6 : 1.6
    groupe.current.position.y = Math.abs(Math.sin(t * vitesse)) * amplitude
  })

  return (
    <group ref={groupe} scale={1.35}>
      <Center>
        <primitive object={modele} />
      </Center>
    </group>
  )
}

useGLTF.preload(MODELE)
