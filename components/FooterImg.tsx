import React, { useState, useEffect } from "react";
import Image from "next/image";

const FooterImg: React.FC = () => {
  const [stars, setStars] = useState<
    Array<{ x: number; y: number; size: number; delay: number }>
  >([]);
  const [hoverEffect, setHoverEffect] = useState(false);
  const [pixelIndex, setPixelIndex] = useState(-1);

  useEffect(() => {
    const starArray = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 3,
    }));
    setStars(starArray);
  }, []);

  return (
    <footer className="relative w-full overflow-hidden">
      {/* Pixel Mountain Skyline */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="h-32 relative">
          {/* Green gradient from previous section */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #4a5f28, #4c6028, transparent)",
            }}
          ></div>

          {/* Pixel Mountains */}
          <svg
            className="absolute bottom-0 w-full h-24"
            preserveAspectRatio="none"
            viewBox="0 0 1000 120"
          >
            <path
              d="M0,100 L50,70 L100,90 L150,40 L200,60 L250,30 L300,50 L350,20 L400,50 L450,10 L500,40 L550,20 L600,50 L650,30 L700,60 L750,40 L800,70 L850,50 L900,80 L950,60 L1000,100 L1000,120 L0,120 Z"
              fill="#375018"
              style={{ filter: "drop-shadow(0 -4px 3px rgba(0,0,0,0.2))" }}
            />
            <path
              d="M0,100 L60,85 L120,95 L180,75 L240,90 L300,80 L360,95 L420,70 L480,90 L540,75 L600,85 L660,65 L720,80 L780,95 L840,75 L900,90 L960,85 L1000,90 L1000,120 L0,120 Z"
              fill="#2a3e10"
            />
          </svg>
        </div>
      </div>

      {/* Interactive Star Field */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
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

      {/* Footer Image with retrowave grid effect */}
      <div className="relative w-full h-[220px] md:h-[270px] lg:h-[320px] mt-16">
        <Image
          src="/footer.png"
          alt="BrinHack 2025 Footer"
          fill
          priority
          className="object-cover"
        />

        {/* Retrowave horizon line */}
        <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-[#120524] to-transparent z-10"></div>

        {/* Animated retrowave grid */}
        <div
          className="absolute inset-0 z-5"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(30, 30, 60, 0.6), rgba(60, 20, 80, 0.7))`,
            backgroundBlendMode: "multiply",
          }}
        ></div>

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

      {/* Pixel Computer Terminal */}
      <div className="absolute bottom-14 left-0 right-0 z-20 flex justify-center">
        <div
          className="w-[280px] md:w-[350px] relative mx-auto"
          onMouseEnter={() => setHoverEffect(true)}
          onMouseLeave={() => setHoverEffect(false)}
        >
          {/* Computer Frame */}
          <div className="bg-gray-900 border-4 border-gray-700 rounded-t-lg p-2 shadow-lg">
            {/* Screen */}
            <div
              className="bg-gray-800 p-3 rounded relative overflow-hidden"
              style={{
                boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.8)",
                background:
                  "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 2px)",
              }}
            >
              {/* Green scanline effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(transparent 50%, rgba(32, 128, 32, 0.2) 50%)",
                  backgroundSize: "100% 4px",
                  animation: "scanline 0.5s linear infinite",
                }}
              ></div>

              {/* Content */}
              <div className="text-left font-mono text-green-400 text-xs md:text-sm mb-2 flex items-center">
                <span className="animate-blink mr-1">_</span>
                <span className="typing-animation">BrinHack System v1.0</span>
              </div>

              <div className="flex items-center mb-1">
                <Image
                  src="/logo.png"
                  alt="BrinHack Logo"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <div className="flex items-center">
                  <span className="text-[#ff00c0] text-sm md:text-base font-silkscreen">
                    Brin
                  </span>
                  <span className="text-[#26bffd] text-sm md:text-base font-silkscreen">
                    HAck
                  </span>
                  <span className="text-yellow-400 text-sm md:text-base font-silkscreen ml-1">
                    2025
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-bitwise text-[10px] md:text-xs text-green-300">
                  © {new Date().getFullYear()} AskitEndo
                </p>
              </div>

              {/* Developer Profile Icon - Right Corner */}
              <div className="absolute top-12 right-2 group">
                <a
                  href="https://github.com/AskitEndo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-8 h-8 md:w-10 md:h-10 cursor-pointer transition-all duration-300 hover:scale-110"
                >
                  {/* Profile Image */}
                  <div className="absolute inset-0 rounded-full  overflow-hidden border border-green-400/50 group-hover:border-green-400 transition-all duration-300 group-hover:opacity-0">
                    <Image
                      src="/team/event-lead.jpg"
                      alt="Developer Profile"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover filter contrast-125 brightness-110"
                    />
                  </div>

                  {/* GitHub Icon - appears on hover */}
                  <div className="absolute inset-0 rounded-full bg-gray-800/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-green-400">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 md:w-6 md:h-6 text-green-400"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-green-400/20 scale-0 group-hover:scale-150 transition-transform duration-300 blur-sm"></div>
                </a>

                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-green-400 px-2 py-1 rounded text-[2px] md:text-[5px] font-bitwise opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-green-400/30">
                  @AskitEndo
                </div>
              </div>
            </div>
          </div>

          {/* Computer Base */}
          <div className="bg-gray-700 h-4 rounded-b-md relative">
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-gray-800"></div>

            {/* Keyboard */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-b-md">
              <div className="flex justify-around pt-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 bg-gray-600 rounded-sm ${
                      pixelIndex === i ? "bg-green-500" : ""
                    }`}
                    onMouseEnter={() => setPixelIndex(i)}
                    onMouseLeave={() => setPixelIndex(-1)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Pixel Art Row */}
      <div className="absolute bottom-0 left-0 right-0 h-10 z-30 bg-[#120524]">
        <div className="relative h-full">
          {/* Moving pixel blocks */}
          <div
            className="flex flex-nowrap absolute left-0 h-full"
            style={{ animation: "moveLeftToRight 30s linear infinite" }}
          >
            {[...Array(80)].map((_, i) => (
              <div
                key={i}
                className="h-full w-10 flex-shrink-0"
                style={{
                  background: `hsl(${(i * 20) % 360}, 70%, 60%)`,
                  opacity: 0.4,
                }}
              ></div>
            ))}
          </div>

          {/* Interactive pixel art */}
          <div className="flex justify-around w-full absolute inset-0 z-10">
            {[...Array(40)].map((_, i) => {
              const colors = ["#ff00c0", "#26bffd", "#ffc107", "#4ade80"];
              const color = colors[i % colors.length];

              return (
                <div
                  key={i}
                  className="pixel-block cursor-pointer transition-all duration-300 hover:scale-150 hover:-translate-y-2"
                  style={{
                    height: "8px",
                    width: "8px",
                    backgroundColor: color,
                    opacity: 0.8,
                    transform: `translateY(${i % 2 === 0 ? "-2px" : "0px"})`,
                    boxShadow: "0 0 4px currentColor",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 10px ${color}, 0 0 15px ${color}`;
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 4px currentColor";
                    e.currentTarget.style.opacity = "0.8";
                  }}
                ></div>
              );
            })}
          </div>

          {/* Copyright line */}
          <p className="absolute bottom-1 left-0 w-full text-center text-[10px] text-white/50 font-bitwise">
            © BrinHack 2025 Team
          </p>
        </div>
      </div>

      {/* Add keyframe animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes scanline {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4px);
          }
        }

        @keyframes grid-move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 1000px;
          }
        }

        @keyframes moveLeftToRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .typing-animation {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid transparent;
          animation: typing 3s steps(20, end) forwards,
            blink-caret 0.75s step-end infinite;
          width: 0;
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink-caret {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: #4ade80;
          }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </footer>
  );
};

export default FooterImg;
