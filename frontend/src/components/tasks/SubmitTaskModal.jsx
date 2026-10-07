import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';
import { Github, Link as LinkIcon } from 'lucide-react';

export const SubmitTaskModal = ({ isOpen, onClose, task, onSubmitted }) => {
  const { toast } = useToast();
  const [prUrl, setPrUrl] = useState('');
  const [deploymentUrl, setDeploymentUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!prUrl.trim() || !prUrl.startsWith('http')) {
      errs.prUrl = 'Please provide a valid GitHub PR or repository link (starts with http).';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const submission = {
        id: `sub-${Date.now()}`,
        taskId: task?.id || 'task-general',
        taskTitle: task?.title || 'Sprint Deliverable',
        prUrl: prUrl.trim(),
        deploymentUrl: deploymentUrl.trim(),
        notes: notes.trim(),
        status: 'Under Review',
        submittedAt: 'Just now',
      };

      if (onSubmitted) onSubmitted(submission);
      toast.success('Sprint deliverable submitted for mentor review.');
      setIsSubmitting(false);
      onClose();

      setPrUrl('');
      setDeploymentUrl('');
      setNotes('');
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit Sprint Deliverable"
      subtitle={task ? `Task: ${task.title}` : 'Submit your code milestone for review'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* GitHub PR URL */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            GitHub Pull Request / Repository URL <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Github className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              placeholder="https://github.com/gdg-mmdu/.../pull/1"
              value={prUrl}
              onChange={(e) => setPrUrl(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 text-xs border rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 ${
                errors.prUrl
                  ? 'border-rose-300 focus:ring-rose-200'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-600'
              }`}
            />
          </div>
          {errors.prUrl && <p className="text-[11px] text-rose-500 mt-1">{errors.prUrl}</p>}
        </div>

        {/* Live Demo or Preview URL */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Preview / Deployment Link (Optional)
          </label>
          <div className="relative">
            <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              placeholder="https://mmdu-gdg-preview.web.app"
              value={deploymentUrl}
              onChange={(e) => setDeploymentUrl(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Notes for Mentor
          </label>
          <textarea
            rows="3"
            placeholder="Briefly describe what you implemented, challenges encountered, or specific files for mentor review..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50"
          />
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting}>
            Submit Work
          </Button>
        </div>
      </form>
    </Modal>
  );
};
