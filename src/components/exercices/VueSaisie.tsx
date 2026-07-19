import type { ExerciceSaisie } from '../../content/types'
import s from './Exercices.module.css'

interface Props {
  exercice: ExerciceSaisie
  valeur: string
  onChange: (v: string) => void
  revele: boolean
  correct: boolean
  onEntree: () => void
}

export function VueSaisie({
  exercice,
  valeur,
  onChange,
  revele,
  correct,
  onEntree,
}: Props) {
  const etat = revele ? (correct ? s.bon : s.mauvais) : ''
  return (
    <div>
      <p className={s.question}>{exercice.question}</p>
      <div className={s.champWrap}>
        <input
          className={`${s.champ} ${etat}`}
          value={valeur}
          disabled={revele}
          placeholder={exercice.placeholder}
          autoFocus
          inputMode="text"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onEntree()
          }}
        />
      </div>
    </div>
  )
}
