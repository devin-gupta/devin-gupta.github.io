// Lightweight 2D simplex noise (adapted from standard simplex noise algorithm)

const GRAD2 = [
  [1, 1], [-1, 1], [1, -1], [-1, -1],
  [1, 0], [-1, 0], [0, 1], [0, -1],
];

const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;

function buildPerm(seed: number): Uint8Array {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;

  let s = seed;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }

  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  return perm;
}

function dot(g: number[], x: number, y: number): number {
  return g[0] * x + g[1] * y;
}

export function createNoise2D(seed = 42): (x: number, y: number) => number {
  const perm = buildPerm(seed);

  return (x: number, y: number): number => {
    const s = (x + y) * F2;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);

    const t = (i + j) * G2;
    const x0 = x - (i - t);
    const y0 = y - (j - t);

    const i1 = x0 > y0 ? 1 : 0;
    const j1 = x0 > y0 ? 0 : 1;

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;

    const ii = i & 255;
    const jj = j & 255;

    let n0 = 0;
    let n1 = 0;
    let n2 = 0;

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) {
      t0 *= t0;
      const gi = perm[ii + perm[jj]] % 8;
      n0 = t0 * t0 * dot(GRAD2[gi], x0, y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) {
      t1 *= t1;
      const gi = perm[ii + i1 + perm[jj + j1]] % 8;
      n1 = t1 * t1 * dot(GRAD2[gi], x1, y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) {
      t2 *= t2;
      const gi = perm[ii + 1 + perm[jj + 1]] % 8;
      n2 = t2 * t2 * dot(GRAD2[gi], x2, y2);
    }

    return 70 * (n0 + n1 + n2);
  };
}

export function fbm(
  noise: (x: number, y: number) => number,
  x: number,
  y: number,
  octaves = 4,
  lacunarity = 2.2,
  persistence = 0.5,
): number {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let total = 0;

  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise(x * frequency, y * frequency);
    total += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }

  return value / total;
}
