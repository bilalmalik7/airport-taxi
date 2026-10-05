import { timeline } from "./keyframes";

// 12-second story at the arrivals door, pure SVG + CSS (no JavaScript):
// doors open → passenger walks out with a case → driver with name board waves →
// driver takes the case and loads the boot → everyone gets in → taxi drives off.
export const MEET_LOOP = 12;
const { kf, swing } = timeline(MEET_LOOP);

const at = (x: number, y: number, o = 1) => `transform:translate(${x}px,${y}px);opacity:${o}`;

const css = [
  kf("mg-door-l", [[0, "transform:translateX(0)"], [0.4, "transform:translateX(0)"], [1, "transform:translateX(-38px)"], [4, "transform:translateX(-38px)"], [4.8, "transform:translateX(0)"], [12, "transform:translateX(0)"]]),
  kf("mg-door-r", [[0, "transform:translateX(0)"], [0.4, "transform:translateX(0)"], [1, "transform:translateX(38px)"], [4, "transform:translateX(38px)"], [4.8, "transform:translateX(0)"], [12, "transform:translateX(0)"]]),
  kf("mg-pax", [[0, at(170, 312, 0)], [1, at(170, 312, 0)], [1.3, at(170, 312)], [4.4, at(300, 312)], [8, at(300, 312)], [8.9, at(500, 312)], [9.1, at(500, 312, 0)], [12, at(170, 312, 0)]]),
  swing("mg-pax-leg", [[1.3, 4.4], [8, 8.9]]),
  swing("mg-pax-leg-b", [[1.3, 4.4], [8, 8.9]], -24),
  kf("mg-case", [
    [0, at(146, 312, 0)], [1.3, at(146, 312)], [4.4, at(276, 312)], [5.9, at(276, 312)], [6.3, at(334, 312)],
    [7.3, at(445, 312)], [7.7, at(462, 296)], [7.85, at(462, 300, 0)], [12, at(146, 312, 0)],
  ]),
  kf("mg-driver", [
    [0, at(400, 312)], [5.3, at(400, 312)], [5.8, at(352, 312)], [6.4, at(352, 312)], [7.3, at(425, 312)],
    [8.2, at(425, 312)], [9, at(560, 312)], [9.15, at(560, 312, 0)], [11.5, at(400, 312, 0)], [11.9, at(400, 312)], [12, at(400, 312)],
  ]),
  swing("mg-driver-leg", [[5.3, 5.8], [6.4, 7.3], [8.2, 9]]),
  swing("mg-driver-leg-b", [[5.3, 5.8], [6.4, 7.3], [8.2, 9]], -24),
  kf("mg-wave", [[0, "transform:rotate(12deg)"], [4.5, "transform:rotate(12deg)"], [4.65, "transform:rotate(160deg)"], [4.85, "transform:rotate(128deg)"], [5.05, "transform:rotate(162deg)"], [5.25, "transform:rotate(128deg)"], [5.45, "transform:rotate(12deg)"], [12, "transform:rotate(12deg)"]]),
  kf("mg-board", [[0, "opacity:1"], [5.2, "opacity:1"], [5.4, "opacity:0"], [11.6, "opacity:0"], [11.9, "opacity:1"], [12, "opacity:1"]]),
  kf("mg-bubble-a", [[0, "opacity:0;transform:scale(.6)"], [4.5, "opacity:0;transform:scale(.6)"], [4.7, "opacity:1;transform:scale(1)"], [6.1, "opacity:1;transform:scale(1)"], [6.3, "opacity:0;transform:scale(.8)"], [12, "opacity:0;transform:scale(.6)"]]),
  kf("mg-bubble-b", [[0, "opacity:0;transform:scale(.6)"], [6.1, "opacity:0;transform:scale(.6)"], [6.3, "opacity:1;transform:scale(1)"], [7.6, "opacity:1;transform:scale(1)"], [7.8, "opacity:0;transform:scale(.8)"], [12, "opacity:0;transform:scale(.6)"]]),
  kf("mg-boot", [[0, "transform:rotate(0deg)"], [6.9, "transform:rotate(0deg)"], [7.2, "transform:rotate(58deg)"], [7.9, "transform:rotate(58deg)"], [8.2, "transform:rotate(0deg)"], [12, "transform:rotate(0deg)"]]),
  kf("mg-car", [[0, at(450, 338)], [9.4, at(450, 338)], [11.4, at(830, 338)], [11.45, at(830, 338, 0)], [11.5, at(450, 338, 0)], [11.9, at(450, 338)], [12, at(450, 338)]]),
  kf("mg-wheel", [[0, "transform:rotate(0deg)"], [9.4, "transform:rotate(0deg)"], [11.4, "transform:rotate(1440deg)"], [12, "transform:rotate(1440deg)"]]),
  kf("mg-puff", [[0, "opacity:0;transform:translate(0,0) scale(.4)"], [9.4, "opacity:0;transform:translate(0,0) scale(.4)"], [9.6, "opacity:.7;transform:translate(-6px,-2px) scale(.8)"], [10.4, "opacity:0;transform:translate(-26px,-10px) scale(1.6)"], [12, "opacity:0"]]),
  kf("mg-heart", [[0, "opacity:0;transform:translateY(0)"], [8.2, "opacity:0;transform:translateY(0)"], [8.5, "opacity:1;transform:translateY(-6px)"], [9.4, "opacity:0;transform:translateY(-22px)"], [12, "opacity:0"]]),
  `.mg-door-l{animation:mg-door-l 12s ease-in-out infinite}
.mg-door-r{animation:mg-door-r 12s ease-in-out infinite}
.mg-pax{animation:mg-pax 12s linear infinite}
.mg-pax .leg-a{animation:mg-pax-leg 12s linear infinite}
.mg-pax .leg-b{animation:mg-pax-leg-b 12s linear infinite}
.mg-case{animation:mg-case 12s linear infinite}
.mg-driver{animation:mg-driver 12s linear infinite}
.mg-driver .leg-a{animation:mg-driver-leg 12s linear infinite}
.mg-driver .leg-b{animation:mg-driver-leg-b 12s linear infinite}
.mg-wave{animation:mg-wave 12s ease-in-out infinite}
.mg-board{animation:mg-board 12s linear infinite}
.mg-bubble-a{animation:mg-bubble-a 12s ease-out infinite}
.mg-bubble-b{animation:mg-bubble-b 12s ease-out infinite}
.mg-boot{animation:mg-boot 12s ease-in-out infinite}
.mg-car{animation:mg-car 12s cubic-bezier(.5,0,.8,.6) infinite}
.mg-wheel{animation:mg-wheel 12s cubic-bezier(.5,0,.8,.6) infinite}
.mg-puff{animation:mg-puff 12s ease-out infinite}
.mg-puff.p2{animation-delay:-11.6s}
.mg-heart{animation:mg-heart 12s ease-out infinite}
.mg-scene .pivot-top{transform-box:fill-box;transform-origin:50% 0}
.mg-scene .pivot-center{transform-box:fill-box;transform-origin:50% 50%}
.mg-scene .pivot-right{transform-box:fill-box;transform-origin:100% 50%}
.mg-scene .pivot-bottom{transform-box:fill-box;transform-origin:50% 100%}
.mg-plane{animation:mg-plane 12s linear infinite}
@keyframes mg-plane{0%{transform:translate(680px,40px) rotate(-8deg)}55%{transform:translate(260px,104px) rotate(-8deg)}55.01%,100%{transform:translate(680px,40px) rotate(-8deg);opacity:0}}`,
].join("\n");

