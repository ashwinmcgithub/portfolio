'use client'

import { useState } from 'react'

const projects = [
  {
    title: "Old Monk Food Street",
    category: "Food & Hospitality",
    description: "Premium food court website with immersive dark-gold aesthetics, multi-page navigation, gallery, events and contact.",
    href: "/portfolio/demos/food-street/index.html",
    tags: ["HTML", "CSS", "JavaScript"],
    accent: "#d4a017",
    bg: "from-[#1a0a00] to-[#2d1400]",
    icon: "🍽️",
    pages: 5,
  },
  {
    title: "AyurLife Wellness",
    category: "Healthcare",
    description: "Ayurveda healing center with calming earth tones, treatment showcases and a serene, wellness-first layout.",
    href: "/portfolio/demos/ayurveda/index.html",
    tags: ["HTML", "CSS"],
    accent: "#4a7c59",
    bg: "from-[#0a1a0a] to-[#0f2a0f]",
    icon: "🌿",
    pages: 2,
  },
  {
    title: "Elegance Studio",
    category: "Beauty & Lifestyle",
    description: "Luxury beauty salon with soft pinks, elegant serif typography and a refined service showcase.",
    href: "/portfolio/demos/beauty-salon/index.html",
    tags: ["HTML", "CSS"],
    accent: "#c9a0b4",
    bg: "from-[#1a0a10] to-[#2a1020]",
    icon: "✨",
    pages: 1,
  },
  {
    title: "PrimeLedger & Co.",
    category: "Finance",
    description: "Professional CA firm website with a trust-first design, clear service layout and corporate blue palette.",
    href: "/portfolio/demos/ca-firm/index.html",
    tags: ["HTML", "CSS"],
    accent: "#4a6fa5",
    bg: "from-[#080f1a] to-[#101e35]",
    icon: "📊",
    pages: 1,
  },
  {
    title: "BrightSmile Dental",
    category: "Healthcare",
    description: "Modern dental clinic with a clean, friendly design, services breakdown and appointment flow.",
    href: "/portfolio/demos/dental/index.html",
    tags: ["HTML", "CSS"],
    accent: "#4ac0c0",
    bg: "from-[#081520] to-[#0a2030]",
    icon: "🦷",
    pages: 2,
  },
  {
    title: "FitCore Fitness",
    category: "Health & Fitness",
    description: "High-energy gym website with bold dark typography, workout plans and motivational design.",
    href: "/portfolio/demos/gym/index.html",
    tags: ["HTML", "CSS"],
    accent: "#e85d04",
    bg: "from-[#100800] to-[#1f1000]",
    icon: "💪",
    pages: 1,
  },
  {
    title: "PrintHub Digital Press",
    category: "Business Services",
    description: "Professional printing company website with service catalog, pricing showcase and bold layout.",
    href: "/portfolio/demos/printing/index.html",
    tags: ["HTML", "CSS"],
    accent: "#7c5cbf",
    bg: "from-[#0d0a1a] to-[#18122e]",
    icon: "🖨️",
    pages: 1,
  },
  {
    title: "Riders Point",
    category: "Automotive",
    description: "Driving school website with course packages, instructor profiles and an energetic visual identity.",
    href: "/portfolio/demos/driving-school/index.html",
    tags: ["HTML", "CSS"],
    accent: "#e63946",
    bg: "from-[#1a0608] to-[#2d0a0e]",
    icon: "🏍️",
    pages: 1,
  },
]

export function ProjectsSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="projects" className="py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Featured Work
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
            Client Projects
          </h2>
          <p className="mt-3 text-neutral-500 max-w-md">
            Real websites built for real businesses — each designed from scratch with a unique identity.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.map((project, i) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden flex flex-col transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
            >
              {/* Card top — colored preview */}
              <div
                className={`relative h-44 bg-gradient-to-br ${project.bg} flex items-center justify-center overflow-hidden`}
              >
                {/* Accent glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${project.accent}22 0%, transparent 70%)`,
                  }}
                />
                <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
                  {project.icon}
                </span>
                {/* Pages badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-[10px] text-neutral-400">
                  {project.pages}p
                </div>
              </div>

              {/* Card body */}
              <div className="flex-1 p-5 flex flex-col">
                <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-600">
                  {project.category}
                </span>
                <h3 className="mt-1.5 text-sm font-semibold text-white leading-snug">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-500 leading-relaxed line-clamp-3 flex-1">
                  {project.description}
                </p>

                {/* Tags + arrow */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full border border-white/[0.06] bg-white/[0.03] text-[10px] text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-200">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
