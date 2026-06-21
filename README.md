## 🌐 Kouman pou w Deplwaye Paj Session ID (Shadow-MD Login)

Pou paj login lan ka monte sou lyen Render ou a (`https://shadow-md-hopy.onrender.com`), swiv etap senp sa yo:

### 1. Kreye paj HTML la
Kreye yon fichye ki rele `index.html` anndan yon fòldè ki rele `public` (`public/index.html`) epi mete kòd sa a ladan l:

```html
<!DOCTYPE html>
<html lang="ht">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shadow-MD Login</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Arial', sans-serif; }
        body { background-color: #0b0f19; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
        .login-container { background-color: #121620; border-radius: 16px; padding: 30px 20px; width: 100%; max-width: 400px; text-align: center; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); }
        h2 { color: #ffffff; font-size: 28px; margin-bottom: 25px; font-weight: bold; }
        .checkbox-container { display: flex; justify-content: center; align-items: center; gap: 10px; color: #b3b9c9; font-size: 16px; margin-bottom: 30px; }
        .checkbox-container input { width: 18px; height: 18px; cursor: pointer; }
        .input-group { margin-bottom: 15px; }
        .input-group input { width: 100%; padding: 16px; background-color: #161a25; border: 2px solid #635bff; border-radius: 8px; color: #fff; font-size: 16px; outline: none; }
        .input-group input::placeholder { color: #4e5564; }
        .btn-validate { width: 100%; padding: 16px; background-color: #6c5ce7; border: none; border-radius: 8px; color: white; font-size: 16px; font-weight: bold; cursor: pointer; margin-bottom: 25px; display: flex; justify-content: center; align-items: center; gap: 8px; }
        .btn-validate:hover { background-color: #5b4cc4; }
        .display-box { background-color: #0d1017; border-radius: 12px; height: 180px; display: flex; justify-content: center; align-items: center; color: #4e5564; font-size: 16px; margin-bottom: 25px; padding: 15px; }
        .btn-reset { width: 100%; padding: 16px; background-color: #ff4757; border: none; border-radius: 8px; color: white; font-size: 16px; font-weight: bold; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 8px; }
        .btn-reset:hover { background-color: #e03d4b; }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Shadow-MD Login</h2>
        <div class="checkbox-container">
            <input type="checkbox" id="custom-session">
            <label for="custom-session">Use a custom session</label>
        </div>
        <div class="input-group">
            <input type="text" id="phone" placeholder="Enter your phone number">
        </div>
        <button class="btn-validate" id="btn-validate">✓ Validate</button>
        <div class="display-box">
            <p id="display-text">Enter your phone number</p>
        </div>
        <button class="btn-reset" id="btn-reset">⟳ Reset</button>
    </div>

    <script>
        const btnValidate = document.getElementById('btn-validate');
        const btnReset = document.getElementById('btn-reset');
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
