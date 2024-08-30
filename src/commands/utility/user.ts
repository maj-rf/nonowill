import {
  CommandInteraction,
  SlashCommandBuilder,
  GuildMember,
} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('user')
  .setDescription('Provides information about the user.');

export async function execute(interaction: CommandInteraction) {
  const joinedDate =
    interaction.member instanceof GuildMember
      ? interaction.member.joinedAt
      : '';

  return interaction.reply(
    `This command was run by ${interaction.user.username}, who joined on ${joinedDate}.`,
  );
}
