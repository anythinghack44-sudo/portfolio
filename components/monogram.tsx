export function Monogram({ className = 'size-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Kaito Mercer home"
      fill="none"
      strokeWidth="1.5"
    >
      <rect x="0.5" y="0.5" width="31" height="31" stroke="currentColor" />
      {/* Stylised K — two strokes, matching the mark in the mockups */}
      <path
        d="M10 8.5v15M10 16l7.5-7.5M13.5 12.5L21.5 23.5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}
