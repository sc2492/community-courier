(function () {
  var pages = [
    { href: 'how-it-works.html', en: 'How it works',   ja: '仕組み' },
    { href: 'business.html',     en: 'Business case',  ja: 'ビジネスケース' },
    { href: 'technical.html',    en: 'Tech specs',      ja: '技術仕様' },
    { href: 'team.html',         en: 'About',           ja: 'チーム' },
  ];

  var current = window.location.pathname.split('/').pop() || 'index.html';
  if (current === '') current = 'index.html';

  var links = pages.map(function (p) {
    return '<a href="' + p.href + '"' +
      (current === p.href ? ' class="current"' : '') +
      ' data-en="' + p.en + '" data-ja="' + p.ja + '">' + p.en + '</a>';
  }).join('\n    ');

  var topnav = document.getElementById('topnav');
  if (topnav) {
    topnav.innerHTML =
      '<a href="index.html" class="brand">' +
        '<img src="logo.png" alt="Community Courier" height="32" style="flex-shrink:0;border-radius:4px;">' +
        '<span>Community Courier</span>' +
      '</a>' +
      '<div class="links">' + links + '</div>' +
      '<div class="nav-right">' +
        '<button class="presentation-bar-btn" onclick="window.openPresentationMode && window.openPresentationMode()" title="Open presentation slide deck (Keyboard: P)" data-en="▶ Deck View (P)" data-ja="▶ スライド表示 (P)">▶ Deck View (P)</button>' +
        '<div class="lang-toggle" role="group" aria-label="Language selector">' +
          '<button class="lang-btn active" data-lang="en" aria-pressed="true">EN</button>' +
          '<button class="lang-btn" data-lang="ja" aria-pressed="false">JP</button>' +
        '</div>' +
        '<a href="index.html#demo" class="cta-btn" data-en="Watch Demo" data-ja="デモを見る">Watch Demo</a>' +
      '</div>';
  }
})();
