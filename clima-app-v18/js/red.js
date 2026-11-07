/* Datos: descarga del pronóstico, caché sin conexión y actualización. */
let LASTTS=0,STALE=false;
function setUpd(){const b=$('upd');if(!b||!LASTTS)return;b.textContent=(STALE?'📴 Sin conexión · datos de '+(Date.now()-LASTTS<6e4?'hace un momento':ago(Date.now()-LASTTS)):'🔄 Actualizado '+ago(Date.now()-LASTTS));b.classList.toggle('stale',STALE)}
function useCache(key,label){let o=null;try{o=JSON.parse(localStorage.getItem(key))}catch(e){}
if(!o||!o.D||Date.now()-o.ts>432e5)return false;
const h=Math.floor((Date.now()-o.ts)/36e5);D=o.D;D.stale=true;
if(h>0&&D.h24)Object.keys(D.h24).forEach(k=>{D.h24[k]=D.h24[k].slice(h)});
if(D.d7&&new Date(o.ts).toDateString()!==new Date().toDateString()&&D.d7.length>1){D.d7=D.d7.slice(1);D.d7[0].n='Hoy'}
const n=new Date(),hr=n.getHours(),nm=hr*60+n.getMinutes(),mm=t=>{const a=t.split(':');return +a[0]*60+ +a[1]};
D.sun=(D.sr&&D.ss&&nm>mm(D.sr)&&nm<mm(D.ss))?Math.min(.97,Math.max(.03,(nm-mm(D.sr))/(mm(D.ss)-mm(D.sr)))):null;
cur=(hr>=19||hr<5)?'night':(o.cur==='night'?(D.c>=60?'cloud':'sun'):o.cur);
LASTTS=o.ts;STALE=true;$('city').textContent=label;$('g').style.visibility='visible';render();hideSplash();setUpd();return true}
async function load(lat,lon,label){
const KEY='wx:'+(+lat).toFixed(2)+','+(+lon).toFixed(2);
try{
const u='https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon+'&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,cloud_cover,wind_speed_10m,wind_direction_10m,weather_code&hourly=precipitation_probability,uv_index,temperature_2m,apparent_temperature,cloud_cover,precipitation,weather_code,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,precipitation_sum,wind_gusts_10m_max&timezone=auto&forecast_days=7';
const r=await fetch(u);if(!r.ok)throw 0;const j=await r.json();
const c=j.current,h=j.hourly,d=j.daily;LOC={lat:+lat,lon:+lon};
let i=h.time.findIndex(x=>x>c.time);i=i<0?0:Math.max(0,i-1);
const rp=h.precipitation_probability[i]||0,t=Math.round(c.temperature_2m);
const sr=d.sunrise[0],ss=d.sunset[0],a=new Date(sr),b=new Date(ss),now=new Date(c.time);
const p=c.is_day?Math.min(.97,Math.max(.03,(now-a)/(b-a))):null;
cur=pick(c,rp,t);
D={t,f:Math.round(c.apparent_temperature),r:rp,c:Math.round(c.cloud_cover),uv:Math.round(h.uv_index[i]||0),w:Math.round(c.wind_speed_10m),dir:(c.wind_direction_10m+180)%360,h:Math.round(c.relative_humidity_2m),sun:p,hr:+c.time.slice(11,13),
tmax:Math.round(d.temperature_2m_max[0]),tmin:Math.round(d.temperature_2m_min[0]),sr:sr.slice(11,16),ss:ss.slice(11,16),
h24:(()=>{const sl=a=>a.slice(i,i+24),hh=sl(h.time).map(x=>+x.slice(11,13));return{hh,t:sl(h.temperature_2m).map(Math.round),f:sl(h.apparent_temperature).map(Math.round),r:sl(h.precipitation_probability).map(x=>x||0),c:sl(h.cloud_cover).map(Math.round),mm:sl(h.precipitation).map(x=>x||0),w:sl(h.weather_code),e:sl(h.weather_code).map((x,k)=>wi(x,hh[k])),g:sl(h.wind_gusts_10m).map(x=>Math.round(x||0))}})(),
d7:d.time.map((x,k)=>({n:k?new Date(x+'T12:00').toLocaleDateString('es',{weekday:'short'}).replace('.',''):'Hoy',e:wi(d.weather_code[k],12),mx:Math.round(d.temperature_2m_max[k]),mn:Math.round(d.temperature_2m_min[k]),r:d.precipitation_probability_max[k]||0,mm:d.precipitation_sum[k]||0,g:Math.round(d.wind_gusts_10m_max[k]||0)}))};
if(EX.key===KEY){D.aq=EX.aq;D.mar=EX.mar}LASTTS=Date.now();STALE=false;try{localStorage.setItem(KEY,JSON.stringify({ts:LASTTS,cur,D,label}))}catch(e){}
$('city').textContent=label;$('g').style.visibility='visible';render();hideSplash();setUpd();loadExtras(+lat,+lon,KEY);
}catch(e){if(!useCache(KEY,label)){$('s').textContent='No pude obtener el clima. Revisa tu conexión.';hideSplash();setUpd()}}
}
function start(){const v=$('dep').value;
if(v.startsWith('fav:')){const f=favs().find(x=>x.id===v.slice(4));if(f)return load(f.lat,f.lon,f.name)}
if(v==='cus'){const c=cusP();if(c)return load(c.lat,c.lon,c.name)}
if(v!=='gps'&&DEPS[v]){const c=DEPS[v];return load(c[0],c[1],v)}
const def=()=>load(13.48,-88.18,'San Miguel');
navigator.geolocation?navigator.geolocation.getCurrentPosition(p=>load(p.coords.latitude,p.coords.longitude,'Tu ubicación'),def,{timeout:8000,maximumAge:600000}):def()}
function iniciarRed(){
$('upd').onclick=()=>{$('upd').textContent='🔄 Actualizando…';start()};
setInterval(setUpd,30000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&LASTTS&&Date.now()-LASTTS>6e5)start()});
addEventListener('online',()=>{if(STALE)start()});
}
