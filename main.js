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

client.on('message', message =>
{
	if(message.isMemberMentioned(client.user) && message.author != client.user)
	{
		message.random.reply('お日様が出たら日光浴〜 お月様が出たら月光浴〜',
                        'ヒルチャールのお兄さんが病気になった ヒルチャールのお姉さんが看病して〜 ヒルチャールのお兄さんが薬を飲んでも治らなァい！',
                        'あれれェ〜？キョンシーが怖いのォ？',
                        '私とお茶しな〜い？ ｴﾍﾍｪ',
                        'ｳｧｰﾝそうですねぇ。あたり、魔神に呪われてます。それもヤバいくらいにぃ。',
                        );
		return;
	}
});

if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );