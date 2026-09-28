import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config(); 

let database;

export async function connectDb() {
  try {
    const url = process.env.MONGO_URL;

    if (!url) {
      throw new Error("MONGO_URL environment variable is missing in .env file!");
    }

    const client = new MongoClient(url, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    database = client.db("fullStack");
    console.log("MongoDB connection successful");
  } catch (error) {
    console.log("MongoDB connection error:", error.message || error);
    process.exit(1);
  }
}

export const getCollection = (collectionName) => {
  if (!database) {
    throw new Error("Database not connected yet!");
  }
  return database.collection(collectionName);
};

export default connectDb;