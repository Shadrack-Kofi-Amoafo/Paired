// Global Theme Manager for Paired
(function(){
  const STORAGE_KEY='paired.settings';
  function read(){ try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');}catch(e){return {};}}
  function write(data){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  function isDark(data){ return data.darkMode !== false; } // default dark
  function applyTheme(){ const d=read(); document.documentElement.classList.toggle('theme-light', !isDark(d)); }
  function setDark(dark){ const data=read(); data.darkMode = dark; write(data); applyTheme(); }
  // expose
  window.PairedTheme = { apply:applyTheme, setDark, toggle(){ setDark(!isDark(read())); }, isDark: ()=> isDark(read()) };
  // auto apply early (in case this file in head)
  applyTheme();
  document.addEventListener('DOMContentLoaded', ()=>{
    // attach checkboxes/buttons
    document.querySelectorAll('[data-theme-toggle]').forEach(el=>{
      if(el.type==='checkbox'){
        el.checked = window.PairedTheme.isDark();
        el.addEventListener('change', ()=> window.PairedTheme.setDark(el.checked));
      } else {
        el.addEventListener('click', ()=> window.PairedTheme.toggle());
      }
    });
  });
})();
