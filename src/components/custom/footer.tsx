"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Building2,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { NewsletterSchema, type NewsletterFormValues } from "@/lib/schemas";
import { useState } from "react";

export function Footer() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(NewsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    // Mock network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 5000);
  };

  const footerLinks = {
    portfolio: [
      { label: "Waterfront Villas", href: "/properties?type=Villa" },
      { label: "Luxury Penthouses", href: "/properties?type=Apartment" },
      { label: "Prime Commercials", href: "/properties?type=Commercial" },
      { label: "Private Land Reserves", href: "/properties?type=Land" },
    ],
    company: [
      { label: "About EDNO", href: "/about" },
      { label: "Our Advisors", href: "/agents" },
      { label: "Luxury Insights", href: "/blogs" },
      { label: "FAQ Desk", href: "/faq" },
    ],
    legal: [
      { label: "Privacy Registry", href: "/" },
      { label: "Terms of Engagement", href: "/" },
      { label: "Regulatory Disclosures", href: "/" },
      { label: "Cyber Security Protocol", href: "/" },
    ],
  };

  return (
    <footer className="bg-primary dark:bg-[#060B18] text-zinc-400 border-t border-white/[0.08] pt-20 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-widest text-white flex items-center gap-1.5">
              E D N O
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            </span>
          </Link>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-sm leading-relaxed">
            EDNO is a premier global real estate registry, curating the world&apos;s most significant architectural landmarks and residential sanctuaries for discerning portfolios.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <Phone size={14} className="text-accent" />
              <span>+1 (800) EDNO-LUX</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <Mail size={14} className="text-accent" />
              <span>advisory@edno.luxury</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <MapPin size={14} className="text-accent" />
              <span>5th Ave, Manhattan, New York, NY 10019</span>
            </div>
          </div>
        </div>

        {/* Links Columns */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-6">
            Portfolio
          </h4>
          <ul className="space-y-4">
            {footerLinks.portfolio.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-zinc-400 hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-6">
            Company
          </h4>
          <ul className="space-y-4">
            {footerLinks.company.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-zinc-400 hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
            Newsletter
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Subscribe to receive private portfolio releases and off-market briefs.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 relative">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                {...register("email")}
                className="bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-accent w-full"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent text-zinc-950 hover:bg-[#c5a030] p-2.5 rounded-full shrink-0 flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <Send size={14} className="text-zinc-950" />
              </button>
            </div>
            {errors.email && (
              <p className="text-[10px] text-red-400 mt-1 pl-2">{errors.email.message}</p>
            )}

            {/* Newsletter Subscription Toast */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-3.5 py-2.5 rounded-xl flex items-center gap-2 z-10"
                >
                  <CheckCircle size={12} />
                  <span>Briefing subscription activated successfully.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>

      <hr className="border-white/10 max-w-7xl mx-auto px-6 mb-8" />

      {/* Copyright & Social */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[10px] tracking-wide text-zinc-500">
          &copy; {new Date().getFullYear()} EDNO Real Estate Registry. All Rights Reserved. Custom curated designs.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-accent hover:bg-white/10 transition-all duration-300"
          >
            <Linkedin size={14} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-accent hover:bg-white/10 transition-all duration-300"
          >
            <Twitter size={14} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-accent hover:bg-white/10 transition-all duration-300"
          >
            <Instagram size={14} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-accent hover:bg-white/10 transition-all duration-300"
          >
            <Youtube size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
