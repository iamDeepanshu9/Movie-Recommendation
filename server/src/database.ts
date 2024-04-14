import * as mongodb from "mongodb";
import { User } from "./userModel";

export const collections: {
    users?: mongodb.Collection<User>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("movieRecommendation");
    await applySchemaValidation(db);

    const usersCollection = db.collection<User>("users");
    collections.users = usersCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "email", "password"],
            additionalProperties: false,
            properties: {
                _id: {},
                username: {
                    bsonType: "string",
                    description: "'username' is required and is a string",
                },
                email: {
                    bsonType: "string",
                    description: "'email' is required and is a string",
                    pattern: "^.+@.+$" // simple pattern for email validation
                },
                password: {
                    bsonType: "string",
                    description: "'password' is required and is a string",
                },
            },
        },
    };

    // Modify the collection or create if not exists with the validator
    await db.command({
        collMod: "users",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("users", {validator: jsonSchema});
        }
    });
}
