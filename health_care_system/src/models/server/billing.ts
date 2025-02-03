import { databases } from "./config";
import { billing, db } from "../name";
import { Permission } from "node-appwrite";

export default async function createBillingCollection() {
    await databases.createCollection(db, billing, billing, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Billing Collection Created");

    await Promise.all([
        databases.createStringAttribute(db, billing, "patient_id", 50, true),
        databases.createFloatAttribute(db, billing, "amount", true),
        databases.createStringAttribute(db, billing, "payment_method", 50, true),
        databases.createDatetimeAttribute(db, billing, "date", true),
    ]);
    console.log("Billing Attributes Created");
}
