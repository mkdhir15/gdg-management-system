// GDG Management System - API Service Layer
// Future Django REST Framework (DRF) ready.
//
// ARCHITECTURE NOTE:
// Currently this service serves responses from centralized GDG mock data.
// When connecting to the Django backend in the future:
// 1. Set VITE_API_BASE_URL (e.g. http://localhost:8000/api/v1)
// 2. Switch the `USE_MOCK` flag to false or replace method implementations with fetch/axios calls.
// 3. All return shapes adhere strictly to Django REST Framework JSON standards.

import {
  MOCK_ROLES,
  GDG_DOMAINS,
  GDG_MENTORS,
  GDG_MENTEES,
  ALL_GDG_USERS,
  GDG_PROJECTS,
  GDG_TASKS,
  GDG_EVENTS,
  GDG_ANNOUNCEMENTS,
  GDG_COMPLAINTS,
  GDG_SUBMISSIONS,
  GDG_TOPICS,
  getSystemStatistics,
  ALL_ACCOUNTS_MAP,
  CURRENT_USER_PROFILES,
} from './mockData';

const SIMULATE_DELAY_MS = 60;

const delay = (ms = SIMULATE_DELAY_MS) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================================================
// AUTHENTICATION SERVICES (TODO: Connect to Django /api/v1/auth/login/)
// ============================================================================

export const authService = {
  /**
   * Simulates authentication. Accepts accountKey/id, email, or role.
   * Future DRF endpoint: POST /api/v1/auth/login/
   */
  async login({ email, password, role, accountId }) {
    await delay();

    let matchedUser = null;

    if (accountId && ALL_ACCOUNTS_MAP[accountId.toLowerCase()]) {
      matchedUser = ALL_ACCOUNTS_MAP[accountId.toLowerCase()];
    } else if (email) {
      const lower = email.toLowerCase();
      // Match by exact email or name in email
      matchedUser = ALL_GDG_USERS.find((u) => u.email.toLowerCase() === lower);
      if (!matchedUser) {
        for (const [key, acc] of Object.entries(ALL_ACCOUNTS_MAP)) {
          if (lower.includes(key)) {
            matchedUser = acc;
            break;
          }
        }
      }
    }

    if (!matchedUser && role) {
      matchedUser = CURRENT_USER_PROFILES[role];
    }

    if (!matchedUser) {
      matchedUser = CURRENT_USER_PROFILES.ADMIN;
    }

    // Store in localStorage for session persistence across page refreshes
    const authSession = {
      token: 'mock-jwt-token-' + Date.now(),
      user: matchedUser,
    };
    localStorage.setItem('gdg_auth_session', JSON.stringify(authSession));

    return {
      success: true,
      user: matchedUser,
      token: authSession.token,
    };
  },

  /**
   * Fetches currently authenticated user profile
   * Future DRF endpoint: GET /api/v1/auth/me/
   */
  getCurrentUser() {
    const raw = localStorage.getItem('gdg_auth_session');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.user) return parsed.user;
      } catch (err) {
        console.error('Failed to parse auth session', err);
      }
    }
    // Default fallback to Admin for convenient exploration
    return CURRENT_USER_PROFILES.ADMIN;
  },

  /**
   * Switch directly to any of the 19 accounts (Admin, Lead, 6 Mentors, 11 Mentees)
   */
  switchAccount(accountKeyOrId) {
    const key = (accountKeyOrId || '').toLowerCase();
    const profile = ALL_ACCOUNTS_MAP[key] || CURRENT_USER_PROFILES.ADMIN;
    const authSession = {
      token: 'mock-jwt-token-' + Date.now(),
      user: profile,
    };
    localStorage.setItem('gdg_auth_session', JSON.stringify(authSession));
    return profile;
  },

  /**
   * Quick role-switching fallback
   */
  switchRole(role) {
    const profile = CURRENT_USER_PROFILES[role] || CURRENT_USER_PROFILES.ADMIN;
    const authSession = {
      token: 'mock-jwt-token-' + Date.now(),
      user: profile,
    };
    localStorage.setItem('gdg_auth_session', JSON.stringify(authSession));
    return profile;
  },

  /**
   * Future DRF endpoint: POST /api/v1/auth/logout/
   */
  async logout() {
    await delay();
    localStorage.removeItem('gdg_auth_session');
    return { success: true };
  },
};

// ============================================================================
// DASHBOARD & OVERVIEW SERVICES (TODO: Connect to /api/v1/dashboard/stats/)
// ============================================================================

export const dashboardService = {
  async getOverviewStats(role, userId) {
    await delay();
    const base = getSystemStatistics();
    return {
      ...base,
      domains: GDG_DOMAINS,
      roleSpecific: {
        mentorCount: GDG_MENTORS.length,
        menteeCount: GDG_MENTEES.length,
        activeProjects: GDG_PROJECTS.length,
        pendingReviews: GDG_SUBMISSIONS.filter((s) => s.status === 'Under Review').length,
      },
    };
  },

  async getDomains() {
    await delay();
    return [...GDG_DOMAINS];
  },
};

// ============================================================================
// USER MANAGEMENT SERVICES (TODO: Connect to /api/v1/users/)
// ============================================================================

