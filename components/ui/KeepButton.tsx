"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioController } from '@/hooks/useAudioController';
import { MicroAnimations } from '@/lib/motion/micro';
import { DesignTokens } from '@/lib/theme/tokens';

interface KeepButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  isLoading?: boolean;
}

export default function KeepButton({
  children,
  variant = 'primary',
  isLoading = false,
  className,
  ...props
}: KeepButtonProps) {
  const { playClick, playHover } = useAudioController();

  const variantStyles =
    variant === 'primary'
      ? `bg-opacity-20 hover:bg-opacity-35 text-white border ${DesignTokens.colors.keepBorder}`
      : variant === 'secondary'
      ? 'border border-transparent bg-transparent hover:bg-white/5 text-gray-400 hover:text-white'
      : `bg-yellow-500/20 hover:bg-yellow-500/35 text-yellow-300 border border-yellow-500/40`;

  return (
    <motion.button
      {...props}
      whileHover={MicroAnimations.buttonHover}
      whileTap={MicroAnimations.buttonTap}
      onMouseEnter={(e) => {
        playHover();
        if (props.onMouseEnter) props.onMouseEnter(e);
      }}
      onClick={(e) => {
        playClick();
        if (props.onClick) props.onClick(e);
      }}
      className={twMerge(
        clsx(
          "relative flex items-center justify-center font-semibold tracking-wide uppercase transition-colors px-6 py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles,
          className
        )
      )}
      style={{
        fontFamily: 'var(--font-keep-display)',
        ...props.style,
      }}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </motion.button>
  );
}
export type KeepButtonType = typeof KeepButton;
