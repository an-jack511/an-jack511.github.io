// Pre blocks: collapse long code/pre blocks
(function(){
  function init(){
    document.querySelectorAll('pre').forEach(el=>{
      if(el.dataset.uxPreInit) return; el.dataset.uxPreInit = '1';
      const btn=document.createElement('button');btn.className='collapse-btn';btn.type='button';btn.setAttribute('aria-expanded','true');btn.innerText='收起';
      el.style.position='relative';
      const inner=document.createElement('div');inner.className='collapsible';
      while(el.firstChild) inner.appendChild(el.firstChild);
      el.appendChild(btn); el.appendChild(inner);
      if(inner.textContent.length>400){ inner.classList.add('collapsed'); btn.innerText='展开'; btn.setAttribute('aria-expanded','false'); }
      btn.addEventListener('click', ()=>{ const collapsed = inner.classList.toggle('collapsed'); btn.innerText=collapsed?'展开':'收起'; btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true'); });
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
