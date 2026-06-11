import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden md:block transition-opacity"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(100,255,218,0.06), transparent 40%)`,
      }}
    />
  );
}

export function GridBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Radial top glow */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[700px] w-[1200px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(100,255,218,0.25), transparent)" }}
      />
      {/* Bottom-left glow */}
      <div
        className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(100,255,218,0.4), transparent)" }}
      />
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.07] animate-grid-pan"
        style={{
          backgroundImage:
            "linear-gradient(to right, #64FFDA 1px, transparent 1px), linear-gradient(to bottom, #64FFDA 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
    </div>
  );
}

export function FloatingParticles() {
  // Deterministic positions so SSR/CSR match
  const dots = Array.from({ length: 18 }, (_, i) => ({
    left: (i * 53) % 100,
    top: (i * 37) % 100,
    delay: (i % 6) * 0.8,
    size: 2 + (i % 3),
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cyan animate-float-y animate-pulse-glow"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            boxShadow: "0 0 8px rgba(100,255,218,0.8)",
          }}
        />
      ))}
    </div>
  );
}
