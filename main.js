//ログイン的な何か
const http = require('http')
http
  .createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Discord bot is active now \n')
  })
  .listen(3000)

//Discord.jsのバージョン
const { Client, Intents } = require('discord.js')
const client = new Client({ intents: Intents.ALL })

//○○をプレイ中
client.on('ready', () => {
  setInterval(() => {
    client.user.setActivity({
      name: `${client.ws.ping}ms`
    })
  }, 10000)
})

//プレフィックス指定
const prefix = 'hu!'

//メッセージ送信系
client.on('message', async msg => {
  
  //おはように反応
  if(msg.author.bot) return;
  if(msg.content.match(
    /おは|おっは|オハ|ｵﾊ/g)){
    msg.react('929303726169157692')
  }
  
  //投票機能
  if (!msg.content.startsWith(prefix)) return;
  const [command, ...args] = msg.content.slice(prefix.length).split(' ')
  if (command === 'poll') {
    const [title, ...choices] = args
    if (!title) return msg.channel.send('タイトルを指定してください')
    const emojis = ['🇦', '🇧', '🇨', '🇩']
    if (choices.length < 2 || choices.length > emojis.length)
      return msg.channel.send(`選択肢は2から${emojis.length}つを指定してください`)
    const poll = await msg.channel.send({
      embed: {
        title: title,
        description: choices.map((c, i) => `${emojis[i]} ${c}`).join('\n')
      }
    });
    emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji))
  }
})

//トークンエラー
if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.error('tokenが設定されていません！')
  process.exit(0)
}

//謎
client.login(process.env.DISCORD_BOT_TOKEN)