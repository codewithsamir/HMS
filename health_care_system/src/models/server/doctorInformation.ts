import { databases } from "./config";
import { doctorInformation, db } from "../name";
import { Permission } from "node-appwrite";

export default async function createDoctorInfoCollection() {
    await databases.createCollection(db, doctorInformation, doctorInformation, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Doctor Info Collection Created");

    await Promise.all([
        databases.createStringAttribute(db, doctorInformation, "name", 250, true),
        databases.createStringAttribute(db, doctorInformation, "gender", 250, true),
        databases.createStringAttribute(db, doctorInformation, "specialization", 100, true),
        databases.createIntegerAttribute(db, doctorInformation, "experience", false),
        databases.createStringAttribute(db, doctorInformation, "contact", 20, true),
        databases.createStringAttribute(db, doctorInformation, "imageUrl", 500, true),
        databases.createStringAttribute(db, doctorInformation, "doctorid", 100, true),
        databases.createStringAttribute(db, doctorInformation, "imageid", 100, true),

    ]);
    console.log("Doctor Info Attributes Created");
}
