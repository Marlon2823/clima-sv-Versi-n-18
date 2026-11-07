/* Lugares: selector, búsqueda, favoritos y mapa de departamentos. */
let PREV='gps',sT=null;
function favs(){try{return JSON.parse(localStorage.getItem('favs'))||[]}catch(e){return[]}}
function saveFavs(a){try{localStorage.setItem('favs',JSON.stringify(a.slice(0,8)))}catch(e){}}
function cusP(){try{return JSON.parse(localStorage.getItem('cus'))}catch(e){return null}}
function quitarFav(i){const a=favs(),f=a[i];if(!f)return;a.splice(i,1);saveFavs(a);if($('dep').value==='fav:'+f.id){try{localStorage.setItem('cus',JSON.stringify(f))}catch(_){}buildDep('cus')}else buildDep($('dep').value)}
function pid(p){return(+p.lat).toFixed(3)+','+(+p.lon).toFixed(3)}
function buildDep(sel){const dep=$('dep'),F=favs(),C=cusP();
dep.innerHTML='<option value="gps">📍 Mi ubicación</option>'+(C&&!F.some(f=>f.id===pid(C))?'<option value="cus">📌 '+esc(C.name)+'</option>':'')+(F.length?'<optgroup label="⭐ Favoritos">'+F.map(f=>'<option value="fav:'+f.id+'">⭐ '+esc(f.name)+'</option>').join('')+'</optgroup>':'')+'<optgroup label="Departamentos">'+Object.keys(DEPS).map(k=>'<option>'+k+'</option>').join('')+'</optgroup><option value="__s">🔍 Buscar otro lugar…</option>';
dep.value=sel&&[...dep.options].some(o=>o.value===sel)?sel:'gps';PREV=dep.value}
function openSearch(){const mb=$('mb');mb.className='wide';
mb.innerHTML='<button id="mx" aria-label="Cerrar">✕</button><h3>🔍 Buscar lugar</h3><input id="sq" type="search" placeholder="Municipio, colonia o ciudad…" autocomplete="off" aria-label="Buscar lugar"><div id="sres"></div>';
$('md').classList.add('on');drawSRes([],'');const q=$('sq');q.oninput=()=>{clearTimeout(sT);const v=q.value.trim();if(v.length<2){drawSRes([],'');return}sT=setTimeout(()=>doSearch(v),350)};setTimeout(()=>q.focus(),120)}
async function geo(v,cc){const r=await fetch('https://geocoding-api.open-meteo.com/v1/search?name='+encodeURIComponent(v)+'&count=8&language=es&format=json'+(cc?'&countryCode='+cc:''));if(!r.ok)throw 0;const j=await r.json();return(j.results||[]).map(x=>({name:x.name,sub:[x.admin1,x.country].filter(Boolean).join(', '),lat:x.latitude,lon:x.longitude}))}
async function doSearch(v){drawSRes(null,'Buscando…');let R=[],note='';try{R=await geo(v,'SV');if(!R.length){R=await geo(v,'');if(R.length)note='Sin resultados en El Salvador: mostrando otros países.'}}catch(e){if($('sq'))drawSRes([],'No pude buscar. Revisa tu conexión.');return}
if($('sq')&&$('sq').value.trim()===v)drawSRes(R,R.length?note:'No encontré ese lugar. Prueba con otro nombre.')}
function drawSRes(R,msg){const el=$('sres');if(!el)return;const F=favs(),has=R&&R.length;let h=msg?'<p class="note">'+msg+'</p>':'';
if(has)h+=R.map((p,i)=>'<div class="sr" data-i="'+i+'"><div class="sn"><b>'+esc(p.name)+'</b><small>'+esc(p.sub)+'</small></div><button class="star" data-i="'+i+'" aria-label="Guardar en favoritos">'+(F.some(f=>f.id===pid(p))?'⭐':'☆')+'</button></div>').join('');
else h+=F.length?'<h4>⭐ Favoritos</h4>'+F.map((f,i)=>'<div class="sr" data-f="'+i+'"><div class="sn"><b>'+esc(f.name)+'</b><small>'+esc(f.sub||'')+'</small></div><button class="del" data-f="'+i+'" aria-label="Quitar de favoritos">✕</button></div>').join(''):(msg?'':'<p class="note">Escribe el nombre de tu municipio, colonia o ciudad. Con la ⭐ guardas lugares para entrar rápido.</p>');
el.innerHTML=h;
el.onclick=e=>{const st=e.target.closest('.star'),dl=e.target.closest('.del'),row=e.target.closest('.sr');
if(st){const p=R[+st.dataset.i],a=favs(),id=pid(p),k=a.findIndex(f=>f.id===id);if(k>=0)a.splice(k,1);else a.unshift({id,name:p.name,sub:p.sub,lat:p.lat,lon:p.lon});saveFavs(a);buildDep($('dep').value);drawSRes(R,msg);return}
if(dl){quitarFav(+dl.dataset.f);drawSRes(R,msg);return}
if(row){const p=row.dataset.f!=null?favs()[+row.dataset.f]:R[+row.dataset.i];choose(p)}}}
function choose(p){const id=pid(p),isF=favs().some(f=>f.id===id);if(!isF){try{localStorage.setItem('cus',JSON.stringify({name:p.name,sub:p.sub,lat:p.lat,lon:p.lon}))}catch(e){}}buildDep(isF?'fav:'+id:'cus');$('md').classList.remove('on');$('dep').dispatchEvent(new Event('change'))}
function mapSVG(sel,z){const ks=Object.keys(MAP.d),ord=ks.filter(k=>k!==sel).concat(ks.includes(sel)?[sel]:[]);
return '<svg viewBox="'+MAP.vb+'" style="width:'+(z*100)+'%" role="group" aria-label="Mapa de El Salvador">'+MAP.geo.map(g=>'<text class="geo" x="'+g[1]+'" y="'+g[2]+'">'+g[0]+'</text>').join('')+ord.map(n=>{const o=MAP.d[n],k=o.l.length,x=o.c[0],y=o.c[1];
return '<g class="dp'+(n===sel?' on':'')+'" style="--i:'+ks.indexOf(n)+'" data-n="'+n+'" tabindex="0" role="button" aria-label="'+n+'"><path d="'+o.p+'"/>'+o.l.map((t,i)=>'<text style="font-size:'+o.f+'px" transform="rotate('+o.r+' '+x+' '+y+')" x="'+x+'" y="'+(y+(i-(k-1)/2)*o.f*1.05)+'">'+t+'</text>').join('')+'</g>'}).join('')+'</svg>'}
function pickDep(v){$('dep').value=v;$('dep').dispatchEvent(new Event('change'));$('md').classList.remove('on')}
function openMap(){const mb=$('mb');mb.className='wide';let z=innerWidth<600?1.6:1;
mb.innerHTML='<button id="mx" aria-label="Cerrar">✕</button><h3>🗺️ Elige tu departamento</h3><div id="mwrap">'+mapSVG($('dep').value,z)+'</div><div class="zb"><button id="zo" aria-label="Alejar">－</button><button id="zi" aria-label="Acercar">＋</button></div><p class="note" style="text-align:center">Toca un departamento. Mapa esquemático: los límites son aproximados.</p><button id="gpsb" class="mapbtn" style="width:100%">📍 Usar mi ubicación</button>';
const w=$('mwrap'),sv=mb.querySelector('svg'),setZ=v=>{z=Math.min(3,Math.max(1,v));sv.style.width=z*100+'%'};
$('zi').onclick=()=>setZ(z+.4);$('zo').onclick=()=>setZ(z-.4);
mb.querySelectorAll('.dp').forEach(g=>{const f=()=>pickDep(g.dataset.n);g.onclick=f;g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f()}}});
$('gpsb').onclick=()=>pickDep('gps');$('md').classList.add('on');w.scrollLeft=(w.scrollWidth-w.clientWidth)/2}
function iniciarLugares(){
const dep=$('dep');
let sv0=null;
try{sv0=localStorage.getItem('dep')}catch(e){}
if(AJ.lugarInicio==='gps')sv0='gps';
buildDep(sv0);
dep.onchange=()=>{if(dep.value==='__s'){dep.value=PREV;openSearch();return}PREV=dep.value;try{localStorage.setItem('dep',dep.value)}catch(e){}$('t').textContent='--°';$('c').textContent='';$('s').textContent='Cargando…';$('g').style.visibility='hidden';start()};
}
function iniciarMapa(){
$('mapbtn').onclick=openMap;
}
