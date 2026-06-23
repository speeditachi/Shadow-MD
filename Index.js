const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const pino = require("pino")

async function startBot() {

    // 🔐 session folder
    const { state, saveCreds } = await useMultiFileAuthState("session")

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: "silent" })
    })

    // 🔄 save session
    sock.ev.on("creds.update", saveCreds)

    // 📩 messages listener
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message) return

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text

        const from = msg.key.remoteJid

        console.log("Message:", text)

        // 🔥 COMMAND: ping
        if (text === ".ping") {
            await sock.sendMessage(from, {
                text: "⚡ Shadow MD Online"
            })
        }

        // 🔥 COMMAND: menu
        if (text === ".menu") {
            await sock.sendMessage(from, {
                text: `
🤖 SHADOW MD BOT

Commands:
.ping
.menu

🔥 Bot is running
`
            })
        }

    })

}

startBot()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
    res.send('Bot la ap kouri byen!');
});

app.listen(PORT, () => {
    console.log(`Sèvè ap kouri sou pò ${PORT}`);
});
