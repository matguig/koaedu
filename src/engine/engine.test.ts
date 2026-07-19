import { describe, it, expect } from 'vitest'
import { verifierReponse, normaliser } from './validation'
import { calculerResultat, etoilesPour } from './scoring'
import type {
  ExerciceQCM,
  ExerciceSaisie,
  ExerciceVraiFaux,
  ExerciceTexteATrous,
} from '../content/types'

const qcm: ExerciceQCM = {
  id: 'q',
  type: 'qcm',
  consigne: '',
  question: '3 × 4 ?',
  choix: ['7', '12', '9'],
  bonneReponse: 1,
}

const saisie: ExerciceSaisie = {
  id: 's',
  type: 'saisie',
  consigne: '',
  question: '5 × 6 ?',
  reponse: '30',
}

const vf: ExerciceVraiFaux = {
  id: 'v',
  type: 'vraiFaux',
  consigne: '',
  affirmation: '2 × 8 = 16',
  estVrai: true,
}

const trou: ExerciceTexteATrous = {
  id: 't',
  type: 'texteATrous',
  consigne: '',
  avant: 'je',
  apres: '.',
  reponse: 'chante',
}

describe('verifierReponse', () => {
  it('valide un QCM par index', () => {
    expect(verifierReponse(qcm, 1)).toBe(true)
    expect(verifierReponse(qcm, 0)).toBe(false)
  })

  it('valide une saisie en ignorant les espaces', () => {
    expect(verifierReponse(saisie, ' 30 ')).toBe(true)
    expect(verifierReponse(saisie, '31')).toBe(false)
  })

  it('valide un vrai/faux', () => {
    expect(verifierReponse(vf, true)).toBe(true)
    expect(verifierReponse(vf, false)).toBe(false)
  })

  it('valide un texte à trous sans tenir compte des accents ni de la casse', () => {
    expect(verifierReponse(trou, 'Chante')).toBe(true)
    expect(verifierReponse(trou, 'chanté')).toBe(true) // tolérance accents
    expect(verifierReponse(trou, 'chantent')).toBe(false)
  })
})

describe('normaliser', () => {
  it('retire accents et casse', () => {
    expect(normaliser('  Éléphant ')).toBe('elephant')
  })
})

describe('scoring', () => {
  it('attribue les étoiles selon le pourcentage', () => {
    expect(etoilesPour(100)).toBe(3)
    expect(etoilesPour(90)).toBe(3)
    expect(etoilesPour(75)).toBe(2)
    expect(etoilesPour(50)).toBe(1)
    expect(etoilesPour(40)).toBe(0)
  })

  it('calcule le résultat et le bonus sans faute', () => {
    const parfait = calculerResultat(8, 8)
    expect(parfait.pourcentage).toBe(100)
    expect(parfait.etoiles).toBe(3)
    expect(parfait.xpGagne).toBe(8 * 10 + 25)

    const moyen = calculerResultat(4, 8)
    expect(moyen.pourcentage).toBe(50)
    expect(moyen.etoiles).toBe(1)
    expect(moyen.xpGagne).toBe(40)
  })
})
