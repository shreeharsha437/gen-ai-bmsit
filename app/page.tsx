"use client"; // Add 'use client' at the top because we're using hooks (useState, useEffect)

import React, { useState, useEffect } from "react";
// Note: This has a typo, but keeping as is
import HeroSection from "@/components/HeroSection";
import FloatingNavbar from "@/components/FloatingNavbar";
import TracksSection from "@/components/TrackSection"; // Import the Tracks section

export default function Home() {
  const [showNavbarLogo, setShowNavbarLogo] = useState(false);

  // Scroll threshold (e.g., when scrolled down 80% of the viewport height)
  const SCROLL_THRESHOLD =
    typeof window !== "undefined" ? window.innerHeight * 0.8 : 600;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setShowNavbarLogo(true);
      } else {
        setShowNavbarLogo(false);
      }
    };

    // Add listener
    window.addEventListener("scroll", handleScroll);

    // Initial check in case the page loads already scrolled down
    handleScroll();

    // Cleanup listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [SCROLL_THRESHOLD]); // Re-run effect if threshold calculation changes (though it's constant here)

  return (
    <main className="relative min-h-screen">
      {/* Background with stars and gradient */}
      {/* Pass the state down as a prop */}
      <FloatingNavbar showLogo={showNavbarLogo} />
      {/* Hero Section - takes full viewport height */}
      <HeroSection showLogo={!showNavbarLogo} />{" "}
      {/* Hero logo shows when navbar logo *doesn't* */}
      {/* Tracks Section */}
      <TracksSection />
      {/* Other sections will be added below here */}
      <div className="h-screen bg-purple-900/30 w-full z-10 flex items-center justify-center">
        {/* Keep this temporarily for scrolling */}
        <h2 className="text-4xl text-white font-[var(--font-major-mono)]">
          Timeline Section Placeholder
        </h2>
      </div>
      <div
        id="about-section"
        className="h-screen bg-green-900/30 w-full z-10 flex items-center justify-center"
      >
        {/* Keep this temporarily for scrolling */}
        <h2 className="text-4xl text-white font-[var(--font-major-mono)]">
          About Section Placeholder
        </h2>
      </div>
    </main>
  );
}
