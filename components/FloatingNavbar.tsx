"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Users,
  Award,
  Star,
  ExternalLink,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Define the prop type
interface FloatingNavbarProps {
  showLogo: boolean;
}

// Define navigation items
const navItems = [
  { name: "Tracks", href: "#tracks", external: false },
  { name: "Timeline", href: "#event-timeline", external: false },
  { name: "Sponsors", href: "#sponsors-section", external: false },
  { name: "About", href: "#about-section", external: false },
  // { name: "FAQ", href: "#faq-section", external: false },
];

// Define extras navigation items separately
const extrasItems = [
  {
    name: "Upcoming Events",
    desc: "Workshop Schedule",
    href: "#",
    icon: (
      <Image
        src="/s1n.png"
        alt="Events Calendar"
        width={20}
        height={20}
        className="object-contain"
      />
    ),
    bgColor: "bg-purple-900/50",
    borderColor: "border-purple-500/50",
    textColor: "text-cyan-300",
  },
  {
    name: "Club Members",
    desc: "Meet our team",
    href: "#",
    icon: (
      <Image
        src="/pokeball.png"
        alt="Team Members"
        width={20}
        height={20}
        className="object-contain"
      />
    ),
    bgColor: "bg-blue-900/50",
    borderColor: "border-blue-500/50",
    textColor: "text-pink-300",
  },
];

const FloatingNavbar: React.FC<FloatingNavbarProps> = ({ showLogo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [extrasMenuOpen, setExtrasMenuOpen] = useState(false);

  // Animation variants for dropdown menu
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.97,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  // Animation variants for menu items (staggered children)
  const menuItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * custom,
        duration: 0.3,
      },
    }),
  };

  // Scroll listener for background transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Close extras dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest("#extras-dropdown") &&
        !target.closest("#extras-button")
      ) {
        setExtrasMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle scroll to hero section
  const scrollToHero = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  // Close mobile menu when clicking a link
  const handleNavItemClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      targetElement?.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  // Toggle extras menu
  const toggleExtrasMenu = () => {
    setExtrasMenuOpen(!extrasMenuOpen);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled || mobileMenuOpen
            ? "bg-black/70 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-6 py-3 flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Left Side: Logo Placeholder/Area */}
          <div className="flex items-center h-full">
            <motion.div
              id="navbar-logo-placeholder"
              className={`relative h-full flex items-center ${
                showLogo ? "pointer-events-auto" : "pointer-events-none"
              }`}
              initial={false}
              animate={{
                opacity: showLogo ? 1 : 0,
                scale: showLogo ? 1 : 0.95,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              aria-hidden={!showLogo}
            >
              <a
                href="#"
                onClick={scrollToHero}
                className="flex items-center group hover:scale-105 transition-transform duration-300"
                aria-label="Back to top"
              >
                <div className="h-8 w-8 md:h-10 md:w-10 relative overflow-hidden rounded-lg group-hover:shadow-md group-hover:shadow-blue-400/30 transition-shadow duration-300">
                  <div className="absolute inset-0" />
                  <Image
                    src="/logo.png"
                    alt="Brinhack Logo"
                    width={40}
                    height={40}
                    className="object-contain w-full h-full relative z-10"
                  />
                </div>
                <span className="text-white font-major-mono ml-2 text-xs sm:text-sm transition-colors duration-300">
                  <span className="text-[#ff00c0] group-hover:text-pink-400">
                    Gen AI
                  </span>
                  <span className="text-[#26bffd] group-hover:text-blue-300">
                    Club
                  </span>
                </span>
              </a>
            </motion.div>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-300 hover:text-white hover:bg-white/10 font-silkscreen text-xs lg:text-sm transition-colors duration-200"
              >
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavItemClick(e, item.href)}
                  >
                    {item.name}
                  </a>
                )}
              </Button>
            ))}

            {/* Extras Dropdown Button - Desktop Only */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  id="extras-button"
                  variant="default"
                  size="sm"
                  className={`bg-gradient-to-r from-pink-500 to-blue-500 text-black hover:from-pink-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg font-silkscreen ml-2 text-xs lg:text-sm flex items-center gap-1 ${
                    extrasMenuOpen ? "ring-2 ring-purple-400/50" : ""
                  }`}
                  onClick={toggleExtrasMenu}
                >
                  <Star
                    className={`w-3 h-3 ${
                      extrasMenuOpen ? "text-yellow-300" : ""
                    }`}
                  />
                  EXTRA'S
                  <motion.div
                    initial={false}
                    animate={{ rotate: extrasMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-3 h-3" />
                  </motion.div>
                </Button>
              </motion.div>

              {/* Extras Dropdown Menu with Animation */}
              <AnimatePresence>
                {extrasMenuOpen && (
                  <motion.div
                    id="extras-dropdown"
                    className="absolute right-0 mt-2 w-48 py-2 bg-black/90 backdrop-blur-xl border-2 border-purple-500/50 shadow-lg rounded-md text-white z-50 overflow-hidden"
                    style={{
                      clipPath:
                        "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
                      transformOrigin: "top right",
                    }}
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <motion.div
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={0}
                      className="px-4 py-2 border-b border-purple-500/30"
                    >
                      <h3 className="font-silkscreen text-xs text-purple-300">
                        EXPLORE MORE
                      </h3>
                    </motion.div>

                    

                    <motion.div
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={2}
                    >
                      <Link
                        href="/volunteers"
                        className="flex items-center gap-2 px-4 py-3 hover:bg-blue-900/30 transition-colors font-bitwise text-sm"
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-900/50 rounded-md border border-blue-500/50 overflow-hidden">
                          <Image
                            src="/pokeball.png"
                            alt="Volunteers Cloud"
                            width={20}
                            height={20}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <span className="text-pink-300">Club
                           Members
                           </span>
                          <p className="text-xs text-gray-400">Meet our team</p>
                        </div>
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button - Shown only on mobile */}
          <div className="flex items-center md:hidden">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className="text-white hover:bg-white/10"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu - Slides in from top with animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-black/90 backdrop-blur-lg border-t border-gray-800 px-4 py-3 shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Regular navigation items */}
              <div className="flex flex-col space-y-2 mb-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavItemClick(e, item.href)}
                      className="text-gray-300 hover:text-white py-2 font-silkscreen text-sm transition-colors duration-200 border-b border-gray-800 block"
                    >
                      {item.name}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Extras Section Header - Visually distinguished */}
              <motion.div
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                custom={navItems.length}
                className="mb-2 mt-5 bg-gradient-to-r from-pink-800/40 to-blue-800/40 px-3 py-1.5 rounded-sm border-l-4 border-l-purple-500"
              >
                <h3 className="font-silkscreen text-xs text-purple-300 flex items-center">
                  <Star className="w-3 h-3 mr-2 text-yellow-300" />
                  EXTRA'S
                </h3>
              </motion.div>

              {/* Extras Navigation Items - Styled differently */}
              <div className="flex flex-col space-y-3 pl-2">
                {extrasItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={navItems.length + index + 1}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 transition-colors font-bitwise text-sm hover:bg-gray-800/30 rounded-md border-l-2 ${item.borderColor}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div
                        className={`w-8 h-8 flex items-center justify-center ${item.bgColor} rounded-md border ${item.borderColor} overflow-hidden`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <span className={`${item.textColor}`}>{item.name}</span>
                        <p className="text-xs text-gray-400">{item.desc}</p>
                      </div>
                      <ExternalLink className="w-3 h-3 text-gray-400 ml-auto" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default FloatingNavbar;
