// TOC: positioning floating TOC and mobile modal
(function(){
  function createMobileToc(tocElement){
    if(!tocElement) return;
    const existing = document.querySelector('.mobile-toc-btn'); if(existing) return;
    const btn = document.createElement('button'); btn.className='mobile-toc-btn'; btn.setAttribute('aria-label','打开文章目录');
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="mobile-toc-label">目录</span>';
    const modal = document.createElement('div'); modal.className='mobile-toc-modal';
    const header = document.createElement('div'); header.className='mobile-toc-header'; header.innerHTML='<h3>文章目录</h3>';
    const closeBtn = document.createElement('button'); closeBtn.className='mobile-toc-close'; closeBtn.innerHTML='✕'; closeBtn.setAttribute('aria-label','关闭目录'); header.appendChild(closeBtn);
    const modalContent = document.createElement('div'); modalContent.className='mobile-toc-content'; modalContent.appendChild(header);
    const tocList = tocElement.querySelector('ul');
    if(tocList){ modalContent.appendChild(tocList.cloneNode(true)); }
    modal.appendChild(modalContent); document.body.appendChild(btn); document.body.appendChild(modal);
    btn.addEventListener('click', ()=> modal.classList.add('active'));
    closeBtn.addEventListener('click', ()=> modal.classList.remove('active'));
    modal.addEventListener('click', e=>{ if(e.target===modal) modal.classList.remove('active'); });
    modalContent.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=> modal.classList.remove('active')));
  }

  function positionTOC(){
    if(window.innerWidth < 1360) return;
    const toc = document.querySelector('.ux-toc-floating');
    const article = document.querySelector('.main .article'); if(!toc || !article) return;
    if(window.innerWidth < 1200){ toc.style.display='none'; return; } else { toc.style.display=''; }
    const tocWidth = toc.offsetWidth || 300; const artRect = article.getBoundingClientRect(); const gap = 24;
    let left = artRect.left - tocWidth - gap + window.pageXOffset;
    if(left < 12){ const tryRight = artRect.right + gap + window.pageXOffset; if(tryRight + tocWidth < window.innerWidth - 12) left = tryRight; else left = 12; }
    const sidebar = document.querySelector('.sidebar'); if(sidebar){ const sbRect = sidebar.getBoundingClientRect(); if(left + tocWidth > sbRect.left - 12) left = Math.max(12, sbRect.left - tocWidth - 24); }
    toc.style.left = left + 'px'; const headerHeight = (document.querySelector('header')?.offsetHeight || 84) + 12; toc.style.position='fixed'; let top = headerHeight; const tocHeight = toc.offsetHeight || 0; if(top + tocHeight > window.innerHeight - 24) top = Math.max(12, window.innerHeight - tocHeight - 24); toc.style.top = top + 'px'; toc.style.zIndex = 920;
  }

  function init(){
    // find toc element robustly
    const tocElement = document.querySelector('.ux-toc-inline #TableOfContents, aside.ux-toc #TableOfContents, .ux-toc-block #TableOfContents, #TableOfContents');
    if(tocElement) createMobileToc(tocElement);
    positionTOC(); window.addEventListener('resize', positionTOC); window.addEventListener('orientationchange', positionTOC); window.addEventListener('scroll', positionTOC, {passive:true});
    const articleNode = document.querySelector('.main .article'); if(articleNode && window.MutationObserver){ const mo = new MutationObserver(()=> positionTOC()); mo.observe(articleNode, { childList:true, subtree:true }); }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
