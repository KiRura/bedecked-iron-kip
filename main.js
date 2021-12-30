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

client.on('message', message =>{
  if (message.author.id == client.user.id || message.author.bot){
    return;
  }

  if (message.content === "イキルラ"){
    let reply_text = "<:sinekasugomi:924281461346025512>";
    message.send(reply_text)
      .then(message => console.log("Sent message: " + reply_text))
      .catch(console.error);
    return;
  }
});

if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );