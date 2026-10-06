import { timeline } from "./keyframes";
import { Bubble, Person, pivots, SideTaxi, Suitcase } from "./parts";

// 14-second early-morning pickup: lights come on → taxi arrives with headlights →
// "your driver is outside" → passenger comes out → driver loads the case → off as the sun rises.
const LOOP = 14;
const { kf, swing } = timeline(LOOP);
const at = (x: number, y: number, o = 1) => `transform:translate(${x}px,${y}px);opacity:${o}`;
const easeOut = ";animation-timing-function:cubic-bezier(.2,.7,.3,1)";
const easeIn = ";animation-timing-function:cubic-bezier(.55,0,.9,.45)";
const pop = (name: string, a: number, b: number) =>
  kf(name, [[0, "opacity:0;transform:scale(.6)"], [a, "opacity:0;transform:scale(.6)"], [a + 0.2, "opacity:1;transform:scale(1)"], [b - 0.2, "opacity:1;transform:scale(1)"], [b, "opacity:0;transform:scale(.85)"], [LOOP, "opacity:0;transform:scale(.6)"]]);

const css = [
  pivots,
  kf("hp-car", [[0, at(-220, 338) + easeOut], [2.8, at(240, 338)], [9.6, at(240, 338) + easeIn], [12, at(760, 338)], [LOOP, at(760, 338)]]),
  kf("hp-wheel", [[0, "transform:rotate(0deg)" + easeOut], [2.8, "transform:rotate(720deg)"], [9.6, "transform:rotate(720deg)" + easeIn], [12, "transform:rotate(2160deg)"], [LOOP, "transform:rotate(2160deg)"]]),
  kf("hp-beam", [[0, "opacity:.45"], [9, "opacity:.45"], [12, "opacity:0"], [LOOP, "opacity:0"]]),
  kf("hp-puff", [[0, "opacity:0;transform:scale(.4)"], [9.6, "opacity:0;transform:scale(.4)"], [9.8, "opacity:.7;transform:translate(-6px,-2px) scale(.8)"], [10.6, "opacity:0;transform:translate(-26px,-10px) scale(1.6)"], [LOOP, "opacity:0"]]),
  kf("hp-boot", [[0, "transform:rotate(0deg)"], [5.4, "transform:rotate(0deg)"], [5.7, "transform:rotate(58deg)"], [8, "transform:rotate(58deg)"], [8.3, "transform:rotate(0deg)"], [LOOP, "transform:rotate(0deg)"]]),
  kf("hp-win", [[0, "opacity:0"], [1, "opacity:0"], [1.3, "opacity:1"], [6.4, "opacity:1"], [6.6, "opacity:0"], [LOOP, "opacity:0"]]),
  kf("hp-hall", [[0, "opacity:0"], [3.4, "opacity:0"], [3.6, "opacity:1"], [6.8, "opacity:1"], [7, "opacity:0"], [LOOP, "opacity:0"]]),
  kf("hp-door", [[0, "transform:scaleX(1)"], [5, "transform:scaleX(1)"], [5.4, "transform:scaleX(.18)"], [6.6, "transform:scaleX(.18)"], [7, "transform:scaleX(1)"], [LOOP, "transform:scaleX(1)"]]),
  kf("hp-pax", [[0, at(135, 312, 0)], [5.3, at(135, 312, 0)], [5.6, at(135, 312)], [7, at(225, 312)], [8.2, at(225, 312)], [8.9, at(330, 312)], [9.05, at(330, 312, 0)], [LOOP, at(135, 312, 0)]]),
  swing("hp-pax-leg", [[5.6, 7], [8.2, 8.9]]),
  swing("hp-pax-leg-b", [[5.6, 7], [8.2, 8.9]], -24),
  kf("hp-case", [[0, at(111, 312, 0)], [5.6, at(111, 312)], [7, at(201, 312)], [7.2, at(201, 312)], [7.6, at(250, 312)], [7.9, at(262, 292)], [8.05, at(262, 296, 0)], [LOOP, at(111, 312, 0)]]),
  kf("hp-driver", [[0, at(360, 312, 0)], [3.5, at(360, 312, 0)], [3.8, at(360, 312)], [4.6, at(292, 312)], [8.6, at(292, 312)], [9.3, at(380, 312)], [9.45, at(380, 312, 0)], [LOOP, at(360, 312, 0)]]),
  swing("hp-driver-leg", [[3.8, 4.6], [8.6, 9.3]]),
  swing("hp-driver-leg-b", [[3.8, 4.6], [8.6, 9.3]], -24),
  kf("hp-wave", [[0, "transform:rotate(12deg)"], [6.6, "transform:rotate(12deg)"], [6.8, "transform:rotate(160deg)"], [7, "transform:rotate(128deg)"], [7.2, "transform:rotate(162deg)"], [7.4, "transform:rotate(12deg)"], [LOOP, "transform:rotate(12deg)"]]),
  pop("hp-b-phone", 3, 4.9),
  pop("hp-b-pax", 5.8, 6.9),
  pop("hp-b-driver", 6.9, 8.1),
  kf("hp-dawn", [[0, "opacity:0"], [9, "opacity:0"], [12.5, "opacity:1"], [13.5, "opacity:1"], [LOOP, "opacity:0"]]),
  kf("hp-night", [[0, "opacity:1"], [9, "opacity:1"], [12.5, "opacity:0"], [13.5, "opacity:0"], [LOOP, "opacity:1"]]),
  kf("hp-sun", [[0, "transform:translateY(70px)"], [9, "transform:translateY(70px)"], [13, "transform:translateY(0)"], [13.6, "transform:translateY(0)"], [LOOP, "transform:translateY(70px)"]]),
  `.hp-car{animation:hp-car 14s infinite}.hp-wheel{animation:hp-wheel 14s infinite}
.hp-beam{animation:hp-beam 14s linear infinite}.hp-puff{animation:hp-puff 14s ease-out infinite}.hp-puff.p2{animation-delay:-13.6s}
.hp-boot{animation:hp-boot 14s ease-in-out infinite}
.hp-win{animation:hp-win 14s linear infinite}.hp-hall{animation:hp-hall 14s linear infinite}
.hp-door{animation:hp-door 14s ease-in-out infinite;transform-box:fill-box;transform-origin:0 50%}
.hp-pax{animation:hp-pax 14s linear infinite}.hp-pax .leg-a{animation:hp-pax-leg 14s linear infinite}.hp-pax .leg-b{animation:hp-pax-leg-b 14s linear infinite}
.hp-case{animation:hp-case 14s linear infinite}
.hp-driver{animation:hp-driver 14s linear infinite}.hp-driver .leg-a{animation:hp-driver-leg 14s linear infinite}.hp-driver .leg-b{animation:hp-driver-leg-b 14s linear infinite}
.hp-wave{animation:hp-wave 14s ease-in-out infinite}
.hp-b-phone{animation:hp-b-phone 14s ease-out infinite}.hp-b-pax{animation:hp-b-pax 14s ease-out infinite}.hp-b-driver{animation:hp-b-driver 14s ease-out infinite}
.hp-dawn{animation:hp-dawn 14s linear infinite}.hp-night{animation:hp-night 14s linear infinite}.hp-sun{animation:hp-sun 14s ease-out infinite}
.hp-star{animation:hp-twinkle 2.4s ease-in-out infinite}.hp-star:nth-child(2n){animation-delay:-1.2s}.hp-star:nth-child(3n){animation-delay:-.6s}
@keyframes hp-twinkle{50%{opacity:.2}}
.hp-colon{animation:hp-blink 1s steps(2) infinite}@keyframes hp-blink{50%{opacity:0}}`,
].join("\n");

