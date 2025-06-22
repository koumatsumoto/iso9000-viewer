# ISO9000 Viewer

## プロジェクト説明

ISO9000 (JISQ9000) 品質マネジメントシステム規格を Web 上で読みやすく表示するサイト。GitHub Pages で構築し、規格文書を構造化して閲覧・検索できます。個人的な学習・参照用。

## サイト URL

https://koumatsumoto.github.io/iso9000-viewer/

## セットアップ

### 前提条件

- Node.js (推奨: v18 以上)
- npm

### インストール

```shellscript
npm install
```

### 開発サーバーの起動

```shellscript
npm run dev
```

## プロダクションビルド

```shellscript
npm run build
```

### ローカルでプレビュー

```shellscript
npm run preview
```

## CI/CD

このプロジェクトは GitHub Actions を使用して GitHub Pages に自動デプロイされます。

- `main` ブランチへのプッシュで自動的にビルド・デプロイが実行されます
- GitHub Pages の設定でソースを「GitHub Actions」に設定してください

## 技術スタック

- [Remix](https://remix.run/) (SPA Mode)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- TypeScript
