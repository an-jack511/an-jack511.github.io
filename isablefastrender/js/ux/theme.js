// Theme: handles theme detection, apply and toggle
(function(){
  const THEME_KEY = 'site-theme';
  function applyTheme(theme){
    if(theme === 'dark') document.body.classList.add('dark-mode'); else document.body.classList.remove('dark-mode');
    document.documentElement.setAttribute('data-theme', theme || 'light');
    const btn = document.getElementById('theme-toggle');
    if(btn) btn.textContent = (theme === 'dark' ? '☀️' : '🌙');
  }

  function init(){
    const saved = localStorage.getItem(THEME_KEY);
    if(saved) applyTheme(saved);
    else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark');
    else applyTheme('light');

    const toggle = document.getElementById('theme-toggle');
    if(toggle) toggle.addEventListener('click', function(){
      const isDark = document.body.classList.toggle('dark-mode');
      const newTheme = isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem(THEME_KEY, newTheme);
      toggle.textContent = (newTheme === 'dark' ? '☀️' : '🌙');
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
