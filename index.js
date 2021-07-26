const TelegramBot = require("node-telegram-bot-api");
const { forward } = require("./utils/fonts");
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN | "your token";
const convert = forward;
// Create a bot that uses 'polling' to fetch new updates

var port = process.env.PORT || 8443;
var host = process.env.HOST;
var bot = new TelegramBot(token, { webHook: { port: port } });
const url = process.env.APP_URL || "https://<app-name>.herokuapp.com:443";
bot.setWebHook(`${url}/bot${token}`);

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

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
