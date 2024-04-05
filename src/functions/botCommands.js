import { Client, GatewayIntentBits } from "discord.js";
import { TOKEN, CLIENT_ID } from "../private/Token.js";

// api requisitions
import { abilities } from "../api/dndApi.js";

// models
import { formatAbilities } from "../models/FormatText.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === "ping") {
      interaction.reply("pong");
    }
    // Fetch abilities
    if (interaction.commandName === "habilidades") {
      // Format abilities before replying
      const message = formatAbilities(abilities);
      interaction.reply(message);
    }
  });
  
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  client.login(TOKEN);
