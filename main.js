const TelegramBot = require("node-telegram-bot-api")
require("dotenv").config()

const token = process.env.TELEGRAM_TOKEN
const bot = new TelegramBot(token, { polling: true })

bot.on("sticker", (data) => {
    console.log(data)
    bot.sendMessage(data.from.id, data.sticker.emoji)
})

bot.onText(/^!halo$/, (data) => {
    console.log("testing...")
    bot.sendMessage(data.from.id, "halo")
})

bot.onText(/^quotes hari ini$/, async (data) => {
    try {
        const quoteEndpoint = "https://api.kanye.rest/"
        const apiCall = await fetch(quoteEndpoint) // langsung built-in
        const response = await apiCall.json()
        const { quote } = response

        console.log(response)
        bot.sendMessage(data.from.id, quote)
    } catch (err) {
        console.error(err)
        bot.sendMessage(data.from.id, "⚠️ Gagal ambil quote")
    }
})
