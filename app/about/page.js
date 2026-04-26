"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ShoppingBag, 
  Target, 
  Heart, 
  Award, 
  Zap, 
  Globe, 
  ShieldCheck, 
  Crown,
  ArrowRight,
  ArrowDown
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ opacity, scale }}
          className="text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black uppercase tracking-[0.3em] mb-8"
          >
            <Crown className="w-3 h-3" />
            <span>The Elite Standard</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-9xl font-black text-zinc-900 dark:text-white mb-8 tracking-tighter leading-[0.85]"
          >
            THE ART OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600">GLORY</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed"
          >
            BDx GLORY is not just a platform; it's a statement. We curate the extraordinary for those who demand nothing less than perfection.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="w-4 h-4 text-amber-500" />
          </motion.div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-[4rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative aspect-square rounded-[3.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2000&auto=format&fit=crop"
                alt="Luxury Watch Detail"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <div className="text-amber-500 font-black text-xs uppercase tracking-widest mb-2">Authenticity First</div>
                <h3 className="text-3xl font-black text-white leading-tight">Every piece tells a story of heritage.</h3>
              </div>
            </div>
          </motion.div>

          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter leading-tight">
                Crafting <span className="italic text-amber-500 font-serif">Unrivaled</span> <br /> Experiences
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                In an era of mass production, we stand for the meticulously crafted. BDx GLORY was founded to bridge the gap between global luxury and local accessibility, ensuring that every purchase is an investment in quality.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: ShieldCheck, title: "Pure Assurance", desc: "100% verified luxury pieces only." },
                { icon: Globe, title: "Global Reach", desc: "Sourcing the world's finest collections." },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-black shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-zinc-900 dark:text-white text-sm uppercase tracking-wider">{item.title}</h4>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/items" className="inline-flex items-center space-x-4 group">
              <span className="text-zinc-900 dark:text-white font-black uppercase tracking-widest text-sm border-b-2 border-amber-500 pb-1">Begin Your Journey</span>
              <div className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 transition-all">
                <ArrowRight className="w-4 h-4 group-hover:text-black transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900 py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { val: "5K+", label: "Elite Members" },
              { val: "200+", label: "Premium Brands" },
              { val: "100%", label: "Authenticity" },
              { val: "24/7", label: "Concierge" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-5xl md:text-6xl font-black text-amber-500 mb-2 tracking-tighter">{stat.val}</div>
                <div className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.3em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tighter mb-6">
              OUR CORE <span className="text-amber-500">VALUES</span>
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Zap, 
              title: "VELOCITY", 
              desc: "Express global sourcing and white-glove delivery that respects your time.",
              color: "amber"
            },
            { 
              icon: Award, 
              title: "INTEGRITY", 
              desc: "Zero tolerance for compromises. Every piece is an original masterpiece.",
              color: "yellow"
            },
            { 
              icon: Heart, 
              title: "EMPATHY", 
              desc: "Beyond commerce, we build relationships. Your satisfaction is our legacy.",
              color: "orange"
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 group hover:bg-white dark:hover:bg-zinc-900 transition-all duration-500"
            >
              <div className="w-20 h-20 bg-amber-500/10 rounded-[2rem] flex items-center justify-center text-amber-500 mb-10 group-hover:rotate-12 transition-transform">
                <item.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-6 tracking-widest">{item.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto rounded-[4rem] bg-amber-500 p-16 md:p-24 text-center overflow-hidden relative group"
        >
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black/10 rounded-full blur-[80px]" />
          
          <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-10 relative z-10">
            READY FOR THE <br /> NEXT LEVEL?
          </h2>
          <Link 
            href="/register" 
            className="inline-flex items-center space-x-4 px-12 py-6 bg-black text-white rounded-full font-black uppercase tracking-[0.2em] hover:bg-zinc-900 transition-all shadow-2xl relative z-10"
          >
            <span>Join The Inner Circle</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
