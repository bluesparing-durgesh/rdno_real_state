"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  Heart,
  GitCompare,
  Sun,
  Moon,
  ChevronDown,
  Building2,
  Phone,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandMenu } from "./command-menu";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  
  const [favCount, setFavCount] = useState(0);
  const [compCount, setCompCount] = useState(0);

  const updateCounts = () => {
    if (typeof window !== "undefined") {
      const favs = localStorage.getItem("endo_favorites");
      const comps = localStorage.getItem("endo_compares");
      setFavCount(favs ? JSON.parse(favs).length : 0);
      setCompCount(comps ? JSON.parse(comps).length : 0);
    }
  };

  useEffect(() => {
    updateCounts();
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("endo_favorites_updated", updateCounts);
    window.addEventListener("endo_compares_updated", updateCounts);

    // Keyboard shortcut for command menu
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("endo_favorites_updated", updateCounts);
      window.removeEventListener("endo_compares_updated", updateCounts);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close mobile menu and mega menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenMegaMenu(null);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/properties", megaMenu: "portfolio" },
    { label: "Communities", href: "/", megaMenu: "communities" },
    { label: "Agents", href: "/agents" },
    { label: "Insights", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          scrolled
            ? "bg-white/70 dark:bg-[#0B1120]/75 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.06] py-4 shadow-sm"
            : "bg-transparent py-6 border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-widest text-primary dark:text-white flex items-center gap-1.5">
              E D N O
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </span>
          </Link>

          {/* Navigation - Large Screens */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.megaMenu && setOpenMegaMenu(link.megaMenu)}
                onMouseLeave={() => setOpenMegaMenu(null)}
              >
                {link.megaMenu ? (
                  <button
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-300 py-2",
                      openMegaMenu === link.megaMenu
                        ? "text-secondary dark:text-accent"
                        : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-300",
                        openMegaMenu === link.megaMenu && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium tracking-wide transition-colors duration-300 py-2 block",
                      pathname === link.href
                        ? "text-secondary dark:text-accent"
                        : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Mega Menu Dropdowns */}
                {link.megaMenu && openMegaMenu === link.megaMenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px]">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="glass rounded-3xl p-6 shadow-2xl border border-black/[0.08] dark:border-white/[0.08] grid grid-cols-2 gap-6 overflow-hidden"
                    >
                      {link.megaMenu === "portfolio" && (
                        <>
                          <div className="space-y-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                              By Property Type
                            </h4>
                            <div className="grid gap-3">
                              <Link
                                href="/properties?type=Villa"
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors group"
                              >
                                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary dark:text-accent">
                                  <Sparkles size={16} />
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                                    Luxury Villas
                                  </p>
                                  <p className="text-[10px] text-zinc-400">
                                    Malibu & Aspen mansion reserves
                                  </p>
                                </div>
                              </Link>
                              <Link
                                href="/properties?type=Apartment"
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary dark:text-accent">
                                  <Building2 size={16} />
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                                    Metropolitan Penthouses
                                  </p>
                                  <p className="text-[10px] text-zinc-400">
                                    Aero District skyline residences
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="bg-zinc-50 dark:bg-white/[0.02] p-4 rounded-2xl flex flex-col justify-between">
                            <div>
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider mb-2">
                                <TrendingUp size={10} /> Hot Release
                              </div>
                              <h5 className="text-sm font-semibold text-zinc-950 dark:text-white leading-tight">
                                Aurelia Pavilion, Malibu
                              </h5>
                              <p className="text-xs text-zinc-500 mt-1">
                                Modern organic masterpiece wrapping the Malibu coastline.
                              </p>
                            </div>
                            <Link
                              href="/properties/p1"
                              className="text-xs font-bold text-secondary dark:text-accent flex items-center gap-1 hover:underline mt-4"
                            >
                              Explore Asset <ArrowRight size={12} />
                            </Link>
                          </div>
                        </>
                      )}

                      {link.megaMenu === "communities" && (
                        <>
                          <div className="space-y-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                              Premium Enclaves
                            </h4>
                            <div className="grid gap-2">
                              <Link
                                href="/properties?community=The+Palm+Heights"
                                className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-secondary dark:hover:text-accent py-1 block"
                              >
                                The Palm Heights — Waterfront
                              </Link>
                              <Link
                                href="/properties?community=Golden+Estates"
                                className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-secondary dark:hover:text-accent py-1 block"
                              >
                                Golden Estates — Mountain Retreats
                              </Link>
                              <Link
                                href="/properties?community=Aero+District"
                                className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-secondary dark:hover:text-accent py-1 block"
                              >
                                Aero District — Sky Metropolitan
                              </Link>
                              <Link
                                href="/properties?community=The+Sanctuary+Woods"
                                className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-secondary dark:hover:text-accent py-1 block"
                              >
                                Sanctuary Woods — Eco luxury
                              </Link>
                              <Link
                                href="/properties?community=Mumbai+Seafront+Reserve"
                                className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-secondary dark:hover:text-accent py-1 block"
                              >
                                Mumbai Seafront — Arabian Sea
                              </Link>
                              <Link
                                href="/properties?community=Rajputana+Heritage+Enclave"
                                className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-secondary dark:hover:text-accent py-1 block"
                              >
                                Rajputana Enclave — Royal Heritage
                              </Link>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center border-l border-zinc-200 dark:border-white/[0.08] pl-6 space-y-3">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-accent">
                              Private Listings
                            </h5>
                            <p className="text-xs text-zinc-500">
                              Access our exclusive off-market properties via confidential advisory.
                            </p>
                            <Link
                              href="/contact"
                              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-950 dark:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 px-4 py-2 rounded-full w-fit"
                            >
                              <Phone size={12} /> Consult Advisory
                            </Link>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Search Trigger */}
            <button
              onClick={() => setShowSearch(true)}
              className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors relative p-2"
              title="Search (Ctrl+K)"
            >
              <Search size={18} />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] px-1 rounded bg-black/10 dark:bg-white/10 opacity-60">
                ⌘K
              </span>
            </button>

            {/* Compare */}
            <Link
              href="/properties?compare=true"
              className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors relative p-2"
            >
              <GitCompare size={18} />
              {compCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {compCount}
                </span>
              )}
            </Link>

            {/* Favorites */}
            <Link
              href="/properties?favorites=true"
              className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors relative p-2"
            >
              <Heart size={18} />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-zinc-950 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                  {favCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative text-zinc-600 cursor-pointer dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors p-2 rounded-full bg-black/[0.04] dark:bg-white/[0.04]"
              aria-label="Toggle theme"
            >
              <span className="relative flex items-center justify-center w-[18px] h-[18px]">
                <Sun size={18} className="absolute rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon size={18} className="absolute rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              </span>
            </button>

            {/* Premium CTA */}
            <Link
              href="/contact"
              className="bg-primary dark:bg-white text-white dark:text-primary hover:bg-secondary dark:hover:bg-accent hover:text-white dark:hover:text-zinc-950 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300"
            >
              Inquire
            </Link>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setShowSearch(true)}
              className="text-zinc-600 dark:text-zinc-300"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-zinc-600 dark:text-zinc-300"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-900 dark:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

      
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-[#0B1120] border-b border-black/[0.06] dark:border-white/[0.06] px-6 py-6 absolute top-full left-0 w-full shadow-xl overflow-hidden"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 hover:text-secondary dark:hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-black/[0.06] dark:border-white/[0.06]" />
                <div className="flex items-center gap-6 justify-between">
                  <div className="flex items-center gap-4">
                    <Link
                      href="/properties?favorites=true"
                      className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300"
                    >
                      <Heart size={20} />
                      <span className="text-xs">Favorites ({favCount})</span>
                    </Link>
                    <Link
                      href="/properties?compare=true"
                      className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300"
                    >
                      <GitCompare size={20} />
                      <span className="text-xs">Compare ({compCount})</span>
                    </Link>
                  </div>
                  <Link
                    href="/contact"
                    className="bg-primary dark:bg-white text-white dark:text-primary text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full"
                  >
                    Inquire Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Command Menu */}
      <CommandMenu isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
}
