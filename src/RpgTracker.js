// bot slash
import { REST, Routes } from "discord.js";
import { commands } from "./functions/ComandList.js";
import { TOKEN, CLIENT_ID } from "./private/Token.js";

// bot commands
import './functions/botCommands.js'


const rest = new REST({ version: "10" }).setToken(TOKEN);

try {
  console.log("Started refreshing application (!) commands.");

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log("Successfully reloaded application (!) commands.");
} catch (error) {
  console.error(error);
}