"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Define Sponsor interface
interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  tier: "gold" | "silver" | "bronze" | "micro";
}

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
  // Updated building sizes with better mobile scaling - properly sized for small screens
  const tierSizes = {
    gold: {
      building:
        "w-[65px] sm:w-[85px] md:w-[110px] lg:w-[140px] h-[130px] sm:h-[170px] md:h-[220px] lg:h-[280px]",
      billboard:
        "w-[55px] sm:w-[75px] md:w-[100px] lg:w-[130px] h-[45px] sm:h-[60px] md:h-[75px] lg:h-[90px]",
      textSize: "text-xs sm:text-sm md:text-base lg:text-lg font-bold",
      windowsGrid: "grid-cols-3",
      floors: 8,
      antenna: true,
      logoSize: 30, // Smaller logo on mobile
    },
    silver: {
      building:
        "w-[55px] sm:w-[70px] md:w-[90px] lg:w-[110px] h-[105px] sm:h-[135px] md:h-[175px] lg:h-[220px]",
      billboard:
        "w-[45px] sm:w-[60px] md:w-[80px] lg:w-[100px] h-[35px] sm:h-[45px] md:h-[60px] lg:h-[75px]",
      textSize: "text-[10px] sm:text-xs md:text-sm lg:text-base",
      windowsGrid: "grid-cols-2",
      floors: 6,
      antenna: true,
      logoSize: 24,
    },
    bronze: {
      building:
        "w-[45px] sm:w-[60px] md:w-[75px] lg:w-[90px] h-[85px] sm:h-[110px] md:h-[140px] lg:h-[180px]",
      billboard:
        "w-[40px] sm:w-[50px] md:w-[65px] lg:w-[80px] h-[30px] sm:h-[40px] md:h-[50px] lg:h-[65px]",
      textSize: "text-[8px] sm:text-[10px] md:text-xs lg:text-sm",
      windowsGrid: "grid-cols-2",
      floors: 5,
      antenna: false,
      logoSize: 20,
    },
    micro: {
      building:
        "w-[35px] sm:w-[45px] md:w-[60px] lg:w-[75px] h-[70px] sm:h-[90px] md:h-[115px] lg:h-[145px]",
      billboard:
        "w-[30px] sm:w-[40px] md:w-[50px] lg:w-[65px] h-[25px] sm:h-[32px] md:h-[40px] lg:h-[50px]",
      textSize: "text-[7px] sm:text-[9px] md:text-[11px] lg:text-xs",
      windowsGrid: "grid-cols-2",
      floors: 4,
      antenna: false,
      logoSize: 16,
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

      {/* Billboard with pixel-style border - improved text visibility */}
      <motion.div
        className={`absolute -top-[40%] sm:-top-[35%] md:-top-[30%] lg:-top-[25%] left-1/2 transform -translate-x-1/2 ${
          tierSizes[sponsor.tier].billboard
        } 
                   ${buildingStyle.billboard} border-2 border-dashed rounded-sm 
                   flex flex-col items-center justify-center px-2 sm:px-3 overflow-hidden shadow-lg`}
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
        <div className="relative mb-1 sm:mb-2 bg-white/10 rounded-md p-1 flex items-center justify-center">
          <Image
            src="/sponsors/qm.png"
            alt={sponsor.name}
            width={tierSizes[sponsor.tier].logoSize}
            height={tierSizes[sponsor.tier].logoSize}
            className="object-contain p-1"
            priority
          />
        </div>

        {/* Sponsor Name with BETTER dynamic text handling */}
        <p
          className={`font-silkscreen ${buildingStyle.text} 
                    text-center leading-tight px-1 w-full
                    drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]`}
          style={{
            fontSize:
              sponsor.tier === "gold"
                ? "clamp(9px, 1.5vw, 16px)"
                : sponsor.tier === "silver"
                ? "clamp(8px, 1.25vw, 14px)"
                : sponsor.tier === "bronze"
                ? "clamp(7px, 1vw, 12px)"
                : "clamp(6px, 0.8vw, 10px)",
            textShadow: "0 0 2px rgba(0,0,0,0.8)",
            wordBreak: "break-word",
            whiteSpace: "normal",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {sponsor.name}
        </p>
      </motion.div>
    </div>
  );
};

export { tierColors };
export default BuildingComponent;
