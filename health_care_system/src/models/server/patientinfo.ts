import { IndexType, Permission } from "node-appwrite";
import { databases } from "./config";
import { patientinfo, db } from "../name";

export default async function createPatientInfoCollection() {
    await databases.createCollection(db, patientinfo, patientinfo, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Patient Info Collection Created");

    await Promise.all([
        databases.createStringAttribute(db, patientinfo, "name", 250, true),
        databases.createIntegerAttribute(db, patientinfo, "age", true),
        databases.createStringAttribute(db, patientinfo, "gender", 10, true),
        databases.createStringAttribute(db, patientinfo, "contact", 20, true),
        databases.createStringAttribute(db, patientinfo, "userid", 100, true),
        databases.createStringAttribute(db, patientinfo, "imageurl", 500, true),
        databases.createStringAttribute(db, patientinfo, "imageid", 100, true),
    ]);
    console.log("Patient Info Attributes Created");
}
