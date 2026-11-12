const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'hanzumc.com', 
    port: 25565,
    username: 'babao79', 
    version: '1.21.11',
  });

  bot.on('spawn', () => {
    console.log(`[+] Bot ${bot.username} đã vào server!`);
    
    bot.chat('/dn 04042006');

    setTimeout(() => {
      console.log('[*] Đang dùng lệnh /skyblock để chuyển server...');
      bot.chat('/skyblock');
    }, 3000);

  });

  bot.on('end', (reason) => {
    console.log(`[-] Mất kết nối: ${reason}. Đang kết nối lại sau 10 giây...`);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log(`[!] Lỗi: ${err.message}`);
  });
}

createBot();
