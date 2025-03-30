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
    time: "Apr 1",
    title: "Registration Opens",
    description: "Sign up your teams and get ready!",
    icon: ClipboardList,
  },
  {
    id: 2,
    time: "Apr 30",
    title: "Registration Closes",
    description: "Last chance to register for Brinhack!",
    icon: CalendarCheck,
  },
  {
    id: 3,
    time: "May 1",
    title: "Teams Announced",
    description: "Check your email & WhatsApp!",
    icon: Users,
  },
  {
    id: 4,
    time: "May 10, 9AM",
    title: "On-site Check-in",
    description: "Arrive, check in, get your kits.",
    icon: Flag,
  },
  {
    id: 5,
    time: "May 10, 10AM",
    title: "Inauguration",
    description: "Official kickoff ceremony.",
    icon: PartyPopper,
  },
  {
    id: 6,
    time: "May 10, 11AM",
    title: "Hackathon Begins!",
    description: "Start coding!",
    icon: Code,
  },
  {
    id: 7,
    time: "May 10, 12:30PM",
    title: "Lunch",
    description: "Refuel your energy.",
    icon: Utensils,
  },
  {
    id: 8,
    time: "May 10, 1:45PM",
    title: "First Review",
    description: "Mentors check initial progress.",
    icon: Search,
  },
  {
    id: 9,
    time: "May 10, 6PM",
    title: "Evening Snacks",
    description: "Quick break and snacks.",
    icon: Coffee,
  },
  {
    id: 10,
    time: "May 10, 9:30PM",
    title: "Dinner",
    description: "Evening meal to keep going.",
    icon: Pizza,
  },
  {
    id: 11,
    time: "May 10, 11PM",
    title: "Side Quest",
    description: "Fun challenge for extra prizes!",
    icon: Gamepad2,
  },
  {
    id: 12,
    time: "May 11, 1:45AM",
    title: "Cool Down / Hacking",
    description: "Late night coding or take a break.",
    icon: Moon,
  },
  {
    id: 13,
    time: "May 11, 8AM",
    title: "Breakfast",
    description: "Good morning! Time for breakfast.",
    icon: Sunrise,
  },
  {
    id: 14,
    time: "May 11, 9AM",
    title: "Final Review",
    description: "Prepare for final submissions.",
    icon: Presentation,
  },
  {
    id: 15,
    time: "May 11, 11AM",
    title: "Hackathon Ends",
    description: "Stop coding! Submit your projects.",
    icon: Flag,
  },
  {
    id: 16,
    time: "May 11, 12:10PM",
    title: "Final Presentations",
    description: "Top teams present to judges.",
    icon: Presentation,
  },
  {
    id: 17,
    time: "May 11, 2:15PM",
    title: "Prize Distribution",
    description: "Announcing the winners!",
    icon: Trophy,
  },
  {
    id: 18,
    time: "END-of-TIME",
    title: "CONCLUSION",
    description: "Thats all folks!",
    icon: SmilePlusIcon,
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
          HaCkAthOn TImelInE
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-purple-200 mt-2 sm:mt-4 max-w-2xl mx-auto font-silkscreen drop-shadow">
          The journey from registration to celebration
        </p>
      </div>

      {/* Timeline Container - narrower on mobile for better visibility */}
      <div className="relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto z-20">
        {/* Background Line (Semi-transparent) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/30 rounded-full -translate-x-1/2"></div>

        {/* Gradient Line (Animated) */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 rounded-full -translate-x-1/2 origin-top"
          style={{ scaleY: gradientScaleY }} // Animate scaleY based on scroll
        />

        {/* Timeline Items - smaller vertical spacing on mobile */}
        <div className="relative flex flex-col items-center z-30 space-y-6 sm:space-y-4 md:space-y-4">
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
