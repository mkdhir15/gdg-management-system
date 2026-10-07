import React from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import {
  FileBarChart,
  Download,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { GDG_DOMAINS, GDG_MENTORS, GDG_MENTEES } from '../../data/gdgData';

export const LeadReports = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Chapter Analytics &amp; Reports"
        subtitle="Operational telemetry, student track distributions, and sprint milestone completions."
        actions={
          <Button size="sm" icon={Download} variant="outline">
            Export Chapter Report
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Overall Sprint Completion"
          value="84.6%"
          subtitle="Target threshold: > 80%"
          accent="green"
          trend="↑ 4.2% from Sprint 1"
          trendType="up"
        />
        <StatCard
          title="Track Pairing Ratio"
          value="100%"
          subtitle="All 11 mentees paired"
          accent="blue"
          trend="6 Mentors active"
          trendType="neutral"
        />
        <StatCard
          title="Mentee Satisfaction"
          value="4.9 / 5.0"
          subtitle="From 11 surveyed mentees"
          accent="yellow"
          trend="Top tier rating"
          trendType="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Track Enrollment Breakdown
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Distribution of {GDG_MENTEES.length} mentees across the 4 technology domains.
          </p>

          <div className="space-y-4">
            {GDG_DOMAINS.map((domain) => {
              const percentage = Math.round((domain.menteeNames.length / GDG_MENTEES.length) * 100);
              const colorClasses = {
                blue: 'bg-blue-600 dark:bg-blue-500',
                green: 'bg-emerald-600 dark:bg-emerald-500',
                yellow: 'bg-amber-500 dark:bg-amber-400',
                purple: 'bg-purple-600 dark:bg-purple-500',
              }[domain.color] || 'bg-blue-600';

              return (
                <div key={domain.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {domain.name}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {domain.menteeNames.length} Students ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colorClasses} rounded-full`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    Mentor: {domain.mentorNames.join(', ')} • Mentees: {domain.menteeNames.join(', ')}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Sprint Velocity &amp; Mentoring Performance
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Milestone achievements and PR code review cadence across tracks.
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  Web Development (Harsh)
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  3 Mentees • Sprint 3 in progress
                </div>
              </div>
              <Badge variant="blue">82% Velocity</Badge>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  Backend Development (Harshit)
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  3 Mentees • JWT schema complete
                </div>
              </div>
              <Badge variant="green">78% Velocity</Badge>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  App Development (Sujal, Neil, Krish)
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  3 Mentees • QR scanner integration
                </div>
              </div>
              <Badge variant="yellow">74% Velocity</Badge>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  AI &amp; ML (Poras)
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  2 Mentees • Gemini RAG vector search
                </div>
              </div>
              <Badge variant="purple">88% Velocity</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
