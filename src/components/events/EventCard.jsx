import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Share2,
} from 'lucide-react';

export const EventCard = ({ event }) => {
  const [isRsvp, setIsRsvp] = useState(false);
  const [rsvpCount, setRsvpCount] = useState(event.rsvpCount || 0);

  const handleRsvp = () => {
    if (!isRsvp) {
      setIsRsvp(true);
      setRsvpCount(rsvpCount + 1);
    } else {
      setIsRsvp(false);
      setRsvpCount(rsvpCount - 1);
    }
  };

  return (
    <Card className="flex flex-col h-full hover:border-slate-300 transition-all duration-200">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="blue" size="sm">
            {event.type}
          </Badge>
          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {event.status}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
          {event.title}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {event.description}
        </p>

        <div className="space-y-2 text-xs text-slate-600 mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-semibold text-slate-800">{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {event.tags && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 rounded-b-xl flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {rsvpCount} / {event.capacity} RSVPs
          </span>
        </div>

        <Button
          size="sm"
          variant={isRsvp ? 'outline' : 'primary'}
          onClick={handleRsvp}
          icon={isRsvp ? CheckCircle2 : null}
        >
          {isRsvp ? 'Attending' : 'RSVP Now'}
        </Button>
      </div>
    </Card>
  );
};
