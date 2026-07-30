"use client";

import { motion } from "framer-motion";
import { Award, Compass, ShieldCheck, HeartHandshake, Sparkles, Building2, Globe2 } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Architectural Integrity",
      description: "We represent assets that are structural statements, celebrating material authenticity, clean lines, and environmental synergy.",
      icon: Compass,
    },
    {
      title: "Absolute Discretion",
      description: "Our Private Ledger holds off-market assets. Conversations are confidential, ensuring security for both sellers and acquirers.",
      icon: ShieldCheck,
    },
    {
      title: "Active Stewardship",
      description: "Prioritizing carbon-neutral materials, geothermal systems, and smart grids that preserve properties and local microclimates.",
      icon: Award,
    },
  ];

  const milestones = [
    { year: "2012", title: "Founding", desc: "EDNO was created in Manhattan as a discrete brokerage for architectural landmarks." },
    { year: "2016", title: "Global Expansion", desc: "Established private client offices in London, Zurich, and Singapore." },
    { year: "2021", title: "The Private Ledger", desc: "Launched our off-market ledger app, enabling private matching of UHNW accounts." },
    { year: "2025", title: "Carbon-Neutral Commitment", desc: "Pledged that 100% of new registry construction complies with LEED Platinum status." },
  ];

  return (
    <div className="pb-24 space-y-24">
      
      {/* Header Banner */}
      <section className="relative h-[450px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600"
            alt="Minimalist design interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-xs" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent flex items-center justify-center gap-1">
            <Sparkles size={12} /> The EDNO Legacy
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-4">
            Curating Significant Architecture
          </h1>
          <p className="text-zinc-300 text-xs mt-3 max-w-lg mx-auto leading-relaxed">
            Founded with the belief that a luxury property is not just an asset, but an organic, historical architectural statement.
          </p>
        </div>
      </section>

      {/* Narrative */}
      <section className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent">
            Our Purpose
          </span>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mt-2 text-zinc-950 dark:text-white">
            Where Design Meets Capital
          </h2>
          <p className="text-zinc-500 text-xs mt-4 leading-relaxed">
            EDNO operates at the intersection of avant-garde architecture, global financial advisory, and strict discretion. We serve clients who look beyond standard luxury metrics (like gold finishes or size) and search for spatial volume, material truth, and architectural historical value.
          </p>
          <p className="text-zinc-500 text-xs mt-3 leading-relaxed">
            Each property listed on our registry undergoes a rigorous vetting process by our board of curators, verifying structural integrity, location prestige, and smart carbon footprint capabilities.
          </p>
        </div>
        <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-black/10 dark:border-white/10 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"
            alt="Waterfront architecture"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </section>

      {/* Values Grid */}
      <section className="max-w-7xl mx-auto px-6 bg-zinc-50 dark:bg-white/[0.01] rounded-[40px] p-12 border border-black/[0.04] dark:border-white/[0.04]">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent">
            Ethos & Integrity
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-2 text-zinc-950 dark:text-white">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="bg-white dark:bg-[#0F172A]/40 border border-black/[0.06] dark:border-white/[0.06] rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-10 h-10 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary dark:text-accent mb-6">
                  <Icon size={18} />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-3">
                  {val.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* History Timeline */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent">
            Our Journey
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-2 text-zinc-950 dark:text-white">
            Historical Milestones
          </h2>
        </div>

        <div className="relative border-l border-zinc-200 dark:border-white/10 ml-6 space-y-12 max-w-3xl mx-auto">
          {milestones.map((m, idx) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8"
            >
              {/* Timeline circle dot */}
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-secondary dark:bg-accent border-4 border-white dark:border-[#0B1120] shadow" />
              <span className="text-xs font-bold text-secondary dark:text-accent">{m.year}</span>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white mt-1">{m.title}</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-md leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
