const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Sèvi fichye HTML/CSS/JS yo si nou mete yo nan yon dosye 'public'
app.use(express.static(path.join(__dirname, 'public')));

let activeDeployments = [];

// Route pou resevwa enfòmasyon nan fòm Hublink lan
app.post('/api/deploy', (req, res) => {
    const { botName, phoneNumber, sessionId } = req.body;

    if (!botName || !phoneNumber || !sessionId) {
        return res.status(400).json({ success: false, message: "Tanpri ranpli tout bwat yo." });
    }

    console.log(`[Hublink] Y ap konfigire bot: ${botName} pou nimewo: ${phoneNumber}`);

    const newBot = {
        id: Date.now().toString(),
        botName,
        phoneNumber,
        status: 'Running',
        createdAt: new Date().toLocaleTimeString()
    };

    activeDeployments.push(newBot);

    // Isit la nou ka konekte lojik pou rdemare oswa aplike Session ID a bay Shadow-MD si nou vle
    return res.status(200).json({
        success: true,
        message: `Bot ${botName} lan konekte sou sistèm Hublink lan ak siksè!`,
        bot: newBot
    });
});

app.get('/api/deployments', (req, res) => {
    res.json(activeDeployments);
});

// Nenpòt lòt route ap tounen sou paj prensipal la
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
        if (err) {
            res.status(200).send("Hublink API ap kouri! (Mete fichye HTML v0 yo nan dosye 'public' la)");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Hublink ak Shadow-MD ap kouri sou pò: ${PORT}`);
});
