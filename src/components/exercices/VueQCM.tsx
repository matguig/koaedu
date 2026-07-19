import type { ExerciceQCM } from '../../content/types'
import s from './Exercices.module.css'

interface Props {
  exercice: ExerciceQCM
  valeur: number | null
  onChange: (v: number) => void
  revele: boolean
}

export function VueQCM({ exercice, valeur, onChange, revele }: Props) {
  return (
    <div>
      <p className={s.question}>{exercice.question}</p>
      <div className={s.choix}>
        {exercice.choix.map((choix, i) => {
          const selectionne = valeur === i
          const estBon = i === exercice.bonneReponse
          let etat = ''
          if (revele) {
            if (estBon) etat = s.bon
            else if (selectionne) etat = s.mauvais
          } else if (selectionne) {
            etat = s.selectionne
          }
          return (
            <button
              key={i}
              type="button"
              disabled={revele}
              className={`${s.optionChoix} ${etat}`}
              onClick={() => onChange(i)}
            >
              {choix}
            </button>
          )
        })}
      </div>
    </div>
  )
}
