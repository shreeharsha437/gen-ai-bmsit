"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BuildingComponent, { tierColors } from "./BuildingComponent";

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

const SponsorsSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsMobile(window.innerWidth < 640);

    // Add resize listener
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const groupedSponsors = groupSponsorsByTier(sponsorData);

  // Define order for display
  const tierOrder: Sponsor["tier"][] = ["gold", "silver", "bronze", "micro"];

  // Generate positions for left and right sides based on the grouped sponsors
  const leftSideSponsors = [
    ...(groupedSponsors[tierOrder[0]] || []),
    ...(groupedSponsors[tierOrder[1]] || []),
  ];

  const rightSideSponsors = [
    ...(groupedSponsors[tierOrder[2]] || []),
    ...(groupedSponsors[tierOrder[3]] || []),
  ];

  return (
    <section
      id="sponsors-section"
      className="relative z-10 w-full py-28 sm:py-36 md:py-48 lg:py-64 px-2 sm:px-4 md:px-6 overflow-hidden"
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

      {/* Birds flying across the sky AND over buildings - adjusted for mobile */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* Birds flying across the scene */}
        <Bird
          position="top-[10%] sm:top-[15%] left-[20%]"
          delay={2}
          size="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6"
          birdType="bird1"
        />
        <Bird
          position="top-[15%] sm:top-[18%] left-[35%]"
          delay={0}
          size="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5"
          birdType="bird2"
        />
        <Bird
          position="top-[12%] sm:top-[20%] right-[30%]"
          delay={3.5}
          size="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6"
          birdType="bird1"
        />
        <Bird
          position="top-[18%] sm:top-[25%] right-[20%]"
          delay={1.2}
          size="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5"
          birdType="bird2"
        />

        {/* Birds flying over buildings (positioned lower) */}
        <Bird
          position="top-[55%] sm:top-[65%] left-[30%]"
          delay={4.8}
          size="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6"
          birdType="bird1"
        />
        <Bird
          position="top-[50%] sm:top-[60%] right-[25%]"
          delay={2.5}
          size="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5"
          birdType="bird2"
        />
        <Bird
          position="top-[60%] sm:top-[70%] left-[15%]"
          delay={1.8}
          size="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5"
          birdType="bird2"
        />
        <Bird
          position="top-[45%] sm:top-[55%] right-[35%]"
          delay={3.2}
          size="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6"
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

      {/* Buildings layout with improved spacing for mobile */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] sm:h-[250px] md:h-[320px] lg:h-[400px] z-20">
        {/* Left side buildings - keep all but with adjusted spacing */}
        <div className="absolute bottom-0 left-1 sm:left-2 md:left-4 lg:left-8 flex items-end space-x-1 xs:space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5">
          {leftSideSponsors.map((sponsor, _index) => (
            <BuildingComponent
              key={sponsor.id}
              sponsor={sponsor}
              position="mb-0"
            />
          ))}
        </div>

        {/* Right side buildings - keep all but with adjusted spacing */}
        <div className="absolute bottom-0 right-1 sm:right-2 md:right-4 lg:right-8 flex items-end space-x-1 xs:space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5">
          {rightSideSponsors.map((sponsor, _index) => (
            <BuildingComponent
              key={sponsor.id}
              sponsor={sponsor}
              position="mb-0"
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
