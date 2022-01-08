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
  console.log(`Logged in as ${client.user.tag}!`)
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
  
  //ユーザーの使用デバイス
  if (msg.content === 'status') {
    const userStatus = msg.author.presence.clientStatus

    if (!userStatus) {
      return msg.channel.send('どのデバイスからもアクセスされていません。')
    }

    msg.channel.send(
      [
        'desktop: ' + (userStatus.desktop || 'offline'),
        'mobile: ' + (userStatus.mobile || 'offline'),
        'web: ' + (userStatus.web || 'offline'),
      ].join('\n')
    )
  }
  //メンションしたユーザーのメッセージを削除
      if (msg.content.startsWith('!mmd') && msg.guild) {
        // 指定されたメッセージの数を取得
        const how = msg.content.split(' ')[1];
        // メンションでユーザーが指定されていなかったら処理を止める
        if (!how || msg.mentions.members.size == 0) return;
        // 指定された数のメッセージを取得
        const messages = await msg.channel.messages.fetch({ limit: how }) 
        // メンションで指定されたユーザーのIDのみを配列に入れる
        const mentionMembers = await msg.mentions.members.map(m => m.user.id)
        // 指定されたユーザーが発言したメッセージのみを抽出
        const mentionFilter =  await messages.filter(msg => mentionMembers.some(userID => userID == msg.author.id))
        // それらのメッセージを一括削除
        msg.channel.bulkDelete(mentionFilter)
   }
})

//トークンエラー
if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.error('tokenが設定されていません！')
  process.exit(0)
}

//謎
client.login('TOKEN')