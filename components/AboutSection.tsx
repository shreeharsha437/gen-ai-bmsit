"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  ExternalLink,
  Code,
  FileText,
  MessageSquare,
  Briefcase,
  Star,
  Users,
  Coffee,
  ChevronDown,
} from "lucide-react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const PixelButton: React.FC<{
  children: React.ReactNode;
  color: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}> = ({ children, color, href, onClick }) => {
  const baseClasses = `relative px-5 py-2.5 font-silkscreen text-sm border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all 
                       hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]`;

  const colorClasses = {
    blue: "bg-blue-600 border-blue-400 text-white hover:bg-blue-700",
    green: "bg-green-600 border-green-400 text-white hover:bg-green-700",
    yellow: "bg-yellow-600 border-yellow-400 text-black hover:bg-yellow-700",
    red: "bg-red-600 border-red-400 text-white hover:bg-red-700",
    purple: "bg-purple-600 border-purple-400 text-white hover:bg-purple-700",
  }[color];

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${colorClasses} inline-block`}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={`${baseClasses} ${colorClasses}`} onClick={onClick}>
      {children}
    </button>
  );
};

// Add this component for the flippable profile image
const FlippableProfileImage: React.FC<{
  frontImage: string;
  name: string;
  pokemonId: number;
}> = ({ frontImage, name, pokemonId }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-16 h-16 md:w-20 md:h-20 perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front side - Person's photo */}
        <div className="absolute inset-0 backface-hidden rounded-full overflow-hidden border-2 border-amber-600">
          <Image
            src={frontImage}
            alt={name}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Back side - Pokemon */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-full overflow-hidden border-2 border-amber-600 bg-gray-800">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
            alt="Pokemon"
            width={80}
            height={80}
            className="object-contain w-full h-full scale-125 p-1"
          />
        </div>
      </div>
    </div>
  );
};

// Add this component for the compact team member card
const CompactTeamMember: React.FC<{
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
  pokemonId: number;
}> = ({ name, role, quote, imageUrl, pokemonId }) => {
  return (
    <div className="flex items-center space-x-4 bg-gray-900/50 p-3 rounded-lg border border-amber-800/50">
      <FlippableProfileImage
        frontImage={imageUrl}
        name={name}
        pokemonId={pokemonId}
      />
      <div className="flex-1">
        <div className=" font-silkscreen text-lg text-amber-400 ">{role}</div>
        <h4 className=" font-silkscreen text-sm text-white">{name}</h4>
        <p className="text-gray-300 font-bitwise text-xs italic mt-1">
          &quot;{quote}&quot;
        </p>
      </div>
    </div>
  );
};

// Add this FAQ Accordion component before the AboutSection component definition

// Create a new FAQ component with animations
const FAQItem: React.FC<{
  question: string;
  answer: string | React.ReactNode;
}> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Animation variants for the content
  const contentVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="mb-3 border-2 border-amber-800/50 bg-gray-900/60">
      <button
        className="w-full p-3 flex justify-between items-center text-left font-silkscreen text-amber-200 hover:bg-gray-800/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-sm md:text-base">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={contentVariants}
        className="overflow-hidden"
      >
        <div
          className="p-3 pt-0 border-t border-amber-800/30 bg-gray-800/30 font-bitwise text-gray-300 text-sm"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 95%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-3"
          >
            {answer}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const faqs = [
  {
    question: "What kind of workshops does Gen AI Club conduct?",
    answer: "We conduct hands-on workshops on: \n- Large Language Models (LLMs) like GPT\n- Image Generation with DALL-E and Stable Diffusion\n- Prompt Engineering techniques\n- Fine-tuning and deployment of AI models\n- Building AI-powered applications"
  },
  {
    question: "What are the benefits of joining Gen AI Club?",
    answer: "Members get access to:\n- Weekly hands-on workshops\n- Industry expert sessions\n- Project mentorship\n- Collaboration opportunities\n- Access to computing resources\n- Certificate of participation"
  },
  {
    question: "When and where do club meetings happen?",
    answer: "We meet every Saturday from 2:00 PM to 4:00 PM in the CS Department Seminar Hall. Additional workshop sessions are announced through our Discord channel."
  },
  {
    question: "Are there any membership fees?",
    answer: "There is a nominal annual membership fee of ₹500 which covers workshop materials, cloud computing credits, and event organization costs."
  },
  {
    question: "What projects can I work on?",
    answer: "Members can work on various projects like:\n- Chatbots and virtual assistants\n- AI-powered web applications\n- Image and video generation tools\n- Text analysis and generation systems\n- Cross-domain AI applications"
  },
  {
    question: "How can I contact the club coordinators?",
    answer: "You can reach us through:\n- Email: genai.club@bmsit.in\n- Discord: discord.gg/genaiclub\n- Instagram: @bmsit_genaiclub\n- Or visit the CS Department office during college hours"
  }
];

const AboutSection: React.FC = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showWhatsappInfo, setShowWhatsappInfo] = useState(false);
  const [showEmailInfo, setShowEmailInfo] = useState(false);
  const [showInstagramInfo, setShowInstagramInfo] = useState(false);
  const [showDevfolioInfo, setShowDevfolioInfo] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({
    logo: false,
    banner: false,
  });

  const handleImageLoad = (imageName: string) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [imageName]: true,
    }));
  };

  return (
    <section
      id="about-section"
      className="relative z-10 w-full py-16 md:py-24 px-4 md:px-6 text-left overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #fefefc, #e9e9d9, #d6d5b9, #c3c29b, #b1b17e, #a2a468, #939955, #848f43, #788135, #6c7428, #60661c, #5c7531)",
        boxShadow: "inset 0 0 100px rgba(0,0,0,0.4)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#fefefc] to-transparent z-0"></div>

      <div className="container mx-auto relative z-10">
        {/* Sponsor ribbon at top */}
        {/* <div className="w-full mb-8 bg-green-700/80 -mt-4 py-2 px-4 text-center shadow-lg border-y-2 border-green-600">
          <p className="font-silkscreen text-white text-sm md:text-base">
            <span className="text-yellow-300">✦</span> We're looking for
            sponsors! Contact us to support innovation{" "}
            <span className="text-yellow-300">✦</span>
          </p>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left column - Logo and buttons */}
          <div className="flex flex-col items-center md:items-start">
            {/* Banner with background */}
            <div className="mb-8 relative w-full max-w-md">
              <div className="absolute inset-0 -m-2 bg-gray-900/70 rounded-lg blur"></div>
              <div className="relative bg-gray-900/60 p-4 rounded-lg border border-gray-600">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: imagesLoaded.banner ? 1 : 0,
                    y: imagesLoaded.banner ? 0 : 20,
                  }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Image
                    src="/banner.png"
                    alt="BrinHack Banner"
                    width={400}
                    height={100}
                    className="object-contain w-full"
                    priority
                    onLoad={() => handleImageLoad("banner")}
                  />
                </motion.div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
              
              
            </div>

            {/* Social Media Section */}
            <div className="mb-8">
              <h3 className="font-silkscreen text-white text-lg mb-4 text-center md:text-left border-b-2 border-purple-600 pb-1 inline-block">
                <MessageSquare className="inline-block mr-2 w-4 h-4" />
                Connect With Us
              </h3>

              <div className="flex justify-center md:justify-start space-x-4">
                {/* Gmail Icon */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowEmailInfo(true)}
                  onMouseLeave={() => setShowEmailInfo(false)}
                >
                  <a
                    href="mailto:to be updated"
                    className="block"
                  >
                    <div
                      className="w-12 h-12 bg-gray-800 border-2 border-red-500 hover:bg-gray-700 hover:border-red-400 
                               hover:shadow-[0_0_15px_rgba(239,68,68,0.6)] transition-all duration-300
                               flex items-center justify-center"
                      style={{
                        clipPath:
                          "polygon(0% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
                      }}
                    >
                      <Image
                        src="/gmail.png"
                        alt="Email"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  </a>
                  {showEmailInfo && (
                    <div className="absolute left-0 top-14 w-48 bg-gray-900 border-2 border-red-500 p-2 z-30 rounded-md">
                      <p className="font-silkscreen text-xs text-white mb-1 truncate">
                        Contact via Email:
                      </p>
                      <p className="font-bitwise text-xs text-red-300 truncate">
                        to be updated
                      </p>
                    </div>
                  )}
                </div>

                {/* WhatsApp Icon */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowWhatsappInfo(true)}
                  onMouseLeave={() => setShowWhatsappInfo(false)}
                >
                  <a
                    href="to be updated"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div
                      className="w-12 h-12 bg-gray-800 border-2 border-green-500 hover:bg-gray-700 hover:border-green-400 
              hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-300 cursor-pointer
              flex items-center justify-center"
                      style={{
                        clipPath:
                          "polygon(0% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
                      }}
                    >
                      <Image
                        src="/whatsapp.png"
                        alt="WhatsApp Community"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  </a>
                  {showWhatsappInfo && (
                    <div className="absolute left-0 top-14 w-48 bg-gray-900 border-2 border-green-500 p-2 z-30 rounded-md">
                      <p className="font-silkscreen text-xs text-white mb-1">
                        WhatsApp Community:
                      </p>
                      <p className="font-bitwise text-xs text-green-300">
                        Join our group for quick updates!
                      </p>
                    </div>
                  )}
                </div>

                {/* Instagram Icon */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowInstagramInfo(true)}
                  onMouseLeave={() => setShowInstagramInfo(false)}
                >
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div
                      className="w-12 h-12 bg-gray-800 border-2 border-purple-500 hover:bg-gray-700 hover:border-purple-400 
                               hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300
                               flex items-center justify-center"
                      style={{
                        clipPath:
                          "polygon(0% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
                      }}
                    >
                      <Image
                        src="/instagram.png"
                        alt="Instagram"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  </a>
                  {showInstagramInfo && (
                    <div className="absolute left-0 top-14 w-48 bg-gray-900 border-2 border-purple-500 p-2 z-30 rounded-md">
                      <p className="font-silkscreen text-xs text-white mb-1">
                        Instagram:
                      </p>
                      <p className="font-bitwise text-xs text-purple-300">
                        Follow 
                      </p>
                    </div>
                  )}
                </div>

                {/* DevFolio Icon */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowDevfolioInfo(true)}
                  onMouseLeave={() => setShowDevfolioInfo(false)}
                >
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div
                      className="w-12 h-12 bg-gray-800 border-2 border-blue-500 hover:bg-gray-700 hover:border-blue-400 
                               hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300
                               flex items-center justify-center"
                      style={{
                        clipPath:
                          "polygon(0% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
                      }}
                    >
                      <Image
                        src="/devfolio.png"
                        alt="Devfolio"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  </a>
                  {showDevfolioInfo && (
                    <div className="absolute left-0 top-14 w-48 bg-gray-900 border-2 border-blue-500 p-2 z-30 rounded-md">
                      <p className="font-silkscreen text-xs text-white mb-1">
                        Devfolio:
                      </p>
                      <p className="font-bitwise text-xs text-blue-300">
                        Official Devfolio page 
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Department Logo & Info */}
            <div
              className="p-4 bg-gray-900/50 border-2 border-blue-800/50 mb-6 w-full max-w-md mx-auto md:mx-0"
              style={{
                clipPath:
                  "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
              }}
            >
              <div className="flex items-center gap-4 mb-3">
                <Image
                  src="/iotlogo.png"
                  alt="Department of Computer Science Engineering"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <h3 className="font-silkscreen text-cyan-400 text-base md:text-lg leading-tight">
                  Department of Computer Science &amp; Engineering
                </h3>
              </div>
              <p className="text-gray-300 font-bitwise text-sm leading-relaxed">
                The Department of Computer Science &amp; Engineering at BMSIT&M is a center for excellence in computing, artificial intelligence, and research. Our department empowers students with strong technical foundations, hands-on experience, and opportunities to innovate in the rapidly evolving world of technology.
              </p>
            </div>

            {/* CEO Message Card - New Section
            <div className="mb-8">
              <h3 className="font-silkscreen text-white text-lg mb-4 text-center md:text-left border-b-2 border-purple-800 pb-1 inline-block">
                <span className="inline-block w-5 h-5 bg-purple-800 rounded-full mr-2 align-middle"></span>
                From Our CEO
              </h3>

              <div
                className="relative p-5 bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border-2 border-purple-500/50 mb-6"
                style={{
                  clipPath:
                    "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
                }}
              >
                {/* Background pattern for CEO card */}
            {/* <div className="absolute inset-0 bg-[url('/pixel-grid.png')] opacity-10 z-0"></div>

                {/* Subtle glowing effect */}
            {/*} <div className="absolute -inset-1 bg-purple-500/20 blur-md rounded-lg z-0"></div>

                <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      {/* CEO Image with premium border */}
            {/*} <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-purple-400 shadow-lg shadow-purple-500/30">
                        <Image
                          src="/team/ceo.png"
                          alt="Dr. Shruti Sharma"
                          width={112}
                          height={112}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Eevee Pokemon as companion in bottom right */}
            {/*}  <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-amber-900/40 border-2 border-amber-400 flex items-center justify-center overflow-hidden">
                        <Image
                          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"
                          alt="Eevee"
                          width={40}
                          height={40}
                          className="object-contain w-full h-full scale-125"
                        />
                      </div>
                    </div>

                    <h4 className="font-silkscreen text-amber-400 text-sm mt-3 text-center">
                      Dr. Shruti Sharma
                    </h4>
                    <span className="font-bitwise text-white/80 text-xs px-2 py-0.5 bg-purple-900/80 rounded-sm mt-1">
                      CEO
                    </span>
                  </div>

                  <div className="flex-1 mt-4 sm:mt-0">
                    <div className="relative">
                      {/* Decorative quote marks */}
            {/*}  <div className="absolute -top-6 -left-2 text-4xl text-purple-300/30 font-serif">
                        "
                      </div>
                      <div className="absolute -bottom-6 -right-2 text-4xl text-purple-300/30 font-serif">
                        "
                      </div>

                      <p className="text-white/90 font-bitwise text-sm italic leading-relaxed">
                        Innovation is not just about ideas—it's about nurturing
                        opportunities, challenging norms, and creating learning
                        ecosystems where young minds are empowered to lead
                        change.
                      </p>
                    </div>

                    {/* Pixel-style signature element */}
            {/*}  <div className="mt-4 text-right">
                      <div className="inline-block h-5 px-3 bg-purple-700/50 border border-purple-400">
                        <span className="font-silkscreen text-xs text-purple-200">
                          Dr. Shruti Sharma
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Team Section - Compact Version */}
            <div className="mb-8">
              <h3 className="font-silkscreen text-white text-lg mb-4 text-center md:text-left border-b-2 border-amber-600 pb-1 inline-block">
                <Users className="inline-block mr-2 w-4 h-4" />
                Team Behind Gen AI Club
              </h3>

              <div className="space-y-3 mt-4">
                {/* HOD Card */}
                <CompactTeamMember
                  name="DR Ravi Kumar B N"
                  role="Assistant Professor CSE department"
                  quote="Innovation is the ability to see change as an opportunity."
                  imageUrl="/team/hodic.webp"
                  pokemonId={113}
                />

                {/* Event Lead Card */}
                <CompactTeamMember
                  name="Ranjith Gowda"
                  role="President, Gen AI Club"
                  quote="I'm not a hero because I want your approval. I do it because I want to."
                  imageUrl="/team/event-lead.png"
                  pokemonId={381}
                />

                {/* Event Co-Lead Card */}
                <CompactTeamMember
                  name="Shreeharsha"
                  role="Technical Department"
                  quote="Domain Expansion"
                  imageUrl="/team/vcl.png"
                  pokemonId={4} // Charmander
                />

                {/* More Team Members Button */}
                <div className="text-center mt-4">
                  <Link href="/volunteers">
                    <button
                      className="font-silkscreen text-xs bg-gray-800 text-amber-400 px-3 py-1.5 border border-amber-700 hover:bg-gray-700 transition-colors rounded-sm flex items-center justify-center mx-auto"
                      style={{
                        clipPath:
                          "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
                      }}
                    >
                      <Users className="inline-block mr-1 w-3 h-3" />
                      View All Team Members
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - About text and map */}
          <div className="flex flex-col">
            {/* About Gen Ai */}
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="flex-shrink-0"></div>
                <h2 className="font-silkscreen text-xl md:text-2xl text-white inline-flex items-center bg-gray-800/50 px-4 py-1 rounded-md border-l-4 border-purple-600 overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Gen AI Club Logo"
                    width={35}
                    height={35}
                    className="object-contain"
                    onLoad={() => handleImageLoad("logo")}
                  />
                  <span>About </span>{" "}
                  <span className="text-[#ff00c0] ml-2">Gen</span>
                  <span className="text-[#26bffd]">AI</span>
                  <span className="text-yellow-400 ml-1">Club</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4 pl-2"
              >
                <p className="text-stone-650 font-bitwise text-sm leading-relaxed">
                  <span className="text-blue-500 font-bold">Gen AI Club</span>{" "}
                  is the{" "}
                  <span className="text-purple-800 font-bold">
                    premier Generative AI community
                  </span>{" "}
                  at BMS Institute of Technology & Management (BMSIT&M). Founded to foster innovation and hands-on learning in artificial intelligence, our club brings together passionate students to explore, build, and collaborate on cutting-edge AI projects.
                </p>

                <p className="text-stone-650 font-bitwise text-sm leading-relaxed">
                  Our mission is to empower students with practical AI skills, encourage creative problem-solving, and nurture the next generation of AI leaders. Through workshops, seminars, and collaborative projects, we provide a platform for students to transform ideas into impactful solutions.
                </p>

                <p className="text-stone-650 font-bitwise text-sm leading-relaxed">
                  As a vibrant and inclusive community, Gen AI Club at BMSIT&M is dedicated to creating opportunities for learning, networking, and growth. We strive to make AI accessible to all, regardless of background or experience level.
                </p>

                <p className="text-emerald-800 font-bitwise text-sm leading-relaxed">
                  <span className="text-green-800 font-bold border-b border-green-500 pb-0.5 px-1">
                    Interested in collaborating or supporting us?
                  </span>{" "}
                  Reach out to the Gen AI Club team or the Department of Computer Science at BMSIT&M for partnership and sponsorship opportunities.
                </p>
              </motion.div>
            </div>

            {/* BMSIT&M College */}
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-amber-700/30 to-transparent p-1 rounded-lg mb-4"
              >
                <div className="flex items-center gap-3 bg-gray-800/80 p-2 rounded">
                  <Image
                    src="/bmsit-logo.png"
                    alt="BMSIT&M Logo"
                    width={45}
                    height={45}
                    className="object-contain invert"
                    onLoad={() => handleImageLoad("logo")}
                  />
                  <h3 className="font-silkscreen text-xl md:text-2xl text-white">
                    BMS Institute of Technology & Management
                  </h3>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4 px-2"
              >
                <p className="text-amber-100 font-bitwise text-sm leading-relaxed">
                  Located in Yelahanka, Bengaluru, BMSIT&M is an autonomous institution affiliated to VTU, recognized by AICTE, and accredited with an 'A' grade by NAAC. Renowned for its academic excellence and vibrant campus life, BMSIT&M is a hub for innovation and technology-driven education.
                </p>
                <div className="flex items-center gap-3">
                  <PixelButton
                    color="green"
                    href="https://bmsit.ac.in/"
                  >
                    <ExternalLink className="w-4 h-4 inline-block mr-2" />
                    Visit College Website
                  </PixelButton>
                </div>
              </motion.div>
            </div>

            {/* Embedded Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-lg blur"></div>
              <div
                className="border-4 border-gray-700 bg-gray-800 p-1 relative z-10"
                style={{
                  clipPath:
                    "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
                }}
              >
                <div className="bg-gray-900 p-2">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-red-500 mr-2" />
                      <span className="font-silkscreen text-sm text-white">
                        BMS Institute of Technology & Management
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <iframe
                    src="https://maps.google.com/maps?q=BMS%20Institute%20of%20Technology%20and%20Management&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-64 border-none"
                    loading="lazy"
                    title="BMS Institute of Technology & Management"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <h3 className="font-silkscreen text-xl md:text-2xl text-white mb-4 border-b-2 border-amber-500 pb-2 inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-600 flex items-center justify-center rounded-full">
              <span className="text-black font-bold">?</span>
            </div>
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            <FAQItem
              question="What is Generative AI?"
              answer={
                <>
                  <p className="mb-2">
                    Generative AI refers to artificial intelligence systems that can create new content including:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    <li>
                      <span className="text-amber-400 font-semibold">Text:</span>{" "}
                      Stories, articles, code, and conversations
                    </li>
                    <li>
                      <span className="text-amber-400 font-semibold">Images:</span>{" "}
                      Artwork, designs, and visual content
                    </li>
                    <li>
                      <span className="text-amber-400 font-semibold">Audio:</span>{" "}
                      Music, voice, and sound effects
                    </li>
                  </ul>
                  <p>These AI models learn patterns from existing data to generate new, original content.</p>
                </>
              }
            />

            <FAQItem
              question="What activities does Gen AI Club organize?"
              answer={
                <>
                  <p className="mb-2">Our club organizes various activities including:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    <li>
                      <span className="text-amber-400 font-semibold">Workshops:</span>{" "}
                      Hands-on sessions with AI tools and frameworks
                    </li>
                    <li>
                      <span className="text-amber-400 font-semibold">Projects:</span>{" "}
                      Collaborative AI project development
                    </li>
                    <li>
                      <span className="text-amber-400 font-semibold">Talks:</span>{" "}
                      Guest lectures from industry experts
                    </li>
                    <li>
                      <span className="text-amber-400 font-semibold">Hackathons:</span>{" "}
                      AI-focused coding competitions
                    </li>
                  </ul>
                </>
              }
            />

            <FAQItem
              question="How can I join the Gen AI Club?"
              answer={
                <>
                  <p className="mb-2">
                    <span className="text-amber-400 font-semibold">Simple Steps:</span>
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    <li>Fill out the registration form on our website</li>
                    
                    <li>Join our Discord community</li>
                    <li>Attend the orientation session</li>
                  </ul>
                  <p>All BMSIT students are welcome to join!</p>
                </>
              }
            />

            <FAQItem
              question="What resources do members get access to?"
              answer={
                <>
                  <p className="mb-2">Members get access to:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    <li>
                      <span className="text-amber-400 font-semibold">Computing:</span>{" "}
                      Cloud credits and GPU access
                    </li>
                    <li>
                      <span className="text-amber-400 font-semibold">Learning:</span>{" "}
                      Premium AI course materials
                    </li>
                    <li>
                      <span className="text-amber-400 font-semibold">Tools:</span>{" "}
                      Professional AI development tools
                    </li>
                    <li>
                      <span className="text-amber-400 font-semibold">Support:</span>{" "}
                      Mentorship from seniors and faculty
                    </li>
                  </ul>
                </>
              }
            />
          </div>

          {/* Updated CTA button */}
          <div className="mt-6 text-center">
            <PixelButton
              color="purple"
              href="mailto:genai.club@bmsit.in"
            >
              <MessageSquare className="w-4 h-4 inline-block mr-2" />
              Have more questions? Contact us!
            </PixelButton>
          </div>
        </motion.div>
      </div>

      {showComingSoon && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div
            className="bg-gray-900 border-4 border-purple-600 p-6 max-w-sm mx-auto rounded-lg"
            style={{
              clipPath:
                "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
            }}
          >
            <h3 className="font-silkscreen text-2xl text-purple-400 mb-4">
              Coming Soon!
            </h3>
            <p className="font-bitwise text-gray-300 mb-6">
              We're working on making this feature available. Stay tuned for
              updates!
            </p>
            <div className="text-center">
              <button
                onClick={() => setShowComingSoon(false)}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-silkscreen text-sm border-2 border-purple-500 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;
