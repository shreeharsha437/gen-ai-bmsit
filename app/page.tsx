"use client"; // Add 'use client' at the top because we're using hooks (useState, useEffect)

import React, { useState, useEffect } from "react";

import HeroSection from "@/components/HeroSection";
import FloatingNavbar from "@/components/FloatingNavbar";
import TracksSection from "@/components/TrackSection"; // Keep your original import
import TimelineSection from "@/components/TimelineSection"; // Import the Timeline section
import SponsorsSection from "@/components/SponsorSection"; // Import the Sponsors section
import AboutSection from "@/components/AboutSection"; // Import the About section
import FooterImg from "@/components/FooterImg"; // Import the Footer image component

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
    <main className="relative flex flex-col items-center min-h-screen">
      {/* Pass the state down as a prop */}
      <FloatingNavbar showLogo={showNavbarLogo} />
      {/* Hero Section - takes full viewport height */}
      <HeroSection showLogo={!showNavbarLogo} />{" "}
      {/* Hero logo shows when navbar logo *doesn't* */}
      {/* Tracks Section */}
      <TracksSection />
      {/* Timeline Section */}
      <TimelineSection /> {/* Add Timeline Section here */}
      {/* Sponsors Section */}
      <SponsorsSection />
      {/* About Section - keep existing id for navigation */}
      <AboutSection />
      {/* Footer art */}
      <FooterImg />
    </main>
  );
}
