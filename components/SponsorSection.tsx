"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Code,
  Coffee,
  Search,
  Presentation,
  Award,
  Trophy,
  Star,
  LucideIcon,
} from "lucide-react";

// Define Sponsor interface
interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  tier: "gold" | "silver" | "bronze" | "micro";
}

// Example Sponsor Data
const sponsorData: Sponsor[] = [
  {
    id: "g1",
    name: "SOON",
    logoUrl: "/sponsors/placeholder-logo-gold.png",
    websiteUrl: "#",
    tier: "gold",
  },
  {
    id: "g2",
    name: "SOON",
    logoUrl: "/sponsors/placeholder-logo-gold.png",
    websiteUrl: "#",
    tier: "gold",
  },
  {
    id: "s1",
    name: "SOON",
    logoUrl: "/sponsors/placeholder-logo-silver.png",
    websiteUrl: "#",
    tier: "silver",
  },
  {
    id: "s2",
    name: "SOON",
    logoUrl: "/sponsors/placeholder-logo-silver.png",
    websiteUrl: "#",
    tier: "silver",
  },
  {
    id: "b1",
    name: "SOON",
    logoUrl: "/sponsors/placeholder-logo-bronze.png",
    websiteUrl: "#",
    tier: "bronze",
  },
  {
    id: "m1",
    name: "SOON",
    logoUrl: "/sponsors/placeholder-logo-micro.png",
    websiteUrl: "#",
    tier: "micro",
  },
  {
    id: "m2",
    name: "SOON",
    logoUrl: "/sponsors/placeholder-logo-micro.png",
    tier: "micro",
  },
];

// Helper to group sponsors by tier
const groupSponsorsByTier = (sponsors: Sponsor[]) => {
  return sponsors.reduce((acc, sponsor) => {
    (acc[sponsor.tier] = acc[sponsor.tier] || []).push(sponsor);
    return acc;
  }, {} as Record<Sponsor["tier"], Sponsor[]>);
};

// Bird component update - fix image path
const Bird: React.FC<{
  position: string;
  delay: number;
  size: string;
  birdType: string;
}> = ({ position, delay, size, birdType }) => {
  return (
    <motion.div
      className={`absolute ${position} ${size}`}
      initial={{ x: -100, y: 50, opacity: 0 }}
      animate={{
        x: 100,
        y: -30,
        opacity: [0, 1, 1, 0.7, 0],
        scale: [0.8, 1, 1, 0.9, 0.7],
      }}
      transition={{
        duration: 15,
        delay: delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: Math.random() * 10 + 5,
      }}
    >
      <Image
        src={`/${birdType}.png`} // Fixed image path
        alt="Bird"
        width={birdType === "bird1" ? 32 : 24}
        height={birdType === "bird1" ? 24 : 16}
        className="filter drop-shadow-md"
        priority
      />
    </motion.div>
  );
};

// Map tiers to icon types with more appropriate icons
const tierIcons: Record<string, LucideIcon> = {
  gold: Trophy,
  silver: Award,
  bronze: Star,
  micro: Coffee,
};

// Building colors based on tier
const tierColors = {
  gold: {
    building: "from-amber-900 via-amber-800 to-amber-700",
    accent: "border-yellow-400",
    windows: "bg-yellow-400/50",
    text: "text-yellow-500",
    billboard: "bg-slate-900/90 border-yellow-400",
  },
  silver: {
    building: "from-slate-700 via-slate-600 to-slate-500",
    accent: "border-slate-300",
    windows: "bg-blue-300/40",
    text: "text-gray-400",
    billboard: "bg-slate-800/90 border-slate-300",
  },
  bronze: {
    building: "from-stone-800 via-stone-700 to-stone-600",
    accent: "border-amber-600",
    windows: "bg-amber-600/30",
    text: "text-amber-800",
    billboard: "bg-slate-800/90 border-amber-600",
  },
  micro: {
    building: "from-slate-900 via-slate-800 to-slate-700",
    accent: "border-slate-500",
    windows: "bg-slate-400/30",
    text: "text-blue-200",
    billboard: "bg-slate-900/90 border-slate-500",
  },
};

