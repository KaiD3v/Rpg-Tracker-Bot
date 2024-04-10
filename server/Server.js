// No arquivo Server.js
import { MongoClient } from "mongodb";
import { CreateNote } from "./routes/notes/CreateNote.js";
import fastify from "fastify";

const uri = "mongodb://localhost:27017";
export const client = new MongoClient(uri);
const app = fastify();

// Routes
app.register(CreateNote);

// Server
const start = async () => {
  try {
    await app.listen(3000);
    console.log("Servidor rodando em: http://localhost:3000");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();