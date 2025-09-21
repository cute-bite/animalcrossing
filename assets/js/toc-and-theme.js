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