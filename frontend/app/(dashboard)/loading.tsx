"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Glowing Orb */}
      <motion.div
        className="relative h-24 w-24 rounded-full bg-gradient-to-tr from-blue-400 via-blue-500 to-blue-600 shadow-2xl"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
          boxShadow: [
            "0 0 20px rgba(59,130,246,0.6)",
            "0 0 40px rgba(59,130,246,0.8)",
            "0 0 20px rgba(59,130,246,0.6)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner Pulse */}
        <motion.div
          className="absolute inset-2 rounded-full bg-blue-200"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Text */}
      <motion.div
        className="absolute bottom-20 text-xl font-semibold text-blue-700"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading your experience...
      </motion.div>
    </div>
  );
}
