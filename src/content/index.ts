import type { Matiere, MatiereId, Lecon } from './types'
import { tables2a5 } from './maths/tables-2-a-5'
import { presentVerbesEr } from './francais/present-verbes-er'

/** Catalogue de toutes les matières et leçons disponibles (CE2). */
export const matieres: Matiere[] = [
  {
    id: 'maths',
    nom: 'Mathématiques',
    emoji: '🔢',
    couleur: 'var(--c-maths)',
    description: 'Compter, calculer et résoudre des problèmes.',
    lecons: [tables2a5],
  },
  {
    id: 'francais',
    nom: 'Français',
    emoji: '📖',
    couleur: 'var(--c-francais)',
    description: 'Lire, écrire et bien conjuguer.',
    lecons: [presentVerbesEr],
  },
]

export function getMatiere(id: string): Matiere | undefined {
  return matieres.find((m) => m.id === id)
}

export function getLecon(id: string): Lecon | undefined {
  for (const matiere of matieres) {
    const lecon = matiere.lecons.find((l) => l.id === id)
    if (lecon) return lecon
  }
  return undefined
}

export function couleurMatiere(id: MatiereId): string {
  return getMatiere(id)?.couleur ?? 'var(--c-primaire)'
}
