# ピラティススタジオ

ピラティススタジオのホームページと予約システムです。

## Cursor を日本語表示にする

次の設定をしています。

- **全体（Cursor の表示言語）:** ユーザー設定に `"locale": "ja"` を追加済み
- **このプロジェクト:** `.vscode/settings.json` で `"locale": "ja"` を指定

**まだメニューが英語のとき:**

1. **Ctrl+Shift+X**（Mac は **Cmd+Shift+X**）で拡張機能を開く
2. 「Japanese」で検索
3. **Japanese Language Pack for Visual Studio Code** をインストール
4. Cursor を**再起動**する
5. 再起動後、表示言語の選択で **日本語（ja）** を選ぶ

## 構成

- **index.html** … トップページ
- **booking.html** … レッスン予約フォーム
- **admin.html** … 予約一覧（管理用）
- **server.js** … 予約API・静的ファイル配信

## 予約システムの使い方

### 1. サーバーを起動する

```bash
cd /home/airlink/デスクトップ/simuta
npm install
npm start
```

### 2. ブラウザで開く

- トップ: http://localhost:3000/index.html
- 予約: http://localhost:3000/booking.html
- 予約一覧（管理）: http://localhost:3000/admin.html

### 3. 予約の流れ

1. お客様が「予約」ページでクラス・日付・時間・氏名・連絡先を入力して送信
2. 予約は `data/bookings.json` に保存されます
3. 管理者は `admin.html` で予約一覧を確認できます

**注意:** 予約フォームを動かすには、必ず上記の手順でサーバーを起動してください。`index.html` を直接開くだけでは予約送信はできません。

## サーバーなしで確認する場合

トップページと予約ページのデザインだけ見る場合は、`index.html` や `booking.html` をブラウザで直接開いても表示されます。その場合、予約の「送信」は失敗します。

---

## GitHub との連携

**リモートはすでに設定済みです:** [stakumi19970328-del/simuta](https://github.com/stakumi19970328-del/simuta)

### 1. GitHub でリポジトリを作る（まだの場合）

1. [GitHub](https://github.com) で **stakumi19970328-del** でログイン
2. 右上の **+** → **新しいリポジトリ**
3. リポジトリ名に **simuta** と入力
4. **リポジトリを作成** をクリック（README の追加は不要）

### 2. プッシュする

リポジトリ作成後、ターミナルで実行します。

```bash
cd /home/airlink/デスクトップ/simuta
git push -u origin main
```

認証を求められたら:

- **HTTPS の場合:** GitHub のユーザー名と、パスワードの代わりに **個人用アクセストークン** を入力  
  （[設定 → 開発者向け設定 → 個人用アクセストークン](https://github.com/settings/tokens) で発行）
- **SSH を使う場合:** リモートを SSH に切り替えてからプッシュ  
  ```bash
  git remote set-url origin git@github.com:stakumi19970328-del/simuta.git
  git push -u origin main
  ```

### 3. 今後の更新をプッシュする

```bash
git add .
git commit -m "変更内容のメッセージ"
git push
```

### Git の名前・メールを設定する（初回のみ推奨）

コミットに正しい名前とメールを出したい場合:

```bash
git config --global user.name "あなたの名前"
git config --global user.email "あなたのGitHub用メール"
```
