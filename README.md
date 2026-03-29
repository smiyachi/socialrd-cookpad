# ソーシャルR&D Cookpad — パターン・カード

「眠ってるなんでもないものを起こす同盟」のパターン・ランゲージ。
Open Book of Social Innovationから350パターンを抽出・精錬。

## ファイル構成

```
index.html    ── 閲覧用UI（触らなくてOK）
patterns.json ── パターンデータ（ここを編集する）
README.md     ── このファイル
```

## パターンの編集方法

`patterns.json` をGitHubのWeb画面で直接編集できます。

### 各フィールドの意味

| フィールド | 内容 |
|---|---|
| `id` | パターン番号（変えない） |
| `layer` | `proc`/`conn`/`supp` |
| `stage` | 1〜6（procのみ） |
| `sub` | サブカテゴリ |
| `name` | パターン名（日本語） |
| `en` | 英語名 |
| `src` | Open Book原典番号 |
| `context` | 状況 |
| `problem` | 問題（力の対立） |
| `solution` | 解決 |
| `examples` | 事例（配列） |
| `alliance` | 同盟の文脈 |
| `notes` | **メモ・追記（自由に編集）** |

### 新しいパターンを追加する

`patterns.json` の末尾に以下の形式で追加：

```json
{
  "id": 351,
  "layer": "proc",
  "stage": 3,
  "sub": null,
  "name": "パターン名",
  "en": "Pattern Name",
  "src": "独自",
  "context": "状況の説明",
  "problem": "問題・力の対立",
  "solution": "解決策",
  "examples": ["事例1", "事例2"],
  "alliance": "同盟の文脈",
  "notes": ""
}
```

## デプロイ

Netlify → GitHubリポジトリを連携するだけで自動デプロイされます。
