const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Display info about this server.'),
  async execute(interaction) {
    return interaction.reply(
      `Nom du server : ${interaction.guild.name}\nNombre total de membre(s): ${interaction.guild.memberCount}`
    );
  },
};
