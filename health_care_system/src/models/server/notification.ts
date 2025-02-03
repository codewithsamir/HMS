import { databases } from "./config";
import { notifications, db } from "../name";
import { Permission } from "node-appwrite";

export default async function createNotificationsCollection() {
    await databases.createCollection(db, notifications, notifications, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Notifications Collection Created");

    await Promise.all([
        databases.createStringAttribute(db, notifications, "user_id", 50, true),
        databases.createStringAttribute(db, notifications, "message", 500, true),
        databases.createDatetimeAttribute(db, notifications, "timestamp", true),
    ]);
    console.log("Notifications Attributes Created");
}
