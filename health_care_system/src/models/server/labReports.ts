import { databases } from "./config";
import { labReports, db } from "../name";
import { Permission } from "node-appwrite";

export default async function createLabReportsCollection() {
    await databases.createCollection(db, labReports, labReports, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Lab Reports Collection Created");

    await Promise.all([
        databases.createStringAttribute(db, labReports, "patient_id", 50, true),
        databases.createStringAttribute(db, labReports, "report_type", 100, true),
        databases.createStringAttribute(db, labReports, "result", 1000, true),
        databases.createDatetimeAttribute(db, labReports, "date", true),
    ]);
    console.log("Lab Reports Attributes Created");
}
