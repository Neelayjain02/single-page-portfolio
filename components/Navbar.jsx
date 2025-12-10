"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Spacer so content isn't hidden behind fixed navbar */}
      <div className="h-16" />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full flex items-center justify-between px-6 py-5 md:px-10 lg:px-16 bg-[#0F0F0F]/95 backdrop-blur-md border-b border-[#FFA500]/20 fixed top-0 z-50"
      >
        {/* Logo */}
        <motion.a
          href="#hero"
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(0,240,255,0.3)",
                "0 0 40px rgba(0,240,255,0.6)",
                "0 0 20px rgba(0,240,255,0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFA500] text-xs font-bold text-[#05060A]"
          >
            NJ
          </motion.div>
          <motion.span
            className="text-sm font-semibold tracking-wide text-[#E0E4EB]"
            whileHover={{ letterSpacing: "0.1em" }}
          >
            Neelay Jain
          </motion.span>
        </motion.a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#CBD2E0]">
          {navLinks.map((link, idx) => (
            <motion.div
              key={link.href}
              className="relative"
              onMouseEnter={() => setHoveredLink(idx)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <a href={link.href} className="relative py-2 px-1">
                <motion.span
                  animate={{
                    color: hoveredLink === idx ? "#FFA500" : "#e0d8cb",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.span>

                {/* underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FFA500] to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredLink === idx ? "100%" : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* glow */}
                <motion.div
                  className="absolute -inset-2 rounded-lg bg-gradient-to-r from-[#FFA500]/20 to-transparent pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredLink === idx ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </a>
            </motion.div>
          ))}
        </nav>

        {/* Desktop CV button */}
        <motion.a
          href="/Neelay-Jain-CV.pdf"
          download
          className="hidden md:block rounded-full border border-[#323A46] bg-[#0E1118] px-4 py-2 text-xs font-semibold text-[#E0E4EB] shadow-sm relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#FFA500] to-[#FF6B6B]"
            initial={{ x: "100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.4 }}
          />
          <span className="relative flex items-center gap-2">
            Download CV
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </span>
        </motion.a>

        {/* Mobile menu button */}
        <motion.button
          className="md:hidden text-[#E0E4EB] cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </motion.button>

        {/* Mobile menu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : -20,
          }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 right-0 md:hidden bg-[#080A10]/95 backdrop-blur-md border-b border-[#1c2530]"
        >
          <nav className="flex flex-col items-center gap-2 text-sm text-[#CBD2E0] p-6">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : -20,
                }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="w-full"
              >
                <a
                  href={link.href}
                  className="block w-full text-center py-3 px-4 rounded-lg hover:bg-[#FFA500]/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <motion.span
                    whileHover={{ color: "#FFA500" }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.span>
                </a>
              </motion.div>
            ))}

            <motion.a
              href="/Neelay-Jain-CV.pdf"
              download
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                x: isOpen ? 0 : -20,
              }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-full mt-2 rounded-full border border-[#323A46] bg-[#0E1118] px-4 py-2 text-xs font-semibold text-[#E0E4EB] text-center hover:border-[#FFA500] transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
            >
              Download CV
            </motion.a>
          </nav>
        </motion.div>
      </motion.header>
    </>
  );
}
