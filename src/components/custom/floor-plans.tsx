"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bed, Bath, Ruler, Trees, LayoutGrid } from "lucide-react";

interface FloorPlanItem {
  id: string;
  name: string;
  specs: { beds: string; baths: string; area: string; terrace?: string };
  grid: { name: string; size: string; row: string; col: string }[];
}

export function FloorPlans() {
  const [activePlan, setActivePlan] = useState("ground");

  const plans: Record<string, FloorPlanItem> = {
    ground: {
      id: "ground",
      name: "01 / Ground Level",
      specs: { beds: "2 Beds", baths: "3 Baths", area: "4,600 sq ft", terrace: "1,200 sq ft" },
      grid: [
        { name: "Grand Foyer", size: "450 sqft", row: "span 2", col: "span 2" },
        { name: "Ocean Living Salon", size: "1200 sqft", row: "span 2", col: "span-4" },
        { name: "Chef's Culinary Kitchen", size: "600 sqft", row: "span 2", col: "span-2" },
        { name: "Executive Study & Library", size: "350 sqft", row: "span 1", col: "span-2" },
        { name: "VIP Bedroom Suite 1", size: "550 sqft", row: "span 2", col: "span-3" },
        { name: "Wellness Dry Sauna & Bath", size: "300 sqft", row: "span 2", col: "span-3" },
        { name: "Wine Cellar Lounge", size: "400 sqft", row: "span-1", col: "span-2" },
      ],
    },
    upper: {
      id: "upper",
      name: "02 / Upper Level",
      specs: { beds: "4 Beds", baths: "4 Baths", area: "4,000 sq ft", terrace: "800 sq ft" },
      grid: [
        { name: "Primary Master Suite", size: "1100 sqft", row: "span 3", col: "span-4" },
        { name: "Ocean Terrace Deck", size: "800 sqft", row: "span 2", col: "span-4" },
        { name: "VIP Bedroom Suite 2", size: "500 sqft", row: "span 2", col: "span-3" },
        { name: "Junior Bedroom Suite 3", size: "450 sqft", row: "span 2", col: "span-3" },
        { name: "Home Cinema Theater", size: "750 sqft", row: "span-1", col: "span-2" },
      ],
    },
    rooftop: {
      id: "rooftop",
      name: "03 / Sky Deck & Pool",
      specs: { beds: "0 Beds", baths: "1 Bath", area: "1,800 sq ft", terrace: "1,800 sq ft" },
      grid: [
        { name: "Infinity Sky Pool", size: "800 sqft", row: "span-2", col: "span-5" },
        { name: "Al Fresco Dining Pavilion", size: "500 sqft", row: "span-2", col: "span-3" },
        { name: "Sunset Lounge Bar", size: "400 sqft", row: "span-2", col: "span-4" },
        { name: "Rooftop Powder Room", size: "100 sqft", row: "span-2", col: "span-4" },
      ],
    },
  };

  const active = plans[activePlan];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-black/[0.06] dark:border-white/[0.06]">
        {Object.values(plans).map((plan) => (
          <button
            key={plan.id}
            onClick={() => setActivePlan(plan.id)}
            className={`py-3.5 px-6 text-xs font-bold uppercase tracking-wider relative transition-all ${
              activePlan === plan.id
                ? "text-secondary dark:text-accent font-black"
                : "text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            {plan.name}
            {activePlan === plan.id && (
              <motion.div
                layoutId="activePlanTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary dark:bg-accent"
              />
            )}
          </button>
        ))}
      </div>

      {/* Specs bar */}
      <div className="flex flex-wrap gap-6 p-4 bg-zinc-50 dark:bg-white/[0.01] rounded-2xl border border-black/[0.04] dark:border-white/[0.04] text-xs font-semibold text-zinc-500">
        <div className="flex items-center gap-1.5">
          <Bed size={14} className="text-secondary dark:text-accent" />
          <span>{active.specs.beds}</span>
        </div>
        <div className="flex items-center gap-1.5 border-l border-black/10 dark:border-white/10 pl-6">
          <Bath size={14} className="text-secondary dark:text-accent" />
          <span>{active.specs.baths}</span>
        </div>
        <div className="flex items-center gap-1.5 border-l border-black/10 dark:border-white/10 pl-6">
          <Ruler size={14} className="text-secondary dark:text-accent" />
          <span>{active.specs.area}</span>
        </div>
        {active.specs.terrace && (
          <div className="flex items-center gap-1.5 border-l border-black/10 dark:border-white/10 pl-6">
            <Trees size={14} className="text-secondary dark:text-accent" />
            <span>{active.specs.terrace} Terrace</span>
          </div>
        )}
      </div>

      {/* Stylized blueprint rendering */}
      <div className="p-8 rounded-3xl bg-zinc-950 text-white min-h-[350px] relative overflow-hidden border border-white/[0.08] flex flex-col justify-between">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Plan Header */}
        <div className="relative flex justify-between items-start z-10">
          <div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-accent">
              Blueprint Draft
            </span>
            <h4 className="text-sm font-bold tracking-tight mt-0.5">{active.name}</h4>
          </div>
          <span className="text-[8px] tracking-widest text-zinc-500 font-mono">EDNO ARCHITECTS</span>
        </div>

        {/* Blueprint Layout Grid */}
        <div className="relative grid grid-cols-8 gap-3 my-8 z-10">
          <AnimatePresence mode="wait">
            {active.grid.map((room, idx) => (
              <motion.div
                key={`${room.name}-${activePlan}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                className={`p-4 border border-accent/20 rounded-xl bg-white/[0.02] flex flex-col justify-between hover:bg-white/[0.04] transition-colors ${room.row} ${room.col}`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-semibold text-zinc-400 truncate max-w-[80%]">
                    {room.name}
                  </span>
                  <LayoutGrid size={10} className="text-accent/40" />
                </div>
                <span className="text-[9px] font-mono text-accent mt-3">{room.size}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Scale indicator */}
        <div className="relative flex justify-between items-center z-10 text-[9px] text-zinc-500 font-mono pt-4 border-t border-white/5">
          <span>Scale: 1 : 100</span>
          <span>All dimensions approximate</span>
        </div>
      </div>
    </div>
  );
}
