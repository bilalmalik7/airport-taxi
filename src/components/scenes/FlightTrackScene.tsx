import { timeline } from "./keyframes";

// 10-second loop: plane flies Tenerife → Glasgow, status flips ON TIME → DELAYED → LANDED,
// the driver gets the update on their phone and is waiting when the plane lands.
const LOOP = 10;
const { kf } = timeline(LOOP);
const ARC = "M 80 230 Q 300 10 520 170";

const show = (name: string, from: number, to: number) =>
  kf(name, [[0, "opacity:0;transform:translateY(6px)"], [Math.max(from - 0.01, 0), "opacity:0;transform:translateY(6px)"], [from + 0.3, "opacity:1;transform:none"], [to - 0.3, "opacity:1;transform:none"], [to, "opacity:0;transform:translateY(-6px)"], [LOOP, "opacity:0"]]);

const slide = (name: string, from: number, to: number) =>
  kf(name, [[0, "opacity:0;transform:translateX(40px)"], [from, "opacity:0;transform:translateX(40px)"], [from + 0.4, "opacity:1;transform:none"], [to, "opacity:1;transform:none"], [to + 0.3, "opacity:0;transform:translateX(40px)"], [LOOP, "opacity:0;transform:translateX(40px)"]]);

const css = [
  show("ft-s1", 0, 2.6),
  show("ft-s2", 2.6, 6),
  show("ft-s3", 6, 10),
  slide("ft-n1", 2.9, 5.6),
  slide("ft-n2", 6.3, 9.4),
  kf("ft-car", [[0, "transform:translate(420px,190px)"], [6, "transform:translate(420px,190px)"], [7.4, "transform:translate(484px,190px)"], [10, "transform:translate(484px,190px)"]]),
  `.ft-s1{animation:ft-s1 10s infinite}.ft-s2{animation:ft-s2 10s infinite}.ft-s3{animation:ft-s3 10s infinite}
.ft-n1{animation:ft-n1 10s ease-out infinite}.ft-n2{animation:ft-n2 10s ease-out infinite}
.ft-car{animation:ft-car 10s ease-in-out infinite}
.ft-ring{animation:ft-ring 2s ease-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes ft-ring{from{transform:scale(.4);opacity:.8}to{transform:scale(2.4);opacity:0}}`,
].join("\n");

