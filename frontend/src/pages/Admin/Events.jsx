import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { EventCard } from '../../components/events/EventCard';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { CreateEventModal } from '../../components/events/CreateEventModal';
import { eventService } from '../../services/api';
import { Plus, Calendar, Search } from 'lucide-react';

export const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [filterMode, setFilterMode] = useState('ALL');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await eventService.getEvents();
      setEvents(data);
    };
    load();
  }, []);

  const handleEventCreated = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const filteredEvents = events.filter((e) => {
    if (filterMode === 'Upcoming') {
      const today = new Date().toISOString().split('T')[0];
      if (e.date < today) return false;
    } else if (filterMode === 'Past') {
      const today = new Date().toISOString().split('T')[0];
      if (e.date >= today) return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        (e.location && e.location.toLowerCase().includes(q)) ||
        (e.description && e.description.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Flagship Events & Workshops"
        subtitle="Schedule conferences, Cloud Study Jams, and mentoring hours for MMDU campus."
        actions={
          <Button size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Create New Event
          </Button>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-[#111827] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events, workshops, venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100 bg-white dark:bg-[#0b0f17]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['ALL', 'Upcoming', 'Past'].map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                filterMode === mode
                  ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {mode === 'ALL' ? 'All Events' : `${mode} Events`}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid or Empty State */}
      {filteredEvents.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events found"
          description={
            search || filterMode !== 'ALL'
              ? 'No events match your current filter or search criteria.'
              : 'No chapter events scheduled at this moment.'
          }
          action={
            <Button size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
              Schedule First Event
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEventCreated={handleEventCreated}
      />
    </div>
  );
};
