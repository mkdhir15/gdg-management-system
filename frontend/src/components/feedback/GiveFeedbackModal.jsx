import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';
import { Star } from 'lucide-react';

export const GiveFeedbackModal = ({ isOpen, onClose, menteeName, taskTitle, onFeedbackSubmitted }) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const [status, setStatus] = useState('Approved'); // 'Approved' | 'Needs Revision'
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comments.trim()) {
      setErrors({ comments: 'Feedback comments are required.' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      if (onFeedbackSubmitted) {
        onFeedbackSubmitted({
          rating,
          comments: comments.trim(),
          status,
          date: new Date().toISOString().split('T')[0],
        });
      }
      toast.success(`Feedback for ${menteeName || 'mentee'} submitted successfully.`);
      setIsSubmitting(false);
      onClose();
      setComments('');
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit Mentorship Review"
      subtitle={`Provide structured feedback for ${menteeName || 'Mentee'} on ${taskTitle || 'Deliverable'}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating Stars */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Deliverable Quality Score (1-5)
          </label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`p-1.5 rounded-lg transition-transform active:scale-95 ${
                  rating >= star
                    ? 'text-amber-500 hover:text-amber-600'
                    : 'text-slate-300 dark:text-slate-700 hover:text-slate-400'
                }`}
                aria-label={`Rate ${star} star`}
              >
                <Star className="w-5 h-5 fill-current" />
              </button>
            ))}
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 ml-2">
              {rating === 5 ? 'Exceptional' : rating === 4 ? 'Good' : rating === 3 ? 'Satisfactory' : 'Needs Work'}
            </span>
          </div>
        </div>

        {/* Verification Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Review Decision
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50"
          >
            <option value="Approved">Approved (Meets Sprint Acceptance Criteria)</option>
            <option value="Needs Revision">Needs Revision (Resubmission Requested)</option>
          </select>
        </div>

        {/* Comments */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Feedback & Actionable Guidance <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows="4"
            placeholder="Highlight strengths, architecture advice, test coverage remarks, or code styling improvements..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className={`w-full px-3 py-2 text-xs border rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 ${
              errors.comments
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-200 dark:border-slate-700 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-600'
            }`}
          />
          {errors.comments && <p className="text-[11px] text-rose-500 mt-1">{errors.comments}</p>}
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting}>
            Submit Feedback
          </Button>
        </div>
      </form>
    </Modal>
  );
};