export default function FlightTrackScene() {
  return (
    <svg className="scene ft-scene" viewBox="0 0 600 320" role="img" aria-label="Live flight tracking: a delayed flight is followed and the driver's pickup time is updated automatically">
      <style>{css}</style>
      <defs>
        <pattern id="ft-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#2a4478" />
        </pattern>
        <linearGradient id="ft-arc" x1="0" x2="1">
          <stop offset="0" stopColor="#5b8bd6" />
          <stop offset="1" stopColor="#ffb703" />
        </linearGradient>
        <clipPath id="ft-clip">
          <rect width="600" height="320" rx="26" />
        </clipPath>
      </defs>
      <g clipPath="url(#ft-clip)">
        <rect width="600" height="320" fill="#0e2148" />
        <rect width="600" height="320" fill="url(#ft-dots)" />
        {/* stylised coastline blobs */}
        <path d="M 420 60 q 40 -20 70 10 q 30 30 10 70 q -10 40 30 60 q 20 30 -20 50 q -50 10 -60 -30 q -20 -40 -50 -60 q -20 -40 20 -100z" fill="#173263" />
        <path d="M 40 200 q 30 -20 60 0 q 20 30 -10 50 q -40 10 -50 -50z" fill="#173263" />

        <path d={ARC} fill="none" stroke="#2f4f8f" strokeWidth="3" strokeDasharray="6 8" />
        <path d={ARC} fill="none" stroke="url(#ft-arc)" strokeWidth="3.5" strokeLinecap="round" pathLength="1" strokeDasharray="1 1">
          <animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.6;1" dur="10s" repeatCount="indefinite" />
        </path>

        {[
          [80, 230, "TFS", "Tenerife"],
          [520, 170, "GLA", "Glasgow"],
        ].map(([x, y, code, city]) => (
          <g key={code as string}>
            <circle className="ft-ring" cx={x as number} cy={y as number} r="8" fill="none" stroke="#ffb703" strokeWidth="2" />
            <circle cx={x as number} cy={y as number} r="6" fill="#ffb703" />
            <text x={x as number} y={(y as number) + 24} textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">
              {code as string}
            </text>
            <text x={x as number} y={(y as number) + 38} textAnchor="middle" fontSize="9" fill="#9fb3d9">
              {city as string}
            </text>
          </g>
        ))}

        <g>
          <animateMotion dur="10s" repeatCount="indefinite" rotate="auto" keyPoints="0;1;1" keyTimes="0;0.6;1" calcMode="spline" keySplines="0.4 0 0.6 1;0 0 1 1" path={ARC} />
          <g transform="scale(1.3)">
            <path d="M -16 0 Q -16 -3 -10 -3 L 12 -3 Q 18 -3 19 0 Q 18 3 12 3 L -10 3 Q -16 3 -16 0Z" fill="#fff" />
            <path d="M -2 0 L -10 -12 L -6 -12 L 7 0Z" fill="#c5d3ea" />
            <path d="M -2 0 L -10 12 L -6 12 L 7 0Z" fill="#aebfdc" />
            <path d="M -16 -1 L -20 -8 L -16 -8 L -11 -2Z" fill="#ffb703" />
          </g>
        </g>

        {/* little taxi heading to the terminal */}
        <g className="ft-car">
          <rect x="-14" y="-8" width="28" height="9" rx="3" fill="#ffb703" />
          <path d="M -8 -8 L -4 -14 L 6 -14 L 10 -8Z" fill="#ffb703" />
          <circle cx="-7" cy="2" r="3" fill="#fff" />
          <circle cx="7" cy="2" r="3" fill="#fff" />
        </g>

        {/* flight status card */}
        <g transform="translate(24 22)">
          <rect width="190" height="74" rx="14" fill="#fff" />
          <text x="16" y="24" fontSize="10" fontWeight="700" fill="#5d6880">
            FLIGHT EZY6922 · TFS → GLA
          </text>
          <g className="ft-s1">
            <rect x="16" y="36" width="80" height="24" rx="12" fill="#e5f6ec" />
            <text x="56" y="52" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1f9d63">
              ON TIME
            </text>
          </g>
          <g className="ft-s2">
            <rect x="16" y="36" width="120" height="24" rx="12" fill="#fff4dc" />
            <text x="76" y="52" textAnchor="middle" fontSize="11" fontWeight="800" fill="#e85d00">
              DELAYED +35 MIN
            </text>
          </g>
          <g className="ft-s3">
            <rect x="16" y="36" width="96" height="24" rx="12" fill="#e5f6ec" />
            <text x="64" y="52" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1f9d63">
              LANDED ✓
            </text>
          </g>
        </g>

        {/* driver phone notifications */}
        <g transform="translate(330 232)">
          <g className="ft-n1">
            <rect width="250" height="56" rx="14" fill="#fff" />
            <text x="16" y="23" fontSize="10" fontWeight="700" fill="#5d6880">
              📲 DRIVER UPDATE
            </text>
            <text x="16" y="42" fontSize="12" fontWeight="800" fill="#14284f">
              Flight delayed: pickup moved to 06:20
            </text>
          </g>
          <g className="ft-n2">
            <rect width="250" height="56" rx="14" fill="#fff" />
            <text x="16" y="23" fontSize="10" fontWeight="700" fill="#5d6880">
              🚕 YOUR DRIVER
            </text>
            <text x="16" y="42" fontSize="12" fontWeight="800" fill="#14284f">
              Waiting in arrivals with your name
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
}
