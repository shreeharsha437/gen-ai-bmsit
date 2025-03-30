"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, Plane, Zap, Rocket } from "lucide-react"; // Added some flying icons

interface TimelineItemProps {
  event: {
    id: number;
    time: string;
    title: string;
    description: string;
    icon: LucideIcon;
  };
  isLeft: boolean; // Determines if the card is on the left or right
}

// Simple flying object placeholder
const FlyingObject: React.FC<{ isLeft: boolean }> = ({ isLeft }) => {
  const Icon = [Plane, Zap, Rocket][Math.floor(Math.random() * 3)]; // Randomly pick one
  const animation = {
    x: isLeft ? [0, -20, 0] : [0, 20, 0], // Side-to-side movement
    y: [0, -10, 10, 0], // Bobbing movement
    rotate: [0, isLeft ? 5 : -5, 0],
    transition: {
      duration: Math.random() * 5 + 8, // Random duration between 8-13s
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut",
      delay: Math.random() * 2, // Stagger start times
    },
  };

  return (
    <motion.div
      className={`absolute ${
        isLeft ? "right-full mr-4 md:mr-8" : "left-full ml-4 md:ml-8"
      } top-1/4 md:top-1/3 opacity-50 text-purple-400`}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 0.5, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      animate={animation}
    >
      <Icon size={30 + Math.random() * 30} /> {/* Random size */}
    </motion.div>
  );
};

const TimelineItem: React.FC<TimelineItemProps> = ({ event, isLeft }) => {
  const { time, title, description, icon: EventIcon } = event;

  const itemVariants = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div
      className={`relative flex ${
        isLeft ? "justify-start" : "justify-end"
      } w-full my-4`}
    >
      {/* Ensure the parent relative positioning works */}
      <div className="w-full md:w-5/12">
        {/* Motion div for the card animation */}
        <motion.div
          className={`relative p-4 md:p-5 rounded-lg shadow-xl border-2 border-purple-500/50 bg-gray-800/60 backdrop-blur-sm ${
            isLeft ? "mr-4 md:mr-8" : "ml-4 md:ml-8"
          }`}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% is visible
        >
          {/* Card Content */}
          <h3 className="text-lg md:text-xl font-bold mb-1 font-[var(--font-major-mono)] text-pink-400">
            {title}
          </h3>
          <p className="text-sm text-gray-300 font-[var(--font-bytesize)] mb-2">
            {description}
          </p>
          <time className="text-xs font-bold uppercase tracking-wider text-purple-400 font-[var(--font-2bit)]">
            {time}
          </time>

          {/* Decorative Flying Object */}
          <FlyingObject isLeft={isLeft} />
        </motion.div>
      </div>

      {/* Node on the Timeline (Centred) */}
      {/* Use motion for potential animation */}
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2 mt-4 md:mt-5 z-10" // Adjust top alignment as needed
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.3,
          delay: 0.1,
          type: "spring",
          stiffness: 150,
        }}
      >
        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-md border-2 border-white/50">
          <EventIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineItem;
