# COLADOKI

COLADOKIは、既存のJAGスロットをベースに新しい機種を開発するためのリポジトリです。

## 現在の状態

- ベース: [`ntriziinfo/jag`](https://github.com/ntriziinfo/jag) の `eed400f5b3df6732732a6af4c54b28511e3fcfac`
- メイン画面: `/coladoki` または `/coladoki.html`
- 管理画面: `/admin.html`
- プレイ入口: `/play.html?machine=1`
- 台選び: `/machines.html`
- 対応台番号: `machine=1` から `machine=6`

初期移植では、抽選・リール・ボーナス・管理APIの挙動を維持しながら、公開ルート、画面名、ブラウザ保存領域、iframe連携をCOLADOKI用に分離しています。旧 `/jag` ルートは互換用に `/coladoki` へ転送します。

## ローカル起動

Node.js 20を使用します。

```bash
npm run check
npm run dev
```

起動後に `http://127.0.0.1:8787/coladoki` を開きます。Windowsでは `start-coladoki.cmd` も使用できます。

## Git LFS

画像・音源・動画（PNG、JPG/JPEG、WebP、WAV、MP3、MP4）はGit LFSで管理しています。初めて作業する環境では、リポジトリを取得する前後にGit LFSを有効にしてください。

```bash
git lfs install
git lfs pull
```

通常の `git clone` / `git pull` ではLFS素材も自動取得されます。素材がポインターファイルのままになった場合は `git lfs pull` を実行してください。

## 次の開発項目

1. COLADOKIのテーマ、筐体、ロゴ、演出方針を決める
2. JAG由来の画像・音源・ガイド素材をCOLADOKI専用素材へ差し替える
3. 役構成、配当、設定差、ボーナス確率を仕様化して実装する
4. 通常時・ボーナス・管理画面・6台運用を通しで検証する

内部のCSSクラス名と素材ファイル名には、動作互換を優先して `jag` / `rising` が残っています。専用素材へ差し替える段階で整理してください。

## 運用

Vercel、Supabase、管理APIの設定は [OPERATIONS_README.md](./OPERATIONS_README.md) を参照してください。

画像・音源を含む素材は、このプロジェクト内の開発用途として取り扱います。元リポジトリにライセンスファイルは含まれていないため、第三者への再配布条件は権利者が別途明記してください。
