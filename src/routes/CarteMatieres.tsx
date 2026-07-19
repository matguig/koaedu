import { Link } from 'react-router-dom'
import { matieres } from '../content'
import s from './routes.module.css'

export function CarteMatieres() {
  return (
    <div>
      <div className={s.centre}>
        <h1 className={s.titrePage}>Choisis ta matière</h1>
        <p className={s.sousTitre}>Sur quoi veux-tu t’entraîner aujourd’hui ?</p>
      </div>

      <div className={s.grilleMatieres}>
        {matieres.map((matiere) => (
          <Link
            key={matiere.id}
            to={`/matiere/${matiere.id}`}
            className={s.carteMatiere}
            style={{ background: matiere.couleur }}
          >
            <span className={s.carteMatiereEmoji}>{matiere.emoji}</span>
            <h2 className={s.carteMatiereNom}>{matiere.nom}</h2>
            <p className={s.carteMatiereDesc}>{matiere.description}</p>
            <span className={s.badgeLecons}>
              {matiere.lecons.length} leçon{matiere.lecons.length > 1 ? 's' : ''}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
