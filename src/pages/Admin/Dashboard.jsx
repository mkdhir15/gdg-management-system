import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { EventCard } from '../../components/events/EventCard';
import { AnnouncementCard } from '../../components/announcements/AnnouncementCard';
import { ComplaintCard } from '../../components/complaints/ComplaintCard';
import { NewComplaintModal } from '../../components/complaints/NewComplaintModal';
import { QuickActions } from '../../components/dashboard/QuickActions';
import {
  Users,
  GraduationCap,
  Sparkles,
  FolderGit2,
  Calendar,
  AlertCircle,
  Plus,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  dashboardService,
  projectService,
  eventService,
  announcementService,
  complaintService,
} from '../../services/api';
import { GDG_MENTORS, GDG_MENTEES, GDG_DOMAINS, GDG_PROJECTS } from '../../data/gdgData';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [s, p, e, a, c] = await Promise.all([
        dashboardService.getOverviewStats('ADMIN'),
        projectService.getProjects(),
        eventService.getEvents(),
        announcementService.getAnnouncements(),
        complaintService.getComplaints(),
      ]);
      setStats(s);
      setProjects(p);
      setEvents(e);
      setAnnouncements(a);
      setComplaints(c);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <DashboardHeader
        title="Admin Governance Dashboard"
        subtitle="Maharishi Markandeshwar (Deemed to be University) • Google Developer Group System Overview"
        badge="Faculty Advisor / Admin"
        actions={
          <>
            <Link to="/admin/assignments">
              <Button variant="outline" size="sm">
                Manage Allocations
              </Button>
            </Link>
            <Button
              variant="danger"
              size="sm"
              icon={AlertCircle}
              onClick={() => setIsComplaintModalOpen(true)}
            >
              Log Issue / Grievance
            </Button>
          </>
        }
      />

      {/* Role Quick Actions */}
      <QuickActions role="ADMIN" />

      {/* 4 Primary System Metric Cards with Google Accents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Faculty & Mentors"
          value={stats?.totalMentors || GDG_MENTORS.length}
          subtitle="4 tracks with assigned leads"
          icon={GraduationCap}
          accent="blue"
          trend="6 Mentors active"
          trendType="up"
        />
        <StatCard
          title="Total Student Mentees"
          value={stats?.totalMentees || GDG_MENTEES.length}
          subtitle="100% paired with mentors"
          icon={Sparkles}
          accent="green"
          trend="11 Mentees active"
          trendType="up"
        />
        <StatCard
          title="Mentoring Domains"
          value={stats?.totalDomains || GDG_DOMAINS.length}
          subtitle="Web, Backend, App, AI &amp; ML"
          icon={Layers}
          accent="yellow"
          trend="4 Tracks"
          trendType="neutral"
        />
        <StatCard
          title="Active Projects"
          value={stats?.totalProjects || GDG_PROJECTS.length}
          subtitle="Campus engineering solutions"
          icon={FolderGit2}
          accent="purple"
          trend="84.6% Velocity"
          trendType="up"
        />
      </div>

      {/* SYSTEM OVERVIEW: Track Allocation & Capacity Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              System Domain Allocation Matrix
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              High-level supervisory overview of mentor and student distribution across tracks.
            </p>
          </div>
          <Link
            to="/admin/assignments"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            Assignment Roster <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GDG_DOMAINS.map((domain) => (
            <Card key={domain.id} className="p-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {domain.name}
                </span>
                <Badge variant={domain.color === 'blue' ? 'blue' : domain.color === 'green' ? 'green' : domain.color === 'yellow' ? 'yellow' : 'purple'}>
                  {domain.progress}%
                </Badge>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Mentor:</span>{' '}
                  {domain.mentorNames.join(', ')}
                </div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Mentees:</span>{' '}
                  {domain.menteeNames.join(', ')}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Middle Grid: Active Tech Projects & Governance Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Active Campus Projects
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Initiatives currently under development across the 4 chapter domains.
              </p>
            </div>
            <Link
              to="/admin/projects"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              All Projects <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.slice(0, 2).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Quick Oversight Sidebar (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Governance &amp; Actions
            </h2>
            <Badge variant="blue">Real-time</Badge>
          </div>

          <Card className="p-4 space-y-3 border-slate-200 dark:border-slate-800">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Sprint Review Cadence
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Mid-term review cycle for Web, Backend, App, and AI tracks begins next week.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded">
                  On Schedule
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">84.6% Target Met</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Lab Infrastructure Status
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Lab 4 Cloud Study Jams workstations configured with Docker, Python, and GCP tools.
              </p>
              <span className="mt-2 inline-block text-[10px] font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded">
                All 60 Terminals Ready
              </span>
            </div>

            <div className="pt-2">
              <Link to="/admin/assignments">
                <Button variant="outline" size="sm" className="w-full">
                  Open Allocation Matrix
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Complaints Requiring Resolution */}
      {complaints.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Grievance &amp; Issue Resolution Registry
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Active issues submitted by mentees, mentors, or campus organizers.
              </p>
            </div>
            <Link
              to="/admin/complaints"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Open Registry →
            </Link>
          </div>
          <div className="space-y-3">
            {complaints.map((c) => (
              <ComplaintCard key={c.id} complaint={c} />
            ))}
          </div>
        </div>
      )}

      {/* Events & Announcements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Upcoming Chapter Events
            </h2>
            <Link
              to="/admin/events"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              All Events →
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
              to="/admin/announcements"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Manage Bulletins →
            </Link>
          </div>
          <div className="space-y-4">
            {announcements.slice(0, 2).map((ann) => (
              <AnnouncementCard key={ann.id} announcement={ann} />
            ))}
          </div>
        </div>
      </div>

      <NewComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={() => setIsComplaintModalOpen(false)}
      />
    </div>
  );
};