function Person({ skin, hair, coat, legs, scarf }: { skin: string; hair: string; coat: string; legs: string; scarf?: string }) {
  return (
    <>
      <rect className="leg-a pivot-top" x="-6" y="-30" width="6" height="30" rx="3" fill={legs} />
      <rect className="leg-b pivot-top" x="0" y="-30" width="6" height="30" rx="3" fill={legs} />
      <rect x="-11" y="-64" width="22" height="38" rx="9" fill={coat} />
      {scarf && <rect x="-8" y="-64" width="16" height="6" rx="3" fill={scarf} />}
      <circle cx="0" cy="-74" r="9" fill={skin} />
      <path d="M -9 -76 Q -8 -86 0 -85 Q 9 -86 9 -75 Q 5 -80 -9 -76Z" fill={hair} />
      <circle cx="3" cy="-75" r="1.1" fill="#14284f" />
      <path d="M 1 -70 Q 4 -68 6 -70" stroke="#14284f" strokeWidth="1" fill="none" strokeLinecap="round" />
    </>
  );
}

export default function MeetGreetScene() {
  return (
    <svg className="scene mg-scene" viewBox="0 0 640 360" role="img" aria-label="A driver with a name board welcomes a passenger at the arrivals door, loads their suitcase into the taxi boot and drives them home">
      <style>{css}</style>
      <defs>
        <linearGradient id="mg-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8ec5ff" />
          <stop offset="1" stopColor="#dff0ff" />
        </linearGradient>
        <clipPath id="mg-clip">
          <rect width="640" height="360" rx="26" />
        </clipPath>
      </defs>
      <g clipPath="url(#mg-clip)">
        <rect width="640" height="360" fill="url(#mg-sky)" />
        <g fill="#fff" opacity="0.9">
          <ellipse cx="420" cy="60" rx="40" ry="11" />
          <ellipse cx="440" cy="52" rx="20" ry="11" />
          <ellipse cx="580" cy="110" rx="30" ry="8" />
        </g>
        {/* plane coming in to land in the distance */}
        <g className="mg-plane">
          <path d="M -16 0 Q -16 -3 -10 -3 L 12 -3 Q 18 -3 19 0 Q 18 3 12 3 L -10 3 Q -16 3 -16 0Z" fill="#fff" />
          <path d="M -2 0 L -10 -10 L -6 -10 L 6 0Z" fill="#c5d3ea" />
          <path d="M -16 -1 L -20 -8 L -16 -8 L -11 -2Z" fill="#ffb703" />
        </g>

        {/* terminal */}
        <rect x="0" y="84" width="310" height="230" fill="#eef3fb" />
        <rect x="-10" y="72" width="330" height="16" rx="3" fill="#14284f" />
        <rect x="10" y="150" width="290" height="40" rx="4" fill="#9ec5f0" opacity="0.75" />
        <g stroke="#eef3fb" strokeWidth="3">
          <line x1="70" y1="150" x2="70" y2="190" />
          <line x1="130" y1="150" x2="130" y2="190" />
          <line x1="190" y1="150" x2="190" y2="190" />
          <line x1="250" y1="150" x2="250" y2="190" />
        </g>
        <rect x="70" y="100" width="170" height="36" rx="8" fill="#14284f" />
        <text x="155" y="124" textAnchor="middle" fontSize="15" fontWeight="800" fill="#ffb703" letterSpacing="2">
          ✈ ARRIVALS
        </text>
        <rect x="116" y="200" width="96" height="114" fill="#4f7fc0" />
        <rect x="120" y="204" width="88" height="110" fill="#36639f" />
        <g className="mg-door-l">
          <rect x="120" y="204" width="44" height="110" fill="#bfe0ff" opacity="0.9" />
          <rect x="158" y="250" width="3" height="18" rx="1.5" fill="#14284f" />
        </g>
        <g className="mg-door-r">
          <rect x="164" y="204" width="44" height="110" fill="#bfe0ff" opacity="0.9" />
          <rect x="167" y="250" width="3" height="18" rx="1.5" fill="#14284f" />
        </g>
        <rect x="110" y="196" width="108" height="8" fill="#14284f" />

        {/* pavement & road */}
        <rect y="312" width="640" height="14" fill="#cfd6e2" />
        <rect y="324" width="640" height="4" fill="#a8b2c3" />
        <rect y="328" width="640" height="40" fill="#3a3f4b" />
        <line x1="0" y1="346" x2="640" y2="346" stroke="#f2f2f2" strokeWidth="2" strokeDasharray="16 14" />

        {/* taxi (boot on the left) */}
        <g className="mg-car">
          <circle className="mg-puff" cx="-6" cy="-14" r="6" fill="#d7dde8" />
          <circle className="mg-puff p2" cx="-6" cy="-12" r="5" fill="#d7dde8" />
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
          <rect className="mg-boot pivot-right" x="0" y="-48" width="32" height="6" rx="3" fill="#e7a300" />
          {[32, 120].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="-10" r="12" fill="#14284f" />
              <g className="mg-wheel pivot-center">
                <circle cx={cx} cy="-10" r="5.5" fill="#c9d3e3" />
                <rect x={cx - 1} y="-16" width="2" height="12" fill="#14284f" />
              </g>
            </g>
          ))}
        </g>

        {/* suitcase */}
        <g className="mg-case">
          <rect x="-1.5" y="-44" width="3" height="16" fill="#3a3f4b" />
          <rect x="-12" y="-30" width="24" height="28" rx="4" fill="#e85d75" />
          <rect x="-12" y="-20" width="24" height="3" fill="#c94860" />
          <circle cx="-7" cy="-1" r="2.5" fill="#14284f" />
          <circle cx="7" cy="-1" r="2.5" fill="#14284f" />
        </g>

        {/* passenger */}
        <g className="mg-pax">
          <Person skin="#f1c7a5" hair="#7a4a2a" coat="#5b8bd6" legs="#2c3e64" scarf="#ffb703" />
          <rect x="-20" y="-58" width="5" height="22" rx="2.5" fill="#5b8bd6" transform="rotate(35 -17 -58)" />
          <g className="mg-bubble-b pivot-bottom">
            <rect x="-40" y="-122" width="80" height="26" rx="13" fill="#fff" stroke="#e2e8f2" />
            <path d="M -4 -97 L 2 -89 L 6 -97Z" fill="#fff" />
            <text x="0" y="-105" textAnchor="middle" fontSize="11" fontWeight="700" fill="#14284f">
              Thanks! 😊
            </text>
          </g>
        </g>

        {/* driver */}
        <g className="mg-driver">
          <Person skin="#c98d63" hair="#1d1d1d" coat="#14284f" legs="#0b1b3a" />
          <rect x="-11" y="-64" width="6" height="16" fill="#fff" />
          <rect x="-4" y="-88" width="16" height="6" rx="2" fill="#0b1b3a" />
          <rect className="mg-wave pivot-top" x="4" y="-60" width="5" height="22" rx="2.5" fill="#14284f" />
          <g className="mg-board">
            <rect x="-34" y="-62" width="44" height="24" rx="3" fill="#fff" stroke="#14284f" strokeWidth="1.5" />
            <text x="-12" y="-52" textAnchor="middle" fontSize="6" fontWeight="700" fill="#5d6880">
              WELCOME
            </text>
            <text x="-12" y="-43" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#e85d00">
              CAMPBELL
            </text>
          </g>
          <g className="mg-bubble-a pivot-bottom">
            <rect x="-66" y="-130" width="132" height="28" rx="14" fill="#fff" stroke="#e2e8f2" />
            <path d="M -2 -103 L 4 -95 L 8 -103Z" fill="#fff" />
            <text x="0" y="-112" textAnchor="middle" fontSize="11" fontWeight="700" fill="#14284f">
              Welcome to Glasgow! 👋
            </text>
          </g>
          <text className="mg-heart" x="0" y="-100" textAnchor="middle" fontSize="14">
            ⭐
          </text>
        </g>
      </g>
    </svg>
  );
}

