import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { ComplaintCard } from '../../components/complaints/ComplaintCard';
import { NewComplaintModal } from '../../components/complaints/NewComplaintModal';
import { Button } from '../../components/common/Button';
import { complaintService } from '../../services/api';
import { Plus } from 'lucide-react';

export const MentorComplaints = () => {
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
        title="Escalations &amp; Lab Requests"
        subtitle="Submit workstation requirements, software permissions, or student cadence issues."
        actions={
          <Button
            variant="danger"
            size="sm"
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
          >
            File Escalation / Request
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
