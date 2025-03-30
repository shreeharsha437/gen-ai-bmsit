"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Image from "next/image";

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

// Updated flying object with special cases for p4t and p10b preserved
const FlyingObject: React.FC<{ isLeft: boolean; nodeIndex: number }> = ({
  isLeft,
  nodeIndex,
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  let imagePath = "";

  // Special cases first - ensure these specific images only appear at their designated nodes

  // Special case: Last node (18th) should show p10b.png
  if (nodeIndex === 17) {
    imagePath = "/planes/p10b.png";
  }
  // Special case: The 6th node should show p4t.png (mirrored)
  else if (nodeIndex === 5) {
    imagePath = "/planes/p2t.png";
  }
  // First two nodes show specified images
  else if (nodeIndex === 0) {
    imagePath = "/planes/p1t.png"; // First node gets p1t.png
  } else if (nodeIndex === 1) {
    imagePath = "/planes/p4t.png"; // Second node gets p2t.png
  }
  // Normal mapping for other nodes - careful to avoid using p4t.png and p10b.png in normal distribution
  else {
    const adjustedIndex = nodeIndex;

    if (adjustedIndex < 5) {
      // First few nodes get top planes, avoiding p4t for node 5
      // Use modulo to cycle among p1t, p2t, p3t
      imagePath = `/planes/p${(adjustedIndex % 3) + 1}t.png`;
    } else if (adjustedIndex < 8) {
      // Next 3 nodes get helicopters (p5m.png, p6m.png)
      // Use modulo 2 to alternate between the two helicopter images
      imagePath = `/planes/p${(adjustedIndex % 2) + 5}m.png`;
    } else {
      // Remaining nodes get balloons, avoiding p10b for the last node
      // Use modulo 3 to cycle among p7b, p8b, p9b only
      const balloonIndex = ((adjustedIndex - 8) % 3) + 7;
      imagePath = `/planes/p${balloonIndex}b.png`;
    }
  }

  // Debug to console - check what's happening
  console.log(`Node ${nodeIndex} using image: ${imagePath}`);

  const animation = {
    x: isLeft ? [0, -25, 0] : [0, 25, 0], // Enhanced side-to-side movement
    y: [0, -12, 12, 0], // Enhanced bobbing movement
    rotate: [0, isLeft ? 8 : -8, 0], // Slight rotation
    transition: {
      duration: Math.random() * 5 + 10, // Longer duration between 10-15s
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut",
      delay: Math.random() * 3, // Staggered start times
    },
  };

  return (
    <motion.div
      className={`absolute ${
        isLeft ? "right-full mr-5 md:mr-10" : "left-full ml-5 md:ml-10"
      } top-1/4 md:top-1/3 opacity-70 z-10`}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 0.7, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      animate={animation}
    >
      {/* Using Next.js Image component with 2.5x larger size */}
      <div className="w-24 h-24 md:w-32 md:h-32 relative">
        <Image
          src={imagePath}
          alt={`Flying object for node ${nodeIndex}`}
          fill
          sizes="(max-width: 768px) 96px, 128px"
          className={`object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } ${
            ![17, 11, 5, 6, 7].includes(nodeIndex) ? "scale-x-[-1]" : ""
          } transition-opacity duration-300`}
          priority
          onLoadingComplete={() => {
            console.log(`Successfully loaded: ${imagePath}`);
            setImageLoaded(true);
          }}
          onError={(e) => {
            console.error(`Failed to load image: ${imagePath}`);
          }}
        />
      </div>
    </motion.div>
  );
};

// Update the TimelineItem component's card styling for better visibility against blue sky
const TimelineItem: React.FC<TimelineItemProps & { nodeIndex: number }> = ({
  event,
  isLeft,
  nodeIndex,
}) => {
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
        {/* Motion div for the card animation with improved color scheme */}
        <motion.div
          className={`relative p-4 md:p-5 rounded-lg shadow-xl border-2 border-purple-600/50 
          bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md 
          ${isLeft ? "mr-4 md:mr-8" : "ml-4 md:ml-8"}`}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Card Content with enhanced readability */}
          <h3 className="text-lg md:text-xl mb-1 font-major-mono text-amber-300 drop-shadow-sm">
            {title}
          </h3>
          <div className="pt-2 border-t border-purple-400/30">
            <p className="text-sm text-amber-50 font-bytesize mb-2 leading-relaxed">
              {description}
            </p>
            <time className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white font-silkscreen bg-purple-700/70 border border-purple-400/50 shadow-inner">
              {time}
            </time>
          </div>
          {/* Decorative Flying Object with nodeIndex */}
          <FlyingObject isLeft={isLeft} nodeIndex={nodeIndex} />
        </motion.div>
      </div>

      {/* Node on the Timeline (Centred) with warmer accent color */}
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2 mt-4 md:mt-5 z-10"
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
        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-400 to-purple-600 rounded-full flex items-center justify-center shadow-md border-2 border-white/70">
          <EventIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineItem;
