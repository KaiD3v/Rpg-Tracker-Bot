// No arquivo Server.js
import { MongoClient } from "mongodb";
import { CreateNote } from "./routes/notes/CreateNote.js";
import { connectDb } from "./db/mongodb.js";
import { GetNotes } from "./routes/notes/GetNotes.js";

import fastify from "fastify";

const app = fastify();

// Routes
app.register(CreateNote);
app.register(GetNotes)

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