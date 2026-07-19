import type { Exercice } from '../content/types'

/** Normalise une saisie texte : minuscules, sans accents, espaces réduits. */
export function normaliser(valeur: string): string {
  return valeur
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // retire les accents
    .replace(/\s+/g, ' ')
}

/**
 * Vérifie la réponse de l'enfant à un exercice.
 * `reponse` est le format brut renvoyé par le composant d'exercice :
 *  - qcm       → index (number) du choix
 *  - saisie    → texte (string)
 *  - vraiFaux  → booléen
 *  - texteATrous → texte (string)
 */
export function verifierReponse(
  exercice: Exercice,
  reponse: number | string | boolean,
): boolean {
  switch (exercice.type) {
    case 'qcm':
      return reponse === exercice.bonneReponse
    case 'saisie':
      return (
        typeof reponse === 'string' &&
        normaliser(reponse) === normaliser(exercice.reponse)
      )
    case 'vraiFaux':
      return reponse === exercice.estVrai
    case 'texteATrous':
      return (
        typeof reponse === 'string' &&
        normaliser(reponse) === normaliser(exercice.reponse)
      )
  }
}