export const userService = {
  async getUsers(filters = {}) {
    await delay();
    let result = [...ALL_GDG_USERS];
    if (filters.role) {
      result = result.filter((u) => u.role === filters.role);
    }
    if (filters.domain) {
      result = result.filter((u) => u.domain === filters.domain);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.department && u.department.toLowerCase().includes(q))
      );
    }
    return result;
  },

  async getMentors() {
    await delay();
    return [...GDG_MENTORS];
  },

  async getMentees(filters = {}) {
    await delay();
    let list = [...GDG_MENTEES];
    if (filters.mentorId) {
      list = list.filter((m) => m.mentorId === filters.mentorId);
    }
    if (filters.domain) {
      list = list.filter((m) => m.domain === filters.domain);
    }
    return list;
  },

  async getLeads() {
    await delay();
    return [GDG_LEAD];
  },

  async getMentorById(mentorId) {
    await delay();
    return GDG_MENTORS.find((m) => m.id === mentorId) || null;
  },

  async getMenteeById(menteeId) {
    await delay();
    return GDG_MENTEES.find((m) => m.id === menteeId) || null;
  },
};

// ============================================================================
// PROJECT MANAGEMENT SERVICES (TODO: Connect to /api/v1/projects/)
// ============================================================================

export const projectService = {
  async getProjects(filters = {}) {
    await delay();
    let result = [...GDG_PROJECTS];
    if (filters.status && filters.status !== 'All') {
      result = result.filter((p) => p.status === filters.status);
    }
    if (filters.domain) {
      result = result.filter((p) => p.domain === filters.domain);
    }
    if (filters.mentorId) {
      result = result.filter((p) => p.mentorId === filters.mentorId);
    }
    if (filters.menteeName) {
      result = result.filter((p) => p.mentees.includes(filters.menteeName));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.domain.toLowerCase().includes(q) ||
          p.mentor.toLowerCase().includes(q)
      );
    }
    return result;
  },

  async getProjectById(id) {
    await delay();
    return GDG_PROJECTS.find((p) => p.id === id) || null;
  },
};

// ============================================================================
// TASK SERVICES (TODO: Connect to /api/v1/tasks/)
// ============================================================================

export const taskService = {
  async getTasks(filters = {}) {
    await delay();
    let result = [...GDG_TASKS];
    if (filters.status && filters.status !== 'All') {
      result = result.filter((t) => t.status === filters.status);
    }
    if (filters.assignedToId) {
      result = result.filter((t) => t.assignedToId === filters.assignedToId);
    }
    if (filters.assignedToName) {
      result = result.filter((t) => t.assignedTo === filters.assignedToName);
    }
    if (filters.mentorId) {
      result = result.filter((t) => t.mentorId === filters.mentorId);
    }
    if (filters.mentorName) {
      result = result.filter((t) => t.mentor === filters.mentorName);
    }
    if (filters.domain) {
      result = result.filter((t) => t.domain === filters.domain);
    }
    return result;
  },

  async updateTaskStatus(taskId, newStatus) {
    await delay();
    const task = GDG_TASKS.find((t) => t.id === taskId);
    if (task) {
      task.status = newStatus;
    }
    return { success: true, task };
  },
};

// ============================================================================
// EVENTS SERVICES (TODO: Connect to /api/v1/events/)
// ============================================================================

export const eventService = {
  async getEvents() {
    await delay();
    return [...GDG_EVENTS];
  },
};

// ============================================================================
// ANNOUNCEMENTS SERVICES (TODO: Connect to /api/v1/announcements/)
// ============================================================================

export const announcementService = {
  async getAnnouncements() {
    await delay();
    return [...GDG_ANNOUNCEMENTS];
  },
};

// ============================================================================
// COMPLAINTS & FEEDBACK SERVICES (TODO: Connect to /api/v1/complaints/)
// ============================================================================

export const complaintService = {
  async getComplaints() {
    await delay();
    return [...GDG_COMPLAINTS];
  },

  async submitComplaint(data) {
    await delay();
    const newEntry = {
      id: 'cmp-0' + (GDG_COMPLAINTS.length + 1),
      ...data,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    GDG_COMPLAINTS.unshift(newEntry);
    return { success: true, complaint: newEntry };
  },
};

// ============================================================================
// SUBMISSIONS & TOPICS SERVICES (TODO: Connect to /api/v1/submissions/)
// ============================================================================

export const submissionService = {
  async getSubmissions(filters = {}) {
    await delay();
    let result = [...GDG_SUBMISSIONS];
    if (filters.mentorId) {
      result = result.filter((s) => s.mentorId === filters.mentorId);
    }
    if (filters.mentorName) {
      result = result.filter((s) => s.mentorName === filters.mentorName);
    }
    if (filters.menteeId) {
      result = result.filter((s) => s.menteeId === filters.menteeId);
    }
    if (filters.menteeName) {
      result = result.filter((s) => s.menteeName === filters.menteeName);
    }
    return result;
  },
};

export const topicService = {
  async getTopics(filters = {}) {
    await delay();
    let result = [...GDG_TOPICS];
    if (filters.domainId) {
      result = result.filter((t) => t.domainId === filters.domainId);
    }
    if (filters.mentorId) {
      result = result.filter((t) => t.mentorId === filters.mentorId);
    }
    return result;
  },
};
