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
        const phoneInput = document.getElementById('phone');
        const displayText = document.getElementById('display-text');

        btnValidate.addEventListener('click', async () => {
            const phoneNumber = phoneInput.value.trim();
            if (!phoneNumber) {
                displayText.innerText = "Silvouplè, antre yon nimewo valab.";
                displayText.style.color = "#ff4757";
                return;
            }
            displayText.innerText = "Y ap jeneri kòd la, tann yon ti moman...";
            displayText.style.color = "#6c5ce7";

            try {
                const response = await fetch(`/pair?phone=${phoneNumber}`);
                const data = await response.json();
                if (data.code) {
                    displayText.innerHTML = `<span style="font-size: 24px; font-weight: bold; color: #fff; letter-spacing: 4px;">${data.code}</span>`;
                } else {
                    displayText.innerText = "Erè: " + (data.error || "Eshwe");
                    displayText.style.color = "#ff4757";
                }
            } catch (err) {
                displayText.innerText = "Sèvè a gen pwoblèm, reyezi ankò.";
                displayText.style.color = "#ff4757";
            }
        });

        btnReset.addEventListener('click', () => {
            phoneInput.value = '';
            displayText.innerText = "Enter your phone number";
            displayText.style.color = "#4e5564";
        });
    </script>
</body>
</html>
