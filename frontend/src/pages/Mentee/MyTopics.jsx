import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { topicService } from '../../services/api';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export const MenteeTopics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await topicService.getTopics();
      setTopics(data);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="My Learning Curriculum &amp; Modules"
        subtitle="Syllabus topics for Full-Stack Web and Applied Cloud tracks."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((t) => (
          <Card key={t.id} className="p-5">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="blue" size="sm">
                {t.track}
              </Badge>
              <span className="text-xs text-slate-500">Mentor: {t.mentor}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1.5">{t.title}</h3>
            <p className="text-xs text-slate-500 mb-4">{t.description}</p>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-600 font-medium">Your Progress</span>
                <span className="font-bold text-slate-800">
                  {t.completedModules} / {t.modulesCount} Modules Completed
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${(t.completedModules / t.modulesCount) * 100}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
