/* El gato: pose según clima y hora. */
const TIP={sun:'¡Ponte protector solar!',cloud:'Día fresquito, ¡disfrútalo!',rain:'¡No olvides el paraguas!',storm:'Mejor quédate en casa',night:'Buenas noches, a dormir',cold:'¡Abrígate bien!'};
let lastPose='';
function drawCat(){const h=nowH(),p=poseFor(h),c=$('cat');
if(p===lastPose&&c.querySelector('img')){const b=c.querySelector('.bub');if(b)b.textContent=tipFor(p,h);return}
lastPose=p;
c.innerHTML='<div class="cpic'+(p==='frio'?' shiver':'')+'"><img src="img/gato-'+p+'.webp" alt="" width="768" height="768"></div><div class="bub">'+tipFor(p,h)+'</div>';
c.querySelector('img').onerror=()=>{lastPose='';drawCatSVG()}}
function drawCatSVG(){
const k=cur,f='#f0a04b';
let eyes='<circle cx="85" cy="88" r="5" fill="#222"/><circle cx="115" cy="88" r="5" fill="#222"/>';
if(k==='sun')eyes='<rect x="68" y="79" width="28" height="17" rx="6" fill="#111"/><rect x="104" y="79" width="28" height="17" rx="6" fill="#111"/><path d="M96 86h8" stroke="#111" stroke-width="3"/><path d="M73 83l8-2" stroke="#fff" stroke-width="2" opacity=".6"/>';
if(k==='night')eyes='<path d="M78 90q7 6 14 0M108 90q7 6 14 0" fill="none" stroke="#222" stroke-width="3" stroke-linecap="round"/>';
if(k==='storm')eyes='<circle cx="85" cy="88" r="7" fill="#fff"/><circle cx="115" cy="88" r="7" fill="#fff"/><circle cx="85" cy="90" r="3.5" fill="#222"/><circle cx="115" cy="90" r="3.5" fill="#222"/>';
const bc=k==='cold'?'#7b5cd6':k==='storm'?'#f4c542':f;
let s='<path d="M148 200q48-6 36-62" fill="none" stroke="'+f+'" stroke-width="16" stroke-linecap="round"/>'+
'<ellipse cx="100" cy="165" rx="55" ry="52" fill="'+bc+'"/>'+
(k==='cold'?'<path d="M50 160h100M48 178h104" stroke="#fff" stroke-width="5" opacity=".5"/>':'')+
'<ellipse cx="80" cy="208" rx="16" ry="10" fill="#f7b868"/><ellipse cx="120" cy="208" rx="16" ry="10" fill="#f7b868"/>'+
'<circle cx="100" cy="90" r="42" fill="'+f+'"/>'+
'<path d="M64 62L68 22L98 50Z" fill="'+f+'"/><path d="M136 62L132 22L102 50Z" fill="'+f+'"/><path d="M71 52L72 33L88 48Z" fill="#f5a9b8"/><path d="M129 52L128 33L112 48Z" fill="#f5a9b8"/>'+
'<path d="M100 48v12M90 50l2 10M110 50l-2 10" stroke="#c97a2b" stroke-width="3" stroke-linecap="round"/>'+eyes+
'<path d="M95 99h10l-5 6z" fill="#f08a9b"/><path d="M100 105q-5 7-11 3M100 105q5 7 11 3" fill="none" stroke="#7a4a1e" stroke-width="2" stroke-linecap="round"/>'+
'<path d="M60 100l-26-4M60 106l-26 4M140 100l26-4M140 106l26 4" stroke="#fff" stroke-width="1.6" opacity=".8"/>';
if(k==='cold')s+='<path d="M62 128q38 22 76 0v14q-38 22-76 0z" fill="#e74c3c"/><rect x="124" y="136" width="12" height="30" rx="4" fill="#e74c3c"/>';
if(k==='rain'||k==='storm')s+='<path d="M25 22Q100 -50 175 22Q155 12 137 22Q119 12 100 22Q81 12 63 22Q45 12 25 22Z" fill="'+(k==='rain'?'#e74c3c':'#34495e')+'"/><path d="M100 22v18" stroke="#555" stroke-width="3" stroke-linecap="round"/>';
if(k==='night')s+='<path d="M70 55L120 -5L138 52Z" fill="#c0392b"/><rect x="66" y="48" width="76" height="10" rx="5" fill="#fff"/><circle cx="122" cy="-6" r="8" fill="#fff"/><text x="150" y="30" font-size="18" fill="#fff">z z</text>';
$('cat').innerHTML='<div class="bub">'+TIP[k]+'</div><svg viewBox="0 -30 200 255" class="'+(k==='cold'?'shiver':'')+'" aria-hidden="true">'+s+'</svg>';
}
