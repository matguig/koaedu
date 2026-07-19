import { Link, useNavigate, useParams } from 'react-router-dom'
import { getLecon } from '../content'
import { calculerResultat } from '../engine/scoring'
import { useGameStore } from '../store/useGameStore'
import { ExerciceRunner } from '../components/ExerciceRunner'
import s from './routes.module.css'

export function Exercices() {
  const { leconId } = useParams()
  const navigate = useNavigate()
  const enregistrerResultat = useGameStore((st) => st.enregistrerResultat)
  const lecon = leconId ? getLecon(leconId) : undefined

  if (!lecon) {
    return (
      <div className={s.centre}>
        <p>Leçon introuvable.</p>
        <Link to="/matieres" className={s.retour}>← Retour</Link>
      </div>
    )
  }

  return (
    <ExerciceRunner
      exercices={lecon.exercices}
      onTermine={(bonnes, total) => {
        const resultat = calculerResultat(bonnes, total)
        enregistrerResultat(
          lecon.id,
          resultat.etoiles,
          resultat.pourcentage,
          resultat.xpGagne,
        )
        navigate(`/bilan/${lecon.id}`, { state: resultat })
      }}
    />
  )
}
