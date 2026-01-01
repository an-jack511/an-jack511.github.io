// Blockquote collapse functionality
(function(){
  function init(){
    document.querySelectorAll('blockquote').forEach(blockquote => {
      if(blockquote.dataset.uxBQInit) return; blockquote.dataset.uxBQInit='1';
      const toggle = document.createElement('button'); toggle.classList.add('blockquote-toggle'); toggle.type='button'; toggle.innerText = '展开';
      const content = document.createElement('div'); content.classList.add('blockquote-content');
      const children = Array.from(blockquote.childNodes).filter(node => node.nodeType === Node.ELEMENT_NODE);
      children.forEach(child => content.appendChild(child));
      blockquote.innerHTML = '';
      blockquote.appendChild(content);
      blockquote.appendChild(toggle);
      if (content.textContent.trim().length > 300) { content.classList.add('collapsed'); toggle.innerText = '展开'; } else { toggle.innerText = '收起'; }
      toggle.addEventListener('click', (e) => { e.stopPropagation(); const isCollapsed = content.classList.toggle('collapsed'); toggle.innerText = isCollapsed ? '展开' : '收起'; });
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
