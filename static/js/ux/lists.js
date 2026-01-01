// Multi-level list toggles
(function(){
  function init(){
    document.querySelectorAll('.post-content li').forEach(li=>{
      if(li.dataset.uxListInit) return; li.dataset.uxListInit='1';
      const childUL=li.querySelector('ul, ol');
      if(childUL){
        const t=document.createElement('button');t.className='list-toggle';t.innerText='▸';
        t.addEventListener('click',(e)=>{e.stopPropagation();li.classList.toggle('collapsed');t.innerText=li.classList.contains('collapsed')?'▾':'▸'});
        li.insertBefore(t, li.firstChild);
      }
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
