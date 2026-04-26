"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Zap, 
  Star,
} from "lucide-react";
import { items } from "@/data/items";
import { useWishlist } from "@/context/WishlistContext";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ProductCard from "@/components/ProductCard";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const { toggleItem, isInWishlist } = useWishlist();
  const topItems = items.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const slides = [
    {
      id: 1,
      tag: "Limited Edition Drop Ã¢â‚¬Â¢ 2024",
      title: "The New Standard",
      titleAccent: "of Street",
      description: "Engineered for the aesthetic elite. The GLORY-01 silhouette merges brutalist architecture with cloud-layer comfort.",
      price: "3,850",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg"
    },
    {
      id: 2,
      tag: "Precision Engineering",
      title: "Timeless Mastery",
      titleAccent: "in Detail",
      description: "Crafted for those who value every second. Our Chrono-Series defines luxury and precision in every movement.",
      price: "1,200",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      tag: "Essential Style",
      title: "Classic Denim",
      titleAccent: "Jacket",
      description: "Our denim jacket is built to last. 14oz raw denim that develops unique character over time. Featuring traditional metal buttons.",
      price: "2,145",
      image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-24 pb-24 overflow-hidden">
      <section className="relative min-h-[90vh] flex items-center overflow-hidden px-4 md:px-16 py-12 max-w-[1440px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full z-10"
          >
            <div className="lg:col-span-7">
              <motion.div>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-amber-500 mb-4 block">
                  {slides[currentSlide].tag}
                </span>
                <h2 className="text-6xl md:text-[100px] font-black leading-[1.1] tracking-tight text-zinc-900 dark:text-white mb-8">
                  {slides[currentSlide].title} <br /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600">
                    {slides[currentSlide].titleAccent}
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-md mb-10 leading-relaxed font-medium">
                  {slides[currentSlide].description}
                </p>
                
                <div className="flex flex-wrap items-center gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/items"
                      className="relative group bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-600 text-black px-10 py-4 rounded-2xl font-black uppercase tracking-wider transition-all overflow-hidden block shadow-xl shadow-amber-500/20"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                      
                      <span className="relative z-10 flex items-center gap-3">
                        Order Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/about"
                      className="group relative bg-white dark:bg-zinc-900 border-2 border-amber-500/30 px-10 py-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-500 text-zinc-900 dark:text-white overflow-hidden block"
                    >
                      <span className="relative z-10">View Specs</span>
                      <div className="absolute inset-0 bg-amber-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center items-center py-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: -12 }}
                whileHover={{ rotate: 0 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="relative w-full max-w-[500px] aspect-square flex items-center justify-center group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-yellow-600/5 dark:from-amber-500/10 dark:to-yellow-600/10 rounded-[3.5rem] transition-all duration-700 border border-zinc-100 dark:border-zinc-800 shadow-[0_0_100px_rgba(251,191,36,0.05)]" />
                
                <div className="absolute inset-4 rounded-[3rem] border border-dashed border-amber-500/30 animate-[spin_60s_linear_infinite] opacity-50"></div>
                
                <div className="relative z-10 transition-all duration-700 group-hover:scale-110 h-full flex items-center justify-center p-8">
                  <motion.img 
                    key={slides[currentSlide].image}
                    initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5 }}
                    alt={slides[currentSlide].title}
                    className="w-full max-h-full drop-shadow-[0_50px_50px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_50px_50px_rgba(255,215,0,0.1)] object-contain"
                    src={slides[currentSlide].image}
                  />
                </div>

                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    y: [0, -10, 0],
                    rotate: [12, 15, 12]
                  }}
                  transition={{ 
                    delay: 0.5,
                    y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                    rotate: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                  }}
                  className="absolute -top-4 -right-4 md:top-6 md:right-6 z-30 group/badge"
                >
                  <div className="relative flex items-center justify-center w-28 h-28 md:w-32 md:h-32">
                    <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl group-hover/badge:blur-2xl transition-all duration-500 animate-pulse" />
                    
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600 rounded-full animate-[spin_4s_linear_infinite]" />
                    
                    <div className="absolute inset-[3px] bg-white dark:bg-zinc-900 rounded-full flex flex-col items-center justify-center border border-white/10 shadow-inner">
                      <span className="text-[9px] font-black text-amber-500 dark:text-amber-400 uppercase tracking-[0.2em] mb-1">Price</span>
                      <span className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white">{"\u09F3"}{slides[currentSlide].price}</span>
                      
                      <div className="mt-1 w-1 h-1 bg-amber-500 rounded-full animate-ping" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 transition-all duration-500 rounded-full ${
                currentSlide === index 
                  ? "w-12 bg-amber-500" 
                  : "w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-amber-500/50"
              }`}
            />
          ))}
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] border border-zinc-200 dark:border-zinc-800 rounded-full -z-10 opacity-30"></div>
        
        <div className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2">
          <span className="[writing-mode:vertical-rl] font-black text-zinc-200 dark:text-zinc-800 uppercase tracking-[1em] text-[10px]">
            SCARCITY BY DESIGN Ã¢â‚¬Â¢ AUTUMN 24
          </span>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On all orders over Ã Â§Â³150" },
            { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure processing" },
            { icon: RotateCcw, title: "Easy Returns", desc: "30-day money back guarantee" },
            { icon: Zap, title: "Next Day Delivery", desc: "For premium members" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] border border-transparent hover:border-amber-400/20 transition-all"
            >
              <div className="w-14 h-14 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <feature.icon className="text-amber-500 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative py-24 px-4 overflow-hidden light-gold-vibe-bg border-y border-amber-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="w-8 h-px bg-amber-500" />
                <span className="text-amber-500 font-black text-xs uppercase tracking-[0.3em]">Curated</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Selection</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">Hand-picked excellence for the modern elite.</p>
            </div>
            <Link href="/items" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-3 group hover:border-amber-500 transition-all shadow-xl shadow-black/5">
              <span>View Collection</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-amber-500" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topItems.map((item, i) => (
              <ProductCard
                key={item.id}
                item={item}
                i={i}
                toggleItem={toggleItem}
                isInWishlist={isInWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="bg-amber-500 rounded-[3rem] p-12 md:p-20 text-black relative overflow-hidden shadow-2xl shadow-amber-200 dark:shadow-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 skew-x-12 translate-x-32" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-5xl font-black mb-2">50k+</p>
              <p className="text-zinc-800 font-medium">Happy Customers</p>
            </div>
            <div>
              <p className="text-5xl font-black mb-2">99%</p>
              <p className="text-zinc-800 font-medium">Positive Feedback</p>
            </div>
            <div>
              <p className="text-5xl font-black mb-2">24/7</p>
              <p className="text-zinc-800 font-medium">Premium Support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-amber-500" />
              <span className="text-amber-500 font-black text-xs uppercase tracking-[0.3em]">Testimonials</span>
              <div className="w-8 h-px bg-amber-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Clients Say</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">Trusted by world-class leaders and curators.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Alex Johnson", role: "UI Designer", text: "The quality of the products is unmatched. Every item I've ordered has exceeded my expectations." },
            { name: "Sarah Williams", role: "Tech Enthusiast", text: "Fast shipping and amazing customer service. BDx GLORY is my go-to for all things premium." },
            { name: "Michael Chen", role: "Collector", text: "The minimalist gold designs fit perfectly in my modern home. Highly recommend the elite collection!" },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                y: -10,
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative p-10 bg-gradient-to-br from-indigo-950 via-purple-900 to-zinc-950 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex space-x-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500 group-hover:scale-125 transition-transform duration-300" />
                  ))}
                </div>
                
                <p className="text-zinc-300 mb-10 italic text-lg leading-relaxed font-medium">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center space-x-4 border-t border-white/10 pt-8">
                  <div className="w-14 h-14 bg-gradient-to-tr from-amber-400 to-yellow-600 rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-lg shadow-amber-500/20">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-white tracking-tight">{testimonial.name}</h4>
                    <p className="text-amber-500/60 text-xs font-bold uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/20 rounded-[2.5rem] transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 w-full text-center relative py-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-amber-500/5 rounded-full blur-[100px] -z-10" />
        
        <motion.div 
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative group overflow-hidden bg-white/60 dark:bg-zinc-950/90 backdrop-blur-3xl p-12 md:p-16 rounded-tr-[8rem] rounded-bl-[8rem] rounded-tl-3xl rounded-br-3xl border border-zinc-200 dark:border-amber-500/20 shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.08),transparent_50%)]" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 mb-8"
            >
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-amber-500">The Inner Circle</span>
            </motion.div>
            
            <h2 className="text-2xl md:text-4xl font-black text-zinc-900 dark:text-white mb-6 tracking-tighter leading-tight uppercase">
              Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Reality</span>
            </h2>
            
            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mb-10 max-w-lg mx-auto leading-relaxed font-bold tracking-wide uppercase opacity-80">
              Access the vault. Be the first to witness our limited drops and private collections.
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/register"
                  className="relative group/btn bg-zinc-900 dark:bg-white text-white dark:text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all shadow-2xl overflow-hidden block"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Infiltrate Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-amber-500 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                </Link>
              </motion.div>
              
              <Link href="/about" className="text-zinc-400 dark:text-zinc-500 font-black hover:text-amber-500 transition-colors uppercase tracking-[0.2em] text-[8px]">
                House Philosophy
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
