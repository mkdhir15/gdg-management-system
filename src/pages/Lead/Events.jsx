import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { EventCard } from '../../components/events/EventCard';
import { Button } from '../../components/common/Button';
import { eventService } from '../../services/api';
import { Plus } from 'lucide-react';

export const LeadEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await eventService.getEvents();
      setEvents(data);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Chapter Events &amp; Workshops"
        subtitle="Organize workshops, speaker sessions, and DevFest Mullana 2026."
        actions={
          <Button size="sm" icon={Plus}>
            Create Event
          </Button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
};
