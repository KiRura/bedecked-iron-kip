// ログイン的な何か
const http = require('http');
http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Discord bot is active now \n');
}).listen(3000);

// Discord.jsのバージョン
const { Client, Intents } = require('discord.js')
const client = new Client({ intents: Intents.ALL })

//○○をプレイ中
client.user.setActivity(
  client.user.setPresence(
    { activity: 
     { name: client.channels.cache.size+"個のサーバーに導入中" }, 
     status: "online" 
    }
  )
);

//キーワードに反応してメッセージを返す
Client.on('message', async msg => {
if(msg.content === 'おは'){
　msg.channel.send('おはよう！今日も1日頑張ってね！！')
}})

//メッセージに反応して行動を起こす

// Discord TOKEN error
if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );