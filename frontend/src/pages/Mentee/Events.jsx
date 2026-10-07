import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { EventCard } from '../../components/events/EventCard';
import { eventService } from '../../services/api';

export const MenteeEvents = () => {
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
        subtitle="RSVP for upcoming DevFest Mullana 2026, Cloud Study Jams, and study groups."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
};
