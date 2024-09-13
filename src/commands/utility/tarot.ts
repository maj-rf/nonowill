import {
  BaseInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
  CommandInteraction,
} from 'discord.js';
import * as tarots from '../data/tarots.json';

type TTarot = {
  id: string;
  name: string;
  effect: string;
  unlock: string;
};

export const data = new SlashCommandBuilder()
  .setName('tarot')
  .setDescription('Provides information about the Tarots in the game.')
  .addStringOption((option) =>
    option
      .setName('tarot')
      .setDescription('The Tarot type')
      .setRequired(true)
      .addChoices(
        { name: 'world', value: 'world' },
        { name: 'hierophant', value: 'hierophant' },
        { name: 'fool', value: 'fool' },
        { name: 'strength', value: 'strength' },
        { name: 'magician', value: 'magician' },
        { name: 'emperor', value: 'emperor' },
        { name: 'justice', value: 'justice' },
        { name: 'hermit', value: 'hermit' },
        { name: 'high-priestess', value: 'high-priestess' },
        { name: 'empress', value: 'empress' },
        { name: 'judgement', value: 'judgement' },
        { name: 'devil', value: 'devil' },
        { name: 'tower', value: 'tower' },
        { name: 'fortune', value: 'fortune' },
        { name: 'temperance', value: 'temperance' },
        { name: 'moon', value: 'moon' },
        { name: 'sun', value: 'sun' },
        { name: 'chariot', value: 'chariot' },
      ),
  );

function createEmbed(tarot: TTarot) {
  const file = new AttachmentBuilder(`./assets/tarots/${tarot.id}.webp`);
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(tarot.name)
    .setDescription(tarot.effect)
    .setThumbnail(`attachment://${tarot.id}.webp`)
    .addFields({ name: 'Level 60 Effect', value: tarot.unlock })
    .setFooter({ text: 'image from swordofconvallaria.co' });
  return [embed, file];
}

export async function execute(interaction: CommandInteraction) {
  let option: string | null;
  let tarot: TTarot | undefined;
  if (interaction instanceof ChatInputCommandInteraction) {
    option = interaction.options.getString('tarot');
    tarot = tarots.find((tarot) => tarot.id === option);
  }

  if (!tarot) {
    return interaction.reply('Tarot not found');
  }
  const [embed, file] = createEmbed(tarot);
  return interaction.reply({
    embeds: [embed as EmbedBuilder],
    files: [file as AttachmentBuilder],
  });
}
