import { Link } from 'react-router-dom'
import { matieres, getLecon } from '../content'
import { useGameStore } from '../store/useGameStore'
import { Mascotte } from '../components/Mascotte'
import { Etoiles } from '../components/ui/Etoiles'
import s from './routes.module.css'

export function Profil() {
  const xp = useGameStore((st) => st.xp)
  const progression = useGameStore((st) => st.progression)
  const reinitialiser = useGameStore((st) => st.reinitialiser)

  const leconsTerminees = Object.values(progression).filter((p) => p.terminee).length
  const etoilesTotal = Object.entries(progression).reduce((total, [id, p]) => {
    return getLecon(id) ? total + p.meilleuresEtoiles : total
  }, 0)

  return (
    <div>
      <div className={s.centre}>
        <Mascotte humeur="content" taille={130} />
        <h1 className={s.titrePage}>Mon profil</h1>
      </div>

      <div className={s.profilStats}>
        <div className={s.statCarte}>
          <div className={s.statValeur}>{xp}</div>
          <div className={s.statLabel}>⚡ XP</div>
        </div>
        <div className={s.statCarte}>
          <div className={s.statValeur}>{etoilesTotal}</div>
          <div className={s.statLabel}>⭐ Étoiles</div>
        </div>
        <div className={s.statCarte}>
          <div className={s.statValeur}>{leconsTerminees}</div>
          <div className={s.statLabel}>✅ Leçons finies</div>
        </div>
      </div>

      <h2 style={{ marginBottom: 14 }}>Mes leçons</h2>
      <div className={s.listeLecons}>
        {matieres.flatMap((matiere) =>
          matiere.lecons.map((lecon) => {
            const prog = progression[lecon.id]
            return (
              <Link key={lecon.id} to={`/lecon/${lecon.id}`} className={s.carteLecon}>
                <span className={s.leconEmoji}>{lecon.emoji}</span>
                <div className={s.leconTexte}>
                  <h3 className={s.leconTitre}>{lecon.titre}</h3>
                  <span className={s.leconDomaine}>
                    {matiere.nom} · {lecon.domaine}
                  </span>
                </div>
                <div className={s.leconDroite}>
                  {prog?.terminee ? (
                    <Etoiles valeur={prog.meilleuresEtoiles} />
                  ) : (
                    <span className={s.leconDomaine}>À faire</span>
                  )}
                </div>
              </Link>
            )
          }),
        )}
      </div>

      <div className={s.centre}>
        <button
          className={s.lienReset}
          onClick={() => {
            if (confirm('Effacer toute ta progression ?')) reinitialiser()
          }}
        >
          Réinitialiser ma progression
        </button>
      </div>
    </div>
  )
}
