import { Link, Outlet, useLocation } from 'react-router-dom'
import { useGameStore } from '../store/useGameStore'
import styles from './Layout.module.css'

export function Layout() {
  const xp = useGameStore((s) => s.xp)
  const location = useLocation()
  const surAccueil = location.pathname === '/'

  return (
    <div className={styles.app}>
      <header className={styles.entete}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoBadge}>👾</span>
          <span>koaedu</span>
        </Link>

        <div className={styles.droite}>
          <Link to="/profil" className={styles.xp} title="Mon profil">
            <span className={styles.xpEclair}>⚡</span>
            <span className={styles.xpValeur}>{xp}</span>
            <span className={styles.xpLabel}>XP</span>
          </Link>
        </div>
      </header>

      <main className={surAccueil ? styles.mainAccueil : styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
