"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle, Sparkles, Building } from "lucide-react";
import { InquirySchema, type InquiryFormValues } from "@/lib/schemas";

export default function ContactPage() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(InquirySchema),
  });

  const onSubmit = async (data: InquiryFormValues) => {
    // Mock network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="pb-24 space-y-24">
      {/* Banner */}
      <section className="relative h-[320px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1600"
            alt="Malibu pool exterior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 dark:bg-black/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent flex items-center justify-center gap-1">
            <Building size={12} /> Global Registry
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-4">
            Contact Private Office
          </h1>
          <p className="text-zinc-300 text-xs mt-3 max-w-md mx-auto leading-relaxed">
            Secure client correspondence channel. All briefings are managed confidentially.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Info & Map Column */}
        <div className="space-y-12">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent">
              Representative Offices
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mt-1">
              Global Operations
            </h2>
            <p className="text-zinc-500 text-xs mt-3 leading-relaxed">
              We operate from key investment districts to support cross-border transfers and physical tours.
            </p>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary dark:text-accent shrink-0">
                <MapPin size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Manhattan Headquarters</h4>
                <p className="text-[11px] text-zinc-400 mt-1">730 Fifth Avenue, Floor 18, New York, NY 10019</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary dark:text-accent shrink-0">
                <Phone size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Private Line</h4>
                <p className="text-[11px] text-zinc-400 mt-1">+91 9887793100</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary dark:text-accent shrink-0">
                <Mail size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Electronic Communications</h4>
                <p className="text-[11px] text-zinc-400 mt-1">advisory@edno.luxury</p>
              </div>
            </div>
          </div>

          {/* Google Maps placeholder */}
          <div className="aspect-[16/9] rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] shadow relative bg-zinc-900 flex items-center justify-center">
            {/* Dark Styled Map simulation */}
            <div className="absolute inset-0 bg-cover bg-center grayscale opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')" }} />
            <div className="relative z-10 text-center text-white space-y-2 p-6">
              <MapPin size={24} className="mx-auto text-accent animate-bounce" />
              <p className="text-xs font-bold tracking-wider uppercase">Manhattan, NY</p>
              <p className="text-[9px] text-zinc-400">730 Fifth Avenue, Floor 18</p>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-zinc-50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] rounded-[40px] p-8 md:p-12 shadow-xl">
          <div className="mb-8">
            <h3 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
              Establish Correspondence
            </h3>
            <p className="text-zinc-500 text-xs mt-1">
              Provide your details, and a designated advisory partner will contact you.
            </p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                Inquiry Logged
              </h4>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed">
                Your briefing was received. A Private Office director will review and establish secure contact.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 pl-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Aditya Singhania"
                  {...register("name")}
                  className="w-full bg-white dark:bg-[#0B1120] border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3.5 text-xs focus:outline-none focus:border-secondary dark:focus:border-accent text-zinc-950 dark:text-white"
                />
                {errors.name && (
                  <p className="text-[10px] text-red-500 pl-2">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 pl-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="aditya@gmail.com"
                    {...register("email")}
                    className="w-full bg-white dark:bg-[#0B1120] border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3.5 text-xs focus:outline-none focus:border-secondary dark:focus:border-accent text-zinc-950 dark:text-white"
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-500 pl-2">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 pl-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    {...register("phone")}
                    className="w-full bg-white dark:bg-[#0B1120] border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3.5 text-xs focus:outline-none focus:border-secondary dark:focus:border-accent text-zinc-950 dark:text-white"
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-red-500 pl-2">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 pl-2">
                  Inquiry briefing details
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about the property types, architectural styles, target budgets, and coordinates you are interested in..."
                  {...register("message")}
                  className="w-full bg-white dark:bg-[#0B1120] border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3.5 text-xs focus:outline-none focus:border-secondary dark:focus:border-accent text-zinc-950 dark:text-white resize-none"
                />
                {errors.message && (
                  <p className="text-[10px] text-red-500 pl-2">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary dark:bg-white text-white dark:text-primary hover:bg-secondary dark:hover:bg-accent hover:text-white dark:hover:text-zinc-950 text-xs font-bold uppercase tracking-widest rounded-2xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send size={12} /> {isSubmitting ? "Transmitting..." : "Send Secure Message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
