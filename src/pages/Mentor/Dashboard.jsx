import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { TaskCard } from '../../components/tasks/TaskCard';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { AnnouncementCard } from '../../components/announcements/AnnouncementCard';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckSquare,
  FileCheck2,
  Calendar,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Plus,
  Users,
  Clock,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  taskService,
  projectService,
  submissionService,
  topicService,
  announcementService,
  userService,
} from '../../services/api';
import { GDG_MENTORS, GDG_MENTEES } from '../../data/gdgData';

export const MentorDashboard = () => {
  const { currentUser } = useAuth();

  // Find mentor profile, fallback to Harsh if currentUser is not a mentor
  const mentor =
    GDG_MENTORS.find(
      (m) => m.id === currentUser?.id || m.name.toLowerCase() === currentUser?.name?.toLowerCase()
    ) || GDG_MENTORS[0];

  const [myMentees, setMyMentees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const load = async () => {
      // 1. Fetch only mentees assigned to this specific mentor
      const menteesList = GDG_MENTEES.filter(
        (m) =>
          m.mentorId === mentor.id ||
          m.mentorName === mentor.name ||
          (mentor.assignedMenteeIds && mentor.assignedMenteeIds.includes(m.id))
      );
      setMyMentees(menteesList);

      // 2. Fetch tasks for this mentor's mentees
      const menteeNames = menteesList.map((m) => m.name);
      const allTasks = await taskService.getTasks();
      const filteredTasks = allTasks.filter(
        (t) =>
          t.mentor === mentor.name ||
          t.mentorId === mentor.id ||
          menteeNames.includes(t.assignedTo)
      );
      setTasks(filteredTasks);

      // 3. Fetch domain project
      const allProjects = await projectService.getProjects();
      const domainProjects = allProjects.filter(
        (p) =>
          p.domain === mentor.domain ||
          p.mentorId === mentor.id ||
          p.mentor.includes(mentor.name)
      );
      setProjects(domainProjects);

      // 4. Fetch submissions from this mentor's mentees
      const allSubmissions = await submissionService.getSubmissions();
      const filteredSubmissions = allSubmissions.filter(
        (s) =>
          s.mentorName === mentor.name ||
          s.mentorId === mentor.id ||
          menteeNames.includes(s.menteeName)
      );
      setSubmissions(filteredSubmissions);

      // 5. Fetch curriculum topics for this track
      const allTopics = await topicService.getTopics();
      const trackTopics = allTopics.filter(
        (t) => t.domainId === mentor.domainId || t.mentor.includes(mentor.name)
      );
      setTopics(trackTopics);

      // 6. Announcements
      const allAnnouncements = await announcementService.getAnnouncements();
      setAnnouncements(allAnnouncements);
    };

    load();
  }, [mentor.id, mentor.name, mentor.domain, mentor.domainId]);

  const pendingSubmissions = submissions.filter((s) => s.status === 'Under Review');

  return (
    <div className="space-y-6">
      {/* Mentor Header tailored to this specific mentor persona */}
      <DashboardHeader
        title={`Welcome, ${mentor.name}`}
        subtitle={`${mentor.domain} Track • ${mentor.department}`}
        badge={`${mentor.domain} Mentor`}
        actions={
          <Link to="/mentor/submissions">
            <Button size="sm" icon={FileCheck2}>
              Review Submissions ({pendingSubmissions.length})
            </Button>
          </Link>
        }
      />

      {/* Role Quick Actions */}
      <QuickActions role="MENTOR" />

      {/* 4 Focused Mentor Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="My Assigned Mentees"
          value={`${myMentees.length} Students`}
          subtitle={myMentees.map((m) => m.name).join(', ')}
          icon={Sparkles}
          accent="purple"
        />
        <StatCard
          title="Active Sprint Tasks"
          value={tasks.length}
          subtitle={`${tasks.filter((t) => t.status === 'In Progress').length} in progress`}
          icon={CheckSquare}
          accent="blue"
        />
        <StatCard
          title="Submissions to Review"
          value={pendingSubmissions.length}
          subtitle="Awaiting mentor validation"
          icon={FileCheck2}
          accent="yellow"
        />
        <StatCard
          title="Track Project Progress"
          value={projects[0] ? `${projects[0].progress}%` : '80%'}
          subtitle={projects[0]?.title || `${mentor.domain} Solution`}
          icon={GraduationCap}
          accent="green"
        />
      </div>

      {/* ================================================================ */}
      {/* 🧑‍🏫 MY MENTEES SECTION (Central Question: How are MY mentees progressing?) */}
      {/* ================================================================ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              My Mentees ({mentor.domain})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Students assigned to {mentor.name} for 1:1 guidance and code reviews.
            </p>
          </div>
          <Link
            to="/mentor/mentees"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            Mentee Profiles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myMentees.map((mentee) => {
            const menteeTasks = tasks.filter((t) => t.assignedToId === mentee.id || t.assignedTo === mentee.name);
            const menteeSubs = submissions.filter((s) => s.menteeId === mentee.id || s.menteeName === mentee.name);

            return (
              <Card key={mentee.id} className="p-4 border-slate-200 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <img
                    src={mentee.avatar}
                    alt={mentee.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-500/30 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {mentee.name}
                      </h3>
                      {mentee.name === 'Mohit' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold">
                          Developer
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {mentee.department}
                    </p>
                    <p className="text-[10px] text-purple-700 dark:text-purple-300 font-medium mt-0.5">
                      {mentee.track}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400">Sprint Tasks:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {menteeTasks.length} Assigned
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400">Submissions:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {menteeSubs.length} Received
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <Link to="/mentor/submissions" className="flex-1">
                    <Button size="xs" variant="outline" className="w-full text-[11px]">
                      View Work
                    </Button>
                  </Link>
                  <Link to="/mentor/feedback" className="flex-1">
                    <Button size="xs" variant="secondary" className="w-full text-[11px]">
                      Feedback
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Active Tasks & Submissions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Tasks Assigned by this Mentor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Sprint Tasks for {mentor.name}'s Mentees
            </h2>
            <Link
              to="/mentor/tasks"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              All Tasks <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {tasks.slice(0, 3).map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* Submissions & Code Reviews */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Recent PR Submissions
            </h2>
            <Link
              to="/mentor/submissions"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Review Queue <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {submissions.length === 0 ? (
              <Card className="p-6 text-center text-xs text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800">
                No pending submissions for this track right now.
              </Card>
            ) : (
              submissions.slice(0, 3).map((sub) => (
                <Card key={sub.id} className="p-3.5 border-slate-200 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {sub.taskTitle}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Submitted by <span className="font-semibold text-purple-600 dark:text-purple-400">{sub.menteeName}</span> • {sub.submittedAt}
                      </div>
                    </div>
                    <Badge variant={sub.status === 'Approved' ? 'green' : 'yellow'}>
                      {sub.status}
                    </Badge>
                  </div>
                  {sub.mentorFeedback && (
                    <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg italic">
                      "{sub.mentorFeedback}"
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Domain Project Card */}
      {projects.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {mentor.domain} Track Project
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        </div>
      )}

      {/* Announcements */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Chapter Announcements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {announcements.slice(0, 2).map((ann) => (
            <AnnouncementCard key={ann.id} announcement={ann} />
          ))}
        </div>
      </div>
    </div>
  );
};
