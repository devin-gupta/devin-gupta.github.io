/// <reference types="@webgpu/types" />

'use client';

import { useEffect, useRef } from 'react';
import { createNoise2D, fbm } from '@/lib/simplex-noise';

const BG_RGB: [number, number, number] = [245, 245, 245];
const BG_CSS = `rgb(${BG_RGB[0]}, ${BG_RGB[1]}, ${BG_RGB[2]})`;
const GRID_STEP = 38;
const SPATIAL_UNIT = 1000;
const TEMPORAL_UNIT = 1000;
const KX = 3.6;
const KY = 3.6;
const KTX = 3.0;
const KTY = 2.1;
const ARROW_LENGTH = 7;
const ARROW_ALPHA = 0.16;
const ARROW_LINE_WIDTH = 0.8;
const ARROW_HEAD_SIZE = 2.2;
const ARROW_SEGMENTS = 3;
const PARTICLE_SPEED = 0.55;
const PARTICLE_ALPHA = 0.26;
const PARTICLE_RADIUS = 1.5;
const LINE_FLOATS = 10;
const POINT_FLOATS = 9;

const LINE_SHADER = `
struct Uniforms {
  res: vec2<f32>,
  half: f32,
  pad: f32,
};

@group(0) @binding(0) var<uniform> u: Uniforms;

struct LineIn {
  @location(0) p0: vec2<f32>,
  @location(1) p1: vec2<f32>,
  @location(2) corner: vec2<f32>,
  @location(3) color: vec4<f32>,
};

struct LineOut {
  @builtin(position) position: vec4<f32>,
  @location(0) p0: vec2<f32>,
  @location(1) p1: vec2<f32>,
  @location(2) corner: vec2<f32>,
  @location(3) color: vec4<f32>,
};

@vertex
fn vs_main(in: LineIn) -> LineOut {
  let delta = in.p1 - in.p0;
  let len = length(delta);
  var dir = vec2<f32>(1.0, 0.0);
  if (len > 0.0) { dir = delta / len; }
  let nrm = vec2<f32>(-dir.y, dir.x);
  let center = (in.p0 + in.p1) * 0.5;
  let world = center + dir * (in.corner.x * (len * 0.5 + u.half)) + nrm * (in.corner.y * u.half);
  var out: LineOut;
  out.position = vec4<f32>(
    world.x / u.res.x * 2.0 - 1.0,
    1.0 - world.y / u.res.y * 2.0,
    0.0,
    1.0,
  );
  out.p0 = in.p0;
  out.p1 = in.p1;
  out.corner = in.corner;
  out.color = in.color;
  return out;
}

@fragment
fn fs_main(in: LineOut) -> @location(0) vec4<f32> {
  let delta = in.p1 - in.p0;
  let len = length(delta);
  var dir = vec2<f32>(1.0, 0.0);
  if (len > 0.0) { dir = delta / len; }
  let nrm = vec2<f32>(-dir.y, dir.x);
  let center = (in.p0 + in.p1) * 0.5;
  let world = center + dir * (in.corner.x * (len * 0.5 + u.half)) + nrm * (in.corner.y * u.half);
  let t = clamp(dot(world - in.p0, dir), 0.0, len);
  let dist = length(world - in.p0 - dir * t);
  let alpha = 1.0 - smoothstep(u.half - 1.0, u.half + 1.0, dist);
  return vec4<f32>(in.color.rgb, in.color.a * alpha);
}
`;

