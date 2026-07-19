import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Exercice } from '../content/types'
import { verifierReponse } from '../engine/validation'
import { Mascotte, type Humeur } from './Mascotte'
import { Bouton } from './ui/Bouton'
import { VueQCM } from './exercices/VueQCM'
import { VueVraiFaux } from './exercices/VueVraiFaux'
import { VueSaisie } from './exercices/VueSaisie'
import { VueTexteATrous } from './exercices/VueTexteATrous'
import styles from './ExerciceRunner.module.css'

type Valeur = number | string | boolean | null

const ENCOURAGEMENTS = ['Bravo !', 'Super !', 'Excellent !', 'Bien joué !', 'Génial !']
const CONSOLATIONS = [
  'Pas grave, on continue !',
  'Presque ! Regarde bien.',
  'Ce n’est rien, on apprend !',
]

interface Props {
  exercices: Exercice[]
  onTermine: (bonnes: number, total: number) => void
}

export function ExerciceRunner({ exercices, onTermine }: Props) {
  const [index, setIndex] = useState(0)
  const [valeur, setValeur] = useState<Valeur>(null)
  const [revele, setRevele] = useState(false)
  const [bonnes, setBonnes] = useState(0)
  const [dernierCorrect, setDernierCorrect] = useState(false)

  const exercice = exercices[index]
  const total = exercices.length

  const peutValider = valeurRemplie(valeur)

  function valider() {
    if (!peutValider || revele) return
    const correct = verifierReponse(exercice, valeur as number | string | boolean)
    setDernierCorrect(correct)
    if (correct) setBonnes((n) => n + 1)
    setRevele(true)
  }

  function continuer() {
    if (index + 1 >= total) {
      onTermine(bonnes, total)
      return
    }
    setIndex((i) => i + 1)
    setValeur(null)
    setRevele(false)
  }

  let humeur: Humeur = 'reflechit'
  let message: string | undefined
  if (revele) {
    humeur = dernierCorrect ? 'content' : 'encourage'
    message = dernierCorrect
      ? ENCOURAGEMENTS[index % ENCOURAGEMENTS.length]
      : CONSOLATIONS[index % CONSOLATIONS.length]
  }

  return (
    <div className={styles.zone}>
      <div className={styles.barre}>
        <div
          className={styles.progression}
          style={{ width: `${(index / total) * 100}%` }}
        />
        <span className={styles.compteur}>
          {index + 1} / {total}
        </span>
      </div>

      <div className={styles.contenu}>
        <div className={styles.mascotte}>
          <Mascotte humeur={humeur} taille={120} message={message} />
        </div>

        <div className={styles.carte}>
          <p className={styles.consigne}>{exercice.consigne}</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={exercice.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2 }}
            >
              {rendreExercice(exercice, valeur, setValeur, revele, valider)}
            </motion.div>
          </AnimatePresence>

          {revele && (
            <motion.div
              className={`${styles.feedback} ${
                dernierCorrect ? styles.feedbackBon : styles.feedbackMauvais
              }`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <strong>{dernierCorrect ? '✅ Bonne réponse !' : '❌ Oups…'}</strong>
              {exercice.explication && <p>{exercice.explication}</p>}
            </motion.div>
          )}

          <div className={styles.actions}>
            {!revele ? (
              <Bouton onClick={valider} disabled={!peutValider} taille="grand">
                Valider
              </Bouton>
            ) : (
              <Bouton onClick={continuer} variante="succes" taille="grand">
                {index + 1 >= total ? 'Voir mon résultat' : 'Continuer'}
              </Bouton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function valeurRemplie(valeur: Valeur): boolean {
  if (valeur === null) return false
  if (typeof valeur === 'string') return valeur.trim().length > 0
  return true
}

function rendreExercice(
  exercice: Exercice,
  valeur: Valeur,
  setValeur: (v: Valeur) => void,
  revele: boolean,
  valider: () => void,
) {
  switch (exercice.type) {
    case 'qcm':
      return (
        <VueQCM
          exercice={exercice}
          valeur={typeof valeur === 'number' ? valeur : null}
          onChange={setValeur}
          revele={revele}
        />
      )
    case 'vraiFaux':
      return (
        <VueVraiFaux
          exercice={exercice}
          valeur={typeof valeur === 'boolean' ? valeur : null}
          onChange={setValeur}
          revele={revele}
        />
      )
    case 'saisie':
      return (
        <VueSaisie
          exercice={exercice}
          valeur={typeof valeur === 'string' ? valeur : ''}
          onChange={setValeur}
          revele={revele}
          correct={verifierReponse(exercice, typeof valeur === 'string' ? valeur : '')}
          onEntree={valider}
        />
      )
    case 'texteATrous':
      return (
        <VueTexteATrous
          exercice={exercice}
          valeur={typeof valeur === 'string' ? valeur : ''}
          onChange={setValeur}
          revele={revele}
          correct={verifierReponse(exercice, typeof valeur === 'string' ? valeur : '')}
          onEntree={valider}
        />
      )
  }
}
