"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  Grid,
  List,
  GitCompare,
  Trash2,
  Building,
  CheckCircle,
  Eye,
} from "lucide-react";
import { PROPERTIES, Property } from "@/constants/mock-data";
import { PropertyCard } from "@/components/custom/property-card";
import { formatPrice } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";

function PropertiesListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Favorites / Compare views toggled via URL query params
  const showFavsParam = searchParams.get("favorites") === "true";
  const showCompareParam = searchParams.get("compare") === "true";
  const initialType = searchParams.get("type") || "All";
  const initialCommunity = searchParams.get("community") || "All";

  const { favorites, compares, toggleCompare, toggleFavorite } = useFavorites();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedCommunity, setSelectedCommunity] = useState(initialCommunity);
  const [budget, setBudget] = useState(3000000000); // max budget slider (₹300 Cr)
  const [beds, setBeds] = useState("All");
  const [baths, setBaths] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Sync state if URL search params change
  useEffect(() => {
    if (searchParams.get("type")) {
      setSelectedType(searchParams.get("type") || "All");
    }
    if (searchParams.get("community")) {
      setSelectedCommunity(searchParams.get("community") || "All");
    }
  }, [searchParams]);

  // List of cities and types dynamically extracted
  const cities = ["All", ...Array.from(new Set(PROPERTIES.map((p) => p.city)))];
  const types = ["All", "Villa", "Apartment", "Office", "Commercial", "Land"];
  const communities = ["All", "The Palm Heights", "Golden Estates", "Aero District", "The Sanctuary Woods", "Mumbai Seafront Reserve", "Rajputana Heritage Enclave"];

  // Filter Logic
  const filteredProperties = PROPERTIES.filter((p) => {
    // 1. Search term
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. City
    const matchesCity = selectedCity === "All" || p.city === selectedCity;

    // 3. Type
    const matchesType = selectedType === "All" || p.type === selectedType;

    // 4. Community
    const matchesCommunity = selectedCommunity === "All" || p.community === selectedCommunity;

    // 5. Budget
    const matchesBudget = p.price <= budget;

    // 6. Beds
    const matchesBeds =
      beds === "All" || (beds === "5+" ? p.beds >= 5 : p.beds === Number(beds));

    // 7. Baths
    const matchesBaths =
      baths === "All" || (baths === "5+" ? p.baths >= 5 : p.baths === Number(baths));

    // 8. Special Views (Favorites / Compare)
    if (showFavsParam) {
      return matchesSearch && matchesCity && matchesType && matchesCommunity && matchesBudget && matchesBeds && matchesBaths && favorites.includes(p.id);
    }

    return matchesSearch && matchesCity && matchesType && matchesCommunity && matchesBudget && matchesBeds && matchesBaths;
  });

  // Sorting logic
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "newest") return b.yearBuilt - a.yearBuilt;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "popular") return b.featured ? 1 : -1; // mock popularity by featured status
    return 0;
  });

  // Properties matching comparison list
  const comparedProperties = PROPERTIES.filter((p) => compares.includes(p.id));

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCity("All");
    setSelectedType("All");
    setSelectedCommunity("All");
    setBudget(3000000000);
    setBeds("All");
    setBaths("All");
    setSortBy("newest");
    router.push("/properties");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-12">
        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-[0.25em] text-teal-700 dark:text-[#D4AF37]">
            {showFavsParam ? "Your Vault" : showCompareParam ? "Portfolio Compare" : "Registry Listing"}
          </span>
          <h1 className="font-cinzel text-3xl md:text-5xl font-black tracking-tight mt-1 text-zinc-950 dark:text-white">
            {showFavsParam
              ? "Private Registry Bookmarks"
              : showCompareParam
              ? "Asset Portfolio Comparison"
              : "Search Premium Properties"}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm mt-2 leading-relaxed font-light">
            {showFavsParam
              ? "Review and consult on your handpicked luxury holdings."
              : showCompareParam
              ? "Side-by-side specifications of your selected global acquisitions."
              : "Locate off-market estates, waterfront penthouses, and development reserves."}
          </p>
        </div>

        {/* Action button toggles */}
        <div className="flex gap-2">
          {showFavsParam || showCompareParam ? (
            <button
              onClick={() => router.push("/properties")}
              className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-xs font-bold px-4 py-2.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
            >
              Back to Catalog
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/properties?favorites=true")}
                className="bg-accent/10 border border-accent/20 text-accent text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 hover:bg-accent/20 transition-all"
              >
                Vault ({favorites.length})
              </button>
              <button
                onClick={() => router.push("/properties?compare=true")}
                className="bg-secondary/10 border border-secondary/20 text-secondary dark:text-accent text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 hover:bg-secondary/20 transition-all"
              >
                Compare ({compares.length})
              </button>
            </>
          )}
        </div>
      </div>

      {/* RENDER MODE 1: COMPARISON VIEW TABLE */}
      {showCompareParam ? (
        <div className="w-full overflow-x-auto no-scrollbar">
          {comparedProperties.length > 0 ? (
            <div className="min-w-[800px] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl bg-zinc-50/50 dark:bg-white/[0.01] p-6">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-black/[0.08] dark:border-white/[0.08]">
                    <th className="py-4 font-bold text-zinc-400 uppercase tracking-wider w-[20%]">Specs / Metrics</th>
                    {comparedProperties.map((p) => (
                      <th key={p.id} className="py-4 px-6 w-[20%]">
                        <div className="space-y-2">
                          <img src={p.images[0]} alt={p.title} className="w-full aspect-[4/3] object-cover rounded-2xl" />
                          <h3 className="font-bold text-zinc-950 dark:text-white leading-tight">{p.title}</h3>
                          <button
                            onClick={() => toggleCompare(p.id)}
                            className="text-red-500 hover:text-red-600 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                          >
                            <Trash2 size={10} /> Remove
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                  <tr>
                    <td className="py-4 font-bold text-zinc-700 dark:text-zinc-400 uppercase tracking-wider">Asset Class</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="py-4 px-6 text-zinc-800 dark:text-zinc-200 font-bold">{p.type}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 font-bold text-zinc-700 dark:text-zinc-400 uppercase tracking-wider">Price</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="py-4 px-6 font-extrabold text-secondary dark:text-accent">{formatPrice(p.price)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 font-bold text-zinc-700 dark:text-zinc-400 uppercase tracking-wider">Location</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{p.location}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 font-bold text-zinc-700 dark:text-zinc-400 uppercase tracking-wider">Bed / Bath</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="py-4 px-6 text-zinc-800 dark:text-zinc-200 font-bold">{p.beds} Beds / {p.baths} Baths</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 font-bold text-zinc-700 dark:text-zinc-400 uppercase tracking-wider">Footprint Area</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="py-4 px-6 text-zinc-800 dark:text-zinc-200 font-mono">{p.area.toLocaleString()} sq ft</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 font-bold text-zinc-700 dark:text-zinc-400 uppercase tracking-wider">Year Completed</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{p.yearBuilt}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 font-bold text-zinc-700 dark:text-zinc-400 uppercase tracking-wider">Special Amenities</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="py-4 px-6 text-zinc-700 dark:text-zinc-300">
                        <ul className="space-y-1.5">
                          {p.amenities.slice(0, 4).map((a) => (
                            <li key={a} className="flex items-center gap-1 text-[10px]">
                              <CheckCircle size={10} className="text-secondary dark:text-accent shrink-0" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-6 font-bold text-zinc-700 dark:text-zinc-400 uppercase tracking-wider">Action</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="py-6 px-6">
                        <Link
                          href={`/properties/${p.id}`}
                          className="bg-primary dark:bg-white text-white dark:text-primary text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 hover:bg-secondary dark:hover:bg-accent hover:text-white"
                        >
                          <Eye size={12} /> View Details
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-24 text-center border border-dashed border-black/10 dark:border-white/10 rounded-3xl">
              <GitCompare className="mx-auto mb-4 text-zinc-300 dark:text-zinc-600" size={32} />
              <p className="text-xs font-semibold text-zinc-500">No properties selected for comparison.</p>
              <button onClick={() => router.push("/properties")} className="mt-4 bg-accent text-zinc-950 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full">
                Browse Properties
              </button>
            </div>
          )}
        </div>
      ) : (
        /* RENDER MODE 2: SEARCH CATALOG & GRID */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filters Panel */}
          <div className="hidden lg:block space-y-6 bg-zinc-50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] rounded-3xl p-6 h-fit sticky top-24">
            <div className="flex justify-between items-center pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Filters Panel</h3>
              <button onClick={handleClearFilters} className="text-[10px] font-semibold text-zinc-400 hover:text-red-500">
                Reset All
              </button>
            </div>

            {/* City Selector */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">City Location</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-white dark:bg-[#0B1120] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city === "All" ? "All Cities" : city}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Class */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Asset Class</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-white dark:bg-[#0B1120] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type === "All" ? "All Classes" : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Community */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Community Enclave</label>
              <select
                value={selectedCommunity}
                onChange={(e) => setSelectedCommunity(e.target.value)}
                className="w-full bg-white dark:bg-[#0B1120] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none"
              >
                {communities.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All Communities" : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget range slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold text-zinc-400">
                <span>Max Budget</span>
                <span className="text-secondary dark:text-accent font-black">{formatPrice(budget)}</span>
              </div>
              <input
                type="range"
                min={2000000}
                max={3000000000}
                step={10000000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-secondary dark:accent-accent"
              />
            </div>

            {/* Beds & Baths */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Beds</label>
                <select
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  className="w-full bg-white dark:bg-[#0B1120] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none"
                >
                  {["All", "1", "2", "3", "4", "5+"].map((b) => (
                    <option key={b} value={b}>
                      {b === "All" ? "All Beds" : `${b} Bed`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Baths</label>
                <select
                  value={baths}
                  onChange={(e) => setBaths(e.target.value)}
                  className="w-full bg-white dark:bg-[#0B1120] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none"
                >
                  {["All", "1", "2", "3", "4", "5+"].map((b) => (
                    <option key={b} value={b}>
                      {b === "All" ? "All Baths" : `${b} Bath`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Listings Grid (3 Columns) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Search and Sort toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-50 dark:bg-white/[0.01] border border-black/[0.04] dark:border-white/[0.04] p-4 rounded-2xl">
              
              {/* Live search input */}
              <div className="relative w-full md:max-w-xs">
                <input
                  type="text"
                  placeholder="Enter property name or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white dark:bg-[#0B1120] border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-900 dark:text-white outline-none focus:border-secondary dark:focus:border-accent"
                />
                <Search size={14} className="absolute left-3 top-3 text-zinc-400" />
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFiltersMobile(true)}
                className="lg:hidden flex items-center gap-2 bg-white dark:bg-[#0B1120] border border-black/10 dark:border-white/10 px-4 py-2 rounded-xl text-xs"
              >
                <SlidersHorizontal size={14} /> Filters
              </button>

              {/* Sorting */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Sort</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white dark:bg-[#0B1120] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 outline-none"
                >
                  <option value="newest">Newest Releases</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {sortedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                  {sortedProperties.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <PropertyCard property={p} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-24 text-center border border-dashed border-black/10 dark:border-white/10 rounded-3xl">
                <Building className="mx-auto mb-4 text-zinc-300 dark:text-zinc-600" size={32} />
                <p className="text-xs font-semibold text-zinc-500">No properties match your filter queries.</p>
                <button onClick={handleClearFilters} className="mt-4 bg-accent text-zinc-950 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE FILTERS SIDE DRAWER */}
      <AnimatePresence>
        {showFiltersMobile && (
          <div className="fixed inset-0 z-55 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFiltersMobile(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm bg-white dark:bg-[#0B1120] h-full p-6 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center pb-4 border-b border-black/[0.06] dark:border-white/[0.06] mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Filters</h3>
                <button onClick={() => setShowFiltersMobile(false)} className="text-zinc-400">
                  <X size={20} />
                </button>
              </div>

              {/* Filter inputs in Mobile Drawer */}
              <div className="space-y-6">
                {/* City */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">City Location</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-xs"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city === "All" ? "All Cities" : city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Class */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Asset Class</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-xs"
                  >
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type === "All" ? "All Classes" : type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold text-zinc-400">
                    <span>Max Budget</span>
                    <span className="text-secondary dark:text-accent font-black">{formatPrice(budget)}</span>
                  </div>
                  <input
                    type="range"
                    min={2000000}
                    max={3000000000}
                    step={10000000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-secondary dark:accent-accent"
                  />
                </div>

                {/* Beds / Baths */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Beds</label>
                    <select
                      value={beds}
                      onChange={(e) => setBeds(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-xs"
                    >
                      {["All", "1", "2", "3", "4", "5+"].map((b) => (
                        <option key={b} value={b}>
                          {b === "All" ? "All Beds" : `${b} Bed`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Baths</label>
                    <select
                      value={baths}
                      onChange={(e) => setBaths(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-xs"
                    >
                      {["All", "1", "2", "3", "4", "5+"].map((b) => (
                        <option key={b} value={b}>
                          {b === "All" ? "All Baths" : `${b} Bath`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.06] flex gap-4">
                  <button
                    onClick={handleClearFilters}
                    className="w-1/2 py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowFiltersMobile(false)}
                    className="w-1/2 py-3 bg-secondary text-white dark:bg-accent dark:text-zinc-950 rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PropertiesList() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-xs">Loading Catalog...</div>}>
      <PropertiesListContent />
    </Suspense>
  );
}
