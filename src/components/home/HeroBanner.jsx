"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Preserve Your Life's Greatest Lessons",
    subtitle: "Turn experiences into timeless wisdom",
    buttonText: "Explore Lessons",
    link: "/lessons",
  },
  {
    title: "Learn From Real Human Experiences",
    subtitle: "Browse wisdom from real people",
    buttonText: "Browse Lessons",
    link: "/lessons",
  },
  {
    title: "Unlock Premium Life Insights",
    subtitle: "Premium lessons from experienced thinkers",
    buttonText: "View Pricing",
    link: "/pricing",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 tracking-tight max-w-3xl">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl">
            {slides[currentSlide].subtitle}
          </p>
          <Link
            href={slides[currentSlide].link}
            className="px-8 py-3.5 bg-primary hover:opacity-90 text-primary-foreground font-semibold rounded-xl transition-all active:scale-[0.98] shadow-lg"
          >
            {slides[currentSlide].buttonText}
          </Link>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
        }
        className="absolute left-4 md:left-8 p-2 rounded-full bg-zinc-900/50 backdrop-blur-md border border-border text-zinc-400 hover:text-white transition-all"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        }
        className="absolute right-4 md:right-8 p-2 rounded-full bg-zinc-900/50 backdrop-blur-md border border-border text-zinc-400 hover:text-white transition-all"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-8 bg-primary" : "w-2 bg-zinc-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
