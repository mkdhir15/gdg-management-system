import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { StatCard } from '../../components/common/StatCard';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { EventCard } from '../../components/events/EventCard';
import { AnnouncementCard } from '../../components/announcements/AnnouncementCard';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { QuickActions } from '../../components/dashboard/QuickActions';
import {
  GraduationCap,
  Sparkles,
  FolderGit2,
  Calendar,
  FileBarChart,
  ArrowRight,
  TrendingUp,
  Layers,
  CheckCircle2,
  Clock,
  UserCheck,
  Code,
  Server,
  Smartphone,
  Cpu,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  dashboardService,
  projectService,
  eventService,
  announcementService,
  taskService,
} from '../../services/api';
import { GDG_DOMAINS, GDG_MENTORS, GDG_MENTEES } from '../../data/gdgData';

export const LeadDashboard = () => {
  const [stats, setStats] = useState(null);
  const [domains, setDomains] = useState(GDG_DOMAINS);
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [s, d, p, e, a, t] = await Promise.all([
        dashboardService.getOverviewStats('LEAD'),
        dashboardService.getDomains(),
        projectService.getProjects(),
        eventService.getEvents(),
        announcementService.getAnnouncements(),
        taskService.getTasks(),
      ]);
      setStats(s);
      if (d?.length) setDomains(d);
      setProjects(p);
      setEvents(e);
      setAnnouncements(a);
      setTasks(t);
    };
    fetchData();
  }, []);

  const domainIcons = {
    'domain-web': Code,
    'domain-backend': Server,
    'domain-app': Smartphone,
    'domain-aiml': Cpu,
  };

  const domainBadges = {
    'domain-web': 'blue',
    'domain-backend': 'green',
    'domain-app': 'yellow',
    'domain-aiml': 'purple',
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Campus Lead Operations Cockpit"
        subtitle="GDG on Campus MMDU • Chapter analytics, mentoring oversight, and milestone velocity."
        badge="Campus Organizer"
        actions={
          <Link to="/lead/reports">
            <Button size="sm" icon={FileBarChart} variant="outline">
              Chapter Reports &amp; Analytics
            </Button>
          </Link>
        }
      />

      {/* Role Quick Actions */}
      <QuickActions role="LEAD" />

      {/* TOP STATISTICS (Dynamically calculated from centralized data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Mentors"
          value={stats?.totalMentors || GDG_MENTORS.length}
          subtitle="4 engineering tracks covered"
          icon={GraduationCap}
          accent="blue"
        />
        <StatCard
          title="Total Mentees"
          value={stats?.totalMentees || GDG_MENTEES.length}
          subtitle="Across B.Tech CSE &amp; IT"
          icon={Sparkles}
          accent="green"
          trend="+11 Active Cohort"
          trendType="up"
        />
        <StatCard
          title="Mentoring Domains"
          value={stats?.totalDomains || GDG_DOMAINS.length}
          subtitle="Web, Backend, App, AI &amp; ML"
          icon={Layers}
          accent="yellow"
        />
        <StatCard
          title="Active Projects"
          value={stats?.totalProjects || projects.length}
          subtitle="Campus impact solutions"
          icon={FolderGit2}
          accent="purple"
        />
      </div>

      {/* ================================================================ */}
      {/* ⭐ MAIN MENTORING OVERVIEW (Lead's Primary Mission Control)       */}
      {/* ================================================================ */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Mentoring Program Overview
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Active mentor allocations and student progress across all 4 GDG engineering domains.
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            Total:{' '}
            <span className="text-blue-600 dark:text-blue-400">{GDG_MENTORS.length} Mentors</span> •{' '}
            <span className="text-emerald-600 dark:text-emerald-400">{GDG_MENTEES.length} Mentees</span> •{' '}
            <span className="text-purple-600 dark:text-purple-400">4 Domains</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {domains.map((domain) => {
            const Icon = domainIcons[domain.id] || Layers;
            const badgeVariant = domainBadges[domain.id] || 'blue';

            return (
              <Card key={domain.id} className="p-5 border-slate-200 dark:border-slate-800">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-200 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {domain.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {domain.mentorNames.length} Mentor{domain.mentorNames.length > 1 ? 's' : ''} •{' '}
                        {domain.menteeNames.length} Mentees
                      </p>
                    </div>
                  </div>
                  <Badge variant={badgeVariant}>
                    {domain.progress}% Sprint Velocity
                  </Badge>
                </div>

                <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {domain.description}
                </p>

                {/* Mentor -> Mentees Relationship Tree */}
                <div className="mt-4 p-3 bg-slate-50 dark:bg-[#0b0f17] rounded-xl border border-slate-100 dark:border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Mentor{domain.mentorNames.length > 1 ? 's' : ''}:</span>
                    <span className="text-slate-900 dark:text-white font-bold">
                      {domain.mentorNames.join(', ')}
                    </span>
                  </div>

                  <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>Mentees:</span>
                    <div className="flex flex-wrap items-center gap-1">
                      {domain.menteeNames.map((name) => (
                        <span
                          key={name}
                          className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                    <span>{domain.milestone}</span>
                    <span>{domain.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${domain.progress}%` }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* LEAD ACTIVITY & PROGRAM TELEMETRY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Track Sprints & Projects */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Active Chapter Projects
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Milestone projects currently built across the 4 tracks.
              </p>
            </div>
            <Link
              to="/lead/projects"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              All Projects <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Lead Activity Stream / Upcoming Deadlines */}
        <div className="space-y-4">
          <Card className="p-4 border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Upcoming Sprint Deadlines
            </h3>
            <div className="space-y-3">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  Phase 2 Code Review Submissions
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Web, Backend, App &amp; AI Tracks • Due Oct 18, 2026
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                  <Clock className="w-3 h-3" /> 14 days remaining
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  Google Cloud Study Jams Milestone 1
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  11 Mentees Enrolled • Vertex AI Badges
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Qwiklabs credits active
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  DevFest Mullana 2026 Demo Shortlist
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Faculty Advisor review of all 4 track repos
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-purple-600 dark:text-purple-400 font-medium">
                  <Sparkles className="w-3 h-3" /> Nov 14, 2026
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Mentoring Roster Link */}
          <Card className="p-4 border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Mentoring Roster Quick Access
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Inspect all 6 mentors or 11 mentees directory profiles.
            </p>
            <div className="flex gap-2">
              <Link to="/lead/mentors" className="flex-1">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  View 6 Mentors
                </Button>
              </Link>
              <Link to="/lead/mentees" className="flex-1">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  View 11 Mentees
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Events & Announcements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Upcoming Chapter Events
            </h2>
            <Link
              to="/lead/events"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Manage Events →
            </Link>
          </div>
          <div className="space-y-4">
            {events.slice(0, 2).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Chapter Announcements
            </h2>
            <Link
              to="/lead/announcements"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Post Notice →
            </Link>
          </div>
          <div className="space-y-4">
            {announcements.slice(0, 2).map((ann) => (
              <AnnouncementCard key={ann.id} announcement={ann} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
