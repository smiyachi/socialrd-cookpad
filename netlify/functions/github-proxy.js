// netlify/functions/github-proxy.js
// GitHub API へのプロキシ。トークンは環境変数 GITHUB_TOKEN に格納。

const REPO = "smiyachi/socialrd-cookpad";
const ALLOWED_FILES = ["patterns.json", "cross-border-patterns.json", "new-patterns.json"];

exports.handler = async (event) => {
  // CORS ヘッダー
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // プリフライトリクエスト
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  const TOKEN = process.env.GITHUB_TOKEN;
  if (!TOKEN) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "GITHUB_TOKEN が設定されていません" }) };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { action, filename, payload } = body;

    // ファイル名の安全チェック
    if (!ALLOWED_FILES.includes(filename)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "不正なファイル名です" }) };
    }

    const apiUrl = `https://api.github.com/repos/${REPO}/contents/${filename}`;
    const ghHeaders = {
      Authorization: `token ${TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };

    // ===== GET: ファイル取得 =====
    if (action === "get") {
      const r = await fetch(apiUrl, { headers: ghHeaders });
      const data = await r.json();
      if (!r.ok) return { statusCode: r.status, headers, body: JSON.stringify({ error: data.message }) };
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

    // ===== PUT: ファイル更新 =====
    if (action === "put") {
      const { message, content, sha } = payload;
      const putBody = { message, content };
      if (sha) putBody.sha = sha;

      const r = await fetch(apiUrl, {
        method: "PUT",
        headers: ghHeaders,
        body: JSON.stringify(putBody),
      });
      const data = await r.json();
      if (!r.ok) return { statusCode: r.status, headers, body: JSON.stringify({ error: data.message }) };
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    return { statusCode: 400, headers, body: JSON.stringify({ error: "不明なアクション" }) };

  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
