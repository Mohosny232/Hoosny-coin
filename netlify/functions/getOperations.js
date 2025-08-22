import { KV } from '@netlify/kv';

export async function handler(event) {
  const kv = new KV({ namespace: 'OPERATIONS_KV' });

  try {
    const username = event.queryStringParameters?.username;

    if (username) {
      const operations = await kv.get(`user:${username}`) || [];
      return { statusCode: 200, body: JSON.stringify({ operations }) };
    }

    // بدون username ترجع كل العمليات
    const allOps = await kv.get('all') || [];
    return { statusCode: 200, body: JSON.stringify({ operations: allOps }) };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
