"use client";

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Quest } from '@/types';
import QuestCard from './QuestCard';
import GlassKeepPanel from '../ui/GlassKeepPanel';
import { Shield, Swords, ShieldAlert } from 'lucide-react';

interface QuestColumnProps {
  id: 'todo' | 'inprogress' | 'done';
  title: string;
  quests: Quest[];
  onOpenDetails: (quest: Quest) => void;
}

export default function QuestColumn({ id, title, quests, onOpenDetails }: QuestColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id
  });

  const getHeaderIcon = (columnId: string) => {
    switch (columnId) {
      case 'todo': return ShieldAlert;
      case 'inprogress': return Swords;
      case 'done': return Shield;
      default: return Shield;
    }
  };

  const Icon = getHeaderIcon(id);

  const columnBg = isOver 
    ? 'border-keep-primary/30 bg-keep-primary/[0.02]' 
    : 'border-keep-border bg-keep-glass';

  return (
    <div className="flex flex-col gap-4 w-full h-[550px]">
      {/* Column Header */}
      <GlassKeepPanel className="px-4 py-3 flex items-center justify-between border border-keep-border bg-keep-glass shadow-sm">
        <div className="flex items-center gap-2.5">
          <Icon className={`w-4 h-4 ${id === 'done' ? 'text-keep-success' : id === 'inprogress' ? 'text-keep-accent' : 'text-keep-danger'}`} />
          <h4 className="text-xs uppercase font-extrabold tracking-wider font-keep-display text-white">
            {title}
          </h4>
        </div>
        <span className="text-[10px] font-bold text-keep-primary bg-keep-primary/5 px-2 py-0.5 rounded border border-keep-border">
          {quests.length}
        </span>
      </GlassKeepPanel>

      {/* Droppable cards lists */}
      <div
        ref={setNodeRef}
        className={`flex-grow rounded border p-3 flex flex-col gap-3 overflow-y-auto no-scrollbar transition-all ${columnBg}`}
      >
        {quests.length === 0 ? (
          <div className="flex-grow flex items-center justify-center text-xs text-keep-muted italic select-none">
            No active quests.
          </div>
        ) : (
          quests.map((q) => (
            <QuestCard key={q.id} quest={q} onOpenDetails={onOpenDetails} />
          ))
        )}
      </div>
    </div>
  );
}
export type QuestColumnType = typeof QuestColumn;
