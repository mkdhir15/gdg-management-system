import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';
import { GDG_MENTEES } from '../../data/gdgData';

export const CreateTaskModal = ({ isOpen, onClose, onTaskCreated, mentorDomain, defaultAssignees = [] }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter mentees by domain if specified
  const mentees = defaultAssignees.length > 0 
    ? defaultAssignees 
    : mentorDomain 
    ? GDG_MENTEES.filter((m) => m.domain === mentorDomain)
    : GDG_MENTEES;

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!title.trim()) errs.title = 'Task title is required.';
    if (!assignedTo) errs.assignedTo = 'Please select a mentee to assign.';
    if (!deadline) errs.deadline = 'Submission deadline is required.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const newTask = {
        id: `task-${Date.now()}`,
        title: title.trim(),
        description: description.trim() || 'Complete assigned milestone deliverables.',
        assignedTo,
        deadline,
        priority,
        status: 'In Progress',
        domain: mentorDomain || 'General',
      };

      if (onTaskCreated) onTaskCreated(newTask);
      toast.success(`Task "${newTask.title}" assigned successfully.`);
      setIsSubmitting(false);
      onClose();
      // Reset form
      setTitle('');
      setDescription('');
      setAssignedTo('');
      setDeadline('');
      setPriority('Medium');
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Sprint Deliverable"
      subtitle="Create a tracked milestone task for your student mentees"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Task Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Implement Responsive Sidebar Navigation"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2 text-xs border rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 ${
              errors.title
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-200 dark:border-slate-700 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-600'
            }`}
          />
          {errors.title && <p className="text-[11px] text-rose-500 mt-1">{errors.title}</p>}
        </div>

        {/* Assignee & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Assign To Mentee <span className="text-rose-500">*</span>
            </label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className={`w-full px-3 py-2 text-xs border rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 ${
                errors.assignedTo
                  ? 'border-rose-300 focus:ring-rose-200'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-600'
              }`}
            >
              <option value="">Select a student mentee...</option>
              {mentees.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name} ({m.domain || m.track})
                </option>
              ))}
            </select>
            {errors.assignedTo && <p className="text-[11px] text-rose-500 mt-1">{errors.assignedTo}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Milestone Deadline <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={`w-full px-3 py-2 text-xs border rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 ${
              errors.deadline
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-200 dark:border-slate-700 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-600'
            }`}
          />
          {errors.deadline && <p className="text-[11px] text-rose-500 mt-1">{errors.deadline}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Task Guidelines & Instructions
          </label>
          <textarea
            rows="3"
            placeholder="Specify expectations, pull request requirements, or reference docs..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50"
          />
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting}>
            Assign Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};
