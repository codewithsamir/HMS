import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useAppointmentStore } from '@/store/Appointment';

interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  contact: string;
  imageurl: string;
}

const Patientdata = () => {
  const { getTotalPatientInfoForDoctor } = useAppointmentStore();
  const [patientData, setPatientData] = useState<PatientInfo[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch patient data for the doctor
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const doctorId = "some-doctor-id"; // Replace with the actual doctor ID
        const data = await getTotalPatientInfoForDoctor(doctorId);
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [getTotalPatientInfoForDoctor]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading patient data...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-center text-3xl font-semibold py-4 text-gray-700">Total Patient Data</h2>
      <div className="overflow-x-auto">
        {patientData.length === 0 ? (
          <p className="text-center text-gray-500">No patients found.</p>
        ) : (
          <Table className="min-w-full divide-y divide-gray-200 rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S/N
                </TableHead>
                <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </TableHead>
                <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </TableHead>
                <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </TableHead>
                <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </TableHead>
                <TableHead className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {patientData.map((patient, index) => (
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.name}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.age}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.gender}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.contact}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <img
                      src={patient.imageurl}
                      alt={patient.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Patientdata;