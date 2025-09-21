(function () {
  // === Build TOC (한글 슬러그 OK, 중복 id 방지) ===
  const content = document.querySelector('.doc, .content, main');
  const toc = document.getElementById('toc');
  if (content && toc) {
    const hs = content.querySelectorAll('h2, h3');
    if (hs.length) {
      const ul = document.createElement('ul');
      const seen = new Set();
      hs.forEach((h, i) => {
        if (!h.id) {
          // 공백 -> -, 한글/영문/숫자/-만 허용
          let base = h.textContent.trim()
            .replace(/\s+/g, '-')
            .replace(/[^A-Za-z0-9\uAC00-\uD7A3\-]/g, '');
          if (!base) base = 'sec-' + (i + 1);
          let id = base, n = 2;
          while (seen.has(id) || document.getElementById(id)) id = `${base}-${n++}`;
          seen.add(id);
          h.id = id;
        }
        const li = document.createElement('li');
        if (h.tagName === 'H3') li.style.marginLeft = '16px';
        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        ul.appendChild(li);
      });
      toc.innerHTML = '';
      toc.appendChild(ul);
    } else {
      toc.style.display = 'none';
    }
  }

  // === Theme toggle (data-theme, localStorage 연동) ===
  const THEME_KEY = 'acnh-theme';
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');

  // 저장된 테마 적용
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  if (btn) {
    const setIcon = () => btn.textContent = (root.getAttribute('data-theme') === 'dark') ? '☀️' : '🌙';
    setIcon();
    btn.addEventListener('click', () => {
      const next = (root.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem(THEME_KEY, next);
      setIcon();
    });
  }
})();

// === 모바일 드로어 토글 ===
(function () {
  const btn = document.getElementById('menuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerClose');
  if (!btn || !drawer) return;

  function open()  { drawer.hidden = false; btn.setAttribute('aria-expanded', 'true');  }
  function close() { drawer.hidden = true;  btn.setAttribute('aria-expanded', 'false'); }

  btn.addEventListener('click', () => drawer.hidden ? open() : close());
  closeBtn?.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // 배경(오른쪽 14%) 클릭 시 닫힘
  drawer.addEventListener('click', (e) => {
    const rect = drawer.getBoundingClientRect();
    if (e.clientX > rect.left + rect.width * 0.86) close();
  });

  // 드로어 내부 링크 누르면 닫힘
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();

// === 아코디언: "모두 닫기" ===
(function () {
  const closeAll = document.getElementById('closeAll');
  if (!closeAll) return;
  closeAll.addEventListener('click', () => {
    document.querySelectorAll('#mobileDrawer details[open]').forEach(d => d.open = false);
  });
})();
