import type { ExerciceTexteATrous } from '../../content/types'
import s from './Exercices.module.css'

interface Props {
  exercice: ExerciceTexteATrous
  valeur: string
  onChange: (v: string) => void
  revele: boolean
  correct: boolean
  onEntree: () => void
}

export function VueTexteATrous({
  exercice,
  valeur,
  onChange,
  revele,
  correct,
  onEntree,
}: Props) {
  const etat = revele ? (correct ? s.bon : s.mauvais) : ''
  return (
    <p className={s.ligneTrou}>
      <span>{exercice.avant}</span>
      <input
        className={`${s.champ} ${s.champTrou} ${etat}`}
        value={valeur}
        disabled={revele}
        placeholder={exercice.placeholder ?? '…'}
        autoFocus
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onEntree()
        }}
      />
      <span>{exercice.apres}</span>
    </p>
  )
}
