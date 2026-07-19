// Modèle de contenu pédagogique de koaedu.
// Tout le contenu est typé : ajouter une leçon = ajouter un objet conforme à ces types.

export type MatiereId = 'maths' | 'francais'

export type TypeExercice = 'qcm' | 'saisie' | 'vraiFaux' | 'texteATrous'

interface ExerciceBase {
  id: string
  type: TypeExercice
  consigne: string
  /** Message pédagogique affiché après la réponse (bonne ou mauvaise). */
  explication?: string
}

/** Question à choix multiple. */
export interface ExerciceQCM extends ExerciceBase {
  type: 'qcm'
  question: string
  choix: string[]
  /** Index de la bonne réponse dans `choix`. */
  bonneReponse: number
}

/** Saisie d'une réponse (nombre ou mot court). */
export interface ExerciceSaisie extends ExerciceBase {
  type: 'saisie'
  question: string
  reponse: string
  /** Indice affiché dans le champ (ex : « un nombre »). */
  placeholder?: string
}

/** Vrai ou faux. */
export interface ExerciceVraiFaux extends ExerciceBase {
  type: 'vraiFaux'
  affirmation: string
  estVrai: boolean
}

/** Phrase à compléter : `avant` ___ `apres`. */
export interface ExerciceTexteATrous extends ExerciceBase {
  type: 'texteATrous'
  avant: string
  apres: string
  reponse: string
  placeholder?: string
}

export type Exercice =
  | ExerciceQCM
  | ExerciceSaisie
  | ExerciceVraiFaux
  | ExerciceTexteATrous

/** Un bloc du cours (explication courte + exemple facultatif). */
export interface BlocCours {
  titre?: string
  texte: string
  exemple?: string
}

/** Une leçon = un cours + une série d'exercices. */
export interface Lecon {
  id: string
  matiere: MatiereId
  domaine: string
  titre: string
  objectif: string
  emoji: string
  cours: BlocCours[]
  exercices: Exercice[]
}

/** Une matière regroupe plusieurs leçons. */
export interface Matiere {
  id: MatiereId
  nom: string
  emoji: string
  couleur: string
  description: string
  lecons: Lecon[]
}
