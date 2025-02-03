import { db } from "../name";
import createAppointmentDataCollection from "./appointmentdata";
import createBillingCollection from "./billing";


import { databases } from "./config";
import createDoctorInfoCollection from "./doctorInformation";
import createFeedbackCollection from "./feedback";
import createLabReportsCollection from "./labReports";
import createMedicalHistoryCollection from "./medicalHistory";
import createNotificationsCollection from "./notification";
import createPatientInfoCollection from "./patientinfo";
import createPrescriptionsCollection from "./prescriptions";

export default async function getOrCreateDB(){
  try {
    await databases.get(db)
    console.log("Database connection")
  } catch (error) {
    try {
      await databases.create(db, db)
      console.log("database created")
      //create collections
      await Promise.all([
        createAppointmentDataCollection(),
        createBillingCollection(),
        createPatientInfoCollection(),
        createFeedbackCollection(),
        createNotificationsCollection(),
        createLabReportsCollection(),
        createMedicalHistoryCollection(),
        createPrescriptionsCollection(),
        createDoctorInfoCollection()

      ])
      console.log("Collection created")
      console.log("Database connected")
    } catch (error) {
      console.log("Error creating databases or collection", error)
    }
  }

  return databases
}