const POINT_SHADER = `
struct Uniforms {
  res: vec2<f32>,
  half: f32,
  pad: f32,
};

@group(0) @binding(0) var<uniform> u: Uniforms;

struct PointIn {
  @location(0) pos: vec2<f32>,
  @location(1) corner: vec2<f32>,
  @location(2) color: vec4<f32>,
  @location(3) size: f32,
};

struct PointOut {
  @builtin(position) position: vec4<f32>,
  @location(0) pos: vec2<f32>,
  @location(1) corner: vec2<f32>,
  @location(2) color: vec4<f32>,
  @location(3) size: f32,
};

@vertex
fn vs_main(in: PointIn) -> PointOut {
  let world = in.pos + in.corner * (in.size * 0.5);
  var out: PointOut;
  out.position = vec4<f32>(
    world.x / u.res.x * 2.0 - 1.0,
    1.0 - world.y / u.res.y * 2.0,
    0.0,
    1.0,
  );
  out.pos = in.pos;
  out.corner = in.corner;
  out.color = in.color;
  out.size = in.size;
  return out;
}

@fragment
fn fs_main(in: PointOut) -> @location(0) vec4<f32> {
  let world = in.pos + in.corner * (in.size * 0.5);
  let d = length(world - in.pos);
  let r = in.size * 0.5;
  let alpha = 1.0 - smoothstep(r - 1.0, r + 1.0, d);
  return vec4<f32>(in.color.rgb, in.color.a * alpha);
}
`;

function fieldInput(px: number, py: number, tau: number) {
  return {
    nx: KX * (px / SPATIAL_UNIT) + KTX * (tau / TEMPORAL_UNIT),
    ny: KY * (py / SPATIAL_UNIT) + KTY * (tau / TEMPORAL_UNIT),
  };
}

function depthInput(px: number, py: number, tau: number) {
  return {
    nx: 2 * (px / SPATIAL_UNIT) + 0.6 * (tau / TEMPORAL_UNIT),
    ny: 2 * (py / SPATIAL_UNIT) + 0.6 * (tau / TEMPORAL_UNIT),
  };
}

type Particle = { x: number; y: number };

function mixColor(mix: number, alpha: number): string {
  const r = Math.round(115 * (1 - mix) + 0 * mix);
  const g = Math.round(115 * (1 - mix) + 95 * mix);
  const b = Math.round(120 * (1 - mix) + 165 * mix);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function mixColorRGBA(mix: number, alpha: number): number[] {
  const r = Math.round(115 * (1 - mix) + 0 * mix);
  const g = Math.round(115 * (1 - mix) + 95 * mix);
  const b = Math.round(120 * (1 - mix) + 165 * mix);
  return [r / 255, g / 255, b / 255, alpha];
}

function getParticleCount(width: number): number {
  return width < 768 ? 48 : 95;
}

function wrap(value: number, max: number): number {
  if (value < 0) return value + max;
  if (value >= max) return value - max;
  return value;
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  length: number,
  color: string,
) {
  const tailX = x - Math.cos(angle) * length * 0.35;
  const tailY = y - Math.sin(angle) * length * 0.35;
  const tipX = x + Math.cos(angle) * length * 0.65;
  const tipY = y + Math.sin(angle) * length * 0.65;

  ctx.strokeStyle = color;
  ctx.lineWidth = 0.8;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(tipX, tipY);
  ctx.stroke();

  const headSize = 2.2;
  ctx.beginPath();
  ctx.moveTo(tipX, tipY);
  ctx.lineTo(
    tipX - headSize * Math.cos(angle - 0.45),
    tipY - headSize * Math.sin(angle - 0.45),
  );
  ctx.moveTo(tipX, tipY);
  ctx.lineTo(
    tipX - headSize * Math.cos(angle + 0.45),
    tipY - headSize * Math.sin(angle + 0.45),
  );
  ctx.stroke();
}

type DrawRenderer = {
  resize(w: number, h: number, dpr: number, gridCols: number, gridRows: number): void;
  draw(tau: number, rebuildArrows: boolean): void;
  dispose(): void;
};

type SimAccess = {
  width(): number;
  height(): number;
  gridCols(): number;
  gridRows(): number;
  angleGrid(): Float32Array;
  particles(): Particle[];
  depth(x: number, y: number, tau: number): number;
  sampleAngle(x: number, y: number): number;
  motionScale(): number;
};

function emitSegmentWGSL(
  data: Float32Array,
  vi: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  c: number[],
): number {
  const corners = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, -1],
    [1, 1],
    [-1, 1],
  ];
  for (const [cx, cy] of corners) {
    const o = vi * LINE_FLOATS;
    data[o] = x0;
    data[o + 1] = y0;
    data[o + 2] = x1;
    data[o + 3] = y1;
    data[o + 4] = cx;
    data[o + 5] = cy;
    data[o + 6] = c[0];
    data[o + 7] = c[1];
    data[o + 8] = c[2];
    data[o + 9] = c[3];
    vi += 1;
  }
  return vi;
}

