import { databases } from "./config";
import { appointmentdata, db } from "../name";
import { Permission } from "node-appwrite";

export default async function createAppointmentDataCollection() {
    await databases.createCollection(db, appointmentdata, appointmentdata, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Appointment Data Collection Created");

    await Promise.all([
        databases.createStringAttribute(db, appointmentdata, "doctor_id", 100, true),
        databases.createStringAttribute(db, appointmentdata, "patient_id", 100, true),
        databases.createDatetimeAttribute(db, appointmentdata, "appointment_date", true),
        databases.createStringAttribute(db, appointmentdata, "appointment_time", 100, true),
        databases.createStringAttribute(db, appointmentdata, "appointment_reason", 100, true),
        databases.createStringAttribute(db, appointmentdata, "status", 50, true),
    ]);
    console.log("Appointment Data Attributes Created");
}
