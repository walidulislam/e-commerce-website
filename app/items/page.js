"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, SlidersHorizontal, ArrowRight, Star, Heart, Tag } from "lucide-react";
import { getStoredItems } from "@/lib/storage";
import { useWishlist } from "@/context/WishlistContext";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function ItemsPage() {
  const { wishlist, toggleItem, isInWishlist } = useWishlist();
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  useEffect(() => {
    const items = getStoredItems();
    setAllItems(items);
    setFilteredItems(items);
  }, []);

  useEffect(() => {
    let result = allItems;

    if (search) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter(item => item.category === category);
    }

    if (priceRange !== "All") {
      if (priceRange === "0-100") result = result.filter(item => item.price <= 100);
      else if (priceRange === "100-300") result = result.filter(item => item.price > 100 && item.price <= 300);
      else if (priceRange === "300+") result = result.filter(item => item.price > 300);
    }

    setFilteredItems(result);
  }, [search, category, priceRange, allItems]);

  const categories = ["All", ...new Set(allItems.map(item => item.category))];

  return (
    <div className="relative min-h-screen light-gold-vibe-bg">
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl w-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-px bg-amber-500" />
              <span className="text-amber-500 font-black text-xs uppercase tracking-[0.3em]">Marketplace</span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Collection</span>
            </h1>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-amber-500 transition-colors" />
              <input
                type="text"
                placeholder="Search premium products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 shadow-sm transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Category</label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 appearance-none text-sm font-bold"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Price Range</label>
              <div className="relative">
                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 appearance-none text-sm font-bold"
                >
                  <option value="All">All Prices</option>
                  <option value="0-100">Ã Â§Â³0 - Ã Â§Â³100</option>
                  <option value="100-300">Ã Â§Â³100 - Ã Â§Â³300</option>
                  <option value="300+">Ã Â§Â³300+</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -12 }}
                  className="group relative flex flex-col bg-white dark:bg-zinc-900/60 backdrop-blur-3xl rounded-[3rem] overflow-hidden border border-zinc-100 dark:border-white/10 transition-all duration-500 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(251,191,36,0.15)]"
                >
                  <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
                  
                  <div className="relative h-80 overflow-hidden bg-zinc-50 dark:bg-zinc-950/40">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <div className="px-4 py-2 bg-black/80 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl">
                        <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]">
                          {item.category}
                        </span>
                      </div>
                      {i % 2 === 0 && (
                        <div className="px-3 py-1 bg-amber-500 rounded-lg self-start">
                           <span className="text-[8px] font-black text-black uppercase">Elite Piece</span>
                        </div>
                      )}
                    </div>

                    <div className="absolute top-6 right-6">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          toggleItem(item.id, item.title);
                        }}
                        className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl active:scale-90 transition-all group/heart border border-white/20 hover:bg-red-500 transition-colors duration-500"
                      >
                        <Heart 
                          className={cn(
                            "w-5 h-5 transition-all duration-300",
                            isInWishlist(item.id) ? "fill-white text-white scale-125" : "text-white group-hover/heart:text-white"
                          )} 
                        />
                      </button>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="flex items-center gap-3 mb-2">
                         <div className="h-px w-6 bg-amber-500" />
                         <span className="text-amber-500 text-[10px] font-black tracking-widest uppercase">Pricing</span>
                       </div>
                       <span className="text-white text-4xl font-black">{"\u09F3"}{item.price}</span>
                    </div>
                  </div>

                  <div className="p-10 flex flex-col flex-grow relative">
                    <div className="flex items-center gap-2 mb-4 opacity-60">
                       <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                       <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Authentic Series</span>
                    </div>

                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight leading-tight group-hover:text-amber-500 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-10 line-clamp-2 leading-relaxed font-medium">
                      {item.shortDescription}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-8">
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400">
                          <Tag className="w-3.5 h-3.5 text-amber-500/50" />
                          <span>Limited</span>
                       </div>
                       <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400">
                          <Star className="w-3.5 h-3.5 text-amber-500/50" />
                          <span>Premium</span>
                       </div>
                    </div>
                    
                    <div className="mt-auto pt-8 border-t border-zinc-100 dark:border-white/5">
                      <Link
                        href={`/items/${item.id}`}
                        className="group/btn relative w-full flex items-center justify-center gap-3 bg-zinc-900 dark:bg-zinc-800 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Discover Full Spec
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                      </Link>
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-500/5 to-transparent -rotate-45 translate-x-12 translate-y-12" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 dark:bg-zinc-400 text-lg">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setPriceRange("All");
              }}
              className="mt-4 text-amber-500 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
