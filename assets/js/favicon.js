// 根据主题切换favicon
document.addEventListener('DOMContentLoaded', () => {
  const setFavicon = () => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const icon = document.querySelector('link[rel="icon"]');
    
    if (isDark) {
      icon.href = "{{ "favicons/favicon-dark-32x32.png" | absURL }}";
    } else {
      icon.href = "{{ "favicons/favicon-light-32x32.png" | absURL }}";
    }
  };

  // 初始设置
  setFavicon();
  
  // 监听主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addListener(setFavicon);
});