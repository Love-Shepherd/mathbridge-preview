
// Clickjacking guard. CSP frame-ancestors is ignored via <meta> and GitHub Pages
// cannot send X-Frame-Options, so this is the mitigation until real headers exist.
if(self!==top){try{top.location=self.location;}catch(e){document.documentElement.style.display='none';}}
// Form submission. Bound by addEventListener rather than an inline onsubmit
// attribute, so the Content-Security-Policy can forbid inline script entirely.
function mbSubmit(f){
 if(f.dataset.sending==='1')return;              // double-submit guard
 if(!f.reportValidity())return;                  // native constraint validation
 var btn=f.querySelector('button[type=submit]');
 var done=function(){
  f.dataset.sending='';
  f.reset();                                     // clear PII from the DOM
  f.style.display='none';
  var t=f.parentNode.querySelector('.enq-thanks');
  if(t)t.style.display='block';
 };
 // clamp to the declared maxlength before sending. Client-side only, so it stops
 // accidental and casual oversize, not a determined attacker posting to the API.
 f.querySelectorAll('input,textarea').forEach(function(e){
  if(e.maxLength>0&&e.value.length>e.maxLength)e.value=e.value.slice(0,e.maxLength);
 });
 var key=f.querySelector('[name=access_key]');
 if(!key||key.value.indexOf('REPLACE')===0){done();return;}   // no key yet: preview only
 f.dataset.sending='1';
 if(btn){btn.disabled=true;btn.textContent='Sending…';}
 fetch('https://api.web3forms.com/submit',{method:'POST',body:new FormData(f)})
  .then(function(r){return r.json();}).then(done).catch(done);
}
document.addEventListener('DOMContentLoaded',function(){
 document.querySelectorAll('form.enquiry').forEach(function(f){
  f.addEventListener('submit',function(ev){ev.preventDefault();mbSubmit(f);});
 });
 // year of study: reveal the specify field only when Other is chosen
 document.querySelectorAll('select.js-year').forEach(function(sel){
  var box=sel.parentNode.querySelector('.js-other'); if(!box)return;
  var sync=function(){var o=sel.value==='Other';box.hidden=!o;
   var i=box.querySelector('input');if(i){i.required=o;if(!o)i.value='';}};
  sel.addEventListener('change',sync);sync();});
 // mobile menu
 var mb=document.querySelector('.menu-btn'),menu=document.querySelector('.menu');
 if(mb&&menu){mb.addEventListener('click',function(){var o=menu.classList.toggle('open');mb.textContent=o?'Close':'Menu';mb.setAttribute('aria-expanded',o);});
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open');mb.textContent='Menu';});});}
});
// header shadow
(function(){var h=document.querySelector('header.site');if(h){var f=function(){h.classList.toggle('scrolled',window.scrollY>6);};f();addEventListener('scroll',f,{passive:true});}})();
// load + reveal
window.addEventListener('load',function(){document.documentElement.classList.add('anim');});
(function(){
 if(!('IntersectionObserver'in window)||matchMedia('(prefers-reduced-motion:reduce)').matches){
  document.querySelectorAll('.r,.path-rule').forEach(function(e){e.classList.add('in');});return;}
 document.documentElement.classList.add('reveal-ready');
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 document.querySelectorAll('.r,.path-rule').forEach(function(e){
  if(e.getBoundingClientRect().top<innerHeight*.92)e.classList.add('in');else io.observe(e);});
})();
