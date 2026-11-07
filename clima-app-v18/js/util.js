/* Utilidades generales: atajo $, textos, avisos emergentes, íconos. */
const $=id=>document.getElementById(id);
function uvTxt(u){return u<=2?'Bajo':u<=5?'Moderado':u<=7?'Alto':u<=10?'Muy alto':'Extremo'}
function uvTip(u){return u<=2?'No necesitas protección.':u<=5?'Protector si estarás mucho tiempo afuera.':u<=7?'Usa protector y busca sombra al mediodía.':'Evita el sol de 10 a 15 h y usa protector.'}
function wi(c,h){let e=c===0?'☀️':c<=2?'⛅':c===3?'☁️':c<=48?'🌫️':c<=67?'🌧️':c<=77?'❄️':c<=82?'🌦️':c>=95?'⛈️':'🌧️';if((h<6||h>=18)&&(e==='☀️'||e==='⛅'))e='🌙';return e}
function mixc(h,k){const n=parseInt(h.slice(1),16),m=[7,11,24];return '#'+[n>>16,n>>8&255,n&255].map((v,i)=>Math.round(v*(1-k)+m[i]*k).toString(16).padStart(2,'0')).join('')}
function toast(t){let e=$('toast');if(!e){e=document.createElement('div');e.id='toast';document.body.appendChild(e)}e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),3200)}
function ago(ms){const m=Math.round(ms/6e4);return m<1?'justo ahora':m<60?'hace '+m+' min':'hace '+Math.floor(m/60)+' h'}
function esc(t){return String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function isDemo(){return /[?&]demo/.test(location.search)}
function rr(x,px,py,w,h,r){x.beginPath();x.moveTo(px+r,py);x.arcTo(px+w,py,px+w,py+h,r);x.arcTo(px+w,py+h,px,py+h,r);x.arcTo(px,py+h,px,py,r);x.arcTo(px,py,px+w,py,r);x.closePath()}
