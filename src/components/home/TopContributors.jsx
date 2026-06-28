"use client"; // যেহেতু Framer Motion ব্যবহার করছি

import { Card } from "@heroui/react";
import { motion } from "framer-motion";

export default function TopContributors({ contributors = [] }) {
  if (contributors.length === 0) return null;

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-10 text-center">
        Top Contributors
      </h2>

      <div className="flex flex-wrap justify-center gap-16">
        {contributors.map((user) => (
          <motion.div
            key={user._id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="w-full sm:w-[160px]"
          >
            <Card className="bg-[#121212] border border-zinc-800 rounded-2xl p-4 text-center hover:border-indigo-500/50 transition-all duration-300 shadow-none hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer">
              <Card.Header className="flex flex-col items-center p-0">
                <div className="relative w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 to-purple-500">
                  <div className="w-full h-full rounded-full bg-[#121212] flex items-center justify-center text-xl font-bold text-white overflow-hidden">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.name?.charAt(0).toUpperCase()
                    )}
                  </div>
                </div>

                <Card.Title className="text-sm font-bold text-white mt-4 p-0">
                  {user.name}
                </Card.Title>
                <Card.Description className="text-xs text-indigo-400 mt-1 font-medium bg-indigo-500/10 px-2 py-0.5 rounded-full">
                  {user.count} Lessons
                </Card.Description>
              </Card.Header>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
