// Shared flat-illustration parts so every scene uses the same people and taxi.
// Origin is at the feet (people) or the bottom-left of the rear wheel arch (taxi).

export function Person({ skin, hair, coat, legs, scarf, cap }: { skin: string; hair: string; coat: string; legs: string; scarf?: string; cap?: boolean }) {
  return (
    <>
      <rect className="leg-a pivot-top" x="-6" y="-30" width="6" height="30" rx="3" fill={legs} />
      <rect className="leg-b pivot-top" x="0" y="-30" width="6" height="30" rx="3" fill={legs} />
      <rect x="-11" y="-64" width="22" height="38" rx="9" fill={coat} />
      {scarf && <rect x="-8" y="-64" width="16" height="6" rx="3" fill={scarf} />}
      <circle cx="0" cy="-74" r="9" fill={skin} />
      <path d="M -9 -76 Q -8 -86 0 -85 Q 9 -86 9 -75 Q 5 -80 -9 -76Z" fill={hair} />
      {cap && <rect x="-4" y="-88" width="16" height="6" rx="2" fill="#0b1b3a" />}
      <circle cx="3" cy="-75" r="1.1" fill="#14284f" />
      <path d="M 1 -70 Q 4 -68 6 -70" stroke="#14284f" strokeWidth="1" fill="none" strokeLinecap="round" />
    </>
  );
}

export function Suitcase({ color = "#e85d75" }: { color?: string }) {
  return (
    <>
      <rect x="-1.5" y="-44" width="3" height="16" fill="#3a3f4b" />
      <rect x="-12" y="-30" width="24" height="28" rx="4" fill={color} />
      <rect x="-12" y="-20" width="24" height="3" fill="#000" opacity="0.15" />
      <circle cx="-7" cy="-1" r="2.5" fill="#14284f" />
      <circle cx="7" cy="-1" r="2.5" fill="#14284f" />
    </>
  );
}

// Side-on taxi facing right. Class names let each scene animate the boot, wheels and exhaust.
export function SideTaxi({ prefix, beam = false }: { prefix: string; beam?: boolean }) {
  return (
    <>
      {beam && <path className={`${prefix}-beam`} d="M 150 -36 L 260 -60 L 260 4 Z" fill="#fff6c9" opacity="0.35" />}
      <circle className={`${prefix}-puff`} cx="-6" cy="-14" r="6" fill="#d7dde8" />
      <circle className={`${prefix}-puff p2`} cx="-6" cy="-12" r="5" fill="#d7dde8" />
      <rect x="0" y="-44" width="152" height="32" rx="11" fill="#ffb703" />
      <path d="M 30 -44 L 48 -68 L 108 -68 L 128 -44 Z" fill="#ffb703" />
      <path d="M 36 -46 L 52 -64 L 76 -64 L 76 -46 Z M 80 -46 L 80 -64 L 104 -64 L 120 -46 Z" fill="#9ed0ff" />
      <rect x="64" y="-77" width="26" height="9" rx="2" fill="#14284f" />
      <text x="77" y="-70" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#ffb703">
        TAXI
      </text>
      <rect x="0" y="-30" width="152" height="3" fill="#14284f" opacity="0.4" />
      <rect x="92" y="-40" width="8" height="2.5" rx="1" fill="#14284f" />
      <rect x="146" y="-38" width="6" height="6" rx="2" fill="#fffbe0" />
      <rect x="0" y="-40" width="5" height="7" rx="2" fill="#ff4d4d" />
      <rect className={`${prefix}-boot pivot-right`} x="0" y="-48" width="32" height="6" rx="3" fill="#e7a300" />
      {[32, 120].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="-10" r="12" fill="#14284f" />
          <g className={`${prefix}-wheel pivot-center`}>
            <circle cx={cx} cy="-10" r="5.5" fill="#c9d3e3" />
            <rect x={cx - 1} y="-16" width="2" height="12" fill="#14284f" />
          </g>
        </g>
      ))}
    </>
  );
}

export const pivots = `.pivot-top{transform-box:fill-box;transform-origin:50% 0}
.pivot-center{transform-box:fill-box;transform-origin:50% 50%}
.pivot-right{transform-box:fill-box;transform-origin:100% 50%}
.pivot-bottom{transform-box:fill-box;transform-origin:50% 100%}`;

export function Bubble({ className, text, w }: { className: string; text: string; w: number }) {
  return (
    <g className={`${className} pivot-bottom`}>
      <rect x={-w / 2} y="-128" width={w} height="28" rx="14" fill="#fff" stroke="#e2e8f2" />
      <path d="M -4 -101 L 2 -93 L 6 -101Z" fill="#fff" />
      <text x="0" y="-110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#14284f">
        {text}
      </text>
    </g>
  );
}
