// Theme: handles theme detection, apply and toggle
(function(){
  const THEME_KEY = 'site-theme';
  function renderIcon(button, theme){
    if(!button) return;
    button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    const sun = '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const moon = '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    button.innerHTML = (theme === 'dark' ? sun : moon);
  }

  function applyTheme(theme){
    if(theme === 'dark') document.body.classList.add('dark-mode'); else document.body.classList.remove('dark-mode');
    document.documentElement.setAttribute('data-theme', theme || 'light');
    const btn = document.getElementById('theme-toggle');
    renderIcon(btn, theme);
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
      renderIcon(toggle, newTheme);
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
