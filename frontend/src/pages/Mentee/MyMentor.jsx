import React from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { GDG_MENTEES, GDG_MENTORS } from '../../data/gdgData';
import { Mail, Phone, MapPin, Calendar, GraduationCap, Award, MessageSquare, Clock } from 'lucide-react';

export const MenteeMentor = () => {
  const { currentUser } = useAuth();

  // Find mentee, default to Mohit
  const mentee =
    GDG_MENTEES.find(
      (m) => m.id === currentUser?.id || m.name.toLowerCase() === currentUser?.name?.toLowerCase()
    ) || GDG_MENTEES.find((m) => m.name === 'Mohit') || GDG_MENTEES[0];

  // Find assigned mentor
  const mentor =
    GDG_MENTORS.find(
      (m) => m.id === mentee.mentorId || m.name.toLowerCase() === mentee.mentorName?.toLowerCase()
    ) || GDG_MENTORS[0];

  return (
    <div className="space-y-6 max-w-4xl">
      <DashboardHeader
        title={`My Mentor • ${mentor.name}`}
        subtitle={`Direct technical steering for the ${mentee.domain} Track.`}
      />

      <Card className="p-6 border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-100 dark:border-slate-800">
          <img
            src={mentor.avatar}
            alt={mentor.name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-500/20 shadow-xs"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-2">
              <GraduationCap className="w-3.5 h-3.5" /> Assigned Technical Mentor
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{mentor.name}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{mentor.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{mentor.department}</p>
          </div>
        </div>

        <div className="py-6 space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              About &amp; Mentoring Focus
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {mentor.bio}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-semibold uppercase">Email Channel</span>
                <span className="text-xs text-slate-700 dark:text-slate-200 font-medium truncate block">{mentor.email}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-semibold uppercase">Sprint Office Hours</span>
                <span className="text-xs text-slate-700 dark:text-slate-200 font-medium">Wednesdays &amp; Fridays • 4:00 - 5:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
          <Button size="sm" icon={MessageSquare}>
            Request 1:1 Sprint Review
          </Button>
          <Button size="sm" variant="outline">
            View Track Syllabus Topics
          </Button>
        </div>
      </Card>
    </div>
  );
};
