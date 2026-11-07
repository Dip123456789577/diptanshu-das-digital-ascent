import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Download,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Twitter,
  ExternalLink,
  Code2,
  Server,
  PenTool,
  Zap,
  Award,
  GraduationCap,
  Briefcase,
  FileJson,
  FileCode2,
  Terminal as TerminalIcon,
  ShieldCheck,
  CheckCircle2,
  Eye,
  X,
  ZoomIn,
  Loader2,
  Copy,
  Check,
  Send,
  AlertTriangle,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/api/contact.functions";
import profileImg from "@/assets/profile.jpg";
import projectLuxe from "@/assets/project-luxe.jpg";
import projectBrandCatalyst from "@/assets/project-brand-catalyst.jpg";
import projectFormFlow from "@/assets/project-form-flow.jpg";
import projectDrugGang from "@/assets/project-drug-gang.png";
import certGlobalSecora from "@/assets/cert-global-secora.jpg";
import certSemrushAiSearch from "@/assets/cert-semrush-ai-search.png";
import certSemrushGettingStarted from "@/assets/cert-semrush-getting-started.png";
import { FloatingParticles } from "./Background";

/* ---------- Shared atoms ---------- */
function SectionLabel({ index, title }: { index?: string; title: string }) {
  return (
    <div className="mb-12 flex items-center gap-4">
      {index && <span className="font-mono text-sm text-cyan">{index}.</span>}
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-light">{title}</h2>
      <div className="ml-2 h-px flex-1 max-w-60 bg-navy-lighter" />
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

/* ---------- Hero Helpers & Elements ---------- */

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  download,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  download?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    const maxPull = 10;
    const pullX = (distanceX / (width / 2)) * maxPull;
    const pullY = (distanceY / (height / 2)) * maxPull;

    setPos({ x: pullX, y: pullY });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  const commonProps = {
    animate: { x: pos.x, y: pos.y },
    transition: { type: "spring" as const, stiffness: 150, damping: 15, mass: 0.1 },
    className,
  };

  if (href) {
    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        <motion.a href={href} download={download} {...commonProps}>
          {children}
        </motion.a>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.button type="button" onClick={onClick} {...commonProps}>
        {children}
      </motion.button>
    </div>
  );
}

export function InteractiveIDE({ onOpenResume }: { onOpenResume?: () => void }) {
  const [activeTab, setActiveTab] = useState<"info" | "skills" | "terminal">("info");
  const [cmd, setCmd] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState<{ text: string; type: "input" | "output" | "system" }[]>([
    { text: "Diptanshu OS v2.4 (zsh/node22)", type: "system" },
    { text: "Type 'help' to see available commands or click quick actions below.", type: "system" },
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const executeCommand = (commandText: string) => {
    const trimmed = commandText.trim().toLowerCase();
    const newHistory = [
      ...history,
      { text: `guest@diptanshudas:~$ ${commandText}`, type: "input" as const },
    ];

    if (trimmed === "") {
      setHistory(newHistory);
      setCmd("");
      return;
    }

    let output = "";
    if (trimmed === "help") {
      output = `Available commands:
  about       - Bio & educational background
  skills      - Technical proficiency summary
  projects    - Featured production projects
  certs       - Verified credentials & licenses
  experience  - Industry internships & roles
  education   - Academic degree & university
  github      - Profile & repository link
  resume      - Open printable curriculum vitae
  contact     - Direct email & communication channels
  whoami      - Current session identity
  ls / pwd    - Directory listing & path
  clear       - Clear terminal buffer`;
    } else if (trimmed === "about") {
      output = `Diptanshu Das — Full Stack Developer & Cybersecurity Intern
Student at The Neotia University (B.Tech CSE).
Focused on building high-performance, secure, and accessible web systems.`;
    } else if (trimmed === "skills" || trimmed === "stack") {
      output = `Core Technical Stack:
- Frontend: TypeScript, React 19, Next.js, TanStack Start, Tailwind CSS v4
- Backend: Node.js, Express.js, PostgreSQL, MongoDB, Redis, Nitro
- Security & Tools: Vulnerability Auditing, Git/GitHub, Docker, Vite, Brevo API`;
    } else if (trimmed === "projects") {
      output = `Featured Works:
1. LUXE Atelier       - Luxury e-commerce experience (99+ Lighthouse)
2. KINETIC Atelier    - High-velocity agency platform
3. FORMA Studio       - Architectural cabinetry & interactive space designer
4. Cyberpunk Parody   - Dark satire web experience`;
    } else if (trimmed === "certs" || trimmed === "certifications") {
      output = `Verified Industry Credentials:
1. Cyber Security Internship - Global Secora Technology (ID: GST/STI/2026/0063)
2. AI Search Operating System - Semrush Academy (ID: b3a6d5313c)
3. Getting Started with Semrush - Semrush Academy (ID: 56814a603d)`;
    } else if (trimmed === "experience") {
      output = `Professional Milestones:
1. Cyber Security Intern @ Global Secora Technology Pvt. Ltd. (June 2026 – July 2026)
2. Full Stack Developer & Consultant @ Production Web Platforms (2024 – Present)`;
    } else if (trimmed === "education") {
      output = `Academic Background:
Bachelor of Technology (B.Tech) — Computer Science & Engineering
The Neotia University, West Bengal, India`;
    } else if (trimmed === "github") {
      output = `GitHub: https://github.com/Dip123456789577
Public Repositories: 45+ | Activity: Continuous Engineering`;
    } else if (trimmed === "whoami") {
      output = `guest@portfolio (Engineering Leader / Hiring Manager / Tech Explorer)`;
    } else if (trimmed === "pwd") {
      output = `/home/diptanshu/portfolio`;
    } else if (trimmed === "ls") {
      output = `Info.tsx  skills.json  terminal.sh  projects/  credentials/  resume.pdf`;
    } else if (trimmed === "sudo" || trimmed.startsWith("sudo ")) {
      output = `Permission denied: guest does not have root access. Feel free to use 'contact' to connect directly :)`;
    } else if (trimmed === "date") {
      output = new Date().toUTCString();
    } else if (trimmed === "resume" || trimmed === "cv") {
      output = `Opening official Curriculum Vitae...`;
      onOpenResume?.();
    } else if (trimmed === "contact" || trimmed === "email") {
      output = `Direct Communication:
- Email:    diptanshudas920@gmail.com
- GitHub:   https://github.com/Dip123456789577
- Location: West Bengal, India (UTC +5:30)
- Status:   Open for Full-Time Roles & Contracts`;
    } else if (trimmed === "clear") {
      setHistory([]);
      setCmd("");
      return;
    } else {
      output = `zsh: command not found: ${commandText}. Type 'help' to see available options.`;
    }

    setTimeout(() => {
      setHistory((prev) => [...prev, { text: output, type: "output" as const }]);
    }, 80);

    setCmd("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isTyping) {
      executeCommand(cmd);
    }
  };

  const runSuggestedCommand = (command: string) => {
    if (isTyping) return;
    setActiveTab("terminal");
    setIsTyping(true);
    setCmd("");
    let currentText = "";
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex < command.length) {
        currentText += command[charIndex];
        setCmd(currentText);
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsTyping(false);
          executeCommand(command);
        }, 120);
      }
    }, 45);
  };

  return (
    <div className="w-full rounded-lg border border-navy-lighter/60 bg-navy-light/60 premium-shadow glass-panel overflow-hidden font-mono text-xs select-none">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between bg-navy-light/80 px-4 py-3 border-b border-navy-lighter/40">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F56] opacity-80" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E] opacity-80" />
          <span className="h-3 w-3 rounded-full bg-[#27C93F] opacity-80" />
        </div>
        <div className="text-[10px] tracking-wide text-slate/80">
          diptanshu ~{" "}
          {activeTab === "info"
            ? "Info.tsx"
            : activeTab === "skills"
              ? "skills.json"
              : "terminal.sh"}
        </div>
        <div className="w-12" />
      </div>

      {/* File Tabs */}
      <div className="flex border-b border-navy-lighter/30 bg-navy/30">
        {[
          { id: "info" as const, label: "Info.tsx", icon: FileCode2 },
          { id: "skills" as const, label: "skills.json", icon: FileJson },
          { id: "terminal" as const, label: "terminal.sh", icon: TerminalIcon },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 border-r border-navy-lighter/20 transition-all ${
              activeTab === t.id
                ? "bg-navy-light/60 text-cyan border-b border-b-cyan"
                : "text-slate hover:text-slate-light hover:bg-navy-light/20"
            }`}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Editor Content Area */}
      <div className="p-5 h-70 overflow-y-auto bg-navy-light/20 leading-relaxed text-slate-light text-left">
        {activeTab === "info" && (
          <div className="space-y-1.5">
            <div>
              <span className="text-cyan">const</span>{" "}
              <span className="text-slate-light">DiptanshuDas</span> = () =&gt; &#123;
            </div>
            <div className="pl-4">
              <span className="text-cyan">const</span>{" "}
              <span className="text-slate-light">title</span> ={" "}
              <span className="text-[#A2E9F2]">"Full Stack Engineer & Security Researcher"</span>;
            </div>
            <div className="pl-4">
              <span className="text-cyan">const</span>{" "}
              <span className="text-slate-light">education</span> ={" "}
              <span className="text-[#A2E9F2]">"The Neotia University (B.Tech CSE)"</span>;
            </div>
            <div className="pl-4">
              <span className="text-cyan">const</span>{" "}
              <span className="text-slate-light">internship</span> ={" "}
              <span className="text-[#A2E9F2]">"Global Secora Technology Pvt. Ltd."</span>;
            </div>
            <div className="pl-4">
              <span className="text-cyan">const</span>{" "}
              <span className="text-slate-light">status</span> ={" "}
              <span className="text-[#A2E9F2]">"Available for Full-time Roles & Contracts"</span>;
            </div>
            <div className="pl-4 mt-2">
              <span className="text-cyan">return</span> (
            </div>
            <div className="pl-8">
              &lt;<span className="text-cyan">DeveloperProfile</span>&gt;
            </div>
            <div className="pl-12">
              &lt;<span className="text-cyan">Specialization</span>{" "}
              <span className="text-slate/80">focus</span>=<span className="text-cyan">&#123;</span>
              [<span className="text-[#A2E9F2]">"web-scale"</span>,{" "}
              <span className="text-[#A2E9F2]">"cyber-defense"</span>]
              <span className="text-cyan">&#125;</span> /&gt;
            </div>
            <div className="pl-12">
              &lt;<span className="text-cyan">Email</span>{" "}
              <span className="text-slate/80">address</span>=
              <span className="text-[#A2E9F2]">"diptanshudas920@gmail.com"</span> /&gt;
            </div>
            <div className="pl-8">
              &lt;/<span className="text-cyan">DeveloperProfile</span>&gt;
            </div>
            <div className="pl-4">);</div>
            <div>&#125;;</div>
            <div className="mt-4">
              <span className="text-cyan">export default</span>{" "}
              <span className="text-slate-light">DiptanshuDas</span>;
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-1 text-[#A2E9F2]">
            <div>&#123;</div>
            <div className="pl-4">
              <span className="text-slate-light">"engineer"</span>:{" "}
              <span className="text-[#A2E9F2]">"Diptanshu Das"</span>,
            </div>
            <div className="pl-4">
              <span className="text-slate-light">"email"</span>:{" "}
              <span className="text-[#A2E9F2]">"diptanshudas920@gmail.com"</span>,
            </div>
            <div className="pl-4">
              <span className="text-slate-light">"github"</span>:{" "}
              <span className="text-[#A2E9F2]">"Dip123456789577"</span>,
            </div>
            <div className="pl-4">
              <span className="text-slate-light">"coreTech"</span>: [
            </div>
            <div className="pl-8">
              <span className="text-[#A2E9F2]">"TypeScript"</span>,
            </div>
            <div className="pl-8">
              <span className="text-[#A2E9F2]">"React 19 / Next.js"</span>,
            </div>
            <div className="pl-8">
              <span className="text-[#A2E9F2]">"TanStack Start / Nitro"</span>,
            </div>
            <div className="pl-8">
              <span className="text-[#A2E9F2]">"Tailwind CSS v4"</span>,
            </div>
            <div className="pl-8">
              <span className="text-[#A2E9F2]">"Node.js / Express"</span>,
            </div>
            <div className="pl-8">
              <span className="text-[#A2E9F2]">"PostgreSQL / MongoDB"</span>,
            </div>
            <div className="pl-8">
              <span className="text-[#A2E9F2]">"Brevo Transactional API"</span>
            </div>
            <div className="pl-4">],</div>
            <div className="pl-4">
              <span className="text-slate-light">"securityCertified"</span>:{" "}
              <span className="text-cyan">true</span>,
            </div>
            <div className="pl-4">
              <span className="text-slate-light">"availableForHire"</span>:{" "}
              <span className="text-cyan">true</span>
            </div>
            <div>&#125;</div>
          </div>
        )}

        {activeTab === "terminal" && (
          <div className="space-y-2 whitespace-pre-wrap selection:bg-cyan/30 text-left">
            {history.map((h, i) => (
              <div
                key={i}
                className={
                  h.type === "input"
                    ? "text-slate-light font-semibold"
                    : h.type === "system"
                      ? "text-slate/60"
                      : "text-cyan/90"
                }
              >
                {h.text}
              </div>
            ))}
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-slate/70">guest@diptanshudas:~$</span>
              <input
                type="text"
                value={cmd}
                disabled={isTyping}
                onChange={(e) => setCmd(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-cyan font-mono text-xs select-text caret-transparent terminal-caret"
                autoFocus={activeTab === "terminal"}
              />
            </div>
            <div ref={terminalEndRef} />
          </div>
        )}
      </div>

      {/* Terminal Suggestions / Quick Actions */}
      <div className="flex flex-wrap gap-2 items-center bg-navy/40 px-4 py-2.5 border-t border-navy-lighter/30">
        <span className="text-[10px] text-slate/50 font-sans tracking-wide uppercase">
          Quick commands:
        </span>
        {["help", "about", "skills", "projects", "certs", "resume", "contact", "clear"].map(
          (suggestion) => (
            <button
              key={suggestion}
              onClick={() => runSuggestedCommand(suggestion)}
              className="px-2 py-0.5 rounded bg-navy-lighter/20 border border-navy-lighter/40 text-[10px] text-slate hover:text-cyan hover:border-cyan/40 hover:bg-cyan-soft/10 transition-colors cursor-pointer"
            >
              {suggestion}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */
const HERO_TYPED = [
  "Scalable Web Architectures.",
  "Secure Cloud Backends.",
  "High-Performance Interfaces.",
  "Production-Grade Software.",
];

function useTyping(words: string[]) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const speed = deleting ? 35 : 80;
    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setTimeout(() => setDeleting(true), 1700);
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

export function Hero({ onOpenResume }: { onOpenResume?: () => void }) {
  const typed = useTyping(HERO_TYPED);
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center px-5 pt-32 pb-16 md:px-10 lg:px-30"
    >
      <FloatingParticles />
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column - Intro */}
          <div className="lg:col-span-7 text-left">
            <motion.div {...fadeUp} className="flex items-center gap-2 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan" />
              </span>
              <span className="font-mono-label">Available for New Engineering Opportunities</span>
            </motion.div>
            <motion.h1
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="text-glow text-[clamp(2.5rem,7vw,4.8rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-slate-light"
            >
              Diptanshu Das.
            </motion.h1>
            <motion.h2
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="mt-2 text-[clamp(1.5rem,5vw,3.5rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-slate"
            >
              I build <span className="text-cyan">{typed}</span>
              <span className="animate-cursor text-cyan">|</span>
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.35 }}
              className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-slate"
            >
              Full Stack Developer & Cybersecurity Intern specializing in crafting high-performance,
              accessible, and resilient web applications. Blending technical precision with modern
              visual craft from frontend architecture to cloud services.
            </motion.p>
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <MagneticButton
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-md border border-cyan bg-cyan-soft px-7 py-4 font-mono text-sm text-cyan transition-all hover:cyan-glow hover:bg-cyan hover:text-navy cursor-pointer"
              >
                View Selected Works
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>
              <MagneticButton
                onClick={onOpenResume}
                className="group inline-flex items-center gap-2 rounded-md border border-navy-lighter px-7 py-4 font-mono text-sm text-slate-light transition-all hover:border-cyan hover:text-cyan cursor-pointer"
              >
                <Download className="h-4 w-4" />
                Inspect Resume
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column - Interactive IDE */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="lg:col-span-5 w-full max-w-lg lg:max-w-none mx-auto"
          >
            <InteractiveIDE onOpenResume={onOpenResume} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
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
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative px-5 py-32 md:px-10 lg:px-30">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="01" title="About Me" />
        <div className="grid gap-12 md:grid-cols-[1fr_280px] md:gap-16 lg:grid-cols-[1fr_320px]">
          <motion.div {...fadeUp} className="space-y-5 text-slate text-[17px] leading-[1.75]">
            <p>
              Hello! I'm <span className="text-slate-light font-semibold">Diptanshu Das</span>, a
              software engineer and cybersecurity researcher based in West Bengal, India. I am
              currently pursuing my Bachelor of Technology in Computer Science & Engineering at{" "}
              <span className="text-cyan font-medium">The Neotia University</span>.
            </p>
            <p>
              My background bridges deep system engineering with modern design principles. Recently,
              I completed an intensive{" "}
              <span className="text-slate-light font-medium">
                Cyber Security Internship at Global Secora Technology Pvt. Ltd.
              </span>{" "}
              (Credential ID: <span className="font-mono text-cyan text-sm">GST/STI/2026/0063</span>
              ), focusing on practical vulnerability auditing, threat vectors, and secure
              application development.
            </p>
            <p>
              Additionally, I hold certified accreditations from{" "}
              <span className="text-slate-light font-medium">Semrush Academy</span> in AI Search
              Systems and SEO architecture. Whether architecting e-commerce engines like LUXE
              Atelier or designing scalable full-stack APIs, I emphasize code cleanliness, sub-100ms
              response times, and bulletproof security.
            </p>
            <p>Here are core technologies I work with daily:</p>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-2 text-sm">
              {[
                "TypeScript & React 19",
                "Next.js & TanStack Start",
                "Node.js & Express.js",
                "PostgreSQL & MongoDB",
                "Brevo API & Cloud Services",
                "Tailwind CSS v4",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 font-mono text-slate-light">
                  <span className="text-cyan">▹</span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-4 pt-8 sm:grid-cols-4">
              {[
                { v: 45, s: "+", l: "Projects" },
                { v: 18, s: "+", l: "Technologies" },
                { v: 3, s: " Verified", l: "Credentials" },
                { v: 5200, s: "+", l: "Coding Hours" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-md border border-navy-lighter/60 bg-navy-light/40 p-4"
                >
                  <div className="font-mono text-2xl font-bold text-cyan">
                    <Counter to={s.v} suffix={s.s} />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-slate">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="group relative mx-auto w-full max-w-75"
          >
            <div className="relative aspect-square overflow-hidden rounded-md border border-navy-lighter/80 shadow-2xl">
              <div className="absolute inset-0 bg-cyan mix-blend-multiply transition-opacity group-hover:opacity-0 z-10 pointer-events-none" />
              <img
                src={profileImg}
                alt="Portrait of Diptanshu Das"
                loading="lazy"
                width={768}
                height={896}
                className="h-full w-full object-cover object-[center_18%] grayscale contrast-110 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
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
    title: "Frontend Architecture",
    items: [
      "TypeScript & JavaScript (ESNext)",
      "React 19 & Next.js",
      "TanStack Start & Router",
      "Tailwind CSS v4 & PostCSS",
      "Framer Motion & Micro-interactions",
      "Accessible UI (WCAG 2.1)",
    ],
  },
  {
    icon: Server,
    title: "Backend & Systems",
    items: [
      "Node.js & Express.js",
      "Nitro Server Engine",
      "PostgreSQL & Prisma",
      "MongoDB & Mongoose",
      "Redis Caching",
      "RESTful & RPC Server Functions",
    ],
  },
  {
    icon: PenTool,
    title: "Security & DevOps",
    items: [
      "Cybersecurity & Vulnerability Audit",
      "Brevo Transactional Email API",
      "Git & GitHub Workflow",
      "Docker & Containerization",
      "Vite & Build Tooling",
      "Vercel / Edge Deployment",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative px-5 py-32 md:px-10 lg:px-30">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="02" title="Technical Mastery" />
        <p className="mb-12 max-w-xl text-slate">
          The engineering toolkit, frameworks, and methodologies I leverage to architect
          production-grade software.
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
                style={{
                  background:
                    "radial-gradient(400px circle at 50% 0%, rgba(100,255,218,0.08), transparent)",
                }}
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
    icon: ShieldCheck,
    role: "Cyber Security Intern",
    org: "Global Secora Technology Pvt. Ltd.",
    period: "June 2026 — July 2026",
    badge: "GST/STI/2026/0063",
    bullets: [
      "Completed rigorous Summer Training cum Internship Program focusing on hands-on cybersecurity practices and vulnerability assessments.",
      "Conducted threat audits and analyzed web application attack surfaces to ensure resilience against common OWASP vectors.",
      "Delivered assigned security modules under the guidance of Founder & CEO Souvik Biswas.",
    ],
  },
  {
    icon: Briefcase,
    role: "Full Stack Developer & Independent Consultant",
    org: "Production Software & Web Solutions",
    period: "2024 — Present",
    badge: "Active",
    bullets: [
      "Architected and deployed production web applications including LUXE Atelier e-commerce and FORMA Kitchen Studio.",
      "Achieved sub-100ms interaction latencies and 99+ Lighthouse performance scores across deployed client projects.",
      "Integrated transactional mail pipelines with Brevo API, responsive design with Tailwind CSS v4, and type-safe backend server functions.",
    ],
  },
  {
    icon: GraduationCap,
    role: "B.Tech, Computer Science & Engineering",
    org: "The Neotia University",
    period: "Undergraduate Degree",
    badge: "B.Tech CSE",
    bullets: [
      "Specializing in distributed computing, algorithms, human-computer interaction, and secure information systems.",
      "Building practical applications and contributing to full-stack engineering initiatives.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-5 py-32 md:px-10 lg:px-30">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03" title="Experience & Credentials" />
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-4 top-2 bottom-2 w-px bg-navy-lighter md:left-5"
          />
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
                        {item.role} <span className="text-cyan">@ {item.org}</span>
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded border border-cyan/30 bg-cyan/10 px-2 py-0.5 font-mono text-[11px] text-cyan">
                        {item.badge}
                      </span>
                      <span className="font-mono text-xs text-slate">{item.period}</span>
                    </div>
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
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX: rX, rotateY: rY, transformPerspective: 1000 }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

const PROJECTS = [
  {
    title: "LUXE Atelier",
    desc: "An editorial e-commerce platform crafted for artisan goods and considered living. Features curated seasonal edits, multi-currency conversion, an interactive shopping bag, and responsive product inspection.",
    img: projectLuxe,
    tags: ["React", "TypeScript", "Tailwind CSS", "Storefront", "UX/UI"],
    featured: true,
    liveUrl: "https://luxe-e-commerce-refined.vercel.app/",
    githubUrl: "https://github.com/Dip123456789577",
    metrics: [
      { v: "99+", l: "Lighthouse Score" },
      { v: "<100ms", l: "Interaction Speed" },
      { v: "100%", l: "Responsive Design" },
    ],
  },
  {
    title: "KINETIC Atelier",
    desc: "A high-performance digital agency platform showcasing brand strategy, creative direction, and campaign architectures with interactive capability panels and dynamic metrics.",
    img: projectBrandCatalyst,
    tags: ["Next.js", "TypeScript", "Framer Motion", "Growth Agency"],
    liveUrl: "https://brand-catalyst-nine.vercel.app/",
    githubUrl: "https://github.com/Dip123456789577",
  },
  {
    title: "FORMA Kitchen Studio",
    desc: "An architectural kitchen renovation and custom cabinetry website with an interactive before-and-after renovation slider, craft portfolio, and consultation booking system.",
    img: projectFormFlow,
    tags: ["React", "Interactive Slider", "Tailwind CSS", "Architecture"],
    liveUrl: "https://form-flow-kitchens.vercel.app/",
    githubUrl: "https://github.com/Dip123456789577",
  },
  {
    title: "Definitely Not A Drug Marketplace",
    desc: "A satirical dark-humor parody web application playfully styled after fictional crime networks. Built with high-contrast cyberpunk aesthetics and interactive comedy flows.",
    img: projectDrugGang,
    tags: ["React", "TypeScript", "Cyberpunk UI", "Comedy Parody"],
    liveUrl: "https://drug-gang.vercel.app/",
    githubUrl: "https://github.com/Dip123456789577",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-5 py-32 md:px-10 lg:px-30">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="04" title="Selected Works" />

        {/* Featured project — cinematic */}
        <motion.div {...fadeUp} className="relative mb-24 grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <TiltCard>
              <a
                href={PROJECTS[0].liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-md border border-navy-lighter"
              >
                <img
                  src={PROJECTS[0].img}
                  alt={PROJECTS[0].title}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="aspect-16/10 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy/40 mix-blend-multiply transition-opacity group-hover:opacity-0" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-navy/60 backdrop-blur-[2px]">
                  <span className="flex items-center gap-2 rounded-full border border-cyan/60 bg-navy-dark/90 px-4 py-2 font-mono text-xs text-cyan shadow-lg">
                    <span>Visit Live Site</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            </TiltCard>
          </div>
          <div className="lg:col-span-5 lg:-ml-16 lg:relative lg:z-10">
            <p className="font-mono-label mb-2">Featured Project</p>
            <h3 className="text-3xl font-bold text-slate-light">
              <a
                href={PROJECTS[0].liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan transition-colors inline-flex items-center gap-2"
              >
                {PROJECTS[0].title}
                <ArrowUpRight className="h-5 w-5 text-cyan" />
              </a>
            </h3>
            <div className="mt-5 glass-panel rounded-md p-6">
              <p className="text-slate leading-relaxed">{PROJECTS[0].desc}</p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-navy-lighter pt-5">
                {PROJECTS[0].metrics?.map((s) => (
                  <div key={s.l}>
                    <div className="font-mono text-xl font-bold text-cyan">{s.v}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-slate">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2 font-mono text-xs">
              {PROJECTS[0].tags.map((t) => (
                <li key={t} className="border border-cyan/40 bg-cyan-soft px-2.5 py-1 text-cyan">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-4">
              <a
                href={PROJECTS[0].githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-light hover:text-cyan transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={PROJECTS[0].liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-light hover:text-cyan transition-colors"
                aria-label="Live demo"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
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
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block overflow-hidden"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="aspect-16/10 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy/30 mix-blend-multiply transition-opacity group-hover:opacity-0" />
              </a>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-light group-hover:text-cyan transition-colors">
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5"
                    >
                      {p.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100 text-cyan" />
                    </a>
                  </h3>
                  <div className="flex items-center gap-3">
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate hover:text-cyan transition-colors"
                      aria-label={`${p.title} GitHub`}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate hover:text-cyan transition-colors"
                      aria-label={`${p.title} Live`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{p.desc}</p>
                <ul className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="border border-cyan/40 bg-cyan-soft px-2 py-0.5 text-cyan"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
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
  const cells = Array.from({ length: 7 * 26 }, (_, i) => {
    const v = (Math.sin(i * 0.7) + 1) / 2;
    return v < 0.2 ? 0 : v < 0.45 ? 1 : v < 0.7 ? 2 : v < 0.9 ? 3 : 4;
  });
  const shades = [
    "rgba(35,53,84,0.5)",
    "rgba(100,255,218,0.18)",
    "rgba(100,255,218,0.38)",
    "rgba(100,255,218,0.6)",
    "rgba(100,255,218,0.9)",
  ];
  return (
    <section className="relative px-5 py-24 md:px-10 lg:px-30">
      <div className="mx-auto max-w-6xl">
        <SectionLabel title="On GitHub" />
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <motion.div {...fadeUp} className="glass-panel rounded-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-light">
                <Github className="h-4 w-4 text-cyan" />
                <span className="font-mono text-sm">contributions — activity stream</span>
              </div>
              <a
                href="https://github.com/Dip123456789577"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-cyan hover:underline inline-flex items-center gap-1"
              >
                @Dip123456789577
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2">
              {cells.map((c, i) => (
                <span key={i} className="h-3 w-3 rounded-sm" style={{ background: shades[c] }} />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-slate">
              <div className="flex items-center gap-2">
                less
                {shades.map((s, i) => (
                  <span key={i} className="h-3 w-3 rounded-sm" style={{ background: s }} />
                ))}
                more
              </div>
              <a
                href="https://github.com/Dip123456789577"
                target="_blank"
                rel="noreferrer"
                className="text-cyan hover:underline"
              >
                View GitHub Repositories →
              </a>
            </div>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="grid grid-cols-2 gap-4 lg:grid-cols-1"
          >
            {[
              { l: "Public Repositories", v: 45 },
              { l: "Contributions logged", v: 1140 },
              { l: "Pull requests & commits", v: 380 },
            ].map((s) => (
              <div key={s.l} className="glass-panel rounded-md p-5">
                <div className="font-mono text-2xl font-bold text-cyan">
                  <Counter to={s.v} suffix="+" />
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
  {
    title: "Cyber Security Internship",
    subtitle: "Summer Training cum Internship Program",
    org: "Global Secora Technology Pvt. Ltd.",
    credentialId: "GST/STI/2026/0063",
    date: "July 2026",
    period: "15.06.2026 – 15.07.2026",
    recipient: "Mr. Diptanshu Das (The Neotia University)",
    signatory: "Souvik Biswas — Founder & CEO",
    tags: ["Cyber Security", "Practical Assignments", "Industry Training"],
    img: certGlobalSecora,
    aspect: "aspect-[4/5]",
    icon: ShieldCheck,
  },
  {
    title: "AI Search Operating System",
    subtitle: "Semrush Academy Certificate of Achievement",
    org: "Semrush Academy",
    credentialId: "b3a6d5313c · Exam id-37",
    date: "Expires Sept 2027",
    period: "Valid thru 29.09.2027",
    recipient: "Diptanshu Das",
    signatory: "Leigh McKenzie & Rita Cidre",
    tags: ["AI Search", "Modern Search Engines", "SEO Architecture"],
    img: certSemrushAiSearch,
    aspect: "aspect-[16/11]",
    icon: Award,
  },
  {
    title: "Getting Started with Semrush",
    subtitle: "Semrush Academy Certificate of Achievement",
    org: "Semrush Academy",
    credentialId: "56814a603d · Exam id-25",
    date: "Expires Sept 2027",
    period: "Valid thru 29.09.2027",
    recipient: "Diptanshu Das",
    signatory: "Rita Cidre",
    tags: ["SEO Intelligence", "Keyword Research", "Competitive Auditing"],
    img: certSemrushGettingStarted,
    aspect: "aspect-[16/11]",
    icon: Award,
  },
];

export function Certifications() {
  const [activeCert, setActiveCert] = useState<(typeof CERTS)[0] | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCert(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="certifications" className="relative px-5 py-32 md:px-10 lg:px-30">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="05" title="Certifications & Credentials" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c, i) => (
            <motion.article
              key={c.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-md border border-navy-lighter/60 bg-navy-light/40 transition-all hover:-translate-y-1 hover:border-cyan/50 hover:cyan-glow"
            >
              {/* Thumbnail with zoom overlay */}
              <div
                onClick={() => setActiveCert(c)}
                className="relative cursor-pointer overflow-hidden bg-navy-dark border-b border-navy-lighter/60"
              >
                <div
                  className={`${c.aspect} w-full overflow-hidden flex items-center justify-center p-3 bg-navy-dark/70`}
                >
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain rounded transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-navy/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="flex items-center gap-1.5 rounded-full border border-cyan/60 bg-navy-dark/90 px-3.5 py-1.5 font-mono text-xs text-cyan shadow-lg">
                    <ZoomIn className="h-3.5 w-3.5" />
                    <span>View Certificate</span>
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-cyan">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan" />
                    Verified Credential
                  </span>
                  <span className="font-mono text-[10px] text-slate">{c.date}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-light group-hover:text-cyan transition-colors">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-slate">{c.org}</p>

                <div className="mt-3 rounded bg-navy-dark/60 border border-navy-lighter/40 p-2.5 font-mono text-[11px]">
                  <div className="text-[10px] uppercase tracking-wider text-slate">
                    Credential ID
                  </div>
                  <div className="truncate text-cyan font-semibold">{c.credentialId}</div>
                </div>

                <ul className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {c.tags.map((t) => (
                    <li
                      key={t}
                      className="border border-cyan/30 bg-cyan-soft px-2 py-0.5 text-cyan"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setActiveCert(c)}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded border border-cyan/40 bg-navy-light/60 py-2 text-xs font-mono text-cyan transition-all hover:bg-cyan hover:text-navy hover:shadow-cyan-glow cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Inspect Certificate</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 p-4 backdrop-blur-md"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-cyan/40 bg-navy-light shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-navy-lighter/70 bg-navy px-5 py-4">
              <div>
                <h4 className="font-bold text-slate-light text-base sm:text-lg">
                  {activeCert.title}
                </h4>
                <p className="text-xs text-slate">
                  {activeCert.org} ·{" "}
                  <span className="font-mono text-cyan">{activeCert.credentialId}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                aria-label="Close certificate preview"
                className="rounded-full p-2 text-slate hover:bg-navy-lighter hover:text-cyan transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="flex-1 overflow-auto bg-navy-dark/95 p-4 flex items-center justify-center">
              <img
                src={activeCert.img}
                alt={activeCert.title}
                className="max-h-[65vh] w-auto max-w-full rounded border border-navy-lighter object-contain shadow-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-navy-lighter/70 bg-navy px-5 py-3 text-xs">
              <span className="font-mono text-slate">
                Recipient: <strong className="text-slate-light">{activeCert.recipient}</strong>
              </span>
              <a
                href={activeCert.img}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-cyan bg-cyan/10 px-3 py-1 font-mono text-cyan transition-colors hover:bg-cyan hover:text-navy"
              >
                <span>Open Full Size</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- Contact Section (Brevo-Powered) ---------- */

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [ipAuthNotice, setIpAuthNotice] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("diptanshudas920@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard: diptanshudas920@gmail.com");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all contact fields before sending.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus("idle");
    setStatusMessage("");
    setIpAuthNotice(false);

    try {
      const response = await submitContactForm({
        data: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        },
      });

      if (response.success) {
        setSubmissionStatus("success");
        setStatusMessage(
          response.message || "Your message has been delivered directly to Diptanshu's inbox!",
        );
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmissionStatus("error");
        setStatusMessage(response.error || "Failed to deliver message.");
        if (
          response.error?.includes("authorised_ips") ||
          response.details?.includes("authorised_ips")
        ) {
          setIpAuthNotice(true);
        }
        toast.error(response.error || "Could not deliver email.");
      }
    } catch (err: unknown) {
      console.error("Submission error:", err);
      setSubmissionStatus("error");
      const errorMsg = err instanceof Error ? err.message : "An unexpected network error occurred.";
      setStatusMessage(errorMsg);
      toast.error("Error communicating with mail server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative px-5 py-32 md:px-10 lg:px-30">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p {...fadeUp} className="font-mono-label mb-3">
            06. What's Next?
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-slate-light"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="mt-4 text-slate leading-relaxed"
          >
            Whether you have a technical project in mind, an engineering role, or just want to
            discuss web systems and cybersecurity, my inbox is always open.
          </motion.p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Direct channels & Quick Connect */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Quick Email Card */}
            <div className="glass-panel rounded-lg p-6 border border-navy-lighter/60">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-cyan">
                  Direct Email
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
                </span>
              </div>
              <p className="text-lg font-bold text-slate-light font-mono select-all break-all">
                diptanshudas920@gmail.com
              </p>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded border border-cyan/40 bg-cyan-soft px-4 py-2 text-xs font-mono text-cyan transition-all hover:bg-cyan hover:text-navy cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied to Clipboard" : "Copy Email"}</span>
                </button>
                <a
                  href="mailto:diptanshudas920@gmail.com"
                  className="inline-flex items-center justify-center rounded border border-navy-lighter px-4 py-2 text-xs font-mono text-slate-light transition-all hover:border-cyan hover:text-cyan"
                >
                  Open Mail App
                </a>
              </div>
            </div>

            {/* Quick Details */}
            <div className="glass-panel rounded-lg p-6 border border-navy-lighter/60 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-cyan shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-light font-medium block">Location</span>
                  <span className="text-slate text-xs">West Bengal, India (UTC +05:30)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-cyan shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-light font-medium block">Response SLA</span>
                  <span className="text-slate text-xs">
                    Prompt replies guaranteed within 24 hours
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Github className="h-4 w-4 text-cyan shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-light font-medium block">GitHub Handle</span>
                  <a
                    href="https://github.com/Dip123456789577"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan text-xs font-mono hover:underline inline-flex items-center gap-1"
                  >
                    @Dip123456789577
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Availability Banner */}
            <div className="rounded-lg border border-cyan/30 bg-cyan-soft/30 p-4 text-xs font-mono text-cyan flex items-center gap-3">
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>
                Available for full-time engineering roles, high-impact freelance projects, and
                consultations.
              </span>
            </div>
          </motion.div>

          {/* Right Column: Direct Contact Form (Brevo-Backed) */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel rounded-lg p-8 border border-navy-lighter/60 text-left relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-navy-lighter/40 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-light">Send a Direct Message</h3>
                  <p className="text-xs text-slate mt-0.5">
                    Powered by transactional Brevo mail engine
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-cyan">
                  <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
                  Live Service
                </div>
              </div>

              {submissionStatus === "success" ? (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-cyan/40 bg-cyan-soft text-cyan">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-light">Message Sent!</h4>
                  <p className="text-sm text-slate max-w-md mx-auto leading-relaxed">
                    {statusMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmissionStatus("idle")}
                    className="mt-4 inline-flex items-center gap-2 rounded border border-cyan/40 bg-cyan/10 px-5 py-2 font-mono text-xs text-cyan transition-colors hover:bg-cyan hover:text-navy cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submissionStatus === "error" && (
                    <div className="rounded-lg border border-red-500/40 bg-red-950/40 p-4 text-xs text-red-200 space-y-2">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-red-300">Message Delivery Notice</strong>
                          <span>{statusMessage}</span>
                        </div>
                      </div>
                      {ipAuthNotice && (
                        <div className="mt-2 pt-2 border-t border-red-500/30 text-[11px] text-red-300">
                          <strong>Brevo Account Security:</strong> Please whitelist your IP in Brevo
                          settings at{" "}
                          <a
                            href="https://app.brevo.com/security/authorised_ips"
                            target="_blank"
                            rel="noreferrer"
                            className="underline text-cyan"
                          >
                            https://app.brevo.com/security/authorised_ips
                          </a>
                          . In the meantime, you can directly email{" "}
                          <a
                            href="mailto:diptanshudas920@gmail.com"
                            className="underline text-cyan"
                          >
                            diptanshudas920@gmail.com
                          </a>
                          .
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-slate mb-2">
                        Your Full Name <span className="text-cyan">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        placeholder="Ada Lovelace"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded border border-navy-lighter bg-navy/60 px-4 py-3 text-sm text-slate-light placeholder:text-slate/40 outline-none transition-colors focus:border-cyan"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-slate mb-2">
                        Your Email Address <span className="text-cyan">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        placeholder="ada@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded border border-navy-lighter bg-navy/60 px-4 py-3 text-sm text-slate-light placeholder:text-slate/40 outline-none transition-colors focus:border-cyan"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-slate mb-2">
                      Subject <span className="text-cyan">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      placeholder="Project Inquiry / Full Stack Role"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded border border-navy-lighter bg-navy/60 px-4 py-3 text-sm text-slate-light placeholder:text-slate/40 outline-none transition-colors focus:border-cyan"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-slate mb-2">
                      Your Message <span className="text-cyan">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      disabled={isSubmitting}
                      placeholder="Hi Diptanshu, I'd like to talk about..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full resize-y rounded border border-navy-lighter bg-navy/60 px-4 py-3 text-sm text-slate-light placeholder:text-slate/40 outline-none transition-colors focus:border-cyan"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <span className="font-mono text-xs text-slate">
                      Direct delivery to Diptanshu's verified inbox
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex items-center gap-2 rounded border border-cyan bg-cyan-soft px-7 py-3 font-mono text-sm text-cyan transition-all hover:bg-cyan hover:text-navy hover:cyan-glow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Side Rails & Footer ---------- */

export function SideRails() {
  return (
    <>
      <div className="fixed bottom-0 left-6 z-40 hidden flex-col items-center gap-6 lg:flex">
        {[
          { icon: Github, href: "https://github.com/Dip123456789577", label: "GitHub" },
          { icon: Mail, href: "mailto:diptanshudas920@gmail.com", label: "Email" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noreferrer" : undefined}
            aria-label={s.label}
            className="text-slate-light transition-all hover:-translate-y-1 hover:text-cyan"
          >
            <s.icon className="h-4 w-4" />
          </a>
        ))}
        <span className="h-24 w-px bg-slate-light/40" />
      </div>
      <div className="fixed bottom-0 right-8 z-40 hidden flex-col items-center gap-6 lg:flex">
        <a
          href="mailto:diptanshudas920@gmail.com"
          className="font-mono text-xs tracking-widest text-slate-light vertical-rl transition-colors hover:text-cyan"
          style={{ writingMode: "vertical-rl" }}
        >
          diptanshudas920@gmail.com
        </a>
        <span className="h-24 w-px bg-slate-light/40" />
      </div>
    </>
  );
}

export function Footer() {
  return (
    <footer className="relative px-5 pb-12 pt-16 md:px-10 lg:px-30">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 border-t border-navy-lighter/60 pt-10">
        <div className="flex gap-6 lg:hidden">
          {[
            { icon: Github, href: "https://github.com/Dip123456789577", label: "GitHub" },
            { icon: Mail, href: "mailto:diptanshudas920@gmail.com", label: "Email" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="text-slate-light hover:text-cyan"
              aria-label={item.label}
            >
              <item.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center font-mono text-xs text-slate">
          <span>
            Designed & built with precision by <strong className="text-cyan">Diptanshu Das</strong>
          </span>
          <span className="hidden sm:inline">·</span>
          <span>© {new Date().getFullYear()} All Rights Reserved</span>
        </div>
        <div className="text-[11px] font-mono text-slate/60">
          The Neotia University · Global Secora Technology · Semrush Certified
        </div>
      </div>
    </footer>
  );
}
