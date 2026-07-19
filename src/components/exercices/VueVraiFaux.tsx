import type { ExerciceVraiFaux } from '../../content/types'
import s from './Exercices.module.css'

interface Props {
  exercice: ExerciceVraiFaux
  valeur: boolean | null
  onChange: (v: boolean) => void
  revele: boolean
}

export function VueVraiFaux({ exercice, valeur, onChange, revele }: Props) {
  const options: { label: string; val: boolean }[] = [
    { label: '👍 Vrai', val: true },
    { label: '👎 Faux', val: false },
  ]
  return (
    <div>
      <p className={s.affirmation}>« {exercice.affirmation} »</p>
      <div className={s.vraiFaux}>
        {options.map(({ label, val }) => {
          const selectionne = valeur === val
          const estBon = val === exercice.estVrai
          let etat = ''
          if (revele) {
            if (estBon) etat = s.bon
            else if (selectionne) etat = s.mauvais
          } else if (selectionne) {
            etat = s.selectionne
          }
          return (
            <button
              key={label}
              type="button"
              disabled={revele}
              className={`${s.optionChoix} ${etat}`}
              onClick={() => onChange(val)}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
