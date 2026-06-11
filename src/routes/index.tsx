import { createFileRoute } from "@tanstack/react-router";
import { CursorGlow, GridBackdrop } from "@/components/portfolio/Background";
import { Navbar } from "@/components/portfolio/Navbar";
import {
  Hero, About, Skills, Experience, Projects,
  GitHubBlock, Certifications, Contact, SideRails, Footer,
} from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Diptanshu Das — Full Stack Developer" },
      {
        name: "description",
        content:
          "Diptanshu Das — Full Stack Developer building modern, scalable, interactive and user-focused digital experiences.",
      },
      { property: "og:title", content: "Diptanshu Das — Full Stack Developer" },
      { property: "og:description", content: "Premium digital portfolio of Diptanshu Das — modern, scalable, interactive web experiences." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-navy text-slate-light">
      <GridBackdrop />
      <CursorGlow />
      <Navbar />
      <SideRails />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubBlock />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
