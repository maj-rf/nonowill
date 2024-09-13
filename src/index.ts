import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from './config';
import { deployCommands } from './deploy-commands';
import { commands } from './commands/commands';

const client = new Client({
  intents: [[GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]],
});

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Discord bot is ready! 🤖, Logged in as ${readyClient.user.tag}`);
});

client.on(Events.GuildCreate, async () => {
  await deployCommands();
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

client.login(config.DISCORD_TOKEN);
