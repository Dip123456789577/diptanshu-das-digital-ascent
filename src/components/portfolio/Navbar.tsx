import { useEffect, useState } from "react";

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement;
      setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
      let current = active;
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top < 120) current = item.id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-panel py-3" : "py-5 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#top" className="group flex items-center gap-2 font-mono text-cyan">
          <span className="text-glow text-lg font-bold tracking-tight">D.D.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`group relative px-4 py-2 text-sm transition-colors ${
                  active === item.id ? "text-cyan" : "text-slate-light hover:text-cyan"
                }`}
              >
                <span className="mr-1.5 font-mono text-xs text-cyan/70">
                  0{i + 1}.
                </span>
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a
              href="#"
              className="rounded-md border border-cyan px-4 py-2 font-mono text-sm text-cyan transition-all hover:bg-cyan-soft hover:cyan-glow"
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-cyan p-2"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-6 bg-cyan transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-cyan transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-cyan transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-panel mx-5 mt-3 rounded-lg p-4">
          <ul className="flex flex-col gap-1">
            {NAV.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-sm text-slate-light hover:bg-navy-lighter/40 hover:text-cyan"
                >
                  <span className="mr-2 font-mono text-xs text-cyan">0{i + 1}.</span>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-md border border-cyan px-3 py-3 text-center font-mono text-sm text-cyan"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Scroll progress bar */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-navy-lighter/50">
        <div
          className="h-full bg-cyan transition-[width] duration-150"
          style={{ width: `${progress}%`, boxShadow: "0 0 10px rgba(100,255,218,0.8)" }}
        />
      </div>
    </header>
  );
}
