import {
  ActionRowBuilder,
  Client,
  GatewayIntentBits,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
  InteractionType,
  ModalSubmitInteraction,
} from "discord.js";

// api
import axios from "axios";

// models

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  // Responde ao comando "habilidades"
  if (interaction.commandName === "a") {
    interaction.reply("pong");
  }

  if (interaction.commandName === "newnote") {
    const modal = new ModalBuilder()
      .setCustomId("NewNotes")
      .setTitle("Novas Notas");

    const newNoteName = new TextInputBuilder()
      .setCustomId("newNoteNameInput")
      .setLabel("Digite sua nota aqui!")
      .setMaxLength(100)
      .setStyle(TextInputStyle.Short);

    const newNote = new TextInputBuilder()
      .setCustomId("newNoteInput")
      .setLabel("Digite sua nota aqui!")
      .setStyle(TextInputStyle.Paragraph);

    const noteNameActionRow = new ActionRowBuilder().addComponents(newNoteName);
    const newNoteActionRow = new ActionRowBuilder().addComponents(newNote);

    modal.addComponents(noteNameActionRow, newNoteActionRow);

    await interaction.showModal(modal);

    interaction
      .awaitModalSubmit({ time: 60_000 })
      .then(async (modalSubmitInteraction) => {
        const newNoteNameValue =
          modalSubmitInteraction.fields.getTextInputValue("newNoteNameInput");
        const newNoteValue =
          modalSubmitInteraction.fields.getTextInputValue("newNoteInput");

        console.log(`Sua nota é: ${newNoteNameValue}\n${newNoteValue}`);

        try {
          const response = await axios.post("http://localhost:3000/newnote", {
            noteName: newNoteNameValue,
            noteDesc: newNoteValue,
          });

          console.log("Resposta do servidor:", response.data);
        } catch (error) {
          console.error("Erro ao enviar nota para o servidor:", error);
        }

        modalSubmitInteraction.reply({
          content: "Sua nota foi enviada com sucesso!",
          ephemeral: true, // Visível somente para o usuário que interagiu
        });
      })
      .catch((err) => {
        console.error("Erro ao enviar formulário:", err);
      });
  }
  // retornar dados da api
  if (interaction.commandName === "ping") {
    try {
      const response = await axios.get("http://localhost:3000/notes");
      const notesData = response.data;

      // Verifica se há notas disponíveis
      if (notesData.length === 0) {
        interaction.reply({ content: "Não há notas disponíveis." });
        return;
      }

      // Constrói a string formatada com as informações das notas
      let notesText = "## Notas abaixo:\n\n";
      notesData.forEach((note) => {
        notesText += `**${note.noteName}**\n *${note.noteDesc}*\n________________________________\n`;
      });

      // Responde ao Discord com as informações das notas em texto formatado
      interaction.reply({ content: notesText });
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
      interaction.reply({ content: "Ocorreu um erro ao buscar as notas." });
    }
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
