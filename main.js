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
   const filter = (reaction, user) => user.id === msg.author.id && reaction.emoji.name === '929303726169157692'
  msg.awaitReactions({ filter, max: 1, time: 15000, errors: ['time'] })
  .then(() => console.log('リアクションされました'))
  .catch(() => {}) // 時間切れの処理。エラーを防ぐために何もしない場合でも書く必要がある（何かすることもできる）
}})

//メッセージに反応して行動を起こす

// Discord TOKEN error
if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.error('tokenが設定されていません！')
  process.exit(0)
}

client.login(process.env.DISCORD_BOT_TOKEN)