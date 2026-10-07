import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { TaskCard } from '../../components/tasks/TaskCard';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { CreateTaskModal } from '../../components/tasks/CreateTaskModal';
import { useAuth } from '../../context/AuthContext';
import { taskService } from '../../services/api';
import { GDG_MENTORS, GDG_MENTEES } from '../../data/gdgData';
import { Plus, CheckSquare, Search } from 'lucide-react';

export const MentorTasks = () => {
  const { currentUser } = useAuth();
  const mentor =
    GDG_MENTORS.find(
      (m) => m.id === currentUser?.id || m.name.toLowerCase() === currentUser?.name?.toLowerCase()
    ) || GDG_MENTORS[0];

  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mentees assigned to this specific mentor
  const myMentees = GDG_MENTEES.filter(
    (m) =>
      m.mentorId === mentor.id ||
      m.mentorName === mentor.name ||
      (mentor.assignedMenteeIds && mentor.assignedMenteeIds.includes(m.id))
  );

  useEffect(() => {
    const load = async () => {
      const data = await taskService.getTasks({ mentorId: mentor.id, mentorName: mentor.name });
      setTasks(data);
    };
    load();
  }, [mentor.id, mentor.name]);

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filterStatus !== 'ALL' && t.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        (t.assignedTo && t.assignedTo.toLowerCase().includes(q)) ||
        (t.description && t.description.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={`Sprint Tasks • ${mentor.name}'s Mentees`}
        subtitle={`Deliverables and code review milestones for the ${mentor.domain} Track.`}
        actions={
          <Button size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Assign New Task
          </Button>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-[#111827] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tasks or mentee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100 bg-white dark:bg-[#0b0f17]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['ALL', 'In Progress', 'Under Review', 'Completed', 'Approved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {status === 'ALL' ? 'All Tasks' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Task Grid or Empty State */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="No tasks found"
          description={
            search || filterStatus !== 'ALL'
              ? 'No tasks match your selected filter criteria.'
              : `No sprint deliverables assigned yet for ${mentor.domain}.`
          }
          action={
            <Button size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
              Assign First Task
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} role="MENTOR" />
          ))}
        </div>
      )}

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={handleTaskCreated}
        mentorDomain={mentor.domain}
        defaultAssignees={myMentees}
      />
    </div>
  );
};
