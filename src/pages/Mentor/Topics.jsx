import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { topicService } from '../../services/api';
import { BookOpen, Users, Plus, CheckCircle2 } from 'lucide-react';

export const MentorTopics = () => {
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
        title="Curriculum &amp; Technical Topics"
        subtitle="Manage track roadmaps, module milestones, and learning objectives."
        actions={
          <Button size="sm" icon={Plus}>
            New Topic Module
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic) => (
          <Card key={topic.id} className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="blue" size="sm">
                  {topic.track}
                </Badge>
                <span className="text-[11px] font-semibold text-slate-500">
                  Level: {topic.level}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                {topic.title}
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                {topic.description}
              </p>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500 font-medium">Modules Completed</span>
                  <span className="font-bold text-slate-800">
                    {topic.completedModules} / {topic.modulesCount} Modules
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${(topic.completedModules / topic.modulesCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {topic.enrolledMentees} Enrolled Students
              </span>
              <Button size="sm" variant="outline">
                Edit Syllabus
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
