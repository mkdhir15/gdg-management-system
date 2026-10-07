import React, { useState, useRef } from 'react';
import {
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  GitPullRequest,
  Video,
  Layers,
  Activity,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export const HeroNetwork3D = () => {
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 6, y: -8 });
  const [activeModule, setActiveModule] = useState('mentoring');

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / rect.height) * 10 + 4;
    const rotY = (x / rect.width) * 12 - 6;
    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 6, y: -8 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[540px] h-[440px] sm:h-[480px] flex items-center justify-center select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient background glow */}
      <div className="absolute w-72 h-72 rounded-full bg-[#4285F4]/10 dark:bg-[#4285F4]/15 blur-3xl pointer-events-none" />

      {/* 3D Isometric Viewport */}
      <div
        className="relative w-full h-[400px] transition-transform duration-300 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Main Management System Interface Mockup Card */}
        <div
          className="absolute inset-0 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col text-left"
          style={{ transform: 'translateZ(10px)' }}
        >
          {/* Top Window Bar */}
          <div className="h-10 px-4 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <div className="h-3 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />
              <span className="text-[11px] font-mono font-medium text-zinc-500 dark:text-zinc-400">
                system.gdg-mmdu.org/console
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-200/60 dark:border-emerald-900/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>
          </div>

          {/* Console Body */}
          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
            {/* System Header & Active Domain Filter */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/60">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  GDGoC MMDU Operations
                </p>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>Central Platform Engine</span>
                  <ShieldCheck className="w-4 h-4 text-[#4285F4]" />
                </h4>
              </div>

              {/* 4 Brand Dots */}
              <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
                <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
                <span className="w-2 h-2 rounded-full bg-[#FBBC05]" />
                <span className="w-2 h-2 rounded-full bg-[#34A853]" />
              </div>
            </div>

            {/* Core Modules 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Module 1: Mentoring Operations */}
              <div
                onClick={() => setActiveModule('mentoring')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeModule === 'mentoring'
                    ? 'bg-blue-50/50 dark:bg-blue-950/30 border-[#4285F4]/60 shadow-xs'
                    : 'bg-zinc-50/50 dark:bg-zinc-900/40 border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-[#4285F4] uppercase">
                    Mentoring Track
                  </span>
                  <GitPullRequest className="w-3.5 h-3.5 text-[#4285F4]" />
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  Harsh ↔ Vanshika
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                  PR #14: Dark Mode Tokens
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Approved
                  </span>
                  <span className="text-zinc-400">Score: 98</span>
                </div>
              </div>

              {/* Module 2: Event Operations */}
              <div
                onClick={() => setActiveModule('events')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeModule === 'events'
                    ? 'bg-blue-50/50 dark:bg-blue-950/30 border-[#4285F4]/60 shadow-xs'
                    : 'bg-zinc-50/50 dark:bg-zinc-900/40 border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-[#EA4335] uppercase">
                    Event Ops
                  </span>
                  <Calendar className="w-3.5 h-3.5 text-[#EA4335]" />
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  Cloud Study Jams '26
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                  160 / 180 RSVP Check-ins
                </p>
                <div className="mt-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#EA4335] h-full rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              {/* Module 3: Meeting Coordination */}
              <div
                onClick={() => setActiveModule('meetings')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeModule === 'meetings'
                    ? 'bg-blue-50/50 dark:bg-blue-950/30 border-[#4285F4]/60 shadow-xs'
                    : 'bg-zinc-50/50 dark:bg-zinc-900/40 border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-[#FBBC05] dark:text-[#fdd663] uppercase">
                    Direct Sync
                  </span>
                  <Video className="w-3.5 h-3.5 text-[#d97706] dark:text-[#FBBC05]" />
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  Backend Architecture Sync
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                  Wednesday · 04:00 PM IST
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                  <span>Google Meet Generated</span>
                </div>
              </div>

              {/* Module 4: Sprint Milestones */}
              <div
                onClick={() => setActiveModule('progress')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeModule === 'progress'
                    ? 'bg-blue-50/50 dark:bg-blue-950/30 border-[#4285F4]/60 shadow-xs'
                    : 'bg-zinc-50/50 dark:bg-zinc-900/40 border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-[#34A853] uppercase">
                    Cohort Progress
                  </span>
                  <TrendingUp className="w-3.5 h-3.5 text-[#34A853]" />
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  Phase 2 Sprint Review
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                  84.6% Milestone Met
                </p>
                <div className="mt-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#34A853] h-full rounded-full" style={{ width: '84.6%' }} />
                </div>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#4285F4]" />
                <span>19 Verified Campus Accounts</span>
              </span>
              <span className="font-mono text-[10px] text-zinc-400">
                v2.4 Production Engine
              </span>
            </div>
          </div>
        </div>

        {/* Floating Perspective Badge: Structured Coordination */}
        <div
          className="absolute -top-3 -right-3 z-30 p-2.5 rounded-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-xl hidden sm:flex items-center gap-2 text-left"
          style={{ transform: 'translateZ(35px)' }}
        >
          <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#4285F4] flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-none">
              Single Source of Truth
            </p>
            <p className="text-[9px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              People · Events · Progress
            </p>
          </div>
        </div>

        {/* Floating Perspective Badge: No Lost WhatsApp Links */}
        <div
          className="absolute -bottom-3 -left-3 z-30 p-2.5 rounded-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-xl hidden sm:flex items-center gap-2 text-left"
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-[#34A853] flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-none">
              Zero Fragmentation
            </p>
            <p className="text-[9px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              No WhatsApp link chasing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
