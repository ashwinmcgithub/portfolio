"use client";

import { useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Radio } from "lucide-react";

export type SchemaCardProps = {
  badge: string;
  title: string;
  description: string;
  href: string;
  meta: string;
  tags: string[];
  accentColor: string;
  imageUrl: string;
  icon: LucideIcon;
  ctaLabel?: string;
  statusLabel?: string;
  featured?: boolean;
};

export default function SchemaCard({
  badge,
  title,
  description,
  href,
  meta,
  tags,
  accentColor,
  imageUrl,
  icon: Icon,
  ctaLabel = "Open Demo",
  statusLabel = "Live",
  featured = false,
}: SchemaCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    let frameId = 0;
    let time = 0;
    const waveData = Array.from({ length: 8 }, () => ({
      value: Math.random() * 0.5 + 0.1,
      targetValue: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.02 + 0.01,
    }));

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(bounds.width * dpr));
      canvas.height = Math.max(1, Math.floor(bounds.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const updateWaveData = () => {
      waveData.forEach((data) => {
        if (Math.random() < 0.01) {
          data.targetValue = Math.random() * 0.7 + 0.1;
        }

        const diff = data.targetValue - data.value;
        data.value += diff * data.speed;
      });
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(2, 6, 23, 0.88)";
      ctx.fillRect(0, 0, width, height);

      waveData.forEach((data, i) => {
        const freq = data.value * 7;
        ctx.beginPath();

        for (let x = 0; x < width; x += 1) {
          const nx = (x / width) * 2 - 1;
          const px = nx + i * 0.04 + freq * 0.03;
          const py =
            Math.sin(px * 10 + time) *
            Math.cos(px * 2) *
            freq *
            0.12 *
            ((i + 1) / 8);
          const y = (py + 1) * height * 0.5;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const intensity = Math.min(1, freq * 0.3);
        const r = 79 + intensity * 100;
        const g = 70 + intensity * 130;
        const b = 229;
        ctx.lineWidth = 1 + i * 0.25;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.55)`;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
        ctx.shadowBlur = 10;
        ctx.stroke();
      });

      ctx.shadowBlur = 0;
    };

    const animate = () => {
      time += 0.02;
      updateWaveData();
      draw();
      frameId = window.requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(canvas);
    resizeCanvas();
    animate();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] ${
        featured ? "min-h-[430px]" : "min-h-[420px]"
      }`}
    >
      <div className="card-border absolute inset-0 rounded-[28px]" />
      <div className="relative flex h-full flex-col">
        <div className="relative m-3 overflow-hidden rounded-[22px] border border-white/10">
          <div className={`relative ${featured ? "h-72 md:h-80" : "h-56"}`}>
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.2), rgba(2,6,23,0.75)), url(${imageUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:18px_18px]" />
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 30%, ${accentColor}44 0%, transparent 65%)`,
              }}
            />

            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/75 backdrop-blur-md">
              <Icon className="h-3.5 w-3.5" style={{ color: accentColor }} />
              <span>{meta}</span>
            </div>

            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/75 backdrop-blur-md">
              <Radio className="h-3.5 w-3.5 animate-pulse" style={{ color: accentColor }} />
              <span>{statusLabel}</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-3">
              <div className="glass animate-float rounded-2xl border border-white/10 p-3">
                <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/45">
                  <span>Stack</span>
                </div>
                <div className="space-y-1.5">
                  {tags.slice(0, 3).map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-white/80"
                    >
                      <span>{tag}</span>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="glass rounded-2xl border border-white/10 p-3 [animation:schemaPulse_4s_ease-in-out_infinite]"
                style={{ boxShadow: `0 0 24px ${accentColor}22` }}
              >
                <div className="mb-5 text-[11px] uppercase tracking-[0.18em] text-white/45">
                  Preview
                </div>
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: featured ? "88%" : "76%",
                        background: `linear-gradient(90deg, ${accentColor}, rgba(255,255,255,0.95))`,
                      }}
                    />
                  </div>
                  <div className="h-px w-full bg-white/10 [animation:dataStream_1.6s_linear_infinite]" />
                  <div className="grid grid-cols-3 gap-1.5">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-6 rounded-lg border border-white/10 bg-white/[0.03]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
          <span
            className="mb-3 inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-md"
            style={{
              color: accentColor,
              borderColor: `${accentColor}55`,
              backgroundColor: `${accentColor}12`,
            }}
          >
            {badge}
          </span>

          <h3 className={`${featured ? "text-2xl md:text-3xl" : "text-lg"} font-semibold text-white`}>
            {title}
          </h3>

          <p className={`mt-3 ${featured ? "max-w-2xl text-sm" : "text-xs"} leading-relaxed text-white/65`}>
            {description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/55"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/80 backdrop-blur-md">
              {ctaLabel}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/35">
              {featured ? "Completed Build" : "Demo Site"}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
