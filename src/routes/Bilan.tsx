import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import type { Resultat } from '../engine/scoring'
import { getLecon } from '../content'
import { Mascotte } from '../components/Mascotte'
import { Etoiles } from '../components/ui/Etoiles'
import { Bouton } from '../components/ui/Bouton'
import s from './routes.module.css'

export function Bilan() {
  const { leconId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const resultat = location.state as Resultat | null
  const lecon = leconId ? getLecon(leconId) : undefined

  // Accès direct sans résultat → on renvoie vers la leçon.
  if (!resultat || !lecon) {
    return <Navigate to={leconId ? `/lecon/${leconId}` : '/matieres'} replace />
  }

  const reussi = resultat.etoiles >= 2
  const message = messagePour(resultat.etoiles)

  return (
    <div className={s.bilan}>
      <Mascotte
        humeur={resultat.etoiles === 3 ? 'celebre' : reussi ? 'content' : 'encourage'}
        taille={170}
        message={message}
      />

      <div className={s.bilanCarte}>
        <Etoiles valeur={resultat.etoiles} taille={44} />
        <p className={s.bilanScore}>
          {resultat.bonnes} / {resultat.total} bonnes réponses
        </p>
        <span className={s.bilanXp}>⚡ +{resultat.xpGagne} XP</span>
      </div>

      <div className={s.recompense}>
        🎁 Mini-jeu récompense : <em>bientôt disponible !</em>
        <br />
        (C’est la prochaine étape du projet 😉)
      </div>

      <div className={s.bilanActions}>
        <Bouton variante="secondaire" onClick={() => navigate(`/exercices/${lecon.id}`)}>
          🔁 Recommencer
        </Bouton>
        <Link to={`/matiere/${lecon.matiere}`}>
          <Bouton>Autres leçons →</Bouton>
        </Link>
      </div>
    </div>
  )
}

function messagePour(etoiles: number): string {
  if (etoiles === 3) return 'Parfait ! Tu es un·e champion·ne ! 🌟'
  if (etoiles === 2) return 'Très bien joué !'
  if (etoiles === 1) return 'Bien, on progresse !'
  return 'On réessaie ensemble ?'
}
