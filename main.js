// ログイン的な何か
const http = require('http');
http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Discord bot is active now \n');
}).listen(3000);

// Discord.jsのバージョン
const discord = require('v12.5.3-discord.js');
const client = new discord.Client();

//○○をプレイ中
client.on('ready', message =>
{
  client.user.setPresence({ game: { name: 'う〜んそうですね〜。あたり、魔神に呪われてます！それもヤバいくらいに！' } });
  console.log('bot is ready!');
});

//キーワードに反応してメッセージを返す

client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("やす君")) {
        message.channel.send('やす君？あの人はちょっと関わりにくいよ…てか、ブロックされてて見えない！');
    }
    if (message.author.bot) return;
    if (message.content.includes("ゆす")) {
        message.channel.send('やす君？あの人はちょっと関わりにくいよ…てか、ブロックされてて見えない！');
    }
});

//メッセージに反応して行動を起こす

// Discord TOKEN error
if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );