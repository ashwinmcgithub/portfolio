'use client'

import SchemaCard from "@/components/ui/schema-card-with-animated-wave-visualizer"
import {
  BadgeDollarSign,
  Bike,
  Dumbbell,
  Flower2,
  ForkKnife,
  HeartPulse,
  Printer,
  Sparkles,
  Trophy,
} from "lucide-react"

const completedProjects = [
  {
    title: "Ultimate Fight Club",
    category: "Sports & Martial Arts",
    description:
      "Full multi-discipline martial arts academy website with class schedules, trainer profiles, membership plans, and a high-impact dark aesthetic built for the MMA audience.",
    href: "#",
    tags: ["HTML", "CSS", "JavaScript"],
    accentColor: "#e63946",
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    icon: Trophy,
    year: "2024",
  },
]

const demoProjects = [
  {
    title: "Old Monk Food Street",
    category: "Food & Hospitality",
    description:
      "Premium food court website with immersive dark-gold aesthetics, multi-page navigation, gallery, events and contact.",
    href: "/portfolio/demos/food-street/index.html",
    tags: ["HTML", "CSS", "JavaScript"],
    accentColor: "#d4a017",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    icon: ForkKnife,
    pages: 5,
  },
  {
    title: "AyurLife Wellness",
    category: "Healthcare",
    description:
      "Ayurveda healing center with calming earth tones, treatment showcases and a serene, wellness-first layout.",
    href: "/portfolio/demos/ayurveda/index.html",
    tags: ["HTML", "CSS"],
    accentColor: "#4a7c59",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    icon: Flower2,
    pages: 2,
  },
  {
    title: "Elegance Studio",
    category: "Beauty & Lifestyle",
    description:
      "Luxury beauty salon with soft pinks, elegant serif typography and a refined service showcase.",
    href: "/portfolio/demos/beauty-salon/index.html",
    tags: ["HTML", "CSS"],
    accentColor: "#c9a0b4",
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    icon: Sparkles,
    pages: 1,
  },
  {
    title: "PrimeLedger & Co.",
    category: "Finance",
    description:
      "Professional CA firm website with a trust-first design, clear service layout and corporate blue palette.",
    href: "/portfolio/demos/ca-firm/index.html",
    tags: ["HTML", "CSS"],
    accentColor: "#4a6fa5",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    icon: BadgeDollarSign,
    pages: 1,
  },
  {
    title: "BrightSmile Dental",
    category: "Healthcare",
    description:
      "Modern dental clinic with a clean, friendly design, services breakdown and appointment flow.",
    href: "/portfolio/demos/dental/index.html",
    tags: ["HTML", "CSS"],
    accentColor: "#4ac0c0",
    imageUrl:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    icon: HeartPulse,
    pages: 2,
  },
  {
    title: "FitCore Fitness",
    category: "Health & Fitness",
    description:
      "High-energy gym website with bold dark typography, workout plans and motivational design.",
    href: "/portfolio/demos/gym/index.html",
    tags: ["HTML", "CSS"],
    accentColor: "#e85d04",
    imageUrl:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
    icon: Dumbbell,
    pages: 1,
  },
  {
    title: "PrintHub Digital Press",
    category: "Business Services",
    description:
      "Professional printing company website with service catalog, pricing showcase and bold layout.",
    href: "/portfolio/demos/printing/index.html",
    tags: ["HTML", "CSS"],
    accentColor: "#7c5cbf",
    imageUrl:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80",
    icon: Printer,
    pages: 1,
  },
  {
    title: "Riders Point",
    category: "Automotive",
    description:
      "Driving school website with course packages, instructor profiles and an energetic visual identity.",
    href: "/portfolio/demos/driving-school/index.html",
    tags: ["HTML", "CSS"],
    accentColor: "#e63946",
    imageUrl:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80",
    icon: Bike,
    pages: 1,
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Featured Work
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Client Projects
          </h2>
          <p className="mt-3 max-w-md text-neutral-500">
            Real websites built for real businesses, each designed from scratch with a unique identity.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Completed
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>

        <div className="mb-14 grid grid-cols-1 gap-5">
          {completedProjects.map((project) => (
            <SchemaCard
              key={project.title}
              badge="Completed Project"
              title={project.title}
              description={project.description}
              href={project.href}
              meta={`${project.category} · ${project.year}`}
              tags={project.tags}
              accentColor={project.accentColor}
              imageUrl={project.imageUrl}
              icon={project.icon}
              ctaLabel="View Site"
              statusLabel="Client Live"
              featured
            />
          ))}
        </div>

        <div className="mb-6 flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Demo Sites
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-[10px] text-neutral-600">{demoProjects.length} projects</span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {demoProjects.map((project) => (
            <SchemaCard
              key={project.title}
              badge="Demo Site"
              title={project.title}
              description={project.description}
              href={project.href}
              meta={`${project.category} · ${project.pages} page${project.pages > 1 ? "s" : ""}`}
              tags={project.tags}
              accentColor={project.accentColor}
              imageUrl={project.imageUrl}
              icon={project.icon}
              ctaLabel="Open Demo"
              statusLabel="Preview Ready"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
