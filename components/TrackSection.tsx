"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// Tracks data remains the same
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

// Background cloud data - small decorative clouds with no text
const backgroundClouds = [
  { size: "tiny", cloudType: "c1n", opacity: 0.2, delay: "0s" },
  { size: "tiny", cloudType: "c2n", opacity: 0.15, delay: "2.5s" },
  { size: "tiny", cloudType: "c3n", opacity: 0.25, delay: "1.5s" },
  { size: "tiny", cloudType: "c1n", opacity: 0.3, delay: "3s" },
  { size: "tiny", cloudType: "c2n", opacity: 0.2, delay: "0.7s" },
  { size: "tiny", cloudType: "c1n", opacity: 0.18, delay: "4s" },
  { size: "tiny", cloudType: "c3n", opacity: 0.15, delay: "2s" },
  { size: "tiny", cloudType: "c2n", opacity: 0.22, delay: "1s" },
  { size: "tiny", cloudType: "c3n", opacity: 0.28, delay: "3.5s" },
  { size: "tiny", cloudType: "c1n", opacity: 0.17, delay: "1.2s" },
];

// Enhanced Cloud component with options for background clouds
const Cloud: React.FC<{
  trackName?: string;
  size: "tiny" | "small" | "medium" | "large";
  zIndex: number;
  cloudType: string;
  layer: "top" | "bottom" | "background";
  hoverDelay: string;
  horizontalPos: string;
  verticalPos: string;
  wiggleIntensity?: "gentle" | "medium" | "intense";
  opacity?: number;
}> = ({
  trackName,
  size,
  zIndex,
  cloudType,
  layer,
  hoverDelay,
  horizontalPos,
  verticalPos,
  wiggleIntensity = "medium",
  opacity = 1,
}) => {
  // Size classes now more differentiated
  const sizeClasses = {
    tiny: "w-12 h-8 md:w-16 md:h-12", // Tiny (for background clouds)
    small: "w-24 h-18 md:w-32 md:h-24", // Small
    medium: "w-36 h-28 md:w-48 md:h-36", // Medium
    large: "w-48 h-36 md:w-64 md:h-48", // Large
  };

  // Determine font size based on cloud size
  const fontSizeClass = {
    tiny: "text-xs",
    small: "text-xs md:text-xs",
    medium: "text-xs md:text-sm",
    large: "text-sm md:text-base",
  };

  // Choose the appropriate animation class based on wiggle intensity
  const wiggleClass = {
    gentle: "cloud-float-gentle",
    medium: "cloud-float-medium",
    intense: "cloud-float-intense",
  };

  return (
    <div
      className={`absolute ${wiggleClass[wiggleIntensity]} transition-all duration-500`}
      style={{
        left: horizontalPos,
        top: verticalPos,
        zIndex: zIndex,
        animationDelay: hoverDelay,
        opacity: opacity,
      }}
    >
      {/* Cloud Container with enhanced hover effects */}
      <div
        className={`${sizeClasses[size]} relative ${
          trackName ? "group cursor-pointer hover:scale-110" : ""
        } transition-transform duration-500`}
      >
        {/* Cloud SVG Background */}
        <Image
          src={`/${cloudType}.svg`}
          alt={trackName || "Background cloud"}
          fill
          className="object-contain"
          priority={layer === "top"}
        />

        {/* Track Text Overlay - Only for main track clouds */}
        {trackName && (
          <div className="absolute inset-x-0 -bottom-1 md:bottom-3 flex justify-center">
            <span
              className={`
                text-center 
                ${fontSizeClass[size]} 
                font-bold 
                text-white 
                font-silkscreen 
                px-3 py-1 
                bg-purple-900/70 
                backdrop-blur-sm 
                rounded-full 
                shadow-md 
                border-2
                border-white/30
                group-hover:bg-purple-800/80
                group-hover:scale-110 
                group-hover:border-white/50
                transition-all 
                duration-300
                translate-y-1/2
              `}
            >
              {trackName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const TracksSection: React.FC = () => {
  // State for cloud positions
  const [cloudPositions, setCloudPositions] = useState<{
    top: Array<{
      horizontalPos: string;
      verticalPos: string;
      wiggleIntensity: "gentle" | "medium" | "intense";
    }>;
    bottom: Array<{
      horizontalPos: string;
      verticalPos: string;
      wiggleIntensity: "gentle" | "medium" | "intense";
    }>;
    background: Array<{
      horizontalPos: string;
      verticalPos: string;
      wiggleIntensity: "gentle" | "medium" | "intense";
    }>;
  }>({
    top: [],
    bottom: [],
    background: [],
  });

  // Improved position generation with better spacing
  useEffect(() => {
    const generatePositions = () => {
      const topLayer = [
        // IoT (Large) - Top Left - More pronounced wiggle
        {
          horizontalPos: "15%",
          verticalPos: "5%", // Below title
          wiggleIntensity: "intense" as const,
        },
        // CyberSecurity (Medium) - Top Right - Medium wiggle
        {
          horizontalPos: "65%",
          verticalPos: "8%", // Below title
          wiggleIntensity: "medium" as const,
        },
        // Blockchain (Small) - Above Middle - Gentle wiggle
        {
          horizontalPos: "40%",
          verticalPos: "12%", // Below title
          wiggleIntensity: "gentle" as const,
        },
      ];

      const bottomLayer = [
        // Sustainability (Large) - Bottom Right - Medium wiggle
        {
          horizontalPos: "67%",
          verticalPos: "40%", // Adjusted to fit better in the visible area
          wiggleIntensity: "medium" as const,
        },
        // Open Innovation (Medium) - Bottom Left - Intense wiggle
        {
          horizontalPos: "20%",
          verticalPos: "48%", // Adjusted to fit better in the visible area
          wiggleIntensity: "intense" as const,
        },
      ];

      // Generate random positions for background clouds
      // All positioned below the title (min 15% from top)
      const backgroundLayer = backgroundClouds.map(() => {
        return {
          horizontalPos: `${Math.floor(Math.random() * 85 + 3)}%`, // 5-90% horizontal
          verticalPos: `${Math.floor(Math.random() * 65 + 20)}%`, // 15-80% vertical (below title)
          wiggleIntensity: ["gentle", "medium"][
            Math.floor(Math.random() * 2)
          ] as "gentle" | "medium", // Gentler motion for background clouds
        };
      });

      setCloudPositions({
        top: topLayer,
        bottom: bottomLayer,
        background: backgroundLayer,
      });
    };

    generatePositions();
  }, []);

  return (
    // Updated the id to "tracks" to match the navbar anchor exactly
    <section
      id="tracks"
      className="tracks-section w-full py-20 md:py-32 overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Smooth transition from hero section - create curve at top */}
      <div className="section-transition-top" />

      {/* Transition mask for smoother blending */}
      <div
        className="section-transition-mask tracks-hero-mask"
        aria-hidden="true"
      />

      {/* Fog overlay - place below the section-transition but above stars */}
      <div className="fog-overlay" />

      {/* Vapor mist effect to enhance atmosphere */}
      <div className="vapor-mist" />

      {/* Stars/particles for the cloud section - reduced opacity */}
      <div className="absolute inset-0 opacity-15 z-0">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>
      </div>

      {/* Background decorative clouds */}
      {cloudPositions.background.length > 0 &&
        backgroundClouds.map((cloud, index) => {
          const position = cloudPositions.background[index];
          if (!position) return null;

          return (
            <Cloud
              key={`bg-cloud-${index}`}
              size={cloud.size as "tiny" | "small" | "medium" | "large"}
              zIndex={4} // Increased z-index to be above stars
              cloudType={cloud.cloudType}
              layer="background"
              hoverDelay={cloud.delay}
              horizontalPos={position.horizontalPos}
              verticalPos={position.verticalPos}
              wiggleIntensity={position.wiggleIntensity}
              opacity={cloud.opacity}
            />
          );
        })}

      {/* Center everything */}
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Section Heading - centered with increased bottom margin */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-16 md:mb-20 font-major-mono">
          Tracks & Themes
        </h2>

        {/* Cloud Container - Now clouds are guaranteed to be below title */}
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
                    wiggleIntensity={position.wiggleIntensity}
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
                    zIndex={15} // Bottom layer - increased from 10 to stand out from background
                    cloudType={track.cloudType}
                    layer="bottom"
                    hoverDelay={track.hoverDelay}
                    horizontalPos={position.horizontalPos}
                    verticalPos={position.verticalPos}
                    wiggleIntensity={position.wiggleIntensity}
                  />
                );
              })}
        </div>

        {/* Date button - centered */}
        <div className="mt-12 z-30 relative">
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
