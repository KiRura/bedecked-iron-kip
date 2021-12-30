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

const ytdl = require('ytdl-core')

client.on('message', async message => {
  // メッセージが "!yt" からはじまっていてサーバー内だったら実行する
  if (message.content.startsWith('>>yt') && message.guild) {
    // メッセージから動画URLだけを取り出す
    const url = message.content.split(' ')[1]
    // まず動画が見つからなければ処理を止める
    if (!ytdl.validateURL(url)) return message.reply('動画が存在しません！')
    // コマンドを実行したメンバーがいるボイスチャンネルを取得
    const channel = message.member.voiceChannel
    // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
    if (!channel) return message.reply('先にボイスチャンネルに参加してください！')
    // チャンネルに参加
    const connection = await channel.join()
    // 動画の音源を取得
    const stream = ytdl(ytdl.getURLVideoID(url), { filter: 'audioonly' })
    // 再生
    const dispatcher = connection.playStream(stream)
    
    // 再生が終了したら抜ける
    dispatcher.on('end', () => {
      channel.leave()
    })
  }
})

// Discord TOKEN error
if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );