"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  variant?: 'primary' | 'success' | 'danger';
  className?: string;
}

export default function ProgressBar({
  value,
  max,
  label,
  variant = 'primary',
  className
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variantColors = {
    primary: 'var(--color-keep-primary)',
    success: 'var(--color-keep-success)',
    danger: 'var(--color-keep-danger)'
  };

  return (
    <div className={twMerge(clsx("w-full flex flex-col gap-1.5", className))}>
      {label || label === '' ? (
        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-keep-muted" style={{ color: 'var(--color-keep-muted)', fontFamily: 'var(--font-keep-display)' }}>
          <span>{label}</span>
          <span>{value}/{max} ({Math.round(percentage)}%)</span>
        </div>
      ) : null}
      
      {/* Progress Track */}
      <div 
        className="w-full h-3 rounded-full overflow-hidden border bg-black/40"
        style={{ borderColor: 'var(--color-keep-border)' }}
      >
        {/* Animated Fill Layer */}
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            backgroundColor: variantColors[variant],
            boxShadow: `0 0 8px ${variantColors[variant]}80`
          }}
        />
      </div>
    </div>
  );
}
