// netlify/functions/logOperation.js
const { createClient } = require('@netlify/kv');

const kv = createClient();

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { username = 'Unknown', coins = 0 } = data;

    const log = {
      username,
      coins: Number(coins),
      timestamp: Date.now()
    };

    // مفتاح فريد لكل عملية
    const key = `op:${log.timestamp}:${Math.floor(Math.random() * 100000)}`;

    // خزّن في KV
    await kv.set(key, JSON.stringify(log));

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, key, log })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: e.message })
    };
  }
};
