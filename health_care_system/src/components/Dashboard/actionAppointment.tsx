import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useAppointmentStore } from '@/store/Appointment';

interface UpdateStatusPopupProps {
  appointmentId: string;
  currentStatus: string;
  ispatient ?: boolean;
  open: boolean; // Controls whether the dialog is open
  onClose: () => void; // Function to close the dialog
}

const ActionAppointment = ({ appointmentId, currentStatus, open, onClose,ispatient }: UpdateStatusPopupProps) => {
  const { updateAppointmentStatus } = useAppointmentStore();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async () => {
    try {
      setLoading(true);
      await updateAppointmentStatus(appointmentId, status);
      onClose(); // Close the dialog after updating
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Appointment Status</DialogTitle>
          <DialogDescription>
            Select the new status for this appointment.
          </DialogDescription>
        </DialogHeader>

        {/* Status Selection Dropdown */}
        <div className="flex flex-col space-y-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="scheduled">Scheduled</option>
           {!ispatient && <option value="completed">Completed</option>} 
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Action Buttons */}
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleUpdateStatus} disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionAppointment;