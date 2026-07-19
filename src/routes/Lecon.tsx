import { Link, useNavigate, useParams } from 'react-router-dom'
import { getLecon } from '../content'
import { Mascotte } from '../components/Mascotte'
import { Bouton } from '../components/ui/Bouton'
import s from './routes.module.css'

export function Lecon() {
  const { leconId } = useParams()
  const navigate = useNavigate()
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
    <div>
      <Link to={`/matiere/${lecon.matiere}`} className={s.retour}>
        ← Les leçons
      </Link>

      <div className={s.cours}>
        <div className={s.enteteCours}>
          <Mascotte humeur="neutre" taille={110} />
          <div>
            <h1 className={s.leconTitre} style={{ fontSize: '1.5rem' }}>
              {lecon.titre}
            </h1>
            <p className={s.blocCoursTexte} style={{ color: 'var(--c-texte-doux)' }}>
              🎯 {lecon.objectif}
            </p>
          </div>
        </div>

        {lecon.cours.map((bloc, i) => (
          <div key={i} className={s.blocCours}>
            {bloc.titre && <h2 className={s.blocCoursTitre}>{bloc.titre}</h2>}
            <p className={s.blocCoursTexte}>{bloc.texte}</p>
            {bloc.exemple && <div className={s.exemple}>{bloc.exemple}</div>}
          </div>
        ))}

        <div className={s.actionsCours}>
          <Bouton taille="grand" onClick={() => navigate(`/exercices/${lecon.id}`)}>
            C’est parti ! ✏️
          </Bouton>
        </div>
      </div>
    </div>
  )
}
