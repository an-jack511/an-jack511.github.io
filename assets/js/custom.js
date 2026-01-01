document.addEventListener('DOMContentLoaded', function() {
  // 主题切换：读取偏好并绑定切换按钮（使用 body.dark-mode 与 data-theme）
  (function(){
    const THEME_KEY = 'site-theme';
    function applyTheme(theme){
      if(theme === 'dark'){
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      document.documentElement.setAttribute('data-theme', theme || 'light');
      const btn = document.getElementById('theme-toggle');
      if(btn) btn.textContent = (theme === 'dark' ? '☀️' : '🌙');
    }

    const saved = localStorage.getItem(THEME_KEY);
    if(saved){
      applyTheme(saved);
    } else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
      applyTheme('dark');
    } else {
      applyTheme('light');
    }

    const toggle = document.getElementById('theme-toggle');
    if(toggle){
      toggle.addEventListener('click', function(){
        const isDark = document.body.classList.toggle('dark-mode');
        const newTheme = isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
        toggle.textContent = (newTheme === 'dark' ? '☀️' : '🌙');
      });
    }
  })();
  // 为所有引用块添加折叠功能

  document.querySelectorAll('blockquote').forEach(blockquote => {
    // 创建折叠按钮
    const toggle = document.createElement('div');
    toggle.classList.add('collapse-toggle');
    toggle.innerHTML = '⌄'; // 向下箭头
    
    // 创建内容容器
    const content = document.createElement('div');
    content.classList.add('collapsed-content');
    
    // 提取标题（如果存在）
    let title = null;
    const titleElements = blockquote.querySelectorAll('.quote-title');
    if (titleElements.length > 0) {
      title = titleElements[0];
    }
    
    // 创建顶栏容器
    const header = document.createElement('div');
    header.classList.add('quote-header');
    
    // 将标题添加到顶栏
    if (title) {
      header.appendChild(title.cloneNode(true));
      title.remove(); // 移除原始标题
    }
    
    // 将按钮添加到顶栏
    header.appendChild(toggle);
    
    // 将顶栏添加到blockquote最前面
    blockquote.prepend(header);
    
    // 将原始内容移动到容器中
    const children = Array.from(blockquote.childNodes).filter(node => 
      node !== header && node.nodeType === Node.ELEMENT_NODE
    );
    
    children.forEach(child => {
      content.appendChild(child);
    });
    
    blockquote.appendChild(content);
    
    // 添加整个顶栏的点击事件
    header.addEventListener('click', () => {
      blockquote.classList.toggle('collapsed');
    });
    
    // 初始状态（可选：默认折叠长引用）
    if (content.textContent.length > 300) {
      blockquote.classList.add('collapsed');
    }
  });

  // 移动端 TOC 弹出窗口
  (function() {
    // 检查页面中是否有 TOC
    const tocElement = document.querySelector('.ux-toc-inline #TableOfContents, aside.ux-toc #TableOfContents');
    if (!tocElement) return; // 如果没有 TOC，不创建按钮

    // 创建按钮
    const btn = document.createElement('button');
    btn.className = 'mobile-toc-btn';
    btn.innerHTML = '📑';
    btn.setAttribute('aria-label', '打开目录');

    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'mobile-toc-modal';

    // 创建关闭按钮和标题
    const header = document.createElement('div');
    header.className = 'mobile-toc-header';
    header.innerHTML = '<h3>文章目录</h3>';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-toc-close';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', '关闭目录');
    header.appendChild(closeBtn);

    // 复制 TOC 内容
    const modalContent = document.createElement('div');
    modalContent.className = 'mobile-toc-content';
    modalContent.appendChild(header);

    // 深度复制 TOC 列表并转换为移动端格式
    const tocList = tocElement.querySelector('ul');
    if (tocList) {
      const mobileList = createMobileTocList(tocList);
      modalContent.appendChild(mobileList);
    }

    modal.appendChild(modalContent);
    document.body.appendChild(btn);
    document.body.appendChild(modal);

    // 事件监听
    btn.addEventListener('click', () => {
      modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    // 点击背景关闭
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    // 点击链接时关闭模态框
    const links = modalContent.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    });

    // 函数：创建移动端 TOC 列表
    function createMobileTocList(ul, level = 1) {
      const mobileList = document.createElement('ul');
      mobileList.className = 'mobile-toc-list';

      ul.querySelectorAll('> li').forEach(li => {
        const mobileLi = document.createElement('li');
        mobileLi.className = 'level-' + level;

        const link = li.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          mobileLi.appendChild(newLink);
        }

        // 递归处理子列表
        const subUl = li.querySelector('ul');
        if (subUl) {
          const subList = createMobileTocList(subUl, level + 1);
          mobileLi.appendChild(subList);
        }

        mobileList.appendChild(mobileLi);
      });

      return mobileList;
    }
  })();
  
});