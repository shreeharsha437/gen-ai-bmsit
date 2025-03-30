"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building, Building2, Home, Factory, BadgeHelp } from "lucide-react"; // Added BadgeHelp for empty slots

// Define Sponsor type (can also import if defined centrally)
interface Sponsor {
  /* ... same Sponsor interface ... */ id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  tier: "gold" | "silver" | "bronze" | "micro";
}

interface BuildingProps {
  sponsor: Sponsor;
}

// Mapping tier to building styles and icons
const buildingStyles = {
  gold: {
    height: "h-[450px] md:h-[550px] lg:h-[650px]", // Tallest
    width: "w-48 md:w-60 lg:w-72",
    color:
      "bg-gradient-to-t from-yellow-600 via-yellow-400 to-yellow-200 border-yellow-500",
    icon: Building2,
    billboardHeight: "h-24 md:h-32",
  },
  silver: {
    height: "h-[350px] md:h-[450px] lg:h-[500px]", // Medium
    width: "w-40 md:w-52 lg:w-64",
    color:
      "bg-gradient-to-t from-gray-500 via-gray-300 to-gray-100 border-gray-400",
    icon: Building,
    billboardHeight: "h-20 md:h-28",
  },
  bronze: {
    height: "h-[280px] md:h-[350px] lg:h-[400px]", // Shorter
    width: "w-36 md:w-48 lg:w-56",
    color:
      "bg-gradient-to-t from-orange-700 via-orange-500 to-orange-300 border-orange-600",
    icon: Factory,
    billboardHeight: "h-16 md:h-24",
  },
  micro: {
    height: "h-[180px] md:h-[220px] lg:h-[250px]", // Smallest
    width: "w-32 md:w-40 lg:w-48",
    color:
      "bg-gradient-to-t from-blue-600 via-blue-400 to-blue-200 border-blue-500",
    icon: Home,
    billboardHeight: "h-12 md:h-20",
  },
};

const BuildingComponent: React.FC<BuildingProps> = ({ sponsor }) => {
  const styles = buildingStyles[sponsor.tier];
  const isEmptySlot = !sponsor.logoUrl;

  const buildingVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: Math.random() * 0.4,
      },
    },
  };

  const renderBillboardContent = () => {
    if (isEmptySlot) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-2">
          <BadgeHelp className="w-6 h-6 md:w-8 md:h-8 text-gray-400 mb-1" />
          <span className="text-xs md:text-sm font-semibold text-gray-400">
            Sponsor Slot Available
          </span>
        </div>
      );
    }
    return (
      <Image
        src={sponsor.logoUrl}
        alt={`${sponsor.name} Logo`}
        fill // Use fill layout
        style={{ objectFit: "contain" }} // Scale logo while preserving aspect ratio
        className="p-2 md:p-3" // Add some padding around the logo
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Basic sizes attribute
      />
    );
  };

  const BuildingStructure = () => (
    <motion.div
      className={`relative ${styles.height} ${styles.width} ${styles.color} border-b-8 rounded-t-lg shadow-lg flex flex-col justify-between mx-auto overflow-hidden`}
      variants={buildingVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
    >
      {/* Building Top/Details */}
      <div className="p-2 flex justify-center items-start opacity-70">
        {/* <styles.icon className="w-6 h-6 text-black/50" /> */}
        {/* Add window patterns or other details */}
        <div className="grid grid-cols-3 gap-1 w-full px-2 mt-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-3 bg-black/20 rounded-sm"></div>
          ))}
        </div>
      </div>

      {/* Billboard Section */}
      <div
        className={`relative ${styles.billboardHeight} w-[85%] mx-auto mb-4 bg-gray-900/80 border-4 border-gray-500 rounded shadow-inner overflow-hidden`}
      >
        {renderBillboardContent()}
      </div>

      {/* Building Base */}
      <div></div>
    </motion.div>
  );

  // Wrap with link if websiteUrl exists and it's not an empty slot
  if (sponsor.websiteUrl && !isEmptySlot) {
    return (
      <a
        href={sponsor.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-transform hover:scale-105 duration-300"
      >
        <BuildingStructure />
      </a>
    );
  }

  // Otherwise, just render the building
  return <BuildingStructure />;
};

export default BuildingComponent;
