import {
  blockQuote,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
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

export async function execute(interaction: ChatInputCommandInteraction) {
  const option = interaction.options.getString('tarot');
  const tarot = tarots.find((tarot) => tarot.id === (option as string));
  if (!tarot) {
    return interaction.reply('Tarot not found');
  }

  return interaction.reply({
    files: [{ attachment: `./assets/tarots/${tarot.id}.webp` }],
    content: blockQuote(`Name: ${tarot.name}, Effect: ${tarot.effect}, `),
  });
}
