import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Printer,
  Download,
  Mail,
  Github,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  Award,
} from "lucide-react";
import { toast } from "sonner";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("diptanshudas920@gmail.com");
    toast.success("Email copied to clipboard: diptanshudas920@gmail.com");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-xl border border-cyan/40 bg-navy-light shadow-2xl overflow-hidden text-slate-light"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-navy-lighter/70 bg-navy px-5 py-3.5 print:hidden">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-cyan/80 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-cyan font-semibold">
                  Official Curriculum Vitae — Diptanshu Das
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 rounded-md border border-cyan/50 bg-cyan/10 px-3 py-1.5 font-mono text-xs text-cyan transition-all hover:bg-cyan hover:text-navy"
                  title="Print or Save as PDF"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-1.5 text-slate transition-colors hover:bg-navy-lighter hover:text-cyan"
                  aria-label="Close resume"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Printable Resume Sheet */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-navy-light/90 print:bg-white print:text-black print:p-0">
              {/* Header */}
              <div className="border-b border-navy-lighter/60 pb-6 print:border-gray-300">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-light print:text-black">
                      Diptanshu Das
                    </h1>
                    <p className="mt-1 text-base sm:text-lg font-mono text-cyan print:text-blue-700">
                      Full Stack Developer & Cyber Security Intern
                    </p>
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-slate print:text-gray-600 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-cyan print:text-blue-700" />
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="hover:text-cyan underline decoration-dotted transition-colors"
                      >
                        diptanshudas920@gmail.com
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5">
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
                <p className="mt-4 text-sm text-slate leading-relaxed print:text-gray-700">
                  Passionate and detail-oriented Full Stack Developer specializing in TypeScript,
                  React, modern web architectures, and secure web application development. Proven
                  track record in building high-performance e-commerce experiences, interactive
                  applications, and applying cybersecurity standards.
                </p>
              </div>

              {/* Technical Proficiencies */}
              <div>
                <h2 className="font-mono text-xs uppercase tracking-wider text-cyan font-bold mb-3 print:text-blue-800">
                  Technical Proficiencies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                  <div className="rounded-lg border border-navy-lighter/50 bg-navy/40 p-3 print:border-gray-300 print:bg-gray-50">
                    <span className="font-bold text-slate-light print:text-black block mb-1">
                      Frontend Engineering
                    </span>
                    <span className="text-slate print:text-gray-700">
                      TypeScript, React 19, Next.js, TanStack Start/Router, Tailwind CSS v4, Framer
                      Motion, Responsive Design
                    </span>
                  </div>
                  <div className="rounded-lg border border-navy-lighter/50 bg-navy/40 p-3 print:border-gray-300 print:bg-gray-50">
                    <span className="font-bold text-slate-light print:text-black block mb-1">
                      Backend & Systems
                    </span>
                    <span className="text-slate print:text-gray-700">
                      Node.js, Express, REST APIs, PostgreSQL, MongoDB, Redis, Nitro Server Engine,
                      Serverless Functions
                    </span>
                  </div>
                  <div className="rounded-lg border border-navy-lighter/50 bg-navy/40 p-3 print:border-gray-300 print:bg-gray-50">
                    <span className="font-bold text-slate-light print:text-black block mb-1">
                      Tools & Security
                    </span>
                    <span className="text-slate print:text-gray-700">
                      Git/GitHub, Docker, Vite, Brevo API, Web Vulnerability Assessment, Linux,
                      Figma, CI/CD
                    </span>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h2 className="font-mono text-xs uppercase tracking-wider text-cyan font-bold mb-3 print:text-blue-800">
                  Experience & Internships
                </h2>
                <div className="space-y-4">
                  <div className="rounded-lg border border-navy-lighter/50 bg-navy/30 p-4 print:border-gray-300 print:bg-transparent">
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
                    <ul className="mt-2 space-y-1 text-xs sm:text-sm text-slate print:text-gray-700 list-disc list-inside">
                      <li>
                        Conducted hands-on security evaluations, vulnerability identification, and
                        threat analysis for web applications.
                      </li>
                      <li>
                        Implemented defensive programming principles and secure authentication
                        protocols to protect user data.
                      </li>
                      <li>
                        Collaborated with senior security engineers on practical assignments and
                        modern security auditing pipelines.
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-navy-lighter/50 bg-navy/30 p-4 print:border-gray-300 print:bg-transparent">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-bold text-slate-light print:text-black">
                        Independent Full Stack Developer & Consultant
                      </h3>
                      <span className="font-mono text-xs text-slate print:text-gray-600">
                        2024 – Present
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1 text-xs sm:text-sm text-slate print:text-gray-700 list-disc list-inside">
                      <li>
                        Designed and architected interactive web applications with sub-100ms
                        response times and 99+ Lighthouse performance.
                      </li>
                      <li>
                        Engineered bespoke e-commerce experiences (LUXE Atelier), interactive
                        architectural tools, and growth agency websites.
                      </li>
                      <li>
                        Built and maintained clean TypeScript codebases leveraging modern React
                        ecosystem, TanStack router, and Tailwind CSS.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Verified Certifications */}
              <div>
                <h2 className="font-mono text-xs uppercase tracking-wider text-cyan font-bold mb-3 print:text-blue-800">
                  Verified Certifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-lg border border-navy-lighter/40 bg-navy/30 p-3 print:border-gray-300">
                    <div className="flex items-center gap-1.5 text-cyan print:text-blue-700 font-semibold text-xs">
                      <Award className="h-3.5 w-3.5" />
                      Cyber Security Internship
                    </div>
                    <div className="text-xs text-slate print:text-gray-700 mt-1">
                      Global Secora Technology
                    </div>
                    <div className="font-mono text-[11px] text-slate-light print:text-gray-800 mt-1 truncate">
                      ID: GST/STI/2026/0063
                    </div>
                  </div>

                  <div className="rounded-lg border border-navy-lighter/40 bg-navy/30 p-3 print:border-gray-300">
                    <div className="flex items-center gap-1.5 text-cyan print:text-blue-700 font-semibold text-xs">
                      <Award className="h-3.5 w-3.5" />
                      AI Search Operating System
                    </div>
                    <div className="text-xs text-slate print:text-gray-700 mt-1">
                      Semrush Academy
                    </div>
                    <div className="font-mono text-[11px] text-slate-light print:text-gray-800 mt-1 truncate">
                      ID: b3a6d5313c
                    </div>
                  </div>

                  <div className="rounded-lg border border-navy-lighter/40 bg-navy/30 p-3 print:border-gray-300">
                    <div className="flex items-center gap-1.5 text-cyan print:text-blue-700 font-semibold text-xs">
                      <Award className="h-3.5 w-3.5" />
                      Getting Started with Semrush
                    </div>
                    <div className="text-xs text-slate print:text-gray-700 mt-1">
                      Semrush Academy
                    </div>
                    <div className="font-mono text-[11px] text-slate-light print:text-gray-800 mt-1 truncate">
                      ID: 56814a603d
                    </div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="font-mono text-xs uppercase tracking-wider text-cyan font-bold mb-3 print:text-blue-800">
                  Education
                </h2>
                <div className="rounded-lg border border-navy-lighter/50 bg-navy/30 p-4 print:border-gray-300 print:bg-transparent">
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
                    Focus: Software Engineering, Data Structures & Algorithms, Network Security,
                    Modern Web Development.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="flex items-center justify-between border-t border-navy-lighter/70 bg-navy px-6 py-3 text-xs text-slate print:hidden">
              <span>Ready for immediate full-time software engineering roles and contracts.</span>
              <button
                type="button"
                onClick={handlePrint}
                className="font-mono text-cyan hover:underline inline-flex items-center gap-1"
              >
                <Download className="h-3 w-3" /> Save Copy
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
