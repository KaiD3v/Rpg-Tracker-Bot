import { REST, Routes } from "discord.js";
import { Client, GatewayIntentBits } from "discord.js";
import { actualHourAndDate as date } from "./models/DateNow.js";

// registrando bot
const TOKEN =
  "MTIyNTY2NjQ3MjQ5MjI2OTU3MA.GkuYA8.I8uNeLoUiW3hetGtZdwC3ItvT6luZMbE5puqQQ";
const CLIENT_ID = "1225666472492269570";

const commands = [
  {
    name: "teste",
    description: "Testa o código",
  },
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}

// bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "teste") {
    await interaction.reply(
      `Teste feito em ${date.dia}/${date.mes}/${date.ano} às ${date.hora}:${date.minutos}:${date.segundos}`
    );
  }
});

client.login(TOKEN);
