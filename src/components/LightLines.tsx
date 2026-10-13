import React, { useEffect, useRef } from 'react';

interface LightLine {
  startX: number;
  startY: number;
  cp1X: number;
  cp1Y: number;
  cp2X: number;
  cp2Y: number;
  endX: number;
  endY: number;
  speed: number;
  offset: number;
  length: number;
  alpha: number;
  width: number;
  color: string;
}

export const LightLines: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Generate balanced, elegant cinematic light line curves
    // Positioned across negative space and periphery to complement the photograph
    const createLines = (): LightLine[] => {
      const lineCount = 7;
      const lines: LightLine[] = [];

      for (let i = 0; i < lineCount; i++) {
        const spread = (i / (lineCount - 1));
        lines.push({
          startX: -0.1 * width,
          startY: height * (0.2 + spread * 0.7),
          cp1X: width * (0.2 + (i % 2) * 0.1),
          cp1Y: height * (0.1 + spread * 0.6),
          cp2X: width * (0.6 + (i % 3) * 0.1),
          cp2Y: height * (0.3 + spread * 0.5),
          endX: width * 1.15,
          endY: height * (0.15 + spread * 0.75),
          speed: 0.0006 + (i * 0.0002),
          offset: (i * 0.23) % 1,
          length: 0.28 + (i * 0.04),
          alpha: 0.18 + (i % 3) * 0.08,
          width: 1.2 + (i % 2) * 0.6,
          color: 'rgba(255, 255, 255,',
        });
      }
      return lines;
    };

    let lines = createLines();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      lines = createLines();
    };

    window.addEventListener('resize', handleResize);

    // If reduced motion, draw once and return
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.bezierCurveTo(line.cp1X, line.cp1Y, line.cp2X, line.cp2Y, line.endX, line.endY);
        ctx.strokeStyle = `${line.color} ${line.alpha * 0.5})`;
        ctx.lineWidth = line.width;
        ctx.stroke();
      });
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    // Cubic bezier evaluation helper
    const getBezierPoint = (
      t: number,
      p0: number,
      p1: number,
      p2: number,
      p3: number
    ) => {
      const mt = 1 - t;
      return (
        mt * mt * mt * p0 +
        3 * mt * mt * t * p1 +
        3 * mt * t * t * p2 +
        t * t * t * p3
      );
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Render flowing light lines
      lines.forEach((line) => {
        // Advance offset
        line.offset = (line.offset + line.speed * delta * 60) % 1;

        // Sample points along the bezier curve for the luminous segment
        const steps = 36;
        const headT = line.offset;
        const tailT = Math.max(0, headT - line.length);

        ctx.beginPath();
        let first = true;

        for (let s = 0; s <= steps; s++) {
          const currentT = tailT + (s / steps) * (headT - tailT);
          if (currentT < 0 || currentT > 1) continue;

          const x = getBezierPoint(currentT, line.startX, line.cp1X, line.cp2X, line.endX);
          const y = getBezierPoint(currentT, line.startY, line.cp1Y, line.cp2Y, line.endY);

          if (first) {
            ctx.moveTo(x, y);
            first = false;
          } else {
            ctx.lineTo(x, y);
          }
        }

        if (!first) {
          // Dynamic gradient for the light streak
          const headX = getBezierPoint(headT, line.startX, line.cp1X, line.cp2X, line.endX);
          const headY = getBezierPoint(headT, line.startY, line.cp1Y, line.cp2Y, line.endY);
          const tailX = getBezierPoint(Math.max(0, headT - line.length), line.startX, line.cp1X, line.cp2X, line.endX);
          const tailY = getBezierPoint(Math.max(0, headT - line.length), line.startY, line.cp1Y, line.cp2Y, line.endY);

          const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
          grad.addColorStop(0, `${line.color} 0)`);
          grad.addColorStop(0.7, `${line.color} ${line.alpha * 0.4})`);
          grad.addColorStop(1, `${line.color} ${line.alpha})`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = line.width;
          ctx.lineCap = 'round';
          ctx.shadowBlur = 12;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
          ctx.stroke();

          // Subtle glowing spark at the head of the light line
          if (headT <= 1 && headT >= 0) {
            ctx.beginPath();
            ctx.arc(headX, headY, line.width * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${line.alpha * 1.2})`;
            ctx.shadowBlur = 18;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-10 h-full w-full opacity-65 mix-blend-screen transition-opacity duration-1000 ${className}`}
      aria-hidden="true"
    />
  );
};
