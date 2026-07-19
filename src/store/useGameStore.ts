import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ProgressionLecon {
  terminee: boolean
  meilleuresEtoiles: number
  meilleurPourcentage: number
}

interface GameState {
  xp: number
  progression: Record<string, ProgressionLecon>
  /** Enregistre le résultat d'une leçon (ne garde que le meilleur score). */
  enregistrerResultat: (
    leconId: string,
    etoiles: number,
    pourcentage: number,
    xpGagne: number,
  ) => void
  progressionLecon: (leconId: string) => ProgressionLecon | undefined
  reinitialiser: () => void
}

const initial = {
  xp: 0,
  progression: {} as Record<string, ProgressionLecon>,
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initial,

      enregistrerResultat: (leconId, etoiles, pourcentage, xpGagne) =>
        set((state) => {
          const ancienne = state.progression[leconId]
          return {
            xp: state.xp + xpGagne,
            progression: {
              ...state.progression,
              [leconId]: {
                terminee: true,
                meilleuresEtoiles: Math.max(
                  etoiles,
                  ancienne?.meilleuresEtoiles ?? 0,
                ),
                meilleurPourcentage: Math.max(
                  pourcentage,
                  ancienne?.meilleurPourcentage ?? 0,
                ),
              },
            },
          }
        }),

      progressionLecon: (leconId) => get().progression[leconId],

      reinitialiser: () => set({ ...initial }),
    }),
    { name: 'koaedu-progression' },
  ),
)
