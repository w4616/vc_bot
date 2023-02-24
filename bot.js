const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
const fs = require('fs');

// 读取 config.py 文件
const configData = fs.readFileSync('config.py', 'utf8');
let ck = configData.match(/ck\s*=\s*['"]([^'"]*)['"]/)[1];

// 创建 bot 实例并连接到 Telegram API
const bot = new TelegramBot('YOU TGBOT ID', { polling: true });

// 处理 /start 命令
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '欢迎使用vc库存bot，此bot为bata版本，如果不能使用请见谅！\n发送 /help 查看帮助 \n本程序已开源https://github.com/w4616/vc_bot/');
});

// 处理 /help 命令
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '/vc 库存\n/x 系统（用于检测ck是否存活，如果有回复即存活）\n/ping 检测是否存货\n/ck 提交ck（未写）\n/help 帮助');
});

// 处理 /ping 命令
bot.onText(/\/ping/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'pong~~~~~');
});

// 处理 /vc 命令
bot.onText(/\/vc/, (msg) => {
  const chatId = msg.chat.id;
  exec('python3 c1.py', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      bot.sendMessage(chatId, '运行出错，请联系管理员');
      return;
    }
    bot.sendMessage(chatId, stdout);
  });
});

// 处理 /x 命令
bot.onText(/\/x/, (msg) => {
  const chatId = msg.chat.id;
  exec('python3 x1.py', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      bot.sendMessage(chatId, '运行出错，请联系管理员');
      return;
    }
    bot.sendMessage(chatId, stdout);
  });
});

// 处理 /ck 命令
bot.onText(/\/ck\s+(\S+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const newCk = match[1];
  // 修改 config.py 文件中的 ck 变量
  const newConfigData = configData.replace(/ck\s*=\s*['"][^'"]*['"]/, `ck = '${newCk}'`);
  fs.writeFileSync('config.py', newConfigData);
  ck = newCk;
  bot.sendMessage(chatId, `已将 config.py 中的 ck 变量修改为 ${newCk}`);
});
