import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';
import { MOCK_ROLES, GDG_DOMAINS } from '../../data/gdgData';

export const InviteUserModal = ({ isOpen, onClose, onUserCreated }) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(MOCK_ROLES.MENTEE);
  const [domainId, setDomainId] = useState('domain-web');
  const [department, setDepartment] = useState('B.Tech CSE - 3rd Year');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!name.trim()) errs.name = 'Full name is required.';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid MMDU email is required.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const selectedDomain = GDG_DOMAINS.find((d) => d.id === domainId);
      const newUser = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        role,
        domain: selectedDomain?.name || 'General',
        domainId,
        department,
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0],
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200`,
      };

      if (onUserCreated) onUserCreated(newUser);
      toast.success(`Invitation successfully sent to ${newUser.name}.`);
      setIsSubmitting(false);
      onClose();

      setName('');
      setEmail('');
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite Chapter Member"
      subtitle="Register a new student, mentor, or lead to GDG on Campus MMDU"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Ananya Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 text-xs border rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 ${
              errors.name
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-200 dark:border-slate-700 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-600'
            }`}
          />
          {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            University Email <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            placeholder="e.g. ashanna@mmumullana.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 text-xs border rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-200 dark:border-slate-700 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-600'
            }`}
          />
          {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
        </div>

        {/* Role & Domain */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Designation Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50"
            >
              <option value={MOCK_ROLES.MENTEE}>Student Mentee</option>
              <option value={MOCK_ROLES.MENTOR}>Faculty / Domain Mentor</option>
              <option value={MOCK_ROLES.LEAD}>Track / Domain Lead</option>
              <option value={MOCK_ROLES.ADMIN}>System Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Engineering Domain
            </label>
            <select
              value={domainId}
              onChange={(e) => setDomainId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50"
            >
              {GDG_DOMAINS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Department / Year
          </label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50"
          />
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting}>
            Send Invitation
          </Button>
        </div>
      </form>
    </Modal>
  );
};
