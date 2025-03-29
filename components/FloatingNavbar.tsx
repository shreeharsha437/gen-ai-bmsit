"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Define the prop type
interface FloatingNavbarProps {
  showLogo: boolean; // Controls visibility of the small navbar logo
}

// Define navigation items
const navItems = [
  { name: "Schedule", href: "#schedule-section", external: false },
  { name: "Sponsors", href: "#sponsors-section", external: false },
  // { name: "FAQ", href: "#faq-section", external: false },
  { name: "About", href: "#about-section", external: false },
  { name: "Contact", href: "#contact-section", external: false },
];

const FloatingNavbar: React.FC<FloatingNavbarProps> = ({ showLogo }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for background transparency
  useEffect(() => {
    const handleScroll = () => {
      // Add background when scrolled down even slightly
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-black/70 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-3 flex items-center justify-between h-16 md:h-20">
        {/* Left Side: Logo Placeholder/Area */}
        <div className="flex items-center h-full">
          {/* This div now renders the small logo conditionally */}
          <div
            id="navbar-logo-placeholder"
            className={`relative h-full flex items-center transition-opacity duration-500 ease-in-out ${
              showLogo ? "opacity-100" : "opacity-0 pointer-events-none" // Control visibility
            }`}
            aria-hidden={!showLogo} // Accessibility hint
          >
            {/* Small Logo */}
            <div className="h-8 w-8 md:h-10 md:w-10 relative overflow-hidden rounded-lg">
              <div className="absolute inset-0" />
              <Image
                src="/logo.png"
                alt="Brinhack Logo"
                width={40}
                height={40}
                className="object-contain w-full h-full relative z-10"
              />
            </div>
            <span className="text-white font-major-mono ml-2 hidden sm:inline">
              <span className="text-[#ff00c0]">Brin</span>
              <span className="text-[#26bffd]">HAck</span>
            </span>
          </div>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="flex items-center space-x-1 md:space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="sm"
              asChild
              className="text-gray-300 hover:text-white hover:bg-white/10 font-silkscreen text-xs md:text-sm transition-colors duration-200"
            >
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      const targetElement = document.querySelector(item.href);
                      targetElement?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {item.name}
                </a>
              )}
            </Button>
          ))}

          {/* Registration Button */}
          <Button
            variant="default"
            size="sm"
            asChild
            className="bg-gradient-to-r from-pink-500 to-yellow-500 text-black hover:from-pink-600 hover:to-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg font-silkscreen ml-2"
          >
            <a href="#register">Register</a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default FloatingNavbar;
