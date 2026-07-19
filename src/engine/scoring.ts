/** Points d'expérience gagnés par bonne réponse. */
export const XP_PAR_BONNE_REPONSE = 10
/** Bonus si la leçon est réussie sans aucune erreur. */
export const XP_BONUS_SANS_FAUTE = 25

/** Nombre d'étoiles (0 à 3) selon le pourcentage de réussite. */
export function etoilesPour(pourcentage: number): number {
  if (pourcentage >= 90) return 3
  if (pourcentage >= 70) return 2
  if (pourcentage >= 50) return 1
  return 0
}

export interface Resultat {
  bonnes: number
  total: number
  pourcentage: number
  etoiles: number
  xpGagne: number
}

/** Calcule le résultat final d'une leçon à partir du nombre de bonnes réponses. */
export function calculerResultat(bonnes: number, total: number): Resultat {
  const pourcentage = total > 0 ? Math.round((bonnes / total) * 100) : 0
  const sansFaute = total > 0 && bonnes === total
  const xpGagne =
    bonnes * XP_PAR_BONNE_REPONSE + (sansFaute ? XP_BONUS_SANS_FAUTE : 0)
  return {
    bonnes,
    total,
    pourcentage,
    etoiles: etoilesPour(pourcentage),
    xpGagne,
  }
}
