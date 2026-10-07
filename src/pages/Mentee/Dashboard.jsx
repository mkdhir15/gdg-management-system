import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { TaskCard } from '../../components/tasks/TaskCard';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { EventCard } from '../../components/events/EventCard';
import { AnnouncementCard } from '../../components/announcements/AnnouncementCard';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckSquare,
  Clock,
  ExternalLink,
  MessageSquare,
  ArrowRight,
  Mail,
  Send,
  CheckCircle2,
  FolderGit2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  taskService,
  projectService,
  submissionService,
  announcementService,
  eventService,
} from '../../services/api';
import { GDG_MENTEES, GDG_MENTORS } from '../../data/gdgData';

export const MenteeDashboard = () => {
  const { currentUser } = useAuth();

  // Find mentee profile, default to Mohit (project developer / mentee)
  const mentee =
    GDG_MENTEES.find(
      (m) => m.id === currentUser?.id || m.name.toLowerCase() === currentUser?.name?.toLowerCase()
    ) || GDG_MENTEES.find((m) => m.name === 'Mohit') || GDG_MENTEES[0];

  // Find assigned mentor
  const mentor =
    GDG_MENTORS.find(
      (m) => m.id === mentee.mentorId || m.name.toLowerCase() === mentee.mentorName?.toLowerCase()
    ) || GDG_MENTORS[0];

  const [myTasks, setMyTasks] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [mySubmissions, setMySubmissions] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const load = async () => {
      // 1. Fetch only this mentee's personal tasks
      const allTasks = await taskService.getTasks();
      const filteredTasks = allTasks.filter(
        (t) => t.assignedToId === mentee.id || t.assignedTo === mentee.name
      );
      setMyTasks(filteredTasks);

      // 2. Fetch only this mentee's domain project
      const allProjects = await projectService.getProjects();
      const filteredProjects = allProjects.filter(
        (p) => p.domain === mentee.domain || p.mentees.includes(mentee.name)
      );
      setMyProjects(filteredProjects);

      // 3. Fetch only this mentee's submissions
      const allSubmissions = await submissionService.getSubmissions();
      const filteredSubs = allSubmissions.filter(
        (s) => s.menteeId === mentee.id || s.menteeName === mentee.name
      );
      setMySubmissions(filteredSubs);

      // 4. Events & Announcements
      const [e, a] = await Promise.all([
        eventService.getEvents(),
        announcementService.getAnnouncements(),
      ]);
      setEvents(e);
      setAnnouncements(a);
    };

    load();
  }, [mentee.id, mentee.name, mentee.domain]);

  const latestFeedback = mySubmissions.find((s) => s.mentorFeedback);

  return (
    <div className="space-y-6">
      {/* Personalized Mentee Header */}
      <DashboardHeader
        title={`Welcome back, ${mentee.name}`}
        subtitle={`${mentee.track} • Assigned Mentor: ${mentor.name}`}
        badge={`${mentee.domain} Track`}
        actions={
          <Link to="/mentee/tasks">
            <Button size="sm" icon={CheckSquare}>
              Submit Sprint Task
            </Button>
          </Link>
        }
      />

      {/* Role Quick Actions */}
      <QuickActions role="MENTEE" />

      {/* 4 Focused Personal Mentee Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="My Assigned Tasks"
          value={myTasks.length}
          subtitle={`${myTasks.filter((t) => t.status !== 'Approved').length} pending action`}
          icon={CheckSquare}
          accent="blue"
        />
        <StatCard
          title="Milestone Project"
          value={myProjects[0] ? `${myProjects[0].progress}%` : '78%'}
          subtitle={myProjects[0]?.title || 'Campus Solution'}
          icon={Sparkles}
          accent="green"
          trend="On Track"
          trendType="up"
        />
        <StatCard
          title="My Submissions"
          value={mySubmissions.length}
          subtitle={`${mySubmissions.filter((s) => s.status === 'Approved').length} approved by mentor`}
          icon={BookOpen}
          accent="purple"
        />
        <StatCard
          title="Upcoming Milestone"
          value="Oct 18"
          subtitle="Sprint 2 Pull Request Deadline"
          icon={Clock}
          accent="yellow"
        />
      </div>

      {/* ================================================================ */}
      {/* 🧑🎓 MY MENTOR & PERSONAL STATUS (Personal Experience)            */}
      {/* ================================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mentor Card */}
        <Card className="p-5 border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Assigned Mentor
            </span>
            <Badge variant="blue">{mentee.domain}</Badge>
          </div>

          <div className="flex items-center gap-3.5 mb-4">
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/30"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {mentor.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {mentor.title}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {mentor.bio}
          </p>

          <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">{mentor.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
              <span>{mentor.campus}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Link to="/mentee/mentor">
              <Button size="sm" variant="outline" className="w-full text-xs">
                View Mentor Syllabus &amp; Office Hours
              </Button>
            </Link>
          </div>
        </Card>

        {/* My Tasks Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                My Sprint Tasks
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tasks assigned to {mentee.name} by mentor {mentor.name}.
              </p>
            </div>
            <Link
              to="/mentee/tasks"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              All My Tasks <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {myTasks.length === 0 ? (
              <Card className="p-6 text-center text-xs text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800">
                All sprint tasks completed! Check back after next Wednesday's sync.
              </Card>
            ) : (
              myTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Latest Mentor Feedback Banner (If available) */}
      {latestFeedback && (
        <Card className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-800/60">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 dark:text-emerald-200">
                  Latest Mentor Review from {mentor.name}
                </span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                  Score: {latestFeedback.score ? `${latestFeedback.score}/100` : 'Approved'}
                </span>
              </div>
              <p className="text-emerald-800 dark:text-emerald-300 mt-1 italic">
                "{latestFeedback.mentorFeedback}"
              </p>
              <div className="mt-2 text-[11px] text-emerald-700/80 dark:text-emerald-400">
                Task: {latestFeedback.taskTitle} • Submitted {latestFeedback.submittedAt}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* My Project Overview */}
      {myProjects.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              My Assigned Project ({mentee.domain})
            </h2>
            <Link
              to="/mentee/projects"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Project Details →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
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
              to="/mentee/events"
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
              to="/mentee/announcements"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Bulletins →
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
