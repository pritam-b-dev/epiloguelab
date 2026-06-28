"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@heroui/react";
import { Lightbulb, Sprout, Handshake, Target } from "lucide-react";

const features = [
  {
    icon: <Lightbulb className="w-6 h-6 text-amber-400" />,
    title: "Preserve Wisdom",
    description: "Capture insights before they fade",
  },
  {
    icon: <Sprout className="w-6 h-6 text-emerald-400" />,
    title: "Personal Growth",
    description: "Reflect on experiences daily",
  },
  {
    icon: <Handshake className="w-6 h-6 text-indigo-400" />,
    title: "Community Learning",
    description: "Learn from diverse perspectives",
  },
  {
    icon: <Target className="w-6 h-6 text-rose-400" />,
    title: "Mindful Reflection",
    description: "Build a habit of reflection",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function WhyLearningMatters() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="bg-[#0a0a0a] py-16 px-4">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Why Learning From Life Matters
          </h2>
          <p className="text-zinc-500">
            Grow your wisdom through structured reflection
          </p>
        </div>

        {/* Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-[#121212] border border-zinc-800/50 rounded-2xl p-4 text-center hover:border-zinc-700 transition-colors shadow-none">
                <Card.Header className="flex flex-col items-center gap-3">
                  <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800 mb-2">
                    {feature.icon}
                  </div>
                  <Card.Title className="text-lg font-semibold text-white">
                    {feature.title}
                  </Card.Title>
                  <Card.Description className="text-zinc-400 text-sm">
                    {feature.description}
                  </Card.Description>
                </Card.Header>

                <Card.Content />
                <Card.Footer />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
