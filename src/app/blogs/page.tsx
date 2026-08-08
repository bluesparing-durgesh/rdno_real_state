"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search, ArrowRight } from "lucide-react";
import { BLOGS } from "@/constants/mock-data";

export default function BlogsPage() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [search, setSearch] = useState("");

  const tags = ["All", "Architecture", "Finance", "Sustainability"];

  const filteredBlogs = BLOGS.filter((blog) => {
    const matchesTag = selectedTag === "All" || blog.category === selectedTag;
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="pb-24 space-y-20">
      
      {/* Header Banner */}
      <section className="relative h-[320px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1600"
            alt="Modern office facade"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 dark:bg-black/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-[10px] uppercase font-extrabold tracking-[0.25em] text-[#D4AF37] flex items-center justify-center gap-1.5">
            <BookOpen size={12} /> EDNO Intelligence
          </span>
          <h1 className="font-cinzel text-3xl md:text-5xl font-black text-white tracking-tight mt-3">
            Luxury Real Estate Insights
          </h1>
          <p className="text-zinc-300 text-xs md:text-sm mt-3 max-w-md mx-auto leading-relaxed font-light">
            Market briefs, architectural analysis, and structural design studies curated by our lead advisors.
          </p>
        </div>
      </section>

      {/* Filter toolbar */}
      <section className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] p-4 rounded-2xl">
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedTag === tag
                  ? "bg-primary dark:bg-white text-white dark:text-primary font-black"
                  : "bg-black/[0.04] dark:bg-white/[0.04] text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Search insights articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-[#0B1120] border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-900 dark:text-white outline-none focus:border-secondary dark:focus:border-accent"
          />
          <Search size={14} className="absolute left-3 top-3 text-zinc-400" />
        </div>
      </section>

      {/* Blogs list */}
      <section className="max-w-7xl mx-auto px-6">
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, idx) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group bg-zinc-50/50 dark:bg-white/[0.01] rounded-3xl border border-black/[0.04] dark:border-white/[0.04] p-6 flex flex-col h-full hover:shadow-2xl transition-all duration-300"
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

                <h3 className="text-base font-bold text-zinc-950 dark:text-white leading-snug group-hover:text-secondary dark:group-hover:text-accent transition-colors">
                  {blog.title}
                </h3>

                 <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
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
                    <p className="text-[8px] text-zinc-500 dark:text-zinc-400">{blog.date}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 group-hover:text-secondary dark:group-hover:text-accent flex items-center gap-1 transition-colors">
                    Read Article <ArrowRight size={10} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-black/10 dark:border-white/10 rounded-3xl">
            <p className="text-xs font-semibold text-zinc-500">No articles match your query parameters.</p>
          </div>
        )}
      </section>
    </div>
  );
}
