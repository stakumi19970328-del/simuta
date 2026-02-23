# Vercel で本番を動かす手順（Supabase・メールまで）

Vercel にデプロイしたサイト（https://simuta.vercel.app）で、**予約が Supabase に保存され**、**予約が入ったらメールが届く**ようにする手順です。

---

## やることの流れ（2つだけ）

1. **Vercel の「環境変数」に、Supabase と Formspree の値を登録する**  
2. **もう一度デプロイする**（再デプロイで設定が反映されます）

---

## ステップ 1：Vercel に環境変数を登録する

### 1-1. Vercel のダッシュボードを開く

1. ブラウザで **https://vercel.com** を開く  
2. ログインする  
3. **simuta** プロジェクトをクリックして開く  

### 1-2. 環境変数の画面を開く

1. 画面上方の **「Settings」**（設定）をクリック  
2. 左のメニューで **「Environment Variables」**（環境変数）をクリック  

### 1-3. 次の 3 つを 1 つずつ追加する

**追加のしかた**  
- **Name**（名前）に下の「変数名」をそのまま入力  
- **Value**（値）に、下の「入れる値」を貼り付ける  
- **Environment** は **Production**（と Preview / Development があればそれも）にチェックを入れる  
- **「Save」** をクリック  

| 変数名 (Name) | 入れる値 (Value) | どこで取るか |
|----------------|------------------|--------------|
| **SUPABASE_URL** | `https://xxxxx.supabase.co` | Supabase → Project Settings → API → **Project URL** をコピー |
| **SUPABASE_ANON_KEY** | 長い文字列（JWT） | Supabase → Project Settings → API → **anon** の **Reveal** で表示したキーをコピー |
| **FORMSPREE_ENDPOINT** | `https://formspree.io/f/xxxxxxxx` | Formspree → フォームの **Integration** で表示された URL をコピー（メール不要なら空でOK） |

**注意**

- **SUPABASE_ANON_KEY** は **anon** のキーだけにしてください。**service_role** は使わないでください。  
- **FORMSPREE_ENDPOINT** は、メール通知がいらない場合は **空のまま** にしても動きます（そのときはメールは送られません）。  

### 1-4. 3 つとも登録できたか確認する

Environment Variables の一覧に、**SUPABASE_URL**・**SUPABASE_ANON_KEY**・**FORMSPREE_ENDPOINT** の 3 つが並んでいればOKです。

---

## ステップ 2：再デプロイする

環境変数を追加・変更したあとは、**もう一度デプロイ**しないと反映されません。

### やり方（どちらか一方でOK）

**方法 A：Vercel の画面から**

1. プロジェクトの **「Deployments」**（デプロイments）タブを開く  
2. いちばん上にあるデプロイの右側の **「⋯」**（メニュー）をクリック  
3. **「Redeploy」**（再デプロイ）を選ぶ  
4. 確認画面で **「Redeploy」** をクリック  

**方法 B：Git から（Git 連携している場合）**

1. プロジェクトのコードで何か 1 行だけ変更して保存（例：README にスペースを 1 つ追加）  
2. その変更を **commit** して **push** する  
3. Vercel が自動で再デプロイします  

---

## どういう動きになるか

- デプロイのとき、Vercel が **`npm run build`** を実行します。  
- その中で **環境変数**（SUPABASE_URL など）を使って **config.js** が自動で作られます。  
- 本番のサイト（https://simuta.vercel.app）では、その **config.js** が読み込まれるので、  
  - 予約が **Supabase** に保存され、  
  - **FORMSPREE_ENDPOINT** を入れていれば、**Formspree** 経由でメールが届きます。  

---

## うまくいかないとき

- **予約が保存されない**  
  - Vercel の **SUPABASE_URL** と **SUPABASE_ANON_KEY** が、Supabase の画面でコピーしたものと**完全に同じ**か確認する。  
  - 再デプロイしたか確認する。  

- **メールが届かない**  
  - **FORMSPREE_ENDPOINT** に Formspree の URL（`https://formspree.io/f/xxxxxxxx`）が入っているか確認する。  
  - 迷惑メールフォルダも確認する。  

- **「config.js が読めない」などのエラー**  
  - 再デプロイして、ビルドが成功しているか（Deployments のログで「Build Completed」など）を確認する。  

---

## まとめ

1. **Vercel** → **Settings** → **Environment Variables** で、**SUPABASE_URL**・**SUPABASE_ANON_KEY**・**FORMSPREE_ENDPOINT** を登録する。  
2. **Redeploy** する。  
3. 本番の **https://simuta.vercel.app/booking.html** で予約を送って、Supabase の Table Editor とメールを確認する。  

これで、本番（Vercel）でも Supabase とメールまで動く状態になります。
