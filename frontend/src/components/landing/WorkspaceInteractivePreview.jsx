import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CheckSquare,
  Video,
  Calendar,
  TrendingUp,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  FileCode,
} from 'lucide-react';
import gdgLogo from '../../assets/gdgmmdu-logo.jpg';

export const WorkspaceInteractivePreview = () => {
  const [activeRole, setActiveRole] = useState('mentor');

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] shadow-2xl overflow-hidden text-left font-sans transition-all">
      {/* 1. Control Bar & Role Switcher */}
      <div className="px-5 py-3.5 bg-zinc-50 dark:bg-zinc-900/90 border-b border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <img src={gdgLogo} alt="GDG MMDU" className="w-5 h-5 rounded-xs object-cover" />
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            GDG MMDU Management Console
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            Interactive Demo
          </span>
        </div>

        {/* Role Toggle Selector */}
        <div className="flex items-center gap-1 p-1 bg-zinc-200/70 dark:bg-zinc-800 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveRole('mentor')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeRole === 'mentor'
                ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Mentor View
          </button>
          <button
            onClick={() => setActiveRole('mentee')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeRole === 'mentee'
                ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Mentee View
          </button>
          <button
            onClick={() => setActiveRole('lead')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeRole === 'lead'
                ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Lead / Admin View
          </button>
        </div>
      </div>

      {/* 2. Workspace Viewport */}
      <div className="flex min-h-[460px]">
        {/* Left Module Sidebar */}
        <aside className="w-44 sm:w-52 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#0c0c0c] p-4 flex flex-col justify-between shrink-0 hidden md:flex">
          <div className="space-y-1">
            <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Workspace Modules
            </p>
            {[
              { label: 'Dashboard', icon: LayoutDashboard, active: true },
              { label: 'People / Directory', icon: Users, active: false },
              { label: 'Mentoring Tracks', icon: GraduationCap, active: false },
              { label: 'Sprint Tasks', icon: CheckSquare, active: false },
              { label: 'Scheduled Meetings', icon: Video, active: false },
              { label: 'Campus Events', icon: Calendar, active: false },
              { label: 'Progress Reports', icon: TrendingUp, active: false },
              ...(activeRole === 'mentee'
                ? [{ label: 'Raise Issue', icon: AlertCircle, active: false }]
                : [{ label: 'Feedback & Reports', icon: MessageSquare, active: false }]),
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    item.active
                      ? 'bg-[#4285F4]/10 text-[#4285F4] dark:text-[#8ab4f8] font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* Active Context Card */}
          <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
              Active Context
            </span>
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              {activeRole === 'mentor' && 'Mentor: Harshit'}
              {activeRole === 'mentee' && 'Mentee: Mohit'}
              {activeRole === 'lead' && 'Lead: Chapter Operations'}
            </p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
              {activeRole === 'mentor' && 'Backend Track (3 Mentees)'}
              {activeRole === 'mentee' && 'Backend Cohort (Mentor: Harshit)'}
              {activeRole === 'lead' && 'All 4 Engineering Tracks'}
            </p>
          </div>
        </aside>

        {/* Main Interactive Screen */}
        <main className="flex-1 p-5 sm:p-7 space-y-6 overflow-y-auto bg-white dark:bg-[#111111]">
          {/* ========================================================================= */}
          {/* MENTOR VIEW */}
          {/* ========================================================================= */}
          {activeRole === 'mentor' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Mentor Workspace · Harshit
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Department of CSE · Backend Track · Assigned to Mohit, Gitesh, Anshika
                  </p>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Track Status: On Track
                </span>
              </div>

              {/* 1. Scheduled Meeting Card */}
              <div className="p-4 rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#4285F4]" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Today's Scheduled Meeting
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    Confirmed Time
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Topic</span>
                    <strong className="text-slate-900 dark:text-white">
                      Backend Schema & API Review
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Time</span>
                    <span className="text-zinc-700 dark:text-zinc-300">4:00 PM IST (45m)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Participants</span>
                    <span className="text-zinc-700 dark:text-zinc-300">Mohit, Gitesh, Anshika</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-blue-100 dark:border-blue-900/30 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Google Meet pre-configured with campus calendar.
                  </span>
                  <a
                    href="https://meet.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4285F4] hover:bg-[#1a73e8] text-white font-bold text-xs transition-colors"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Meeting</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                </div>
              </div>

              {/* 2. Assigned Mentees Task Queue */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Mentee Task Submissions Awaiting Review
                  </h4>
                  <span className="text-zinc-400">3 Mentees Assigned</span>
                </div>

                <div className="space-y-2">
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-900 dark:text-white">Mohit</strong>
                        <span className="text-[10px] text-zinc-400">· PR #8</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40">
                          Needs Review
                        </span>
                      </div>
                      <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                        Task: Design Relational Schema & Migration for Mentoring Assignments
                      </p>
                    </div>
                    <button className="self-start sm:self-auto px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold text-xs transition-colors">
                      Evaluate Code & Feedback →
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-900 dark:text-white">Gitesh</strong>
                        <span className="text-[10px] text-zinc-400">· In Progress</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 text-[#4285F4] border border-blue-200 dark:border-blue-900/40">
                          Sprint Deliverable
                        </span>
                      </div>
                      <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                        Task: Implement JWT Token Refresh & Authorization Middleware
                      </p>
                    </div>
                    <span className="text-[11px] text-zinc-400 self-start sm:self-auto">
                      Due: Oct 17, 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MENTEE VIEW */}
          {/* ========================================================================= */}
          {activeRole === 'mentee' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Mentee Workspace · Mohit
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Backend Development Track · Assigned Mentor: <strong>Harshit</strong>
                  </p>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-[#4285F4] border border-blue-200 dark:border-blue-900/40">
                  Sprint 2 Active
                </span>
              </div>

              {/* 1. Next Meeting to Join */}
              <div className="p-4 rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#4285F4]" />
                    <span className="font-bold text-slate-900 dark:text-white">
                      Your Scheduled Mentoring Sync
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                    With Mentor <strong>Harshit</strong> · Today at 4:00 PM IST
                  </p>
                </div>
                <a
                  href="https://meet.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#4285F4] text-white font-bold text-xs"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Meeting</span>
                </a>
              </div>

              {/* 2. Active Mentee Task */}
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Current Task Deliverable
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40">
                    Submitted · Under Review
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Design Relational Schema & Migration for Mentoring Assignments
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Define models for Mentors, Mentees, Tracks, and Many-to-One mentor assignment foreign keys in Django ORM.
                </p>

                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-[#4285F4]" />
                    <span className="font-mono text-[11px] text-zinc-700 dark:text-zinc-300 truncate max-w-[240px]">
                      github.com/gdgoc-mmdu/backend-api/pull/8
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400">PR Submitted Oct 4</span>
                </div>
              </div>

              {/* 3. Raise Issue Action (Respecting Mentee Issue distinction) */}
              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    Need support or facing a blocker?
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Mentees can raise meeting issues or technical blockers directly to track leadership.
                  </p>
                </div>
                <button className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0">
                  Raise an Issue
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* LEAD / ADMIN VIEW */}
          {/* ========================================================================= */}
          {activeRole === 'lead' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Lead Operational Overview · GDGoC MMDU
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Cross-domain monitoring for 4 active tracks, 6 mentors, and 11 mentees
                  </p>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Chapter Health: All Tracks Active
                </span>
              </div>

              {/* 4 Tracks Status Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  {
                    name: 'Web Development',
                    mentor: 'Harsh',
                    mentees: 'Vanshika, Suraj, Dhruv',
                    status: 'Sprint 3 In Progress',
                  },
                  {
                    name: 'Backend Development',
                    mentor: 'Harshit',
                    mentees: 'Mohit, Gitesh, Anshika',
                    status: 'Sprint 2 In Progress',
                  },
                  {
                    name: 'App Development',
                    mentor: 'Sujal, Neil, Krish',
                    mentees: 'Soumya, Gaurav, Kritika',
                    status: 'Sprint 2 In Progress',
                  },
                  {
                    name: 'AI & ML Track',
                    mentor: 'Poras',
                    mentees: 'Tarun, Ankit',
                    status: 'Sprint 3 In Progress',
                  },
                ].map((track) => (
                  <div
                    key={track.name}
                    className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 dark:text-white">{track.name}</strong>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        ● On Track
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Mentor: <strong className="text-zinc-700 dark:text-zinc-300">{track.mentor}</strong>
                    </p>
                    <p className="text-[10px] text-zinc-400 truncate">
                      Mentees: {track.mentees}
                    </p>
                  </div>
                ))}
              </div>

              {/* Campus Events Coordination Panel */}
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Campus Event Logistics Overview
                  </span>
                  <span className="text-[10px] text-zinc-400">Lab 4 & Main Auditorium</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-900 dark:text-white">
                      Google Cloud Study Jams 2026: Hands-on Vertex AI
                    </strong>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Oct 22, 2026 · 160 RSVPs confirmed of 180 capacity · Engineering Block
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/50 text-[#4285F4] font-bold text-[10px]">
                    Logistics Approved
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
