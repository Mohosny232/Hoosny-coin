import { kv } from '@netlify/kv';

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const logs = await kv.get("operations") || [];
    return { statusCode: 200, body: JSON.stringify({ operations: logs }) };
  } catch (err) {
    return { statusCode: 500, body: "Server Error" };
  }
}
