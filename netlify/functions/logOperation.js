// netlify/functions/logOperation.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const { username, coins } = JSON.parse(event.body);

  const logPath = path.join(__dirname, 'operations.json');

  // اقرأ السجل القديم
  let logs = [];
  try {
    logs = JSON.parse(fs.readFileSync(logPath));
  } catch {}

  // أضف العملية الجديدة
  logs.push({
    username,
    coins,
    date: new Date().toISOString()
  });

  // خزّن السجل
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
