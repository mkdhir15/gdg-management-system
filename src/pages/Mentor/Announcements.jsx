import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { AnnouncementCard } from '../../components/announcements/AnnouncementCard';
import { announcementService } from '../../services/api';

export const MentorAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await announcementService.getAnnouncements();
      setAnnouncements(data);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Chapter Broadcasts &amp; Notices"
        subtitle="Important deadlines, exam schedules, and curriculum updates from chapter leads."
      />
      <div className="space-y-4 max-w-4xl">
        {announcements.map((a) => (
          <AnnouncementCard key={a.id} announcement={a} />
        ))}
      </div>
    </div>
  );
};
