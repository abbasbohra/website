# website

Local contact email setup

1. Backend

   - cd server
   - npm install
   - Create .env with SMTP settings (see below)
   - npm start

2. .env example

   - PORT=3001
   - SMTP_HOST=your_smtp_host
   - SMTP_PORT=587
   - SMTP_SECURE=false
   - SMTP_USER=your_username
   - SMTP_PASS=your_password
   - TO_EMAIL=info@albhurhanregional.com
   - FROM_EMAIL=Website <no-reply@yourdomain.com>
   - CORS_ORIGINS=http://localhost:5500,http://127.0.0.1:5500

3. Frontend
   - Open index.html via a static server (e.g., VS Code Live Server)
   - Submit the Get In Touch form; it POSTs to http://localhost:3001/api/contact
