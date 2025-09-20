"use client";

import React, { useMemo } from "react";

const BuildingComponent: React.FC = () => {
  const buildingStyle = {
    building: "from-slate-700 via-slate-600 to-slate-500",
    accent: "border-slate-300",
  };

  const buildingSize = {
    building:
      "w-[65px] sm:w-[85px] md:w-[110px] lg:w-[140px] h-[130px] sm:h-[170px] md:h-[220px] lg:h-[280px]",
    floors: 8,
    antenna: true,
  };

  const floorPatterns = useMemo(() => {
    return [...Array(buildingSize.floors)].map(() => ({
      color: Math.random() > 0.5 ? "bg-blue-400/70" : "bg-gray-300/70",
      pattern: [...Array(3)].map(() => Math.random() > 0.3),
    }));
  }, []);

  return (
    <div className={`relative ${buildingSize.building}`}>
      <div
        className={`absolute inset-0 bg-gradient-to-t ${buildingStyle.building} rounded-t-sm
                    border-t-2 border-x-2 ${buildingStyle.accent} shadow-lg`}
      >
        {floorPatterns.map((floor, floorIndex) => (
          <div
            key={floorIndex}
            className={`absolute w-full h-[12%] border-b border-b-slate-700/50`}
            style={{ bottom: `${floorIndex * 12}%` }}
          >
            <div className="flex justify-around items-center h-full px-1.5">
              {floor.pattern.map((isLit, i) => (
                <div
                  key={i}
                  className={`${floor.color} h-[70%] w-[28%] rounded-sm 
                            ${isLit ? "opacity-100" : "opacity-20"}
                            border-2 shadow-inner`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingComponent;
