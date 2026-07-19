import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bouton } from '../components/ui/Bouton'
import s from './routes.module.css'

// three.js est lourd : on ne le charge que lorsque Zubi 3D s'affiche.
const Zubi3D = lazy(() =>
  import('../components/Zubi3D').then((m) => ({ default: m.Zubi3D })),
)

export function Accueil() {
  const navigate = useNavigate()
  return (
    <div className={s.accueil}>
      <div className={s.heroZubi}>
        <Suspense fallback={<div style={{ height: 340 }} />}>
          <Zubi3D humeur="content" hauteur={340} />
        </Suspense>
      </div>
      <p className={s.bulleAccueil}>Salut, moi c’est Zubi ! 👋</p>
      <h1 className={s.accueilTitre}>Bienvenue sur koaedu</h1>
      <p className={s.accueilTexte}>
        Apprends les maths et le français du CE2 en t’amusant avec moi.
        Prêt·e pour l’aventure ?
      </p>
      <Bouton taille="grand" onClick={() => navigate('/matieres')}>
        🚀 Jouer
      </Bouton>
    </div>
  )
}
