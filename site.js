(function(){
  // Apercu local (double-clic sur index.html) : les liens de dossier pointent vers index.html
  if(location.protocol==='file:'){
    document.querySelectorAll('a[href]').forEach(function(a){
      var h=a.getAttribute('href');
      if(/^(https?:|mailto:|#)/.test(h))return;
      if(h===''||h.slice(-1)==='/')a.setAttribute('href',h+'index.html');
    });
  }
  // Load more
  var plus=document.querySelector('.plus button');
  if(plus)plus.addEventListener('click',function(){
    document.querySelectorAll('.carte[hidden]').forEach(function(c){c.hidden=false});
    plus.parentNode.remove();document.body.classList.add('tout');
  });
  // Copier l'email
  document.querySelectorAll('.copie').forEach(function(b){
    b.addEventListener('click',function(){
      var mail=b.getAttribute('data-mail');
      var fin=function(){b.classList.add('fait');setTimeout(function(){b.classList.remove('fait')},1500)};
      if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(mail).then(fin,fin);
      else{var t=document.createElement('textarea');t.value=mail;document.body.appendChild(t);t.select();try{document.execCommand('copy')}catch(e){}t.remove();fin()}
    });
  });
  // Videos : lecture seulement quand visibles
  var vids=document.querySelectorAll('video[data-auto]');
  if(vids.length){
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){es.forEach(function(e){
        var v=e.target;
        if(e.isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){})}
        else v.pause();
      })},{rootMargin:'200px 0px'});
      vids.forEach(function(v){v.muted=true;io.observe(v)});
    }else vids.forEach(function(v){v.muted=true;v.play()});
  }
  // Prechargement des pages au survol : navigation quasi instantanee
  var vus={};
  document.addEventListener('pointerover',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
    var h=a.href;if(vus[h]||a.origin!==location.origin||location.protocol==='file:')return;
    vus[h]=1;var l=document.createElement('link');l.rel='prefetch';l.href=h;document.head.appendChild(l);
  },{passive:true});
})();
