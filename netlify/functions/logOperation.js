// حفظ العمليات في operations.json
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { username, coins } = JSON.parse(event.body);

  const filePath = path.join(__dirname, 'operations.json');

  let operations = [];
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    operations = JSON.parse(data);
  } catch (err) {
    console.log('ملف جديد سيتم إنشاؤه');
  }

  const newOp = {
    username: username || 'غير معروف',
    coins: coins || 0,
    timestamp: Date.now()
  };

  operations.push(newOp);

  fs.writeFileSync(filePath, JSON.stringify(operations, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'تم تسجيل العملية', operation: newOp })
  };
};
