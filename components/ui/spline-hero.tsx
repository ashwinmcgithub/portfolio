'use client'

import { useEffect, useRef } from "react"
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"

export function SplineHero() {
  const robotWrapRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const robot = robotWrapRef.current
    if (!robot) return

    const onMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1
      targetRef.current.x = normalizedX * 50
      targetRef.current.y = normalizedY * 30
    }

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      const normalizedX = (touch.clientX / window.innerWidth) * 2 - 1
      const normalizedY = (touch.clientY / window.innerHeight) * 2 - 1
      targetRef.current.x = normalizedX * 30
      targetRef.current.y = normalizedY * 20
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("touchmove", onTouchMove, { passive: true })

    let frameId = 0
    const animate = () => {
      const c = currentRef.current
      const t = targetRef.current
      c.x += (t.x - c.x) * 0.06
      c.y += (t.y - c.y) * 0.06
      robot.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`
      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col md:flex-row">
      <Spotlight className="-top-40 left-0 md:left-72 md:-top-20" fill="white" />

      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Robot — full background on mobile, side panel on desktop */}
      <div className="absolute inset-0 flex items-center justify-center md:relative md:inset-auto md:flex-1 pointer-events-none md:pointer-events-auto">
        <div
          ref={robotWrapRef}
          className="w-full h-full will-change-transform"
          style={{ opacity: undefined }}
        >
          {/* dim the robot on mobile so text stays readable */}
          <div className="absolute inset-0 bg-black/60 z-10 md:hidden" />
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Text content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-20 pb-24 md:py-0 md:order-first">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-emerald-400 tracking-wide">Available for Projects</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
          <span className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">Creative</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Web Developer
          </span>
        </h1>

        <p className="mt-6 text-neutral-400 text-base md:text-lg max-w-[420px] leading-relaxed">
          Building immersive digital experiences - from interactive 3D worlds to pixel-perfect web applications.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-100 transition-all duration-200 active:scale-95"
          >
            View Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 7H11.5M7 2.5L11.5 7L7 11.5"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-200"
          >
            Let&apos;s Talk
          </a>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {["React", "Next.js", "Three.js", "TypeScript", "Tailwind", "Figma"].map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/[0.04] text-neutral-500 hover:text-neutral-300 hover:border-white/20 transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-widest text-neutral-500">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-neutral-500 to-transparent" />
      </div>
    </section>
  )
}
