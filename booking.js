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
    // 同じオリジンでサーバーを立てる想定
    return '';
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

    fetch((getApiBase() || '') + '/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('送信に失敗しました');
        return res.json();
      })
      .then(function () {
        form.classList.add('hidden');
        resultEl.hidden = false;
      })
      .catch(function () {
        errorEl.hidden = false;
        submitBtn.disabled = false;
        submitBtn.textContent = '予約を送信する';
      });
  });

  setMinDate();
  renderTimeSlots();
})();
