"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Sparkles, Star, Shield, ArrowUpRight } from "lucide-react";
import { AGENTS } from "@/constants/mock-data";
import Link from "next/link";

export default function AgentsPage() {
  const bioQuotes = [
    "Specializing in structured real estate investment and family office placements.",
    "Curating international high-end properties for private syndicates.",
    "Vast portfolio knowledge regarding coastal development codes and yacht berthings.",
    "Managing off-market penthouse trades and exclusive residential registry briefs.",
  ];

  return (
    <div className="pb-24 space-y-24">
      
      {/* Banner */}
      <section className="relative h-[380px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600"
            alt="Corporate skyscraper facade"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 dark:bg-black/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent flex items-center justify-center gap-1">
            <Shield size={12} /> Executive Partners
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-4">
            Private Office Advisors
          </h1>
          <p className="text-zinc-300 text-xs mt-3 max-w-lg mx-auto leading-relaxed">
            Direct access to senior brokers managing luxury residential portfolios, tax-efficient transfers, and off-market asset classes.
          </p>
        </div>
      </section>

      {/* Roster Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {AGENTS.map((agent, idx) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-zinc-50 dark:bg-white/[0.01] rounded-[40px] p-8 border border-black/[0.04] dark:border-white/[0.04] flex flex-col md:flex-row gap-8 items-center md:items-start"
            >
              {/* Profile Image */}
              <div className="w-48 aspect-[4/5] rounded-3xl overflow-hidden shrink-0 border border-black/10 dark:border-white/10 shadow">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Specs & Quote */}
              <div className="flex flex-col justify-between h-full flex-1">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent">
                    {agent.role}
                  </span>
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white mt-1">
                    {agent.name}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-[10px] text-zinc-400 mt-2">
                    <span className="flex items-center gap-0.5 font-bold text-zinc-700 dark:text-zinc-300">
                      <Star size={10} className="fill-accent text-accent" /> {agent.rating}
                    </span>
                    <span>&bull;</span>
                    <span>{agent.experience} Experience</span>
                  </div>

                  <p className="text-xs text-zinc-500 mt-4 leading-relaxed italic">
                    &ldquo;{bioQuotes[idx]}&rdquo;
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-8">
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-black/10 dark:border-white/10 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <Mail size={12} /> Message
                  </a>
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-secondary text-white dark:bg-accent dark:text-zinc-950 text-xs font-bold hover:opacity-90 transition-all"
                  >
                    <Phone size={12} /> Call
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Advisory FAQ link section */}
      <section className="max-w-4xl mx-auto px-6 text-center bg-zinc-50 dark:bg-white/[0.01] rounded-[30px] p-8 border border-black/[0.04] dark:border-white/[0.04]">
        <h3 className="text-base font-bold text-zinc-950 dark:text-white">Confidential Advisory Representation</h3>
        <p className="text-xs text-zinc-500 mt-2 max-w-md mx-auto leading-relaxed">
          Do you require representation regarding an off-market holding or custom estate purchase? Submit a request to the Managing Partner.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 bg-primary dark:bg-white text-white dark:text-primary text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-secondary dark:hover:bg-accent hover:text-white dark:hover:text-zinc-950 transition-colors"
        >
          Consult Managing Partner <ArrowUpRight size={12} />
        </Link>
      </section>
    </div>
  );
}
