/* Ajustes: preferencias guardadas en el celular y la pantalla de ajustes. */
const AVISOS_KEYS=['aTormenta','aLluvia','aViento','aCalor','aAire','aOleaje'];
const AVISO_ETIQ=[['aTormenta','⛈️ Tormenta eléctrica'],['aLluvia','🌧️ Lluvia intensa'],['aViento','💨 Viento fuerte'],['aCalor','🥵 Calor intenso'],['aAire','🌫️ Aire dañino'],['aOleaje','🌊 Oleaje fuerte']];
const AJ_BASE={tema:'auto',ahorro:false,ahorroAuto:true,volumen:90,sRain:true,sBirds:true,sNight:true,aTormenta:true,aLluvia:true,aViento:true,aCalor:true,aAire:true,aOleaje:true,lugarInicio:'ultimo'};
let AJ={...AJ_BASE};
function cargarAjustes(){let o=null;try{o=JSON.parse(localStorage.getItem('ajustes'))}catch(e){}
AJ={...AJ_BASE,...(o||{})};
if(!o){try{const t=localStorage.getItem('theme');if(t)AJ.tema=t;AJ.ahorro=localStorage.getItem('saver')==='1'}catch(e){}}}
function guardarAjustes(){try{localStorage.setItem('ajustes',JSON.stringify(AJ))}catch(e){}}
function swHTML(id,txt,on,nota){return '<label class="sw"><span>'+txt+(nota?'<small>'+nota+'</small>':'')+'</span><input type="checkbox" id="'+id+'"'+(on?' checked':'')+'></label>'}
function abrirAjustes(){const mb=$('mb');mb.className='wide';const F=favs(),nW=Object.keys(localStorage).filter(k=>k.startsWith('wx:')).length;
const seg=(id,lst,cur)=>'<div class="chips" id="'+id+'">'+lst.map(t=>'<button data-v="'+t[0]+'"'+(cur===t[0]?' class="on"':'')+'>'+t[1]+'</button>').join('')+'</div>';
mb.innerHTML='<button id="mx" aria-label="Cerrar">✕</button><h3>⚙️ Ajustes</h3><div id="ajw">'
+'<h4 class="ajh">Apariencia</h4>'+seg('ajtema',[['auto','🌓 Auto'],['dark','🌙 Oscuro'],['light','☀️ Claro']],AJ.tema)+'<p class="note">Auto: se oscurece de noche o si tu celular usa modo oscuro.</p>'
+'<h4 class="ajh">Sonido</h4>'+swHTML('ajson','Activar sonido',want,'Se apaga al cerrar la app')+'<div class="sw"><span>Volumen</span><input type="range" id="ajvol" min="10" max="100" step="5" value="'+AJ.volumen+'" aria-label="Volumen"></div>'
+swHTML('ajrain','Lluvia y truenos',AJ.sRain)+swHTML('ajbirds','Pájaros (día cálido)',AJ.sBirds)+swHTML('ajnight','Grillos, ranas y búho (noche)',AJ.sNight)
+'<h4 class="ajh">Batería y animaciones</h4>'+swHTML('ajsaver','Modo ahorro',SAVER,'Sin animaciones ni sonido y menos actualizaciones')+swHTML('ajsauto','Activarlo con batería baja (15 %)',AJ.ahorroAuto)
+'<h4 class="ajh">Avisos del clima</h4>'+AVISO_ETIQ.map(a=>swHTML('aj_'+a[0],a[1],AJ[a[0]])).join('')
+'<h4 class="ajh">Lugares</h4><p class="note" style="margin-bottom:4px">Al abrir la app mostrar:</p>'+seg('ajinicio',[['ultimo','📌 El último lugar'],['gps','📍 Mi ubicación']],AJ.lugarInicio)
+'<p class="note" style="margin:10px 0 2px">Favoritos:</p>'+(F.length?F.map((f,i)=>'<div class="fvr"><span>⭐ '+esc(f.name)+'</span><button data-q="'+i+'" aria-label="Quitar de favoritos">✕</button></div>').join(''):'<p class="note">Aún no tienes favoritos. Búscalos con el botón de abajo y toca la ☆.</p>')
+'<div class="lk"><button class="mapbtn" id="ajbuscar">🔍 Buscar lugar</button></div>'
+'<h4 class="ajh">Datos</h4><p class="note">Pronósticos guardados para usar sin internet: '+nW+(nW===1?' lugar.':' lugares.')+'</p><div class="lk"><button class="mapbtn" id="ajborrar">Borrar pronósticos guardados</button><button class="mapbtn" id="ajreset">Restablecer ajustes</button></div>'
+'<h4 class="ajh">Acerca de</h4><p class="note">Versión '+APP_VERSION+'. Datos: Open-Meteo.com. Aire: CAMS/Copernicus. Oleaje: DWD. Radar: RainViewer. Mapas © OpenStreetMap. Los avisos del clima los calcula la app con el pronóstico y no son avisos oficiales.</p><div class="lk"><a href="https://www.marn.gob.sv" target="_blank" rel="noopener">🏛️ MARN</a><a href="https://x.com/PROCIVILSV" target="_blank" rel="noopener">🚨 Protección Civil</a></div></div>';
$('md').classList.add('on');const w=$('ajw');
const refrescar=()=>{const y=mb.scrollTop;abrirAjustes();mb.scrollTop=y};
w.onchange=e=>{const t=e.target,id=t.id;if(id==='ajson'){setSnd(t.checked);t.checked=want;return}
if(id==='ajsaver'){setSaver(t.checked,true);t.checked=SAVER;return}
const m={ajrain:'sRain',ajbirds:'sBirds',ajnight:'sNight',ajsauto:'ahorroAuto'};
if(m[id]){AJ[m[id]]=t.checked;guardarAjustes();updateSound();return}
if(id.startsWith('aj_')){AJ[id.slice(3)]=t.checked;guardarAjustes();render();return}};
w.oninput=e=>{if(e.target.id==='ajvol'){AJ.volumen=+e.target.value;guardarAjustes();aplicarVolumen()}};
w.onclick=e=>{const b=e.target.closest('button,a');if(!b)return;const p=b.parentElement&&b.parentElement.id;
if(p==='ajtema'){AJ.tema=b.dataset.v;guardarAjustes();render();refrescar();return}
if(p==='ajinicio'){AJ.lugarInicio=b.dataset.v;guardarAjustes();refrescar();return}
if(b.dataset.q!==undefined){quitarFav(+b.dataset.q);refrescar();return}
if(b.id==='ajbuscar'){openSearch();return}
if(b.id==='ajborrar'){if(confirm('¿Borrar los pronósticos guardados? Tendrás que abrir cada lugar con internet para volver a guardarlos.')){Object.keys(localStorage).filter(k=>k.startsWith('wx:')).forEach(k=>localStorage.removeItem(k));EX={};toast('🗑️ Pronósticos guardados borrados');refrescar()}return}
if(b.id==='ajreset'){if(confirm('¿Restablecer todos los ajustes a los valores originales? Tus favoritos no se borran.')){AJ={...AJ_BASE};try{localStorage.removeItem('theme');localStorage.removeItem('saver')}catch(_){}guardarAjustes();setSaver(false,true);if(want)setSnd(false);aplicarVolumen();updateSound();render();toast('↩️ Ajustes restablecidos');refrescar()}}}}
function iniciarAjustes(){$('ajbtn').onclick=abrirAjustes}
