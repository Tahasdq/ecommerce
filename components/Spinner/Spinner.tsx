"use client";

import React from "react";
import { Loader2 } from "lucide-react"; // ShadCN uses lucide icons

interface SpinnerProps {
  size?: number; // size in px
  color?: string; // tailwind color
  text?: string; // optional loading text
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 40,
  color = "text-blue-600",
  text,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2
        className={`animate-spin ${color}`}
        size={size}
      />
      {text && <span className="mt-2 text-gray-700">{text}</span>}
    </div>
  );
};

export default Spinner;
