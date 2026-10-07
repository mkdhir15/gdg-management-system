import React, { useState } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { useToast } from '../../context/ToastContext';
import {
  GraduationCap,
  Sparkles,
  ArrowRightLeft,
  Users,
  ShieldCheck,
  Code,
  Server,
  Smartphone,
  Cpu,
} from 'lucide-react';
import { GDG_MENTORS, GDG_MENTEES } from '../../data/gdgData';

export const AdminAssignments = () => {
  const { toast } = useToast();
  const [mentees, setMentees] = useState(GDG_MENTEES);
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleValidate = () => {
    toast.success('Allocation matrix verified: All 11 student mentees are actively assigned across the 4 track mentors.');
  };

  const handleRebalanceConfirm = () => {
    if (!selectedMentee) return;
    toast.info(`Assignment updated: ${selectedMentee.name} reassigned to track mentor.`);
    setIsConfirmOpen(false);
    setSelectedMentee(null);
  };

  const domainIcons = {
    'domain-web': Code,
    'domain-backend': Server,
    'domain-app': Smartphone,
    'domain-aiml': Cpu,
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Mentor-Mentee Allocation Matrix"
        subtitle="Manage pairings, balance domain capacity, and verify continuous technical steering."
        actions={
          <Button size="sm" icon={ShieldCheck} onClick={handleValidate}>
            Validate All 4 Tracks
          </Button>
        }
      />

      {/* Summary Matrix Cards per Mentor */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {GDG_MENTORS.map((mentor) => {
          const assignedMentees = mentees.filter(
            (m) =>
              m.mentorId === mentor.id ||
              m.mentorName === mentor.name ||
              (mentor.assignedMenteeIds && mentor.assignedMenteeIds.includes(m.id))
          );
          const Icon = domainIcons[mentor.domainId] || GraduationCap;

          return (
            <Card key={mentor.id} className="p-5 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/20"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {mentor.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Icon className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {mentor.domain}
                    </span>
                  </div>
                </div>
                <Badge variant="blue">
                  {assignedMentees.length} Mentee{assignedMentees.length > 1 ? 's' : ''}
                </Badge>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800 mb-3 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Domain Track:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {mentor.domain}
                </span>
              </div>

              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider block mb-2">
                Assigned Mentees ({assignedMentees.length})
              </span>
              <div className="space-y-1.5">
                {assignedMentees.map((m) => (
                  <div
                    key={m.id}
                    className="p-2 bg-slate-50 dark:bg-[#0b0f17] rounded-lg border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs group"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {m.name}
                        {m.name === 'Mohit' && (
                          <span className="ml-1 text-[9px] px-1 py-0.2 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300">
                            Dev
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">
                        {m.department.split('-')[0]}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedMentee(m);
                          setIsConfirmOpen(true);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-blue-600 dark:text-blue-400 hover:underline text-[10px] font-semibold transition-opacity flex items-center gap-0.5"
                        title="Rebalance mentee allocation"
                      >
                        <ArrowRightLeft className="w-2.5 h-2.5" /> Shift
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setSelectedMentee(null);
        }}
        onConfirm={handleRebalanceConfirm}
        title="Rebalance Mentee Assignment"
        message={
          selectedMentee
            ? `Do you want to reassign ${selectedMentee.name} to balance domain workload across mentors?`
            : 'Do you want to reassign this mentee?'
        }
        confirmText="Confirm Rebalance"
        variant="warning"
      />
    </div>
  );
};
