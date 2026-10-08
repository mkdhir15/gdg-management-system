import { MOCK_ROLES } from './gdgData';

/**
 * Centralized Development-Only Test Users
 * 
 * Used strictly in development mode (`import.meta.env.DEV`) for previewing
 * and inspecting role-based dashboards without requiring backend credentials.
 */

export const DEV_ADMIN = {
  id: 'dev-admin',
  name: 'Developer Admin',
  first_name: 'Developer',
  last_name: 'Admin',
  email: 'dev.admin@gdgoc.local',
  role: MOCK_ROLES.ADMIN,
  domain: 'Governance & Administration',
  title: 'Faculty Advisor & Chief Administrator (Dev Preview)',
  department: 'Department of Computer Science & Engineering, MM(DU)',
  campus: 'MM(DU) Mullana, Ambala',
  profileImage: '/vishalsir.png',
  avatar: '/vishalsir.png',
  profile_image: '/vishalsir.png',
  status: 'Active',
  isDevUser: true,
};

export const DEV_LEAD = {
  id: 'dev-lead',
  name: 'Developer Lead',
  first_name: 'Developer',
  last_name: 'Lead',
  email: 'dev.lead@gdgoc.local',
  role: MOCK_ROLES.LEAD,
  domain: 'Chapter Operations & Community',
  title: 'GDG on Campus Organizer / Student Lead (Dev Preview)',
  department: 'GDG Student Council, MM(DU)',
  campus: 'MM(DU) Mullana, Ambala',
  profileImage: '/hemish.png',
  avatar: '/hemish.png',
  profile_image: '/hemish.png',
  status: 'Active',
  isDevUser: true,
};

export const DEV_MENTOR = {
  id: 'dev-mentor',
  name: 'Developer Mentor',
  first_name: 'Developer',
  last_name: 'Mentor',
  email: 'dev.mentor@gdgoc.local',
  role: MOCK_ROLES.MENTOR,
  domain: 'Web Development',
  domainId: 'domain-web',
  title: 'Technical Mentor • Web Development (Dev Preview)',
  department: 'Department of Computer Science & Engineering, MM(DU)',
  campus: 'MM(DU) Mullana, Ambala',
  profileImage: '/harsh.png',
  avatar: '/harsh.png',
  profile_image: '/harsh.png',
  status: 'Active',
  isDevUser: true,
  assignedMenteeIds: ['mentee-vanshika', 'mentee-suraj', 'mentee-dhruv'],
  assignedMenteeNames: ['Vanshika', 'Suraj', 'Dhruv'],
};

export const DEV_MENTEE = {
  id: 'dev-mentee',
  name: 'Developer Mentee',
  first_name: 'Developer',
  last_name: 'Mentee',
  email: 'dev.mentee@gdgoc.local',
  role: MOCK_ROLES.MENTEE,
  domain: 'Web Development',
  domainId: 'domain-web',
  mentorId: 'mentor-harsh',
  mentorName: 'Harsh',
  title: 'Student Mentee • Web Development (Dev Preview)',
  department: 'B.Tech CSE - 2nd Year',
  campus: 'MM(DU) Mullana',
  profileImage: null,
  avatar: null,
  profile_image: null,
  status: 'Active',
  isDevUser: true,
  track: 'Web Development Track',
  projectTitle: 'GDG MMDU Campus Community Hub & Portal',
};

export const DEV_USERS_MAP = {
  [MOCK_ROLES.ADMIN]: DEV_ADMIN,
  [MOCK_ROLES.LEAD]: DEV_LEAD,
  [MOCK_ROLES.MENTOR]: DEV_MENTOR,
  [MOCK_ROLES.MENTEE]: DEV_MENTEE,
  Admin: DEV_ADMIN,
  Lead: DEV_LEAD,
  Mentor: DEV_MENTOR,
  Mentee: DEV_MENTEE,
};

export const DEV_USERS_BY_EMAIL = {
  'dev.admin@gdgoc.local': DEV_ADMIN,
  'dev.lead@gdgoc.local': DEV_LEAD,
  'dev.mentor@gdgoc.local': DEV_MENTOR,
  'dev.mentee@gdgoc.local': DEV_MENTEE,
};

export const DEV_USERS_LIST = [DEV_ADMIN, DEV_LEAD, DEV_MENTOR, DEV_MENTEE];
