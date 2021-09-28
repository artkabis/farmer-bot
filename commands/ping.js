const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Réponse avec Pong ! !'),
  async execute(interaction) {
    return interaction.reply('Pong !!!!');
  },
};
