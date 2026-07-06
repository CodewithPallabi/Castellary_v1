"use client";

import React from 'react';
import { CampaignLog } from '@/types';
import { Sparkles, CheckCircle2, Swords, Calendar } from 'lucide-react';
import GlassKeepPanel from '../ui/GlassKeepPanel';

interface LogTimelineProps {
  logs: CampaignLog[];
}

export default function LogTimeline({ logs }: LogTimelineProps) {
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'quest_created':
        return { icon: Sparkles, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' };
      case 'quest_completed':
        return { icon: CheckCircle2, color: 'text-green-400 bg-green-400/10 border-green-400/20' };
      case 'boss_damaged':
        return { icon: Swords, color: 'text-red-400 bg-red-400/10 border-red-400/20' };
      default:
        return { icon: Calendar, color: 'text-keep-muted bg-keep-primary/5 border-keep-border' };
    }
  };

  return (
    <GlassKeepPanel className="flex flex-col gap-4 p-5 border border-keep-border bg-keep-glass w-full h-[360px] overflow-hidden">
      <div className="border-b border-keep-border pb-3">
        <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-keep-primary font-keep-display">
          Realm Campaign Chronicles
        </h4>
      </div>

      <div className="flex-grow overflow-y-auto no-scrollbar flex flex-col gap-4 pr-1">
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-keep-muted italic">
            No entries written in the scrolls yet.
          </div>
        ) : (
          logs.map((log) => {
            const config = getLogIcon(log.type);
            const Icon = config.icon;
            const timeString = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <div key={log.id} className="flex gap-4 items-start border-b border-keep-border/10 pb-3 last:border-0 last:pb-0">
                
                {/* Round badge */}
                <div className={`p-2 rounded border ${config.color} shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex flex-col gap-0.5">
                  <p className="text-xs font-light text-keep-foreground leading-relaxed">
                    {log.message}
                  </p>
                  <span className="text-[9px] text-keep-muted uppercase tracking-wider font-semibold">
                    {timeString}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </GlassKeepPanel>
  );
}
export type LogTimelineType = typeof LogTimeline;
