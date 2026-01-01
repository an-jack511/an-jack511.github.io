// UI utilities: header scrolled state and misc helpers
(function(){
  function headerScroll(){
    const header = document.querySelector('.site-header, header');
    if(!header) return;
    const setHeaderState = ()=>{ if(window.scrollY>8) header.classList.add('scrolled'); else header.classList.remove('scrolled'); };
    setHeaderState();
    window.addEventListener('scroll', setHeaderState, {passive:true});
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', headerScroll); else headerScroll();
})();
