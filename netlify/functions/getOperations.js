// netlify/functions/getOperations.js
const { createClient } = require('@netlify/kv');

const kv = createClient();

exports.handler = async () => {
  try {
    const ops = [];

    // نجيب كل المفاتيح اللي بالبريفكس op:
    const iter = await kv.list({ prefix: 'op:' });

    // iter ممكن يكون AsyncIterator
    for await (const item of iter) {
      const val = await kv.get(item.key);
      if (val) ops.push(JSON.parse(val));
    }

    // رتب من الأحدث للأقدم
    ops.sort((a, b) => b.timestamp - a.timestamp);

    return {
      statusCode: 200,
      body: JSON.stringify({ operations: ops })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
