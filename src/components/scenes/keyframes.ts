// Tiny helpers for writing long, multi-actor SVG animations as one shared
// timeline in seconds. Every actor gets its own @keyframes over the same loop.
export type Frame = [seconds: number, css: string];

export function timeline(loop: number) {
  const pct = (s: number) => `${+((s / loop) * 100).toFixed(3)}%`;
  return {
    kf: (name: string, frames: Frame[]) => `@keyframes ${name}{${frames.map(([s, css]) => `${pct(s)}{${css}}`).join("")}}`,
    // Alternating leg/arm swing during the given [start, end] windows, rest otherwise.
    swing: (name: string, windows: [number, number][], deg = 24, step = 0.22) => {
      const frames: Frame[] = [[0, "transform:rotate(0deg)"]];
      for (const [a, b] of windows) {
        frames.push([a, "transform:rotate(0deg)"]);
        let sign = 1;
        for (let t = a + step; t < b; t += step, sign *= -1) frames.push([t, `transform:rotate(${sign * deg}deg)`]);
        frames.push([b, "transform:rotate(0deg)"]);
      }
      frames.push([loop, "transform:rotate(0deg)"]);
      return `@keyframes ${name}{${frames.map(([s, css]) => `${pct(s)}{${css}}`).join("")}}`;
    },
  };
}
