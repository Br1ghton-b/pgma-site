import './Logo.css'

export default function Logo({ variant = 'dark', compact = false }) {
  const toneClass = variant === 'light' ? 'logo-light' : ''

  if (compact) {
    return (
      <span
        className={`logo logo-compact ${toneClass}`}
        aria-label="Purely Graced Aesthetics"
      >
        <span className="logo-cursive">Purely Graced</span>
        <span className="logo-sub">Aesthetics</span>
      </span>
    )
  }

  return (
    <span
      className={`logo logo-full ${toneClass}`}
      aria-label="Purely Graced Aesthetics"
    >
      <svg
        viewBox="0 0 400 220"
        className="logo-svg"
        role="img"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="200"
          y="160"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="170"
          fontWeight="400"
          letterSpacing="10"
          className="logo-pga"
        >
          PGA
        </text>
        <text
          x="200"
          y="108"
          textAnchor="middle"
          fontFamily="Allura, cursive"
          fontSize="78"
          className="logo-script"
        >
          Purely Graced
        </text>
        <text
          x="200"
          y="200"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="14"
          fontWeight="500"
          letterSpacing="7"
          className="logo-ae"
        >
          AESTHETICS
        </text>
      </svg>
    </span>
  )
}
