import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Printer,
  Mail,
  Github,
  Download,
  ShieldCheck,
  Award,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Curriculum Vitae — Diptanshu Das | Full Stack Developer" },
      {
        name: "description",
        content:
          "Official Curriculum Vitae of Diptanshu Das — Full Stack Developer & Cybersecurity Intern. Educated at The Neotia University (B.Tech CSE), verified credentials at Global Secora Technology and Semrush.",
      },
      { property: "og:title", content: "Curriculum Vitae — Diptanshu Das" },
      {
        property: "og:description",
        content: "Explore the verified resume and credentials of Diptanshu Das.",
      },
    ],
    links: [{ rel: "canonical", href: "/resume" }],
  }),
  component: ResumePage,
});

function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("diptanshudas920@gmail.com");
    toast.success("Email copied: diptanshudas920@gmail.com");
  };

  return (
    <div className="min-h-screen bg-navy text-slate-light print:bg-white print:text-black py-8 px-4 sm:px-8">
      {/* Top action navigation (hidden when printing) */}
      <div className="mx-auto max-w-4xl mb-8 flex items-center justify-between print:hidden">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md border border-navy-lighter bg-navy-light/60 px-4 py-2 font-mono text-xs text-slate-light transition-all hover:border-cyan hover:text-cyan"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Portfolio</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1.5 rounded-md border border-navy-lighter bg-navy-light/60 px-3.5 py-2 font-mono text-xs text-slate-light transition-all hover:border-cyan hover:text-cyan cursor-pointer"
          >
            <Mail className="h-3.5 w-3.5 text-cyan" />
            <span>Copy Email</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-md border border-cyan bg-cyan-soft px-4 py-2 font-mono text-xs text-cyan transition-all hover:bg-cyan hover:text-navy cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <main className="mx-auto max-w-4xl rounded-xl border border-navy-lighter/70 bg-navy-light/40 p-6 sm:p-12 shadow-2xl print:border-none print:shadow-none print:p-0 print:bg-white">
        {/* Header */}
        <header className="border-b border-navy-lighter/60 pb-8 print:border-gray-300">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-light print:text-black">
                Diptanshu Das
              </h1>
              <p className="mt-1 text-base sm:text-lg font-mono text-cyan print:text-blue-700">
                Full Stack Developer & Cyber Security Intern
              </p>
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate print:text-gray-600 space-y-1.5">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-cyan print:text-blue-700" />
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="hover:text-cyan underline decoration-dotted transition-colors cursor-pointer"
                >
                  diptanshudas920@gmail.com
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Github className="h-3.5 w-3.5 text-cyan print:text-blue-700" />
                <a
                  href="https://github.com/Dip123456789577"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan underline transition-colors"
                >
                  github.com/Dip123456789577
                </a>
              </div>
              <div>Location: West Bengal, India</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-slate leading-relaxed print:text-gray-700">
            Detail-oriented Full Stack Developer and Cybersecurity enthusiast pursuing a B.Tech in
            Computer Science & Engineering at The Neotia University. Hands-on experience developing
            high-performance web applications with React 19, TypeScript, and modern backend
            services, along with verified industry internship experience at Global Secora Technology
            in vulnerability assessment and web application security.
          </p>
        </header>

        {/* Technical Proficiencies */}
        <section className="py-8 border-b border-navy-lighter/60 print:border-gray-300">
          <h2 className="font-mono text-xs uppercase tracking-wider text-cyan font-bold mb-4 print:text-blue-800">
            Technical Proficiencies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="rounded-lg border border-navy-lighter/40 bg-navy/40 p-4 print:border-gray-300 print:bg-gray-50">
              <span className="font-bold text-slate-light print:text-black block mb-1">
                Frontend Engineering
              </span>
              <span className="text-slate print:text-gray-700 leading-relaxed">
                TypeScript, React 19, Next.js, TanStack Start & Router, Tailwind CSS v4, Framer
                Motion, Responsive UX/UI
              </span>
            </div>
            <div className="rounded-lg border border-navy-lighter/40 bg-navy/40 p-4 print:border-gray-300 print:bg-gray-50">
              <span className="font-bold text-slate-light print:text-black block mb-1">
                Backend & Systems
              </span>
              <span className="text-slate print:text-gray-700 leading-relaxed">
                Node.js, Express.js, Nitro Server Engine, PostgreSQL, MongoDB, Redis, REST & RPC API
                Architectures
              </span>
            </div>
            <div className="rounded-lg border border-navy-lighter/40 bg-navy/40 p-4 print:border-gray-300 print:bg-gray-50">
              <span className="font-bold text-slate-light print:text-black block mb-1">
                DevOps & Security
              </span>
              <span className="text-slate print:text-gray-700 leading-relaxed">
                Vulnerability Assessment, Git / GitHub, Docker, Brevo Transactional API, Vite, Linux
                Systems, Web Security
              </span>
            </div>
          </div>
        </section>

        {/* Experience & Internships */}
        <section className="py-8 border-b border-navy-lighter/60 print:border-gray-300">
          <h2 className="font-mono text-xs uppercase tracking-wider text-cyan font-bold mb-4 print:text-blue-800">
            Experience & Internships
          </h2>
          <div className="space-y-6">
            <div className="rounded-lg border border-navy-lighter/40 bg-navy/30 p-5 print:border-gray-300 print:bg-transparent">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-cyan print:text-blue-700" />
                  <h3 className="font-bold text-slate-light print:text-black">
                    Cyber Security Intern — Global Secora Technology Pvt. Ltd.
                  </h3>
                </div>
                <span className="font-mono text-xs text-slate print:text-gray-600">
                  June 2026 – July 2026
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-cyan print:text-blue-700">
                Credential ID: GST/STI/2026/0063 · Summer Training cum Internship Program
              </p>
              <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate print:text-gray-700 list-disc list-inside">
                <li>
                  Conducted practical vulnerability identification, security protocol validation,
                  and secure full-stack software practices.
                </li>
                <li>
                  Examined common attack surfaces and threat vectors across web applications
                  following industry cybersecurity benchmarks.
                </li>
                <li>
                  Delivered dedicated security modules and threat reviews under executive
                  leadership.
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-navy-lighter/40 bg-navy/30 p-5 print:border-gray-300 print:bg-transparent">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-bold text-slate-light print:text-black">
                  Independent Full Stack Developer & Consultant
                </h3>
                <span className="font-mono text-xs text-slate print:text-gray-600">
                  2024 – Present
                </span>
              </div>
              <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate print:text-gray-700 list-disc list-inside">
                <li>
                  Engineered high-performance web applications including LUXE Atelier (e-commerce)
                  with sub-100ms response times and 99+ Lighthouse score.
                </li>
                <li>
                  Designed bespoke interactive interfaces, cabinetry configuration sliders (FORMA
                  Kitchen Studio), and agency platforms.
                </li>
                <li>
                  Implemented modern transactional mail handlers, type-safe API workflows, and
                  responsive styling.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Selected Production Projects */}
        <section className="py-8 border-b border-navy-lighter/60 print:border-gray-300">
          <h2 className="font-mono text-xs uppercase tracking-wider text-cyan font-bold mb-4 print:text-blue-800">
            Selected Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="rounded-lg border border-navy-lighter/40 bg-navy/30 p-4 print:border-gray-300">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-light print:text-black">
                  LUXE Atelier Storefront
                </h4>
                <a
                  href="https://luxe-e-commerce-refined.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan print:text-blue-700 inline-flex items-center gap-1 font-mono text-xs"
                >
                  Live Demo <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="mt-2 text-slate print:text-gray-700">
                Editorial luxury commerce platform featuring currency conversion, bag checkout, and
                sub-100ms rendering.
              </p>
              <div className="mt-2 font-mono text-[11px] text-cyan print:text-blue-700">
                React · TypeScript · Tailwind CSS · 99+ Lighthouse
              </div>
            </div>

            <div className="rounded-lg border border-navy-lighter/40 bg-navy/30 p-4 print:border-gray-300">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-light print:text-black">KINETIC Atelier</h4>
                <a
                  href="https://brand-catalyst-nine.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan print:text-blue-700 inline-flex items-center gap-1 font-mono text-xs"
                >
                  Live Demo <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="mt-2 text-slate print:text-gray-700">
                Digital growth and creative agency architecture with dynamic metric counters and
                interactive capability panels.
              </p>
              <div className="mt-2 font-mono text-[11px] text-cyan print:text-blue-700">
                Next.js · Framer Motion · TypeScript
              </div>
            </div>
          </div>
        </section>

        {/* Verified Certifications */}
        <section className="py-8 border-b border-navy-lighter/60 print:border-gray-300">
          <h2 className="font-mono text-xs uppercase tracking-wider text-cyan font-bold mb-4 print:text-blue-800">
            Verified Credentials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-navy-lighter/40 bg-navy/30 p-3.5 print:border-gray-300">
              <div className="flex items-center gap-1.5 text-cyan print:text-blue-700 font-semibold text-xs">
                <Award className="h-4 w-4" />
                Cyber Security Internship
              </div>
              <div className="text-xs text-slate print:text-gray-700 mt-1">
                Global Secora Technology
              </div>
              <div className="font-mono text-[11px] text-slate-light print:text-gray-800 mt-1">
                ID: GST/STI/2026/0063
              </div>
            </div>

            <div className="rounded-lg border border-navy-lighter/40 bg-navy/30 p-3.5 print:border-gray-300">
              <div className="flex items-center gap-1.5 text-cyan print:text-blue-700 font-semibold text-xs">
                <Award className="h-4 w-4" />
                AI Search Operating System
              </div>
              <div className="text-xs text-slate print:text-gray-700 mt-1">Semrush Academy</div>
              <div className="font-mono text-[11px] text-slate-light print:text-gray-800 mt-1">
                ID: b3a6d5313c
              </div>
            </div>

            <div className="rounded-lg border border-navy-lighter/40 bg-navy/30 p-3.5 print:border-gray-300">
              <div className="flex items-center gap-1.5 text-cyan print:text-blue-700 font-semibold text-xs">
                <Award className="h-4 w-4" />
                Getting Started with Semrush
              </div>
              <div className="text-xs text-slate print:text-gray-700 mt-1">Semrush Academy</div>
              <div className="font-mono text-[11px] text-slate-light print:text-gray-800 mt-1">
                ID: 56814a603d
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="pt-8">
          <h2 className="font-mono text-xs uppercase tracking-wider text-cyan font-bold mb-4 print:text-blue-800">
            Education
          </h2>
          <div className="rounded-lg border border-navy-lighter/40 bg-navy/30 p-5 print:border-gray-300 print:bg-transparent">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="font-bold text-slate-light print:text-black">
                  Bachelor of Technology (B.Tech) — Computer Science & Engineering
                </h3>
                <p className="text-xs sm:text-sm text-cyan print:text-blue-700 font-mono mt-0.5">
                  The Neotia University
                </p>
              </div>
              <span className="font-mono text-xs text-slate print:text-gray-600">
                West Bengal, India
              </span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate print:text-gray-700">
              Key Focus: Software Engineering, Data Structures & Algorithms, Network Security,
              Modern Web Architectures.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-4xl mt-8 text-center text-xs font-mono text-slate/70 print:hidden">
        Official document verified for Diptanshu Das · Updated {new Date().getFullYear()}
      </footer>
    </div>
  );
}
