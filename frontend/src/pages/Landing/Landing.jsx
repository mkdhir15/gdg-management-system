import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LandingLayout } from '../../layouts/LandingLayout';
import { HeroAppPreview } from '../../components/landing/HeroAppPreview';
import {
  ArrowRight,
  ArrowDown,
  Calendar,
  MapPin,
  Clock,
  Users,
  CheckSquare,
  Video,
  CheckCircle2,
  ExternalLink,
  Mail,
  X,
  Layers,
  Sparkles,
} from 'lucide-react';
import { GDG_EVENTS } from '../../data/gdgData';

export const Landing = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Curated 3 flagship campus events
  const previewEvents = GDG_EVENTS.slice(0, 3);

  // Official Social Channels from gdgocmmdu.org
  const socialLinks = [
    {
      name: 'Twitter (X)',
      url: 'https://x.com/gdsc_mmdu',
      handle: '@gdsc_mmdu',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/gdg_on_campus_mmdu',
      handle: '@gdg_on_campus_mmdu',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/79700754',
      handle: 'GDG on Campus MMDU',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Developer-Student-Clubs-MMDU',
      handle: 'Developer-Student-Clubs-MMDU',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@gdgmmdu',
      handle: '@gdgmmdu',
    },
  ];

  return (
    <LandingLayout>
      {/* ========================================================================= */}
      {/* 1. HERO — PRODUCT IDENTITY + SOPHISTICATED APPLICATION VISUAL */}
      {/* ========================================================================= */}
      <section
        id="home"
        className="relative pt-12 pb-20 md:pt-16 md:pb-28 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#0a0a0a] overflow-hidden"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#4285F4]/8 dark:bg-[#4285F4]/12 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 mb-12 sm:mb-16">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                GDGOC MMDU · MANAGEMENT PLATFORM
              </span>
            </div>

            {/* Large Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Manage GDGoC. <br />
              <span className="text-[#4285F4]">Better.</span>
            </h1>

            {/* Short Supporting Text */}
            <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl font-normal">
              One organized platform for the people, events and activities that keep the GDGoC MMDU community moving.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full sm:w-auto">
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#4285F4] hover:bg-[#1a73e8] text-white text-sm font-semibold transition-all shadow-xs"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#events"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-semibold transition-colors"
              >
                <span>Explore Events</span>
                <ArrowDown className="w-4 h-4 text-zinc-400" />
              </a>
            </div>
          </div>

          {/* Sophisticated Application Window Preview Stage */}
          <div className="flex justify-center relative">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-zinc-200/60 to-transparent dark:from-zinc-700/40 dark:to-transparent">
              <HeroAppPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SHORT "ABOUT THE PLATFORM" SECTION */}
      {/* ========================================================================= */}
      <section
        id="about"
        className="py-20 md:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 text-left space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4285F4]">
              Purpose & Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Built for how GDGoC MMDU actually runs.
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When student developer chapters expand, critical information fractures across unread messaging groups, lost video links, and out-of-date spreadsheets. The Management System provides an organized operational foundation.
            </p>
          </div>

          {/* 3 Focused Operational Principles (Not dozens of cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-[#4285F4]">
                01 / Centralized Identity
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Single Source of Truth
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A verified directory for Leads, Domain Mentors, and Mentees across Web, Backend, App Development, and AI tracks.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-[#34A853]">
                02 / Structured Execution
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Verifiable Deliverables
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Sprint tasks tie directly to code repositories, pull requests, and mentor evaluation scorecards with documented feedback.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-[#FBBC05] dark:text-[#fdd663]">
                03 / First-Class Meetings
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No Lost Video Links
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Scheduled office hours live directly inside the portal with 1-click Google Meet access, agenda details, and attendee rosters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. "EVERYTHING ORGANIZED IN ONE PLACE." — VISUALLY STRONG CORE CONSOLE */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 text-left space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#34A853]">
              Operational Clarity
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Everything organized in one place.
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              People, mentoring tracks, scheduled sessions, and campus events aligned in a single operational view.
            </p>
          </div>

          {/* 4 Balanced Quadrants (Clean, refined, professional) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Area 1: People & Roles */}
            <div className="p-7 sm:p-8 rounded-2xl bg-zinc-50/60 dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#4285F4]">
                  Module · People
                </span>
                <Users className="w-4 h-4 text-[#4285F4]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Verified Chapter Directory
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Role-based access separating Leads, Mentors, and Mentees. Clear domain pairings across Web Development, Backend Development, Mobile Apps, and AI & Applied ML.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4285F4]" />
                <span>Zero duplicate accounts · Role boundaries preserved</span>
              </div>
            </div>

            {/* Area 2: Structured Mentoring */}
            <div className="p-7 sm:p-8 rounded-2xl bg-zinc-50/60 dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#34A853]">
                  Module · Mentoring
                </span>
                <CheckSquare className="w-4 h-4 text-[#34A853]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Sprint Deliverables & Reviews
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Mentees build concrete software solutions for the Google Solution Challenge. Mentors review pull requests, evaluate milestones, and provide structured scorecards.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#34A853]" />
                <span>Code review tracking · Measurable sprint status</span>
              </div>
            </div>

            {/* Area 3: Meetings */}
            <div className="p-7 sm:p-8 rounded-2xl bg-zinc-50/60 dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#EA4335]">
                  Module · Meetings
                </span>
                <Video className="w-4 h-4 text-[#EA4335]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                First-Class Meeting Schedules
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Direct Google Meet launch buttons live on the student and mentor dashboards. Pre-configured session agendas and attendee rosters keep track syncs on time.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EA4335]" />
                <span>1-click meeting join · No WhatsApp link hunting</span>
              </div>
            </div>

            {/* Area 4: Events */}
            <div className="p-7 sm:p-8 rounded-2xl bg-zinc-50/60 dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FBBC05] dark:text-[#fdd663]">
                  Module · Events
                </span>
                <Calendar className="w-4 h-4 text-[#d97706] dark:text-[#FBBC05]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Campus Event Operations
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Manage room capacities across Lab 4 and the Main Auditorium. Coordinate Google Cloud Study Jams, DevFest, and hackathon registration limits seamlessly.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FBBC05]" />
                <span>Verified capacity tracking · Real-time attendance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. EVENTS PREVIEW — ORGANIZATIONAL ACTIVITIES */}
      {/* ========================================================================= */}
      <section
        id="events"
        className="py-20 md:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 text-left">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#34A853]">
                Campus Calendar
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Upcoming events & workshops.
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Campus developer sessions, study jams, and flagship conferences coordinated through the management system.
              </p>
            </div>
          </div>

          {/* 3 Clean Event Rows/Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {previewEvents.map((event) => (
              <div
                key={event.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#4285F4] border border-blue-200 dark:border-blue-900/40">
                      {event.type}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">
                      {event.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {event.title}
                  </h3>

                  <div className="space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#EA4335] shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                    RSVP: <strong>{event.rsvpCount} / {event.capacity}</strong>
                  </span>
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#4285F4] hover:underline"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SHORT ABOUT GDG MMDU / PLATFORM SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FBBC05] dark:text-[#fdd663]">
              Community & Chapter
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Google Developer Group on Campus · MM(DU)
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              GDGoC MMDU is a university developer community at Maharishi Markandeshwar (Deemed to be University), Mullana. In collaboration with the Department of Computer Science & Engineering, our mission is to provide hands-on engineering experience in Web, Backend, Mobile Apps, and AI/ML.
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-2">
              The GDG MMDU Management System was built to serve as our internal digital backbone across academic years.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CONTACT SECTION */}
      {/* ========================================================================= */}
      <section
        id="contact"
        className="py-20 md:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left items-start">
            {/* Left 6 Cols */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#EA4335]">
                  Let's Connect
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                  Connect with GDGoC MMDU.
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                  For operational questions, mentorship inquiries, or campus partnerships, contact the chapter leadership.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 space-y-4 text-xs">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    GDGoC MMDU
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Maharishi Markandeshwar (Deemed to be University), Mullana
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#EA4335] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white">
                        Campus Location
                      </strong>
                      <span className="text-zinc-500 dark:text-zinc-400">
                        MM Education Complex, Mullana (Ambala), Haryana, India, 133207
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#4285F4] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white">
                        Official Contact Email
                      </strong>
                      <a
                        href="mailto:mmdu.dsc@gmail.com"
                        className="text-[#4285F4] hover:underline"
                      >
                        mmdu.dsc@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Official Channels */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Official Channels
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Follow campus notices, workshop announcements, and technical updates.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socialLinks.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 hover:border-[#4285F4] transition-colors flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {channel.name}
                      </p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 truncate max-w-[130px]">
                        {channel.handle}
                      </p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                ))}
              </div>

              {/* Portal Login Direct Link */}
              <div className="p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs mt-2">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    Looking for the Management Portal?
                  </p>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    Sign in with your campus credentials to access your active workspace.
                  </p>
                </div>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full bg-[#4285F4] hover:bg-[#1a73e8] text-white font-semibold text-xs shrink-0 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Portal Login</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FINAL PRODUCT CTA */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 text-center bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Bring GDGoC MMDU together.
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            One platform. Better coordination. Better community management.
          </p>

          <div className="pt-2 flex justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#4285F4] hover:bg-[#1a73e8] text-white text-sm font-semibold transition-all shadow-xs"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. EVENT DETAILS MODAL (Interactive for "View Details") */}
      {/* ========================================================================= */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 shadow-2xl text-left space-y-4">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#4285F4]">
                {selectedEvent.type}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-2">
                {selectedEvent.title}
              </h3>
            </div>

            <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#4285F4]" />
                <span><strong>Date:</strong> {selectedEvent.date} · {selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#EA4335]" />
                <span><strong>Location:</strong> {selectedEvent.location}</span>
              </div>
              {selectedEvent.speaker && (
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#34A853]" />
                  <span><strong>Speaker:</strong> {selectedEvent.speaker}</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Session Description
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Close
              </button>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4285F4] hover:bg-[#1a73e8] text-white text-xs font-semibold transition-colors"
              >
                <span>RSVP via Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </LandingLayout>
  );
};