function emitArrowWGSL(
  data: Float32Array,
  vi: number,
  x: number,
  y: number,
  angle: number,
  c: number[],
  scale: number,
): number {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const len = ARROW_LENGTH * scale;
  const head = ARROW_HEAD_SIZE * scale;
  const tailX = x - dx * len * 0.35;
  const tailY = y - dy * len * 0.35;
  const tipX = x + dx * len * 0.65;
  const tipY = y + dy * len * 0.65;
  vi = emitSegmentWGSL(data, vi, tailX, tailY, tipX, tipY, c);
  const hlx = tipX - head * Math.cos(angle - 0.45);
  const hly = tipY - head * Math.sin(angle - 0.45);
  const hrx = tipX - head * Math.cos(angle + 0.45);
  const hry = tipY - head * Math.sin(angle + 0.45);
  vi = emitSegmentWGSL(data, vi, tipX, tipY, hlx, hly, c);
  vi = emitSegmentWGSL(data, vi, tipX, tipY, hrx, hry, c);
  return vi;
}

function buildLineGeometry(
  data: Float32Array,
  sim: SimAccess,
  tau: number,
  gridCols: number,
  gridRows: number,
  dpr: number,
): number {
  const angleGrid = sim.angleGrid();
  let vi = 0;
  for (let j = 0; j < gridRows; j++) {
    const gyCss = GRID_STEP / 2 + j * GRID_STEP;
    const gy = gyCss * dpr;
    for (let i = 0; i < gridCols; i++) {
      const gxCss = GRID_STEP / 2 + i * GRID_STEP;
      const gx = gxCss * dpr;
      const angle = angleGrid[j * gridCols + i];
      const depth = sim.depth(gxCss, gyCss, tau);
      vi = emitArrowWGSL(data, vi, gx, gy, angle, mixColorRGBA(depth * 0.3, ARROW_ALPHA), dpr);
    }
  }
  return vi;
}

function buildPointGeometry(data: Float32Array, sim: SimAccess, tau: number, dpr: number): number {
  const particles = sim.particles();
  const speed = PARTICLE_SPEED * sim.motionScale();
  const size = PARTICLE_RADIUS * 2 * dpr;
  const w = sim.width();
  const h = sim.height();
  let vi = 0;
  for (const p of particles) {
    const angle = sim.sampleAngle(p.x, p.y);
    p.x += Math.cos(angle) * speed;
    p.y += Math.sin(angle) * speed;
    p.x = wrap(p.x, w);
    p.y = wrap(p.y, h);

    const depth = sim.depth(p.x, p.y, tau);
    const c = mixColorRGBA(depth * 0.45, PARTICLE_ALPHA);
    const px = p.x * dpr;
    const py = p.y * dpr;
    const corners = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, -1],
      [1, 1],
      [-1, 1],
    ];
    for (const [cx, cy] of corners) {
      const o = vi * POINT_FLOATS;
      data[o] = px;
      data[o + 1] = py;
      data[o + 2] = cx;
      data[o + 3] = cy;
      data[o + 4] = c[0];
      data[o + 5] = c[1];
      data[o + 6] = c[2];
      data[o + 7] = c[3];
      data[o + 8] = size;
      vi += 1;
    }
  }
  return vi;
}

