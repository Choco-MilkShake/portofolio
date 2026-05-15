"use client";

import { useEffect, useRef, useCallback } from "react";

const COLORS = [
  // Light blue → deep blue → purple gradient palette
  "#bfdbfe", // blue-200
  "#93c5fd", // blue-300
  "#60a5fa", // blue-400
  "#38bdf8", // sky-400
  "#818cf8", // indigo-400
  "#a78bfa", // violet-400
  "#c084fc", // purple-400
  "#7c3aed", // violet-600
  "#1d4ed8", // blue-700
];

const NUM_PARTICLES = 350;
const RADIUS = 140;
const SPRING = 0.04;
const DAMPING = 0.82;
const EXPLOSION_FORCE = 12;

function getColor(theta, phi) {
  // Map phi (0 to PI) to a gradient index
  const t = phi / Math.PI;
  const idx = Math.floor(t * (COLORS.length - 1));
  return COLORS[Math.min(idx, COLORS.length - 1)];
}

export default function InteractiveSphere() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    mouse: { x: 0, y: 0 },
    rotX: 0,
    rotY: 0,
    targetRotX: 0,
    targetRotY: 0,
    exploded: false,
    animId: null,
  });

  const initParticles = useCallback(() => {
    const particles = [];
    // Fibonacci lattice for uniform sphere distribution
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const y = 1 - (i / (NUM_PARTICLES - 1)) * 2; // -1 to 1
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;

      const phi = Math.acos(y); // 0 to PI

      const ox = RADIUS * r * Math.cos(theta);
      const oy = RADIUS * y;
      const oz = RADIUS * r * Math.sin(theta);

      particles.push({
        ox, oy, oz,      // origin position on sphere
        x: ox, y: oy, z: oz,  // current position
        vx: 0, vy: 0, vz: 0,  // velocity
        color: getColor(theta, phi),
        size: Math.random() * 1.5 + 1,
      });
    }
    stateRef.current.particles = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const state = stateRef.current;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    initParticles();

    // --- Mouse move: update target rotation ---
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      state.targetRotY = ((e.clientX - cx) / rect.width) * 1.6;
      state.targetRotX = -((e.clientY - cy) / rect.height) * 1.6;
    };

    // --- Click: explode ---
    const handleClick = () => {
      if (state.exploded) {
        // Reassemble
        state.exploded = false;
      } else {
        // Explode
        state.particles.forEach((p) => {
          p.vx = (Math.random() - 0.5) * EXPLOSION_FORCE * 2;
          p.vy = (Math.random() - 0.5) * EXPLOSION_FORCE * 2;
          p.vz = (Math.random() - 0.5) * EXPLOSION_FORCE * 2;
        });
        state.exploded = true;
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    // --- 3D Rotation helpers ---
    const rotateX = (x, y, z, a) => {
      const cos = Math.cos(a), sin = Math.sin(a);
      return { x, y: y * cos - z * sin, z: y * sin + z * cos };
    };
    const rotateY = (x, y, z, a) => {
      const cos = Math.cos(a), sin = Math.sin(a);
      return { x: x * cos + z * sin, y, z: -x * sin + z * cos };
    };

    // --- Animation loop ---
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Trail: semi-transparent clear
      ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
      ctx.fillRect(0, 0, w, h);

      // Smooth rotation towards target
      state.rotX += (state.targetRotX - state.rotX) * 0.05;
      state.rotY += (state.targetRotY - state.rotY) * 0.05;

      // Project & draw particles
      const fov = 400;
      const sorted = [...state.particles].sort((a, b) => b.z - a.z);

      sorted.forEach((p) => {
        // Spring physics — attract back to origin
        p.vx += (p.ox - p.x) * SPRING;
        p.vy += (p.oy - p.y) * SPRING;
        p.vz += (p.oz - p.z) * SPRING;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.vz *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Rotate
        let pos = rotateX(p.x, p.y, p.z, state.rotX);
        pos = rotateY(pos.x, pos.y, pos.z, state.rotY);

        // Auto-rotate slowly
        state.targetRotY += 0.001;

        // Perspective projection
        const scale = fov / (fov + pos.z + RADIUS);
        const sx = cx + pos.x * scale;
        const sy = cy + pos.y * scale;
        const radius = p.size * scale * 2.5;

        // Depth-based alpha
        const alpha = 0.4 + 0.6 * ((pos.z + RADIUS) / (RADIUS * 2));

        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(radius, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      state.animId = requestAnimationFrame(draw);
    };

    state.animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(state.animId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("resize", setSize);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        cursor: "pointer",
        borderRadius: "24px",
        background: "transparent",
      }}
      title="Click to explode / reassemble"
    />
  );
}
