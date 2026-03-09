const skills = [
  { name: "HTML / CSS", level: 98 },
  { name: "JavaScript", level: 92 },
  { name: "React / Next.js", level: 85 },
  { name: "Three.js / WebGL", level: 80 },
  { name: "UI / UX Design", level: 88 },
  { name: "TypeScript", level: 78 },
]

const stats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "3+", label: "Years Experience" },
  { value: "∞", label: "Coffee Consumed" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-28 px-6 md:px-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              About Me
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
              Turning ideas into<br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                digital reality
              </span>
            </h2>
            <p className="mt-6 text-neutral-400 leading-relaxed">
              I'm a creative web developer based in Kerala, India — specializing in building
              stunning, performant websites for businesses of all sizes. Every project is crafted
              with care, from wireframe to final pixel.
            </p>
            <p className="mt-4 text-neutral-500 leading-relaxed">
              I blend strong design instincts with solid engineering — whether it's a
              immersive 3D portfolio, an e-commerce storefront, or a business landing page
              that converts.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="p-4 rounded-xl border border-white/[0.07] bg-white/[0.02]">
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-neutral-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Skills */}
          <div>
            <h3 className="text-sm font-medium text-neutral-400 mb-6">Skills & Tools</h3>
            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-neutral-300">{skill.name}</span>
                    <span className="text-xs text-neutral-600">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Tool badges */}
            <div className="mt-8 flex flex-wrap gap-2">
              {['VS Code', 'Figma', 'Git', 'Vercel', 'Netlify', 'Blender', 'Spline'].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 text-xs rounded-lg border border-white/10 bg-white/[0.03] text-neutral-400"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
