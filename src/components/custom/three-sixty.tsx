"use client";

import { useState, useRef, useEffect } from "react";
import { Move, Compass, Info, Maximize2 } from "lucide-react";

export function ThreeSixty() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(50); // percentage value 0-100
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 0.15; // drag speed sensitivity
    setScrollLeft((prev) => {
      let next = prev - walk;
      if (next < 0) next = 100;
      if (next > 100) next = 0;
      return next;
    });
    setStartX(x);
  };

  // Support touch gestures for mobile-first responsiveness
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 0.15;
    setScrollLeft((prev) => {
      let next = prev - walk;
      if (next < 0) next = 100;
      if (next > 100) next = 0;
      return next;
    });
    setStartX(x);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="text-secondary dark:text-accent animate-spin-slow" size={20} />
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            Interactive 360° Interior Tour
          </h3>
        </div>
        <span className="text-[10px] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-2 py-1 rounded-md text-zinc-400 font-bold flex items-center gap-1">
          <Move size={10} /> Click & Drag to Explore
        </span>
      </div>

      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleMouseLeaveOrUp}
        onTouchMove={handleTouchMove}
        className={`relative aspect-[21/9] w-full rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] cursor-grab select-none shadow-inner ${
          isDragging ? "cursor-grabbing" : ""
        }`}
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000')",
          backgroundSize: "250% 100%",
          backgroundRepeat: "repeat-x",
          backgroundPositionX: `${scrollLeft}%`,
          transition: isDragging ? "none" : "background-position 0.2s ease-out",
        }}
      >
        {/* Shadow overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />

        {/* Dynamic compass indicator inside the viewer */}
        <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 text-white text-[10px] font-semibold">
          <Compass size={14} style={{ transform: `rotate(${scrollLeft * 3.6}deg)` }} className="transition-transform duration-100" />
          <span>Bearing: {Math.round(scrollLeft * 3.6)}°</span>
        </div>

        {/* Hotspots */}
        <div
          className="absolute top-1/2 left-1/3 -translate-y-1/2 transition-transform duration-100 pointer-events-auto"
          style={{
            transform: `translate(${(50 - scrollLeft) * 10}px, -50%)`,
          }}
        >
          <div className="group relative">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/75 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
              Custom Wine Vault
            </div>
          </div>
        </div>

        <div
          className="absolute top-1/3 left-2/3 -translate-y-1/2 transition-transform duration-100 pointer-events-auto"
          style={{
            transform: `translate(${(20 - scrollLeft) * 10}px, -50%)`,
          }}
        >
          <div className="group relative">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/75 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
              Sky Deck Pool
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
