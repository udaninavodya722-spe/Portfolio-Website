(function(){
  var root=document.documentElement;
  function setTheme(t){root.setAttribute('data-theme',t)}
  function isDark(){
    var t=root.getAttribute('data-theme');
    return t ? t==='dark' : true;
  }
  document.querySelectorAll('[data-toggle]').forEach(function(b){
    b.addEventListener('click',function(){setTheme(isDark()?'light':'dark')});
  });

  var chips=document.querySelectorAll('#filters .chip');
  var cards=document.querySelectorAll('#projects-grid .proj');
  chips.forEach(function(c){
    c.addEventListener('click',function(){
      var f=c.getAttribute('data-f');
      chips.forEach(function(x){x.setAttribute('aria-pressed',x===c?'true':'false')});
      cards.forEach(function(p){p.hidden=!(f==='all'||p.getAttribute('data-c')===f)});
    });
  });

  document.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click',function(){
      var el=document.getElementById(b.getAttribute('data-copy'));
      var txt=el.textContent;
      function done(){var o=b.textContent;b.textContent='Copied';setTimeout(function(){b.textContent=o},1400)}
      function fallback(){
        var r=document.createRange();r.selectNodeContents(el);
        var s=window.getSelection();s.removeAllRanges();s.addRange(r);
      }
      if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(txt).then(done,fallback);
      }else{fallback()}
    });
  });

  var links=document.querySelectorAll('#nav a,#mmenu a');
  var secs=Array.prototype.map.call(document.querySelectorAll('main section'),function(s){return s});
  function spy(){
    var y=window.scrollY+120,cur=secs[0].id;
    secs.forEach(function(s){if(s.offsetTop<=y)cur=s.id});
    links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+cur)});
  }
  window.addEventListener('scroll',spy,{passive:true});
  spy();

  var mb=document.getElementById('menuBtn'), mm=document.getElementById('mmenu');
  function closeMenu(){mm.hidden=true;mb.setAttribute('aria-expanded','false')}
  mb.addEventListener('click',function(){
    var willOpen=mm.hidden;
    mm.hidden=!willOpen;
    mb.setAttribute('aria-expanded',willOpen?'true':'false');
  });
  mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeMenu)});

  var slides=document.querySelectorAll('#heroSlider .slide');
  var dots=document.querySelectorAll('#heroDots .dot');
  var cur=0, timer=null;
  function show(i){
    cur=i;
    slides.forEach(function(sl,k){sl.classList.toggle('on',k===i)});
    dots.forEach(function(d,k){d.classList.toggle('on',k===i)});
  }
  function start(){
    if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    clearInterval(timer);
    timer=setInterval(function(){show((cur+1)%slides.length)},5000);
  }
  dots.forEach(function(d,k){d.addEventListener('click',function(){show(k);start()})});
  start();
})();
document.querySelectorAll('.svc-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rotateX = ((y - r.height / 2) / (r.height / 2)) * -10;
    const rotateY = ((x - r.width / 2) / (r.width / 2)) * 10;
    card.style.transform =
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
  });
});