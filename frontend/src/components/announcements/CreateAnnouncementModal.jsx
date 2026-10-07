import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export const CreateAnnouncementModal = ({ isOpen, onClose, onAnnouncementCreated }) => {
  const { toast } = useToast();
  const { currentUser, role } = useAuth();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Academic / Mentoring');
  const [priority, setPriority] = useState('Normal');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!title.trim()) errs.title = 'Announcement title is required.';
    if (!content.trim()) errs.content = 'Message content cannot be blank.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const newAnnouncement = {
        id: `announcement-${Date.now()}`,
        title: title.trim(),
        category,
        priority,
        content: content.trim(),
        author: currentUser?.name || 'GDG MMDU Administration',
        authorRole: role,
        date: new Date().toISOString().split('T')[0],
      };

      if (onAnnouncementCreated) onAnnouncementCreated(newAnnouncement);
      toast.success('Announcement broadcasted to chapter successfully.');
      setIsSubmitting(false);
      onClose();

      setTitle('');
      setContent('');
      setCategory('Academic / Mentoring');
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Broadcast Announcement"
      subtitle="Publish an official broadcast to all students, mentors, and leads"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Announcement Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Sprint 3 Code Review Submission Window Open"
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

        {/* Category & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50"
            >
              <option value="Academic / Mentoring">Academic / Mentoring</option>
              <option value="Event / Study Jam">Event / Study Jam</option>
              <option value="Competition">Solution Challenge</option>
              <option value="General Notice">General Chapter Notice</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50"
            >
              <option value="Normal">Normal</option>
              <option value="Important">Important</option>
              <option value="Urgent">Urgent Broadcast</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Announcement Content <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows="4"
            placeholder="Type your announcement details, instructions, links, or expectations..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full px-3 py-2 text-xs border rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 ${
              errors.content
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-200 dark:border-slate-700 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-600'
            }`}
          />
          {errors.content && <p className="text-[11px] text-rose-500 mt-1">{errors.content}</p>}
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting}>
            Publish Announcement
          </Button>
        </div>
      </form>
    </Modal>
  );
};
