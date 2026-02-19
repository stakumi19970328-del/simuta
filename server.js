const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const BOOKINGS_FILE = path.join(__dirname, 'data', 'bookings.json');

app.use(express.json());
app.use(express.static(__dirname));

function ensureDataDir() {
  const dir = path.join(__dirname, 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

function readBookings() {
  ensureDataDir();
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function writeBookings(list) {
  ensureDataDir();
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(list, null, 2), 'utf8');
}

// 予約一覧取得（管理用）
app.get('/api/bookings', (req, res) => {
  const list = readBookings();
  res.json(list);
});

// 予約登録
app.post('/api/bookings', (req, res) => {
  const body = req.body;
  if (!body.classType || !body.date || !body.time || !body.name || !body.phone || !body.email) {
    return res.status(400).json({ error: '必須項目が不足しています' });
  }
  const list = readBookings();
  const booking = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    ...body,
    createdAt: new Date().toISOString()
  };
  list.push(booking);
  writeBookings(list);
  res.status(201).json({ ok: true, id: booking.id });
});

app.listen(PORT, () => {
  console.log('ピラティススタジオ サーバー: http://localhost:' + PORT);
  console.log('  - トップ: http://localhost:' + PORT + '/index.html');
  console.log('  - 予約: http://localhost:' + PORT + '/booking.html');
});
