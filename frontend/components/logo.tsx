import { Briefcase } from "lucide-react";
import React from "react";

type LogoProps = {
  size?: number; // outer square size (in tailwind rem units)
  iconSize?: number; // inner icon size
  className?: string; // optional extra classes
};

const Logo = ({ size = 10, iconSize = 5, className = "" }: LogoProps) => {
  return (
    <div
      className={`flex items-center justify-center rounded-md bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 shadow-sm w-${size} h-${size} ${className}`}
    >
      <Briefcase className={`text-white w-${iconSize} h-${iconSize}`} />
    </div>
  );
};

export default Logo;
