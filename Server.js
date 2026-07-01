const express = require('express');
const pino = require('pino');
const { default: makeWASocket, useMultiFileAuthState, delay } = require('@whiskeysockets/baileys');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint pou mande Pairing Code
app.get('/api/pair', async (req, res) => {
    let phone = req.query.phone;
    
    if (!phone) {
        return res.status(400).json({ error: "Tanpri bay yon nimewo telefòn!" });
    }
    
    phone = phone.replace(/[^0-9]/g, '');

    try {
        const { state, saveCreds } = await useMultiFileAuthState(`./session_${phone}`);
        
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            logger: pino({ level: 'silent' }),
            browser: ["Ubuntu", "Chrome", "20.0.04"]
        });

        if (!sock.authState.creds.registered) {
            await delay(1500);
            const code = await sock.requestPairingCode(phone);
            const formattedCode = code?.match(/.{1,4}/g)?.join(' - ') || code;
            res.json({ code: formattedCode });
        } else {
            res.json({ error: "Nimewo sa a deja konekte nan bot la!" });
        }

        sock.ev.on('creds.update', saveCreds);
        
        sock.ev.on('connection.update', async (update) => {
            const { connection } = update;
            if (connection === 'open') {
                console.log(`Bot la konekte avèk siksè sou nimewo: ${phone}`);
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erè nan jenerasyon kòd la. Re-eseye ankò." });
    }
});

app.listen(PORT, () => {
    console.log(`Server Shadow-MD ap kouri sou port ${PORT}`);
});
