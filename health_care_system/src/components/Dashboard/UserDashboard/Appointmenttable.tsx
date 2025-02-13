import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FaEdit } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const AppointmentsTable = ({ appointments, onEdit }: { appointments: any[], onEdit: (id: string) => void }) => {
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

  return (
    <div className="overflow-x-auto">
      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments taken by you</p>
      ) : (
        <Table className="min-w-full divide-y divide-gray-200 rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment ID</TableHead>
              <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</TableHead>
              <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
              <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</TableHead>
              <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
              <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment, index) => (
              <TableRow key={appointment.$id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.$id}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment?.doctor?.name}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.appointment_date}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.appointment_time}</TableCell>
                <TableCell className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getStatusColor(appointment.status)}`}>{appointment.status}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Button
                    variant="ghost"
                    onClick={() => onEdit(appointment.id)}
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
  );
};

export default AppointmentsTable;
