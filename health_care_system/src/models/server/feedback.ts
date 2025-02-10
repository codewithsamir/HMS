import { databases } from "./config";
import { feedback, db } from "../name";
import { Permission } from "node-appwrite";

export default async function createFeedbackCollection() {
    await databases.createCollection(db, feedback, feedback, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Feedback Collection Created");

    await Promise.all([
        databases.createStringAttribute(db, feedback, "patient_id", 50, true),
        databases.createStringAttribute(db, feedback, "doctor_id", 50, true),
        databases.createFloatAttribute(db, feedback, "rating", true),
        databases.createStringAttribute(db, feedback, "comments", 1000, true),
        databases.createDatetimeAttribute(db, feedback, "date", true),
    ]);
    console.log("Feedback Attributes Created");
}