// Captions that highlight in step with the scene above.
const steps = [
  { t: [0, 4.4], icon: "🪧", text: "Your driver waits in arrivals with your name board" },
  { t: [4.4, 6.0], icon: "👋", text: "A warm Glasgow welcome as you walk through" },
  { t: [6.0, 8.3], icon: "🧳", text: "Bags carried and loaded for you" },
  { t: [8.3, 12], icon: "🚕", text: "Straight home, no queues, no meter" },
] as const;

export function MeetGreetSteps() {
  const { kf } = timeline(MEET_LOOP);
  const style = steps
    .map((s, i) =>
      [
        kf(`mg-cap-${i}`, [
          [0, "opacity:.45;transform:none"],
          [Math.max(s.t[0] - 0.01, 0), "opacity:.45;transform:none"],
          [s.t[0] + 0.15, "opacity:1;transform:translateX(6px)"],
          [s.t[1] - 0.15, "opacity:1;transform:translateX(6px)"],
          [s.t[1], "opacity:.45;transform:none"],
          [MEET_LOOP, "opacity:.45;transform:none"],
        ]),
        kf(`mg-bar-${i}`, [
          [0, "transform:scaleX(0)"],
          [Math.max(s.t[0] - 0.01, 0), "transform:scaleX(0)"],
          [s.t[1], "transform:scaleX(1)"],
          [s.t[1] + 0.01, "transform:scaleX(0)"],
          [MEET_LOOP, "transform:scaleX(0)"],
        ]),
        `.mg-cap-${i}{animation:mg-cap-${i} 12s linear infinite}.mg-cap-${i} i{animation:mg-bar-${i} 12s linear infinite}`,
      ].join(""),
    )
    .join("");
  return (
    <ol className="scene-steps">
      <style>{style}</style>
      {steps.map((s, i) => (
        <li key={i} className={`mg-cap-${i}`}>
          <span>{s.icon}</span>
          {s.text}
          <i aria-hidden />
        </li>
      ))}
    </ol>
  );
}
