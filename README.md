# 🚀 Next.js + TypeScript テンプレート

このテンプレートは、Next.js アプリ開発を効率化するために構成されたベースプロジェクトです。以下の機能を備えており、個人開発・チーム開発・高速な新規事業立ち上げに最適です。

---

## ✅ 含まれているもの

| 機能              | 内容                                 |
| ----------------- | ------------------------------------ |
| ✅ Next.js        | 最新の Next.js アプリケーション構成  |
| ✅ TypeScript     | 型安全な開発を実現                   |
| ✅ ESLint         | コード品質チェック（自動修正あり）   |
| ✅ Prettier       | コード整形ルールの統一               |
| ✅ Husky          | Git フックでコミット前に自動チェック |
| ✅ lint-staged    | ステージされたファイルのみ整形       |
| ✅ yarn           | パッケージマネージャ（v1）           |
| ✅ GitHub Actions | Lint + Build チェックのCI自動化      |

---

## 🛠️ 使い方

### ① このテンプレートから新規作成

GitHub 上で「**Use this template**」ボタンをクリックし、新しいリポジトリを作成してください。

---

### ② 初期セットアップ（手動で）

```bash
git clone https://github.com/your-org/your-new-project.git
cd your-new-project
rm -rf .git
git init
git remote add origin https://github.com/your-org/your-new-project.git
yarn install
yarn husky install
```
