import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { TaskCard } from '../../components/tasks/TaskCard';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { taskService } from '../../services/api';
import { GDG_MENTEES } from '../../data/gdgData';
import { UploadCloud, CheckCircle2, CheckSquare, Search } from 'lucide-react';

export const MenteeTasks = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const mentee =
    GDG_MENTEES.find(
      (m) => m.id === currentUser?.id || m.name.toLowerCase() === currentUser?.name?.toLowerCase()
    ) || GDG_MENTEES.find((m) => m.name === 'Mohit') || GDG_MENTEES[0];

  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [activeTask, setActiveTask] = useState(null);
  const [repoUrl, setRepoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await taskService.getTasks({
        assignedToId: mentee.id,
        assignedToName: mentee.name,
      });
      setTasks(data);
    };
    load();
  }, [mentee.id, mentee.name]);

  const handleSubmitWork = (e) => {
    e.preventDefault();
    if (!activeTask) return;
    if (!repoUrl.trim() || !repoUrl.startsWith('http')) {
      toast.error('Please provide a valid GitHub pull request URL (starts with http).');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeTask.id ? { ...t, status: 'Submitted' } : t
        )
      );
      toast.success(`Task "${activeTask.title}" submitted to mentor for code review!`);
      setIsSubmitting(false);
      setActiveTask(null);
      setRepoUrl('');
      setNotes('');
    }, 400);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filterStatus !== 'ALL' && t.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={`My Sprint Tasks • ${mentee.name}`}
        subtitle={`Track deliverables and submit GitHub pull requests for mentor review in ${mentee.domain}.`}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-[#111827] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search deliverables..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100 bg-white dark:bg-[#0b0f17]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['ALL', 'In Progress', 'Submitted', 'Approved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {status === 'ALL' ? 'All Deliverables' : status}
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
              ? 'No deliverables match your search criteria.'
              : 'You have no active tasks assigned in this sprint.'
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="flex flex-col">
              <TaskCard task={task} role="MENTEE" />
              {task.status !== 'Approved' && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-2 w-full text-xs"
                  icon={UploadCloud}
                  onClick={() => setActiveTask(task)}
                >
                  {task.status === 'Submitted' ? 'Update Submission' : 'Submit Pull Request'}
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Submit Work Modal */}
      {activeTask && (
        <Modal
          isOpen={!!activeTask}
          onClose={() => setActiveTask(null)}
          title={`Submit Work: ${activeTask.title}`}
          subtitle={`Deliverable for mentor review in ${mentee.domain}`}
        >
          <form onSubmit={handleSubmitWork} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                GitHub Pull Request / Branch URL <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://github.com/gdg-mmdu/.../pull/1"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 dark:bg-[#0b0f17] dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Implementation Notes &amp; Test Summary
              </label>
              <textarea
                rows={3}
                placeholder="Explain what changes were made, how to test them, and any questions for your mentor..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 dark:bg-[#0b0f17] dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setActiveTask(null)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" icon={UploadCloud} isLoading={isSubmitting}>
                Submit to Mentor
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
