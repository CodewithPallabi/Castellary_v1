"use client";

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface RealmDividerProps {
  className?: string;
}

export default function RealmDivider({ className }: RealmDividerProps) {
  return (
    <div className={twMerge(clsx("relative w-full flex items-center justify-center py-4", className))}>
      {/* Left Line */}
      <div
        className="flex-grow h-[1px]"
        style={{
          background: `linear-gradient(to right, transparent, var(--color-keep-primary))`
        }}
      />

      {/* Ornate Center Jewel */}
      <svg
        className="w-8 h-8 mx-4 animate-pulse"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L4 12L12 22L20 12L12 2Z"
          fill="none"
          stroke="var(--color-keep-primary)"
          strokeWidth="1.5"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          fill="var(--color-keep-primary)"
        />
      </svg>

      {/* Right Line */}
      <div
        className="flex-grow h-[1px]"
        style={{
          background: `linear-gradient(to left, transparent, var(--color-keep-primary))`
        }}
      />
    </div>
  );
}
export type RealmDividerType = typeof RealmDivider;
