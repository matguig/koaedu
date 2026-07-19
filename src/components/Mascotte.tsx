import type { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Mascotte.module.css'

export type Humeur =
  | 'neutre'
  | 'reflechit'
  | 'content'
  | 'encourage'
  | 'triste'
  | 'celebre'

interface Props {
  humeur?: Humeur
  message?: string
  taille?: number
}

/**
 * Zubi — la mascotte de koaedu.
 * Petit extraterrestre 100 % original (design maison), expressif selon l'humeur.
 * Aucun visuel emprunté à une marque existante.
 */
export function Mascotte({ humeur = 'neutre', message, taille = 140 }: Props) {
  return (
    <div
      className={styles.zone}
      style={{ '--taille': `${taille}px` } as CSSProperties}
    >
      <motion.div
        className={styles.corps}
        animate={
          humeur === 'celebre'
            ? { y: [0, -14, 0], rotate: [0, -4, 4, 0] }
            : { y: [0, -6, 0] }
        }
        transition={{
          duration: humeur === 'celebre' ? 0.7 : 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <VisageAlien humeur={humeur} taille={taille} />
      </motion.div>

      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message}
            className={styles.bulle}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function VisageAlien({ humeur, taille }: { humeur: Humeur; taille: number }) {
  const yeux = expressionYeux(humeur)
  const bouche = expressionBouche(humeur)

  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Zubi, la mascotte"
    >
      {/* Antennes */}
      <g stroke="#0f9b8e" strokeWidth="4" strokeLinecap="round" fill="#25d0bd">
        <line x1="44" y1="30" x2="38" y2="12" />
        <circle cx="37" cy="10" r="5" />
        <line x1="76" y1="30" x2="82" y2="12" />
        <circle cx="83" cy="10" r="5" />
      </g>

      {/* Corps / tête */}
      <ellipse cx="60" cy="66" rx="42" ry="40" fill="#2fe0cb" />
      <ellipse cx="60" cy="66" rx="42" ry="40" fill="url(#brillance)" />
      {/* Ventre plus clair */}
      <ellipse cx="60" cy="78" rx="26" ry="22" fill="#c9fff6" opacity="0.55" />

      {/* Joues qui rougissent quand il est content */}
      {(humeur === 'content' || humeur === 'celebre') && (
        <>
          <circle cx="38" cy="72" r="7" fill="#ff9db0" opacity="0.7" />
          <circle cx="82" cy="72" r="7" fill="#ff9db0" opacity="0.7" />
        </>
      )}

      {/* Yeux */}
      {yeux}

      {/* Bouche */}
      {bouche}

      <defs>
        <radialGradient id="brillance" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

function expressionYeux(humeur: Humeur) {
  const blanc = '#ffffff'
  const pupille = '#12324a'
  if (humeur === 'celebre' || humeur === 'content') {
    // yeux en arcs joyeux
    return (
      <g stroke={pupille} strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M40 58 q6 -8 12 0" />
        <path d="M68 58 q6 -8 12 0" />
      </g>
    )
  }
  if (humeur === 'triste') {
    return (
      <g>
        <circle cx="46" cy="60" r="8" fill={blanc} />
        <circle cx="74" cy="60" r="8" fill={blanc} />
        <circle cx="46" cy="63" r="4" fill={pupille} />
        <circle cx="74" cy="63" r="4" fill={pupille} />
        <path
          d="M38 52 q8 -3 14 1 M68 53 q6 -4 14 -1"
          stroke={pupille}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    )
  }
  if (humeur === 'reflechit') {
    return (
      <g>
        <circle cx="46" cy="60" r="8" fill={blanc} />
        <circle cx="74" cy="60" r="8" fill={blanc} />
        <circle cx="49" cy="58" r="4" fill={pupille} />
        <circle cx="77" cy="58" r="4" fill={pupille} />
      </g>
    )
  }
  // neutre / encourage
  return (
    <g>
      <circle cx="46" cy="60" r="8" fill={blanc} />
      <circle cx="74" cy="60" r="8" fill={blanc} />
      <circle cx="46" cy="60" r="4" fill={pupille} />
      <circle cx="74" cy="60" r="4" fill={pupille} />
      <circle cx="47.5" cy="58.5" r="1.4" fill="#ffffff" />
      <circle cx="75.5" cy="58.5" r="1.4" fill="#ffffff" />
    </g>
  )
}

function expressionBouche(humeur: Humeur) {
  const trait = '#12324a'
  if (humeur === 'celebre') {
    return <path d="M46 82 q14 18 28 0 q-14 6 -28 0Z" fill={trait} />
  }
  if (humeur === 'content') {
    return (
      <path
        d="M46 82 q14 14 28 0"
        stroke={trait}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    )
  }
  if (humeur === 'triste') {
    return (
      <path
        d="M48 88 q12 -12 24 0"
        stroke={trait}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    )
  }
  if (humeur === 'reflechit') {
    return (
      <path
        d="M52 85 q8 4 16 -2"
        stroke={trait}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    )
  }
  // neutre / encourage : petit sourire
  return (
    <path
      d="M50 84 q10 8 20 0"
      stroke={trait}
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
  )
}
