import { database } from "../../db/mongodb.js";

export async function GetNotes(app) {
  app.get("/notes", async (req, res) => {
    try {
        const collection = database.collection('Notes')
        const notes = await collection.find({}).toArray()
        
        res.status(200).send(notes)
    } catch (error) {
        console.log('erro ao buscar notas:', error)
        res.status(500).send({error: 'Erro ao buscar as notas.'})
    }
  });
}