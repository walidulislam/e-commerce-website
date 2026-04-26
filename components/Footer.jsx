"use client";

import Link from "next/link";
import { Globe, Mail, MessageSquare, Link2, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#2a1a05] via-[#1a0f02] to-black border-t border-amber-900/50 pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1 space-y-8">
            <Link href="/" className="group flex items-center space-x-3">
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
              <div className="flex flex-col -space-y-1">
                <span className="text-2xl font-black tracking-tight text-white drop-shadow-sm">
                  BDx{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-600">
                    GLORY
                  </span>
                </span>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em] mt-1">
                  Elite Selection
                </span>
              </div>
            </Link>
            <p className="text-amber-100/60 text-sm leading-relaxed font-medium">
              Redefining the standard of global luxury. We source the
              extraordinary to bring a touch of glory to your lifestyle.
            </p>
            <div className="flex space-x-4">
              {[Globe, Mail, MessageSquare, Link2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-black/40 border border-amber-900/30 flex items-center justify-center text-amber-100/50 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all shadow-lg"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-8">
              Collection
            </h3>
            <ul className="space-y-4">
              {[
                "New Arrivals",
                "Best Sellers",
                "Exclusive Drops",
                "Gift Experience",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/items"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors text-sm font-bold flex items-center group"
                  >
                    {item}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-8">
              House
            </h3>
            <ul className="space-y-4">
              {[
                "Our Story",
                "Contact Concierge",
                "Philosophy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/about"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors text-sm font-bold flex items-center group"
                  >
                    {item}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">
              Newsletter
            </h3>
            <p className="text-amber-100/60 text-sm font-medium leading-relaxed">
              Join the inner circle for exclusive access to upcoming
              collections.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Secure Email Address"
                className="w-full px-5 py-4 bg-black/40 border border-amber-900/30 rounded-2xl text-sm font-bold focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all outline-none text-white placeholder:text-amber-100/30"
              />
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest text-xs py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-amber-900/30 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-[10px] font-black uppercase tracking-[0.2em] text-amber-100/40">
          <p>&copy; {currentYear} BDx GLORY. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-8">
            <Link href="#" className="hover:text-amber-400 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">
              Legal
            </Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
