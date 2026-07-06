"use client";

import React, { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useKingdomCampaign } from '@/context/KingdomCampaignContext';
import { useBoardDrag } from '@/context/BoardDragContext';
import { useAudioController } from '@/hooks/useAudioController';
import QuestColumn from './QuestColumn';
import QuestCard from './QuestCard';
import QuestDialog from '../ui/QuestDialog';
import KeepButton from '../ui/KeepButton';
import { Quest } from '@/types';
import { PlusCircle } from 'lucide-react';

export default function QuestBoard() {
  const { activeKingdom, quests, addQuest, deleteQuest } = useKingdomCampaign();
  const { activeDragItem, handleDragStart, handleDragEnd } = useBoardDrag();
  const { playClick } = useAudioController();

  // Dialog Overlay controllers
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'create' | 'details'>('create');
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  const activeKingdomQuests = quests.filter(q => q.kingdomId === activeKingdom?.id);

  const todoQuests = activeKingdomQuests.filter(q => q.status === 'todo');
  const inprogressQuests = activeKingdomQuests.filter(q => q.status === 'inprogress');
  const doneQuests = activeKingdomQuests.filter(q => q.status === 'done');

  const handleOpenCreate = () => {
    playClick();
    setDialogType('create');
    setSelectedQuest(null);
    setDialogOpen(true);
  };

  const handleOpenDetails = (quest: Quest) => {
    playClick();
    setDialogType('details');
    setSelectedQuest(quest);
    setDialogOpen(true);
  };

  const findQuestById = (id: string) => {
    return quests.find(q => q.id === id) || null;
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-4">
      
      {/* Board header controls */}
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider font-keep-display" style={{ fontFamily: 'var(--font-keep-medieval-display)' }}>
            Campaign Quest Board
          </h2>
          <p className="text-xs text-keep-muted">Drag cards across scrolls to update campaign statuses and damage the active boss.</p>
        </div>

        <KeepButton variant="primary" onClick={handleOpenCreate} className="flex gap-2 items-center text-xs px-4 py-2.5">
          <PlusCircle className="w-4 h-4" />
          Inscribe Quest
        </KeepButton>
      </div>

      {/* Drag and Drop context wrapper */}
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuestColumn
            id="todo"
            title="Scroll of Demands"
            quests={todoQuests}
            onOpenDetails={handleOpenDetails}
          />
          <QuestColumn
            id="inprogress"
            title="Arena of Action"
            quests={inprogressQuests}
            onOpenDetails={handleOpenDetails}
          />
          <QuestColumn
            id="done"
            title="Hall of Victories"
            quests={doneQuests}
            onOpenDetails={handleOpenDetails}
          />
        </div>

        {/* Dragged card overlay indicator */}
        <DragOverlay>
          {activeDragItem ? (
            <div className="rotate-2 opacity-85 scale-105 pointer-events-none">
              <QuestCard
                quest={findQuestById(activeDragItem.id as string)!}
                onOpenDetails={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Popovers details and form overlays */}
      <QuestDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        dialogType={dialogType}
        selectedQuest={selectedQuest}
        onAddQuest={addQuest}
        onDeleteQuest={deleteQuest}
      />
    </div>
  );
}
export type QuestBoardType = typeof QuestBoard;
