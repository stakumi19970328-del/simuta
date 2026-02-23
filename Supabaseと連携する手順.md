# Supabase（スパベース）と連携する手順

**Supabase とは？**  
データベースや会員認証などを、自分でサーバーを用意しなくても使える「クラウドの仕組み」です。  
このサイトでは、**予約内容を Supabase のデータベースに保存**するために使います。

---

## ステップ 1：Supabase のアカウントを作る

1. ブラウザで **https://supabase.com** を開く  
2. 右上の **「Start your project」** をクリック  
3. **GitHub でログイン**する（またはメールで登録）  
4. ログインしたら **「New project」**（新規プロジェクト）をクリック  

---

## ステップ 2：プロジェクトを作る

1. **Organization**（組織）  
   - すでにある場合はそのまま  
   - ない場合は **「New organization」** で名前を入れて作成  

2. **Name**（プロジェクト名）  
   - 例：`pilates-studio` または `simuta`  

3. **Database Password**（データベースのパスワード）  
   - 自分で決めたパスワードを入力（**必ずメモする**）  

4. **Region**（リージョン）  
   - 日本なら **Northeast Asia (Tokyo)** を選ぶ  

5. 下までスクロールして **「Create new project」** をクリック  
6. 1〜2 分待つ（「Setting up your project」と表示されます）  

---

## ステップ 3：予約用のテーブルを作る

**テーブル** = データを入れておく「表」のことです。  
予約の「クラス名・日付・時間・お名前・電話・メール・備考」を 1 行ずつ保存する表を作ります。

---

### 「テーブルを更新」画面の各項目（何を記入するか）

| 項目 | 何をするか |
|------|------------|
| **名前** | そのまま **`bookings`** で OK（すでに入っていれば触らなくてよい） |
| **説明** | **オプション**なので空欄でよい。入れるなら「予約データ」など |
| **行レベルセキュリティ（RLS）を有効にする** | **チェックを入れる**（推奨）。入れると、あとで「ポリシー」を 1 つ作る必要があります（下の 3-4 で説明） |
| **リアルタイムを有効にする** | 予約一覧をリアルタイムで見ないなら **オフのままでよい**（チェックなし） |
| **列** | ここに **id** と **created_at** があれば OK。あとは **「列を追加」** で class_type, date, time, name, phone, email, memo を追加（下の 3-2 のとおり） |
| **外部キー** | **何も追加しなくてよい**。この予約テーブルでは使いません |

---

### 3-1. テーブルを作り始める

1. 画面**左側のメニュー**で **「Table Editor」**（テーブルエディタ）をクリック  
2. **「New table」**（新規テーブル）のボタンをクリック  
3. 出てきた画面の **「Name」**（名前）の欄に、半角で **`bookings`** と入力する  
   - この名前の「表」が 1 つできる、という意味です  

※ すでに **「id」** という列が 1 つある状態になっています。**そのまま触らなくて大丈夫**です。

---

### 3-2. 列（カラム）を 1 本ずつ追加する

表には「列」が必要です。  
**「Add column」**（列を追加）を押して、下の 8 本の列を **1 本ずつ** 追加します。

**用語の意味**
- **Name** … 列の名前（英数字で入力）
- **Type** … 入れるデータの種類。「text」= 文字、「timestamptz」= 日時
- **Nullable** … 「空欄でもよい」にチェックを入れると ✅、外すと「必ず入力」になります

---

#### ① class_type（どのクラスか）

1. **「Add column」** をクリック  
2. **Name** に **`class_type`** と入力  
3. **Type** で **「text」** を選ぶ（プルダウンから選ぶ）  
4. **Nullable** のチェックを **外す**（空欄にしない）  
5. **「Save」** をクリック  

---

#### ② date（希望日）

1. もう一度 **「Add column」** をクリック  
2. **Name** に **`date`** と入力  
3. **Type** は **「text」**  
4. **Nullable** のチェックを **外す**  
5. **「Save」**  

---

#### ③ time（希望時間）

1. **「Add column」** をクリック  
2. **Name** に **`time`** と入力  
3. **Type** は **「text」**  
4. **Nullable** のチェックを **外す**  
5. **「Save」**  

---

#### ④ name（お名前）

1. **「Add column」** をクリック  
2. **Name** に **`name`** と入力  
3. **Type** は **「text」**  
4. **Nullable** のチェックを **外す**  
5. **「Save」**  

---

#### ⑤ phone（電話番号）

1. **「Add column」** をクリック  
2. **Name** に **`phone`** と入力  
3. **Type** は **「text」**  
4. **Nullable** のチェックを **外す**  
5. **「Save」**  

---

#### ⑥ email（メールアドレス）

1. **「Add column」** をクリック  
2. **Name** に **`email`** と入力  
3. **Type** は **「text」**  
4. **Nullable** のチェックを **外す**  
5. **「Save」**  

---

#### ⑦ memo（備考・ご要望）

1. **「Add column」** をクリック  
2. **Name** に **`memo`** と入力  
3. **Type** は **「text」**  
4. **Nullable** のチェックは **付けたまま**（備考は空でもよい）  
5. **「Save」**  

---

#### ⑧ created_at（予約が登録された日時）

1. **「Add column」** をクリック  
2. **Name** に **`created_at`** と入力  
3. **Type** で **「timestamptz」** を選ぶ（text ではないので注意）  
4. **Nullable** はどちらでもよい（推奨：チェックを外す）  
5. **「Default value」**（デフォルト値）の欄に **`now()`** と入力する  
   - こうすると「行が追加された瞬間の日時」が自動で入ります  
