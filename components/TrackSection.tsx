"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// Add this countdown timer component
const CountdownTimer: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-05-10T23:59:59");

    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        // Registration closed
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    const timer = setInterval(calculateTimeRemaining, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, []);

  // Format numbers to have leading zero if needed
  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="relative">
      {/* Cloud background */}
      <div className="relative w-48 h-36 sm:w-56 sm:h-44 md:w-64 md:h-48">
        <Image
          src="/c2n.svg"
          alt="Cloud timer background"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Timer content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h3
          className="text-[10px] sm:text-xs md:text-sm font-silkscreen text-white mb-1 sm:mb-2 
                      px-2 py-0.5 bg-purple-900/90 rounded-full border border-white/30"
        >
          TIME REMAINING TO REGISTER
        </h3>

        <div className="flex justify-center space-x-1 sm:space-x-2 mt-1">
          {/* Days */}
          <div className="flex flex-col items-center">
            <div
              className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-black/70 backdrop-blur-sm 
                          border border-blue-400/50 rounded-md flex items-center justify-center
                          text-[10px] sm:text-xs md:text-sm font-silkscreen text-blue-300 
                        "
            >
              {formatNumber(timeRemaining.days)}
            </div>
            <span className="text-[6px] sm:text-[8px] md:text-[10px] font-silkscreen text-black mt-0.5">
              DAYS
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div
              className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-black/70 backdrop-blur-sm 
                          border border-blue-400/50 rounded-md flex items-center justify-center
                          text-[10px] sm:text-xs md:text-sm font-silkscreen text-blue-300
                         delay-300"
            >
              : {formatNumber(timeRemaining.hours)}
            </div>
            <span className="text-[6px] sm:text-[8px] md:text-[10px] font-silkscreen text-black mt-0.5">
              HRS
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div
              className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-black/70 backdrop-blur-sm 
                          border border-blue-400/50 rounded-md flex items-center justify-center
                          text-[10px] sm:text-xs md:text-sm font-silkscreen text-blue-300
                         delay-500"
            >
              : {formatNumber(timeRemaining.minutes)}
            </div>
            <span className="text-[6px] sm:text-[8px] md:text-[10px] font-silkscreen text-black mt-0.5">
              MIN
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div
              className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-black/70 backdrop-blur-sm 
                          border border-blue-400/50 rounded-md flex items-center justify-center
                          text-[10px] sm:text-xs md:text-sm font-silkscreen text-blue-300
                         delay-700"
            >
              :{formatNumber(timeRemaining.seconds)}
            </div>
            <span className="text-[6px] sm:text-[8px] md:text-[10px] font-silkscreen text-black mt-0.5">
              SEC
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

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
              className={`text-center ${fontSizeClass[size]} font-bold text-white font-silkscreen px-1.5 sm:px-2 py-0.5 sm:py-1 bg-purple-900/90 backdrop-blur-sm rounded-full shadow-md border border-white/30 sm:border-2 group-hover:bg-purple-800/90 group-hover:scale-110 group-hover:border-white/50 transition-all duration-300 whitespace-normal max-w-[95%] text-ellipsis leading-tight`}
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

          {/* Add the countdown timer - positioned in the center below blockchain */}
          <div
            className={`absolute cloud-float-medium`}
            style={{
              left: isMobile ? "45%" : "40%",
              top: isMobile ? "75%" : "60%",
              zIndex: 18, // Between top and bottom layers
              animationDelay: "1.8s",
            }}
          >
            <CountdownTimer />
          </div>

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

        {/* Date button - centered with reduced bottom margin */}
        <div className="mt-4 sm:mt-6 md:mt-8 z-30 relative opacity-25">
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-colors duration-300 text-white rounded-full backdrop-blur-sm font-silkscreen border border-white/20 shadow-lg hover:shadow-xl text-xs sm:text-sm">
            💡[HINT] : Try Using ChatGPT for Ideas!
          </button>
        </div>

        {/* Add the gliding plane GIF with reduced top margin and increased width */}
        <div className="w-full flex justify-center items-center relative z-30 mb-0">
          <div
            className="relative cloud-float-intense w-[90%] md:w-[60%]" // 90% on mobile, 60% on medium screens and up
            style={{
              animationDelay: "0.5s",
              filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))",
            }}
          >
            <div className="w-full relative" style={{ aspectRatio: "4/3" }}>
              {/* Maintain aspect ratio */}
              <Image
                src="/popinfo.gif"
                alt="Plane gliding in clouds"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 75vw, 70vw" // Updated responsive size hints
                unoptimized={true} // Important: This ensures the GIF plays
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Smooth transition to next section - create curve at bottom */}
      <div className="section-transition-bottom" />
    </section>
  );
};

export { Cloud }; // Export Cloud directly
export default TracksSection; // Export TracksSection as default
