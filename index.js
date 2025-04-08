const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const schedule = require('node-schedule');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot pronto!');

    // Enviar link todo dia às 18h
    schedule.scheduleJob('0 18 * * *', async () => {
        const chats = await client.getChats();
        const grupo = chats.find(c => c.name === '🔎Ofertas Ocultas| VIP Influencers/Stremers');
        if (grupo) {
            grupo.sendMessage('Link do dia: https://chat.whatsapp.com/JszizGeYzaLAVLapEnSI4r');
            console.log('Link enviado!');
        } else {
            console.log('Grupo não encontrado.');
        }
    });
});

client.initialize();
0
