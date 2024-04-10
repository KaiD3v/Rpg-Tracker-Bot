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

    interaction.awaitModalSubmit({time: 60_000})
    .then((ModalSubmitInteraction) => {
      const newNoteNameValue = ModalSubmitInteraction.fields.getTextInputValue('newNoteNameInput')
      const newNoteValue = ModalSubmitInteraction.fields.getTextInputValue('newNoteInput')

      ModalSubmitInteraction.reply(`Sua nota é: ${newNoteNameValue} \n${newNoteValue}`)
    }).catch(err => {
      console.error('Erro ao enviar formulário:', err)
    })
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
