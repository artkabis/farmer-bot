require('dotenv').config(); //initialize dotenv
const axios = require('axios');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// const { clientId, guildId, token } = require('./config.json');

const {
  Client,
  Intents,
  Collection,
  LimitedCollection,
} = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  makeCache: (manager) => {
    if (manager.name === 'MessageManager')
      return new LimitedCollection({ maxSize: 0 });
    return new Collection();
  },
});

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),
  new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with server info!'),
  new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with user info!'),
  new SlashCommandBuilder()
    .setName('infos')
    .setDescription('Replies with all infos!'),
  new SlashCommandBuilder()
    .setName('fruits')
    .setDescription('Replies with fruit commande!'),
  new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Replies with avatar commande!'),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(
  'ODkxNjgxMTA5NDMwMTMyODI3.YVB4vw.Hzlp8umIU-72Klp6AfkzohQJmpc'
);

rest
  .put(
    Routes.applicationGuildCommands('891681109430132827', '891365213352390726'),
    { body: commands }
  )
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply(
      `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  } else if (commandName === 'user') {
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
  } else if (commandName === 'infos') {
    await interaction.reply(
      `Your app id: ${interaction.applicationId}\nYour channel id: ${interaction.channelId}`
    );
  }
  if (commandName === 'fruits') {
    interaction.reply('Reacting with fruits!');
    const message = await interaction.fetchReply();
    message.react('🍎');
    message.react('🍊');
    message.react('🍇');
    message.react('🍉');
  } else if (commandName === 'avatar') {
    var args = msg.content.slice(prefix.length).trim().split(/ +/);
    if (args[0]) {
      const user = getUserFromMention(args[0]);
      if (!user) {
        return message.reply(
          'Please use a proper mention if you want to see someone elses avatar.'
        );
      }

      return message.channel.send(
        `${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`
      );
    }

    return message.channel.send(
      `${
        message.author.username
      }, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`
    );
  }
});
let cmp = 0;
const prefix = '<@';
client.on('messageCreate', async (msg) => {
  const random = Math.floor(Math.random() * 11);
  const channel = client.channels.cache.get('892105340081029120');

  console.log(
    'start prefix ? ',
    !msg.content.startsWith(prefix),
    'msg autor bot ',
    msg.author.bot
  );

  /*const onlineCount = channel.createdAt.filter(
    (m) => m.presence.status === 'online'
  ).size;
  */

  if (cmp === 0) {
    console.log('cmp = 0');
    channel
      .send({
        embeds: [
          {
            title: 'Bienvenue dans le canal !!! !!!!',
            description: 'description channel send',
            fields: [
              {
                name: 'nombre de personne(s) en ligne',
                value: '22 personne en ligne',
                inline: true,
              },
            ],
          },
        ],
      })
      .catch((err) => {
        console.log(err);
      });
    cmp = 1;
  }

  async function getMeme() {
    const res = await axios.get('https://api.imgflip.com/get_memes/');
    console.log(res.data.data.memes[random].url);
    return res.data.data.memes[random].url;
  }

  switch (msg.content) {
    case 'ping':
      msg.reply('Pong!');
      break;
    //our meme command below
    case '!meme':
      msg.channel.send("Here's your meme!"); //Replies to user command
      const img = await getMeme(); //fetches an URL from the API
      msg.channel.send(img); //send the image URL
      break;
    case '!hi':
    case '!hey':
    case 'hello':
    case 'salut':
      msg.channel.send('Salut à toi 👋!');
      break;
    case '!avatar':
      const user = msg.author;
      console.log('user avatar : ', user);
      msg.channel.send(
        `${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`
      );
      break;
  }

  console.log(
    'channel infos : ',
    msg.author.username,
    ' first message content : ',
    msg.content
  );
});

client.login('ODkxNjgxMTA5NDMwMTMyODI3.YVB4vw.Hzlp8umIU-72Klp6AfkzohQJmpc');
