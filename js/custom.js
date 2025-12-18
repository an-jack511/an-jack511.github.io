document.addEventListener('DOMContentLoaded', function() {
  // 为所有引用块添加折叠功能（使用与 ux.css 统一的类名）
  document.querySelectorAll('blockquote').forEach(blockquote => {
    // 创建折叠按钮
    const toggle = document.createElement('button');
    toggle.classList.add('blockquote-toggle');
    toggle.type = 'button';
    toggle.innerText = '展开';
    // 创建可折叠内容容器
    const content = document.createElement('div');
    content.classList.add('blockquote-content');

    // 将原始内容移动到容器中（保留非按钮节点）
    const children = Array.from(blockquote.childNodes).filter(node => node.nodeType === Node.ELEMENT_NODE);
    children.forEach(child => content.appendChild(child));

    // 清空 blockquote 并插回结构（按钮在右上，通过绝对定位表现）
    blockquote.innerHTML = '';
    blockquote.appendChild(content);
    blockquote.appendChild(toggle);

    // 初始：若文本较长则折叠
    if (content.textContent.trim().length > 300) {
      content.classList.add('collapsed');
      toggle.innerText = '展开';
    } else {
      toggle.innerText = '收起';
    }

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isCollapsed = content.classList.toggle('collapsed');
      toggle.innerText = isCollapsed ? '展开' : '收起';
    });
  });
});