6. **「Save」**  

---

### 3-3. テーブル全体を保存する

8 本の列を全部追加したら、画面の **「Save」** をもう一度押して、テーブル全体を確定させます。

**できあがりのイメージ**

| 列の名前 (Name) | 意味           | 型 (Type)   | Nullable |
|-----------------|----------------|------------|----------|
| id              | 通し番号（最初からある） | 自動        | —        |
| class_type      | どのクラスか   | text       | なし     |
| date            | 希望日         | text       | なし     |
| time            | 希望時間       | text       | なし     |
| name            | お名前         | text       | なし     |
| phone           | 電話番号       | text       | なし     |
| email           | メール         | text       | なし     |
| memo            | 備考           | text       | あり     |
| created_at      | 登録日時       | timestamptz| なし（初期値 now()） |

---

### 3-4. RLS を有効にした場合：ポリシーを追加する

**「データを照会するにはポリシーが必要です」** と出ている場合、このままではサイトから予約を保存できません。  
**ポリシー**（誰がどの操作をできるかのルール）を 2 つ追加します。

1. 左メニューで **「Table Editor」** を開き、**「bookings」** テーブルをクリック  
2. テーブル名の下などにある **「Policies」**（ポリシー）タブをクリック  
3. **「New policy」**（新規ポリシー）をクリック  
4. **1 つ目のポリシー（予約の「追加」を許可）**  
   - テンプレートから **「Enable insert access for all users」** または「すべてのユーザーに insert を許可」に近いものを選ぶ  
   - ポリシー名は例：`allow insert`  
   - **Save** で保存  
5. もう一度 **「New policy」** をクリック  
6. **2 つ目のポリシー（予約の「読み取り」を許可）**  
   - **「Enable read access for all users」** または「すべてのユーザーに select を許可」に近いものを選ぶ  
   - ポリシー名は例：`allow select`  
   - **Save** で保存  

**SQL でまとめて実行する方法（上記でポリシーが作れない場合）**

1. 左メニューで **「SQL Editor」** を開く  
2. 次の SQL を貼り付けて **「Run」** を実行する  

```sql
-- 誰でも予約の追加（INSERT）をできるようにする
CREATE POLICY "allow insert" ON public.bookings
  FOR INSERT TO anon WITH CHECK (true);

-- 誰でも予約の読み取り（SELECT）をできるようにする
CREATE POLICY "allow select" ON public.bookings
  FOR SELECT TO anon USING (true);
```

これで、サイトから予約を送信でき、Table Editor でもデータを確認できます。

---

## ステップ 4：URL とキーをコピーする

1. 左のメニューで **「Project Settings」**（歯車マーク）をクリック  
2. 左で **「API」** をクリック  
3. 次の 2 つをコピーして、メモ帳に貼り付けておく  

   - **Project URL**（プロジェクトの URL）  
   - **anon public**（匿名用のキー）  
     - 「Project API keys」のところにある **anon** の **「Reveal」** を押すと表示されます  

---

## ステップ 5：サイトと連携する（ここで「連携」が完了）

1. プロジェクトの **`config.example.js`** をコピーして、**`config.js`** という名前で同じフォルダに保存する  
2. **`config.js`** を開き、メモした **Project URL** を `SUPABASE_URL` の `''` の間に貼り付ける  
3. 同じく **anon のキー** を `SUPABASE_ANON_KEY` の `''` の間に貼り付ける  
4. ファイルを保存して、予約ページ（`booking.html`）から 1 件送信してみる  
5. Supabase の **「Table Editor」** で **`bookings`** を開き、行が 1 件増えていれば **連携できています**  

※ **config.js** は Git に含めない設定（`.gitignore`）になっているため、キーを GitHub などに上げても漏れません。  

---

## 用語の和訳（参考）

| 英語 | 和訳 |
|------|------|
| Start your project | プロジェクトを始める |
| New project | 新規プロジェクト |
| Organization | 組織 |
| Database Password | データベースのパスワード |
| Region | リージョン（サーバーの場所） |
| Create new project | 新規プロジェクトを作成 |
| Table Editor | テーブルエディタ（表の編集画面） |
| New table | 新規テーブル（新規の表） |
| Project Settings | プロジェクト設定 |
| API | API（プログラムから使うための入口） |
| anon public | 匿名用の公開キー |

---

## 困ったとき

- **「Table Editor」がわからない**  
  → 左メニューの **「Table Editor」** をクリックすると、データの一覧・編集画面が出ます。  

- **「New table」や「Add column」がどこかわからない**  
  → Table Editor を開いたあと、画面の **「New table」** で表を作り始めます。表の名前（bookings）を入れたあと、**「Columns」** のところに **「Add column」** ボタンがあります。  

- **Type で「text」や「timestamptz」が選べない**  
  → Type の欄はプルダウン（▼）になっています。クリックして一覧を開き、**text** または **timestamptz** を選びます。  

- **Default value はどこに入れる？**  
  → `created_at` の列を追加するときだけ使います。列の編集画面に **「Default value」** という入力欄があるので、そこに **`now()`** と半角で入れます。  

- **キーがどこかわからない**  
  → **Project Settings** → **API** のページの **「Project API keys」** の **anon** の右にある **「Reveal」** を押すと表示されます。  

- **予約が保存されない**  
  → `config.js` の URL と anon キーが、Supabase の画面でコピーしたものと**完全に同じ**か確認してください。前後にスペースが入っていないかもチェックしてください。
