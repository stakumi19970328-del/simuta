# GitHub Pages の設定手順（できないときの確認用）

## 前提：まずコードをプッシュする

**リポジトリが空（ファイルが一つもない）だと、Pages の項目が表示されないことがあります。**

先に SSH でプッシュを完了してください。

```bash
cd /home/airlink/デスクトップ/simuta
git add .
git commit -m "ピラティススタジオ サイト"
git push -u origin main
```

---

## 手順 1：リポジトリのページを開く

1. ブラウザで **https://github.com** にログイン
2. 右上のアイコンをクリック → **Your repositories**
3. **simuta** をクリック  
   → または直接 **https://github.com/stakumi19970328-del/simuta** を開く

---

## 手順 2：Settings を開く

- リポジトリの**上側のタブ**（Code / Issues / Pull requests …）の並びの**右端**に **Settings** があります
- **Settings** をクリック

※ 自分のリポジトリでないと Settings は見えません。stakumi19970328-del でログインした状態で simuta を開いているか確認してください。

---

## 手順 3：Pages の項目を探す

- Settings を開いたあと、**左側のメニュー**（サイドバー）を見る
- 一覧のなかから **「Pages」** をクリック

※ 左メニューが長い場合は、下にスクロールすると **Pages** が出てくることがあります。

---

## 手順 4：Branch で main を選ぶ

1. **Build and deployment** のところで
2. **Source** の右の「None」や「GitHub Actions」と書いてある部分をクリック
3. 一覧から **「Deploy from a branch」** を選ぶ
4. **Branch** の右のドロップダウンをクリック
5. **main** を選ぶ
6. 右のフォルダは **/ (root)** のまま
7. **Save** をクリック

---

## それでもできないときの確認

| 確認すること | 対処 |
|-------------|------|
| Settings が表示されない | リポジトリのオーナー（stakumi19970328-del）でログインしているか確認する |
| 左に Pages がない | 左メニューを下までスクロールして **Pages** を探す |
| Source で「Deploy from a branch」が出ない | 一度ページを再読み込み（F5）してからもう一度開く |
| main を選んでもエラーになる | 先に `git push` で main ブランチにコードを送る |
| 保存後も 404 になる | 5 分ほど待ってから、もう一度 **https://stakumi19970328-del.github.io/simuta/** を開く |

---

## 設定が終わったら

数分後、次の URL でサイトが表示されます。

**https://stakumi19970328-del.github.io/simuta/**

※ 末尾の **/simuta/** を忘れずに。
