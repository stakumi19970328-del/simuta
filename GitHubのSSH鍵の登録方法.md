# GitHub に SSH 鍵を登録する（承認番号なしでプッシュする）

トークンや承認番号が届かなくても、**SSH 鍵**を 1 回だけ登録すれば、今後は `git push` だけでプッシュできます。

---

## 1. 次の「公開鍵」をコピーする

下の 1 行を**すべて**コピーしてください（最初の `ssh-ed25519` から最後まで）。

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICJALuZligBijJbFZUZPvL00FtssvjLJfp9fizK6crFT simuta-github
```

---

## 2. GitHub に登録する

1. ブラウザで **https://github.com/settings/keys** を開く  
2. **「New SSH key」**（新しい SSH 鍵）をクリック  
3. **Title（タイトル）:** 例）`simuta用` と入力  
4. **Key（鍵）：** 上でコピーした 1 行をそのまま貼り付ける  
5. **「Add SSH key」** をクリック  

※ ここでは**承認番号やメールのコードは不要**です。貼り付けて保存するだけです。

---

## 3. プッシュする

ターミナルで次を実行する。

```bash
cd /home/airlink/デスクトップ/simuta
git add .
git commit -m "ピラティススタジオ サイト一式"
git push -u origin main
```

初回だけ「このホストを信頼しますか？」と出たら **yes** と入力して Enter。  
その後は**トークンも承認番号も入力せず**にプッシュできます。
