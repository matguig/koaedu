import { Link, useParams } from 'react-router-dom'
import { getMatiere } from '../content'
import { useGameStore } from '../store/useGameStore'
import { Etoiles } from '../components/ui/Etoiles'
import s from './routes.module.css'

export function CarteMatiere() {
  const { matiereId } = useParams()
  const matiere = matiereId ? getMatiere(matiereId) : undefined
  const progression = useGameStore((st) => st.progression)

  if (!matiere) {
    return (
      <div className={s.centre}>
        <p>Matière introuvable.</p>
        <Link to="/matieres" className={s.retour}>← Retour</Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/matieres" className={s.retour}>← Les matières</Link>
      <div className={s.centre}>
        <h1 className={s.titrePage}>
          {matiere.emoji} {matiere.nom}
        </h1>
        <p className={s.sousTitre}>Choisis une leçon pour commencer.</p>
      </div>

      <div className={s.listeLecons}>
        {matiere.lecons.map((lecon) => {
          const prog = progression[lecon.id]
          return (
            <Link key={lecon.id} to={`/lecon/${lecon.id}`} className={s.carteLecon}>
              <span className={s.leconEmoji}>{lecon.emoji}</span>
              <div className={s.leconTexte}>
                <h3 className={s.leconTitre}>{lecon.titre}</h3>
                <span className={s.leconDomaine}>{lecon.domaine}</span>
              </div>
              <div className={s.leconDroite}>
                {prog?.terminee ? (
                  <Etoiles valeur={prog.meilleuresEtoiles} />
                ) : (
                  <span className={s.leconDomaine}>Nouveau</span>
                )}
                <span className={s.leconFleche}>›</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
