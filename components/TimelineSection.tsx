"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TimelineItem from "./TimelineItem";
import { Cloud } from "./TrackSection"; // Import Cloud from TrackSection

import {
  CalendarCheck,
  ClipboardList,
  Users,
  Flag,
  Code,
  Utensils,
  Search,
  Coffee,
  Pizza,
  Gamepad2,
  Moon,
  Sunrise,
  Presentation,
  Trophy,
  PartyPopper,
  LucideIcon,
  SmilePlusIcon,
} from "lucide-react";

interface TimelineEvent {
  id: number;
  time: string; // Or Date object if needed
  title: string;
  description: string;
  icon: LucideIcon; // Use the imported type
}

const timelineData: TimelineEvent[] = [
  {
    id: 1,
    time: "Sep 25",
    title: "Registration Opens",
    description: "Sign up and reserve your spot for the Gen AI Club launch!",
    icon: ClipboardList,
  },
  {
    id: 2,
    time: "Oct 8",
    title: "Registration Closes",
    description: "Last day to register for the club inauguration and workshops.",
    icon: CalendarCheck,
  },
  {
    id: 3,
    time: "Oct 10, 9:00AM",
    title: "On-site Check-in",
    description: "Arrive, check in, and collect your welcome kit.",
    icon: Flag,
  },
  {
    id: 4,
    time: "Oct 10, 10:00AM",
    title: "Inauguration Ceremony",
    description: "Official launch of Gen AI Club at BMSIT&M. Celebrate with us!",
    icon: PartyPopper,
  },
  {
    id: 5,
    time: "Oct 10, 10:45AM",
    title: "Workshop Session 1",
    description: "Introduction to Generative AI: Concepts, Trends, and Applications.",
    icon: Presentation,
  },
  {
    id: 6,
    time: "Oct 10, 12:00PM",
    title: "Networking Break",
    description: "Meet fellow AI enthusiasts and enjoy refreshments.",
    icon: Coffee,
  },
  {
    id: 7,
    time: "Oct 10, 12:30PM",
    title: "Workshop Session 2",
    description: "Hands-on with Large Language Models and Prompt Engineering.",
    icon: Code,
  },
  {
    id: 8,
    time: "Oct 10, 2:00PM",
    title: "Lunch",
    description: "Refuel and connect with club members.",
    icon: Utensils,
  },
  {
    id: 9,
    time: "Oct 10, 2:45PM",
    title: "Hands-on Lab",
    description: "Build your first Gen AI project with guidance from mentors.",
    icon: Moon,
  },
  {
    id: 10,
    time: "Oct 10, 4:00PM",
    title: "Q&A Session",
    description: "Ask questions and interact with AI experts.",
    icon: Search,
  },
  {
    id: 11,
    time: "Oct 10, 4:45PM",
    title: "Workshop Session 3",
    description: "Exploring AI Ethics and Responsible Innovation.",
    icon: Presentation,
  },
  {
    id: 12,
    time: "Oct 10, 5:30PM",
    title: "Evening Snacks",
    description: "Take a break and enjoy some snacks.",
    icon: Pizza,
  },
  {
    id: 13,
    time: "Oct 10, 6:00PM",
    title: "Project Showcase",
    description: "Share your workshop creations and get feedback.",
    icon: Trophy,
  },
  {
    id: 14,
    time: "Oct 10, 6:45PM",
    title: "Closing & Certificates",
    description: "Receive your participation certificate and club goodies!",
    icon: SmilePlusIcon,
  },
  {
    id: 15,
    time: "END-of-DAY",
    title: "CONCLUSION",
    description: "Thank you for joining the Gen AI Club Inauguration!",
    icon: Flag,
  },
];

// Background cloud data - small decorative clouds with no text
const backgroundClouds = [
  { size: "tiny", cloudType: "c1n", opacity: 0.4, delay: "0s" },
  { size: "tiny", cloudType: "c2n", opacity: 0.3, delay: "2.5s" },
  { size: "tiny", cloudType: "c3n", opacity: 0.5, delay: "1.5s" },
  { size: "small", cloudType: "c1n", opacity: 0.6, delay: "3s" },
  { size: "tiny", cloudType: "c2n", opacity: 0.4, delay: "0.7s" },
  { size: "small", cloudType: "c3n", opacity: 0.5, delay: "4s" },
  { size: "tiny", cloudType: "c1n", opacity: 0.3, delay: "2s" },
  { size: "tiny", cloudType: "c2n", opacity: 0.5, delay: "1s" },
  { size: "small", cloudType: "c3n", opacity: 0.6, delay: "3.5s" },
  { size: "tiny", cloudType: "c1n", opacity: 0.4, delay: "1.2s" },
];

