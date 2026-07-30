"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Building2,
  User,
  BookOpen,
  Compass,
  HelpCircle,
  FileText,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { PROPERTIES } from "@/constants/mock-data";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const staticItems = [
    { label: "View All Properties", category: "Navigation", href: "/properties", icon: Compass },
    { label: "Meet the Luxury Agents", category: "Navigation", href: "/agents", icon: User },
    { label: "EDNO Luxury Insights (Blog)", category: "Navigation", href: "/blogs", icon: BookOpen },
    { label: "Frequently Asked Questions", category: "Navigation", href: "/faq", icon: HelpCircle },
    { label: "Contact Private Office", category: "Navigation", href: "/contact", icon: FileText },
    { label: "User Analytics Dashboard", category: "Navigation", href: "/dashboard", icon: TrendingUp },
  ];

  const propertyItems = PROPERTIES.map((p) => ({
    label: p.title,
    category: `Properties (${p.type})`,
    href: `/properties/${p.id}`,
    icon: Building2,
    price: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(p.price),
  }));

  const allItems = [...staticItems, ...propertyItems];

  const filteredItems = allItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[activeIndex]) {
          handleSelect(filteredItems[activeIndex].href);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, filteredItems]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#0B1120] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl shadow-2xl overflow-hidden glass z-10"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-black/[0.06] dark:border-white/[0.06]">
              <Search className="text-zinc-400 dark:text-zinc-500 shrink-0" size={20} />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Type to search properties, agents, or locations..."
                className="w-full bg-transparent text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none border-none py-1"
              />
              <button
                onClick={onClose}
                className="text-[10px] uppercase font-bold tracking-widest bg-black/[0.05] dark:bg-white/[0.05] text-zinc-400 dark:text-zinc-500 px-2 py-1 rounded-md"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[350px] overflow-y-auto p-3 no-scrollbar">
              {filteredItems.length > 0 ? (
                <div className="space-y-1">
                  {filteredItems.map((item, index) => {
                    const Icon = item.icon;
                    const isSelected = index === activeIndex;
                    return (
                      <button
                        key={`${item.href}-${index}`}
                        onClick={() => handleSelect(item.href)}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-150 text-left ${
                          isSelected
                            ? "bg-secondary/15 dark:bg-accent/10 border-l-4 border-secondary dark:border-accent pl-3 text-secondary dark:text-accent"
                            : "text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-secondary/20 dark:bg-accent/20" : "bg-black/[0.03] dark:bg-white/[0.03]"
                          }`}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold">{item.label}</p>
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{item.category}</p>
                          </div>
                        </div>

                        {"price" in item && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-zinc-500">{(item as { price: string }).price}</span>
                            <ArrowRight size={12} className="opacity-60" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-zinc-400">
                  <Sparkles className="mx-auto mb-2 text-zinc-300" size={24} />
                  <p className="text-xs font-medium">No results found for &ldquo;{search}&rdquo;</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-black/[0.06] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.01] flex items-center justify-between text-[10px] text-zinc-400">
              <div className="flex items-center gap-3">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
              </div>
              <span>EDNO Private ledger Search</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
