/**
 * Supabase 連携用の設定
 * ① このファイルをコピーして「config.js」という名前で保存する
 * ② 下の【ここに貼り付け】の部分に、Supabase でコピーした値を貼り付ける
 * ※ config.js は .gitignore に入っているので、Git にプッシュされません。
 */

// ↓↓↓ 貼り付け場所 1：Project URL（Supabase → Project Settings → API でコピー）
//     例：https://abcdefghijk.supabase.co
var SUPABASE_URL = '【ここにProject_URLを貼り付け】';

// ↓↓↓ 貼り付け場所 2：anon キー（Project Settings → API → anon の Reveal で表示したキー）
//     ※ service_role ではなく anon を使うこと
var SUPABASE_ANON_KEY = '【ここにanonキーを貼り付け】';

// ↓↓↓ オプション：予約が入ったらメールを受け取る（Formspree を使う場合）
//     https://formspree.io でフォームを作り、表示された URL を貼り付ける
//     例：'https://formspree.io/f/xxxxxxxx'
var FORMSPREE_ENDPOINT = '';
