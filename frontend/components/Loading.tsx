"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Logo from "./logo";


export default function Loading() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      {/* Logo */}
      <div className="mb-8">
        <Logo size = {16} iconSize = {10} />
      </div>

      {/* Loader */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="p-3 rounded-full  "
      >
        <Loader2 className="w-12 h-12 text-blue-600" />
      </motion.div>

     
    </div>
  );
}
