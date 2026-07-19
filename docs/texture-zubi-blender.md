# Texturer Zubi dans Blender (macOS)

Objectif : appliquer les couleurs du visage sur le mesh nu de Zubi et exporter
un `.glb` texturé propre, qu'on branche ensuite dans l'app.

**Fichiers à utiliser**
- Mesh nu : `assets/source/zubi-white.glb`
- Texture de face (prête, fond nettoyé) : `assets/references/zubi-face-front.png`

---

## 0. Préparer Blender sur Mac (une fois)

1. Installe **Blender** (gratuit) depuis [blender.org](https://www.blender.org/download/).
2. `Blender > Settings… > Input` :
   - Coche **Emulate 3 Button Mouse** → sur trackpad, **Option + clic-glisser** fait
     tourner la vue (orbite).
   - Coche **Emulate Numpad** → les touches chiffres du clavier servent aux vues.
3. Navigation trackpad utile :
   - **Orbiter** : Option + glisser (ou deux doigts).
   - **Zoomer** : pincer.
   - **Déplacer** : Shift + Option + glisser.

---

## 1. Importer le mesh

1. `File > Import > glTF 2.0 (.glb/.gltf)` → choisis `assets/source/zubi-white.glb`.
2. Clique sur Zubi pour le sélectionner (contour orange).
3. (Optionnel mais recommandé) **Alléger le mesh** — il fait 327 k sommets :
   - Onglet **Modifier Properties** (clé à molette 🔧) → `Add Modifier > Generate > Decimate`.
   - Mets **Ratio ≈ 0.15**, puis `Ctrl/Cmd + A` sur le modifier → **Apply**.
   - Ça divise le poids par ~7 sans casser la forme (fais-le AVANT les UV).

---

## 2. Déplier les UV (Project From View)

C'est l'étape clé : on projette la vue de face sur le maillage.

1. Oriente la vue pour **voir Zubi bien de face** (son visage face à toi).
   Raccourci : `1` (vue de face). Si tu vois son dos, appuie `Ctrl + 1`.
2. Passe en **Edit Mode** : touche `Tab`.
3. Tout sélectionner : `A`.
4. `U` → **Project From View (Bounds)**.
   → Les UV sont maintenant calées sur ce que tu vois.

---

## 3. Appliquer la texture du visage

1. En haut, bascule un panneau en **UV Editing** (onglet en haut de la fenêtre),
   ou ouvre un **UV Editor** à côté du viewport.
2. Onglet **Material Properties** (la boule 🔴) → **New**.
3. Déplie **Base Color** → clique le petit **point jaune** à gauche → **Image Texture**.
4. **Open** → choisis `assets/references/zubi-face-front.png`.
5. Dans l'**UV Editor**, affiche cette même image (menu Image > Open si besoin).
   Tu vois l'îlot d'UV (le contour du modèle) par-dessus l'image.
6. **Aligne** : sélectionne tout (`A`) dans l'UV Editor, puis avec `G` (déplacer),
   `S` (échelle) fais coïncider **les yeux du contour UV avec les yeux de l'image**.
   C'est ce petit ajustement manuel qui rend le visage net et bien placé.
7. Repasse le viewport en mode rendu **Material Preview** (les sphères en haut à
   droite du viewport) pour voir le résultat en direct.

---

## 4. L'arrière et les côtés

La photo ne montre que l'avant. Deux options :

- **Simple** : sélectionne les faces de l'arrière (en Edit Mode, vue de dos `Ctrl+1`,
  sélection par boîte `B`), crée un **2ᵉ matériau** turquoise uni (Base Color
  turquoise `#1FB0AD`), et `Assign`.
- **Plus poussé** : refais un `U > Project From View` depuis le **profil** (`3`)
  pour les côtés.

Le plus simple suffit largement : l'app montre surtout Zubi de face / trois-quarts.

---

## 5. Exporter

1. `Tab` pour revenir en **Object Mode**.
2. `File > Export > glTF 2.0 (.glb)`.
3. Dans le panneau d'export à droite :
   - Format : **glTF Binary (.glb)**.
   - Section **Data > Material** : laisse **Export**.
   - Section **Data > Textures** (ou "Images") : mode **Automatic / Pack** (les
     images doivent être **embarquées** dans le .glb).
4. Nomme le fichier `zubi.glb` et exporte.

---

## 6. Me le renvoyer

Redépose `zubi.glb` (glisser le fichier, ou commit dans le repo) et je le mets
dans `public/models/zubi.glb`. Le composant lit déjà les textures : ce sera
affiché tel quel, net.

---

### Astuce si les yeux ne tombent pas pile

Le mesh a des yeux **sculptés** : si la texture est légèrement décalée, rejoue
l'étape 2 (Project From View) en orientant la vue exactement comme la photo,
puis re-affine les UV (étape 3.6). 2-3 essais suffisent en général.
