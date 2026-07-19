import type { Lecon } from '../types'

/** Leçon CE2 — Conjugaison : le présent des verbes du 1er groupe (en -er). */
export const presentVerbesEr: Lecon = {
  id: 'francais-present-verbes-er',
  matiere: 'francais',
  domaine: 'Conjugaison',
  titre: 'Le présent des verbes en -er',
  objectif: 'Conjuguer les verbes du 1er groupe au présent de l’indicatif.',
  emoji: '✍️',
  cours: [
    {
      titre: 'Les verbes du 1er groupe',
      texte:
        'Les verbes en -er sont les verbes du 1er groupe : chanter, jouer, dessiner… À l’infinitif, ils se terminent tous par -er.',
      exemple: 'chanter · jouer · manger · travailler',
    },
    {
      titre: 'Les terminaisons du présent',
      texte:
        'On enlève le -er et on ajoute : je -e, tu -es, il/elle -e, nous -ons, vous -ez, ils/elles -ent.',
      exemple: 'je chante · nous chantons · vous chantez · ils chantent',
    },
    {
      titre: 'Attention au « -ent » !',
      texte:
        'Le -ent de « ils chantent » ne s’entend pas, mais il faut toujours l’écrire.',
      exemple: 'Ils jouent (et non « ils joue »)',
    },
  ],
  exercices: [
    {
      id: 'ex1',
      type: 'texteATrous',
      consigne: 'Complète avec le verbe « chanter » bien conjugué.',
      avant: 'Tous les matins, je',
      apres: 'sous la douche.',
      reponse: 'chante',
      placeholder: 'le verbe',
      explication: 'Avec « je », le verbe en -er prend -e : je chante.',
    },
    {
      id: 'ex2',
      type: 'qcm',
      consigne: 'Choisis la bonne forme.',
      question: 'Nous ___ au ballon.',
      choix: ['joue', 'jouons', 'jouez', 'jouent'],
      bonneReponse: 1,
      explication: 'Avec « nous », la terminaison est -ons : nous jouons.',
    },
    {
      id: 'ex3',
      type: 'texteATrous',
      consigne: 'Complète avec le verbe « manger ».',
      avant: 'Vous',
      apres: 'une pomme.',
      reponse: 'mangez',
      placeholder: 'le verbe',
      explication: 'Avec « vous », la terminaison est -ez : vous mangez.',
    },
    {
      id: 'ex4',
      type: 'vraiFaux',
      consigne: 'Cette phrase est-elle bien conjuguée ?',
      affirmation: 'Ils regardent la télé.',
      estVrai: true,
      explication: 'Avec « ils », on écrit -ent : ils regardent. C’est correct !',
    },
    {
      id: 'ex5',
      type: 'qcm',
      consigne: 'Quelle terminaison va avec « tu » ?',
      question: 'tu chant___',
      choix: ['-e', '-es', '-ons', '-ez'],
      bonneReponse: 1,
      explication: 'Avec « tu », la terminaison est -es : tu chantes.',
    },
    {
      id: 'ex6',
      type: 'texteATrous',
      consigne: 'Complète avec le verbe « dessiner ».',
      avant: 'Elle',
      apres: 'un soleil.',
      reponse: 'dessine',
      placeholder: 'le verbe',
      explication: 'Avec « elle », la terminaison est -e : elle dessine.',
    },
    {
      id: 'ex7',
      type: 'vraiFaux',
      consigne: 'Cette phrase est-elle bien conjuguée ?',
      affirmation: 'Nous parlez français.',
      estVrai: false,
      explication: 'Avec « nous », il faut dire « nous parlons ».',
    },
    {
      id: 'ex8',
      type: 'texteATrous',
      consigne: 'Complète avec le verbe « travailler ».',
      avant: 'Les élèves',
      apres: 'bien en classe.',
      reponse: 'travaillent',
      placeholder: 'le verbe',
      explication: 'Avec « ils/elles », on écrit -ent : ils travaillent.',
    },
  ],
}
