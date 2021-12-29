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
  client.user.setPresence({ game: { name: 'This bot is made discord.js' } });
  console.log('bot is ready!');
});

client.on('message', message =>
{
	if(message.isMemberMentioned(client.user) && message.author != client.user)
	{
		message.reply( '呼びましたか？' );
		return;
	}
});

const ytdl = require('ytdl-core');
 const { entersState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel,  StreamType } = require('@discordjs/voice');
 
 client.on('messageCreate', async message => {
   // メッセージが "!yt" からはじまっていてサーバー内だったら実行する
   if (!message.content.startsWith('!yt') || !message.guild) {
     return;
   }
   // メッセージから動画URLだけを取り出す
   const url = message.content.split(' ')[1];
   if (!ytdl.validateURL(url)) return message.reply(`${url}は処理できません。`);
   // コマンドを実行したメンバーがいるボイスチャンネルを取得
   const channel = message.member.voiceChannel;
   // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
   if (!channel) return message.reply('先にボイスチャンネルに参加してください！');
   // チャンネルに参加
   const connection = joinVoiceChannel({
    adapterCreator: channel.guild.voiceAdapterCreator,
    channelId: channel.id,
    guildId: channel.guild.id,
    selfDeaf: true,
    selfMute: false,
   });
   const player = createAudioPlayer();
   connection.subscribe(player);
   // 動画の音源を取得
   const stream = ytdl(ytdl.getURLVideoID(url), {
     filter: format => format.audioCodec === 'opus' && format.container === 'webm', //webm opus
     quality: 'highest',
     highWaterMark: 32 * 1024 * 1024, // https://github.com/fent/node-ytdl-core/issues/902
   });
   const resource = createAudioResource(stream, {
      inputType: StreamType.WebmOpus
    });
   // 再生
   player.play(resource);
   await entersState(player,AudioPlayerStatus.Playing, 10 * 1000);
   await entersState(player,AudioPlayerStatus.Idle, 24 * 60 * 60 * 1000);
   // 再生が終了したら抜ける
   connection.destroy();
 });


if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );