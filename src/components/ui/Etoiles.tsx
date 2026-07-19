import styles from './Etoiles.module.css'

interface Props {
  valeur: number
  sur?: number
  taille?: number
}

/** Affiche des étoiles pleines / vides (score d'une leçon). */
export function Etoiles({ valeur, sur = 3, taille = 22 }: Props) {
  return (
    <span className={styles.rangee} style={{ fontSize: taille }} aria-label={`${valeur} étoiles sur ${sur}`}>
      {Array.from({ length: sur }, (_, i) => (
        <span key={i} className={i < valeur ? styles.pleine : styles.vide}>
          ★
        </span>
      ))}
    </span>
  )
}
