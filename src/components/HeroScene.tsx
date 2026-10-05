// Pure SVG + SMIL/CSS animation: no JavaScript, so it costs nothing for page speed.
// Timeline (10s loop): car drives pickup → terminal (0–5.5s), plane takes off (5.5–9s).
const ROAD = "M 40 352 C 120 352 150 300 230 304 S 330 352 400 330 S 450 300 478 300";
const RUNWAY_TAKEOFF = "M 330 214 L 470 214 Q 540 214 660 120";

export default function HeroScene() {
  return (
    <svg className="hero-scene" viewBox="0 0 600 400" role="img" aria-label="A taxi driving from a Glasgow home to the airport as a plane takes off">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d3b7a" />
          <stop offset="0.6" stopColor="#5b8bd6" />
          <stop offset="1" stopColor="#ffd59a" />
        </linearGradient>
        <linearGradient id="route" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffb703" />
          <stop offset="1" stopColor="#ff7a00" />
        </linearGradient>
        <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="1" stopColor="#ffb703" stopOpacity="0" />
        </radialGradient>
        <clipPath id="frame">
          <rect width="600" height="400" rx="28" />
        </clipPath>
      </defs>

      <g clipPath="url(#frame)">
        <rect width="600" height="400" fill="url(#sky)" />
        <circle cx="470" cy="110" r="70" fill="url(#sun)" />
        <circle cx="470" cy="110" r="26" fill="#fff1c1" />

        {/* drifting clouds */}
        <g className="cloud cloud-a" fill="#fff" opacity="0.85">
          <ellipse cx="90" cy="70" rx="38" ry="12" />
          <ellipse cx="112" cy="62" rx="22" ry="14" />
        </g>
        <g className="cloud cloud-b" fill="#fff" opacity="0.7">
          <ellipse cx="300" cy="110" rx="46" ry="12" />
          <ellipse cx="282" cy="102" rx="22" ry="12" />
        </g>
        <g className="cloud cloud-c" fill="#fff" opacity="0.6">
          <ellipse cx="520" cy="50" rx="30" ry="9" />
        </g>

        {/* hills */}
        <path d="M0 230 Q 120 170 240 215 T 480 205 T 600 210 V 400 H 0Z" fill="#3c6f8f" opacity="0.55" />

        {/* Glasgow skyline: tenements, the Finnieston Crane and the Armadillo */}
        <g fill="#14284f">
          <rect x="20" y="182" width="26" height="50" />
          <rect x="48" y="166" width="20" height="66" />
          <rect x="70" y="190" width="30" height="42" />
          <rect x="104" y="150" width="14" height="82" />
          <polygon points="104,150 111,136 118,150" />
          <rect x="122" y="176" width="34" height="56" />
          {/* Finnieston Crane */}
          <rect x="176" y="146" width="7" height="86" />
          <rect x="150" y="140" width="80" height="7" />
          <rect x="214" y="147" width="3" height="22" />
          <rect x="172" y="132" width="15" height="9" />
          {/* Armadillo */}
          <path d="M235 232 Q 245 196 262 232Z M250 232 Q 262 190 280 232Z M266 232 Q 280 200 296 232Z" />
        </g>
        <g fill="#ffd166" opacity="0.8">
          <rect x="26" y="192" width="4" height="4" className="win w1" />
          <rect x="54" y="180" width="4" height="4" className="win w2" />
          <rect x="78" y="200" width="4" height="4" className="win w3" />
          <rect x="130" y="186" width="4" height="4" className="win w1" />
          <rect x="142" y="200" width="4" height="4" className="win w2" />
        </g>

        {/* ground */}
        <rect y="228" width="600" height="172" fill="#2f8f5b" />
        <path d="M0 228 H600 V250 Q 300 236 0 252Z" fill="#287a4e" />

        {/* runway */}
        <g>
          <rect x="300" y="206" width="300" height="18" fill="#3a3f4b" />
          <line x1="310" y1="215" x2="600" y2="215" stroke="#f4f4f4" strokeWidth="2" strokeDasharray="12 10" />
        </g>

        {/* airport terminal + tower */}
        <g>
          <rect x="455" y="250" width="135" height="50" rx="4" fill="#e8eef8" />
          <rect x="455" y="250" width="135" height="10" fill="#c5d3ea" />
          <g fill="#7fb1e8">
            <rect x="465" y="266" width="18" height="12" />
            <rect x="489" y="266" width="18" height="12" />
            <rect x="537" y="266" width="18" height="12" />
            <rect x="561" y="266" width="18" height="12" />
          </g>
          <rect x="512" y="278" width="20" height="22" fill="#14284f" />
          <rect x="566" y="190" width="8" height="60" fill="#d7e1f2" />
          <rect x="558" y="178" width="24" height="14" rx="3" fill="#7fb1e8" stroke="#d7e1f2" strokeWidth="3" />
          <circle cx="570" cy="174" r="3" fill="#ff4d4d" className="beacon" />
          <text x="522" y="259" textAnchor="middle" fontSize="7" fontWeight="700" fill="#14284f" letterSpacing="1.5">
            DEPARTURES
          </text>
        </g>

        {/* road */}
        <path d={ROAD} fill="none" stroke="#2b2f38" strokeWidth="22" strokeLinecap="round" />
        <path d={ROAD} fill="none" stroke="#f2f2f2" strokeWidth="2" strokeDasharray="10 12" className="lane" />
        {/* route progress line */}
        <path d={ROAD} fill="none" stroke="url(#route)" strokeWidth="4" strokeLinecap="round" pathLength="1" strokeDasharray="1 1" opacity="0.9">
          <animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.55;1" dur="10s" repeatCount="indefinite" />
        </path>

        {/* pickup house + pin */}
        <g>
          <rect x="22" y="320" width="34" height="24" fill="#f7e3c4" />
          <polygon points="18,322 39,302 60,322" fill="#b5523b" />
          <rect x="34" y="330" width="9" height="14" fill="#14284f" />
          <g className="pin">
            <path d="M39 262 c-10 0 -16 7 -16 15 c0 11 16 25 16 25 s16 -14 16 -25 c0 -8 -6 -15 -16 -15z" fill="#ffb703" />
            <circle cx="39" cy="277" r="5.5" fill="#14284f" />
          </g>
        </g>

        {/* taxi */}
        <g>
          <animateMotion dur="10s" repeatCount="indefinite" rotate="auto" keyPoints="0;1;1" keyTimes="0;0.55;1" calcMode="linear" path={ROAD} />
          <g transform="translate(0 -9)">
            <rect x="-22" y="-8" width="44" height="13" rx="5" fill="#ffb703" />
            <path d="M -13 -8 L -7 -18 L 9 -18 L 15 -8 Z" fill="#ffb703" />
            <path d="M -10 -9 L -6 -16 L 0 -16 L 0 -9 Z M 2 -9 L 2 -16 L 8 -16 L 12 -9 Z" fill="#9ed0ff" />
            <rect x="-6" y="-23" width="12" height="5" rx="1.5" fill="#14284f" />
            <rect x="-22" y="-2" width="44" height="2" fill="#14284f" opacity="0.5" />
            <circle cx="20" cy="-3" r="1.8" fill="#fff" />
            <g className="wheel">
              <circle cx="-12" cy="5" r="5" fill="#14284f" />
              <circle cx="-12" cy="5" r="2" fill="#c9d3e3" />
            </g>
            <g className="wheel">
              <circle cx="12" cy="5" r="5" fill="#14284f" />
              <circle cx="12" cy="5" r="2" fill="#c9d3e3" />
            </g>
          </g>
        </g>

        {/* plane */}
        <g>
          <animateMotion dur="10s" repeatCount="indefinite" rotate="auto" keyPoints="0;0;1;1" keyTimes="0;0.55;0.92;1" calcMode="linear" path={RUNWAY_TAKEOFF} />
          <g transform="translate(0 -6)">
            <path d="M -26 0 Q -26 -5 -18 -5 L 20 -5 Q 30 -5 32 0 Q 30 4 20 4 L -18 4 Q -26 4 -26 0Z" fill="#fdfdfd" />
            <path d="M -4 -1 L -16 -16 L -10 -16 L 8 -1Z" fill="#c5d3ea" />
            <path d="M -4 2 L -12 12 L -7 12 L 6 2Z" fill="#aebfdc" />
            <path d="M -26 -1 L -32 -13 L -26 -13 L -18 -4Z" fill="#ffb703" />
            <g fill="#7fb1e8">
              <circle cx="22" cy="-1" r="1.4" />
              <circle cx="14" cy="-1" r="1.4" />
              <circle cx="8" cy="-1" r="1.4" />
              <circle cx="2" cy="-1" r="1.4" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
