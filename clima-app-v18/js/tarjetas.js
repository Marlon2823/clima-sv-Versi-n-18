/* Pantalla principal: tarjetas, gráficas de 24 h y 7 días, ventanas de detalle. */
function arc(s){const p=s.sun;let d='';if(p!==null){const x=100-90*Math.cos(Math.PI*p),y=90-90*Math.sin(Math.PI*p);d='<circle cx="'+x+'" cy="'+y+'" r="7" fill="#ffd54a"/>'}
return '<svg viewBox="0 0 200 100" width="220" aria-hidden="true"><path d="M10 90 A90 90 0 0 1 190 90" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="2" stroke-dasharray="4 5"/>'+d+'<text x="10" y="99" font-size="9" fill="#fff">'+(s.sr||'5:41')+'</text><text x="168" y="99" font-size="9" fill="#fff">'+(s.ss||'17:36')+'</text></svg>'}
let hMode='t';
function h24HTML(s){const H=s.h24||syn24(s),W=52,n=H.hh.length,V=hMode==='t'?H.t:hMode==='r'?H.r:H.c,u=hMode==='t'?'°':'%',mn=hMode==='t'?Math.min(...V)-2:0,mx=hMode==='t'?Math.max(...V)+2:100,hg=100,tp=22,y=v=>tp+(hg-tp-6)*(1-(v-mn)/((mx-mn)||1)),X=i=>i*W+W/2;
let sv='<svg viewBox="0 0 '+(n*W)+' '+hg+'" width="'+(n*W)+'" height="'+hg+'" role="img" aria-label="Gráfica de las próximas 24 horas">';
if(hMode==='r'){V.forEach((v,i)=>{const hh=Math.max(2,hg-6-y(v));sv+='<rect x="'+(X(i)-12)+'" y="'+(hg-6-hh)+'" width="24" height="'+hh+'" rx="6" fill="rgba(255,255,255,.6)"/><text x="'+X(i)+'" y="'+(hg-6-hh-5)+'" text-anchor="middle" font-size="12" fill="#fff">'+v+u+'</text>'})}
else{let p='M'+X(0)+' '+y(V[0]);for(let i=1;i<n;i++){const m=(X(i-1)+X(i))/2;p+=' C'+m+' '+y(V[i-1])+' '+m+' '+y(V[i])+' '+X(i)+' '+y(V[i])}
if(hMode==='c')sv+='<path d="'+p+' L'+X(n-1)+' '+(hg-6)+' L'+X(0)+' '+(hg-6)+'Z" fill="rgba(255,255,255,.28)"/>';
sv+='<path d="'+p+'" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>';V.forEach((v,i)=>{sv+='<circle cx="'+X(i)+'" cy="'+y(v)+'" r="3.5" fill="#fff"/><text x="'+X(i)+'" y="'+(y(v)-9)+'" text-anchor="middle" font-size="12" fill="#fff">'+v+u+'</text>'})}
sv+='</svg>';
const lb={t:'🌡️ Temperatura',r:'💧 Lluvia',c:'☁️ Nubes'};
return '<div class="chips">'+Object.keys(lb).map(k=>'<button data-m="'+k+'"'+(k===hMode?' class="on"':'')+'>'+lb[k]+'</button>').join('')+'</div><div class="hscroll"><div style="width:'+(n*W)+'px">'+sv+'<div class="hs">'+H.hh.map((h,i)=>'<div><small>'+(i?h+' h':'Ahora')+'</small><span>'+H.e[i]+'</span><b>'+H.t[i]+'°</b><small>💧'+H.r[i]+'%</small></div>').join('')+'</div></div></div>'}
function drawH24(s){const el=$('h24c');if(!el)return;const old=el.querySelector('.hscroll'),sl=old?old.scrollLeft:0;el.innerHTML=h24HTML(s);const nw=el.querySelector('.hscroll');if(nw)nw.scrollLeft=sl;el.querySelectorAll('.chips button').forEach(b=>b.onclick=()=>{hMode=b.dataset.m;drawH24(s)})}
function d7HTML(s){const Q=s.d7||syn7(s),mn=Math.min(...Q.map(d=>d.mn)),mx=Math.max(...Q.map(d=>d.mx)),sp=(mx-mn)||1;
return Q.map(d=>'<div class="w7"><span class="nm">'+d.n+'</span><span class="ic">'+d.e+'</span><span class="rn">💧'+d.r+'%</span><span class="lo">'+d.mn+'°</span><span class="bar"><i style="left:'+(100*(d.mn-mn)/sp)+'%;width:'+Math.max(6,100*(d.mx-d.mn)/sp)+'%"></i></span><span class="hi">'+d.mx+'°</span></div>').join('')}
function render(){
const s=cs();
applyTheme(s);
$('t').textContent=s.t+'°';$('c').textContent=stateLabel(s);$('s').textContent='Sensación '+s.f+'° · Máx '+(s.tmax??s.t+3)+'° · Mín '+(s.tmin??s.t-8)+'°';
$('g').innerHTML=alertsHTML(s)+
'<div class="card tap" data-k="r" tabindex="0" role="button"><h2>💧 Probabilidad de lluvia</h2><div class="big">'+s.r+'%</div><div class="note">'+(rnow()?'Está lloviendo ahora.':s.r<20?'Casi seguro sin lluvia.':s.r<60?'Posibles chubascos aislados.':'Alta probabilidad en esta hora: lleva paraguas.')+'</div></div>'+
'<div class="card tap" data-k="c" tabindex="0" role="button"><h2>☁️ Nubosidad</h2><div class="big">'+s.c+'%</div><div class="note">'+(s.c<25?(isDark(nowH())?'Cielo despejado: se ven las estrellas.':'Cielo despejado.'):s.c<70?'Parcialmente nublado.':'Cielo cubierto.')+'</div></div>'+
'<div class="card tap" data-k="u" tabindex="0" role="button"><h2>🕶️ Índice UV</h2><div class="big">'+s.uv+' <span style="font-size:1rem">'+uvTxt(s.uv)+'</span></div><div class="uv"><b style="left:calc('+Math.min(100,s.uv/11*100)+'% - 3px)"></b></div><div class="note">'+uvNote(s)+'</div></div>'+
'<div class="card tap" data-k="w" tabindex="0" role="button"><h2>🍃 Viento</h2><svg viewBox="0 0 100 100" width="96" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="2"/><text x="46" y="16" font-size="11" fill="#fff">N</text><g class="arrow" style="transform:rotate('+s.dir+'deg)"><path d="M50 22 L58 52 L50 46 L42 52Z" fill="#fff"/></g></svg><div class="note" style="text-align:center">'+s.w+' km/h</div></div>'+
'<div class="card tap" data-k="h" tabindex="0" role="button"><h2>💦 Humedad</h2><div class="big">'+s.h+'%</div><div class="note">Sensación térmica de '+s.f+'°.</div></div>'+
'<div class="card tap" data-k="z" tabindex="0" role="button"><h2>🌅 Sol</h2>'+arc(s)+'<div class="note" style="text-align:center">'+sunNote(s)+'</div></div>'+
'<div class="card wide"><h2>⏱️ Próximas 24 horas</h2><div id="h24c"></div></div>'+
'<div class="card wide"><h2>📅 Pronóstico de 7 días</h2>'+d7HTML(s)+'</div>'+
'<div class="card wide" id="aqc" hidden></div><div class="card wide" id="marc" hidden></div>'+
'<div class="card wide"><h2>🛰️ Radar de lluvia</h2><p class="note">Mira dónde está lloviendo y hacia dónde se mueve la lluvia en las últimas 2 horas.</p><button class="mapbtn" id="radarb" style="width:100%;margin-top:6px">Abrir radar</button></div>';
[...$('tabs').children].forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===cur));
drawCat();wire(s);
setup();
}
function scl(a,i){return '<div class="sc">'+a.map((x,j)=>'<span'+(j===i?' class="on"':'')+'>'+x+'</span>').join('')+'</div>'}
function detail(k,s){let t,vis,p,sc='';
if(k==='r'){t='💧 Probabilidad de lluvia';const n=Math.round(s.r/100*14);
vis=n<1?'<span style="font-size:4rem">🌤️</span>':Array.from({length:n},(_,i)=>'<i style="position:absolute;left:'+(4+i*(92/n))+'%;top:0;width:4px;height:14px;border-radius:4px;background:#cfe8ff;animation:drop '+(1+(i%4)*.35)+'s linear '+(i*.17)+'s infinite"></i>').join('');
p=(rnow()?'Está lloviendo ahora. ':'Es la probabilidad de lluvia medible en esta hora. ')+(rnow()?'Lleva paraguas y evita ríos y quebradas.':s.r<20?'Es baja: puedes planear al aire libre.':s.r<60?'Hay posibilidad de chubascos: ten un plan B.':'Es alta: lleva paraguas y evita ríos y quebradas.');
sc=scl(['0–19 % baja','20–59 % posible','60 %+ alta'],s.r<20?0:s.r<60?1:2)}
else if(k==='c'){t='☁️ Nubosidad';const n=Math.max(1,Math.round(s.c/25));
vis=Array.from({length:n},(_,i)=>'<span style="font-size:'+(2.6+s.c/50)+'rem;opacity:'+(.6+.4*(i%2))+';animation:drift '+(3+i)+'s ease-in-out '+(i*.4)+'s infinite alternate">☁️</span>').join('');
p='Porcentaje del cielo cubierto por nubes. '+(s.c<25?(isDark(nowH())?'El cielo está casi despejado: buena noche para ver las estrellas.':'El cielo está casi despejado.'):s.c<70?'Hay nubes y claros.':'El cielo está cubierto: baja el sol directo y sube la humedad.');
sc=scl(['0–24 % despejado','25–69 % parcial','70 %+ cubierto'],s.c<25?0:s.c<70?1:2)}
else if(k==='u'){t='🕶️ Índice UV';const u=s.uv;
vis='<span style="font-size:5rem;display:inline-block;animation:pulse 2s ease-in-out infinite">'+(isDark(nowH())?'🌙':rnow()?'🌦️':'☀️')+'</span>';
p=isDark(nowH())?'Es de noche: no hay radiación UV. (Guía general de la OMS.)':(rnow()&&u<=5?'Con lluvia y nubes el UV baja, pero no desaparece del todo. ':'')+(u<=2?'No necesitas protección especial.':u<=5?'Usa protector y sombrero si estarás varias horas afuera.':u<=7?'Alto: protector, gorra y gafas; busca sombra al mediodía.':u<=10?'Muy alto: evita el sol directo de 10 a 15 h y reaplica protector cada 2 horas.':'Extremo: evita salir al sol del mediodía y cúbrete.')+' (Guía general de la OMS.)';
sc=scl(['0–2 bajo','3–5 moderado','6–7 alto','8–10 muy alto','11+ extremo'],u<=2?0:u<=5?1:u<=7?2:u<=10?3:4)}
else if(k==='w'){t='🍃 Viento';const d=Math.max(.8,18/Math.max(s.w,2)),f=(s.dir+180)%360,cd=['N','NE','E','SE','S','SO','O','NO'][Math.round(f/45)%8];
vis='<svg viewBox="0 0 100 100" width="130" aria-hidden="true" style="animation:spin '+d+'s linear infinite"><g fill="#fff"><path d="M50 50L50 8Q72 24 50 50Z"/><path d="M50 50L92 50Q76 72 50 50Z"/><path d="M50 50L50 92Q28 76 50 50Z"/><path d="M50 50L8 50Q24 28 50 50Z"/></g><circle cx="50" cy="50" r="6" fill="#ffd54a"/></svg>';
p=s.w+' km/h, del '+cd+'. '+(s.w<12?'Brisa ligera.':s.w<29?'Viento moderado: se mueven hojas y ramas pequeñas.':s.w<50?'Viento fuerte: asegura objetos sueltos y aléjate de árboles y vallas.':'Viento muy fuerte: quédate en un lugar seguro.');
sc=scl(['menos de 12 ligero','12–28 moderado','29–49 fuerte','50+ muy fuerte'],s.w<12?0:s.w<29?1:s.w<50?2:3)}
else if(k==='h'){t='💦 Humedad';
vis='<div style="width:120px;height:120px;border:3px solid #fff;border-radius:50%;position:relative;overflow:hidden"><div style="position:absolute;left:-20%;right:-20%;bottom:0;height:'+s.h+'%;background:rgba(130,200,255,.9)"><div style="position:absolute;left:0;right:0;top:-8px;height:16px;border-radius:50%;background:rgba(130,200,255,.9);animation:drift 2.5s ease-in-out infinite alternate"></div></div><b style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:1.6rem">'+s.h+'%</b></div>';
p=s.h<40?'Aire seco: hidrátate y cuida tu piel.':s.h<70?'Humedad cómoda.':'Aire muy húmedo: se siente más calor (sensación de '+s.f+'°)'+(rnow()?' y la lluvia mantiene el ambiente húmedo.':' y puede haber lluvia.');
sc=scl(['menos de 40 % seco','40–69 % cómodo','70 %+ húmedo'],s.h<40?0:s.h<70?1:2)}
else{t='🌅 Sol';vis='<div style="animation:pulse 3s ease-in-out infinite">'+arc(s)+'</div>';p='Amanece a las '+(s.sr||'5:41')+' y atardece a las '+(s.ss||'17:36')+'. '+((s.sun===null||(!D&&isDark(nowH())))?(nowH()<12?'Todavía no sale el sol.':'Ahora es de noche.'):'El punto amarillo marca dónde va el sol ahora.'+(rnow()||s.c>=85?' Hoy está tapado por las nubes.':''))}
return {t,vis,p,sc}}
function openM(k,s){const d=detail(k,s);$('mb').className='';$('mb').innerHTML='<button id="mx" aria-label="Cerrar">✕</button><h3>'+d.t+'</h3><div class="vis">'+d.vis+'</div><p>'+d.p+'</p>'+d.sc;$('md').classList.add('on')}
function wire(s){document.querySelectorAll('.tap').forEach(el=>{const f=()=>openM(el.dataset.k,s);el.onclick=f;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f()}}});$('g').insertAdjacentHTML('beforeend',actsHTML(s)+'<div class="card wide"><h2>📤 Compartir</h2><p class="note">Crea una imagen con el clima de hoy para enviarla por WhatsApp.</p><button class="mapbtn" id="shbtn" style="width:100%;margin-top:6px">Compartir como imagen</button></div>');drawH24(s);drawExtras();const rb=$('radarb');if(rb)rb.onclick=openRadar;$('shbtn').onclick=shareImg}
function hideSplash(){const el=$('splash');if(!el)return;setTimeout(()=>{el.classList.add('out');setTimeout(()=>el.remove(),700)},Math.max(0,1500-performance.now()))}
function iniciarPestanas(){
$('tabs').innerHTML=Object.keys(S).map(k=>'<button data-k="'+k+'" aria-pressed="false">'+S[k].e+' '+S[k].n+'</button>').join('');
$('tabs').onclick=e=>{const k=e.target.closest('button');if(k){D=null;cur=k.dataset.k;render()}};
}
function iniciarModal(){
$('md').onclick=e=>{if(e.target.id==='md'||e.target.id==='mx')$('md').classList.remove('on')};
addEventListener('keydown',e=>{if(e.key==='Escape')$('md').classList.remove('on')});
}
