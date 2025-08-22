import { kv } from '@netlify/kv';

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { username, coins } = JSON.parse(event.body);
    const timestamp = new Date().toISOString();

    // جلب السجل الحالي
    let logs = await kv.get("operations") || [];
    logs.push({ username, coins, timestamp });

    // حفظ السجل في KV
    await kv.set("operations", logs);

    return { statusCode: 200, body: JSON.stringify({ success: true, logs }) };
  } catch (err) {
    return { statusCode: 500, body: "Server Error" };
  }
}
