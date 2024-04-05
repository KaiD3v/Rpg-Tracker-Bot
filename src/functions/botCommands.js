import { Client, GatewayIntentBits } from "discord.js";
import { TOKEN, CLIENT_ID } from "../private/Token.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if(interaction.commandName === 'ping'){
    interaction.reply('pong')
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(TOKEN);
