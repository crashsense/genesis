"use client";

import { motion } from "framer-motion";

interface FusionInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  side: "left" | "right";
  disabled?: boolean;
}

export default function FusionInput({
  label,
  value,
  onChange,
  placeholder,
  side,
  disabled = false,
}: FusionInputProps) {
  const gradientDirection = side === "left" ? "from-indigo-500/20 to-purple-500/20" : "from-purple-500/20 to-pink-500/20";
  const borderColor = side === "left" ? "focus:border-indigo-500/50" : "focus:border-pink-500/50";
  const glowColor = side === "left" ? "focus:shadow-indigo-500/20" : "focus:shadow-pink-500/20";

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: side === "left" ? 0.2 : 0.3 }}
      className="flex-1 min-w-0"
    >
      <label className="block text-sm font-medium text-gray-400 mb-3 tracking-wide uppercase">
        {label}
      </label>
      <div className={`relative rounded-2xl bg-gradient-to-br ${gradientDirection} p-[1px]`}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-6 py-5 rounded-2xl
            bg-[#0a0520] text-white text-lg
            placeholder:text-gray-600
            border border-white/5
            ${borderColor}
            outline-none
            transition-all duration-300
            focus:shadow-lg ${glowColor}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        />
        {value && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute top-3 right-3 w-2 h-2 rounded-full ${
              side === "left" ? "bg-indigo-400" : "bg-pink-400"
            }`}
          />
        )}
      </div>
    </motion.div>
  );
}
