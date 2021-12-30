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

client.on('message', message => {
  if (message.channel.topic == null) {
    return;
  }
  if (message.channel.topic.match(/Botと会話/)){
+     if (message.content.match(/おはよう/)) {
+       message.reply("おはようございます！今日もいい1日を！");
+     } else if (message.content.match(/おやすみ/)) {
+         message.reply("おやすみなさい！いい夢を！");
+     } else if (message.content.match(/疲れた/)) {
+         message.reply("お疲れ様！ゆっくり休んでね！");
+     }
  }
});

// Discord TOKEN error
if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );