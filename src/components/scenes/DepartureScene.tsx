import { timeline } from "./keyframes";
import { Bubble, Person, pivots, SideTaxi, Suitcase } from "./parts";

// 12-second drop-off: taxi pulls up at Departures → driver unloads the case →
// "Have a great trip!" → passenger walks into the terminal → a plane takes off.
const LOOP = 12;
const { kf, swing } = timeline(LOOP);
const at = (x: number, y: number, o = 1) => `transform:translate(${x}px,${y}px);opacity:${o}`;
const easeOut = ";animation-timing-function:cubic-bezier(.2,.7,.3,1)";
const easeIn = ";animation-timing-function:cubic-bezier(.55,0,.9,.45)";
const pop = (name: string, a: number, b: number) =>
  kf(name, [[0, "opacity:0;transform:scale(.6)"], [a, "opacity:0;transform:scale(.6)"], [a + 0.2, "opacity:1;transform:scale(1)"], [b - 0.2, "opacity:1;transform:scale(1)"], [b, "opacity:0;transform:scale(.85)"], [LOOP, "opacity:0;transform:scale(.6)"]]);

const css = [
  pivots,
  kf("dp-car", [[0, at(-220, 338) + easeOut], [2.5, at(170, 338)], [8, at(170, 338) + easeIn], [10, at(760, 338)], [LOOP, at(760, 338)]]),
  kf("dp-wheel", [[0, "transform:rotate(0deg)" + easeOut], [2.5, "transform:rotate(720deg)"], [8, "transform:rotate(720deg)" + easeIn], [10, "transform:rotate(2160deg)"], [LOOP, "transform:rotate(2160deg)"]]),
  kf("dp-puff", [[0, "opacity:0;transform:scale(.4)"], [8, "opacity:0;transform:scale(.4)"], [8.2, "opacity:.7;transform:translate(-6px,-2px) scale(.8)"], [9, "opacity:0;transform:translate(-26px,-10px) scale(1.6)"], [LOOP, "opacity:0"]]),
  kf("dp-boot", [[0, "transform:rotate(0deg)"], [3.9, "transform:rotate(0deg)"], [4.2, "transform:rotate(58deg)"], [5, "transform:rotate(58deg)"], [5.3, "transform:rotate(0deg)"], [LOOP, "transform:rotate(0deg)"]]),
  kf("dp-driver", [[0, at(300, 312, 0)], [2.7, at(300, 312, 0)], [3, at(300, 312)], [3.8, at(160, 312)], [6.8, at(160, 312)], [7.5, at(300, 312)], [7.65, at(300, 312, 0)], [LOOP, at(300, 312, 0)]]),
  swing("dp-driver-leg", [[3, 3.8], [6.8, 7.5]]),
  swing("dp-driver-leg-b", [[3, 3.8], [6.8, 7.5]], -24),
  kf("dp-wave", [[0, "transform:rotate(12deg)"], [5.6, "transform:rotate(12deg)"], [5.8, "transform:rotate(160deg)"], [6, "transform:rotate(128deg)"], [6.2, "transform:rotate(162deg)"], [6.4, "transform:rotate(128deg)"], [6.6, "transform:rotate(12deg)"], [LOOP, "transform:rotate(12deg)"]]),
  kf("dp-case", [[0, at(196, 300, 0)], [4.2, at(196, 300, 0)], [4.3, at(196, 294)], [4.8, at(226, 312)], [5.6, at(226, 312)], [8, at(476, 312)], [8.2, at(486, 312, 0)], [LOOP, at(196, 300, 0)]]),
  kf("dp-pax", [[0, at(250, 312, 0)], [3.2, at(250, 312, 0)], [3.5, at(250, 312)], [5.6, at(250, 312)], [8, at(500, 312)], [8.2, at(510, 312, 0)], [LOOP, at(250, 312, 0)]]),
  swing("dp-pax-leg", [[5.6, 8]]),
  swing("dp-pax-leg-b", [[5.6, 8]], -24),
  kf("dp-door-l", [[0, "transform:translateX(0)"], [7.3, "transform:translateX(0)"], [7.7, "transform:translateX(-36px)"], [8.4, "transform:translateX(-36px)"], [8.8, "transform:translateX(0)"], [LOOP, "transform:translateX(0)"]]),
  kf("dp-door-r", [[0, "transform:translateX(0)"], [7.3, "transform:translateX(0)"], [7.7, "transform:translateX(36px)"], [8.4, "transform:translateX(36px)"], [8.8, "transform:translateX(0)"], [LOOP, "transform:translateX(0)"]]),
  kf("dp-plane", [[0, "transform:translate(400px,170px) rotate(-14deg) scale(.6);opacity:0"], [8.8, "transform:translate(400px,170px) rotate(-14deg) scale(.6);opacity:0"], [9, "transform:translate(410px,166px) rotate(-14deg) scale(.6);opacity:1"], [11.8, "transform:translate(700px,10px) rotate(-18deg) scale(1.1);opacity:1"], [LOOP, "transform:translate(700px,10px) rotate(-18deg) scale(1.1);opacity:0"]]),
  pop("dp-b-pax", 4.9, 5.8),
  pop("dp-b-driver", 5.5, 7),
  `.dp-car{animation:dp-car 12s infinite}.dp-wheel{animation:dp-wheel 12s infinite}.dp-puff{animation:dp-puff 12s ease-out infinite}.dp-puff.p2{animation-delay:-11.6s}
.dp-boot{animation:dp-boot 12s ease-in-out infinite}
.dp-driver{animation:dp-driver 12s linear infinite}.dp-driver .leg-a{animation:dp-driver-leg 12s linear infinite}.dp-driver .leg-b{animation:dp-driver-leg-b 12s linear infinite}
.dp-wave{animation:dp-wave 12s ease-in-out infinite}
.dp-case{animation:dp-case 12s linear infinite}
.dp-pax{animation:dp-pax 12s linear infinite}.dp-pax .leg-a{animation:dp-pax-leg 12s linear infinite}.dp-pax .leg-b{animation:dp-pax-leg-b 12s linear infinite}
.dp-door-l{animation:dp-door-l 12s ease-in-out infinite}.dp-door-r{animation:dp-door-r 12s ease-in-out infinite}
.dp-plane{animation:dp-plane 12s cubic-bezier(.4,0,.8,.6) infinite}
.dp-b-pax{animation:dp-b-pax 12s ease-out infinite}.dp-b-driver{animation:dp-b-driver 12s ease-out infinite}
.dp-cloud{animation:dp-drift 30s linear infinite}@keyframes dp-drift{from{transform:translateX(-140px)}to{transform:translateX(700px)}}`,
].join("\n");

export default function DepartureScene() {
  return (
    <svg className="scene dp-scene" viewBox="0 0 640 360" role="img" aria-label="A taxi drops a passenger at Departures, the driver unloads their suitcase and waves them off as a plane takes off">
      <style>{css}</style>
      <defs>
        <linearGradient id="dp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6fb1ff" />
          <stop offset="1" stopColor="#e3f1ff" />
        </linearGradient>
        <clipPath id="dp-clip">
          <rect width="640" height="360" rx="26" />
        </clipPath>
      </defs>
      <g clipPath="url(#dp-clip)">
        <rect width="640" height="360" fill="url(#dp-sky)" />
        <g className="dp-cloud" fill="#fff" opacity="0.9">
          <ellipse cx="80" cy="60" rx="40" ry="11" />
          <ellipse cx="100" cy="52" rx="20" ry="11" />
        </g>
        <g className="dp-cloud" style={{ animationDelay: "-14s" }} fill="#fff" opacity="0.75">
          <ellipse cx="60" cy="110" rx="30" ry="8" />
        </g>

        {/* plane takes off from behind the terminal */}
        <g className="dp-plane">
          <path d="M -26 0 Q -26 -5 -18 -5 L 20 -5 Q 30 -5 32 0 Q 30 4 20 4 L -18 4 Q -26 4 -26 0Z" fill="#fdfdfd" />
          <path d="M -4 -1 L -16 -16 L -10 -16 L 8 -1Z" fill="#c5d3ea" />
          <path d="M -4 2 L -12 12 L -7 12 L 6 2Z" fill="#aebfdc" />
          <path d="M -26 -1 L -32 -13 L -26 -13 L -18 -4Z" fill="#ffb703" />
        </g>

        {/* terminal */}
        <rect x="330" y="112" width="320" height="202" fill="#eef3fb" />
        <rect x="320" y="100" width="340" height="16" rx="3" fill="#14284f" />
        <rect x="380" y="128" width="220" height="36" rx="8" fill="#14284f" />
        <text x="490" y="152" textAnchor="middle" fontSize="15" fontWeight="800" fill="#ffb703" letterSpacing="2">
          DEPARTURES ✈
        </text>
        <rect x="340" y="176" width="300" height="20" rx="3" fill="#9ec5f0" opacity="0.75" />
        <rect x="466" y="204" width="88" height="110" fill="#4f7fc0" />
        <rect x="470" y="208" width="80" height="106" fill="#36639f" />
        <rect className="dp-door-l" x="470" y="208" width="40" height="106" fill="#bfe0ff" opacity="0.9" />
        <rect className="dp-door-r" x="510" y="208" width="40" height="106" fill="#bfe0ff" opacity="0.9" />
        <rect x="460" y="200" width="100" height="8" fill="#14284f" />
        <rect x="360" y="230" width="60" height="70" rx="4" fill="#d7e1f2" />
        <text x="390" y="262" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14284f">
          DROP
        </text>
        <text x="390" y="274" textAnchor="middle" fontSize="9" fontWeight="800" fill="#14284f">
          OFF
        </text>

        {/* pavement & road */}
        <rect y="312" width="640" height="14" fill="#cfd6e2" />
        <rect y="324" width="640" height="4" fill="#a8b2c3" />
        <rect y="328" width="640" height="40" fill="#3a3f4b" />
        <line x1="0" y1="346" x2="640" y2="346" stroke="#f2f2f2" strokeWidth="2" strokeDasharray="16 14" />

        <g className="dp-car">
          <SideTaxi prefix="dp" />
        </g>
        <g className="dp-case">
          <Suitcase color="#1f9d63" />
        </g>
        <g className="dp-pax">
          <Person skin="#8d5b3e" hair="#1d1d1d" coat="#ffb703" legs="#2c3e64" />
          <Bubble className="dp-b-pax" text="Thanks! 👋" w={90} />
        </g>
        <g className="dp-driver">
          <Person skin="#c98d63" hair="#1d1d1d" coat="#14284f" legs="#0b1b3a" cap />
          <rect x="-11" y="-64" width="6" height="16" fill="#fff" />
          <rect className="dp-wave pivot-top" x="4" y="-60" width="5" height="22" rx="2.5" fill="#14284f" />
          <Bubble className="dp-b-driver" text="Have a great trip! ✈️" w={140} />
        </g>
      </g>
    </svg>
  );
}
