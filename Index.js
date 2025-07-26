const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// استقبال البيانات من التطبيق
app.post('/log', (req, res) => {
  const data = {
    time: new Date().toISOString(),
    ...req.body
  };
  fs.appendFileSync('log.txt', JSON.stringify(data) + '\n');
  res.send({ status: 'logged' });
});

// عرض البيانات
app.get('/logs', (req, res) => {
  if (!fs.existsSync('log.txt')) return res.send('No logs yet.');
  const logs = fs.readFileSync('log.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(line => JSON.parse(line));
  res.json(logs);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
