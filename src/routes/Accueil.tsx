import { useNavigate } from 'react-router-dom'
import { Mascotte } from '../components/Mascotte'
import { Bouton } from '../components/ui/Bouton'
import s from './routes.module.css'

export function Accueil() {
  const navigate = useNavigate()
  return (
    <div className={s.accueil}>
      <Mascotte humeur="content" taille={180} message="Salut, moi c’est Zubi !" />
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
