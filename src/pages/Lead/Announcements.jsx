import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { AnnouncementCard } from '../../components/announcements/AnnouncementCard';
import { Button } from '../../components/common/Button';
import { announcementService } from '../../services/api';
import { Plus } from 'lucide-react';

export const LeadAnnouncements = () => {
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
        title="Chapter Broadcasts"
        subtitle="Publish notices, resource grants, and meeting schedules to GDG students."
        actions={
          <Button size="sm" icon={Plus}>
            New Announcement
          </Button>
        }
      />
      <div className="space-y-4 max-w-4xl">
        {announcements.map((a) => (
          <AnnouncementCard key={a.id} announcement={a} />
        ))}
      </div>
    </div>
  );
};
