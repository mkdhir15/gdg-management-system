import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { complaintService } from '../../services/api';

export const NewComplaintModal = ({ isOpen, onClose, onCreated }) => {
  const { currentUser, role } = useAuth();
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Mentorship Cadence');
  const [targetRole, setTargetRole] = useState(role === 'MENTEE' ? 'MENTOR' : 'ADMIN');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await complaintService.submitComplaint({
        subject: subject.trim(),
        category,
        targetRole,
        priority,
        description: description.trim(),
        submittedBy: currentUser?.name || 'Student Member',
        submittedByRole: role,
      });

      if (res.success && onCreated) {
        onCreated(res.complaint);
      }
      toast.success('Grievance logged in registry successfully.');
      onClose();
      // Reset form
      setSubject('');
      setDescription('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="File Issue or Grievance"
      subtitle="Confidential submission to GDG Admin and Leadership."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Subject Line <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Brief summary of the issue or blockage"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100 bg-white dark:bg-[#0b0f17]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100"
            >
              <option value="Mentorship Cadence">Mentorship Cadence</option>
              <option value="Lab Infrastructure">Lab Infrastructure</option>
              <option value="Project Review">Project Review</option>
              <option value="Communication">Communication</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Recipient Role
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100"
            >
              <option value="ADMIN">Lead Admin</option>
              <option value="LEAD">Campus Lead</option>
              <option value="MENTOR">Mentor Council</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Urgency
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High (Urgent)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Detailed Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            placeholder="Please detail dates, project names, and specific steps required to resolve."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100 bg-white dark:bg-[#0b0f17] leading-relaxed"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            variant="danger"
            isLoading={isSubmitting}
          >
            Submit Grievance
          </Button>
        </div>
      </form>
    </Modal>
  );
};
