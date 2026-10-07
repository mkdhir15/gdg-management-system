import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

export const CreateEventModal = ({ isOpen, onClose, onEventCreated }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [location, setLocation] = useState('Central Auditorium, MMDU Mullana');
  const [mode, setMode] = useState('In-Person');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!title.trim()) errs.title = 'Event title is required.';
    if (!date) errs.date = 'Event date is required.';
    if (!location.trim()) errs.location = 'Location or virtual meeting link is required.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const newEvent = {
        id: `event-${Date.now()}`,
        title: title.trim(),
        date,
        time,
        location: location.trim(),
        mode,
        description: description.trim() || 'Join us for this exciting Google Developer Groups MMDU chapter session.',
        attendees: 1,
      };

      if (onEventCreated) onEventCreated(newEvent);
      toast.success(`Event "${newEvent.title}" published successfully.`);
      setIsSubmitting(false);
      onClose();

      setTitle('');
      setDate('');
      setDescription('');
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create GDG Event"
      subtitle="Schedule a technical workshop, study jam, or hackathon for MMDU students"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Event Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Flutter Forward Extended: Building Responsive Multiplatform Apps"
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

        {/* Date, Time & Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full px-3 py-2 text-xs border rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 ${
                errors.date
                  ? 'border-rose-300 focus:ring-rose-200'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-600'
              }`}
            />
            {errors.date && <p className="text-[11px] text-rose-500 mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Format Mode
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50"
            >
              <option value="In-Person">In-Person</option>
              <option value="Virtual">Virtual (Google Meet)</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Venue / Meeting URL <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Mechanical Seminar Hall, Block 3, MMDU or https://meet.google.com/..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`w-full px-3 py-2 text-xs border rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 ${
              errors.location
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-200 dark:border-slate-700 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-600'
            }`}
          />
          {errors.location && <p className="text-[11px] text-rose-500 mt-1">{errors.location}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Event Description & Agenda
          </label>
          <textarea
            rows="3"
            placeholder="Key takeaways, speakers, prerequisites, or student registration instructions..."
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
            Publish Event
          </Button>
        </div>
      </form>
    </Modal>
  );
};
