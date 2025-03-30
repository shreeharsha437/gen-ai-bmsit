// // Example: Place this inside components/TimelineSection.tsx or import it

// import {
//   CalendarCheck,
//   ClipboardList,
//   Users,
//   Flag,
//   Code,
//   Utensils,
//   Search,
//   Coffee,
//   Pizza,
//   Gamepad2,
//   Moon,
//   Sunrise,
//   Presentation,
//   Trophy,
//   PartyPopper,
//   LucideIcon, // Import the type
// } from "lucide-react";

// interface TimelineEvent {
//   id: number;
//   time: string; // Or Date object if needed
//   title: string;
//   description: string;
//   icon: LucideIcon; // Use the imported type
// }

// const timelineData: TimelineEvent[] = [
//   {
//     id: 1,
//     time: "Apr 1",
//     title: "Registration Opens",
//     description: "Sign up your teams and get ready!",
//     icon: ClipboardList,
//   },
//   {
//     id: 2,
//     time: "Apr 30",
//     title: "Registration Closes",
//     description: "Last chance to register for Brinhack!",
//     icon: CalendarCheck,
//   },
//   {
//     id: 3,
//     time: "May 1",
//     title: "Teams Announced",
//     description: "Check your email & WhatsApp!",
//     icon: Users,
//   },
//   {
//     id: 4,
//     time: "May 10, 9AM",
//     title: "On-site Check-in",
//     description: "Arrive, check in, get your kits.",
//     icon: Flag,
//   },
//   {
//     id: 5,
//     time: "May 10, 10AM",
//     title: "Inauguration",
//     description: "Official kickoff ceremony.",
//     icon: PartyPopper,
//   },
//   {
//     id: 6,
//     time: "May 10, 11AM",
//     title: "Hackathon Begins!",
//     description: "Start coding!",
//     icon: Code,
//   },
//   {
//     id: 7,
//     time: "May 10, 12:30PM",
//     title: "Lunch",
//     description: "Refuel your energy.",
//     icon: Utensils,
//   },
//   {
//     id: 8,
//     time: "May 10, 1:45PM",
//     title: "First Review",
//     description: "Mentors check initial progress.",
//     icon: Search,
//   },
//   {
//     id: 9,
//     time: "May 10, 6PM",
//     title: "Evening Snacks",
//     description: "Quick break and snacks.",
//     icon: Coffee,
//   },
//   {
//     id: 10,
//     time: "May 10, 9:30PM",
//     title: "Dinner",
//     description: "Evening meal to keep going.",
//     icon: Pizza,
//   },
//   {
//     id: 11,
//     time: "May 10, 11PM",
//     title: "Side Quest",
//     description: "Fun challenge for extra prizes!",
//     icon: Gamepad2,
//   },
//   {
//     id: 12,
//     time: "May 11, 1:45AM",
//     title: "Cool Down / Hacking",
//     description: "Late night coding or take a break.",
//     icon: Moon,
//   },
//   {
//     id: 13,
//     time: "May 11, 8AM",
//     title: "Breakfast",
//     description: "Good morning! Time for breakfast.",
//     icon: Sunrise,
//   },
//   {
//     id: 14,
//     time: "May 11, 9AM",
//     title: "Final Review",
//     description: "Prepare for final submissions.",
//     icon: Presentation,
//   },
//   {
//     id: 15,
//     time: "May 11, 11AM",
//     title: "Hackathon Ends",
//     description: "Stop coding! Submit your projects.",
//     icon: Flag,
//   },
//   {
//     id: 16,
//     time: "May 11, 12:10PM",
//     title: "Final Presentations",
//     description: "Top teams present to judges.",
//     icon: Presentation,
//   },
//   {
//     id: 17,
//     time: "May 11, 2:15PM",
//     title: "Prize Distribution",
//     description: "Announcing the winners!",
//     icon: Trophy,
//   },
// ];

"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TimelineItem from "./TimelineItem"; // Import the item component

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
  SmilePlusIcon, // Import the type
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

const TimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion hook to track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"], // Animate from when top hits center to when bottom hits center
  });

  // Map scroll progress (0 to 1) to the scaleY of the gradient line
  const gradientScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="timeline"
      className="relative z-10 w-full py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-transparent to-green-900/20" // Subtle bg transition
      ref={containerRef} // Attach the ref here
    >
      <div className="container mx-auto text-center mb-16 md:mb-24">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[var(--font-major-mono)]">
          Hackathon Timeline
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative w-full max-w-3xl mx-auto">
        {/* Background Line (Grey) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-600/50 rounded-full -translate-x-1/2"></div>

        {/* Gradient Line (Animated) */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 rounded-full -translate-x-1/2 origin-top"
          style={{ scaleY: gradientScaleY }} // Animate scaleY based on scroll
        />

        {/* Timeline Items */}
        <div className="relative flex flex-col items-center">
          {timelineData.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              isLeft={index % 2 === 0} // Alternate left/right based on index
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
