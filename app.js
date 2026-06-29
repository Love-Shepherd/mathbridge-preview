
function mbThanks(f){f.querySelectorAll('input,select,textarea,button').forEach(function(e){e.style.display='none'});
 var t=f.parentNode.querySelector('.thanks');if(t)t.style.display='block';return false;}
function mbEnquiry(f){
 var done=function(){f.style.display='none';var t=f.parentNode.querySelector('.enq-thanks');if(t)t.style.display='block';};
 var key=f.querySelector('[name=access_key]');
 if(!key||key.value.indexOf('REPLACE')===0){done();return false;} // no key yet: preview only
 fetch('https://api.web3forms.com/submit',{method:'POST',body:new FormData(f)})
  .then(function(r){return r.json();}).then(done).catch(done);
 return false;}
// cohort cycle: applications open until 31 Jul 2026, then from 1 Aug 2026 a repeating cycle of 6 weeks closed + 2 weeks open
var CYCLE_START=new Date('2026-08-01T00:00:00');
function appsOpen(){var now=new Date();if(now<CYCLE_START)return true;
 var d=((Math.floor((now-CYCLE_START)/86400000)%56)+56)%56;return d>=42;}
document.addEventListener('DOMContentLoaded',function(){
 var open=appsOpen();
 document.querySelectorAll('.js-apply').forEach(function(b){
  if(!open)b.textContent='Join the waitlist';
  b.addEventListener('click',function(e){e.preventDefault();
   if(open){ var el=document.getElementById('apply');
    if(el){ el.scrollIntoView({behavior:'smooth'}); } else { location.href='apply.html'; } }
   else { location.href='waitlist.html'; }});});
 document.querySelectorAll('.js-state').forEach(function(e){var v=open?e.getAttribute('data-open'):e.getAttribute('data-closed');if(v!=null)e.textContent=v;});
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
