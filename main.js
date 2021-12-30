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
     if (message.content.match(/おはよう/, /お早よう/, /お早う/, /オハヨウ/, /ｵﾊﾖｳ/)) {
       message.reply("歯磨いた？顔洗った？朝ごはん食べた？今日も往生堂は貴方をウェルカムだよ！");
     } else if (message.content.match(/おやすみ/)) {
         message.reply("永遠の眠りに就いてね…");
     } else if (message.content.match(/疲れた/)) {
         message.reply("往生堂で休んでく？今ならグッズが無料で貰えるよ！");
     }
  }
);

client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("おはよう", "お早う", "お早よう", "オハヨウ", "ｵﾊﾖｳ")) {
        message.channel.send('おはよう！歯磨いた？顔洗った？朝ごはん食べた？今日も往生堂は貴方をウェルカムだよ！');
    }
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("おやすみ", "お休み", "オヤスミ", "おヤスミ")) {
        message.channel.send('おはよう！歯磨いた？顔洗った？朝ごはん食べた？今日も往生堂は貴方をウェルカムだよ！');
    }
});

// Discord TOKEN error
if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );