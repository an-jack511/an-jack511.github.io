// UX interactive enhancements: collapse code/proof blocks, multi-level list toggles, comments local submit
document.addEventListener('DOMContentLoaded', function(){
  // Header scroll handler: add .scrolled when page is scrolled down
  const header = document.querySelector('.site-header, header');
  if(header){
    const setHeaderState = ()=>{
      if(window.scrollY>8) header.classList.add('scrolled'); else header.classList.remove('scrolled');
    }
    setHeaderState();
    window.addEventListener('scroll', setHeaderState, {passive:true});
  }
  // Add collapse buttons to `pre` blocks (proofs are handled via ux-block toggles)
  document.querySelectorAll('pre').forEach(el=>{
    const btn=document.createElement('button');btn.className='collapse-btn';btn.type='button';btn.setAttribute('aria-expanded','true');btn.innerText='收起';
    el.style.position='relative';
    // create inner collapsible wrapper for pre content
    const inner=document.createElement('div');inner.className='collapsible';
    // move child nodes
    while(el.firstChild) inner.appendChild(el.firstChild);
    el.appendChild(btn);
    el.appendChild(inner);
    // default collapsed for long blocks
    if(inner.textContent.length>400){inner.classList.add('collapsed');btn.innerText='展开';btn.setAttribute('aria-expanded','false')} else {btn.innerText='收起';btn.setAttribute('aria-expanded','true')}
    btn.addEventListener('click', ()=>{const collapsed = inner.classList.toggle('collapsed');btn.innerText=collapsed?'展开':'收起';btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');})
  })

  // Multi-level list toggles
  document.querySelectorAll('.post-content li').forEach(li=>{
    const childUL=li.querySelector('ul, ol');
    if(childUL){
      const t=document.createElement('button');t.className='list-toggle';t.innerText='▸';
      t.addEventListener('click',(e)=>{e.stopPropagation();li.classList.toggle('collapsed');t.innerText=li.classList.contains('collapsed')?'▾':'▸'});
      li.insertBefore(t, li.firstChild);
    }
  })

  // TOC toggle: handle .toc-toggle buttons created by the partial
  document.querySelectorAll('.toc-toggle').forEach(btn=>{
    const tocId = btn.getAttribute('aria-controls') || 'TableOfContents';
    const tocEl = document.getElementById(tocId);
    if(!tocEl) return;
    btn.addEventListener('click', function(){
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      tocEl.style.display = expanded ? 'none' : '';
      btn.innerText = expanded ? '目录 ▸' : '目录 ▾';
    })
  });

  // Auto-position TOC: compute left so TOC sits left of the centered `.main .article`
  function positionTOC(){
    // Only position floating TOC on wide screens where floating mode is enabled
    if(window.innerWidth < 1360) return;
    const toc = document.querySelector('.ux-toc-floating');
    const article = document.querySelector('.main .article');
    if(!toc || !article) return;
    // hide on narrow screens
    if(window.innerWidth < 1200){ toc.style.display = 'none'; return; } else { toc.style.display = ''; }
    const tocWidth = toc.offsetWidth || 300;
    const tocHeight = toc.offsetHeight || 0;
    const artRect = article.getBoundingClientRect();
    const gap = 24; // gap between article and toc
    // compute left: prefer left of article; if not enough room, clamp to viewport or try right side
    let left = artRect.left - tocWidth - gap + window.pageXOffset;
    if(left < 12){
      // not enough room on left, try placing to the right of article (if space)
      const tryRight = artRect.right + gap + window.pageXOffset;
      if(tryRight + tocWidth < window.innerWidth - 12) left = tryRight; else left = 12;
    }
    // ensure it doesn't overlap the right sidebar area: if it would, move it left a bit
    const sidebar = document.querySelector('.sidebar');
    if(sidebar){
      const sbRect = sidebar.getBoundingClientRect();
      if(left + tocWidth > sbRect.left - 12){
        left = Math.max(12, sbRect.left - tocWidth - 24);
      }
    }
    toc.style.left = left + 'px';
    // ensure fixed positioning and top (respect header height)
    const headerHeight = (document.querySelector('header')?.offsetHeight || 84) + 12;
    toc.style.position = 'fixed';
    // clamp top so that toc fits vertically; if too tall, allow scroll by CSS max-height
    let top = headerHeight;
    // if toc would extend past viewport bottom, reduce top a little
    if(top + tocHeight > window.innerHeight - 24){
      top = Math.max(12, window.innerHeight - tocHeight - 24);
    }
    toc.style.top = top + 'px';
    toc.style.zIndex = 920;
  }

  // initial position and on resize/scroll
  positionTOC();
  window.addEventListener('resize', positionTOC);
  window.addEventListener('orientationchange', positionTOC);
  window.addEventListener('scroll', positionTOC, {passive:true});

  // also observe DOM changes inside article (in case content loads later)
  const articleNode = document.querySelector('.main .article');
  if(articleNode && window.MutationObserver){
    const mo = new MutationObserver(()=>{ positionTOC(); });
    mo.observe(articleNode, { childList:true, subtree:true });
  }

  // Load recent comments via fetch from /data/comments.json if not present in Hugo data
  fetch('/data/comments.json').then(r=>{if(r.ok) return r.json();throw 0}).then(json=>{
    const container=document.getElementById('recent-comments-container');
    if(!container) return;
    const ul=document.createElement('ul');
    let count=0;
    Object.keys(json).forEach(k=>{
      json[k].forEach(c=>{
        if(count<6){const li=document.createElement('li');li.className='rc-item';li.innerHTML=`<a href="${c.post_url}">${c.author}：${c.body.slice(0,60)}</a>`;ul.appendChild(li);count++}
      })
    })
    container.innerHTML='';container.appendChild(ul);
  }).catch(()=>{});

  // Comment form submit (local demo) - appends to DOM only
  window.submitComment=function(e){
    e.preventDefault();
    const author=document.getElementById('c-author').value.trim();
    const body=document.getElementById('c-body').value.trim();
    const post=document.getElementById('c-post').value;
    if(!author||!body) return alert('请填写名称与内容');
    const list=document.querySelector('#comments-list ul')||document.createElement('ul');
    const li=document.createElement('li');li.className='comment-item';li.innerHTML=`<div class="comment-author">${author}</div><div class="comment-body">${body}</div><div class="comment-meta">刚刚</div>`;
    list.prepend(li);
    if(!document.querySelector('#comments-list ul')) document.getElementById('comments-list').appendChild(list);
    document.getElementById('c-author').value='';document.getElementById('c-body').value='';
    alert('已在本页添加评论（仅前端演示）。要持久化请接入 GitHub Issues / Disqus / Serverless 函数。');
    return false;
  }

  // New: handle ux-block toggle buttons (定理/证明等封装块)
  document.querySelectorAll('.ux-block__toggle').forEach(btn=>{
    btn.addEventListener('click', function(e){
      const block = btn.closest('.ux-block');
      if(!block) return;
      const collapsed = block.classList.toggle('ux-block--collapsed');
      btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      // icon rotation handled by CSS on .ux-block--collapsed; keep aria updated for accessibility
    });
    // keyboard accessibility
    btn.addEventListener('keyup', function(e){ if(e.key==="Enter"||e.key===" ") btn.click(); });
  });
});
