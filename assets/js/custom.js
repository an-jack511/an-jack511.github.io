document.addEventListener('DOMContentLoaded', function() {
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
  
});