// Generate random positions for background clouds
const generateCloudPositions = (isMobile = false) => {
  return backgroundClouds.map(() => ({
    horizontalPos: `${
      Math.random() * (isMobile ? 70 : 80) + (isMobile ? 15 : 10)
    }%`, // 15-85% horizontal on mobile, 10-90% on desktop
    verticalPos: `${Math.random() * (isMobile ? 40 : 60) + 5}%`, // 5-45% vertical on mobile (more compact), 5-65% on desktop
    wiggleIntensity: ["gentle", "medium", "intense"][
      Math.floor(Math.random() * 3)
    ],
  }));
};

const TimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Generate cloud positions once, with responsive layout
  const cloudPositions = React.useMemo(
    () => generateCloudPositions(isMobile),
    [isMobile]
  );

  // Framer Motion hook to track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"], // Animate from when top hits center to when bottom hits center
  });

  // Map scroll progress (0 to 1) to the scaleY of the gradient line
  const gradientScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="event-timeline" // Change from "timeline" to "event-timeline" to match navbar link
      className="relative w-full py-16 sm:py-20 md:py-32 px-3 sm:px-4 md:px-6 z-10 overflow-hidden"
      ref={containerRef}
    >
      {/* Sky gradient background - from dark blue (#2C77D1) to white */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2C77D1] via-[#5c9fc0] to-[#f2f5b6] -z-10" />

      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] -z-5" />

      {/* Background clouds - more spaced out and fewer on mobile */}
      {backgroundClouds.map((cloud, index) => {
        // Skip some clouds on mobile to reduce visual clutter
        if (isMobile && index % 2 === 0 && index > 2) return null;

        const position = cloudPositions[index];
        if (!position) return null;

        return (
          <div
            key={`bg-cloud-${index}`}
            className="absolute z-0"
            style={{
              left: position.horizontalPos,
              top: position.verticalPos,
              opacity: cloud.opacity * (isMobile ? 0.8 : 1), // Slightly more transparent on mobile
            }}
          >
            <Cloud
              size={cloud.size as "tiny" | "small" | "medium" | "large"}
              zIndex={1}
              cloudType={cloud.cloudType}
              layer="background"
              horizontalPos={position.horizontalPos}
              verticalPos={position.verticalPos}
              wiggleIntensity={
                position.wiggleIntensity as "gentle" | "medium" | "intense"
              }
              opacity={cloud.opacity * (isMobile ? 0.8 : 1)}
              hoverDelay="0s"
            />
          </div>
        );
      })}

      {/* Section heading - smaller padding on mobile */}
      <div className="container relative mx-auto text-center mb-10 sm:mb-12 md:mb-16 lg:mb-24 z-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-major-mono drop-shadow-lg">
          InAuGuRaTIOn TImelInE
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-purple-200 mt-2 sm:mt-4 max-w-2xl mx-auto font-silkscreen drop-shadow">
          The journey from registration to celebration
        </p>
      </div>

      {/* Timeline Container - narrower on mobile for better visibility */}
      <div className="relative w-full max-w-md sm:max-w-xl md:max-w-3xl mx-auto z-20">
        {/* Background Line - moved to left side on mobile */}
        <div
          className={`absolute ${
            isMobile ? "left-[10%]" : "left-1/2"
          } top-0 bottom-0 w-0.5 sm:w-1 bg-white/30 rounded-full ${
            isMobile ? "-translate-x-1/2" : "-translate-x-1/2"
          }`}
        ></div>

        {/* Gradient Line (Animated) - moved to left side on mobile */}
        <motion.div
          className={`absolute ${
            isMobile ? "left-[10%]" : "left-1/2"
          } top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 rounded-full ${
            isMobile ? "-translate-x-1/2" : "-translate-x-1/2"
          } origin-top`}
          style={{ scaleY: gradientScaleY }} // Animate scaleY based on scroll
        />

        {/* Timeline Items - smaller vertical spacing on mobile */}
        <div className="relative flex flex-col items-center z-30 space-y-4 sm:space-y-5 md:space-y-6">
          {timelineData.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              isLeft={index % 2 === 0} // Alternate left/right based on index
              nodeIndex={index} // Pass the index as nodeIndex
            />
          ))}
        </div>
      </div>

      {/* Bottom decorative element to transition to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-28 md:h-32 bg-gradient-to-t from-white to-transparent -z-5" />
    </section>
  );
};

export default TimelineSection;
