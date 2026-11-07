import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CursorGlow, GridBackdrop } from "@/components/portfolio/Background";
import { Navbar } from "@/components/portfolio/Navbar";
import { ResumeModal } from "@/components/portfolio/ResumeModal";
import {
  Hero,
  About,
  Skills,
  Experience,
  Projects,
  GitHubBlock,
  Certifications,
  Contact,
  SideRails,
  Footer,
} from "@/components/portfolio/Sections";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Diptanshu Das",
  jobTitle: "Full Stack Developer",
  url: "https://github.com/Dip123456789577",
  email: "diptanshudas920@gmail.com",
  sameAs: ["https://github.com/Dip123456789577"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "The Neotia University",
  },
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Web Application Security",
    "Tailwind CSS",
    "Cybersecurity",
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Diptanshu Das — Full Stack Developer & Cybersecurity Intern" },
      {
        name: "description",
        content:
          "Official portfolio of Diptanshu Das — Full Stack Developer & Cybersecurity Intern specializing in modern React 19, TypeScript, scalable web architectures, and UI engineering.",
      },
      {
        property: "og:title",
        content: "Diptanshu Das — Full Stack Developer & Cybersecurity Intern",
      },
      {
        property: "og:description",
        content:
          "Official portfolio of Diptanshu Das — building high-performance, accessible, and scalable web experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Diptanshu Das — Full Stack Developer" },
      {
        name: "twitter:description",
        content:
          "Explore production projects, verified credentials, tech stack, and interactive developer console.",
      },
      {
        name: "keywords",
        content:
          "Diptanshu Das, Full Stack Developer, React, TypeScript, Web Development, Software Engineer, Portfolio, Kolkata, The Neotia University",
      },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-navy text-slate-light">
      <GridBackdrop />
      <CursorGlow />
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />
      <SideRails />
      <main>
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubBlock />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
