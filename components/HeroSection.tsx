"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tilt } from "react-tilt";

// Define the prop type
interface HeroSectionProps {
  showLogo?: boolean; // Controls visibility of the large hero logo
}

// Define satellite positions - simplified with correct paths
const satellites = [
  {
    id: 1,
    image: "/s2n.png", // Using the correct image paths
    initialX: 10,
    initialY: 8,
    size: "w-16 h-16 md:w-20 md:h-20",
    rotation: "5deg",
    scrollFactor: 0.8,
    index: 0,
  },
  {
    id: 2,
    image: "/s1n.png",
    initialX: 5,
    initialY: 60,
    size: "w-16 h-16 md:w-20 md:h-20",
    rotation: "-10deg",
    scrollFactor: 1.2,
    index: 1,
  },
  {
    id: 3,
    image: "/s1n.png",
    initialX: 85,
    initialY: 25,
    size: "w-16 h-16 md:w-20 md:h-20",
    rotation: "15deg",
    scrollFactor: 1.0,
    index: 2,
  },
  {
    id: 4,
    image: "/s2n.png",
    initialX: 80,
    initialY: 70,
    size: "w-16 h-16 md:w-20 md:h-20",
    rotation: "-5deg",
    scrollFactor: 0.9,
    index: 3,
  },
  {
    id: 5,
    image: "/s3n.png",
    initialX: 50,
    initialY: 40,
    size: "w-20 h-20 md:w-20 md:h-20",
    rotation: "-5deg",
    scrollFactor: 0.9,
    index: 4,
  },
];

