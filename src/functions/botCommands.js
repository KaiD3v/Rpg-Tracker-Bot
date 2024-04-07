import {
  ActionRowBuilder,
  Client,
  GatewayIntentBits,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
} from "discord.js";

// api requisitions
import { abilities } from "../api/dndApi.js";
import { char } from "../api/dndApi.js";

// models
import { formatAbilities } from "../models/FormatText.js";

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "ping") {
    interaction.reply("pong");
  }
  // abilities menu
  if (interaction.commandName === "habilidades") {
    const description = char.desc.join("\n").slice(0, 100); // Truncar a descrição para 100 caracteres
    const select = new StringSelectMenuBuilder()
			.setCustomId('Habilidades')
			.setPlaceholder('Selecione para mais detalhes!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Carisma')
					.setDescription(description)
					.setValue('carisma'),
			);

      const row = new ActionRowBuilder()
        .addComponents(select);
         
        await interaction.reply({
          content: 'Selecione um',
          components: [row]
        })
    

  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
