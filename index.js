const TelegramBot = require("node-telegram-bot-api");
const { forward } = require("./utils/fonts");
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN;
const convert = forward;
// Create a bot that uses 'polling' to fetch new updates

var port = process.env.PORT || 8443;
var bot = new TelegramBot(token, { webHook: { port: port } });
const url = process.env.APP_URL;
bot.setWebHook(`${url}/bot${token}`);

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  if (msg.text ? msg.text.toLowerCase() !== "/start" : false) {
    // send a message to the chat acknowledging receipt of their message
    const convertedText = convert(msg.text)
      .split(/\n/)
      .map((text) => {
        if (text.length) {
          return "<code>" + text + "</code>";
        }
      })
      .join("\n");
    try {
      await bot.sendMessage(chatId, convertedText, {
        parse_mode: "HTML",
      });
    } catch (err) {
      setTimeout(() => {}, 5000);
    }
  } else {
    bot.sendMessage(chatId, "Menga ismingizni jo'nating");
  }
});
