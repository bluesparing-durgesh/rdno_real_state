"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  GitCompare,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Property } from "@/constants/mock-data";
import { formatPrice } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { isFavorite, isCompare, toggleFavorite, toggleCompare } = useFavorites();
  const [hovered, setHovered] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
    const fav = !isFavorite(property.id);
    setToastMessage(fav ? "Added to your Private Registry." : "Removed from your Private Registry.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(property.id);
    const comp = !isCompare(property.id);
    setToastMessage(comp ? "Added to asset comparison." : "Removed from asset comparison.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="relative">
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="group relative overflow-hidden rounded-3xl bg-white dark:bg-[#0F172A]/40 border border-black/[0.06] dark:border-white/[0.06] shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover-glow"
      >
        {/* Card Image Wrapper */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <motion.img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{ scale: hovered ? 1.08 : 1 }}
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {property.featured && (
              <span className="flex items-center gap-1 bg-accent text-zinc-950 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow">
                <Sparkles size={10} /> Registry Featured
              </span>
            )}
            <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10">
              {property.status}
            </span>
          </div>

          {/* Action buttons (Fav, Compare) */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleFavorite}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                isFavorite(property.id)
                  ? "bg-accent border-accent text-zinc-950 scale-110"
                  : "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-primary"
              }`}
            >
              <Heart size={14} className={isFavorite(property.id) ? "fill-current" : ""} />
            </button>
            <button
              onClick={handleCompare}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                isCompare(property.id)
                  ? "bg-secondary border-secondary text-white scale-110"
                  : "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-primary"
              }`}
            >
              <GitCompare size={14} />
            </button>
          </div>

          {/* Price Label (Bottom Left Overlay) */}
          <div className="absolute bottom-4 left-4">
            <p className="text-white text-[10px] uppercase font-bold tracking-widest opacity-80">
              Registry Price
            </p>
            <p className="text-white text-xl font-bold tracking-tight">
              {formatPrice(property.price)}
            </p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-1">
          {/* Tagline / Subtitle */}
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent mb-2">
            <span>{property.type}</span>
            <span>&bull;</span>
            <span>{property.community}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-zinc-950 dark:text-white leading-tight mb-2 tracking-tight group-hover:text-secondary dark:group-hover:text-accent transition-colors duration-300">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 mb-6">
            <MapPin size={12} className="shrink-0 text-zinc-500 dark:text-zinc-400" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Specs Bar */}
          <div className="grid grid-cols-3 gap-4 border-t border-black/[0.06] dark:border-white/[0.06] pt-4 mt-auto">
            <div className="text-center md:text-left">
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Beds</p>
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1 justify-center md:justify-start mt-0.5">
                <BedDouble size={12} className="text-zinc-500 dark:text-zinc-400" /> {property.beds || "—"}
              </p>
            </div>
            <div className="text-center md:text-left border-x border-black/[0.06] dark:border-white/[0.06] px-2">
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Baths</p>
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1 justify-center md:justify-start mt-0.5">
                <Bath size={12} className="text-zinc-500 dark:text-zinc-400" /> {property.baths || "—"}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Area</p>
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1 justify-center md:justify-start mt-0.5">
                <Maximize size={12} className="text-zinc-500 dark:text-zinc-400" /> {property.area.toLocaleString()} <span className="text-[8px] text-zinc-500 dark:text-zinc-400">sqft</span>
              </p>
            </div>
          </div>

          {/* Link button */}
          <div className="mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
            <Link
              href={`/properties/${property.id}`}
              className="text-xs font-bold uppercase tracking-wider text-primary dark:text-white group-hover/btn:translate-x-1 transition-transform flex items-center gap-1 hover:text-secondary dark:hover:text-accent"
            >
              View Asset Details
              <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Mini Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 15, x: "-50%" }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-primary/95 dark:bg-white/95 text-white dark:text-primary text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-full shadow-lg border border-white/10 dark:border-black/10 flex items-center gap-2 whitespace-nowrap"
          >
            <Sparkles size={12} className="text-accent" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
