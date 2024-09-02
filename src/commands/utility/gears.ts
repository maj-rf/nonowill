import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
} from 'discord.js';
import * as gears from '../data/gears.json';

type TGear = {
  name: string;
  min: string;
  max: string;
  img?: string;
};

export const data = new SlashCommandBuilder()
  .setName('gears')
  .setDescription(
    'Provides information about the Weapons and Trinkets in the game.',
  )
  .addStringOption((option) =>
    option
      .setName('gear-name')
      .setDescription('The Weapon or Trinket')
      .setRequired(true),
  );

function createEmbed(gear: TGear) {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(gear.name)
    .setDescription(gear.min)
    .addFields({ name: '5⭐️', value: gear.max })
    .setFooter({ text: 'image from swordofconvallaria.co' });
  if (gear.img) embed.setThumbnail(gear.img);
  return embed;
}

export async function execute(interaction: CommandInteraction) {
  let option: string | null;
  let gear: TGear | undefined;
  if (interaction instanceof ChatInputCommandInteraction) {
    option = interaction.options.getString('gear-name');
    gear = gears.find((g) => {
      if (!option) return;
      return g.name.toLowerCase().includes(option.toLowerCase());
    });
  }

  if (!gear) {
    return interaction.reply('Gear not found');
  }

  const embed = createEmbed(gear);
  return interaction.reply({
    embeds: [embed],
  });
}
