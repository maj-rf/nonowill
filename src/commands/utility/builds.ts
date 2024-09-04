import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
} from 'discord.js';
import * as builds from '../data/builds.json';

type TChar = {
  id: string;
  name: string;
};

export const data = new SlashCommandBuilder()
  .setName('builds')
  .setDescription('Provides information about character builds in the game.')
  .addStringOption((option) =>
    option
      .setName('character')
      .setDescription('The name of the character')
      .setRequired(true),
  );

function createEmbed(character: TChar) {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`${character.name}`)
    .setImage(
      `https://res.cloudinary.com/dafqr01it/image/upload/v1725408649/soc-builds/${character.id}.webp`,
    )
    .setFooter({ text: 'Infographic by celionjourney' });
  return embed;
}

export async function execute(interaction: CommandInteraction) {
  let option: string | null;
  let character: TChar | undefined;
  if (interaction instanceof ChatInputCommandInteraction) {
    option = interaction.options.getString('character');
    character = builds.find((b) => {
      if (!option) return;
      return b.name.toLowerCase().includes(option.toLowerCase());
    });
  }

  if (!character) {
    return interaction.reply('`Character not found`');
  }

  const embed = createEmbed(character);
  return interaction.reply({
    embeds: [embed],
  });
}
