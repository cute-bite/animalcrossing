(function(){
  // Build TOC
  var content=document.querySelector('.doc'); var toc=document.getElementById('toc');
  if(content && toc){ var hs=content.querySelectorAll('h2, h3'); if(hs.length){ var ul=document.createElement('ul');
    hs.forEach(function(h){ if(!h.id){ h.id=h.textContent.trim().toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,''); }
      var li=document.createElement('li'); li.style.marginLeft=(h.tagName==='H3'?'16px':'0');
      var a=document.createElement('a'); a.href='#'+h.id; a.textContent=h.textContent; li.appendChild(a); ul.appendChild(li); });
    toc.appendChild(ul); } else { toc.style.display='none'; } }
  // Theme toggle
  var btn=document.getElementById('themeToggle'); if(btn){ btn.addEventListener('click', function(){
    document.documentElement.classList.toggle('theme-dark');
    btn.textContent=document.documentElement.classList.contains('theme-dark')?'☀️':'🌙';
  });}
})();

// === 모바일 드로어 토글 ===
(function(){
  const btn = document.getElementById('menuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerClose');
  if (!btn || !drawer) return;

  function open(){ drawer.hidden = false; btn.setAttribute('aria-expanded','true'); }
  function close(){ drawer.hidden = true; btn.setAttribute('aria-expanded','false'); }

  btn.addEventListener('click', ()=> drawer.hidden ? open() : close());
  closeBtn?.addEventListener('click', close);
  document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') close(); });
  // 배경 영역 클릭 시 닫힘(오른쪽 14% 영역)
  drawer.addEventListener('click', (e)=> {
    const bounds = drawer.getBoundingClientRect();
    if (e.clientX > bounds.left + bounds.width*0.86) close();
  });
})();

// === 아코디언: "모두 닫기"
(function(){
  const closeAll = document.getElementById('closeAll');
  if (!closeAll) return;
  closeAll.addEventListener('click', ()=>{
    document.querySelectorAll('#mobileDrawer details[open]').forEach(d=> d.open = false);
  });
})();