// Enhanced BuildingComponent with fixed TypeScript issues
const BuildingComponent: React.FC<{ sponsor: Sponsor; position?: string }> = ({
  sponsor,
  position = "",
}) => {
  // Updated building sizes with better mobile scaling
  const tierSizes = {
    gold: {
      building: "w-22 md:w-28 lg:w-40 h-48 sm:h-64 md:h-72 lg:h-96", // Smaller on mobile
      billboard: "w-20 md:w-26 lg:w-36 h-16 sm:h-20 md:h-24 lg:h-32",
      textSize: "text-xs sm:text-sm md:text-base font-bold",
      windowsGrid: "grid-cols-3",
      floors: 8,
      antenna: true,
      logoSize: 48, // Smaller logo on mobile
    },
    silver: {
      building: "w-18 md:w-22 lg:w-32 h-40 sm:h-48 md:h-56 lg:h-72",
      billboard: "w-16 md:w-20 lg:w-28 h-14 sm:h-16 md:h-20 lg:h-26",
      textSize: "text-[10px] sm:text-xs md:text-sm",
      windowsGrid: "grid-cols-2",
      floors: 6,
      antenna: true,
      logoSize: 40,
    },
    bronze: {
      building: "w-16 md:w-18 lg:w-24 h-36 sm:h-40 md:h-44 lg:h-60",
      billboard: "w-14 md:w-16 lg:w-22 h-12 sm:h-14 md:h-16 lg:h-22",
      textSize: "text-[8px] sm:text-[10px] md:text-xs",
      windowsGrid: "grid-cols-2",
      floors: 5,
      antenna: false,
      logoSize: 32,
    },
    micro: {
      building: "w-12 md:w-14 lg:w-20 h-28 sm:h-32 md:h-36 lg:h-48",
      billboard: "w-10 md:w-12 lg:w-18 h-10 sm:h-12 md:h-12 lg:h-16",
      textSize: "text-[8px] md:text-[10px]",
      windowsGrid: "grid-cols-2",
      floors: 4,
      antenna: false,
      logoSize: 28,
    },
  };

  // Building accent features
  const buildingStyle = tierColors[sponsor.tier];
  const hasSpire = sponsor.tier === "gold";
  const hasSatellite = sponsor.tier === "gold" || sponsor.tier === "silver";
  const floors = tierSizes[sponsor.tier].floors;

  // Fix TypeScript issue by defining proper types for window colors
  type WindowColorType = "yellow" | "blue" | "gray";

  // Window color patterns to create variety with type safety
  const windowColors: Record<WindowColorType, string> = {
    yellow: "bg-yellow-400/70 border-yellow-500",
    blue: "bg-blue-400/70 border-blue-500",
    gray: "bg-gray-300/70 border-gray-400",
  };

  // Generate window patterns for each floor with different colors
  const floorPatterns = useMemo(() => {
    return [...Array(floors)].map(() => {
      const colorPattern =
        Math.random() > 0.7
          ? ("yellow" as WindowColorType)
          : Math.random() > 0.5
          ? ("blue" as WindowColorType)
          : ("gray" as WindowColorType);

      return {
        color: colorPattern,
        pattern: [...Array(sponsor.tier === "micro" ? 2 : 3)].map(
          () => Math.random() > 0.3
        ),
      };
    });
  }, [floors, sponsor.tier]);

  return (
    <div className={`relative ${tierSizes[sponsor.tier].building} ${position}`}>
      {/* Main building structure with border and details */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${buildingStyle.building} rounded-t-sm
                    border-t-2 border-x-2 ${buildingStyle.accent} shadow-lg`}
      >
        {/* Architectural details on top */}
        {hasSpire && (
          <>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-1.5 h-8 bg-slate-300"></div>
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </>
        )}

        {hasSatellite && (
          <div className="absolute -top-6 right-2 w-4 h-6 rotate-45">
            <div className="absolute w-3 h-0.5 bg-slate-300"></div>
            <div className="absolute top-0 w-0.5 h-6 bg-slate-400"></div>
            <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-slate-300 border border-slate-400"></div>
          </div>
        )}

        {/* Water tower (gold buildings only) */}
        {sponsor.tier === "gold" && (
          <div className="absolute -top-5 left-4 transform -translate-x-1/2">
            <div className="w-3 h-5 bg-slate-500 rounded-t-sm"></div>
            <div className="w-6 h-2.5 bg-slate-600 -mt-1 -ml-1.5 rounded-sm"></div>
            <div className="w-2 h-3 bg-slate-500 ml-0.5 -mt-0.5"></div>
          </div>
        )}

        {/* Building floors with enhanced rectangular windows */}
        {floorPatterns.map((floor, floorIndex) => (
          <div
            key={floorIndex}
            className={`absolute w-full h-[12%] border-b border-b-slate-700/50
                       ${floorIndex === 0 ? "bottom-0" : ""}`}
            style={{ bottom: `${floorIndex * 12}%` }}
          >
            {/* Windows for this floor - with larger rectangular shapes and colors */}
            <div className="flex justify-around items-center h-full px-1.5">
              {floor.pattern.map((isLit, i) => (
                <div
                  key={i}
                  className={`${
                    windowColors[floor.color]
                  } h-[70%] w-[28%] rounded-sm 
                            ${isLit ? "opacity-100" : "opacity-20"}
                            border-2 shadow-inner`}
                ></div>
              ))}
            </div>
          </div>
        ))}

        {/* Entrance at bottom (for taller buildings) */}
        {(sponsor.tier === "gold" || sponsor.tier === "silver") && (
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/4 h-[8%]
                        border-t border-l border-r border-slate-700/70 rounded-t-sm
                        bg-slate-900/50"
          ></div>
        )}
      </div>

      {/* Billboard with pixel-style border */}
      <motion.div
        className={`absolute -top-16 left-1/2 transform -translate-x-1/2 ${
          tierSizes[sponsor.tier].billboard
        } 
                   ${buildingStyle.billboard} border-2 border-dashed rounded-sm 
                   flex flex-col items-center justify-center px-3 overflow-hidden shadow-lg`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: Math.random() * 0.5 }}
      >
        {/* Pixel-style border effect */}
        <div
          className={`absolute inset-0 border-4 ${buildingStyle.accent} m-1 opacity-60 pointer-events-none`}
          style={{
            clipPath:
              "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 85%, 15% 85%, 15% 15%, 85% 15%, 85% 85%, 0% 85%)",
          }}
        />

        {/* Logo - Using QM logo for all sponsors */}
        <div className="relative mb-2 bg-white/10 rounded-md p-1 flex items-center justify-center">
          <Image
            src="/sponsors/qm.png"
            alt={sponsor.name}
            width={tierSizes[sponsor.tier].logoSize}
            height={tierSizes[sponsor.tier].logoSize}
            className="object-contain p-1"
            priority
            onError={(e) => {
              console.error(`Failed to load logo for ${sponsor.name}`);
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* Sponsor Name with red text using silkscreen font */}
        <p
          className={`${tierSizes[sponsor.tier].textSize} font-silkscreen ${
            buildingStyle.text
          } 
                      text-center leading-tight truncate max-w-full 
                      drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]`}
        >
          {sponsor.name}
        </p>
      </motion.div>
    </div>
  );
};

const SponsorsSection: React.FC = () => {
  const groupedSponsors = groupSponsorsByTier(sponsorData);

  // Define order for display
  const tierOrder: Sponsor["tier"][] = ["gold", "silver", "bronze", "micro"];

  // Generate positions for left and right sides
  const leftSideSponsors = [
    ...sponsorData.filter((s) => s.tier === "gold" || s.tier === "silver"),
  ];
  const rightSideSponsors = [
    ...sponsorData.filter((s) => s.tier === "bronze" || s.tier === "micro"),
  ];

  return (
    <section
      id="sponsors-section"
      className="relative z-10 w-full py-40 sm:py-48 md:py-58 lg:py-64 px-4 md:px-6 overflow-hidden" // Adjusted height responsively
    >
      {/* Improved gradient transition from previous section */}
      <div className="absolute inset-0">
        {/* Top gradient transition layer */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#fefefc] to-[#fefefc]/0 z-10"></div>

        {/* Main background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fefefc] via-[#e7e9ac] to-[#994e7b] -z-10"></div>
      </div>

      {/* Sun positioned at the top */}
      <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 -z-5">
        <Image
          src="/sun.png"
          alt="Sunset"
          width={220}
          height={220}
          className="animate-pulse opacity-90"
          priority
          onError={(e) => {
            console.error("Failed to load sun image");
            e.currentTarget.style.display = "none";
          }}
        />

        {/* Sun rays effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500/20 via-orange-500/30 to-red-500/20 blur-lg -z-1 scale-150"></div>
      </div>

      {/* Birds flying across the sky AND over buildings */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* Birds flying across the scene */}
        <Bird
          position="top-[15%] left-1/5"
          delay={2}
          size="w-6 h-6"
          birdType="bird1"
        />
        <Bird
          position="top-[18%] left-1/3"
          delay={0}
          size="w-5 h-5"
          birdType="bird2"
        />
        <Bird
          position="top-[20%] right-1/4"
          delay={3.5}
          size="w-6 h-6"
          birdType="bird1"
        />
        <Bird
          position="top-[25%] right-1/3"
          delay={1.2}
          size="w-5 h-5"
          birdType="bird2"
        />

        {/* Birds flying over buildings (positioned lower) */}
        <Bird
          position="top-[65%] left-1/4"
          delay={4.8}
          size="w-6 h-6"
          birdType="bird1"
        />
        <Bird
          position="top-[60%] right-1/5"
          delay={2.5}
          size="w-5 h-5"
          birdType="bird2"
        />
        <Bird
          position="top-[70%] left-1/6"
          delay={1.8}
          size="w-5 h-5"
          birdType="bird2"
        />
        <Bird
          position="top-[55%] right-2/5"
          delay={3.2}
          size="w-6 h-6"
          birdType="bird1"
        />
      </div>

      {/* Section heading with pixel-style billboard - positioned below sun with responsive margin */}
      <div className="container mx-auto text-center mt-24 sm:mt-28 md:mt-36 lg:mt-40 mb-16 sm:mb-20 md:mb-24 lg:mb-28 relative z-10">
        {/* Pixel-style neon billboard with pixelated border */}
        <div className="relative inline-block mx-auto">
          {/* Pixel-style outer border */}
          <div
            className="absolute inset-0 border-[8px] border-yellow-500 rounded-lg animate-pulse"
            style={{
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 90%, 5% 90%, 5% 10%, 95% 10%, 95% 90%, 0% 90%)",
            }}
          ></div>

          {/* Inner pixel border */}
          <div
            className="absolute inset-4 border-[4px] border-red-500 rounded-sm animate-pulse delay-300"
            style={{
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 85%, 10% 85%, 10% 15%, 90% 15%, 90% 85%, 0% 85%)",
            }}
          ></div>

          {/* Red neon text with silkscreen font */}
          <div className="bg-black/80 px-8 py-6 rounded-md border-2 border-gray-800 shadow-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-silkscreen text-red-500 animate-[pulse_2s_ease-in-out_infinite] drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]">
              Our Sponsors
            </h2>
            <p className="text-lg text-amber-200 mt-4 font-silkscreen tracking-tight drop-shadow">
              Powering innovation at Brinhack!
            </p>

            {/* Enhanced tubelight flicker effects */}
            <div className="absolute inset-x-2 top-0 h-1 bg-gradient-to-r from-red-500/0 via-red-500/80 to-red-500/0 animate-[glow_2s_ease-in-out_infinite]"></div>
            <div className="absolute inset-x-2 bottom-0 h-1 bg-gradient-to-r from-red-500/0 via-red-500/80 to-red-500/0 animate-[glow_2s_ease-in-out_infinite] delay-500"></div>
            <div className="absolute inset-y-2 left-0 w-1 bg-gradient-to-b from-red-500/0 via-red-500/80 to-red-500/0 animate-[glow_2.5s_ease-in-out_infinite] delay-300"></div>
            <div className="absolute inset-y-2 right-0 w-1 bg-gradient-to-b from-red-500/0 via-red-500/80 to-red-500/0 animate-[glow_2.5s_ease-in-out_infinite] delay-800"></div>
          </div>
        </div>
      </div>

      {/* Buildings layout with improved spacing and mobile-specific adjustments */}
      <div className="absolute bottom-0 left-0 right-0 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] z-20">
        {/* Left side buildings container with optimized spacing for mobile */}
        <div className="absolute bottom-0 left-1 sm:left-2 md:left-4 lg:left-8 flex items-end space-x-1 sm:space-x-1.5 md:space-x-2 lg:space-x-4">
          {leftSideSponsors.map((sponsor, index) => (
            <BuildingComponent
              key={sponsor.id}
              sponsor={sponsor}
              position="mb-0" // Always at bottom
            />
          ))}
        </div>

        {/* Right side buildings container with optimized spacing for mobile */}
        <div className="absolute bottom-0 right-1 sm:right-2 md:right-4 lg:right-8 flex items-end space-x-1 sm:space-x-1.5 md:space-x-2 lg:space-x-4">
          {rightSideSponsors.map((sponsor, index) => (
            <BuildingComponent
              key={sponsor.id}
              sponsor={sponsor}
              position="mb-0" // Always at bottom
            />
          ))}
        </div>
      </div>

      {/* Enhanced ground/base layer with more texture */}
      <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-7 md:h-8 z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900"></div>
        <div className="absolute inset-x-0 top-0 h-1 bg-slate-700"></div>
        <div className="absolute inset-0 bg-[url('/texture-dots.png')] bg-repeat opacity-10"></div>
      </div>

      {/* Optional subtle overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] z-0" />
    </section>
  );
};

export default SponsorsSection;
