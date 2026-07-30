"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How do I access properties listed on the Private Ledger?",
      answer: "Properties on our Private Ledger are restricted off-market assets. Access requires proof of capital verification and a confidential NDA registry entry. Consult with a Private Office partner on our contact page to initiate this process.",
    },
    {
      question: "What standards are required for a property to be listed in the EDNO Registry?",
      answer: "We focus on architectural significance, location exclusivity, and sustainability metrics. To qualify, assets should demonstrate unique structural geometry (such as custom stone, limestone, or steel structures), modern systems (geothermal, active solar), and must be vetted by our board of curators.",
    },
    {
      question: "Does EDNO manage cross-border luxury transfers?",
      answer: "Yes, our advisors coordinate with international legal firms and family offices to execute secure, tax-efficient cross-border property acquisitions and ownership structured through corporate syndicates.",
    },
    {
      question: "Can I schedule virtual tours for offshore properties?",
      answer: "Absolutely. We offer high-fidelity virtual tours including panoramic 360-degree interactive camera walkthroughs and secure live video feeds guided directly by the listing specialist.",
    },
    {
      question: "What is your commission rate for private advisory transactions?",
      answer: "Commission and retainer fees vary depending on the complexity of the acquisition, offshore structuring requirements, and listing type. We provide detailed fee structures during the initial private consultation phase.",
    },
  ];

  return (
    <div className="pb-24 space-y-20">
      
      {/* Header Banner */}
      <section className="relative h-[320px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80&w=1600"
            alt="Minimalist design room ceiling"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 dark:bg-black/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent flex items-center justify-center gap-1">
            <HelpCircle size={12} /> Advisory Support
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-4">
            Frequently Asked Queries
          </h1>
          <p className="text-zinc-300 text-xs mt-3 max-w-md mx-auto leading-relaxed">
            Essential operational insights regarding private listings, capital validation, and acquisition procedures.
          </p>
        </div>
      </section>

      {/* Accordions */}
      <section className="max-w-3xl mx-auto px-6">
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = idx === openIndex;
            return (
              <div
                key={idx}
                className="bg-zinc-50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] rounded-3xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-xs font-bold text-zinc-900 dark:text-white leading-tight">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-zinc-400 transition-transform duration-300 shrink-0 ml-4 ${
                      isOpen ? "rotate-180 text-secondary dark:text-accent" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Contact CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-accent">
          Still Have Questions?
        </span>
        <h3 className="text-base font-bold text-zinc-950 dark:text-white mt-2">
          Consult With An Advisor
        </h3>
        <p className="text-xs text-zinc-500 mt-2 max-w-sm mx-auto leading-relaxed">
          For specialized requests or complex cross-border scenarios, our advisors are available for direct correspondence.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 bg-primary dark:bg-white text-white dark:text-primary text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-secondary dark:hover:bg-accent hover:text-white dark:hover:text-zinc-950 transition-colors"
        >
          Consult Advisor
        </Link>
      </section>
    </div>
  );
}