function createCanvas2DRenderer(canvas: HTMLCanvasElement, sim: SimAccess): DrawRenderer | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let gridCols = 0;
  let gridRows = 0;

  return {
    resize(w: number, h: number, d: number, gc: number, gr: number) {
      width = w;
      height = h;
      dpr = d;
      gridCols = gc;
      gridRows = gr;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    },
    draw(tau: number, _rebuildArrows: boolean) {
      ctx.fillStyle = BG_CSS;
      ctx.fillRect(0, 0, width, height);

      const angleGrid = sim.angleGrid();
      for (let j = 0; j < gridRows; j++) {
        const gy = GRID_STEP / 2 + j * GRID_STEP;
        for (let i = 0; i < gridCols; i++) {
          const gx = GRID_STEP / 2 + i * GRID_STEP;
          const angle = angleGrid[j * gridCols + i];
          const depth = sim.depth(gx, gy, tau);
          drawArrow(ctx, gx, gy, angle, ARROW_LENGTH, mixColor(depth * 0.3, ARROW_ALPHA));
        }
      }

      const speed = PARTICLE_SPEED * sim.motionScale();
      for (const p of sim.particles()) {
        const angle = sim.sampleAngle(p.x, p.y);
        p.x += Math.cos(angle) * speed;
        p.y += Math.sin(angle) * speed;
        p.x = wrap(p.x, width);
        p.y = wrap(p.y, height);

        const depth = sim.depth(p.x, p.y, tau);
        ctx.fillStyle = mixColor(depth * 0.45, PARTICLE_ALPHA);
        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    dispose() {},
  };
}

async function createWebGPURenderer(
  canvas: HTMLCanvasElement,
  sim: SimAccess,
): Promise<DrawRenderer | null> {
  if (!('gpu' in navigator)) return null;

  let adapter: GPUAdapter | null = null;
  try {
    adapter = await navigator.gpu.requestAdapter();
  } catch {
    adapter = null;
  }
  if (!adapter) return null;

  let device: GPUDevice | null = null;
  try {
    device = await adapter.requestDevice();
  } catch {
    device = null;
  }
  if (!device) return null;

  const context = canvas.getContext('webgpu');
  if (!context) return null;
  const format = navigator.gpu.getPreferredCanvasFormat();

  const lineModule = device.createShaderModule({ code: LINE_SHADER });
  const pointModule = device.createShaderModule({ code: POINT_SHADER });

  const uniformData = new Float32Array(4);
  const uniformBuffer = device.createBuffer({
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
        buffer: { type: 'uniform' as const },
      },
    ],
  });
  const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
  });

  const blendState = {
    color: { srcFactor: 'src-alpha' as const, dstFactor: 'one-minus-src-alpha' as const },
    alpha: { srcFactor: 'one' as const, dstFactor: 'one-minus-src-alpha' as const },
  };

  const linePipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
    vertex: {
      module: lineModule,
      entryPoint: 'vs_main',
      buffers: [
        {
          arrayStride: 40,
          stepMode: 'vertex' as const,
          attributes: [
            { shaderLocation: 0, offset: 0, format: 'float32x2' as const },
            { shaderLocation: 1, offset: 8, format: 'float32x2' as const },
            { shaderLocation: 2, offset: 16, format: 'float32x2' as const },
            { shaderLocation: 3, offset: 24, format: 'float32x4' as const },
          ],
        },
      ],
    },
    fragment: {
      module: lineModule,
      entryPoint: 'fs_main',
      targets: [{ format, blend: blendState }],
    },
    primitive: { topology: 'triangle-list' },
  });

  const pointPipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
    vertex: {
      module: pointModule,
      entryPoint: 'vs_main',
      buffers: [
        {
          arrayStride: 36,
          stepMode: 'vertex' as const,
          attributes: [
            { shaderLocation: 0, offset: 0, format: 'float32x2' as const },
            { shaderLocation: 1, offset: 8, format: 'float32x2' as const },
            { shaderLocation: 2, offset: 16, format: 'float32x4' as const },
            { shaderLocation: 3, offset: 32, format: 'float32' as const },
          ],
        },
      ],
    },
    fragment: {
      module: pointModule,
      entryPoint: 'fs_main',
      targets: [{ format, blend: blendState }],
    },
    primitive: { topology: 'triangle-list' },
  });

  let width = 0;
  let height = 0;
  let dpr = 1;
  let gridCols = 0;
  let gridRows = 0;
  let lineVertexBuffer: GPUBuffer | null = null;
  let pointVertexBuffer: GPUBuffer | null = null;
  let lineData = new Float32Array(0);
  let pointData = new Float32Array(0);
  let lastLineCount = 0;

  const resize = (w: number, h: number, d: number, gc: number, gr: number) => {
    width = w;
    height = h;
    dpr = d;
    gridCols = gc;
    gridRows = gr;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.configure({ device, format, alphaMode: 'opaque' });

    uniformData[0] = width * dpr;
    uniformData[1] = height * dpr;
    uniformData[2] = (ARROW_LINE_WIDTH / 2) * dpr;
    device.queue.writeBuffer(uniformBuffer, 0, uniformData);

    const maxArrows = gridCols * gridRows;
    lineData = new Float32Array(maxArrows * ARROW_SEGMENTS * 6 * LINE_FLOATS);
    if (lineVertexBuffer) lineVertexBuffer.destroy();
    lineVertexBuffer = device.createBuffer({
      size: lineData.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    const maxParticles = getParticleCount(width);
    pointData = new Float32Array(maxParticles * 6 * POINT_FLOATS);
    if (pointVertexBuffer) pointVertexBuffer.destroy();
    pointVertexBuffer = device.createBuffer({
      size: pointData.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
  };

  const draw = (tau: number, rebuildArrows: boolean) => {
    if (!lineVertexBuffer || !pointVertexBuffer) return;

    if (rebuildArrows) {
      lastLineCount = buildLineGeometry(lineData, sim, tau, gridCols, gridRows, dpr);
      device.queue.writeBuffer(
        lineVertexBuffer,
        0,
        lineData.subarray(0, lastLineCount * LINE_FLOATS),
      );
    }

    const pointCount = buildPointGeometry(pointData, sim, tau, dpr);
    device.queue.writeBuffer(pointVertexBuffer, 0, pointData.subarray(0, pointCount * POINT_FLOATS));

    const encoder = device.createCommandEncoder();
    const pass = encoder.beginRenderPass({
      colorAttachments: [
        {
          view: context.getCurrentTexture().createView(),
          clearValue: { r: BG_RGB[0] / 255, g: BG_RGB[1] / 255, b: BG_RGB[2] / 255, a: 1 },
          loadOp: 'clear' as const,
          storeOp: 'store' as const,
        },
      ],
    });
    pass.setPipeline(linePipeline);
    pass.setBindGroup(0, bindGroup);
    pass.setVertexBuffer(0, lineVertexBuffer);
    pass.draw(lastLineCount, 1, 0, 0);
    pass.setPipeline(pointPipeline);
    pass.setVertexBuffer(0, pointVertexBuffer);
    pass.draw(pointCount, 1, 0, 0);
    pass.end();
    device.queue.submit([encoder.finish()]);
  };

  return {
    resize,
    draw,
    dispose() {
      if (lineVertexBuffer) lineVertexBuffer.destroy();
      if (pointVertexBuffer) pointVertexBuffer.destroy();
      uniformBuffer.destroy();
      device.destroy();
    },
  };
}

export default function VectorFieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let renderer: DrawRenderer | null = null;
    let animationId = 0;
    let time = 0;
    let frameCount = 0;
    let isVisible = document.visibilityState === 'visible';
    let focused = document.hasFocus();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionScale = reducedMotion ? 0.2 : 1;

    const flowNoise = createNoise2D(42);
    const depthNoise = createNoise2D(99);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let gridCols = 0;
    let gridRows = 0;
    let angleGrid: Float32Array = new Float32Array(0);
    let particles: Particle[] = [];

    const getFieldAngle = (px: number, py: number, tau: number): number => {
      const { nx, ny } = fieldInput(px, py, tau);
      return Math.PI * fbm(flowNoise, nx, ny);
    };

    const getDepth = (px: number, py: number, tau: number): number => {
      const { nx, ny } = depthInput(px, py, tau);
      return (depthNoise(nx, ny) + 1) / 2;
    };

    const spawnParticles = () => {
      const count = getParticleCount(width);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
      }));
    };

    const computeAngleGrid = (tau: number) => {
      for (let j = 0; j < gridRows; j++) {
        const gy = GRID_STEP / 2 + j * GRID_STEP;
        for (let i = 0; i < gridCols; i++) {
          const gx = GRID_STEP / 2 + i * GRID_STEP;
          angleGrid[j * gridCols + i] = getFieldAngle(gx, gy, tau);
        }
      }
    };

    const sampleAngle = (px: number, py: number): number => {
      const fx = (px - GRID_STEP / 2) / GRID_STEP;
      const fy = (py - GRID_STEP / 2) / GRID_STEP;
      const i = Math.max(0, Math.min(gridCols - 1, Math.floor(fx)));
      const j = Math.max(0, Math.min(gridRows - 1, Math.floor(fy)));
      if (gridCols < 2 || gridRows < 2 || i >= gridCols - 1 || j >= gridRows - 1) {
        return angleGrid[j * gridCols + i];
      }
      const tx = Math.min(1, Math.max(0, fx - i));
      const ty = Math.min(1, Math.max(0, fy - j));
      const i00 = j * gridCols + i;
      const i10 = i00 + 1;
      const i01 = i00 + gridCols;
      const i11 = i01 + 1;
      const top = angleGrid[i00] + tx * (angleGrid[i10] - angleGrid[i00]);
      const bot = angleGrid[i01] + tx * (angleGrid[i11] - angleGrid[i01]);
      return top + ty * (bot - top);
    };

    const sim: SimAccess = {
      width: () => width,
      height: () => height,
      gridCols: () => gridCols,
      gridRows: () => gridRows,
      angleGrid: () => angleGrid,
      particles: () => particles,
      depth: getDepth,
      sampleAngle,
      motionScale: () => motionScale,
    };

    const animate = () => {
      if (!isVisible || !renderer) return;

      time += 1;
      frameCount += 1;
      if (focused || frameCount % 2 === 1) {
        const tau = time * motionScale;
        const rebuildArrows = frameCount % 2 === 1;
        if (rebuildArrows) {
          computeAngleGrid(tau);
        }
        renderer.draw(tau, rebuildArrows);
      }
      animationId = requestAnimationFrame(animate);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      gridCols = Math.max(1, Math.ceil(width / GRID_STEP));
      gridRows = Math.max(1, Math.ceil(height / GRID_STEP));
      angleGrid = new Float32Array(gridCols * gridRows);

      spawnParticles();
      computeAngleGrid(0);
      renderer?.resize(width, height, dpr, gridCols, gridRows);
      renderer?.draw(0, true);
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
      if (isVisible) {
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(animate);
      }
    };

    const handleFocus = () => {
      focused = true;
    };

    const handleBlur = () => {
      focused = false;
    };

    (async () => {
      renderer = await createWebGPURenderer(canvas, sim);
      if (!renderer) {
        renderer = createCanvas2DRenderer(canvas, sim);
      }
      if (cancelled || !renderer) {
        renderer?.dispose();
        return;
      }
      resize();
      animationId = requestAnimationFrame(animate);
      window.addEventListener('resize', resize);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleBlur);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      renderer?.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-6 top-6 z-0 select-none font-mono text-[10px] text-[rgb(130,130,135)] opacity-35"
      >
        θ(x, y, t) = π · fbm(3.6x + 3.0t, 3.6y + 2.1t)
      </div>
    </>
  );
}
