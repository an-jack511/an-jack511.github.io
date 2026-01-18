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

// 打印按钮功能
(function(){
  function initPrintButton(){
    const printBtn = document.getElementById('print-btn');
    if(printBtn){
      printBtn.addEventListener('click', function(e){
        e.preventDefault();
        window.print();
      });
    }
  }

  // 确保 DOM 加载完成后再初始化
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initPrintButton);
  } else {
    initPrintButton();
  }
})();

