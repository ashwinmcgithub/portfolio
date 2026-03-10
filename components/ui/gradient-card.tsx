'use client'

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"

interface GradientCardProps {
  title: string
  category: string
  description: string
  href: string
  tags: string[]
  accent: string
  icon: string
  pages: number
  badgeLabel?: string
  statusLabel?: string
}

export function GradientCard({
  title,
  category,
  description,
  href,
  tags,
  accent,
  icon,
  pages,
  badgeLabel = "Demo",
  statusLabel,
}: GradientCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setRotation({
      x: -(y / rect.height) * 8,
      y: (x / rect.width) * 8,
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotation({ x: 0, y: 0 })
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      <motion.div
        ref={cardRef}
        className="relative rounded-2xl overflow-hidden cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          backgroundColor: "#0a0a0f",
          boxShadow: isHovered
            ? `0 -8px 60px 8px ${accent}33, 0 20px 60px 0 rgba(0,0,0,0.7), 0 0 0 1px ${accent}22`
            : `0 -4px 40px 4px ${accent}18, 0 10px 40px 0 rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)`,
        }}
        initial={{ y: 0 }}
        animate={{
          y: isHovered ? -6 : 0,
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(160deg, #0d0d14 0%, #08080e 60%, #050508 100%)",
          }}
        />

        <motion.div
          className="absolute inset-x-0 top-0 h-48 z-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${accent}28 0%, transparent 70%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0.6 }}
          transition={{ duration: 0.4 }}
        />

        <motion.div
          className="absolute z-10 pointer-events-none rounded-full"
          style={{
            width: 160,
            height: 160,
            background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
            left: mouse.x - 80,
            top: mouse.y - 80,
            filter: "blur(20px)",
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        <div
          className="absolute inset-0 z-10 opacity-[0.18] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.04) 100%)",
          }}
          animate={{ opacity: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-30 p-6 flex flex-col h-full">
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
              style={{
                background: `linear-gradient(135deg, ${accent}22, ${accent}0a)`,
                border: `1px solid ${accent}30`,
              }}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {icon}
            </motion.div>

            <div className="flex flex-col items-end gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-[10px] text-neutral-500 backdrop-blur-sm">
                {badgeLabel}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-[10px] text-neutral-500 backdrop-blur-sm">
                {statusLabel ?? `${pages}p`}
              </span>
            </div>
          </div>

          <span
            className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-1.5"
            style={{ color: `${accent}cc` }}
          >
            {category}
          </span>

          <h3 className="text-lg font-bold text-white leading-snug mb-3">{title}</h3>

          <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3 flex-1">{description}</p>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[10px] border border-white/[0.07] text-neutral-600"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <motion.span
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-2"
              style={{
                background: `linear-gradient(135deg, ${accent}22, ${accent}0a)`,
                border: `1px solid ${accent}30`,
              }}
              animate={{ x: isHovered ? 2 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 8L8 2M8 2H4M8 2V6"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeOpacity="0.7"
                />
              </svg>
            </motion.span>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}44, transparent)` }}
          animate={{ opacity: isHovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </a>
  )
}
