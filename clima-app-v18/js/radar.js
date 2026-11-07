/* Radar de lluvia (RainViewer + OpenStreetMap). */
let RV=null;
function mer(lat,lon,z){const n=256*Math.pow(2,z),s=Math.sin(lat*Math.PI/180);return[(lon+180)/360*n,(.5-Math.log((1+s)/(1-s))/(4*Math.PI))*n]}
function unm(x,y,z){const n=256*Math.pow(2,z);return[Math.atan(Math.sinh(Math.PI*(1-2*y/n)))*180/Math.PI,x/n*360-180]}
function rvLabel(){const f=RV.fr[RV.i],last=RV.i===RV.fr.length-1,m=Math.max(0,Math.round((Date.now()/1000-f.time)/60));$('rlbl').textContent='🕒 '+new Date(f.time*1000).toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'})+(last?' · más reciente':' · hace '+m+' min')}
function rvShow(){RV.layers.forEach((d,k)=>d.style.opacity=k===RV.i?'.78':'0');rvLabel()}
function rvBuild(){const box=$('rmap');if(!box||!RV)return;const W=box.clientWidth,H=box.clientHeight,z=RV.z,c=mer(RV.lat,RV.lon,z),tx=c[0]-W/2,ty=c[1]-H/2,t=$('rtiles');t.style.transform='';t.innerHTML='';
const layer=(zn,url,cls,cors)=>{const d=document.createElement('div');d.className=cls;const sz=256*Math.pow(2,z-zn),x0=Math.floor(tx/sz),x1=Math.floor((tx+W)/sz),y0=Math.floor(ty/sz),y1=Math.floor((ty+H)/sz),m=Math.pow(2,zn);
for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++){if(y<0||y>=m)continue;const im=new Image();im.draggable=false;im.alt='';im.style.cssText='left:'+Math.round(x*sz-tx)+'px;top:'+Math.round(y*sz-ty)+'px;width:'+(Math.ceil(sz)+1)+'px;height:'+(Math.ceil(sz)+1)+'px';if(cors){im.crossOrigin='anonymous';im.onerror=()=>{if(im.crossOrigin){const u=im.src;im.removeAttribute('crossorigin');im.src='';im.src=u}}}im.src=url(zn,((x%m)+m)%m,y);d.appendChild(im)}t.appendChild(d);return d};
layer(z,(a,x,y)=>'https://tile.openstreetmap.org/'+a+'/'+x+'/'+y+'.png','rb');
RV.layers=RV.fr.map(f=>layer(Math.min(z,7),(a,x,y)=>RV.host+f.path+'/256/'+a+'/'+x+'/'+y+'/2/1_1.png','rf',true));
const me=document.createElement('div'),p=mer(LOC.lat,LOC.lon,z);me.className='me';me.style.left=(p[0]-tx)+'px';me.style.top=(p[1]-ty)+'px';t.appendChild(me);rvShow();RV.tries=0;clearTimeout(RV.at);RV.at=setTimeout(rvAnalyze,1500)}
function rvAnalyze(){if(!RV||!$('rstat'))return;const L=RV.layers[RV.layers.length-1];if(!L)return;const imgs=[...L.querySelectorAll('img')],ok=imgs.filter(i=>i.complete&&i.naturalWidth);if(!imgs.length)return;
if(ok.length<imgs.length){if(RV.tries++<6){$('rstat').textContent='⏳ Comprobando el radar…';RV.at=setTimeout(rvAnalyze,1000)}else $('rstat').textContent='⚠️ No se pudieron cargar las imágenes del radar. Revisa tu conexión.';return}
let n=0;try{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d',{willReadFrequently:true});ok.forEach(im=>{x.clearRect(0,0,64,64);x.drawImage(im,0,0,64,64);const d=x.getImageData(0,0,64,64).data;for(let i=3;i<d.length;i+=4)if(d[i]>20)n++})}catch(e){$('rstat').textContent='ℹ️ El radar cargó, pero la app no puede analizarlo. Mira el mapa: los colores indican lluvia.';return}
$('rstat').textContent=n>=12?'🌧️ El radar detecta lluvia en esta zona ahora.':'☁️ El radar responde, pero no ve lluvia en esta zona. Si sabes que aquí llueve ahora, es posible que el radar no cubra tu zona.'}
function rvStep(){if(!RV||!RV.play||!$('rmap')||!$('md').classList.contains('on'))return;RV.i=(RV.i+1)%RV.fr.length;rvShow();clearTimeout(RV.tm);RV.tm=setTimeout(rvStep,RV.i===RV.fr.length-1?1800:650)}
async function openRadar(){const mb=$('mb');mb.className='wide';
mb.innerHTML='<button id="mx" aria-label="Cerrar">✕</button><h3>🛰️ Radar de lluvia</h3><div id="rmap"><div id="rtiles"></div><div id="rlbl">Cargando…</div></div><div class="zb"><button id="rz0" aria-label="Alejar">－</button><button id="rpl" aria-label="Pausar">⏸</button><button id="rz1" aria-label="Acercar">＋</button></div><div class="lk" style="justify-content:center;margin:8px 0"><button class="mapbtn" id="rme" style="font-size:.9rem;padding:7px 14px">📍 Mi lugar</button><button class="mapbtn" id="rwide" style="font-size:.9rem;padding:7px 14px">🌎 Zona amplia</button></div><p class="note" id="rstat">⏳ Comprobando el radar…</p><p class="note" id="rnote">Arrastra para mover el mapa. Muestra la lluvia de las últimas 2 horas: mientras más fuerte el color, más intensa.</p><p class="note" style="font-size:.78rem">Radar: <a style="color:#fff" href="https://www.rainviewer.com" target="_blank" rel="noopener">RainViewer</a> · Mapa © <a style="color:#fff" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a></p>';
$('md').classList.add('on');if(RV)clearTimeout(RV.tm);RV=null;
let meta;try{const r=await fetch('https://api.rainviewer.com/public/weather-maps.json');if(!r.ok)throw 0;meta=await r.json()}catch(e){if($('rlbl')){$('rlbl').textContent='Sin conexión al radar';$('rnote').textContent='No pude cargar el radar. Revisa tu conexión e inténtalo de nuevo.'}return}
const past=(meta.radar&&meta.radar.past)||[];if(!$('rmap'))return;if(!past.length){$('rlbl').textContent='Sin datos de radar';return}
const fr=past.filter((_,i)=>(past.length-1-i)%2===0).slice(-7);
RV={z:8,lat:LOC.lat,lon:LOC.lon,host:meta.host,fr,i:0,play:true,tm:null,layers:[]};rvBuild();
const box=$('rmap');let sx=0,sy=0,dr=false;
box.onpointerdown=e=>{dr=true;sx=e.clientX;sy=e.clientY;try{box.setPointerCapture(e.pointerId)}catch(_){}};
box.onpointermove=e=>{if(dr)$('rtiles').style.transform='translate('+(e.clientX-sx)+'px,'+(e.clientY-sy)+'px)'};
box.onpointerup=box.onpointercancel=e=>{if(!dr)return;dr=false;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>2){const c=mer(RV.lat,RV.lon,RV.z),u=unm(c[0]-dx,c[1]-dy,RV.z);RV.lat=Math.max(-80,Math.min(80,u[0]));RV.lon=u[1];rvBuild()}};
$('rz1').onclick=()=>{if(RV.z<10){RV.z++;rvBuild()}};$('rz0').onclick=()=>{if(RV.z>4){RV.z--;rvBuild()}};$('rwide').onclick=()=>{RV.z=5;RV.lat=12.5;RV.lon=-85;rvBuild()};$('rme').onclick=()=>{RV.z=8;RV.lat=LOC.lat;RV.lon=LOC.lon;rvBuild()};
$('rpl').onclick=()=>{RV.play=!RV.play;$('rpl').textContent=RV.play?'⏸':'▶';$('rpl').setAttribute('aria-label',RV.play?'Pausar':'Reproducir');if(RV.play)rvStep()};
RV.tm=setTimeout(rvStep,700)}
