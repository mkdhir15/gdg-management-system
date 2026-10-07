import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { AnnouncementCard } from '../../components/announcements/AnnouncementCard';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { CreateAnnouncementModal } from '../../components/announcements/CreateAnnouncementModal';
import { announcementService } from '../../services/api';
import { Megaphone, Plus, Search } from 'lucide-react';

export const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await announcementService.getAnnouncements();
      setAnnouncements(data);
    };
    load();
  }, []);

  const handleAnnouncementCreated = (newAnn) => {
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  const filteredAnnouncements = announcements.filter((a) => {
    if (filterCategory !== 'ALL' && a.category !== filterCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        (a.content && a.content.toLowerCase().includes(q)) ||
        (a.author && a.author.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Official Broadcasts & Notices"
        subtitle="Broadcast critical updates, deadlines, and vouchers across GDG MMDU members."
        actions={
          <Button size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Publish Notice
          </Button>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-[#111827] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notices, keywords, author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100 bg-white dark:bg-[#0b0f17]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['ALL', 'Academic / Mentoring', 'Event / Study Jam', 'Competition', 'General Notice'].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  filterCategory === cat
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat === 'ALL' ? 'All Broadcasts' : cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Announcements List or Empty State */}
      {filteredAnnouncements.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No notices found"
          description={
            search || filterCategory !== 'ALL'
              ? 'No announcements match your search or filter settings.'
              : 'No broadcast announcements published yet.'
          }
          action={
            <Button size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
              Broadcast First Notice
            </Button>
          }
        />
      ) : (
        <div className="space-y-4 max-w-4xl">
          {filteredAnnouncements.map((ann) => (
            <AnnouncementCard key={ann.id} announcement={ann} />
          ))}
        </div>
      )}

      {/* Create Announcement Modal */}
      <CreateAnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAnnouncementCreated={handleAnnouncementCreated}
      />
    </div>
  );
};
