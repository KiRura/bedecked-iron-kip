// ログイン的な何か
const http = require('http')
http
  .createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Discord bot is active now \n')
  })
  .listen(3000)

// Discord.jsのバージョン
const { Client, Intents } = require('discord.js')
const client = new Client({ intents: Intents.ALL })

//○○をプレイ中

//キーワードに反応してメッセージを返す
client.on('message', async msg => {
  if(msg.author.bot) return;
  if(msg.content.match(
    /おは|おっは|オハ|ｵﾊ/g
  ))
 {
　msg.react('929303726169157692')
   return;
}})

//メッセージに反応して行動を起こす

// Discord TOKEN error
if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.error('tokenが設定されていません！')
  process.exit(0)
}

client.login(process.env.DISCORD_BOT_TOKEN)