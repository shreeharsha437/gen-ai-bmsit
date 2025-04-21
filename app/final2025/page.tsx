"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import teamsData from "@/data/teams.json";
import Link from "next/link";

interface Team {
  id: string;
  name: string;
  leader: string;
  members: string[];
  project: string;
  track: string;
  satelliteType: string;
}

// Track badge map
const trackBadges = {
  IoT: "IoT",
  CyberSecurity: "CYBR",
  Blockchain: "BCT",
  "Open Innovation": "OI",
  Sustainability: "SSN",
};

// Track colors for badges - Enhanced with more vibrant colors
const trackColors = {
  IoT: "bg-blue-600/40 border-blue-400 text-blue-300",
  CyberSecurity: "bg-purple-600/40 border-purple-400 text-purple-300",
  Blockchain: "bg-orange-600/40 border-orange-400 text-orange-300",
  "Open Innovation": "bg-pink-600/40 border-pink-400 text-pink-300",
  Sustainability: "bg-green-600/40 border-green-400 text-green-300",
};

// Helper function to highlight matched text
const highlightMatch = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-yellow-500/50 text-white font-bold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

// Function to check if team should be expanded because it matches search
const shouldExpandTeam = (team: Team, searchTerm: string) => {
  if (!searchTerm) return false;
  const searchTermLower = searchTerm.toLowerCase();

  return (
    team.name.toLowerCase().includes(searchTermLower) ||
    team.project.toLowerCase().includes(searchTermLower) ||
    team.leader.toLowerCase().includes(searchTermLower) ||
    team.members.some((member) =>
      member.toLowerCase().includes(searchTermLower)
    )
  );
};

// Simple deterministic "random" function to avoid hydration issues
const seededRandom = (seed: number) => {
  return ((seed * 9301 + 49297) % 233280) / 233280;
};

// Add this near your other helper functions - more subtle approach
const getSatelliteTintClass = (track: string) => {
  // Only apply tinting when we have a valid track
  if (!track) return "";

  const formattedTrack = track.replace(" ", "-");
  return `satellite-tint-${formattedTrack}`;
};

