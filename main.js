// ログイン的な何か
const http = require('http');
http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Discord bot is active now \n');
}).listen(3000);

// Discord.jsのバージョン
const discord = require('v11-discord.js');
const client = new discord.Client();

//○○をプレイ中
client.on('ready', message =>
{
  client.user.setPresence({ game: { name: 'テッテテー！騙されました！' } });
  console.log('bot is ready!');
});

//キーワードに反応してメッセージを返す
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("おはよう")) {
        message.channel.send('おはよう！歯磨いた？顔洗った？朝ごはん食べた？今日も往生堂は貴方をウェルカムだよ！');
    }
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("お早う")) {
        message.channel.send('おはよう！歯磨いた？顔洗った？朝ごはん食べた？今日も往生堂は貴方をウェルカムだよ！');
    }
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("お早よう")) {
        message.channel.send('おはよう！歯磨いた？顔洗った？朝ごはん食べた？今日も往生堂は貴方をウェルカムだよ！');
    }
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("オハヨウ")) {
        message.channel.send('おはよう！歯磨いた？顔洗った？朝ごはん食べた？今日も往生堂は貴方をウェルカムだよ！');
    }
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("ｵﾊﾖｳ")) {
        message.channel.send('おはよう！歯磨いた？顔洗った？朝ごはん食べた？今日も往生堂は貴方をウェルカムだよ！');
    }
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("おやすみ")) {
        message.channel.send('永遠の眠りに就いてね…！');
    }
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("お休み")) {
        message.channel.send('永遠の眠りに就いてね…！');
    }
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("オヤスミ")) {
        message.channel.send('永遠の眠りに就いてね…！');
    }
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("おヤスミ")) {
        message.channel.send('永遠の眠りに就いてね…！');
    }
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("ｵﾔｽﾐ")) {
        message.channel.send('永遠の眠りに就いてね…！');
    }
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("疲れた")) {
        message.channel.send('往生堂で休んでく？今ならグッズが無料で貰えるよ！');
    }
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("つかれた")) {
        message.channel.send('往生堂で休んでく？今ならグッズが無料で貰えるよ！');
    }
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("ツカレタ")) {
        message.channel.send('往生堂で休んでく？今ならグッズが無料で貰えるよ！');
    }
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("ﾂｶﾚﾀ")) {
        message.channel.send('往生堂で休んでく？今ならグッズが無料で貰えるよ！');
    }
});

//メッセージに反応して行動を起こす
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.includes("いきるら")) {
        member.kick();
    }
});

// Discord TOKEN error
if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );