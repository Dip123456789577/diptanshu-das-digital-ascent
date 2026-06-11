import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Download, ArrowUpRight, Github, Linkedin, Mail, Twitter, ExternalLink,
  Code2, Server, PenTool, Zap, Award, GraduationCap, Briefcase,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import projectLuminal from "@/assets/project-luminal.jpg";
import projectNexus from "@/assets/project-nexus.jpg";
import projectOrbit from "@/assets/project-orbit.jpg";
import { FloatingParticles } from "./Background";

/* ---------- Shared atoms ---------- */
function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-12 flex items-center gap-4">
      <span className="font-mono text-sm text-cyan">{index}.</span>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-light">{title}</h2>
      <div className="ml-2 h-px flex-1 max-w-[240px] bg-navy-lighter" />
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

/* ---------- Hero ---------- */
const HERO_TYPED = ["Digital Experiences.", "Scalable Web Apps.", "Beautiful Interfaces.", "Production Software."];

function useTyping(words: string[]) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const speed = deleting ? 40 : 90;
    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setTimeout(() => setDeleting(true), 1600);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setI((v) => v + 1);
        return;
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);
  return text;
}

export function Hero() {
  const typed = useTyping(HERO_TYPED);
  return (
    <section id="top" className="relative flex min-h-screen items-center px-5 pt-32 md:px-10 lg:px-[120px]">
      <FloatingParticles />
      <div className="relative mx-auto w-full max-w-6xl">
        <motion.p {...fadeUp} className="font-mono-label mb-6">
          Hi, my name is
        </motion.p>
        <motion.h1
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-glow text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-slate-light"
        >
          Diptanshu Das.
        </motion.h1>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="mt-2 text-[clamp(1.75rem,6vw,4rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-slate"
        >
          I build{" "}
          <span className="text-cyan">{typed}</span>
          <span className="animate-cursor text-cyan">|</span>
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.35 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-slate"
        >
          I'm a Full Stack Developer passionate about creating modern, scalable,
          interactive, and user-focused digital products — currently focused on
          building accessible, high-performance web experiences end-to-end.
        </motion.p>
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.5 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md border border-cyan bg-cyan-soft px-7 py-4 font-mono text-sm text-cyan transition-all hover:cyan-glow hover:bg-cyan hover:text-navy"
          >
            View Projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-md border border-navy-lighter px-7 py-4 font-mono text-sm text-slate-light transition-all hover:border-cyan hover:text-cyan"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="relative px-5 py-32 md:px-10 lg:px-[120px]">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="01" title="About Me" />
        <div className="grid gap-12 md:grid-cols-[1fr_280px] md:gap-16 lg:grid-cols-[1fr_320px]">
          <motion.div {...fadeUp} className="space-y-5 text-slate text-[17px] leading-[1.75]">
            <p>
              Hello! I'm <span className="text-slate-light">Diptanshu</span>, a software
              engineer who enjoys bridging the gap between design and engineering. My journey
              into tech started back in 2018 when I decided to try my hand at building custom
              themes — turns out hacking together CSS taught me a lot about visual craft.
            </p>
            <p>
              Today, I focus on building high-performance, accessible, and beautiful web
              applications for a diverse range of clients — from boutique startups to
              global tech firms. I care about polish, performance, and the small details
              that elevate a product from good to memorable.
            </p>
            <p>Here are a few technologies I've been working with recently:</p>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-2 text-sm">
              {["TypeScript", "React / Next.js", "Node.js", "PostgreSQL", "Three.js", "Tailwind CSS"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2 font-mono text-slate-light">
                    <span className="text-cyan">▹</span>
                    {t}
                  </li>
                )
              )}
            </ul>

            <div className="grid grid-cols-2 gap-4 pt-8 sm:grid-cols-4">
              {[
                { v: 45, s: "+", l: "Projects" },
                { v: 22, s: "+", l: "Technologies" },
                { v: 12, s: "+", l: "Certifications" },
                { v: 8200, s: "+", l: "Coding Hours" },
              ].map((s) => (
                <div key={s.l} className="rounded-md border border-navy-lighter/60 bg-navy-light/40 p-4">
                  <div className="font-mono text-2xl font-bold text-cyan">
                    <Counter to={s.v} suffix={s.s} />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-slate">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="group relative mx-auto w-full max-w-[300px]">
            <div className="relative aspect-square overflow-hidden rounded-md">
              <div className="absolute inset-0 bg-cyan mix-blend-multiply transition-opacity group-hover:opacity-0" />
              <img
                src={profileImg}
                alt="Portrait of Diptanshu Das"
                loading="lazy"
                width={768}
                height={896}
                className="h-full w-full object-cover grayscale contrast-110 transition-all duration-500 group-hover:grayscale-0"
              />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-md border-2 border-cyan -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
const SKILL_GROUPS = [
  {
    icon: Code2,
    title: "Frontend",
    items: ["HTML5", "CSS3 / Tailwind", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    icon: Server,
    title: "Backend",
    items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST / GraphQL", "Redis"],
  },
  {
    icon: PenTool,
    title: "Tools & Design",
    items: ["Git / GitHub", "Docker", "Figma", "Vite", "CI / CD", "Vercel"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative px-5 py-32 md:px-10 lg:px-[120px]">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="02" title="Technical Mastery" />
        <p className="mb-12 max-w-xl text-slate">
          The tools and technologies I use to bring ambitious ideas to life.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => (
            <motion.div
              key={g.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-md border border-navy-lighter/60 bg-navy-light/40 p-6 transition-all hover:-translate-y-1 hover:border-cyan/60 hover:cyan-glow"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(100,255,218,0.08), transparent)" }}
              />
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-md bg-cyan-soft text-cyan">
                <g.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-slate-light">{g.title}</h3>
              <ul className="space-y-2 font-mono text-sm">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-slate">
                    <span className="text-cyan">▹</span>
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */
const TIMELINE = [
  {
    icon: Briefcase,
    role: "Senior Full Stack Developer",
    org: "Quantum Systems Co.",
    period: "Jan 2023 — Present",
    bullets: [
      "Architected and led development of the company's flagship SaaS product using Next.js and Go.",
      "Mentored junior developers and introduced modern CI/CD practices, reducing deployment time by 40%.",
    ],
  },
  {
    icon: Briefcase,
    role: "Full Stack Developer",
    org: "Velocity Digital",
    period: "Jun 2020 — Dec 2022",
    bullets: [
      "Developed high-performance e-commerce engines for luxury brands with sub-100ms response times.",
      "Integrated headless CMS solutions (Sanity / Strapi) for dynamic content management.",
    ],
  },
  {
    icon: GraduationCap,
    role: "B.Tech, Computer Science",
    org: "Institute of Engineering",
    period: "2016 — 2020",
    bullets: [
      "Graduated with First Class Honours. Specialized in distributed systems and human-computer interaction.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-5 py-32 md:px-10 lg:px-[120px]">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03" title="Where I've Worked" />
        <div className="relative">
          <div aria-hidden className="absolute left-4 top-2 bottom-2 w-px bg-navy-lighter md:left-5" />
          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="relative pl-14 md:pl-20"
              >
                <div className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-cyan/40 bg-navy-light text-cyan">
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="glass-panel rounded-md p-6 transition-all hover:border-cyan/40 hover:cyan-glow">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-slate-light">
                        {item.role}{" "}
                        <span className="text-cyan">@ {item.org}</span>
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-slate">{item.period}</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-slate">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[15px] leading-relaxed">
                        <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rX, rotateY: rY, transformPerspective: 1000 }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

const PROJECTS = [
  {
    title: "Luminal Finance",
    desc: "A decentralized asset tracking platform with real-time analytics and predictive modelling for retail and institutional traders.",
    img: projectLuminal,
    tags: ["Next.js", "tRPC", "PostgreSQL", "D3"],
    featured: true,
  },
  {
    title: "Nexus OS",
    desc: "A spatial computing interface built for the web, pushing the boundaries of interactive 3D UI in the browser.",
    img: projectNexus,
    tags: ["Three.js", "React", "WebGL"],
  },
  {
    title: "Orbit Cloud",
    desc: "Lightweight cloud control plane with real-time telemetry, infrastructure-as-code and a delightful CLI.",
    img: projectOrbit,
    tags: ["Go", "React", "WebSocket"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-5 py-32 md:px-10 lg:px-[120px]">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="04" title="Selected Works" />

        {/* Featured project — cinematic */}
        <motion.div {...fadeUp} className="relative mb-24 grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <TiltCard>
              <div className="group relative overflow-hidden rounded-md border border-navy-lighter">
                <img
                  src={PROJECTS[0].img}
                  alt="Luminal Finance dashboard"
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy/40 mix-blend-multiply transition-opacity group-hover:opacity-0" />
              </div>
            </TiltCard>
          </div>
          <div className="lg:col-span-5 lg:-ml-16 lg:relative lg:z-10">
            <p className="font-mono-label mb-2">Featured Project</p>
            <h3 className="text-3xl font-bold text-slate-light">{PROJECTS[0].title}</h3>
            <div className="mt-5 glass-panel rounded-md p-6">
              <p className="text-slate leading-relaxed">{PROJECTS[0].desc}</p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-navy-lighter pt-5">
                {[
                  { v: "1.2M", l: "API calls / day" },
                  { v: "<80ms", l: "p95 latency" },
                  { v: "99.99%", l: "Uptime" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-mono text-xl font-bold text-cyan">{s.v}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-slate">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2 font-mono text-xs">
              {PROJECTS[0].tags.map((t) => (
                <li key={t} className="border border-cyan/40 bg-cyan-soft px-2.5 py-1 text-cyan">{t}</li>
              ))}
            </ul>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-slate-light hover:text-cyan" aria-label="GitHub repo"><Github className="h-5 w-5" /></a>
              <a href="#" className="text-slate-light hover:text-cyan" aria-label="Live demo"><ExternalLink className="h-5 w-5" /></a>
            </div>
          </div>
        </motion.div>

        {/* Other projects */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.slice(1).map((p, i) => (
            <motion.article
              key={p.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-md border border-navy-lighter/60 bg-navy-light/40 transition-all hover:-translate-y-1 hover:border-cyan/50 hover:cyan-glow"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-slate-light group-hover:text-cyan">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{p.desc}</p>
                <ul className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
                  {p.tags.map((t) => (
                    <li key={t} className="border border-cyan/40 bg-cyan-soft px-2 py-0.5 text-cyan">{t}</li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-4">
                  <a href="#" className="text-slate-light hover:text-cyan" aria-label="GitHub"><Github className="h-4 w-4" /></a>
                  <a href="#" className="text-slate-light hover:text-cyan" aria-label="Demo"><ExternalLink className="h-4 w-4" /></a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GitHub & Certifications ---------- */
export function GitHubBlock() {
  // Decorative contribution grid (deterministic intensities)
  const cells = Array.from({ length: 7 * 26 }, (_, i) => {
    const v = (Math.sin(i * 0.7) + 1) / 2;
    return v < 0.2 ? 0 : v < 0.45 ? 1 : v < 0.7 ? 2 : v < 0.9 ? 3 : 4;
  });
  const shades = ["rgba(35,53,84,0.5)", "rgba(100,255,218,0.18)", "rgba(100,255,218,0.38)", "rgba(100,255,218,0.6)", "rgba(100,255,218,0.9)"];
  return (
    <section className="relative px-5 py-24 md:px-10 lg:px-[120px]">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="05" title="On GitHub" />
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <motion.div {...fadeUp} className="glass-panel rounded-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-light">
                <Github className="h-4 w-4 text-cyan" />
                <span className="font-mono text-sm">contributions — last 6 months</span>
              </div>
              <span className="font-mono text-xs text-slate">@diptanshu</span>
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto">
              {cells.map((c, i) => (
                <span
                  key={i}
                  className="h-3 w-3 rounded-sm"
                  style={{ background: shades[c] }}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-slate">
              less
              {shades.map((s, i) => (
                <span key={i} className="h-3 w-3 rounded-sm" style={{ background: s }} />
              ))}
              more
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            {[
              { l: "Repositories", v: 84 },
              { l: "Stars received", v: 1240 },
              { l: "Pull requests", v: 312 },
            ].map((s) => (
              <div key={s.l} className="glass-panel rounded-md p-5">
                <div className="font-mono text-2xl font-bold text-cyan">
                  <Counter to={s.v} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-slate">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const CERTS = [
  { icon: Award, title: "AWS Certified Solutions Architect", org: "Amazon Web Services", year: "2024" },
  { icon: Award, title: "Google Cloud Professional Developer", org: "Google Cloud", year: "2023" },
  { icon: Zap, title: "Hackathon Winner — BuildCon", org: "Open-source track", year: "2023" },
  { icon: Award, title: "Meta Front-End Developer", org: "Coursera", year: "2022" },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative px-5 py-32 md:px-10 lg:px-[120px]">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="06" title="Certifications & Achievements" />
        <div className="grid gap-4 md:grid-cols-2">
          {CERTS.map((c, i) => (
            <motion.div
              key={c.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="group flex items-start gap-4 rounded-md border border-navy-lighter/60 bg-navy-light/40 p-5 transition-all hover:-translate-y-0.5 hover:border-cyan/50 hover:cyan-glow"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-cyan-soft text-cyan">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-light group-hover:text-cyan">{c.title}</h3>
                <p className="mt-1 text-sm text-slate">{c.org} · <span className="font-mono">{c.year}</span></p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Field({ label, type = "text", textarea = false, name }: { label: string; type?: string; textarea?: boolean; name: string }) {
  const [val, setVal] = useState("");
  const [focus, setFocus] = useState(false);
  const float = focus || val.length > 0;
  return (
    <div className="relative">
      <label
        className={`pointer-events-none absolute left-0 origin-left font-mono text-slate transition-all ${
          float ? "top-0 text-[11px] text-cyan" : "top-5 text-sm"
        }`}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="block w-full resize-none border-b border-navy-lighter bg-transparent px-0 pb-2 pt-5 text-slate-light outline-none focus:border-cyan"
          maxLength={1000}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="block w-full border-b border-navy-lighter bg-transparent px-0 pb-2 pt-5 text-slate-light outline-none focus:border-cyan"
          maxLength={255}
        />
      )}
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative px-5 py-32 md:px-10 lg:px-[120px]">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p {...fadeUp} className="font-mono-label mb-4">07. What's Next?</motion.p>
        <motion.h2 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-4xl md:text-5xl font-bold tracking-tight text-slate-light">
          Get in Touch
        </motion.h2>
        <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="mt-6 text-slate leading-relaxed">
          My inbox is always open. Whether you have a question or just want to say hi,
          I'll try my best to get back to you.
        </motion.p>

        <motion.form
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="mt-12 glass-panel rounded-md p-8 text-left"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <Field name="name" label="FULL NAME" />
            <Field name="email" type="email" label="EMAIL ADDRESS" />
          </div>
          <div className="mt-8">
            <Field name="subject" label="SUBJECT" />
          </div>
          <div className="mt-8">
            <Field name="message" label="YOUR MESSAGE" textarea />
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <span className={`font-mono text-xs transition-opacity ${sent ? "opacity-100 text-cyan" : "opacity-0"}`}>
              ✓ Message sent — I'll be in touch soon.
            </span>
            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-md border border-cyan bg-cyan-soft px-6 py-3 font-mono text-sm text-cyan transition-all hover:cyan-glow hover:bg-cyan hover:text-navy"
            >
              Send Message
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

/* ---------- Footer + side rails ---------- */
export function SideRails() {
  return (
    <>
      <div className="fixed bottom-0 left-6 z-40 hidden flex-col items-center gap-6 lg:flex">
        {[
          { icon: Github, href: "#", label: "GitHub" },
          { icon: Linkedin, href: "#", label: "LinkedIn" },
          { icon: Twitter, href: "#", label: "Twitter" },
          { icon: Mail, href: "#contact", label: "Email" },
        ].map((s) => (
          <a key={s.label} href={s.href} aria-label={s.label} className="text-slate-light transition-all hover:-translate-y-1 hover:text-cyan">
            <s.icon className="h-4 w-4" />
          </a>
        ))}
        <span className="h-24 w-px bg-slate-light/40" />
      </div>
      <div className="fixed bottom-0 right-8 z-40 hidden flex-col items-center gap-6 lg:flex">
        <a href="mailto:hello@diptanshu.dev" className="font-mono text-xs tracking-widest text-slate-light vertical-rl transition-colors hover:text-cyan" style={{ writingMode: "vertical-rl" }}>
          hello@diptanshu.dev
        </a>
        <span className="h-24 w-px bg-slate-light/40" />
      </div>
    </>
  );
}

export function Footer() {
  return (
    <footer className="relative px-5 pb-12 pt-16 md:px-10 lg:px-[120px]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 border-t border-navy-lighter/60 pt-10">
        <div className="flex gap-6 lg:hidden">
          {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
            <a key={i} href="#" className="text-slate-light hover:text-cyan">
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
        <p className="text-center font-mono text-xs text-slate">
          Designed & built by <span className="text-cyan">Diptanshu Das</span> · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
