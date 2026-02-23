(function () {
  'use strict';

  var form = document.getElementById('booking-form');
  var dateInput = document.getElementById('date');
  var timeInput = document.getElementById('time');
  var timeSlotsEl = document.getElementById('timeSlots');
  var resultEl = document.getElementById('booking-result');
  var errorEl = document.getElementById('booking-error');
  var submitBtn = document.getElementById('submitBtn');

  // 予約可能時間（10:00〜20:00、1時間刻み）
  var SLOT_START = 10;
  var SLOT_END = 20;

  // 今日以降の日付のみ選択可能
  function setMinDate() {
    var today = new Date();
    var y = today.getFullYear();
    var m = String(today.getMonth() + 1).padStart(2, '0');
    var d = String(today.getDate()).padStart(2, '0');
    dateInput.setAttribute('min', y + '-' + m + '-' + d);
  }

  function renderTimeSlots() {
    timeSlotsEl.innerHTML = '';
    timeInput.value = '';
    for (var h = SLOT_START; h < SLOT_END; h++) {
      var label = (h < 10 ? '0' : '') + h + ':00';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'time-slot';
      btn.textContent = label;
      btn.dataset.time = label;
      btn.addEventListener('click', function () {
        timeSlotsEl.querySelectorAll('.time-slot').forEach(function (b) { b.classList.remove('selected'); });
        this.classList.add('selected');
        timeInput.value = this.dataset.time;
      });
      timeSlotsEl.appendChild(btn);
    }
  }

  function getApiBase() {
    return '';
  }

  /** config.js で FORMSPREE_ENDPOINT が設定されていれば、予約内容をメール送信 */
  function sendBookingEmailIfConfigured(payload) {
    var endpoint = typeof window.FORMSPREE_ENDPOINT === 'string' ? window.FORMSPREE_ENDPOINT.trim() : '';
    if (!endpoint) return;
    var body = JSON.stringify({
      _subject: '【予約】ピラティススタジオ',
      classType: payload.classType,
      date: payload.date,
      time: payload.time,
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      memo: payload.memo || '(なし)'
    });
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: body
    }).catch(function () { /* メール失敗しても予約は成功扱い */ });
  }

  /** Supabase に予約を保存する（config.js で URL とキーが設定されている場合） */
  function sendViaSupabase(payload, onSuccess, onError) {
    if (typeof window.SUPABASE_URL !== 'string' || !window.SUPABASE_URL ||
        typeof window.SUPABASE_ANON_KEY !== 'string' || !window.SUPABASE_ANON_KEY) {
      onError('config.js の URL またはキーが設定されていません。');
      return;
    }
    if (typeof window.supabase === 'undefined') {
      onError('Supabase の読み込みに失敗しました。');
      return;
    }
    var client = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    var row = {
      class_type: payload.classType,
      date: payload.date,
      time: payload.time,
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      memo: payload.memo || null
    };
    client.from('bookings').insert(row).then(function (result) {
      if (result.error) {
        onError(result.error.message);
        return;
      }
      sendBookingEmailIfConfigured(payload);
      onSuccess();
    }).catch(function (err) {
      onError(err && err.message ? err.message : '接続エラー');
    });
  }

  /** 自前サーバー（/api/bookings）に送信する */
  function sendViaServer(payload, onSuccess, onError) {
    fetch((getApiBase() || '') + '/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('送信に失敗しました');
        return res.json();
      })
      .then(onSuccess)
      .catch(onError);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorEl.hidden = true;

    var time = timeInput.value.trim();
    if (!time) {
      alert('希望時間を選択してください。');
      return;
    }

    var payload = {
      classType: form.classType.value,
      date: form.date.value,
      time: time,
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      memo: form.memo.value.trim()
    };

    submitBtn.disabled = true;
    submitBtn.textContent = '送信中…';

    function showSuccess() {
      form.classList.add('hidden');
      resultEl.hidden = false;
    }
    function showError(msg) {
      errorEl.hidden = false;
      var detail = document.getElementById('booking-error-detail');
      if (detail) detail.textContent = msg || '';
      submitBtn.disabled = false;
      submitBtn.textContent = '予約を送信する';
    }

    if (window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
      sendViaSupabase(payload, showSuccess, showError);
    } else {
      sendViaServer(payload, showSuccess, showError);
    }
  });

  setMinDate();
  renderTimeSlots();
})();
