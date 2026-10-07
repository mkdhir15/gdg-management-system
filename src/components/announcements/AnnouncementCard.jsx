import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Pin, Calendar, User, Megaphone } from 'lucide-react';

export const AnnouncementCard = ({ announcement }) => {
  return (
    <Card
      className={`p-5 transition-all duration-150 ${
        announcement.pinned
          ? 'border-blue-200 bg-blue-50/20 shadow-[0_2px_8px_rgba(26,115,232,0.06)]'
          : 'hover:border-slate-300'
      }`}
    >
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          {announcement.pinned && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
              <Pin className="w-3 h-3 fill-current" /> Pinned Notice
            </span>
          )}
          {announcement.badge && (
            <Badge
              variant={
                announcement.badge === 'Important'
                  ? 'red'
                  : announcement.badge === 'Resources'
                  ? 'green'
                  : 'yellow'
              }
              size="sm"
            >
              {announcement.badge}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{announcement.date}</span>
        </div>
      </div>

      <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
        {announcement.title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line mb-4">
        {announcement.content}
      </p>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
            {announcement.author?.charAt(0)}
          </div>
          <div>
            <span className="font-semibold text-slate-800">
              {announcement.author}
            </span>
            <span className="text-slate-400 ml-1.5">
              • {announcement.role}
            </span>
          </div>
        </div>

        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-600">
          Audience: {announcement.audience}
        </span>
      </div>
    </Card>
  );
};
