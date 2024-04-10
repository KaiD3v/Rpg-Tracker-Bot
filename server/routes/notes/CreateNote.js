// No arquivo CreateNote.js
import { database } from "../../db/mongodb.js";

export async function CreateNote(app) {
  app.post("/newnote", async (req, res) => {
    try {
      const collection = database.collection("Notes");
      const { noteName, noteDesc } = req.body;

      const newNote = {
        noteName: noteName,
        noteDesc: noteDesc,
      };

      const result = await collection.insertOne(newNote);
      console.log(`Nova nota inserida com o ID: ${result.insertedId}`);

      res.status(201).send({
        message: "Nota criada com sucesso.",
        noteId: result.insertedId,
        newNote: newNote,
      });
    } catch (error) {
      console.error("Erro ao criar nota:", error);
      res.status(500).send({ error: "Erro interno ao criar a nota." });
    }
  });
}
