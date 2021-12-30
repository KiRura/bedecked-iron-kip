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

const newLocal = client.on('message', async (message) => {
  if (message.content.startsWith('!ikirura') && message.guild) {
    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.channel.send('あなたにはユーザーをBANする権限がありません');
    if (message.mentions.members.size !== 1)
      return message.channel.send('BANするメンバーを1人指定してください');
    const member = message.mentions.members.first();
    if (!member.bannable)
      return message.channel.send('botがこのユーザーをBANすることができません');

    await member.ban();

    await message.channel.send(`${member.user.tag} をBANしました`);
  }
});

if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );