import { KV } from '@netlify/kv';

export async function handler(event) {
  const kv = new KV({ namespace: 'OPERATIONS_KV' });

  try {
    const { username, coins } = JSON.parse(event.body);

    if (!username || !coins) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing data' }) };
    }

    const timestamp = Date.now();

    // جلب السجلات الحالية للمستخدم
    const key = `user:${username}`;
    let operations = await kv.get(key) || [];
    
    operations.push({ username, coins, timestamp });

    // تخزين السجلات المحدثة
    await kv.set(key, operations);

    // خيار: تخزين كل العمليات في مفتاح عام إذا تحب تعرض كل العمليات للجميع
    let allOps = await kv.get('all') || [];
    allOps.push({ username, coins, timestamp });
    await kv.set('all', allOps);

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
