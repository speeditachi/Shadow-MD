const express = require('express');
const pino = require('pino');
const { default: makeWASocket, useMultiFileAuthState, delay } = require('@whiskeysockets/baileys');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Sèvi fichiye HTML yo nan yon fòldè ki rele 'public'
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint pou mande Pairing Code
app.get('/api/pair', async (req, res) => {
    let phone = req.query.phone;
    
    if (!phone) {
        return res.status(400).json({ error: "Tanpri bay yon nimewo telefòn!" });
    }
    
    // Netwaye nimewo a (retire espas oswa siy +)
    phone = phone.replace(/[^0-9]/g, '');

    try {
        // Kreye yon sesyon tanporè pou koneksyon an
        const { state, saveCreds } = await useMultiFileAuthState(`./session_${phone}`);
        
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            logger: pino({ level: 'silent' }),
            browser: ["Ubuntu", "Chrome", "20.0.04"]
        });

        // Si li pa gen kòd ki sove deja, li mande kòd la nan WhatsApp
        if (!sock.authState.creds.registered) {
            await delay(1500); // Yon ti delè pou server a pare
            const code = await sock.requestPairingCode(phone);
            
            // Fòmate kòd la pou l gen espas nan mitan tankou nan foto a (egz: DNUZ-AXCL)
            const formattedCode = code?.match(/.{1,4}/g)?.join(' - ') || code;
            
            // Voye kòd la bay paj entènèt la
            res.json({ code: formattedCode });
        } else {
            res.json({ error: "Nimewo sa a deja konekte nan bot la!" });
        }

        // Sove kredansyèl yo si gen chanjman
        sock.ev.on('creds.update', saveCreds);
        
        // Fèmen koneksyon an si li echwe oswa rete la pou lè w fin tape kòd la sou telefòn ou
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
