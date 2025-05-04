"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import volunteerData from "@/data/volunteerAndStaff.json";

interface Volunteer {
  id: string;
  name: string;
  role: string;
  quote: string;
  pokemon_no: number;
}

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
      dream_world?: {
        front_default: string;
      };
    };
    versions?: {
      "generation-v"?: {
        "black-white"?: {
          animated?: {
            front_default: string;
          };
        };
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

// Define role colors
const roleColors = {
  LEAD: "from-yellow-500/30 to-amber-600/30 border-yellow-400",
  COLEAD: "from-gray-300/30 to-gray-500/30 border-gray-300",
  FORK: "from-blue-500/30 to-blue-700/30 border-blue-500",
  SPOON: "from-pink-500/30 to-purple-700/30 border-pink-500",
};

// Define role badges
const roleBadges = {
  LEAD: "KNIFE",
  COLEAD: "CHOPSTICK",
  FORK: "FORK",
  SPOON: "SPOON",
};

// Define pokemon type colors
const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-700",
  poison: "bg-purple-600",
  ground: "bg-amber-700",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-stone-500",
  ghost: "bg-purple-800",
  dragon: "bg-indigo-600",
  dark: "bg-stone-700",
  steel: "bg-slate-400",
  fairy: "bg-pink-300",
  shadow: "bg-slate-700",
  unknown: "bg-gray-500",
};

// Add this helper function to map role values to badge filenames
const getBadgeImage = (role: string) => {
  switch (role) {
    case "LEAD":
      return "/badges/lead.png";
    case "COLEAD":
      return "/badges/colead.png";
    case "FORK":
      return "/badges/tech.png";
    case "SPOON":
      return "/badges/nontech.png";
    default:
      return "/badges/nontech.png";
  }
};

// Completely reworked volunteer image handling function
const getVolunteerImage = (id: string) => {
  try {
    // For special leadership roles
    if (id === "vL00") return "/team/vL00.png";
    if (id === "vcl") return "/team/vcl.png";

    // For regular volunteers, ensure we're using the exact ID for the image path
    // Use a direct path matching the exact volunteer ID
    const imagePath = `/team/${id}.png`;

    // Return the specific path
    return imagePath;
  } catch (error) {
    console.error(`Error processing image for volunteer ID ${id}:`, error);
    // Return a fallback image - could be a cloud or a default avatar
    return "/team/vt.png"; // Default fallback image
  }
};

const getAnimatedSpriteUrl = (pokemon: Pokemon | null) =>
  pokemon?.sprites?.versions?.["generation-v"]?.["black-white"]?.animated
    ?.front_default ||
  pokemon?.sprites?.front_default ||
  "/pokeball.png";

const getOfficialArtwork = (pokemon: Pokemon | null) =>
  pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
  pokemon?.sprites?.front_default ||
  "/pokeball.png";

// Update the getTruncatedName function to handle dynamic font size instead of truncating
const getNameFontSize = (name: string) => {
  if (name.length > 25) return "text-sm sm:text-lg";
  if (name.length > 20) return "text-base sm:text-lg";
  if (name.length > 15) return "text-lg sm:text-xl";
  return "text-lg sm:text-xl";
};

// --- Updated VolunteerCard with window-like styling for special cards ---
const VolunteerCard = ({
  volunteer,
  pokemon,
  isSpecial = false,
}: {
  volunteer: Volunteer;
  pokemon: Pokemon | null;
  isSpecial?: boolean;
}) => {
  const [swapped, setSwapped] = useState(false);
  const [personImgLoaded, setPersonImgLoaded] = useState(false);
  const [personImgError, setPersonImgError] = useState(false);
  const [pokemonImgLoaded, setPokemonImgLoaded] = useState(false);
  const [pokemonImgError, setPokemonImgError] = useState(false);

  // Improved sizes - special cards are 1.5x larger (not 2x or more)
  const big = isSpecial ? 90 : 75;
  const small = isSpecial ? 45 : 38;

  // Animation config
  const transition = { type: "spring", stiffness: 300, damping: 30 };

  // Function to get appropriate font size for quote based on length
  const getQuoteStyle = (quote?: string) => {
    if (!quote) return "text-sm";
    if (quote.length > 120) return "text-[9px]";
    if (quote.length > 100) return "text-[10px]";
    if (quote.length > 70) return "text-[11px]";
    if (quote.length > 40) return "text-xs";
    return "text-sm";
  };

  // Get role badge icon based on role - LARGER
  const getRoleBadgeIcon = (role: string) => {
    switch (role) {
      case "LEAD":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        );
      case "COLEAD":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1.5"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        );
      case "FORK":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1.5"
          >
            <path d="M18 3v7c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V3" />
            <path d="M6 15h12" />
            <path d="M12 15v6" />
          </svg>
        );
      case "SPOON":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1.5"
          >
            <path d="M12 2a9 9 0 0 0-9 9c0 3.6 3.96 6.9 9 12 5.04-5.1 9-8.4 9-12a9 9 0 0 0-9-9z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Role badge style - more visible and consistent with your theme
  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "LEAD":
        return "bg-yellow-700/80 border-yellow-400 text-yellow-200 shadow-[0_0_8px_rgba(250,204,21,0.3)]";
      case "COLEAD":
        return "bg-gray-700/80 border-gray-400 text-gray-200 shadow-[0_0_8px_rgba(156,163,175,0.3)]";
      case "FORK":
        return "bg-blue-700/80 border-blue-400 text-blue-200 shadow-[0_0_8px_rgba(59,130,246,0.3)]";
      case "SPOON":
        return "bg-pink-700/80 border-pink-400 text-pink-200 shadow-[0_0_8px_rgba(236,72,153,0.3)]";
      default:
        return "bg-purple-700/80 border-purple-400 text-purple-200 shadow-[0_0_8px_rgba(168,85,247,0.3)]";
    }
  };

  // Role text (for back of card)
  const getRoleTitle = (role: string) => {
    switch (role) {
      case "LEAD":
        return "Event Lead";
      case "COLEAD":
        return "Event Co-Lead";
      case "FORK":
        return "Tech Volunteer";
      case "SPOON":
        return "Non-Tech Volunteer";
      default:
        return "Volunteer";
    }
  };

  // Window title based on role - for special cards
  const getWindowTitle = (role: string) => {
    switch (role) {
      case "LEAD":
        return "KNIFE - Event Lead";
      case "COLEAD":
        return "CHOPSTICK - Event Co-Lead";
      default:
        return "Volunteer";
    }
  };

  return (
    <motion.div
      className={`relative overflow-hidden aspect-[16/9] w-full shadow-lg cursor-pointer`}
      onClick={() => setSwapped((s) => !s)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Opaque outer shell with pixel-style clipPath like in About section */}
      <div
        className={`absolute inset-0 ${
          volunteer.role === "LEAD"
            ? "bg-yellow-600/40"
            : volunteer.role === "COLEAD"
            ? "bg-gray-600/40"
            : volunteer.role === "FORK"
            ? "bg-blue-600/40"
            : "bg-pink-600/40"
        } backdrop-blur-sm border-2 ${
          volunteer.role === "LEAD"
            ? "border-yellow-400"
            : volunteer.role === "COLEAD"
            ? "border-gray-400"
            : volunteer.role === "FORK"
            ? "border-blue-400"
            : "border-pink-400"
        }`}
        style={{
          clipPath:
            "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
        }}
      ></div>

      {/* Pixelated background overlay */}
      <div className="absolute inset-0 bg-[url('/pixel-grid.png')] opacity-10"></div>

      <div
        className={`absolute top-2 right-2 ${
          volunteer.role === "LEAD" || volunteer.role === "COLEAD"
            ? "w-16 h-16 md:w-16 md:h-16"
            : "w-8 h-8 md:w-12 md:h-12"
        } z-30 transition-all duration-300 group`}
      >
        <Image
          src={getBadgeImage(volunteer.role)}
          alt={`${volunteer.role} Badge`}
          width={
            volunteer.role === "LEAD" || volunteer.role === "COLEAD" ? 64 : 48
          }
          height={
            volunteer.role === "LEAD" || volunteer.role === "COLEAD" ? 64 : 48
          }
          className="object-contain w-full h-full transition-transform duration-300 group-hover:animate-spin opacity-80 md:opacity-100"
        />
      </div>

      {/* Mac OS-style window controls for special cards */}
      {isSpecial && (
        <div className="absolute top-0 left-0 right-0 h-7 flex items-center justify-between px-3 z-20 border-b border-white/10">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs font-silkscreen text-white/90">
            {getWindowTitle(volunteer.role)}
          </div>
          <div className="w-4"></div> {/* Empty div for balance */}
        </div>
      )}

      <div
        className={`flex items-center h-full px-3 py-2.5 relative gap-3 z-10 ${
          isSpecial ? "pt-7" : ""
        }`}
      >
        {/* Left: Image Column (1/3 width) */}
        <div className="relative flex-shrink-0 w-1/3">
          <div className="relative h-[110px] flex items-center justify-center">
            {/* Main Circle (Person) */}
            <motion.div
              layout
              transition={transition}
              className="rounded-full border-2 border-white overflow-hidden shadow-lg absolute"
              style={{
                width: swapped ? small : big,
                height: swapped ? small : big,
                zIndex: swapped ? 10 : 20,
                top: swapped ? "60px" : "0px",
                left: swapped ? "60px" : "0px",
              }}
            >
              {/* Loading spinner */}
              {!personImgLoaded && !personImgError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800/80">
                  <div className="w-6 h-6 border-2 border-t-transparent border-blue-400 rounded-full animate-spin"></div>
                </div>
              )}

              {/* Person Image with error handling */}
              <Image
                src={
                  personImgError
                    ? "/team/vt.png"
                    : getVolunteerImage(volunteer.id)
                }
                alt={volunteer.name}
                width={big}
                height={big}
                className={`object-cover w-full h-full ${
                  personImgLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setPersonImgLoaded(true)}
                onError={() => {
                  setPersonImgError(true);
                  setPersonImgLoaded(true);
                }}
              />
            </motion.div>

            {/* Pokémon Circle - ALWAYS ON TOP when it's the smaller one */}
            <motion.div
              layout
              transition={transition}
              className="rounded-full border-2 border-blue-300 overflow-hidden shadow-lg absolute"
              style={{
                width: swapped ? big : small,
                height: swapped ? big : small,
                zIndex: swapped ? 20 : 30, // Always higher when it's smaller
                top: swapped ? "0px" : "60px",
                left: swapped ? "0px" : "60px",
              }}
            >
              {/* Loading spinner */}
              {!pokemonImgLoaded && !pokemonImgError && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-900/30">
                  <div className="w-5 h-5 border-2 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
                </div>
              )}

              {/* Pokemon Image with error handling */}
              <Image
                src={
                  pokemonImgError
                    ? "/pokeball.png"
                    : swapped
                    ? getOfficialArtwork(pokemon)
                    : getAnimatedSpriteUrl(pokemon)
                }
                alt={pokemon?.name || "Pokémon"}
                width={big}
                height={big}
                className={`object-contain w-full h-full ${
                  pokemonImgLoaded ? "opacity-100" : "opacity-0"
                } ${swapped ? "scale-110" : "scale-100"}`}
                onLoad={() => setPokemonImgLoaded(true)}
                onError={() => {
                  setPokemonImgError(true);
                  setPokemonImgLoaded(true);
                }}
              />
            </motion.div>

            {/* Sparkle effect on swap */}
            <AnimatePresence>
              {swapped && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`spark-${i}`}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                      initial={{ opacity: 1, scale: 0 }}
                      animate={{
                        opacity: 0,
                        scale: 3,
                        x: Math.cos((i * 60 * Math.PI) / 180) * 40,
                        y: Math.sin((i * 60 * Math.PI) / 180) * 40,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      style={{
                        top: "40%",
                        left: "40%",
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Role Badge BELOW image - only visible when not swapped - REPOSITIONED & BIGGER */}
            <AnimatePresence>
              {!swapped && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-6 left-0 right-0 flex justify-center"
                  style={{ zIndex: 40 }}
                >
                  <motion.div
                    className={`inline-flex items-center px-3 py-1 rounded-md border-2 ${getRoleBadgeStyle(
                      volunteer.role
                    )}
                      font-silkscreen text-xs sm:text-sm`}
                    style={{
                      clipPath:
                        "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      boxShadow: [
                        "0 0 5px rgba(255,255,255,0.2)",
                        "0 0 8px rgba(255,255,255,0.4)",
                        "0 0 5px rgba(255,255,255,0.2)",
                      ],
                    }}
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }}
                  >
                    {getRoleBadgeIcon(volunteer.role)}
                    {roleBadges[volunteer.role as keyof typeof roleBadges]}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pokemon Types BELOW image - only visible when swapped - REPOSITIONED & BIGGER */}
            <AnimatePresence>
              {swapped && pokemon?.types && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-6 left-0 right-0 flex justify-center gap-1"
                  style={{ zIndex: 40 }}
                >
                  <div className="flex flex-wrap gap-1 justify-center">
                    {pokemon.types.map((t, i) => (
                      <motion.span
                        key={t.type.name}
                        className={`inline-block px-2 py-1 rounded-sm text-[10px] sm:text-xs font-bold text-white ${
                          typeColors[t.type.name] || "bg-gray-500"
                        } border border-white/30`}
                        style={{
                          clipPath:
                            "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
                          width: pokemon.types.length > 1 ? "auto" : "auto",
                        }}
                        whileHover={{ scale: 1.05 }}
                        animate={{
                          y: [0, -2, 0],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 1.5 + i * 0.2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                      >
                        {t.type.name.toUpperCase()}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Info - with adapted layouts for text visibility */}
        <div className="flex-1 h-full relative overflow-hidden">
          {/* Front Content - Person Info */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center"
            initial={false}
            animate={{ opacity: swapped ? 0 : 1, y: swapped ? 20 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Name with better styling and visibility */}
            <h3
              className={`font-major-mono ${getNameFontSize(
                volunteer.name
              )} text-white mb-1.5 pr-2`}
            >
              <span className="bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] break-words">
                {volunteer.name}
              </span>
            </h3>

            {/* Quote with dynamic font sizing and enhanced visibility */}
            <div className="bg-black/40 rounded-md p-1.5 backdrop-blur-sm border border-gray-700/40">
              <p
                className={`font-bitwise text-cyan-100 italic ${getQuoteStyle(
                  volunteer.quote
                )}`}
              >
                {volunteer.quote ? `"${volunteer.quote}"` : ""}
              </p>
            </div>
          </motion.div>

          {/* Back Content - Pokemon Info */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center"
            initial={false}
            animate={{ opacity: swapped ? 1 : 0, y: swapped ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            {pokemon && (
              <div className="flex flex-col h-full justify-center">
                {/* Pokemon Name - larger and highlighted */}
                <h4 className="font-silkscreen text-[10px] text-cyan-300 mb-0.5">
                  POKÉMON
                </h4>
                <h3 className="font-major-mono text-lg sm:text-xl text-white capitalize mb-1 line-clamp-1">
                  <span className="bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                    {pokemon?.name || "???"}
                  </span>
                </h3>

                {/* Role - ENHANCED */}
                <motion.div
                  className={`inline-flex items-center px-3 py-1 rounded-md border-2 ${getRoleBadgeStyle(
                    volunteer.role
                  )} 
                    font-silkscreen text-xs mb-2`}
                  whileHover={{ scale: 1.05 }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }}
                >
                  {getRoleBadgeIcon(volunteer.role)}
                  {getRoleTitle(volunteer.role)}
                </motion.div>

                {/* Trainer Name at bottom */}
                <div className="mt-auto pt-1 border-t border-gray-700/30">
                  <p className="text-[10px] text-gray-300 flex items-center">
                    <span className="inline-block w-1 h-1 bg-blue-400 mr-1 rounded-full"></span>
                    <span className="font-silkscreen">TRAINER:</span>{" "}
                    <span className="ml-1 break-words">{volunteer.name}</span>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Interactive hint */}
      <div className="absolute bottom-1 right-1 pointer-events-none z-10">
        <div className="px-1.5 py-0.5 bg-black/40 rounded-sm border border-blue-500/20 text-[8px] text-white/70 font-silkscreen">
          TAP
        </div>
      </div>

      {/* Window resize handle for special cards */}
      {isSpecial && (
        <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-r-2 border-b-2 border-white/40 z-20"></div>
      )}
    </motion.div>
  );
};

// --- Fixed Pokémon data fetching to prevent infinite loading and API spam ---
const VolunteersPage = () => {
  const [pokemonData, setPokemonData] = useState<
    Record<number, Pokemon | null>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [stars, setStars] = useState<
    Array<{ x: number; y: number; size: number; delay: number }>
  >([]);

  // Categorize volunteers by role
  const leads = volunteerData.filter((v) => v.role === "LEAD");
  const coleads = volunteerData.filter((v) => v.role === "COLEAD");
  const forkSpoons = volunteerData.filter(
    (v) => v.role !== "LEAD" && v.role !== "COLEAD"
  );

  // Function to generate deterministic pseudo-random values
  const seededRandom = (seed: number) => {
    return ((seed * 9301 + 49297) % 233280) / 233280;
  };

  // Fetch Pokémon data with improved error handling and request limiting
  useEffect(() => {
    // Generate star field
    if (typeof window !== "undefined") {
      const starArray = Array.from({ length: 50 }, (_, i) => ({
        x: seededRandom(i * 3) * 100,
        y: seededRandom(i * 7) * 100,
        size: seededRandom(i * 13) * 2 + 0.5,
        delay: seededRandom(i * 19) * 3,
      }));
      setStars(starArray);
    }

    const fetchPokemonData = async () => {
      setIsLoading(true);
      const pokemonMap: Record<number, Pokemon | null> = {};

      // Get unique Pokémon IDs
      const uniquePokemonIds = Array.from(
        new Set(
          volunteerData.filter((v) => v.pokemon_no).map((v) => v.pokemon_no)
        )
      );

      // Safety check - if no valid IDs, end loading state
      if (uniquePokemonIds.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        // Limit concurrent requests to avoid rate limiting (5 at a time)
        const batchSize = 5;

        for (let i = 0; i < uniquePokemonIds.length; i += batchSize) {
          const batch = uniquePokemonIds.slice(i, i + batchSize);

          // Process batch with proper error handling
          const batchResults = await Promise.allSettled(
            batch.map(async (pokemonId) => {
              if (!pokemonId) return { id: 0, data: null };

              try {
                // Use localStorage to cache responses and reduce API calls
                const cacheKey = `pokemon_${pokemonId}`;
                const cached = localStorage.getItem(cacheKey);

                if (cached) {
                  try {
                    const parsedData = JSON.parse(cached);
                    return { id: pokemonId, data: parsedData };
                  } catch (e) {
                    // Invalid cache, continue with fetch
                    localStorage.removeItem(cacheKey);
                  }
                }

                // Set timeout to prevent hanging requests
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);

                const response = await fetch(
                  `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
                  { signal: controller.signal }
                );

                clearTimeout(timeoutId);

                if (response.ok) {
                  const data = await response.json();
                  // Cache the successful response
                  try {
                    localStorage.setItem(cacheKey, JSON.stringify(data));
                  } catch (e) {
                    // Ignore storage errors
                  }
                  return { id: pokemonId, data };
                } else {
                  console.warn(
                    `Pokemon ${pokemonId} returned ${response.status}`
                  );
                  return { id: pokemonId, data: null };
                }
              } catch (error: unknown) {
                // Check if the request was aborted
                if (error instanceof Error && error.name === "AbortError") {
                  console.warn(`Request for Pokémon ${pokemonId} timed out`);
                } else {
                  console.error(`Failed to fetch pokemon ${pokemonId}:`, error);
                }
                return { id: pokemonId, data: null };
              }
            })
          );

          // Process batch results
          batchResults.forEach((result) => {
            if (
              result.status === "fulfilled" &&
              result.value &&
              result.value.id
            ) {
              pokemonMap[result.value.id] = result.value.data;
            }
          });

          // Small delay between batches to prevent rate limiting
          if (i + batchSize < uniquePokemonIds.length) {
            await new Promise((resolve) => setTimeout(resolve, 300));
          }
        }
      } catch (error) {
        console.error("Failed to fetch Pokémon data:", error);
      } finally {
        // Always set loading to false, even if there were errors
        setPokemonData(pokemonMap);
        setIsLoading(false);
      }
    };

    fetchPokemonData();

    // Cleanup function to ensure we don't leave loading state if component unmounts
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1e47] via-[#152e5e] to-[#1e4082] text-white py-16 sm:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Updated Back Button to match final2025 style */}
      <Link
        href="/"
        className=" text-yellow-800 absolute top-4 left-4 z-20 flex items-center group hover:scale-105 transition-all duration-300"
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:-translate-x-1 transition-transform duration-300"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <div className="h-8 w-8 md:h-10 md:w-10 relative overflow-hidden rounded-lg hover:shadow-md hover:shadow-blue-900/30 transition-shadow duration-300">
          <Image
            src="/logo.png"
            alt="BrinHack Logo"
            width={40}
            height={40}
            className="object-contain w-full h-full"
          />
        </div>
        <span className="text-white font-major-mono ml-2 text-xs sm:text-sm hidden sm:inline-block">
          <span className="text-[#ff00c0] group-hover:text-pink-500">Brin</span>
          <span className="text-[#26bffd] group-hover:text-blue-500">HAck</span>
        </span>
      </Link>

      {/* Background with clouds - UPDATED with lighter colors and cloud SVGs */}
      <div className="absolute inset-0 z-0">
        {/* Stars effect */}
        <div className="stars-small opacity-50"></div>
        <div className="stars-medium opacity-50"></div>

        {/* Interactive stars */}
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: 0.5,
              animation: `twinkle 3s infinite ${star.delay}s`,
              boxShadow: "0 0 3px #fff, 0 0 5px #fff",
            }}
          />
        ))}

        {/* Cloud SVGs with varying sizes and opacities */}
        <div className="absolute top-20 left-[5%] w-[300px] h-[120px] opacity-20 transform -translate-x-1/2">
          <Image src="/c1n.svg" alt="Cloud" fill className="object-contain" />
        </div>

        <div className="absolute top-[15%] right-[10%] w-[400px] h-[150px] opacity-15 transform translate-x-1/4">
          <Image src="/c2n.svg" alt="Cloud" fill className="object-contain" />
        </div>

        <div className="absolute top-[40%] left-[25%] w-[250px] h-[100px] opacity-10 transform -translate-y-1/4">
          <Image src="/c3n.svg" alt="Cloud" fill className="object-contain" />
        </div>

        <div className="absolute bottom-[30%] right-[20%] w-[350px] h-[130px] opacity-15">
          <Image src="/c1n.svg" alt="Cloud" fill className="object-contain" />
        </div>

        <div className="absolute bottom-[15%] left-[15%] w-[200px] h-[80px] opacity-10">
          <Image src="/c2n.svg" alt="Cloud" fill className="object-contain" />
        </div>

        {/* Gradient blobs for atmospheric depth */}
        <div className="absolute top-1/4 left-1/5 w-64 h-48 rounded-full bg-blue-700/10 blur-3xl"></div>
        <div className="absolute top-2/3 right-1/5 w-80 h-64 rounded-full bg-indigo-600/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-56 rounded-full bg-purple-700/10 blur-3xl"></div>
      </div>

      {/* Pixel grid overlay */}
      <div className="absolute inset-0 bg-[url('/pixel-grid.png')] opacity-5"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Updated Header with animations matching final2025 page */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 relative">
          <div className="w-full flex justify-center items-center relative">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl text-center font-major-mono"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Volunteer Squad
              </span>
            </motion.h1>
          </div>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded mx-auto mt-4"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          ></motion.div>

          <motion.p
            className="mt-4 text-cyan-200 font-bitwise text-sm sm:text-base max-w-2xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Meet the awesome volunteers who make BrinHack possible, each with
            their own unique skills and Pokémon partner!
          </motion.p>
        </div>

        {/* Loading state - keep existing */}
        {isLoading ? (
          <motion.div
            className="flex justify-center items-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 relative animate-spin">
              <Image src="/pokeball.png" alt="Loading" width={64} height={64} />
            </div>
            <p className="ml-4 font-silkscreen text-blue-300">
              Loading Volunteer data...
            </p>
          </motion.div>
        ) : (
          <div className="space-y-16">
            {/* Leadership Row - LEADS AND COLEADS SIDE BY SIDE */}
            {(leads.length > 0 || coleads.length > 0) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-center text-xl font-silkscreen text-cyan-300 mb-6">
                  LEADERSHIP
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Lead */}
                  {leads.length > 0 && (
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="absolute -inset-1.5 bg-gradient-to-r from-yellow-400/40 to-amber-600/40 rounded-xl blur-sm"></div>
                      <div className="relative">
                        {leads.map((lead) => (
                          <VolunteerCard
                            key={lead.id}
                            volunteer={lead}
                            pokemon={pokemonData[lead.pokemon_no]}
                            isSpecial={true}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Co-Lead */}
                  {coleads.length > 0 && (
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="absolute -inset-1.5 bg-gradient-to-r from-gray-300/40 to-gray-500/40 rounded-xl blur-sm"></div>
                      <div className="relative">
                        {coleads.map((colead) => (
                          <VolunteerCard
                            key={colead.id}
                            volunteer={colead}
                            pokemon={pokemonData[colead.pokemon_no]}
                            isSpecial={true}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.section>
            )}

            {/* Volunteer team - THREE CARDS PER ROW, with staggered animations */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-center text-xl font-silkscreen text-cyan-300 mb-8">
                VOLUNTEER TEAM
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {forkSpoons.map((volunteer, index) => (
                  <motion.div
                    key={volunteer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  >
                    <VolunteerCard
                      volunteer={volunteer}
                      pokemon={pokemonData[volunteer.pokemon_no]}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        )}

        {/* Space at bottom */}
        <div className="h-24 md:h-32"></div>
      </div>

      {/* Retrowave grid - keep existing */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] sm:h-[120px] z-5 overflow-hidden">
        <div
          className="absolute inset-0 z-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 30px, rgba(138, 43, 226, 0.3) 30px, rgba(138, 43, 226, 0.3) 31px)",
            backgroundSize: "100% 100%",
            transform: "perspective(600px) rotateX(60deg)",
            transformOrigin: "bottom",
            animation: "grid-move 12s linear infinite",
          }}
        ></div>

        <div
          className="absolute inset-0 z-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, transparent, transparent 30px, rgba(64, 224, 208, 0.3) 30px, rgba(64, 224, 208, 0.3) 31px)",
            backgroundSize: "100% 100%",
            transform: "perspective(600px) rotateX(60deg)",
            transformOrigin: "bottom",
            animation: "grid-move 12s linear infinite",
          }}
        ></div>
      </div>
    </main>
  );
};

export default VolunteersPage;
