"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getWishlist, toggleWishlist as toggleWishlistStorage } from "@/lib/storage";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const toggleItem = (id, title) => {
    const newWishlist = toggleWishlistStorage(id);
    setWishlist(newWishlist);
    
    if (newWishlist.includes(id)) {
      toast.success(`${title || "Item"} added to wishlist!`, {
        icon: "❤️",
        style: {
          borderRadius: "1rem",
          background: "#18181b",
          color: "#fff",
        },
      });
    } else {
      toast(`${title || "Item"} removed from wishlist`, {
        icon: "💔",
        style: {
          borderRadius: "1rem",
          background: "#18181b",
          color: "#fff",
        },
      });
    }
  };

  const isInWishlist = (id) => wishlist.includes(id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleItem, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
