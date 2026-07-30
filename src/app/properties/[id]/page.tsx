"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BedDouble,
  Bath,
  Maximize,
  Calendar,
  Sparkles,
  MapPin,
  Heart,
  GitCompare,
  Mail,
  Phone,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { PROPERTIES } from "@/constants/mock-data";
import { formatPrice } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";
import { ThreeSixty } from "@/components/custom/three-sixty";
import { FloorPlans } from "@/components/custom/floor-plans";
import { MortgageCalc } from "@/components/custom/mortgage-calc";
import { ScheduleVisit } from "@/components/custom/schedule-visit";
import { PropertyCard } from "@/components/custom/property-card";

interface PropertyDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const { id } = use(params);
  const property = PROPERTIES.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  const { isFavorite, isCompare, toggleFavorite, toggleCompare } = useFavorites();
  const [activeImage, setActiveImage] = useState(property.images[0]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleFavorite = () => {
    toggleFavorite(property.id);
    const fav = !isFavorite(property.id);
    setToastMessage(fav ? "Added to your Private Registry." : "Removed from your Private Registry.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCompare = () => {
    toggleCompare(property.id);
    const comp = !isCompare(property.id);
    setToastMessage(comp ? "Added to asset comparison." : "Removed from asset comparison.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Find similar properties in the same category/city
  const similarProperties = PROPERTIES.filter(
    (p) => p.id !== property.id && (p.type === property.type || p.city === property.city)
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      
      {/* Back to listings bar */}
      <div className="flex justify-between items-center">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back to Catalog
        </Link>

        {/* Action triggers */}
        <div className="flex gap-2">
          <button
            onClick={handleFavorite}
            className={`px-4 py-2.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all ${
              isFavorite(property.id)
                ? "bg-accent border-accent text-zinc-950"
                : "bg-transparent border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Heart size={14} className={isFavorite(property.id) ? "fill-current" : ""} />
            {isFavorite(property.id) ? "Registered" : "Bookmark"}
          </button>
          <button
            onClick={handleCompare}
            className={`px-4 py-2.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all ${
              isCompare(property.id)
                ? "bg-secondary border-secondary text-white"
                : "bg-transparent border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <GitCompare size={14} />
            {isCompare(property.id) ? "Compared" : "Compare"}
          </button>
        </div>
      </div>

      {/* Main Image Showcase */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-4 aspect-[16/9] rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] shadow-md relative">
          <img
            src={activeImage}
            alt={property.title}
            className="w-full h-full object-cover transition-all duration-500"
          />
          {/* Tag labels */}
          <div className="absolute top-6 left-6 flex gap-2">
            {property.featured && (
              <span className="flex items-center gap-1 bg-accent text-zinc-950 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow">
                <Sparkles size={10} /> Curator Vetted
              </span>
            )}
            <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10">
              {property.status}
            </span>
          </div>
        </div>

        {/* Thumbnail Picker */}
        <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible no-scrollbar shrink-0">
          {property.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(img)}
              className={`relative aspect-[4/3] w-28 lg:w-full rounded-2xl overflow-hidden border transition-all shrink-0 ${
                activeImage === img
                  ? "border-secondary dark:border-accent ring-2 ring-secondary/25 dark:ring-accent/25"
                  : "border-black/[0.08] dark:border-white/[0.08] opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* Property Overview Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Left 2 Columns: Specs & Details */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Header Specs */}
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent mb-2">
              <span>{property.type}</span>
              <span>&bull;</span>
              <span>{property.community}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              {property.title}
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              <MapPin size={14} className="text-zinc-500 dark:text-zinc-400" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-4 gap-6 p-6 bg-zinc-50 dark:bg-white/[0.01] rounded-3xl border border-black/[0.04] dark:border-white/[0.04]">
            <div className="text-center md:text-left">
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Valuation</p>
              <p className="text-sm font-extrabold text-secondary dark:text-accent mt-1">
                {formatPrice(property.price)}
              </p>
            </div>
            <div className="text-center md:text-left border-l border-black/10 dark:border-white/10 pl-6">
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Beds</p>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 justify-center md:justify-start mt-1">
                <BedDouble size={14} className="text-zinc-500 dark:text-zinc-400" /> {property.beds || "—"}
              </p>
            </div>
            <div className="text-center md:text-left border-l border-black/10 dark:border-white/10 pl-6">
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Baths</p>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 justify-center md:justify-start mt-1">
                <Bath size={14} className="text-zinc-500 dark:text-zinc-400" /> {property.baths || "—"}
              </p>
            </div>
            <div className="text-center md:text-left border-l border-black/10 dark:border-white/10 pl-6">
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Footprint</p>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 justify-center md:justify-start mt-1">
                <Maximize size={14} className="text-zinc-500 dark:text-zinc-400" /> {property.area.toLocaleString()} <span className="text-[9px] text-zinc-500 dark:text-zinc-400">sqft</span>
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Architectural Description</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {property.description}
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Constructed in {property.yearBuilt}, this property embodies the modern minimalist luxury language, fusing robust structural engineering with organic details that respect the adjacent landscape and optimize light flow.
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Curated Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 p-3.5 bg-zinc-50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] rounded-2xl"
                >
                  <CheckCircle size={14} className="text-secondary dark:text-accent shrink-0" />
                  <span className="text-xs text-zinc-700 dark:text-zinc-300">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 360 Interior Panoramic Viewer */}
          <ThreeSixty />

          {/* Floor Plans Selector */}
          <FloorPlans />

          {/* Interactive Mortgage Calculator */}
          <MortgageCalc initialPrice={property.price} />
        </div>

        {/* Right 1 Column: Schedule Tour Form & Agent Profile */}
        <div className="space-y-8 sticky top-24">
          
          {/* Schedule Visit Widget */}
          <ScheduleVisit propertyName={property.title} propertyPrice={property.price} />

          {/* Agent Block */}
          <div className="p-6 bg-zinc-50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] rounded-3xl space-y-6">
            <h3 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              Assigned Specialist
            </h3>
            <div className="flex items-center gap-4">
              <img
                src={property.agent.image}
                alt={property.agent.name}
                className="w-14 h-14 rounded-2xl object-cover grayscale"
              />
              <div>
                <h4 className="text-sm font-bold text-zinc-950 dark:text-white leading-tight">
                  {property.agent.name}
                </h4>
                <p className="text-[10px] text-zinc-400 mt-1">{property.agent.role}</p>
                <p className="text-[10px] text-secondary dark:text-accent font-semibold mt-0.5">
                  Rating: {property.agent.rating}★
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`mailto:${property.agent.email}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                <Mail size={12} /> Email
              </a>
              <a
                href={`tel:${property.agent.phone}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-secondary text-white dark:bg-accent dark:text-zinc-950 text-xs font-bold hover:opacity-90 transition-all"
              >
                <Phone size={12} /> Call
              </a>
            </div>
          </div>

          {/* Nearby places list */}
          <div className="p-6 bg-zinc-50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] rounded-3xl space-y-4">
            <h3 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              Neighborhood Proximity
            </h3>
            <div className="space-y-3">
              {property.nearby.map((place) => (
                <div key={place.place} className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">{place.place}</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 font-mono">
                    {place.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties Section */}
      <section className="space-y-8 pt-8 border-t border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent">
            Curator Recommendations
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mt-1">
            Similar Acquisitions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {similarProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* Mini Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 15, x: "-50%" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-primary/95 dark:bg-white/95 text-white dark:text-primary text-[10px] font-bold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-2xl border border-white/10 dark:border-black/10 flex items-center gap-2 whitespace-nowrap"
          >
            <Sparkles size={12} className="text-accent" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
