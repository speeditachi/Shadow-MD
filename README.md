        const b# Shadow-MD
# 🤖 Shadow MD WhatsApp Bot

Shadow MD se yon WhatsApp Multi-Device bot ki fèt pou automatisation, group management, ak chat commands.

---

## ⚡ Features

- 🤖 Auto reply system
- 👥 Group management commands
- 🔥 Advanced moderation tools
- 📡 Fast response system
- 💀 Multi-device support (MD)

---
---

## 🔐 IMPORTANT

- Do NOT share your session ID with anyone
- If session leaks, reset it immediately
- Keep your `.env` file private

---

## 👑 OWNER CONTACT

If you need help or support:

📞 WhatsApp: +50942911609
📩 Telegram: @yourusername  
📧 Email: razagithub21@gmail.com

---

## ⚠️ WARNING

This bot is for educational and personal use only.
Misuse is not allowed.

---

## 💀 SHADOW MD TEAM
Powered by Developer Community


## 📲 Session 

## ⚙️ Installation

```bash
git clone https://github.com/your-username/shadow-md
cd shadow-md
npm install
npm start
node generate-session.js
tnReset = document.getElementById('btn-reset');
        
const express = require('express');
const pino = require('pino');
const fs = require('fs');
const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    makeCacheableSignalKeyStore 
} = require('@whiskeysockets/baileys');

const app = express();

app.get('/pair', async (req, res) => {
    let phone = req.query.phone;
    if (!phone) return res.json({ error: "Silvouplè antre yon nimewo telefòn valid." });
    
    // Netwaye nimewo a
    phone = phone.replace(/[^0-9]/g, '');

    // Kreye yon fòldè sesyon tanporè pou nimewo sa a
    const { state, saveCreds } = await useMultiFileAuthState(`./temp_session_${phone}`);
    
    try {
        const sock = makeWASocket({
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" })),
            },
            printQRInTerminal: false,
            logger: pino({ level: "fatal" }),
            browser: ["Ubuntu", "Chrome", "20.0.04"]
        });

        // Mande kòd asosyasyon (Pairing Code) la nan WhatsApp
        if (!sock.authState.creds.registered) {
            setTimeout(async () => {
                try {
                    let code = await sock.requestPairingCode(phone);
                    code = code?.match(/.{1,4}/g)?.join("-") || code;
                    return res.json({ code: code });
                } catch (err) {
                    return res.json({ error: "Echwe pou jenere kòd la. Re-esye ankò." });
                }
            }, 3000);
        }

        // Koute lè koneksyon an fèt pou n voye Session ID a
        sock.ev.on('connection.update', async (update) => {
            const { connection } = update;
            
            if (connection === 'open') {
                try {
                    // Li fichye creds la epi kode l an Base64 pou fè Session ID a
                    const credsFile = JSON.parse(fs.readFileSync(`./temp_session_${phone}/creds.json`, 'utf-8'));
                    const sessionId = "Shadow-MD~" + Buffer.from(JSON.stringify(credsFile)).toString('base64');
                    
                    // Voye Session ID a bay moun nan sou WhatsApp li
                    await sock.sendMessage(sock.user.id, { 
                        text: `*SHADOW-MD SESSION ID*\n\nKoneksyon an reyisi! 🎉\n\nMen Session ID ou an, pa pataje l ak pèsonn:\n\n\`\`\`${sessionId}\`\`\`` 
                    });

                    // Efase fòldè tanporè a pou sekirite
                    setTimeout(() => {
                        fs.rmSync(`./temp_session_${phone}`, { recursive: true, force: true });
                    }, 5000);

                } catch (e) {
                    console.log("Erè jenerasyon Session ID:", e);
                }
            }
        });

        sock.ev.on('creds.update', saveCreds);

    } catch (error) {
        console.error(error);
        res.json({ error: "Sèvè a gen yon pwoblèm." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sèvè Session ID ap mache sou pò ${PORT}`));
