"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// Updated track data with new structure (without position properties)
const tracks = [
  // TOP LAYER - 3 clouds above the date
  {
    name: "Internet of Things (IoT)",
    size: "large",
    cloudType: "c1n",
    layer: "top",
    hoverDelay: "0s",
  },
  {
    name: "CyberSecurity",
    size: "medium",
    cloudType: "c2n",
    layer: "top",
    hoverDelay: "0.3s",
  },
  {
    name: "Blockchain",
    size: "large",
    cloudType: "c3n",
    layer: "top",
    hoverDelay: "0.6s",
  },

  // BOTTOM LAYER - 2 clouds below the date
  {
    name: "Sustainability",
    size: "large",
    cloudType: "c1n",
    layer: "bottom",
    hoverDelay: "0.9s",
  },
  {
    name: "Open Innovation",
    size: "medium",
    cloudType: "c2n",
    layer: "bottom",
    hoverDelay: "1.2s",
  },
];

// Simplified Cloud component without animation
const Cloud: React.FC<{
  trackName: string;
  size: "small" | "medium" | "large";
  zIndex: number;
  cloudType: string;
  layer: "top" | "bottom";
  hoverDelay: string;
  horizontalPos: string; // New prop for horizontal position
  verticalPos: string; // New prop for vertical position
}> = ({
  trackName,
  size,
  zIndex,
  cloudType,
  layer,
  hoverDelay,
  horizontalPos,
  verticalPos,
}) => {
  // Size classes now more differentiated
  const sizeClasses = {
    small: "w-24 h-18 md:w-32 md:h-24", // Small
    medium: "w-36 h-28 md:w-48 md:h-36", // Medium
    large: "w-48 h-36 md:w-64 md:h-48", // Large
  };

  // Determine font size based on cloud size
  const fontSizeClass = {
    small: "text-xs md:text-xs",
    medium: "text-xs md:text-sm",
    large: "text-sm md:text-base",
  };

  return (
    <div
      className="absolute hover-float transition-all duration-500"
      style={{
        left: horizontalPos,
        top: verticalPos,
        zIndex: zIndex,
        animationDelay: hoverDelay,
      }}
    >
      {/* Cloud Container with hover effects */}
      <div
        className={`${sizeClasses[size]} relative group cursor-pointer transition-transform duration-500 hover:scale-105`}
      >
        {/* Cloud SVG Background */}
        <Image
          src={`/${cloudType}.svg`}
          alt={`${trackName} Track`}
          fill
          className="object-contain"
          priority={layer === "top"}
        />

        {/* Track Text Overlay - CLOSER TO THE CLOUD */}
        <div className="absolute inset-x-0 -bottom-3 flex justify-center">
          <span
            className={`text-center ${fontSizeClass[size]} font-bold text-white font-silkscreen px-3 py-1 bg-purple-900/70 backdrop-blur-sm rounded-full shadow-md border border-white/20 group-hover:bg-purple-800/80 group-hover:scale-105 transition-all duration-300`}
          >
            {trackName}
          </span>
        </div>
      </div>
    </div>
  );
};

const TracksSection: React.FC = () => {
  // State for cloud positions (for better re-renders if needed)
  const [cloudPositions, setCloudPositions] = useState<any>({
    top: [],
    bottom: [],
  });

  // Improved position generation with better spacing
  useEffect(() => {
    // Updated position generation with better distribution
    const generatePositions = () => {
      const topLayer = [
        // IoT (Large) - Top Left
        {
          horizontalPos: "15%",
          verticalPos: "12%",
        },
        // CyberSecurity (Medium) - Top Right
        {
          horizontalPos: "65%",
          verticalPos: "18%",
        },
        // Blockchain (Small) - Above Middle
        {
          horizontalPos: "40%",
          verticalPos: "28%",
        },
      ];

      const bottomLayer = [
        // Sustainability (Large) - Bottom Right
        {
          horizontalPos: "67%",
          verticalPos: "65%",
        },
        // Open Innovation (Medium) - Bottom Left
        {
          horizontalPos: "20%",
          verticalPos: "72%",
        },
      ];

      setCloudPositions({
        top: topLayer,
        bottom: bottomLayer,
      });
    };

    generatePositions();
  }, []);

  return (
    <section
      id="tracks"
      className="tracks-section w-full py-20 md:py-32 overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Smooth transition from hero section - create curve at top */}
      <div className="section-transition-top" />

      {/* Stars/particles for the cloud section */}
      <div className="absolute inset-0 opacity-50 z-0">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>
      </div>

      {/* Center everything */}
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Section Heading - centered */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-16 md:mb-24 font-major-mono">
          Tracks & Themes
        </h2>

        {/* Cloud Container */}
        <div className="relative w-full" style={{ minHeight: "70vh" }}>
          {/* Render Top Layer Clouds */}
          {cloudPositions.top.length > 0 &&
            tracks
              .filter((t) => t.layer === "top")
              .map((track, index) => {
                const position = cloudPositions.top[index];
                return (
                  <Cloud
                    key={track.name}
                    trackName={track.name}
                    size={track.size as "small" | "medium" | "large"}
                    zIndex={20} // Top layer
                    cloudType={track.cloudType}
                    layer="top"
                    hoverDelay={track.hoverDelay}
                    horizontalPos={position.horizontalPos}
                    verticalPos={position.verticalPos}
                  />
                );
              })}

          {/* Render Bottom Layer Clouds */}
          {cloudPositions.bottom.length > 0 &&
            tracks
              .filter((t) => t.layer === "bottom")
              .map((track, index) => {
                const position = cloudPositions.bottom[index];
                return (
                  <Cloud
                    key={track.name}
                    trackName={track.name}
                    size={track.size as "small" | "medium" | "large"}
                    zIndex={10} // Bottom layer
                    cloudType={track.cloudType}
                    layer="bottom"
                    hoverDelay={track.hoverDelay}
                    horizontalPos={position.horizontalPos}
                    verticalPos={position.verticalPos}
                  />
                );
              })}
        </div>

        {/* Date button - centered */}
        <div className="mt-12 z-20 relative">
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-colors duration-300 text-white rounded-full backdrop-blur-sm font-silkscreen border border-white/20 shadow-lg hover:shadow-xl">
            May 10-11, 2025
          </button>
        </div>
      </div>

      {/* Smooth transition to next section - create curve at bottom */}
      <div className="section-transition-bottom" />
    </section>
  );
};

export default TracksSection;
