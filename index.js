const TelegramBot = require("node-telegram-bot-api");
const { forward } = require("./utils/fonts");
// replace the value below with the Telegram token you receive from @BotFather
const token = "1934972123:AAFJGemQb0MtyfA0x9RPWntaVGpkFs1C5u8";
const convert = forward;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

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

bot.setWebHook("zero8d.xyz", {
  certificate: "./crt.pem", // Path to your crt.pem
});
