import type { Lecon } from '../types'

/** Leçon CE2 — Nombres et calcul : les tables de multiplication de 2 à 5. */
export const tables2a5: Lecon = {
  id: 'maths-tables-2-a-5',
  matiere: 'maths',
  domaine: 'Nombres et calcul',
  titre: 'Les tables de multiplication (2 à 5)',
  objectif: 'Mémoriser et utiliser les tables de 2, 3, 4 et 5.',
  emoji: '✖️',
  cours: [
    {
      titre: 'Multiplier, c’est quoi ?',
      texte:
        'Multiplier, c’est additionner plusieurs fois le même nombre. Le signe « × » se lit « fois ».',
      exemple: '4 × 3 = 4 + 4 + 4 = 12',
    },
    {
      titre: 'La table de 2 : on double !',
      texte:
        'Multiplier par 2, c’est prendre le nombre deux fois, autrement dit le doubler.',
      exemple: '2 × 6 = 6 + 6 = 12',
    },
    {
      titre: 'L’astuce de la table de 5',
      texte:
        'Dans la table de 5, tous les résultats se terminent par 0 ou par 5. Pratique pour vérifier !',
      exemple: '5 × 4 = 20 · 5 × 7 = 35',
    },
  ],
  exercices: [
    {
      id: 'ex1',
      type: 'qcm',
      consigne: 'Choisis le bon résultat.',
      question: 'Combien font 3 × 4 ?',
      choix: ['7', '12', '34', '9'],
      bonneReponse: 1,
      explication: '3 × 4 = 4 + 4 + 4 = 12.',
    },
    {
      id: 'ex2',
      type: 'saisie',
      consigne: 'Écris le résultat.',
      question: '5 × 6 = ?',
      reponse: '30',
      placeholder: 'un nombre',
      explication: 'Dans la table de 5, on ajoute 5 six fois : 30.',
    },
    {
      id: 'ex3',
      type: 'vraiFaux',
      consigne: 'Vrai ou faux ?',
      affirmation: '2 × 8 = 16',
      estVrai: true,
      explication: '2 × 8, c’est 8 doublé : 16. C’est bien vrai !',
    },
    {
      id: 'ex4',
      type: 'saisie',
      consigne: 'Écris le résultat.',
      question: '4 × 7 = ?',
      reponse: '28',
      placeholder: 'un nombre',
      explication: '4 × 7 = 28.',
    },
    {
      id: 'ex5',
      type: 'qcm',
      consigne: 'Quelle multiplication donne 15 ?',
      question: 'Trouve celle qui est égale à 15.',
      choix: ['3 × 4', '5 × 3', '2 × 7', '4 × 5'],
      bonneReponse: 1,
      explication: '5 × 3 = 15.',
    },
    {
      id: 'ex6',
      type: 'vraiFaux',
      consigne: 'Vrai ou faux ?',
      affirmation: '5 × 5 = 20',
      estVrai: false,
      explication: 'Attention : 5 × 5 = 25, pas 20.',
    },
    {
      id: 'ex7',
      type: 'saisie',
      consigne: 'Écris le résultat.',
      question: '3 × 9 = ?',
      reponse: '27',
      placeholder: 'un nombre',
      explication: '3 × 9 = 27.',
    },
    {
      id: 'ex8',
      type: 'qcm',
      consigne: 'Choisis le bon résultat.',
      question: '2 × 9 = ?',
      choix: ['11', '18', '20', '16'],
      bonneReponse: 1,
      explication: '2 × 9, c’est 9 doublé : 18.',
    },
  ],
}
