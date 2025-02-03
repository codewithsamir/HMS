import { databases } from "./config";
import { medicalHistory, db } from "../name";
import { Permission } from "node-appwrite";

export default async function createMedicalHistoryCollection() {
    await databases.createCollection(db, medicalHistory, medicalHistory, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Medical History Collection Created");

    await Promise.all([
        databases.createStringAttribute(db, medicalHistory, "patient_id", 50, true),
        databases.createStringAttribute(db, medicalHistory, "doctor_id", 50, true),
        databases.createStringAttribute(db, medicalHistory, "diagnosis", 500, true),
        databases.createStringAttribute(db, medicalHistory, "treatment", 1000, true),
        databases.createDatetimeAttribute(db, medicalHistory, "date", true),
    ]);
    console.log("Medical History Attributes Created");
}
