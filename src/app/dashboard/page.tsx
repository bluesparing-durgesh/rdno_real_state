"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import {
  User,
  TrendingUp,
  Compass,
  Heart,
  Mail,
  Building2,
  Sparkles,
  Trash2,
  Calendar,
  GitCompare,
} from "lucide-react";
import { PROPERTIES } from "@/constants/mock-data";
import { useFavorites } from "@/hooks/use-favorites";
import { formatPrice } from "@/lib/utils";

export default function DashboardPage() {
  const { favorites, compares, toggleFavorite, toggleCompare } = useFavorites();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Get property objects from favorites
  const favoriteProperties = PROPERTIES.filter((p) => favorites.includes(p.id));

  // Analytics mock data representing private asset appreciation values
  const analyticsData = [
    { year: "2021", value: 12.4 },
    { year: "2022", value: 14.8 },
    { year: "2023", value: 18.2 },
    { year: "2024", value: 22.5 },
    { year: "2025", value: 26.8 },
    { year: "2026", value: 32.4 }, // value in Millions
  ];

  const sideMenu = [
    { id: "overview", label: "Overview", icon: User },
    { id: "registry", label: "Saved Assets", icon: Heart },
    { id: "analytics", label: "Market Analytics", icon: TrendingUp },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side Menu */}
        <div className="space-y-6 lg:col-span-1">
          <div className="p-6 bg-zinc-50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] rounded-3xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary dark:text-accent font-black">
                AS
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-950 dark:text-white leading-tight">Aditya Singhania</h4>
                <p className="text-[9px] text-zinc-400 mt-0.5">Private Account</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {sideMenu.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all ${
                    isActive
                      ? "bg-secondary text-white dark:bg-accent dark:text-zinc-950"
                      : "text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Main Content */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
            <div>
              <h1 className="font-cinzel text-2xl md:text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
                Registry Dashboard
              </h1>
              <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-wider">
                Active Session: Advisory Management
              </p>
            </div>
            <Link
              href="/properties"
              className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
            >
              <Compass size={12} /> Explore Assets
            </Link>
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Quick Stat Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-zinc-50/50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] rounded-3xl">
                  <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                    <Heart size={14} />
                  </div>
                  <p className="text-[9px] uppercase tracking-wider text-zinc-400">Registry Bookmarks</p>
                  <h3 className="text-xl font-extrabold text-zinc-950 dark:text-white mt-1">
                    {favorites.length} Properties
                  </h3>
                </div>
                <div className="p-6 bg-zinc-50/50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] rounded-3xl">
                  <div className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary dark:text-accent mb-4">
                    <GitCompare size={14} />
                  </div>
                  <p className="text-[9px] uppercase tracking-wider text-zinc-400">Comparison Deck</p>
                  <h3 className="text-xl font-extrabold text-zinc-950 dark:text-white mt-1">
                    {compares.length} Assets
                  </h3>
                </div>
                <div className="p-6 bg-zinc-50/50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] rounded-3xl">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-4">
                    <Calendar size={14} />
                  </div>
                  <p className="text-[9px] uppercase tracking-wider text-zinc-400">Active Advisories</p>
                  <h3 className="text-xl font-extrabold text-zinc-950 dark:text-white mt-1">
                    1 Pending Tour
                  </h3>
                </div>
              </div>

              {/* Chart appreciation */}
              <div className="p-6 bg-zinc-50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] rounded-3xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Your Portfolio Valuation Appreciation
                  </h3>
                  <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    +48.3% CAGR
                  </span>
                </div>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData}>
                      <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0F766E" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="year" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}M`} />
                      <Tooltip formatter={(value) => [`$${value}M`, "Valuation"]} contentStyle={{ backgroundColor: "#111827", border: "none", borderRadius: "8px", color: "white", fontSize: "10px" }} />
                      <Area type="monotone" dataKey="value" stroke="#0F766E" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* SAVED REGISTRY TAB */}
          {activeTab === "registry" && (
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Saved Holdings</h3>
              {favoriteProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favoriteProperties.map((p) => (
                    <div
                      key={p.id}
                      className="group bg-zinc-50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] rounded-3xl p-4 flex gap-4 items-center"
                    >
                      <img src={p.images[0]} alt={p.title} className="w-20 h-20 rounded-2xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[8px] uppercase font-bold tracking-widest text-accent">{p.type}</span>
                        <h4 className="text-xs font-bold text-zinc-950 dark:text-white truncate mt-0.5">{p.title}</h4>
                        <p className="text-[10px] text-secondary dark:text-accent font-bold mt-1">{formatPrice(p.price)}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link href={`/properties/${p.id}`} className="p-2 bg-white dark:bg-[#0B1120] border border-black/10 dark:border-white/10 rounded-xl text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center">
                          <Compass size={12} />
                        </Link>
                        <button
                          onClick={() => toggleFavorite(p.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center border border-dashed border-black/10 dark:border-white/10 rounded-3xl">
                  <p className="text-xs font-semibold text-zinc-500">Your Registry Vault is empty.</p>
                </div>
              )}
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Market Indices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-zinc-50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] rounded-3xl">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-2">Oceanfront Class Appreciation</h4>
                  <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">
                    Beachfront luxury assets in regions like Malibu and Miami show a steady appreciation path driven by limited coastal zoning approvals.
                  </p>
                  <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full">+12.4% Annualized</span>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] rounded-3xl">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-2">Mountain Resort Demand</h4>
                  <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">
                    Eco-luxury mountain chalets with private access pathways continue to see high transaction sizes among private equity managers.
                  </p>
                  <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full">+14.2% Annualized</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
