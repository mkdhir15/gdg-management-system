import React, { useState } from 'react';
import {
  Video,
  Clock,
  Calendar,
  Users,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { GDG_MENTORS, GDG_MENTEES } from '../../data/gdgData';

export const MeetingPreviewWidget = () => {
  const [copied, setCopied] = useState(false);

  // Focus on Harshit (Backend Development) × Mentees as explicitly requested
  const mentor = GDG_MENTORS.find((m) => m.name === 'Harshit') || GDG_MENTORS[1];
  const mentees = GDG_MENTEES.filter(
    (m) => m.mentorName === 'Harshit' || m.mentorId === 'mentor-harshit'
  );

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.('https://meet.google.com/gdgoc-mmdu-backend');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-[#121212] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-xl overflow-hidden text-left transition-colors">
      {/* Top Banner: Upcoming Meeting Badge */}
      <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            Upcoming Meeting
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#34A853] border border-emerald-200 dark:border-emerald-800">
            Confirmed
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>Today · 6:00 PM IST</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 space-y-6">
        {/* Track & Session Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4285F4]">
            <span>Backend Development Track</span>
            <span>•</span>
            <span>Sprint 2 Code Review</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
            Harshit × Mentees
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            REST API schema verification, PostgreSQL indexing, and JWT authentication checkpoint.
          </p>
        </div>

        {/* Participant Roster Card */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/80 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-zinc-700 dark:text-zinc-300">
              Session Participants
            </span>
            <span>4 Confirmed</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Mentor Tile */}
            <div className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-[#4285F4]/40"
              />
              <div className="text-left">
                <p className="text-xs font-bold text-zinc-900 dark:text-white leading-none">
                  {mentor.name}
                </p>
                <p className="text-[10px] text-[#4285F4] font-semibold">Track Mentor</p>
              </div>
            </div>

            {/* Mentees */}
            {mentees.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
              >
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-none">
                    {m.name}
                  </p>
                  <p className="text-[10px] text-zinc-400">Mentee</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* "Beyond WhatsApp" Value Callout */}
        <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#4285F4] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong>Direct Platform Access:</strong> No more lost Google Meet links buried in chat threads. Your sprint room is pre-authenticated and waiting in your portal.
          </p>
        </div>

        {/* Primary Action Button Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-zinc-100 dark:border-zinc-800/80">
          <button
            onClick={handleCopyLink}
            className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Copy Meeting Link'}</span>
          </button>

          <a
            href="https://meet.google.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#EA4335] hover:bg-[#d93025] text-white text-xs font-bold shadow-md transition-all active:scale-[0.98]"
          >
            <Video className="w-4 h-4" />
            <span>Join Meeting</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
};
