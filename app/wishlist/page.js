"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { getStoredItems } from "@/lib/storage";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ProductCard from "@/components/ProductCard";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function WishlistPage() {
  const { wishlist, toggleItem, isInWishlist } = useWishlist();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const allItems = getStoredItems();
    const wishlistedItems = allItems.filter(item => wishlist.includes(item.id));
    setItems(wishlistedItems);
  }, [wishlist]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-px bg-amber-500" />
          <span className="text-amber-500 font-black text-xs uppercase tracking-[0.3em]">Saved Pieces</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
          Luxury <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Wishlist</span>
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium">Curated items you've reserved for your elite collection.</p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <ProductCard
                key={item.id}
                item={item}
                i={i}
                toggleItem={toggleItem}
                isInWishlist={isInWishlist}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border border-dashed border-zinc-200 dark:border-zinc-800">
          <Heart className="w-16 h-16 text-zinc-300 mx-auto mb-6" />
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-8">Your wishlist is empty.</p>
          <Link
            href="/items"
            className="inline-flex items-center space-x-3 bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Go Shopping</span>
          </Link>
        </div>
      )}
    </div>
  );
}
