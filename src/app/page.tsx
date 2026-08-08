"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  TrendingUp,
  Award,
  Globe2,
  Users2,
  Building,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ChevronRight,
  Send,
  CheckCircle,
} from "lucide-react";
import { PROPERTIES, COMMUNITIES, AGENTS, BLOGS } from "@/constants/mock-data";
import { PropertyCard } from "@/components/custom/property-card";
import { Marquee } from "@/components/custom/marquee";
import { InquirySchema, type InquiryFormValues } from "@/lib/schemas";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [contactSuccess, setContactSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(InquirySchema),
  });

  const onInquirySubmit = async (data: InquiryFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setContactSuccess(true);
    reset();
    setTimeout(() => setContactSuccess(false), 5000);
  };

  const filteredProperties = PROPERTIES.filter((p) => {
    if (activeCategory === "All") return p.featured;
    return p.type === activeCategory && p.featured;
  });

  const stats = [
    { label: "Closed Sales Value", value: "$4.8B+", icon: Award },
    { label: "Global Offices", value: "14 Countries", icon: Globe2 },
    { label: "Discreet Clients Served", value: "3,200+", icon: Users2 },
    { label: "Registry Portfolio", value: "120+ Assets", icon: Building },
  ];

  const categories = [
    { name: "Villa", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=400", count: 48 },
    { name: "Apartment", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400", count: 32 },
    { name: "Office", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400", count: 18 },
    { name: "Commercial", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400", count: 14 },
    { name: "Land", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=400", count: 9 },
  ];

  return (
    <div className="space-y-32 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image / Cinema Simulation */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920"
            alt="Cinematic luxury estate"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[var(--background)] opacity-90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center flex flex-col items-center pb-36">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles size={14} className="text-accent animate-pulse" />
            <span className="text-white text-[10px] uppercase font-bold tracking-widest">
              Private Real Estate Registry
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl md:text-7xl font-extrabold text-white tracking-tight leading-none max-w-4xl"
          >
            Acquire Significant <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-secondary dark:to-accent">
              Architectural Landmarks
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-zinc-300 text-sm md:text-base max-w-2xl mt-6 leading-relaxed"
          >
            Curating high-end residences, carbon-neutral sanctuaries, and off-market waterfront portfolios for the world&apos;s most discerning collectors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <Link
              href="/properties"
              className="bg-accent text-zinc-950 hover:bg-[#c5a030] text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-accent/20 flex items-center gap-2"
            >
              Explore Properties <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/25 text-white border border-white/20 text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-md"
            >
              Consult Advisory
            </Link>
          </motion.div>
        </div>

        {/* Floating Statistics Panel — positioned at section level to avoid overlap */}
        <div className="absolute bottom-8 left-6 right-6 z-20 hidden lg:block">
          <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
                  className="glass-premium rounded-2xl p-5 border border-white/10 text-left flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-extrabold leading-none">{stat.value}</h4>
                    <p className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider mt-1.5">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. PROPERTY CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent">
            Curated Categories
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-2 text-zinc-950 dark:text-white">
            Registry Classification
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-3 leading-relaxed">
            Filter our exclusive portfolio by architectural classification.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={cat.name}
              href={`/properties?type=${cat.name}`}
              className="group relative overflow-hidden rounded-3xl aspect-[3/4] border border-black/[0.05] dark:border-white/[0.05] hover:shadow-xl transition-all duration-500"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-108 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <h3 className="text-white text-base font-bold tracking-tight">{cat.name}</h3>
                  <p className="text-zinc-400 text-[9px] uppercase tracking-wider mt-1">
                    {cat.count} Listings
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-accent group-hover:text-zinc-950 transition-colors">
                  <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent">
              Exclusive Listings
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-2 text-zinc-950 dark:text-white">
              Featured Acquisitions
            </h2>
          </div>

          {/* Filtering tabs */}
          <div className="flex flex-wrap gap-2">
            {["All", "Villa", "Apartment", "Commercial"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-primary dark:bg-white text-white dark:text-primary font-black"
                    : "bg-black/[0.04] dark:bg-white/[0.04] text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                {cat === "All" ? "All Assets" : `${cat}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 bg-primary dark:bg-white text-white dark:text-primary hover:bg-secondary dark:hover:bg-accent hover:text-white dark:hover:text-zinc-950 text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300"
          >
            Explore Complete Portfolio <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 4. LUXURY COMMUNITIES */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent">
            Premium Enclaves
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-2 text-zinc-950 dark:text-white">
            Luxury Communities
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-3 leading-relaxed">
            Select properties based in our highly sought-after, architecturally protected locations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COMMUNITIES.map((comm) => (
            <Link
              key={comm.id}
              href={`/properties?community=${encodeURIComponent(comm.name)}`}
              className="group relative overflow-hidden rounded-3xl aspect-[16/10] border border-black/[0.05] dark:border-white/[0.05] shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={comm.image}
                alt={comm.name}
                className="w-full h-full object-cover scale-102 group-hover:scale-106 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-full">
                Avg price {comm.avgPrice}
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-[9px] uppercase font-bold tracking-widest text-accent">
                  {comm.tagline}
                </span>
                <h3 className="text-white text-xl font-bold tracking-tight mt-1">
                  {comm.name}
                </h3>
                <p className="text-zinc-300 text-xs mt-2 max-w-md opacity-80 leading-relaxed truncate">
                  {comm.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-white font-bold group-hover:text-accent transition-colors">
                  <span>Explore Listings ({comm.propertiesCount})</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. MEET OUR ADVISORS */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent">
            Expert Advisory
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-2 text-zinc-950 dark:text-white">
            Private Office Partners
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-3 leading-relaxed">
            Connecting you with top-tier brokers specializing in architecture, finance, and off-market assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="group bg-zinc-50 dark:bg-white/[0.01] rounded-3xl border border-black/[0.04] dark:border-white/[0.04] p-5 flex flex-col h-full hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-secondary dark:text-accent">
                {agent.role}
              </span>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                {agent.name}
              </h3>
              <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-1">
                Experience: {agent.experience} &bull; Rating: {agent.rating}★
              </p>
              <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-[10px] font-bold text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <Mail size={10} /> Email
                </a>
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-secondary text-white dark:bg-accent dark:text-zinc-950 text-[10px] font-bold hover:opacity-90 transition-all"
                >
                  <Phone size={10} /> Call
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="space-y-12">
        <div className="text-center max-w-xl mx-auto px-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent">
            Trusted Endorsements
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-2 text-zinc-950 dark:text-white">
            Client Testimonials
          </h2>
        </div>
        <Marquee />
      </section>

      {/* 7. INSIGHTS (BLOGS) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent">
              Luxury Insights
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-2 text-zinc-950 dark:text-white">
              The EDNO Registry Briefs
            </h2>
          </div>
          <Link
            href="/blogs"
            className="text-xs font-bold uppercase tracking-wider text-secondary dark:text-accent flex items-center gap-1.5 hover:underline"
          >
            All Insights <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOGS.map((blog) => (
            <Link
              key={blog.id}
              href="/blogs"
              className="group bg-zinc-50/50 dark:bg-white/[0.01] rounded-3xl border border-black/[0.04] dark:border-white/[0.04] p-5 flex flex-col h-full hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-104 transition-all duration-500"
                />
              </div>
              <div className="flex items-center gap-2 text-[9px] uppercase font-bold tracking-widest text-secondary dark:text-accent mb-3">
                <span>{blog.category}</span>
                <span>&bull;</span>
                <span>{blog.readTime}</span>
              </div>
              <h3 className="text-sm font-bold text-zinc-950 dark:text-white leading-snug group-hover:text-secondary dark:group-hover:text-accent transition-colors">
                {blog.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                {blog.excerpt}
              </p>
              <div className="flex items-center gap-3 border-t border-black/[0.04] dark:border-white/[0.04] pt-4 mt-auto">
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-8 h-8 rounded-full object-cover grayscale"
                />
                <div>
                  <p className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">
                    {blog.author.name}
                  </p>
                  <p className="text-[8px] text-zinc-400">{blog.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. LUXURY CONTACT INQUIRY */}
      <section id="contact-sec" className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center bg-zinc-50 dark:bg-white/[0.01] rounded-[40px] p-8 md:p-12 border border-black/[0.04] dark:border-white/[0.04] shadow-md">
          
          <div className="lg:col-span-2 space-y-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent">
              Confidential Inquiry
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Connect With <br />Our Private Office
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed max-w-sm">
              Our partners offer unparalleled experience in managing complex estates, cross-border finances, and custom off-market agreements.
            </p>
            <div className="space-y-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary dark:text-accent shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">Direct Advisory</p>
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5"> +91 9887793100</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary dark:text-accent shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">Electronic Mail</p>
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">advisory@edno.luxury</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white dark:bg-[#0B1120] border border-black/[0.06] dark:border-white/[0.06] rounded-3xl p-8 shadow-xl">
            <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-6">
              Establish Correspondence
            </h3>

            {contactSuccess ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} />
                </div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                  Inquiry Dispatched
                </h4>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed">
                  Your transmission was secure. A representative from our Private Office will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onInquirySubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 pl-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Aditya Singhania"
                      {...register("name")}
                      className="w-full bg-zinc-50 dark:bg-white/[0.01] border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-secondary dark:focus:border-accent text-zinc-950 dark:text-white"
                    />
                    {errors.name && (
                      <p className="text-[10px] text-red-500 pl-2">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 pl-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="aditya@gmail.com"
                      {...register("email")}
                      className="w-full bg-zinc-50 dark:bg-white/[0.01] border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-secondary dark:focus:border-accent text-zinc-950 dark:text-white"
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-500 pl-2">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 pl-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    {...register("phone")}
                    className="w-full bg-zinc-50 dark:bg-white/[0.01] border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-secondary dark:focus:border-accent text-zinc-950 dark:text-white"
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-red-500 pl-2">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 pl-2">
                    Briefing Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your property requirements, budget targets, or timeframe goals..."
                    {...register("message")}
                    className="w-full bg-zinc-50 dark:bg-white/[0.01] border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-secondary dark:focus:border-accent text-zinc-950 dark:text-white resize-none"
                  />
                  {errors.message && (
                    <p className="text-[10px] text-red-500 pl-2">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-primary dark:bg-white text-white dark:text-primary hover:bg-secondary dark:hover:bg-accent hover:text-white dark:hover:text-zinc-950 text-xs font-bold uppercase tracking-widest rounded-2xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send size={12} /> {isSubmitting ? "Transmitting..." : "Send Secure Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
