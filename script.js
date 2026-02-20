(function () {
  'use strict';

  var header = document.querySelector('.header');
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');

  // スクロールでヘッダーにクラス追加
  function onScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // モバイルメニュー開閉
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });

    // ナビリンククリックでメニューを閉じる
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
