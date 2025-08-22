const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  const filePath = path.join(__dirname, 'operations.json');

  let operations = [];

  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      operations = JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading JSON:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to read operations' })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ operations })
  };
};
