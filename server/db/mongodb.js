import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
export const client = new MongoClient(uri);
export const database = client.db("DiscordDb");

export async function connectDb() {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
}

connectDb();