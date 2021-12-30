// Response for Uptime Robot
const http = require('http');
http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Discord bot is active now \n');
}).listen(3000);

// Discord bot implements
const discord = require('v11-discord.js');
const client = new discord.Client();

client.on('ready', message =>
{
  client.user.setPresence({ game: { name: 'テッテテー！騙されました！' } });
  console.log('bot is ready!');
});

const Discord = require('discord.js');
const prefix = require('../config.json');

module.exports = {
  name: 'kick',
  description: 'kick',
  aliases: ['kick'],
  execute: async (client, message, args) => {


    if (message.content.startsWith('m!kick')) {
  message.channel.send(embed);
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.members.resolve(user);
      if (member) {
        member
          .kick({
            reason: 'They were bad!',
          })
          .then(() => {
            const embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle(`**Successfully kicked ${user.tag}.**`,)
            .setFooter(`This feature is still in beta, so there can be issues.`)

            message.channel.send(embed);
          })
          .catch(err => {
            const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`**I can't kick this member!**`,)
            .setFooter(`This feature is still in beta, so there can be issues.`)

            message.channel.send(embed);
            console.error(err);
          });
      } else {
        const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle(`**There is no user with this username in this server!**`,)
        .setFooter(`This feature is still in beta, so there can be issues.`)

        message.channel.send(embed);
      }
    } else {
        const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle(`**Please mention someone.**`,)
        .setFooter(`This feature is still in beta, so there can be issues.`)
    
      message.channel.send(embed);
    }
  }
  }
}


if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );