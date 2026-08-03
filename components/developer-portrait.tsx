export function DeveloperPortrait({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 600"
      className={className}
      role="img"
      aria-label="Stylised geometric portrait of developer Kaito Mercer"
      fill="none"
    >
      {/* Background */}
      <rect width="480" height="600" fill="#0d0d0d" />

      {/* Registration marks — brutalist framing device */}
      <g stroke="#2a2a2a" strokeWidth="1">
        <path d="M24 24h16M24 24v16" />
        <path d="M456 24h-16M456 24v16" />
        <path d="M24 576h16M24 576v-16" />
        <path d="M456 576h-16M456 576v-16" />
      </g>

      {/* Faint construction grid */}
      <g stroke="#1c1c1c" strokeWidth="1">
        <line x1="240" y1="0" x2="240" y2="600" />
        <line x1="0" y1="300" x2="480" y2="300" />
        <circle cx="240" cy="270" r="150" />
        <circle cx="240" cy="270" r="210" />
      </g>

      {/* Portrait — geometric bust built from strokes */}
      <g stroke="#e8e6e1" strokeWidth="2.5" strokeLinecap="square">
        {/* Head outline */}
        <path d="M175 190 Q175 110 240 108 Q305 110 305 190 L300 250 Q296 300 240 305 Q184 300 180 250 Z" />
        {/* Neck */}
        <path d="M212 302 L210 340 M268 302 L270 340" />
        {/* Shoulders / torso */}
        <path d="M140 470 Q145 380 210 342" />
        <path d="M340 470 Q335 380 270 342" />
        <path d="M140 470 L140 600 M340 470 L340 600" />
        {/* Collar / jacket V */}
        <path d="M210 342 L240 400 L270 342" />
        <path d="M196 360 L240 430 L284 360" strokeWidth="1.5" />
      </g>

      {/* Face details — minimal geometric features */}
      <g stroke="#e8e6e1" strokeWidth="2" strokeLinecap="square">
        {/* Glasses */}
        <rect x="192" y="195" width="42" height="30" />
        <rect x="246" y="195" width="42" height="30" />
        <line x1="234" y1="207" x2="246" y2="207" />
        <line x1="192" y1="205" x2="178" y2="200" />
        <line x1="288" y1="205" x2="302" y2="200" />
        {/* Eyes */}
        <line x1="205" y1="210" x2="220" y2="210" />
        <line x1="260" y1="210" x2="275" y2="210" />
        {/* Nose */}
        <path d="M240 225 L236 252 L246 254" />
        {/* Mouth — flat, focused */}
        <line x1="222" y1="275" x2="258" y2="275" />
      </g>

      {/* Hair — angular block */}
      <path
        d="M175 195 Q170 105 240 102 Q310 105 305 195 L296 168 Q288 140 240 138 Q192 140 184 168 Z"
        fill="#e8e6e1"
      />

      {/* Acid green accents */}
      <g stroke="#c8f31d" strokeWidth="2.5" strokeLinecap="square">
        {/* Code brackets flanking the figure */}
        <path d="M96 250 L72 300 L96 350" />
        <path d="M384 250 L408 300 L384 350" />
        {/* Cursor blink line under bust */}
        <line x1="196" y1="520" x2="284" y2="520" />
      </g>

      {/* Terminal prompt inside torso */}
      <g fill="#c8f31d">
        <text
          x="240"
          y="505"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="20"
          letterSpacing="2"
        >
          &gt; whoami_
        </text>
      </g>

      {/* Scan lines — screen-print texture */}
      <g stroke="#161616" strokeWidth="1">
        {Array.from({ length: 30 }, (_, i) => (
          <line key={i} x1="0" y1={20 * i + 10} x2="480" y2={20 * i + 10} />
        ))}
      </g>

      {/* Coordinate label — archival index motif */}
      <text
        x="40"
        y="566"
        fontFamily="monospace"
        fontSize="11"
        letterSpacing="3"
        fill="#6b6b6b"
      >
        FIG. 01 — OPERATOR
      </text>
      <text
        x="440"
        y="566"
        textAnchor="end"
        fontFamily="monospace"
        fontSize="11"
        letterSpacing="3"
        fill="#c8f31d"
      >
        EST. 2018
      </text>
    </svg>
  )
}
