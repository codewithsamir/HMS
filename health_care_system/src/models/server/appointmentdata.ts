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
        databases.createStringAttribute(db, appointmentdata, "doctor_id", 50, true),
        databases.createStringAttribute(db, appointmentdata, "patient_id", 50, true),
        databases.createDatetimeAttribute(db, appointmentdata, "date", true),
        databases.createStringAttribute(db, appointmentdata, "time_slot", 50, true),
        databases.createStringAttribute(db, appointmentdata, "status", 20, true),
    ]);
    console.log("Appointment Data Attributes Created");
}
