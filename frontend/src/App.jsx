import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { MOCK_ROLES } from './data/gdgData';

// Public Pages
import { Landing } from './pages/Landing/Landing';
import { Login } from './pages/Login/Login';
import { NotFound } from './pages/Error/NotFound';
import { Unauthorized } from './pages/Error/Unauthorized';
import { Settings } from './pages/Settings/Settings';

// Admin Pages
import { AdminDashboard } from './pages/Admin/Dashboard';
import { AdminUsers } from './pages/Admin/Users';
import { AdminLeads } from './pages/Admin/Leads';
import { AdminMentors } from './pages/Admin/Mentors';
import { AdminMentees } from './pages/Admin/Mentees';
import { AdminAssignments } from './pages/Admin/Assignments';
import { AdminProjects } from './pages/Admin/Projects';
import { AdminEvents } from './pages/Admin/Events';
import { AdminAnnouncements } from './pages/Admin/Announcements';
import { AdminComplaints } from './pages/Admin/Complaints';

// Lead Pages
import { LeadDashboard } from './pages/Lead/Dashboard';
import { LeadMentors } from './pages/Lead/Mentors';
import { LeadMentees } from './pages/Lead/Mentees';
import { LeadProjects } from './pages/Lead/Projects';
import { LeadEvents } from './pages/Lead/Events';
import { LeadAnnouncements } from './pages/Lead/Announcements';
import { LeadReports } from './pages/Lead/Reports';

// Mentor Pages
import { MentorDashboard } from './pages/Mentor/Dashboard';
import { MentorMentees } from './pages/Mentor/MyMentees';
import { MentorTopics } from './pages/Mentor/Topics';
import { MentorTasks } from './pages/Mentor/Tasks';
import { MentorProjects } from './pages/Mentor/Projects';
import { MentorSubmissions } from './pages/Mentor/Submissions';
import { MentorFeedback } from './pages/Mentor/Feedback';
import { MentorComplaints } from './pages/Mentor/Complaints';
import { MentorEvents } from './pages/Mentor/Events';
import { MentorAnnouncements } from './pages/Mentor/Announcements';

// Mentee Pages
import { MenteeDashboard } from './pages/Mentee/Dashboard';
import { MenteeMentor } from './pages/Mentee/MyMentor';
import { MenteeTopics } from './pages/Mentee/MyTopics';
import { MenteeTasks } from './pages/Mentee/MyTasks';
import { MenteeProjects } from './pages/Mentee/MyProjects';
import { MenteeSubmissions } from './pages/Mentee/Submissions';
import { MenteeFeedback } from './pages/Mentee/Feedback';
import { MenteeEvents } from './pages/Mentee/Events';
import { MenteeAnnouncements } from './pages/Mentee/Announcements';

/**
 * Reusable Authentication / Workspace Components
 */
export function StepItem({ number, text, active = false }) {
  return (
    <div
      className={`flex items-center gap-3 py-2 px-3 rounded-xl transition-all ${
        active
          ? 'bg-white/10 text-white border border-white/15 backdrop-blur-sm'
          : 'text-white/70 hover:text-white/90'
      }`}
    >
      <span
        className={`text-[11px] font-mono px-2 py-0.5 rounded-md font-bold tracking-wider ${
          active
            ? 'bg-[#4285F4] text-white shadow-xs'
            : 'bg-white/10 text-white/60 border border-white/10'
        }`}
      >
        {number}
      </span>
      <span className="text-xs sm:text-sm font-medium tracking-wide">
        {text}
      </span>
    </div>
  );
}

export function SocialButton({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2.5 h-12 px-4 bg-black hover:bg-[#111111] border border-white/10 hover:border-white/20 rounded-xl text-white text-xs sm:text-sm font-medium transition-all active:scale-[0.98] shadow-xs cursor-pointer group"
    >
      {Icon && (
        <span className="shrink-0 transition-transform group-hover:scale-105">
          {typeof Icon === 'function' ? (
            <Icon className="w-4 h-4" />
          ) : React.isValidElement(Icon) ? (
            Icon
          ) : (
            <Icon className="w-4 h-4" />
          )}
        </span>
      )}
      <span>{label}</span>
    </button>
  );
}

export function InputGroup({
  label,
  placeholder,
  type = 'text',
  id,
  name,
  value,
  onChange,
  error,
  helper,
  rightElement,
  required = false,
  autoComplete,
  className = '',
  ...props
}) {
  const inputId = id || name || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`space-y-1.5 text-left ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-white tracking-wide"
        >
          {label} {required && <span className="text-blue-400">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          name={name || inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`w-full h-12 px-4 ${
            rightElement ? 'pr-12' : ''
          } bg-[#1A1A1A] border ${
            error
              ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/30'
          } rounded-xl text-white placeholder-white/30 text-sm transition-all focus:outline-none focus:ring-2`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1 mt-1">
          {error}
        </p>
      )}
      {!error && helper && (
        <p className="text-[11px] text-white/40 font-normal mt-1">
          {helper}
        </p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Shared Protected Settings Route */}
              <Route element={<ProtectedRoute allowedRoles={[MOCK_ROLES.ADMIN, MOCK_ROLES.LEAD, MOCK_ROLES.MENTOR, MOCK_ROLES.MENTEE]} />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Route>

              {/* Admin Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={[MOCK_ROLES.ADMIN]} />}>
                <Route path="/admin" element={<DashboardLayout />}>
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="leads" element={<AdminLeads />} />
                  <Route path="mentors" element={<AdminMentors />} />
                  <Route path="mentees" element={<AdminMentees />} />
                  <Route path="assignments" element={<AdminAssignments />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="events" element={<AdminEvents />} />
                  <Route path="announcements" element={<AdminAnnouncements />} />
                  <Route path="complaints" element={<AdminComplaints />} />
                </Route>
              </Route>

              {/* Lead Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={[MOCK_ROLES.LEAD]} />}>
                <Route path="/lead" element={<DashboardLayout />}>
                  <Route index element={<Navigate to="/lead/dashboard" replace />} />
                  <Route path="dashboard" element={<LeadDashboard />} />
                  <Route path="mentors" element={<LeadMentors />} />
                  <Route path="mentees" element={<LeadMentees />} />
                  <Route path="projects" element={<LeadProjects />} />
                  <Route path="events" element={<LeadEvents />} />
                  <Route path="announcements" element={<LeadAnnouncements />} />
                  <Route path="reports" element={<LeadReports />} />
                </Route>
              </Route>

              {/* Mentor Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={[MOCK_ROLES.MENTOR]} />}>
                <Route path="/mentor" element={<DashboardLayout />}>
                  <Route index element={<Navigate to="/mentor/dashboard" replace />} />
                  <Route path="dashboard" element={<MentorDashboard />} />
                  <Route path="mentees" element={<MentorMentees />} />
                  <Route path="topics" element={<MentorTopics />} />
                  <Route path="tasks" element={<MentorTasks />} />
                  <Route path="projects" element={<MentorProjects />} />
                  <Route path="submissions" element={<MentorSubmissions />} />
                  <Route path="feedback" element={<MentorFeedback />} />
                  <Route path="complaints" element={<MentorComplaints />} />
                  <Route path="events" element={<MentorEvents />} />
                  <Route path="announcements" element={<MentorAnnouncements />} />
                </Route>
              </Route>

              {/* Mentee Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={[MOCK_ROLES.MENTEE]} />}>
                <Route path="/mentee" element={<DashboardLayout />}>
                  <Route index element={<Navigate to="/mentee/dashboard" replace />} />
                  <Route path="dashboard" element={<MenteeDashboard />} />
                  <Route path="mentor" element={<MenteeMentor />} />
                  <Route path="topics" element={<MenteeTopics />} />
                  <Route path="tasks" element={<MenteeTasks />} />
                  <Route path="projects" element={<MenteeProjects />} />
                  <Route path="submissions" element={<MenteeSubmissions />} />
                  <Route path="feedback" element={<MenteeFeedback />} />
                  <Route path="events" element={<MenteeEvents />} />
                  <Route path="announcements" element={<MenteeAnnouncements />} />
                </Route>
              </Route>

              {/* Catch-all 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
