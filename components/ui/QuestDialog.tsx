"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quest, QuestDifficulty, QuestPriority, HeroClass } from '@/types';
import KeepButton from '../ui/KeepButton';
import GlassKeepPanel from '../ui/GlassKeepPanel';
import RealmDivider from '../ui/RealmDivider';
import { X, Crown, Wand2, Sword, Trash2 } from 'lucide-react';
import { useAudioController } from '@/hooks/useAudioController';

interface QuestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dialogType: 'create' | 'details';
  selectedQuest: Quest | null;
  onAddQuest: (questData: {
    title: string;
    description: string;
    difficulty: QuestDifficulty;
    priority: QuestPriority;
    deadline: string;
    estimatedHours: number;
    ownerClass: HeroClass;
  }) => void;
  onDeleteQuest: (id: string) => void;
}

export default function QuestDialog({
  isOpen,
  onClose,
  dialogType,
  selectedQuest,
  onAddQuest,
  onDeleteQuest
}: QuestDialogProps) {
  const { playClick, playVictory } = useAudioController();

  // Create Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<QuestDifficulty>('medium');
  const [priority, setPriority] = useState<QuestPriority>('medium');
  const [estimatedHours, setEstimatedHours] = useState(4);
  const [ownerClass, setOwnerClass] = useState<HeroClass>('knight');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please fill all required inputs!");
      return;
    }
    
    onAddQuest({
      title: title.trim(),
      description: description.trim(),
      difficulty,
      priority,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // mock 1 week deadline
      estimatedHours,
      ownerClass
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setDifficulty('medium');
    setPriority('medium');
    setEstimatedHours(4);
    setOwnerClass('knight');
    
    playVictory();
    onClose();
  };

  const handleDelete = () => {
    if (selectedQuest) {
      playClick();
      onDeleteQuest(selectedQuest.id);
      onClose();
    }
  };

  const getRoleIcon = (roleClass: string) => {
    switch (roleClass) {
      case 'king': return Crown;
      case 'mage': return Wand2;
      case 'knight': return Sword;
      default: return Sword;
    }
  };

  const classes: { id: HeroClass; name: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'king', name: 'King', icon: Crown },
    { id: 'mage', name: 'Mage', icon: Wand2 },
    { id: 'knight', name: 'Knight', icon: Sword }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Overlay filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          {/* Dialog Body panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-lg"
          >
            <GlassKeepPanel className="p-6 border border-white/10 shadow-2xl flex flex-col gap-6 bg-black/90">
              
              {/* Header Title */}
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="text-base font-bold uppercase tracking-wider font-keep-display text-white">
                  {dialogType === 'create' ? 'Inscribe New Quest scroll' : 'Quest Scroll detail'}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1 rounded hover:bg-white/5 text-keep-muted hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* View 1: Create Form */}
              {dialogType === 'create' ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Quest Title */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-keep-muted font-keep-display">
                      Quest Header
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Purify castle archives"
                      className="bg-black/60 border border-white/10 text-white rounded px-4 py-2.5 text-xs focus:outline-none focus:border-keep-primary/60 placeholder-white/30"
                    />
                  </div>

                  {/* Quest Description */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-keep-muted font-keep-display">
                      Scrolled Details / Requirements
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g. Audit database keys and cleanse obsolete seeds."
                      className="bg-black/60 border border-white/10 text-white rounded px-4 py-2.5 text-xs focus:outline-none focus:border-keep-primary/60 placeholder-white/30 resize-none"
                    />
                  </div>

                  {/* Difficulty & Hours Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-keep-muted font-keep-display">
                        Difficulty
                      </label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as QuestDifficulty)}
                        className="bg-black border border-white/10 text-xs text-white rounded px-3 py-2.5 focus:outline-none"
                      >
                        <option value="easy">Easy (15 XP)</option>
                        <option value="medium">Medium (35 XP)</option>
                        <option value="hard">Hard (75 XP)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-keep-muted font-keep-display">
                        Priority
                      </label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as QuestPriority)}
                        className="bg-black border border-white/10 text-xs text-white rounded px-3 py-2.5 focus:outline-none"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-keep-muted font-keep-display">
                        Est. Hours
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={estimatedHours}
                        onChange={(e) => setEstimatedHours(parseInt(e.target.value) || 1)}
                        className="bg-black border border-white/10 text-xs text-white rounded px-3 py-2.5 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Owner RPG class selector */}
                  <div className="flex flex-col gap-2 mt-1">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-keep-muted font-keep-display">
                      Assign Hero Role Class
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {classes.map((cls) => {
                        const Icon = cls.icon;
                        const isSelected = ownerClass === cls.id;
                        return (
                          <button
                            key={cls.id}
                            type="button"
                            onClick={() => { playClick(); setOwnerClass(cls.id); }}
                            className={`flex flex-col items-center gap-1.5 p-2 rounded border text-center transition-all ${
                              isSelected 
                                ? 'border-keep-primary bg-keep-primary/5 text-keep-primary' 
                                : 'border-white/5 bg-black/40 text-keep-muted hover:border-white/20'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-[9px] uppercase font-bold tracking-wider font-keep-display">
                              {cls.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <KeepButton type="submit" variant="primary" className="w-full mt-2 py-3">
                    Inscribe Quest
                  </KeepButton>
                </form>
              ) : (
                // View 2: Quest Details
                selectedQuest && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-keep-primary bg-keep-primary/10 border border-keep-primary/20 px-2 py-0.5 rounded">
                          {selectedQuest.difficulty} difficulty
                        </span>
                        <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-keep-muted">
                          Priority {selectedQuest.priority}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold uppercase tracking-wide text-white font-keep-display mt-1">
                        {selectedQuest.title}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm font-light leading-relaxed text-keep-muted bg-white/[0.02] border border-white/5 p-4 rounded">
                      {selectedQuest.description}
                    </p>

                    <RealmDivider className="opacity-45" />

                    {/* Stats HUD layout */}
                    <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider text-keep-muted">
                      <div className="flex flex-col gap-1 p-3 rounded bg-black/40 border border-white/5">
                        <span>Campaign reward</span>
                        <span className="text-keep-success text-sm font-extrabold mt-0.5">+{selectedQuest.xpReward} XP</span>
                      </div>
                      <div className="flex flex-col gap-1 p-3 rounded bg-black/40 border border-white/5">
                        <span>Role owner</span>
                        <span className="text-keep-accent text-sm font-extrabold flex items-center gap-1.5 mt-0.5">
                          {React.createElement(getRoleIcon(selectedQuest.ownerClass), { className: 'w-4 h-4 text-keep-accent' })}
                          <span className="capitalize">{selectedQuest.ownerClass}</span>
                        </span>
                      </div>
                    </div>

                    {/* Delete action button */}
                    <button
                      onClick={handleDelete}
                      className="flex items-center justify-center gap-2 w-full mt-2 py-3 rounded text-xs font-bold uppercase tracking-wider text-keep-danger border border-keep-danger/30 hover:border-keep-danger/60 hover:bg-keep-danger/10 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      Discard Quest Scroll
                    </button>
                  </div>
                )
              )}

            </GlassKeepPanel>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
export type QuestDialogType = typeof QuestDialog;