const HeroSection: React.FC<HeroSectionProps> = ({ showLogo = true }) => {
  // State to track which satellite is hovered
  const [hoveredSat, setHoveredSat] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Detect scroll position for satellite animation
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fixed react-tilt options
  const tiltOptions = {
    reverse: false,
    max: 15,
    perspective: 1000,
    scale: 1.05,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  return (
    <>
      <section
        id="hero"
        className="hero-section relative z-10 flex min-h-screen w-full items-center justify-center px-6 py-24 md:px-12 lg:px-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, #000000 0%, #05051a 50%, #0a0b25 80%, #0c1445 100%)",
        }}
      >
        {/* Stars background */}
        <div className="absolute inset-0 z-0 opacity-70">
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          <div className="stars-large"></div>
        </div>

        {/* Satellites that move up with scroll - FIXED POSITIONING */}
        {satellites.map((satellite) => {
          // Calculate new Y position based on scroll
          const newY = Math.max(
            0,
            satellite.initialY - (scrollY * satellite.scrollFactor) / 4
          );

          return (
            <div
              key={satellite.id}
              className={`absolute ${satellite.size}  opacity-40 cursor-pointer`}
              style={{
                left: `${satellite.initialX}%`,
                top: `${newY}%`,
                transition: "top 0.3s ease",
                transform: `rotate(${satellite.rotation})`,
              }}
              onMouseEnter={() => setHoveredSat(satellite.index)}
              onMouseLeave={() => setHoveredSat(null)}
            >
              <Image
                src={satellite.image}
                alt={`Satellite ${satellite.id}`}
                width={100}
                height={100}
                className={`w-full h-full object-contain transition-transform scale-150 ${
                  hoveredSat === satellite.index ? "scale-200" : ""
                }`}
              />
            </div>
          );
        })}

        {/* Make the container taller to add more space for content */}
        <div className="container mx-auto flex flex-col items-center gap-12 text-center lg:flex-row lg:text-left pb-32">
          {/* Left Column: Text Content & Buttons */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-6">
            <header className="w-full flex justify-center lg:justify-start py-6">
              <h1 className="text-4xl md:text-6xl font-major-mono text-white font-bold tracking-wider animate-fadeIn">
                <span className="text-[#ff00c0]">Brin</span>
                <span className="text-[#26bffd]">HAck</span>-2025
              </h1>
            </header>

            {/* Updated the font class for the tagline */}
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-['Press_Start_2P'] leading-tight animate-fadeIn"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              Innovate Beyond <br className="hidden md:block" /> Boundaries
            </h2>

            {/* For the paragraph text, use Silkscreen as Bytesized font */}
            <p
              className="text-md md:text-lg text-gray-300 max-w-md lg:max-w-none animate-fadeIn animation-delay-300"
              style={{ fontFamily: "'Silkscreen', monospace" }}
            >
              Join Brinhack 2025, the{" "}
              <span
                className="text-lg md:text-xl text-amber-400  font-['Press_Start_2P'] inline-block relative cursor-pointer 
                hover:text-[#26bffd] transition-colors duration-100
                hover:animate-pulse
                before:content-['✦'] before:absolute before:-left-2 before:opacity-0 before:hover:opacity-100
                after:content-['✦'] after:absolute after:-right-2 after:opacity-0 after:hover:opacity-100
                group"
              >
                FREE
              </span>{" "}
              premier{" "}
              <span className=" text-emerald-500 text-lg">
                Beginer Friendly
              </span>{" "}
              hackathon where creativity meets technology. Push the limits and
              build the future.
              <br />
              <Link
                href="#about-section"
                className="text-purple-400 hover:text-purple-300 relative ml-1
                after:content-[''] after:absolute after:w-full after:h-[2px] 
                after:bg-purple-300 after:bottom-0 after:left-0
                after:scale-x-0 hover:after:scale-x-100
                after:transition-transform after:duration-300
                after:origin-left"
              >
                Know More
              </Link>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fadeIn animation-delay-600 mb-10">
              {/* For the button text - Adding Link and href */}
              <Button
                asChild
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-[#ff00c0] to-[#26bffd] hover:from-[#b700ff] hover:to-[#00a2ff] 
                text-gray-800 border-2 border-transparent hover:border-[#ff00c0] shadow-[0_0_15px_rgba(255,0,192,0.5)]
                hover:shadow-[0_0_20px_rgba(38,191,253,0.7)] transition-all duration-300 
                px-8 py-4 tracking-wider"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfdxUBGSlcTmYMI6oRXT5PmTjvyH8nFTjWBY-VbYYzVUkKQmg/viewform?usp=header"
                  target="_blank"
                >
                  &gt; Register_Now! 🚀
                </Link>
              </Button>
              <Button
                asChild
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-[#26bffd] to-[#ff00c0] hover:from-[#00a2ff] hover:to-[#b700ff]
                text-gray-800 border-2 border-transparent hover:border-[#26bffd] shadow-[0_0_15px_rgba(38,191,253,0.5)]
                hover:shadow-[0_0_20px_rgba(255,0,192,0.7)] transition-all duration-300
                px-8 py-4 tracking-wider"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                <Link
                  href="https://drive.google.com/file/d/1uh6kjjQDC5Dz8wih9ilP8B1WTNiTLmEA/view?usp=sharing"
                  target="_blank"
                >
                  &gt; Brochure.exe 📡
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Logo with conditional visibility and fixed Tilt component */}
          <div className="w-full lg:w-1/2 flex items-center justify-center mt-10 lg:mt-0">
            {/* Make sure Tilt is pro</Link>perly wrapped */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                showLogo
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90 pointer-events-none"
              }`}
            >
              <Tilt
                options={tiltOptions}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  id="hero-logo"
                  className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] flex items-center justify-center animate-fadeIn animation-delay-900"
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* Much larger Brinhack Logo */}
                  <Image
                    src="/logo.png"
                    alt="Brinhack Logo"
                    width={400}
                    height={400}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
              </Tilt>
            </div>
          </div>
        </div>

        {/* Move transition elements to absolute bottom with higher z-index */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 z-20"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, #0c1445 50%, transparent 100%)",
            clipPath: "ellipse(70% 100% at 50% 100%)",
          }}
        ></div>

        <div
          className="section-transition-mask hero-tracks-mask absolute bottom-0 left-0 right-0"
          aria-hidden="true"
          style={{ height: "180px", bottom: "-90px" }}
        ></div>
      </section>
    </>
  );
};

export default HeroSection;
