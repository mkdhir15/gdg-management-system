import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { EventCard } from '../../components/events/EventCard';
import { eventService } from '../../services/api';

export const MentorEvents = () => {
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
        title="Chapter Events &amp; Mentoring Hours"
        subtitle="Schedule of campus tech sessions, office hours, and speaker keynotes."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
};
