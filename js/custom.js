document.addEventListener('DOMContentLoaded', function() {
  // 为所有引用块添加折叠功能
  document.querySelectorAll('blockquote').forEach(blockquote => {
    // 创建折叠按钮
    const toggle = document.createElement('div');
    toggle.classList.add('collapse-toggle');
    toggle.innerHTML = '⌄'; // 向下箭头
    blockquote.prepend(toggle);
    
    // 创建内容容器
    const content = document.createElement('div');
    content.classList.add('collapsed-content');
    
    // 将原始内容移动到容器中
    const children = Array.from(blockquote.childNodes).filter(node => 
      node !== toggle && node.nodeType === Node.ELEMENT_NODE
    );
    
    children.forEach(child => {
      content.appendChild(child);
    });
    
    blockquote.appendChild(content);
    
    // 初始状态（可选：默认折叠长引用）
    if (content.textContent.length > 300) {
      blockquote.classList.add('collapsed');
    }
    
    // 点击事件
    toggle.addEventListener('click', () => {
      blockquote.classList.toggle('collapsed');
    });
  });
});