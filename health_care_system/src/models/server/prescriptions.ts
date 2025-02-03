import { databases } from "./config";
import { prescriptions, db } from "../name";
import { Permission } from "node-appwrite";

export default async function createPrescriptionsCollection() {
    await databases.createCollection(db, prescriptions, prescriptions, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Prescriptions Collection Created");

    await Promise.all([
        databases.createStringAttribute(db, prescriptions, "patient_id", 50, true),
        databases.createStringAttribute(db, prescriptions, "doctor_id", 50, true),
        databases.createStringAttribute(db, prescriptions, "medicines", 1000, true),
        databases.createStringAttribute(db, prescriptions, "instructions", 500, false),
        databases.createDatetimeAttribute(db, prescriptions, "date_issued", true),
    ]);
    console.log("Prescriptions Attributes Created");
}
