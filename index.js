const fs = require('fs');
require('dotenv').config(); //initialize dotenv
const { Client, Collection, Intents } = require('discord.js');
//const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  console.log(file);
  const command = require(`./commands/${file}`);

  var datas = command.data.toJSON();
  console.log('names : ', datas.name, 'commands : ', command);
  client.commands.set(datas.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    console.log('interaction : ', interaction.commandName);
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client.login(process.env.token);
