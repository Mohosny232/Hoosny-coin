// جلب جميع العمليات من operations.json
const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  const filePath = path.join(__dirname, 'operations.json');
  let operations = [];

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    operations = JSON.parse(data);
  } catch (err) {
    console.log('لا يوجد سجلات حتى الآن');
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ operations })
  };
};
