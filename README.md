# koaedu 👾

Jeu éducatif web pour enfants, inspiré par le principe des logiciels
ludo-éducatifs des années 90 (leçon → exercices → récompense), avec une
mascotte compagnon qui guide et encourage.

> Univers, nom et visuels **100 % originaux**. Aucun contenu emprunté à une
> marque existante.

**Niveau visé pour le moment : CE2** (Mathématiques et Français).

## Le concept

- **Une mascotte compagnon** (Zubi, un petit extraterrestre maison) qui
  explique, réagit et félicite.
- **La boucle d'apprentissage** : cours court → série d'exercices avec
  feedback immédiat → bilan (étoiles + XP) → mini-jeu récompense.
- **Progression & autonomie** : XP, étoiles par leçon, suivi personnel,
  navigable seul par l'enfant.

## Stack

React 19 + TypeScript · Vite · React Router · Zustand (état + persistance
`localStorage`) · Framer Motion (animations 2D) · **React Three Fiber / Three.js
(3D)** · CSS Modules · Vitest.

## Mascotte 3D

Zubi est affiché en 3D sur l'accueil (`src/components/Zubi3D.tsx`), modèle chargé
depuis `public/models/zubi.glb`. Le chargement de Three.js est `lazy` (chunk
séparé) pour ne pas alourdir les écrans sans 3D.

### Coloration du modèle

Le modèle généré est un « white mesh » (géométrie seule, sans texture). Ses
couleurs sont recréées par **projection de la vue de face** sur les sommets
avant (yeux, joues, bouche, ventre), via :

```bash
npm run bake:mascotte
```

- Sources (hors build) : `assets/source/zubi-white.glb` (mesh nu) et
  `assets/references/*.png` (rendus de référence).
- Sortie : `public/models/zubi.glb` (couleurs par sommet + normales).
- Réglages d'alignement/saturation en variables d'env (voir l'en-tête du script
  `scripts/bake-zubi-colors.mjs`).

Le composant détecte automatiquement des couleurs par sommet **ou** une texture,
donc déposer plus tard un `.glb` texturé au même emplacement fonctionnera sans
changer le code. Limite de la projection : l'avant/3-4 est fidèle, l'arrière
reste turquoise uni.

## Démarrage

```bash
npm install
npm run dev        # serveur de développement
npm run build      # typecheck + build de production
npm run test       # tests unitaires (moteur : validation, scoring)
npm run lint       # oxlint
```

## Structure

```
src/
  routes/        écrans (Accueil, matières, leçon, exercices, bilan, profil)
  components/    Mascotte, ExerciceRunner, ui/, exercices/ (une vue par type)
  content/       contenu pédagogique typé (types.ts, maths/, francais/)
  engine/        validation des réponses + calcul étoiles/XP (+ tests)
  store/         useGameStore (progression + XP, persistés)
  styles/        styles globaux et thème
```

### Ajouter une leçon

Créer un objet `Lecon` typé dans `src/content/maths/` ou
`src/content/francais/`, puis le référencer dans `src/content/index.ts`.
Types d'exercices disponibles : `qcm`, `saisie`, `vraiFaux`, `texteATrous`.

## État d'avancement

- [x] **Phase 0** — Fondations : projet, navigation, mascotte animée, store.
- [x] **Phase 1** — Vertical slice jouable : 1 leçon maths + 1 leçon français
      complètes (cours → exercices → bilan → étoiles/XP), progression persistée.
- [ ] **Phase 2** — Parcours par matière, plusieurs leçons, système d'étoiles complet.
- [ ] **Phase 3** — Mini-jeux récompense.
- [ ] **Phase 4** — Contenu CE2 étoffé, personnalisation de la mascotte, sons.

### Bascule 3D (en cours)

- [x] Socle React Three Fiber : Zubi 3D animé sur l'accueil, chargement `.glb`.
- [x] Couleurs du visage recréées par projection (`npm run bake:mascotte`).
- [ ] Vraie texture PBR (dépliage UV / export texturé) pour un rendu net.
- [ ] Alléger le maillage (~327 k sommets, 17 Mo → décimation).
- [ ] Modèle **riggé** + animations (saut, réflexion, célébration).
- [ ] Généraliser la 3D sur les autres écrans (retours d'exercices, bilan).
