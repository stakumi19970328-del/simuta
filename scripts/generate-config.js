/**
 * Vercel ビルド時に環境変数から config.js を生成する
 * 本番では config.js が Git に含まれないため、デプロイ時にこのスクリプトで作成する
 */
const fs = require('fs');
const path = require('path');

function escapeForJs(str) {
  if (str == null || str === '') return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}

const SUPABASE_URL = escapeForJs(process.env.SUPABASE_URL || '');
const SUPABASE_ANON_KEY = escapeForJs(process.env.SUPABASE_ANON_KEY || '');
const FORMSPREE_ENDPOINT = escapeForJs(process.env.FORMSPREE_ENDPOINT || '');

const content = `/**
 * Supabase / Formspree 設定（Vercel ビルド時に自動生成）
 */
var SUPABASE_URL = '${SUPABASE_URL}';
var SUPABASE_ANON_KEY = '${SUPABASE_ANON_KEY}';
var FORMSPREE_ENDPOINT = '${FORMSPREE_ENDPOINT}';
`;

const outPath = path.join(__dirname, '..', 'config.js');
fs.writeFileSync(outPath, content, 'utf8');
console.log('Generated config.js from environment variables.');
