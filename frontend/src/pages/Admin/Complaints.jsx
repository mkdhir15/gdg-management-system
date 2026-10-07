import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { ComplaintCard } from '../../components/complaints/ComplaintCard';
import { NewComplaintModal } from '../../components/complaints/NewComplaintModal';
import { Button } from '../../components/common/Button';
import { complaintService } from '../../services/api';
import { AlertCircle, Plus } from 'lucide-react';

export const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await complaintService.getComplaints();
      setComplaints(data);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Grievance &amp; Issue Resolution Registry"
        subtitle="Review student-mentor escalations, lab access requests, and official response records."
        actions={
          <Button
            variant="danger"
            size="sm"
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
          >
            File New Grievance
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {complaints.map((c) => (
          <ComplaintCard key={c.id} complaint={c} />
        ))}
      </div>

      <NewComplaintModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={(newC) => setComplaints([newC, ...complaints])}
      />
    </div>
  );
};
