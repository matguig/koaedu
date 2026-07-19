import type { ButtonHTMLAttributes } from 'react'
import styles from './Bouton.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'primaire' | 'secondaire' | 'succes'
  taille?: 'normal' | 'grand'
}

export function Bouton({
  variante = 'primaire',
  taille = 'normal',
  className = '',
  ...rest
}: Props) {
  return (
    <button
      className={`${styles.bouton} ${styles[variante]} ${styles[taille]} ${className}`}
      {...rest}
    />
  )
}
