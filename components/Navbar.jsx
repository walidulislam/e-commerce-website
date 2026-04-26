"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  ShoppingBag,
  Info,
  User,
  LogOut,
  PlusSquare,
  Settings,
  ChevronDown,
  Search,
  Bell,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useWishlist } from "@/context/WishlistContext";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Items", href: "/items", icon: ShoppingBag },
    { name: "About", href: "/about", icon: Info },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          isScrolled ? "py-3" : "py-6",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "relative flex justify-between items-center px-6 py-3 rounded-[2rem] border transition-all duration-500",
              isScrolled
                ? "bg-black/90 dark:bg-zinc-900/90 backdrop-blur-xl border-zinc-800 shadow-2xl shadow-indigo-500/10"
                : "bg-white/10 backdrop-blur-md border-white/20 shadow-none",
            )}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/logo.png"
                  alt="BDx GLORY"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="hidden w-10 h-10 bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-600 rounded-xl items-center justify-center shadow-lg shadow-amber-500/40">
                  <span className="text-black font-black text-xl italic">
                    B
                  </span>
                </div>
              </div>
              <span
                className={cn(
                  "text-2xl font-black tracking-tight transition-all duration-300",
                  isScrolled ? "text-white" : "text-black",
                )}
              >
                BDx{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-600">
                  GLORY
                </span>
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-5 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105",
                    "text-zinc-500 hover:text-amber-400 hover:bg-amber-400/10",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 text-zinc-400 hover:text-amber-400 transition-colors">
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/wishlist"
                className="p-2 text-zinc-400 hover:text-amber-400 transition-colors relative group"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-all group-hover:scale-110",
                    wishlist.length > 0
                      ? "text-amber-500 fill-amber-400/20"
                      : "",
                  )}
                />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-amber-500 text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 bg-zinc-800/50 p-1.5 pr-4 rounded-2xl hover:bg-zinc-800 transition-all border border-zinc-700/50"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center overflow-hidden shadow-lg shadow-amber-500/20">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-black" />
                      )}
                    </div>
                    <span className="text-sm font-bold text-white">
                      {user.displayName?.split(" ")[0] || "User"}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-zinc-400 transition-transform",
                        isDropdownOpen && "rotate-180",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-64 bg-zinc-900 border border-zinc-800 rounded-[2rem] shadow-2xl py-3 overflow-hidden z-50"
                      >
                        <div className="px-6 py-4 border-b border-zinc-800 mb-2">
                          <p className="text-sm font-black text-white">
                            {user.displayName}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        {[
                          {
                            name: "Add Product",
                            href: "/items/add",
                            icon: PlusSquare,
                          },
                          {
                            name: "Manage Inventory",
                            href: "/items/manage",
                            icon: Settings,
                          },
                        ].map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-3 px-6 py-3 text-sm font-bold text-zinc-400 hover:text-amber-400 hover:bg-amber-400/5 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                        <button
                          onClick={() => {
                            logout();
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-6 py-4 text-sm font-bold text-red-500 hover:bg-red-500/5 transition-colors border-t border-zinc-800 mt-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout Session</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="text-sm font-bold text-zinc-400 hover:text-amber-400 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-2.5 rounded-xl text-sm font-black transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>

            <div className="md:hidden flex items-center space-x-3">
              <button className="p-2 text-zinc-500">
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/wishlist"
                className="p-2 text-zinc-400 hover:text-amber-400 transition-colors relative group"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-all group-hover:scale-110",
                    wishlist.length > 0
                      ? "text-amber-500 fill-amber-500/20"
                      : "",
                  )}
                />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-amber-500 text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              {user && (
                <Link
                  href="/items/manage"
                  className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center"
                >
                  <User className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
        <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-2 shadow-2xl flex items-center justify-around">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex flex-col items-center justify-center w-16 h-16 rounded-3xl transition-all active:scale-90 group"
            >
              <div className="relative">
                <link.icon
                  className={cn(
                    "w-6 h-6 transition-colors",
                    link.name === "Wishlist" && wishlist.length > 0
                      ? "text-amber-400 fill-amber-400/20"
                      : "text-zinc-400 group-hover:text-amber-400",
                  )}
                />
                {link.name === "Wishlist" && wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20">
                    {wishlist.length}
                  </span>
                )}
                <motion.div
                  initial={false}
                  whileTap={{ scale: 1.5 }}
                  className="absolute -inset-2 bg-amber-400/20 rounded-full opacity-0 group-active:opacity-100 transition-opacity"
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-500 mt-1 group-hover:text-amber-400">
                {link.name}
              </span>
            </Link>
          ))}

          <Link
            href={user ? "/items/manage" : "/login"}
            className="flex flex-col items-center justify-center w-16 h-16 rounded-3xl transition-all active:scale-90 group"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-lg",
                user
                  ? "bg-gradient-to-tr from-amber-400 to-yellow-600 shadow-amber-500/20"
                  : "bg-zinc-800",
              )}
            >
              <User
                className={cn("w-5 h-5", user ? "text-black" : "text-white")}
              />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-500 mt-1">
              {user ? "Profile" : "Auth"}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
