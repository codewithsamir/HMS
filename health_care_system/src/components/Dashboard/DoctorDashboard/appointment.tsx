import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FaEdit } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { DoctorAppointment, useAppointmentStore } from '@/store/Appointment';
import ActionAppointment from '../actionAppointment'; // Import the popup component

const Appointment = () => {
  const { doctorappointment: appointments } = useAppointmentStore();

  // State to manage the selected appointment for editing
  const [selectedAppointment, setSelectedAppointment] = useState<{
    id: string;
    status: string;
  } | null>(null);

  // Function to determine the status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'text-blue-500';
      case 'completed':
        return 'text-green-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  // Open the popup for a specific appointment
  const handleEditClick = (appointmentId: string, currentStatus: string) => {
    setSelectedAppointment({ id: appointmentId, status: currentStatus });
  };

  // Close the popup
  const handleClosePopup = () => {
    setSelectedAppointment(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-center text-3xl font-semibold py-4 text-gray-700">
        Total Appointment Data
      </h2>
      <div className="overflow-x-auto">
        {appointments.length === 0 ? (
          <p className="text-center text-gray-500">No appointments taken by you</p>
        ) : (
          <Table className="min-w-full divide-y divide-gray-200 rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S/N
                </TableHead>
                <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Appointment ID
                </TableHead>
                <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </TableHead>
                <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </TableHead>
                <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </TableHead>
                <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment, index) => (
                <TableRow
                  key={appointment.$id}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {appointment.$id}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment?.user?.name}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(appointment.appointment_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.appointment_time}
                  </TableCell>
                  <TableCell
                    className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button
                      variant="ghost"
                      onClick={() => handleEditClick(appointment.$id, appointment.status)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Render the popup if an appointment is selected */}
      {selectedAppointment && (
        <ActionAppointment
          appointmentId={selectedAppointment.id}
          currentStatus={selectedAppointment.status}
          open={!!selectedAppointment} // Pass whether the popup should be open
          onClose={handleClosePopup} // Close the popup
        />
      )}
    </div>
  );
};

export default Appointment;