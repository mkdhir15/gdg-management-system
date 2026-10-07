// Re-export and bridge centralized GDG data for API services and components
import {
  MOCK_ROLES,
  GDG_DOMAINS,
  GDG_MENTORS,
  GDG_MENTEES,
  GDG_LEAD,
  GDG_ADMIN,
  ALL_GDG_USERS,
  GDG_PROJECTS,
  GDG_TASKS,
  GDG_SUBMISSIONS,
  GDG_EVENTS,
  GDG_ANNOUNCEMENTS,
  GDG_COMPLAINTS,
  GDG_TOPICS,
  getSystemStatistics,
  ALL_ACCOUNTS_MAP,
  CURRENT_USER_PROFILES,
} from '../data/gdgData';

export {
  MOCK_ROLES,
  GDG_DOMAINS,
  GDG_MENTORS,
  GDG_MENTEES,
  GDG_LEAD,
  GDG_ADMIN,
  ALL_GDG_USERS,
  GDG_PROJECTS,
  GDG_TASKS,
  GDG_SUBMISSIONS,
  GDG_EVENTS,
  GDG_ANNOUNCEMENTS,
  GDG_COMPLAINTS,
  GDG_TOPICS,
  getSystemStatistics,
  ALL_ACCOUNTS_MAP,
  CURRENT_USER_PROFILES,
};

// Aliases for backward compatibility with existing components
export const MOCK_USERS = ALL_GDG_USERS;
export const MOCK_PROJECTS = GDG_PROJECTS;
export const MOCK_TASKS = GDG_TASKS;
export const MOCK_EVENTS = GDG_EVENTS;
export const MOCK_ANNOUNCEMENTS = GDG_ANNOUNCEMENTS;
export const MOCK_COMPLAINTS = GDG_COMPLAINTS;
export const MOCK_SUBMISSIONS = GDG_SUBMISSIONS;
export const MOCK_TOPICS = GDG_TOPICS;

// Dynamically calculated overview statistics from centralized data
export const MOCK_OVERVIEW_STATS = {
  totalUsers: ALL_GDG_USERS.length, // 19
  totalMentors: GDG_MENTORS.length, // 6
  totalMentees: GDG_MENTEES.length, // 11
  totalDomains: GDG_DOMAINS.length, // 4
  activeProjects: GDG_PROJECTS.length, // 4
  upcomingEvents: GDG_EVENTS.length, // 4
  pendingComplaints: GDG_COMPLAINTS.filter((c) => c.status !== 'Resolved').length,
  completionRate: '84.6%',
  menteeSatisfaction: '4.9 / 5.0',
};
