"use client";

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Quest } from '@/types';
import { Crown, Wand2, Sword, User, Clock } from 'lucide-react';
import GlassKeepPanel from '../ui/GlassKeepPanel';

interface QuestCardProps {
  quest: Quest;
  onOpenDetails: (quest: Quest) => void;
}

export default function QuestCard({ quest, onOpenDetails }: QuestCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: quest.id
  });

  const getRoleIcon = (roleClass: string) => {
    switch (roleClass) {
      case 'king': return Crown;
      case 'mage': return Wand2;
      case 'knight': return Sword;
      default: return User;
    }
  };

  const RoleIcon = getRoleIcon(quest.ownerClass);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'text-keep-success border-keep-success/25 bg-keep-success/5';
      case 'medium': return 'text-keep-primary border-keep-primary/25 bg-keep-primary/5';
      case 'hard': return 'text-keep-danger border-keep-danger/25 bg-keep-danger/5';
      default: return 'text-keep-muted border-keep-border bg-keep-primary/5';
    }
  };

  const difficultyStyle = getDifficultyColor(quest.difficulty);

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.35 : 1,
    zIndex: isDragging ? 50 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab active:cursor-grabbing touch-none select-none"
    >
      <GlassKeepPanel 
        className={`p-4 border flex flex-col gap-3 hover:border-keep-primary/45 transition-all bg-black/60 shadow-md ${
          quest.difficulty === 'hard' ? 'border-red-500/10' : quest.difficulty === 'medium' ? 'border-blue-500/10' : 'border-green-500/10'
        }`}
      >
        {/* Card Header Info */}
        <div className="flex justify-between items-start gap-2">
          <h5 
            onClick={(e) => { e.stopPropagation(); onOpenDetails(quest); }}
            className="text-sm font-bold text-white hover:text-keep-primary transition-colors cursor-pointer leading-tight uppercase font-keep-display"
          >
            {quest.title}
          </h5>
          <div className="p-1 rounded bg-keep-primary/5 border border-keep-border shrink-0">
            <RoleIcon className="w-3.5 h-3.5 text-keep-accent" />
          </div>
        </div>

        {/* Card Description snippet */}
        <p className="text-xs text-keep-muted font-light leading-relaxed line-clamp-2">
          {quest.description}
        </p>

        {/* Card Footer badges */}
        <div className="flex justify-between items-center gap-2 mt-1 border-t border-keep-border pt-2 text-[9px] font-bold uppercase tracking-wider">
          
          {/* Difficulty Badge */}
          <span className={`px-2 py-0.5 rounded border ${difficultyStyle}`}>
            {quest.difficulty}
          </span>

          {/* Time/Priority badge */}
          <div className="flex items-center gap-1 text-keep-muted">
            <Clock className="w-3 h-3 text-keep-muted" />
            <span>{quest.estimatedHours}h</span>
          </div>

        </div>
      </GlassKeepPanel>
    </div>
  );
}
export type QuestCardType = typeof QuestCard;
