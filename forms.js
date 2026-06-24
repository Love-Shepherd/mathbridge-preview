
// Applications window. Update these two dates for each new cohort.
var COHORT_OPEN="2026-06-01", COHORT_CLOSE="2026-08-15";
function appsOpen(){var n=new Date();return n>=new Date(COHORT_OPEN)&&n<=new Date(COHORT_CLOSE);}
function mbThanks(f){f.style.display="none";f.parentNode.querySelector(".thanks").style.display="block";return false;}
document.addEventListener("DOMContentLoaded",function(){
  var open=appsOpen();
  var fc=document.getElementById("footcta"); if(fc) fc.textContent=open?"Applications are open. Apply.":"Cohorts open soon. Join the waitlist.";
  document.querySelectorAll(".js-apply").forEach(function(b){
    if(b.classList.contains("apply")) b.textContent=open?"Apply":"Join the waitlist";
    b.addEventListener("click",function(e){e.preventDefault();
      document.getElementById(open?"ov-apply":"ov-wait").classList.add("show");});
  });
  document.querySelectorAll(".ov").forEach(function(ov){
    ov.addEventListener("click",function(e){if(e.target===ov||e.target.hasAttribute("data-close"))ov.classList.remove("show");});
  });
  document.addEventListener("keydown",function(e){if(e.key==="Escape")document.querySelectorAll(".ov.show").forEach(function(o){o.classList.remove("show");});});
});
