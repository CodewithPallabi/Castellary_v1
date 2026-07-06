"use client";

import React, { createContext, useContext, useState } from 'react';
import { DragStartEvent, DragEndEvent, Active } from '@dnd-kit/core';
import { useKingdomCampaign } from './KingdomCampaignContext';
import { QuestStatus } from '@/types';

interface BoardDragContextType {
  activeDragItem: Active | null;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
}

const BoardDragContext = createContext<BoardDragContextType | undefined>(undefined);

export function BoardDragProvider({ children }: { children: React.ReactNode }) {
  const { updateQuestStatus } = useKingdomCampaign();
  const [activeDragItem, setActiveDragItem] = useState<Active | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragItem(event.active);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragItem(null);

    if (!over) return;

    const questId = active.id as string;
    const targetStatus = over.id as QuestStatus; // Columns use status names as IDs

    // Verify valid status columns
    if (['todo', 'inprogress', 'done'].includes(targetStatus)) {
      updateQuestStatus(questId, targetStatus);
    }
  };

  return (
    <BoardDragContext.Provider value={{ activeDragItem, handleDragStart, handleDragEnd }}>
      {children}
    </BoardDragContext.Provider>
  );
}

export function useBoardDrag() {
  const context = useContext(BoardDragContext);
  if (!context) {
    throw new Error('useBoardDrag must be used within a BoardDragProvider');
  }
  return context;
}
