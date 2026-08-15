'use client';

import { useEffect, useRef } from 'react';
import { createNoise2D, fbm } from '@/lib/simplex-noise';

const BG_COLOR = 'rgb(245, 245, 245)';
const GRID_STEP = 38;
const SPATIAL_UNIT = 1000;
const TEMPORAL_UNIT = 1000;
const KX = 3.6;
const KY = 3.6;
const KTX = 1.2;
const KTY = 0.84;
const ARROW_LENGTH = 7;
const ARROW_ALPHA = 0.12;
const PARTICLE_SPEED = 0.55;

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

export default function VectorFieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionScale = reducedMotion ? 0.2 : 1;

    const flowNoise = createNoise2D(42);
    const depthNoise = createNoise2D(99);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let frameCount = 0;
    let animationId = 0;
    let isVisible = document.visibilityState === 'visible';
    let particles: Particle[] = [];

    let gridCols = 0;
    let gridRows = 0;
    let angleGrid: Float32Array = new Float32Array(0);

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

    const drawArrows = (tau: number) => {
      for (let j = 0; j < gridRows; j++) {
        const gy = GRID_STEP / 2 + j * GRID_STEP;
        for (let i = 0; i < gridCols; i++) {
          const gx = GRID_STEP / 2 + i * GRID_STEP;
          const depth = getDepth(gx, gy, tau);
          const colorMix = depth * 0.3;
          drawArrow(
            ctx,
            gx,
            gy,
            angleGrid[j * gridCols + i],
            ARROW_LENGTH,
            mixColor(colorMix, ARROW_ALPHA),
          );
        }
      }
    };

    const drawFrame = (tau: number) => {
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      drawArrows(tau);

      for (const particle of particles) {
        const angle = sampleAngle(particle.x, particle.y);
        particle.x += Math.cos(angle) * PARTICLE_SPEED * motionScale;
        particle.y += Math.sin(angle) * PARTICLE_SPEED * motionScale;
        particle.x = wrap(particle.x, width);
        particle.y = wrap(particle.y, height);

        const depth = getDepth(particle.x, particle.y, tau);
        ctx.fillStyle = mixColor(depth * 0.45, 0.22);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      gridCols = Math.max(1, Math.ceil(width / GRID_STEP));
      gridRows = Math.max(1, Math.ceil(height / GRID_STEP));
      angleGrid = new Float32Array(gridCols * gridRows);

      spawnParticles();
      computeAngleGrid(0);
      drawFrame(0);
    };

    const animate = () => {
      if (!isVisible) return;

      time += 1;
      frameCount += 1;
      const tau = time * motionScale;
      if (frameCount % 2 === 1) {
        computeAngleGrid(tau);
      }
      drawFrame(tau);
      animationId = requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
      if (isVisible) {
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(animate);
      }
    };

    resize();
    animationId = requestAnimationFrame(animate);

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
        θ(x, y, t) = π · fbm(3.6x + 1.2t, 3.6y + 0.84t)
      </div>
    </>
  );
}
