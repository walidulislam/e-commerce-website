"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Star, Tag, ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function ProductCard({ item, i, toggleItem, isInWishlist }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      whileHover={{ y: -12 }}
      className="group relative flex flex-col bg-white dark:bg-zinc-900/60 backdrop-blur-3xl rounded-[3rem] overflow-hidden border border-zinc-100 dark:border-white/10 transition-all duration-500 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(251,191,36,0.15)] h-full"
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
          {i % 3 === 0 && (
            <div className="px-3 py-1 bg-amber-500 rounded-lg self-start">
               <span className="text-[8px] font-black text-black uppercase">Elite Piece</span>
            </div>
          )}
        </div>

        <div className="absolute top-6 right-6">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleItem(item.id, item.title);
            }}
            className={cn(
              "w-11 h-11 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl active:scale-90 transition-all group/heart border transition-colors duration-500",
              isInWishlist(item.id) 
                ? "bg-red-500/10 border-red-500/50" 
                : "bg-white/10 border-white/20 hover:bg-red-500"
            )}
          >
            <Heart 
              className={cn(
                "w-4 h-4 transition-all duration-300",
                isInWishlist(item.id) 
                  ? "fill-red-500 text-red-500 scale-110" 
                  : "text-white group-hover/heart:text-white"
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
  );
}
