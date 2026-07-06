"use client";

import React from 'react';
import { useKingdomCampaign } from '@/context/KingdomCampaignContext';
import { ShieldAlert, CheckCircle, MailOpen } from 'lucide-react';
import GlassKeepPanel from '../ui/GlassKeepPanel';
import { useAudioController } from '@/hooks/useAudioController';

export default function TransmissionsList() {
  const { transmissions, readTransmission } = useKingdomCampaign();
  const { playClick } = useAudioController();

  const handleMarkRead = (id: string) => {
    playClick();
    readTransmission(id);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center border-b border-keep-border pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider font-keep-display">
            Transmissions Receiver
          </h2>
          <p className="text-xs text-keep-muted">Incoming dispatches from neighboring civilizations and realm scouts.</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {transmissions.length === 0 ? (
          <GlassKeepPanel className="p-8 text-center text-xs text-keep-muted italic">
            All waves quiet. No dispatches recorded.
          </GlassKeepPanel>
        ) : (
          transmissions.map((t) => {
            const isRead = t.read;
            const Icon = t.type === 'success' ? CheckCircle : ShieldAlert;
            const borderGlow = isRead ? 'border-keep-border bg-keep-glass' : 'border-keep-primary/30 bg-keep-primary/[0.02] shadow-[0_0_15px_rgba(212,175,55,0.05)]';

            return (
              <GlassKeepPanel
                key={t.id}
                className={`p-4 flex items-center justify-between gap-4 border transition-all ${borderGlow}`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2 rounded bg-black/40 ${isRead ? 'text-keep-muted' : 'text-keep-primary glow-text'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-sm ${isRead ? 'text-keep-muted' : 'text-keep-foreground font-semibold'}`}>
                      {t.message}
                    </p>
                    <span className="text-[9px] uppercase font-semibold text-keep-muted tracking-wider">
                      {new Date(t.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>

                {!isRead && (
                  <button
                    onClick={() => handleMarkRead(t.id)}
                    className="flex items-center gap-1 text-[9px] uppercase font-bold tracking-wider text-keep-primary hover:text-keep-accent border border-keep-primary/20 hover:border-keep-accent/40 rounded px-2.5 py-1.5 transition-all cursor-pointer"
                  >
                    <MailOpen className="w-3.5 h-3.5" />
                    Mark Read
                  </button>
                )}
              </GlassKeepPanel>
            );
          })
        )}
      </div>
    </div>
  );
}
export type TransmissionsListType = typeof TransmissionsList;
