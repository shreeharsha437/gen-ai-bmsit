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
    <footer className="relative w-full h-[200px] overflow-hidden">
      {/* Background gradients and patterns */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #05051a 0%, #0a0b25 50%, #0c1445 100%)",
        }}
      >
        {/* Add any background patterns you want to keep */}
      </div>

      {/* Simple copyright text */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Shreeharsha. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterImg;
