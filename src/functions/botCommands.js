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
} from "discord.js";

// api

// models

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  // Responde ao comando "habilidades"
  if (interaction.commandName === "ping") {
    interaction.reply("pong");
  }

  if (interaction.commandName === "newnote") {
    const modal = new ModalBuilder()
      .setCustomId("NewNotes")
      .setTitle("Novas Notas");

    const newNote = new TextInputBuilder()
      .setCustomId("newNoteInput")
      .setLabel("Digite sua nota aqui!")
      .setStyle(TextInputStyle.Paragraph);

    const notesActionRow = new ActionRowBuilder().addComponents(newNote);

    modal.addComponents(notesActionRow);

    await interaction.showModal(modal);
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
