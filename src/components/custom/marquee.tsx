"use client";

import { TESTIMONIALS } from "@/constants/mock-data";
import { Star, Quote } from "lucide-react";

export function Marquee() {
  // Double the testimonials list to make scroll infinite and seamless
  const testimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="relative w-full overflow-hidden py-10 bg-zinc-50/50 dark:bg-white/[0.01] border-y border-black/[0.04] dark:border-white/[0.04]">
      {/* Ambient Glows */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={`${t.id}-${idx}`}
            className="w-[420px] shrink-0 p-8 rounded-3xl bg-white dark:bg-[#0F172A]/40 border border-black/[0.05] dark:border-white/[0.05] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
          >
            {/* Quote Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={12} className="fill-accent text-accent" />
                ))}
              </div>
              <Quote size={20} className="text-zinc-300 dark:text-zinc-700" />
            </div>

            {/* Comment */}
            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed italic mb-8">
              &ldquo;{t.comment}&rdquo;
            </p>

            {/* User details */}
            <div className="flex items-center gap-3 border-t border-black/[0.04] dark:border-white/[0.04] pt-4 mt-auto">
              <img
                src={t.avatar}
                alt={t.name}
                suppressHydrationWarning
                className="w-10 h-10 rounded-full object-cover grayscale"
              />
              <div>
                <h4 suppressHydrationWarning className="text-xs font-bold text-zinc-900 dark:text-white">{t.name}</h4>
                <p className="text-[9px] uppercase tracking-wider text-zinc-400 mt-0.5">
                  {t.role} &bull; <span className="text-accent">{t.location}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
