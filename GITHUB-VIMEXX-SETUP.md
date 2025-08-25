# 🔗 GitHub → Vimexx Automatische Deployment Setup

## 🚀 Optie 1: GitHub Actions (Aanbevolen)

### Stap 1: Vimexx FTP Gegevens Verzamelen
1. Log in op **Vimexx Control Panel**
2. Ga naar **"FTP Accounts"** of **"Bestandsbeheer"**
3. Noteer:
   - **FTP Host**: meestal `ftp.jouwdomain.com` of `ftp.vimexx.nl`
   - **Gebruikersnaam**: je FTP username
   - **Wachtwoord**: je FTP password

### Stap 2: GitHub Secrets Instellen
1. Ga naar: https://github.com/Tjallingsol/Aggregaatkopen
2. Klik: **Settings** → **Secrets and variables** → **Actions**
3. Klik: **"New repository secret"**
4. Voeg toe:
   ```
   Name: VIMEXX_FTP_HOST
   Value: ftp.jouwdomain.com
   
   Name: VIMEXX_FTP_USER  
   Value: je_ftp_gebruikersnaam
   
   Name: VIMEXX_FTP_PASSWORD
   Value: je_ftp_wachtwoord
   ```

### Stap 3: Workflow Activeren
- De workflow is al toegevoegd aan je repository
- **Automatisch**: Bij elke push naar `main` branch
- **Handmatig**: Via GitHub Actions tab → "Run workflow"

### Stap 4: Eerste Deployment Testen
1. Maak een kleine wijziging aan `README.md`
2. Commit en push naar GitHub:
   ```bash
   git add .
   git commit -m "Test auto-deployment"
   git push origin main
   ```
3. Check **Actions** tab in GitHub voor deployment status

---

## 🖥️ Optie 2: SSH Access (Als Vimexx SSH ondersteunt)

### Stap 1: SSH Toegang Controleren
1. Vraag Vimexx support of SSH beschikbaar is
2. Krijg SSH credentials van Vimexx

### Stap 2: Repository Clonen op Server
```bash
# SSH naar je Vimexx server
ssh jouwgebruiker@jouwdomain.com

# Navigeer naar website directory
cd public_html

# Clone repository
git clone https://github.com/Tjallingsol/Aggregaatkopen.git .

# Maak deployment script executable
chmod +x vimexx-deploy.sh
```

### Stap 3: Automatische Updates
```bash
# Voor updates, run het deployment script:
./vimexx-deploy.sh
```

---

## 🎣 Optie 3: Webhook (Advanced)

### Stap 1: Webhook Script Uploaden
1. Upload `webhook-deploy.php` naar je `public_html/`
2. Maak het executable: `chmod 755 webhook-deploy.php`

### Stap 2: GitHub Webhook Instellen
1. Ga naar je GitHub repo: **Settings** → **Webhooks**
2. Klik **"Add webhook"**
3. **Payload URL**: `https://jouwdomain.com/webhook-deploy.php`
4. **Content type**: `application/json`
5. **Secret**: Kies een sterk wachtwoord
6. **Events**: Selecteer "Just the push event"

### Stap 3: Security Secret Instellen
Edit `webhook-deploy.php` en vervang:
```php
$secret = 'your-webhook-secret-here';
```
Met je gekozen webhook secret.

---

## ✅ Deployment Testen

### Na Setup - Test Je Deployment:

1. **Maak een wijziging**:
   ```bash
   echo "<!-- Test -->" >> README.md
   git add .
   git commit -m "Test deployment"
   git push origin main
   ```

2. **Check resultaten**:
   - **GitHub Actions**: Ga naar Actions tab
   - **Website**: Bezoek je domain
   - **Logs**: Check Vimexx control panel voor errors

### Troubleshooting:

**Als GitHub Actions faalt:**
- Check FTP credentials in Secrets
- Controleer FTP host/permissions bij Vimexx
- Check build logs in Actions tab

**Als SSH deployment faalt:**
- Controleer SSH toegang met Vimexx support
- Check git permissions op server
- Zorg dat Node.js geïnstalleerd is (optioneel)

**Als Webhook faalt:**
- Check PHP error logs in Vimexx panel
- Controleer webhook secret
- Test webhook URL handmatig

---

## 🎯 Aanbevolen Flow:

1. **Start met**: GitHub Actions (Optie 1)
2. **Als dat niet werkt**: Probeer SSH deployment (Optie 2)  
3. **Voor advanced users**: Webhook integration (Optie 3)

**GitHub Actions is het makkelijkst** omdat het geen speciale server configuratie vereist - alleen FTP toegang.

---

## 📞 Vimexx Support

Als je problemen hebt:
- **Email**: support@vimexx.nl
- **Telefoon**: 088-4640018
- **Vraag specifiek naar**:
  - FTP toegang details
  - SSH toegang (indien gewenst)
  - PHP/Node.js ondersteuning

Succes met je automatische deployment! 🚀