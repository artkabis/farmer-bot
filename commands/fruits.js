const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fruits')
    .setDescription('Réaction fruité !'),
  async execute(interaction) {
    interaction.reply('Reacting with fruits!');
    const message = await interaction.fetchReply();
    message.react('🍎');
    message.react('🍊');
    message.react('🍇');
    message.react('🍉');
  },
};
