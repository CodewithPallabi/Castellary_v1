"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DesignTokens } from '@/lib/theme/tokens';

interface GlassKeepPanelProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  borderVariant?: 'subtle' | 'highlight' | 'none';
}

export default function GlassKeepPanel({
  children,
  borderVariant = 'subtle',
  className,
  ...props
}: GlassKeepPanelProps) {
  const borderStyle =
    borderVariant === 'subtle'
      ? `border ${DesignTokens.colors.keepBorder}`
      : borderVariant === 'highlight'
      ? 'border border-yellow-500/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
      : '';

  return (
    <motion.div
      {...props}
      className={twMerge(
        clsx(
          "relative overflow-hidden backdrop-blur-md rounded-lg p-6 bg-opacity-60",
          borderStyle,
          className
        )
      )}
      style={{
        backgroundColor: 'var(--color-keep-glass)',
        ...props.style,
      }}
    >
      {children}
    </motion.div>
  );
}
export type GlassKeepPanelType = typeof GlassKeepPanel;
