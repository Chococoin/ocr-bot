const { Telegraf, session, Scenes, Markup } = require('telegraf')
require('dotenv').config()

const imageScene = require('./scenes/imageScene').imageScene
const videoScene = require('./scenes/videoScene').videoScene

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Scenes.Stage([imageScene, videoScene])
bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => {
  let userFirstName = ctx.message.from.first_name
  let message = ` Hello master ${userFirstName}, i am OCR bot your humble servant. \n
  Where would you like to extract text from ?`

  let options = Markup.inlineKeyboard([
      Markup.button.callback('Extract from 🖼️', 'extractFromImage'),
      Markup.button.callback('Extract from 🎬', 'extractFromVideo'),
  ])
  ctx.reply(message, options)
})

bot.action('extractFromImage', Scenes.Stage.enter('imageScene'))
bot.action('extractFromVideo', Scenes.Stage.enter('videoScene'))

bot.launch()