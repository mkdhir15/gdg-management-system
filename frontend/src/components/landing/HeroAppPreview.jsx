import React from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CheckSquare,
  Video,
  Calendar,
  TrendingUp,
  ExternalLink,
  Clock,
} from 'lucide-react';
import gdgLogo from '../../assets/gdgmmdu-logo.jpg';

export const HeroAppPreview = () => {
  return (
    <div className="w-full max-w-[620px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] shadow-2xl overflow-hidden text-left font-sans transition-all">
      {/* 1. Window App Header Bar */}
      <div className="h-10 px-4 bg-zinc-50 dark:bg-zinc-900/90 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
        {/* Left: Window Controls + App Identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          </div>
          <div className="h-3.5 w-px bg-zinc-200 dark:border-zinc-800" />
          <div className="flex items-center gap-2">
            <img src={gdgLogo} alt="GDG Logo" className="w-4 h-4 rounded-xs object-cover" />
            <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
              GDG MMDU Management System
            </span>
          </div>
        </div>

        {/* Right: Demo Workspace Environment Badge */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            Demo Workspace · Mentor View
          </span>
        </div>
      </div>

      {/* 2. Main Application Body (Sidebar + Content Workspace) */}
      <div className="flex h-[420px] sm:h-[450px]">
        {/* Left Sub-Sidebar (Realistic Modules Navigation) */}
        <aside className="w-36 sm:w-44 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#0c0c0c] p-3 flex flex-col justify-between shrink-0 hidden xs:flex">
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Operations
            </div>
            {[
              { label: 'Dashboard', icon: LayoutDashboard, active: true },
              { label: 'People', icon: Users, active: false },
              { label: 'Mentoring', icon: GraduationCap, active: false },
              { label: 'Tasks', icon: CheckSquare, active: false },
              { label: 'Meetings', icon: Video, active: false },
              { label: 'Events', icon: Calendar, active: false },
              { label: 'Progress', icon: TrendingUp, active: false },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    item.active
                      ? 'bg-[#4285F4]/10 text-[#4285F4] dark:text-[#8ab4f8] font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* User Profile Pill at bottom of sidebar */}
          <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/60 text-[#4285F4] font-bold text-[10px] flex items-center justify-center shrink-0">
              H
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-900 dark:text-white truncate leading-none">
                Harshit
              </p>
              <p className="text-[9px] text-zinc-400 truncate mt-0.5">
                Backend Mentor
              </p>
            </div>
          </div>
        </aside>

        {/* Workspace Canvas */}
        <main className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-white dark:bg-[#111111]">
          {/* Header Row */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#4285F4]">
                Backend Development Track
              </p>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Sprint 2 Operations Dashboard
              </h4>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              On Track
            </span>
          </div>

          {/* 1. First-Class Meeting Card */}
          <div className="p-3.5 rounded-xl border border-blue-200/80 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-950/15 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <Video className="w-4 h-4 text-[#4285F4]" />
                <span>Upcoming Meeting: Backend Architecture Review</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                Scheduled
              </span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Sprint check-in with Mohit, Gitesh, and Anshika regarding REST API normalization and token schemas.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
              <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>Today · 4:00 PM IST (Google Meet)</span>
              </div>
              <a
                href="https://meet.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#4285F4] hover:bg-[#1a73e8] text-white font-bold text-[11px] transition-colors shadow-2xs"
              >
                <Video className="w-3 h-3" />
                <span>Join Meeting</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* 2. Active Tasks Roster */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">
                Assigned Mentees & Tasks
              </span>
              <span className="text-[10px] text-zinc-400">3 Mentees Assigned</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="p-2.5 rounded-lg border border-zinc-200/70 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white leading-tight">
                    Design Relational Schema for Mentoring
                  </p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Assigned to: <strong>Mohit</strong> · PR #8 submitted
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50">
                  Under Review
                </span>
              </div>

              <div className="p-2.5 rounded-lg border border-zinc-200/70 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white leading-tight">
                    JWT Token Refresh & Auth Middleware
                  </p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Assigned to: <strong>Gitesh</strong> · Target: Oct 17
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#4285F4] border border-blue-200 dark:border-blue-900/50">
                  In Progress
                </span>
              </div>
            </div>
          </div>

          {/* 3. Progress Review Box */}
          <div className="p-3 rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                Sprint 2 Progress Evaluation
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Next step: Complete schema normalization and conduct 1:1 reviews
              </p>
            </div>
            <span className="text-[10px] font-semibold text-zinc-400">
              Synced 2 days ago
            </span>
          </div>
        </main>
      </div>
    </div>
  );
};
