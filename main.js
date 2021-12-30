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

client.on("message", message => {
  // bot自身の発言は無視
  if (message.author.bot) return;

  //　敗北者という単語が含まれていたときの処理
  if (message.content.includes("敗北者")) {
    if (message.isMemberMentioned(client.user) && message.member.voiceChannel) {
      /* ボイスチャンネルにいる人がbotにメンションをしたときの処理 */
      message.member.voiceChannel
        .join()
        .then(connection => {
          const fileNames = ["nc186194.mp3"];
          // 複数の音声データのうちいずれかをランダムで選ぶ
          const fileName =
            fileNames[Math.floor(Math.random() * fileNames.length)];

          // 再生 再生終了時にボイスチャンネルから切断
          const dispatcher = connection.playFile(fileName);
          dispatcher.on("end", () => connection.disconnect());
        })
        .catch(console.error);
    } else {
      /* 敗北者という単語が含まれているが、
      メンションでなかったり発言者がボイスチャンネルにいないときの処理 */
      const texts = [
        "ハァ...ハァ...敗北者...? 取り消せよ...!!","今の言葉...!!",
      ];

      // メンションする文字列をランダムで選択
      const replyText = texts[Math.floor(Math.random() * texts.length)];
      message.reply(replyText).catch(console.error);
    }
  }
});

if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );