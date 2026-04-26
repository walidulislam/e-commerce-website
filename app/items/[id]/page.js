"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Star, 
  ShieldCheck, 
  Truck, 
  Heart,
  Tag,
  ArrowRight,
} from "lucide-react";
import { getStoredItems } from "@/lib/storage";
import { useWishlist } from "@/context/WishlistContext";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ProductCard from "@/components/ProductCard";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function ItemDetailsPage() {
  const { toggleItem, isInWishlist } = useWishlist();
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    const allItems = getStoredItems();
    const foundItem = allItems.find(i => i.id === id);
    if (foundItem) {
      setItem(foundItem);
      // Get related items (same category, excluding current)
      const related = allItems
        .filter(i => i.category === foundItem.category && i.id !== id)
        .slice(0, 3);
      setRelatedItems(related);
    }
  }, [id]);

  if (!item) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => router.back()}
        className="flex items-center space-x-2 text-zinc-500 hover:text-amber-500 transition-colors mb-8 font-medium group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Items</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-[3rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 h-[500px] md:h-[600px]"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 flex flex-col gap-3">
             <div className="bg-black/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 shadow-2xl text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] flex items-center space-x-2">
                <Tag className="w-3.5 h-3.5" />
                <span>{item.category}</span>
             </div>
          </div>
          <div className="absolute top-6 right-6">
             <button 
                onClick={() => toggleItem(item.id, item.title)}
                className={cn(
                  "w-14 h-14 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl active:scale-90 transition-all group/heart border transition-colors duration-500",
                  isInWishlist(item.id) 
                    ? "bg-red-500/10 border-red-500/50" 
                    : "bg-white/10 border-white/20 hover:bg-red-500"
                )}
              >
                <Heart 
                  className={cn(
                    "w-5 h-5 transition-all duration-300",
                    isInWishlist(item.id) 
                      ? "fill-red-500 text-red-500 scale-110" 
                      : "text-white group-hover/heart:text-white"
                  )} 
                />
              </button>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-amber-500" />
            <span className="text-amber-500 font-black text-xs uppercase tracking-[0.3em]">Premium Piece</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight">
            {item.title}
          </h1>

          <div className="flex items-center space-x-6 mb-10">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
              ))}
              <span className="ml-3 text-zinc-500 font-bold">4.9 (120+ Reviews)</span>
            </div>
            <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />
            <div className="text-amber-500 font-black text-sm uppercase tracking-widest">In Stock</div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[2.5rem] mb-10 border border-zinc-100 dark:border-zinc-800">
            <span className="text-zinc-500 dark:text-zinc-400 text-sm font-bold uppercase tracking-widest block mb-2">Price</span>
            <div className="text-5xl font-black text-zinc-900 dark:text-white flex items-baseline">
              <span>৳{item.price}</span>
              <span className="ml-4 text-lg text-zinc-400 font-medium line-through">৳{Math.floor(item.price * 1.2)}</span>
            </div>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-12 font-medium">
            {item.description || item.shortDescription || item.fullDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: ShieldCheck, title: "Authentic Product", desc: "Certified by BDx GLORY" },
              { icon: Truck, title: "Express Delivery", desc: "2-3 business days" },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-4 p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{feature.title}</h4>
                  <p className="text-zinc-500 text-xs mt-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => router.push('/items')}
            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-black flex items-center justify-center space-x-4 group shadow-2xl"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
            <span>Return to Archives</span>
          </button>
        </motion.div>
      </div>

      {/* Related Items Section */}
      {relatedItems.length > 0 && (
        <section className="mt-32 pt-24 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-amber-500" />
                <span className="text-amber-500 font-black text-xs uppercase tracking-[0.3em]">Related Pieces</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
                Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">The Look</span>
              </h2>
            </div>
            <Link href="/items" className="text-zinc-500 hover:text-amber-500 font-black uppercase tracking-[0.2em] text-xs transition-colors flex items-center gap-2 group">
              Explore More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedItems.map((relatedItem, i) => (
              <ProductCard
                key={relatedItem.id}
                item={relatedItem}
                i={i}
                toggleItem={toggleItem}
                isInWishlist={isInWishlist}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
