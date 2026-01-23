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

// 图片点击放大功能
(function() {
  function initImageModal(){
    // 创建模态框容器
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = '<div class="image-modal-content"><span class="image-modal-close">&times;</span><img src="" alt=""></div>';
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.image-modal-close');
    const modalImg = modal.querySelector('img');

    // 为所有文章中的图片添加点击事件
    const articleImages = document.querySelectorAll('article img, .article img, main img');
    console.log('Found images:', articleImages.length);
    
    articleImages.forEach((img, index) => {
      // 跳过已经添加过事件的图片
      if (img.dataset.clickHandled) return;
      img.dataset.clickHandled = 'true';
      
      img.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Image clicked:', this.src);
        modalImg.src = this.src;
        modalImg.alt = this.alt || '图片';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
    });

    // 关闭模态框
    function closeModal() {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // ESC键关闭
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });
  }

  // 确保 DOM 加载完成后再初始化
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initImageModal);
  } else {
    initImageModal();
  }
})();

