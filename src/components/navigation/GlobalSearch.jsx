import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  X,
  User,
  FolderGit2,
  CheckSquare,
  Calendar,
  Megaphone,
  ArrowRight,
  Sparkles,
  Command,
} from 'lucide-react';
import {
  ALL_GDG_USERS as GDG_USERS,
  GDG_PROJECTS,
  GDG_TASKS,
  GDG_EVENTS,
  GDG_ANNOUNCEMENTS,
  MOCK_ROLES,
} from '../../data/gdgData';

export const GlobalSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { role } = useAuth();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Search Results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const items = [];

    // 1. Search Users
    GDG_USERS.forEach((u) => {
      const matchName = u.name.toLowerCase().includes(q);
      const matchDomain = u.domainName?.toLowerCase().includes(q);
      const matchRole = u.role.toLowerCase().includes(q);

      if (matchName || matchDomain || matchRole) {
        let route = '/admin/users';
        if (role === MOCK_ROLES.LEAD) route = u.role === MOCK_ROLES.MENTOR ? '/lead/mentors' : '/lead/mentees';
        if (role === MOCK_ROLES.MENTOR) route = '/mentor/mentees';
        if (role === MOCK_ROLES.MENTEE) route = '/mentee/mentor';

        items.push({
          id: u.id,
          type: 'User',
          title: u.name,
          subtitle: `${u.role} • ${u.domainName || 'Core Team'}`,
          category: u.role,
          route,
          icon: User,
        });
      }
    });

    // 2. Search Projects
    GDG_PROJECTS.forEach((p) => {
      if (p.name.toLowerCase().includes(q) || p.domainName.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) {
        let route = '/admin/projects';
        if (role === MOCK_ROLES.LEAD) route = '/lead/projects';
        if (role === MOCK_ROLES.MENTOR) route = '/mentor/projects';
        if (role === MOCK_ROLES.MENTEE) route = '/mentee/projects';

        items.push({
          id: p.id,
          type: 'Project',
          title: p.name,
          subtitle: `${p.domainName} • ${p.status}`,
          category: 'Project',
          route,
          icon: FolderGit2,
        });
      }
    });

    // 3. Search Tasks
    GDG_TASKS.forEach((t) => {
      if (t.title.toLowerCase().includes(q) || t.domainName?.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q)) {
        let route = '/admin/dashboard';
        if (role === MOCK_ROLES.MENTOR) route = '/mentor/tasks';
        if (role === MOCK_ROLES.MENTEE) route = '/mentee/tasks';

        items.push({
          id: t.id,
          type: 'Task',
          title: t.title,
          subtitle: `${t.domainName} • Due: ${t.deadline} (${t.status})`,
          category: 'Task',
          route,
          icon: CheckSquare,
        });
      }
    });

    // 4. Search Events
    GDG_EVENTS.forEach((e) => {
      if (e.title.toLowerCase().includes(q) || e.location?.toLowerCase().includes(q) || e.description?.toLowerCase().includes(q)) {
        let route = `/${role.toLowerCase()}/events`;
        items.push({
          id: e.id,
          type: 'Event',
          title: e.title,
          subtitle: `${e.date} • ${e.location} • ${e.mode}`,
          category: 'Event',
          route,
          icon: Calendar,
        });
      }
    });

    // 5. Search Announcements
    GDG_ANNOUNCEMENTS.forEach((a) => {
      if (a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q) || a.author.toLowerCase().includes(q)) {
        let route = `/${role.toLowerCase()}/announcements`;
        items.push({
          id: a.id,
          type: 'Announcement',
          title: a.title,
          subtitle: `By ${a.author} • ${a.date}`,
          category: 'Announcement',
          route,
          icon: Megaphone,
        });
      }
    });

    return items.slice(0, 10);
  }, [query, role]);

  const handleSelect = (item) => {
    if (!item) return;
    onClose();
    navigate(item.route);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Global search dialog"
    >
      <div className="bg-white dark:bg-[#131b2a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search users, projects, tasks, events, announcements..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              ESC
            </kbd>
          )}
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-4">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Suggested Searches
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Harshit', 'Vanshika', 'Web Development', 'Campus Connect', 'Solution Challenge', 'Cloud Study'].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-[#1a73e8] dark:hover:bg-blue-900/30 dark:hover:text-[#8ab4f8] transition-colors"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-2">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                No matching results found
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                We couldn't find anything matching "{query}". Try checking the spelling or searching for a person or project name.
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              {results.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-semibold leading-tight truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {item.type}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-850/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-semibold bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700 mr-1">
                ↑↓
              </kbd>
              to navigate
            </span>
            <span>
              <kbd className="font-semibold bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700 mr-1">
                ↵
              </kbd>
              to select
            </span>
          </div>
          <span>
            {results.length} {results.length === 1 ? 'result' : 'results'}
          </span>
        </div>
      </div>
    </div>
  );
};