export default function HomePickupScene() {
  return (
    <svg className="scene hp-scene" viewBox="0 0 640 360" role="img" aria-label="Before dawn, a taxi pulls up outside a house, the driver loads the passenger's suitcase and they drive off to the airport as the sun rises">
      <style>{css}</style>
      <defs>
        <linearGradient id="hp-nightsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#081430" />
          <stop offset="1" stopColor="#24407a" />
        </linearGradient>
        <linearGradient id="hp-dawnsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b8bd6" />
          <stop offset="0.7" stopColor="#ffb98a" />
          <stop offset="1" stopColor="#ffd59a" />
        </linearGradient>
        <radialGradient id="hp-glow">
          <stop offset="0" stopColor="#ffe08a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffe08a" stopOpacity="0" />
        </radialGradient>
        <clipPath id="hp-clip">
          <rect width="640" height="360" rx="26" />
        </clipPath>
      </defs>
      <g clipPath="url(#hp-clip)">
        <rect width="640" height="360" fill="url(#hp-nightsky)" />
        <rect className="hp-dawn" width="640" height="360" fill="url(#hp-dawnsky)" />
        <g className="hp-sun">
          <circle cx="520" cy="250" r="34" fill="#ffd166" />
          <circle cx="520" cy="250" r="60" fill="url(#hp-glow)" />
        </g>
        <g className="hp-night">
          <circle cx="400" cy="64" r="18" fill="#fdf3c8" />
          <circle cx="392" cy="58" r="16" fill="#0e1d42" />
          <g fill="#fff">
            {[
              [60, 40], [130, 80], [210, 30], [300, 64], [380, 26], [450, 90], [610, 120], [250, 110], [500, 40],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} className="hp-star" cx={x} cy={y} r="1.6" />
            ))}
          </g>
        </g>
        {/* distant hills */}
        <path d="M 0 250 Q 140 200 280 240 T 640 230 V 360 H 0Z" fill="#1b3466" opacity="0.8" />

        {/* clock card */}
        <g transform="translate(470 22)">
          <rect width="150" height="54" rx="14" fill="#fff" opacity="0.95" />
          <text x="16" y="30" fontSize="20" fontWeight="800" fill="#14284f">
            04<tspan className="hp-colon">:</tspan>15
          </text>
          <text x="16" y="45" fontSize="9" fontWeight="700" fill="#5d6880">
            FLIGHT 06:30 · GLA
          </text>
          <text x="134" y="32" textAnchor="end" fontSize="18">
            ⏰
          </text>
        </g>

        {/* house */}
        <rect x="40" y="200" width="190" height="114" fill="#e8d9c4" />
        <polygon points="28,204 135,140 242,204" fill="#7a3b2e" />
        <rect x="190" y="150" width="16" height="34" fill="#6b3226" />
        <rect x="60" y="216" width="40" height="32" rx="3" fill="#2b3a5c" />
        <rect className="hp-win" x="60" y="216" width="40" height="32" rx="3" fill="#ffd166" />
        <rect x="170" y="216" width="40" height="32" rx="3" fill="#2b3a5c" />
        <rect x="118" y="244" width="34" height="68" fill="#2b3a5c" />
        <rect className="hp-hall" x="118" y="244" width="34" height="68" fill="#ffd166" />
        <rect className="hp-door" x="118" y="244" width="34" height="68" fill="#b5523b" />
        <circle cx="135" cy="236" r="16" fill="url(#hp-glow)" className="hp-hall" />
        {/* street lamp */}
        <rect x="430" y="210" width="5" height="104" fill="#3a3f4b" />
        <rect x="420" y="204" width="26" height="8" rx="3" fill="#3a3f4b" />
        <circle cx="433" cy="218" r="26" fill="url(#hp-glow)" className="hp-night" />

        {/* pavement & road */}
        <rect y="312" width="640" height="14" fill="#9aa6bb" />
        <rect y="324" width="640" height="4" fill="#7d889d" />
        <rect y="328" width="640" height="40" fill="#2b2f38" />
        <line x1="0" y1="346" x2="640" y2="346" stroke="#d7dde8" strokeWidth="2" strokeDasharray="16 14" />

        <g className="hp-car">
          <SideTaxi prefix="hp" beam />
        </g>
        <g className="hp-case">
          <Suitcase color="#5b8bd6" />
        </g>
        <g className="hp-pax">
          <Person skin="#f1c7a5" hair="#c9a15a" coat="#e85d75" legs="#2c3e64" />
          <Bubble className="hp-b-pax" text="Morning! ☕" w={96} />
        </g>
        <g className="hp-driver">
          <Person skin="#c98d63" hair="#1d1d1d" coat="#14284f" legs="#0b1b3a" cap />
          <rect x="-11" y="-64" width="6" height="16" fill="#fff" />
          <rect className="hp-wave pivot-top" x="4" y="-60" width="5" height="22" rx="2.5" fill="#14284f" />
          <Bubble className="hp-b-driver" text="Let me take that for you 🙂" w={170} />
        </g>
        <g transform="translate(135 222)">
          <Bubble className="hp-b-phone" text="📲 Your driver is outside" w={160} />
        </g>
      </g>
    </svg>
  );
}
