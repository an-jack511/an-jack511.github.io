// ux-block toggle handlers (proofs/theorem blocks)
(function(){
  function init(){
    document.querySelectorAll('.ux-block__toggle').forEach(btn=>{
      if(btn.dataset.uxBlockInit) return; btn.dataset.uxBlockInit='1';
      btn.addEventListener('click', function(e){
        const block = btn.closest('.ux-block'); if(!block) return;
        const collapsed = block.classList.toggle('ux-block--collapsed');
        btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      });
      btn.addEventListener('keyup', function(e){ if(e.key==='Enter' || e.key===' ') btn.click(); });
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
