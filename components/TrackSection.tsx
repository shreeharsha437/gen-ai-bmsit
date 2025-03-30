"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// Tracks data remains the same
const tracks = [
  // TOP LAYER - 3 clouds above the date
  {
    name: "[IoT] - Internet of Things",
    size: "large",
    cloudType: "c1n",
    layer: "top",
    hoverDelay: "0s",
  },
  {
    name: "Cyber -Security",
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
  // Improved size classes with better mobile scaling - slightly smaller on mobile
  const sizeClasses = {
    tiny: "w-8 h-6 sm:w-10 sm:h-7 md:w-16 md:h-12", // Reduced size on mobile
    small: "w-16 h-12 sm:w-20 sm:h-16 md:w-32 md:h-24", // Reduced size on mobile
    medium: "w-24 h-18 sm:w-28 sm:h-22 md:w-48 md:h-36", // Reduced size on mobile
    large: "w-32 h-24 sm:w-36 sm:h-28 md:w-64 md:h-48", // Reduced size on mobile
  };

  // Enhanced font sizing for better readability on mobile - significantly smaller text
  const fontSizeClass = {
    tiny: "text-[8px] sm:text-[9px] md:text-xs",
    small: "text-[8px] sm:text-[9px] md:text-xs",
    medium: "text-[9px] sm:text-xs md:text-sm",
    large: "text-[10px] sm:text-xs md:text-base",
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

        {/* Track Text Overlay - Only for main track clouds - Repositioned below cloud */}
        {trackName && (
          <div className="absolute inset-x-0 -bottom-6 sm:-bottom-5 md:-bottom-2 flex justify-center">
            <span
              className={`
                text-center 
                ${fontSizeClass[size]} 
                font-bold 
                text-white 
                font-silkscreen 
                px-1.5 sm:px-2 py-0.5 sm:py-1 
                bg-purple-900/90
                backdrop-blur-sm 
                rounded-full 
                shadow-md 
                border
                border-white/30
                sm:border-2
                group-hover:bg-purple-800/90
                group-hover:scale-110 
                group-hover:border-white/50
                transition-all 
                duration-300
                whitespace-normal
                max-w-[95%]
                text-ellipsis
                leading-tight
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

  // Detect if we're on a mobile device
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check immediately
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Improved position generation with better spacing for mobile and desktop
  useEffect(() => {
    const generatePositions = () => {
      // Mobile-optimized positions
      const topLayerMobile = [
        // IoT (Large) - Top Left - More visible on mobile
        {
          horizontalPos: "8%",
          verticalPos: "5%",
          wiggleIntensity: "intense" as const,
        },
        // CyberSecurity (Medium) - Top Right - Better positioned for mobile
        {
          horizontalPos: "65%",
          verticalPos: "12%",
          wiggleIntensity: "medium" as const,
        },
        // Blockchain (Small) - Middle - Adjusted for mobile viewing
        {
          horizontalPos: "30%",
          verticalPos: "25%",
          wiggleIntensity: "gentle" as const,
        },
      ];

      const bottomLayerMobile = [
        // Sustainability (Large) - Bottom Right - Repositioned for mobile
        {
          horizontalPos: "60%",
          verticalPos: "45%",
          wiggleIntensity: "medium" as const,
        },
        // Open Innovation (Medium) - Bottom Left - Better visibility on mobile
        {
          horizontalPos: "15%",
          verticalPos: "55%",
          wiggleIntensity: "intense" as const,
        },
      ];

      // Desktop optimized positions (your original positions)
      const topLayerDesktop = [
        {
          horizontalPos: "15%",
          verticalPos: "5%",
          wiggleIntensity: "intense" as const,
        },
        {
          horizontalPos: "65%",
          verticalPos: "8%",
          wiggleIntensity: "medium" as const,
        },
        {
          horizontalPos: "40%",
          verticalPos: "12%",
          wiggleIntensity: "gentle" as const,
        },
      ];

      const bottomLayerDesktop = [
        {
          horizontalPos: "67%",
          verticalPos: "40%",
          wiggleIntensity: "medium" as const,
        },
        {
          horizontalPos: "20%",
          verticalPos: "48%",
          wiggleIntensity: "intense" as const,
        },
      ];

      // Choose positions based on device type
      const topLayer = isMobile ? topLayerMobile : topLayerDesktop;
      const bottomLayer = isMobile ? bottomLayerMobile : bottomLayerDesktop;

      // Generate random positions for background clouds
      // Different distribution for mobile vs desktop
      const backgroundLayer = backgroundClouds.map(() => {
        if (isMobile) {
          // Mobile - spread more vertically, less horizontally
          return {
            horizontalPos: `${Math.floor(Math.random() * 75 + 10)}%`, // 10-85% horizontal
            verticalPos: `${Math.floor(Math.random() * 75 + 15)}%`, // 15-90% vertical (more spread)
            wiggleIntensity: ["gentle", "medium"][
              Math.floor(Math.random() * 2)
            ] as "gentle" | "medium",
          };
        } else {
          // Desktop - your original distribution
          return {
            horizontalPos: `${Math.floor(Math.random() * 85 + 3)}%`, // 5-90% horizontal
            verticalPos: `${Math.floor(Math.random() * 65 + 20)}%`, // 15-80% vertical
            wiggleIntensity: ["gentle", "medium"][
              Math.floor(Math.random() * 2)
            ] as "gentle" | "medium",
          };
        }
      });

      setCloudPositions({
        top: topLayer,
        bottom: bottomLayer,
        background: backgroundLayer,
      });
    };

    generatePositions();
  }, [isMobile]); // Regenerate positions when mobile state changes

  return (
    // Updated the id to "tracks" to match the navbar anchor exactly
    <section
      id="tracks"
      className="tracks-section w-full py-16 sm:py-20 md:py-32 overflow-hidden"
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
      <div className="container mb-12 sm:mb-16 md:mb-20 mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Section Heading - centered with increased bottom margin */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-major-mono">
          Tracks & Themes
        </h2>
        <p className="text-base sm:text-lg text-purple-300 mt-3 sm:mt-4 max-w-2xl mx-auto font-silkscreen">
          Innovate, Collaborate, Elevate!
        </p>

        {/* Cloud Container - Now clouds are guaranteed to be below title */}
        <div
          className="relative w-full"
          style={{ minHeight: isMobile ? "60vh" : "70vh" }}
        >
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
        <div className="mt-8 sm:mt-10 md:mt-12 z-30 relative opacity-25">
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-colors duration-300 text-white rounded-full backdrop-blur-sm font-silkscreen border border-white/20 shadow-lg hover:shadow-xl text-xs sm:text-sm">
            💡[HINT] : Try Using ChatGPT for Ideas!
          </button>
        </div>
      </div>

      {/* Smooth transition to next section - create curve at bottom */}
      <div className="section-transition-bottom" />
    </section>
  );
};

export { Cloud }; // Export Cloud directly
export default TracksSection; // Export TracksSection as default
