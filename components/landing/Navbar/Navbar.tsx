"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface NavbarProps {
  showNavbar: boolean;
  onHome: () => void;
  onCovenants: () => void;
  onGetStarted: () => void;
}

export default function Navbar({ showNavbar, onHome, onCovenants, onGetStarted }: NavbarProps) {
  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.header
          initial={{ y: -88, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -88, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-40 h-[88px] px-[72px] flex items-center justify-between pointer-events-auto bg-gradient-to-b from-black/80 to-transparent"
        >
          {/* Upper left spacer for the morphing logo */}
          <div className="w-[180px]" />

          {/* Navigation Links */}
          <nav className="flex items-center gap-12 text-[14px] uppercase tracking-[0.25em] font-medium text-keep-muted font-keep-display">
            <span 
              onClick={onHome} 
              className="hover:text-white transition-all cursor-pointer hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            >
              Home
            </span>
            <span 
              onClick={onCovenants} 
              className="hover:text-white transition-all cursor-pointer hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            >
              Covenants
            </span>
            <button 
              onClick={onGetStarted}
              className="px-8 py-3 rounded-full border border-keep-primary/50 hover:border-keep-primary text-keep-primary hover:text-white hover:bg-keep-primary/10 transition-all text-[12px] font-bold tracking-[0.2em] uppercase"
            >
              Get Started
            </button>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
export type NavbarType = typeof Navbar;
