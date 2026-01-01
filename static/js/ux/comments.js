// Comments: load recent comments and provide front-end submit demo
(function(){
  function loadRecent(){
    fetch('/data/comments.json').then(r=>{if(r.ok) return r.json();throw 0}).then(json=>{
      const container=document.getElementById('recent-comments-container'); if(!container) return;
      const ul=document.createElement('ul'); let count=0;
      Object.keys(json).forEach(k=>{ json[k].forEach(c=>{ if(count<6){ const li=document.createElement('li'); li.className='rc-item'; li.innerHTML=`<a href="${c.post_url}">${c.author}：${c.body.slice(0,60)}</a>`; ul.appendChild(li); count++; } }); });
      container.innerHTML=''; container.appendChild(ul);
    }).catch(()=>{});
  }

  function initSubmit(){
    window.submitComment = function(e){ e.preventDefault(); const author=document.getElementById('c-author').value.trim(); const body=document.getElementById('c-body').value.trim(); if(!author||!body) return alert('请填写名称与内容'); const list=document.querySelector('#comments-list ul')||document.createElement('ul'); const li=document.createElement('li'); li.className='comment-item'; li.innerHTML=`<div class="comment-author">${author}</div><div class="comment-body">${body}</div><div class="comment-meta">刚刚</div>`; list.prepend(li); if(!document.querySelector('#comments-list ul')) document.getElementById('comments-list').appendChild(list); document.getElementById('c-author').value=''; document.getElementById('c-body').value=''; alert('已在本页添加评论（仅前端演示）。要持久化请接入后端服务。'); return false; };
  }

  function init(){ loadRecent(); initSubmit(); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