const Final2025 = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [stars, setStars] = useState<
    Array<{ x: number; y: number; size: number; delay: number }>
  >([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkIfMobile();

    // Listen for resize events
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    // Generate star field with deterministic values on client-side only
    if (typeof window !== "undefined") {
      const starArray = Array.from({ length: 100 }, (_, i) => ({
        x: seededRandom(i * 3) * 100,
        y: seededRandom(i * 7) * 100,
        size: seededRandom(i * 13) * 2 + 0.5,
        delay: seededRandom(i * 19) * 3,
      }));
      setStars(starArray);
    }

    // Set teams data
    setTeams(teamsData.teams);
    setFilteredTeams(teamsData.teams);
  }, []);

  // Search and filter functionality
  useEffect(() => {
    let results = teamsData.teams;

    // Apply search term filter
    if (searchTerm) {
      results = results.filter(
        (team) =>
          team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.members.some((member) =>
            member.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply track filter
    if (activeFilter) {
      results = results.filter((team) => team.track === activeFilter);
    }

    setFilteredTeams(results);

    // Auto expand teams that match search criteria
    if (searchTerm && results.length > 0) {
      // If there's only one result, auto expand it
      if (results.length === 1) {
        setExpandedTeam(results[0].id);
      }
      // If search term is specific enough, auto expand matching teams
      else if (searchTerm.length >= 3) {
        const matchingTeams = results.filter((team) =>
          shouldExpandTeam(team, searchTerm)
        );
        if (matchingTeams.length === 1) {
          setExpandedTeam(matchingTeams[0].id);
        }
      }
    }
  }, [searchTerm, activeFilter]);

  // Function to toggle team expansion
  const toggleTeam = (teamId: string) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  // Function to handle filter selection
  const handleFilterClick = (track: string) => {
    setActiveFilter(activeFilter === track ? null : track);
    setIsFilterOpen(false); // Close dropdown after selection
  };

  const uniqueTracks = Array.from(
    new Set(teamsData.teams.map((team) => team.track))
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#000000] via-[#05051a] to-[#0a0b25] text-white py-10 sm:py-16 px-3 sm:px-4 md:px-6 relative overflow-hidden">
      {/* BrinHack Logo - Top Left Corner */}
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

      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>

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
              opacity: 0.7,
              animation: `twinkle 3s infinite ${star.delay}s`,
              boxShadow: "0 0 3px #fff, 0 0 5px #fff",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/*Heading area */}
        <div className="flex flex-col items-center justify-center mb-4 sm:mb-6 relative">
          <div className="w-full flex justify-center items-center relative">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-5xl text-center font-major-mono text-purple-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Final {teamsData.teams.length} Teams
            </motion.h1>
          </div>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-4 mb-8 sm:mb-12"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          ></motion.div>
        </div>

        {/* Search and Filter UI */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8">
          {/* Enhanced Search with Satellite */}
          <motion.div
            className="w-full sm:w-64 md:w-80"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative">
              {/* Satellite image */}
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 z-10">
                <Image
                  src="/s3n.png"
                  alt="Search Satellite"
                  width={32}
                  height={32}
                  className={`object-contain transition-all duration-300 ${
                    searchTerm ? "animate-spin-slow" : ""
                  }`}
                />
              </div>

              {/* Search input */}
              <input
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900/70 border border-gray-700 text-cyan-100 py-2 pl-12 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-bitwise text-sm"
                style={{
                  clipPath:
                    "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
                }}
              />

              {/* Search icon */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Filter Dropdown with Animation */}
          <motion.div
            className="w-full sm:w-48 md:w-56 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Custom dropdown trigger */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between bg-gray-900/70 border border-gray-700 text-cyan-100 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-silkscreen text-sm transition-all duration-300 hover:bg-gray-800/70"
              style={{
                clipPath:
                  "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
              }}
            >
              <span className="flex flex-wrap items-center gap-2 overflow-hidden">
                <Image
                  src="/s2n.png"
                  alt="Filter"
                  width={20}
                  height={20}
                  className={`flex-shrink-0 ${
                    isFilterOpen ? "animate-spin-slow" : ""
                  }`}
                />
                {activeFilter ? (
                  <span className="flex flex-wrap items-center gap-1">
                    <span className="truncate max-w-[80px] sm:max-w-[120px]">
                      {activeFilter}
                    </span>
                    <div
                      className={`${
                        trackColors[activeFilter as keyof typeof trackColors]
                      } px-1 py-0.5 text-xs rounded-md border font-silkscreen inline-flex flex-shrink-0 items-center`}
                    >
                      {trackBadges[activeFilter as keyof typeof trackBadges]}
                    </div>
                  </span>
                ) : (
                  "Select Track"
                )}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 flex-shrink-0 transition-transform duration-300 ml-1 ${
                  isFilterOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown menu with animation */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 mt-2 py-2 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto font-silkscreen"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
                  }}
                >
                  <div
                    onClick={() => {
                      setActiveFilter(null);
                      setIsFilterOpen(false);
                    }}
                    className="px-4 py-2 text-gray-300 hover:bg-gray-800/80 cursor-pointer flex items-center justify-between"
                  >
                    <span>All Tracks</span>
                    {activeFilter === null && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>

                  {uniqueTracks.map((track) => (
                    <motion.div
                      key={track}
                      onClick={() => handleFilterClick(track)}
                      className="px-4 py-2 text-gray-300 hover:bg-gray-800/80 cursor-pointer flex items-center justify-between"
                      whileHover={{
                        backgroundColor: "rgba(31, 41, 55, 0.8)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">{track}</span>
                        <div
                          className={`${
                            trackColors[track as keyof typeof trackColors]
                          } px-1.5 py-0.5 text-xs rounded-md border inline-flex items-center`}
                        >
                          {trackBadges[track as keyof typeof trackBadges]}
                        </div>
                      </div>
                      {activeFilter === track && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Results count */}
        <motion.div
          className="text-center text-gray-400 mb-5 sm:mb-6 font-bitwise text-xs sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="inline-flex flex-wrap justify-center items-center gap-2">
            <span>
              Showing {filteredTeams.length} of {teams.length} teams
            </span>
            {activeFilter && (
              <div
                className={`${
                  trackColors[activeFilter as keyof typeof trackColors]
                } px-1.5 py-0.5 text-xs rounded-md border inline-flex items-center flex-shrink-0`}
              >
                {trackBadges[activeFilter as keyof typeof trackBadges]}
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 mt-4 sm:mt-6">
          <AnimatePresence>
            {filteredTeams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative"
              >
                {/* Main team card with satellite */}
                <div
                  className={`team-card relative flex items-center bg-gray-900/50 backdrop-blur-sm border ${
                    expandedTeam === team.id
                      ? "border-purple-500 team-expanded-shadow"
                      : "border-gray-700"
                  } transition-all duration-300 rounded-lg overflow-hidden cursor-pointer hover:border-gray-500`}
                  onClick={() => toggleTeam(team.id)}
                  style={{
                    clipPath:
                      "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
                  }}
                >
                  {/* Satellite image on the left with subtle track-based tinting */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 relative overflow-hidden pl-1 sm:pl-2 flex items-center justify-center transition-all duration-300">
                    <Image
                      src={`/${team.satelliteType}.png`}
                      alt="Satellite"
                      width={96}
                      height={96}
                      className={`satellite-image object-contain w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 transition-all duration-300 ${
                        expandedTeam === team.id
                          ? "expanded-satellite"
                          : getSatelliteTintClass(team.track)
                      }`}
                    />
                  </div>

                  {/* Team name and track badge - Always visible */}
                  <div className="flex-grow py-2 sm:py-3 px-1 sm:px-3 overflow-hidden">
                    <div className="flex flex-col items-center justify-center gap-1 mb-1">
                      {/* Team name always stays visible */}
                      <h2 className="text-center font-major-mono text-sm sm:text-base md:text-lg text-cyan-300 truncate w-full">
                        {searchTerm
                          ? highlightMatch(team.name, searchTerm)
                          : team.name}
                      </h2>

                      {/* Track badge */}
                      <div
                        className={`${
                          trackColors[team.track as keyof typeof trackColors]
                        } px-1.5 sm:px-2 py-0.5 text-xs rounded-md border font-silkscreen inline-flex items-center`}
                      >
                        {trackBadges[team.track as keyof typeof trackBadges]}
                      </div>

                      {/* Project name - only visible when collapsed */}
                      <AnimatePresence mode="wait">
                        {expandedTeam !== team.id ? (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-gray-400 text-center font-bitwise truncate max-w-full px-1"
                          >
                            {searchTerm
                              ? highlightMatch(team.project, searchTerm)
                              : team.project}
                          </motion.p>
                        ) : (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-purple-300 text-center font-silkscreen"
                          >
                            [Details Below]
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Expand indicator */}
                  <div className="mr-2 sm:mr-4 text-purple-400 flex-shrink-0">
                    <span className="font-silkscreen text-xs inline-block">
                      {expandedTeam === team.id ? "[-]" : "[+]"}
                    </span>
                  </div>
                </div>

                {/* Expanded details */}
                <AnimatePresence>
                  {expandedTeam === team.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: { duration: 0.3 },
                      }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-md p-3 sm:p-4 font-bitwise"
                      style={{
                        clipPath:
                          "polygon(0% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)",
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="overflow-hidden">
                          <h3 className="text-amber-300 text-xs sm:text-sm mb-1 sm:mb-2">
                            Project:
                          </h3>
                          <p className="text-white text-xs sm:text-sm mb-3 break-words">
                            {searchTerm
                              ? highlightMatch(team.project, searchTerm)
                              : team.project}
                          </p>

                          <h3 className="text-amber-300 text-xs sm:text-sm mb-1 sm:mb-2">
                            Track:
                          </h3>
                          <div className="flex items-center gap-2">
                            <div
                              className={`${
                                trackColors[
                                  team.track as keyof typeof trackColors
                                ]
                              } px-2 py-1 text-xs sm:text-sm rounded-md border font-silkscreen inline-flex items-center`}
                            >
                              {team.track}
                            </div>
                          </div>
                        </div>

                        <div className="overflow-hidden">
                          <h3 className="text-amber-300 text-xs sm:text-sm mb-1 sm:mb-2 mt-3 md:mt-0">
                            Team Leader:
                          </h3>
                          <p className="text-white text-xs sm:text-sm mb-3 break-words">
                            {searchTerm
                              ? highlightMatch(team.leader, searchTerm)
                              : team.leader}
                          </p>

                          {/* Members section */}
                          <h3 className="text-amber-300 text-xs sm:text-sm mb-1 sm:mb-2">
                            Members:
                          </h3>
                          <ul className="text-gray-300 text-xs sm:text-sm list-disc pl-5">
                            {team.members.map((member, i) => (
                              <li key={i} className="break-words">
                                {searchTerm
                                  ? highlightMatch(member, searchTerm)
                                  : member}
                              </li>
                            ))}
                            {team.members.length === 0 && (
                              <li className="italic">No additional members</li>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Scanline effect */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(transparent 50%, rgba(32, 128, 32, 0.2) 50%)",
                          backgroundSize: "100% 4px",
                          animation: "scanline 0.5s linear infinite",
                        }}
                      ></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* No results message */}
          {filteredTeams.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 sm:py-10"
            >
              <div className="text-gray-400 font-bitwise">
                No teams match your search criteria
              </div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter(null);
                }}
                className="mt-4 px-4 py-2 bg-purple-700/50 border border-purple-500 rounded-md font-silkscreen text-sm hover:bg-purple-600/50 transition-colors"
              >
                Reset filters
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Retrowave grid */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] sm:h-[120px] z-5 overflow-hidden">
        <div
          className="absolute inset-0 z-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 30px, rgba(255, 0, 255, 0.3) 30px, rgba(255, 0, 255, 0.3) 31px)",
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
              "repeating-linear-gradient(to right, transparent, transparent 30px, rgba(0, 255, 255, 0.3) 30px, rgba(0, 255, 255, 0.3) 31px)",
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

export default Final2025;
