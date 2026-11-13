// --- ĐOẠN CODE TẠO WEB SERVER GIỮ NHỊP ---
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Web Server cua Bot Minecraft dang hoat dong!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[+] Web server da mo tren port ${port}`);
});

// --- ĐOẠN CODE BOT MINECRAFT ---
const mineflayer = require('mineflayer');

// Khai báo biến vòng lặp ở ngoài để dễ dàng dọn dẹp khi rớt mạng
let jumpInterval;
let skyblockInterval;

function createBot() {
  const bot = mineflayer.createBot({
    host: 'hanzumc.com', 
    port: 25565,
    username: 'babao79', 
    version: '1.21.11',
  });

  bot.on('spawn', () => {
    console.log(`[+] Bot ${bot.username} đã vào server!`);
    
    // 1. Gõ mật khẩu đăng nhập
    bot.chat('/dn 04042006');

    // 2. Chờ 10 giây (thay vì 3s) để server hết lag sau bảo trì rồi mới vào Skyblock
    setTimeout(() => {
      console.log('[*] Đang dùng lệnh /skyblock để chuyển server...');
      bot.chat('/skyblock');
    }, 10000);

    // Dọn dẹp các vòng lặp cũ (nếu có) để tránh lỗi tràn bộ nhớ
    if (skyblockInterval) clearInterval(skyblockInterval);

    // 3. Cơ chế CHỐNG KẸT SẢNH (Mới): Cứ 5 phút gõ lại lệnh /skyblock một lần
    // Nếu bot kẹt ở sảnh, nó sẽ tự động vào lại. Nếu đã ở trong Skyblock, lệnh này vô hại.
    skyblockInterval = setInterval(() => {
      console.log('[*] Đang kiểm tra và gõ lại /skyblock phòng khi kẹt sảnh...');
      bot.chat('/skyblock');
    }, 5 * 60 * 1000);
  });

  bot.on('end', (reason) => {
    console.log(`[-] Mất kết nối: ${reason}. Đang kết nối lại sau 30 giây...`);
    // Ngừng các vòng lặp hoạt động ngầm khi rớt mạng
    if (skyblockInterval) clearInterval(skyblockInterval);
    
    // Chờ 5p cho server có thời gian xử lý bảo trì trước khi kết nối lại
    setTimeout(createBot, 500000);
  });

  bot.on('error', (err) => {
    console.log(`[!] Lỗi: ${err.message}`);
  });
}

createBot();
