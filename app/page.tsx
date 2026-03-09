import { Navbar } from "@/components/ui/navbar"
import { SplineHero } from "@/components/ui/spline-hero"
import { ProjectsSection } from "@/components/ui/projects-section"
import { AboutSection } from "@/components/ui/about-section"
import { ContactSection } from "@/components/ui/contact-section"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <SplineHero />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <footer className="border-t border-white/[0.06] py-8 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-neutral-600">
            © 2025 WebCraft Studio. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <a href="https://github.com/ashwinmcgithub" className="text-neutral-600 hover:text-white transition-colors text-sm">GitHub</a>
            <a href="#contact" className="text-neutral-600 hover:text-white transition-colors text-sm">Contact</a>
          </div>
        </div>
      </footer>
    </>
  )
}
