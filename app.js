/* Constantes: paletas de cada estado del clima, departamentos y versión de la app. */
const APP_VERSION='23';
const S={
sun:{n:'Soleado',e:'☀️',a:'#2e8bd8',b:'#9bd6f7',t:32,f:35,r:5,c:10,uv:10,w:12,dir:60,h:46,sun:.55},
cloud:{n:'Nublado',e:'⛅',a:'#5d7388',b:'#b3c2d0',t:27,f:29,r:25,c:78,uv:4,w:18,dir:120,h:68,sun:.55},
rain:{n:'Lluvia',e:'🌧️',a:'#334a5e',b:'#7189a0',t:24,f:25,r:82,c:92,uv:1,w:22,dir:200,h:88,sun:.55},
storm:{n:'Tormenta',e:'⛈️',a:'#171f2b',b:'#475565',t:23,f:25,r:96,c:100,uv:0,w:38,dir:240,h:92,sun:.55},
night:{n:'Noche',e:'🌙',a:'#0a1030',b:'#2b2f6b',t:22,f:22,r:8,c:15,uv:0,w:6,dir:20,h:70,sun:null},
cold:{n:'Frío',e:'🥶',a:'#6f8fb5',b:'#d4e3f2',t:12,f:9,r:10,c:40,uv:1,w:20,dir:300,h:60,sun:.55}
};
const DEPS={'Ahuachapán':[13.92,-89.85],'Santa Ana':[13.99,-89.56],'Sonsonate':[13.72,-89.72],'La Libertad':[13.68,-89.28],'Chalatenango':[14.03,-88.93],'San Salvador':[13.69,-89.22],'Cuscatlán':[13.72,-88.93],'La Paz':[13.51,-88.87],'Cabañas':[13.87,-88.63],'San Vicente':[13.64,-88.79],'Usulután':[13.35,-88.45],'San Miguel':[13.48,-88.18],'Morazán':[13.70,-88.10],'La Unión':[13.34,-87.84]};

/* Datos del mapa SVG de El Salvador (departamentos). */
const MAP={"vb":"0 0 1010 602","d":{"Santa Ana":{"p":"M321 50L318 50L308 59L301 59L296 56L288 55L282 58L272 70L269 70L267 66L261 61L258 61L251 66L249 73L253 79L254 85L246 96L249 100L255 101L262 106L265 118L272 125L273 131L268 135L232 143L221 148L212 155L203 165L187 193L188 203L200 212L202 217L208 224L208 231L202 249L201 258L208 261L217 260L227 269L235 281L233 290L241 299L247 298L250 289L253 286L257 286L267 293L273 299L278 307L295 311L299 310L301 306L301 300L308 283L309 256L320 247L324 246L327 242L331 208L320 207L312 202L313 189L315 187L316 176L319 171L326 170L334 159L343 157L349 152L356 141L357 130L361 126L369 123L373 118L374 111L378 101L378 96L363 85L359 78L344 63L334 59Z","c":[256,196],"l":["Santa","Ana"],"f":22,"r":0},"San Miguel":{"p":"M661 281L659 284L661 288L660 294L655 299L654 306L648 316L649 326L665 344L684 344L693 354L698 357L707 358L711 362L710 371L712 378L706 385L706 392L710 399L710 409L712 417L707 427L703 431L703 441L705 448L710 452L712 465L715 471L725 483L737 485L748 495L757 496L762 494L766 500L767 505L771 509L769 520L785 521L807 546L815 546L817 538L818 514L821 511L829 515L834 514L837 510L840 500L840 489L844 470L844 461L839 452L838 434L845 425L845 398L842 396L833 396L820 401L814 400L806 393L803 383L798 376L782 376L777 378L769 368L767 363L753 347L751 341L752 334L760 327L769 322L771 316L767 311L756 304L751 298L751 291L756 284L756 278L747 256L744 256L738 260L731 261L725 266L717 265L710 271L704 269L695 270L679 275L671 280Z","c":[767,436],"l":["San","Miguel"],"f":22,"r":0},"Usulután":{"p":"M541 508L541 513L552 519L646 536L654 539L669 548L675 548L678 544L669 535L654 530L650 530L646 524L635 513L626 510L607 513L593 513L588 511L582 511L581 508L603 507L614 504L627 504L639 506L644 510L648 518L653 522L675 529L679 528L680 524L678 518L681 517L685 523L692 529L692 531L689 534L684 535L684 540L687 544L694 548L703 548L710 545L711 540L713 538L720 537L722 533L725 539L723 542L717 545L718 547L724 549L729 549L733 547L743 547L764 551L784 551L803 549L806 547L805 543L785 520L772 519L770 517L772 509L768 505L767 498L764 494L760 493L757 495L751 495L746 493L736 484L728 483L722 480L717 473L712 461L711 452L706 447L704 440L704 432L708 428L713 416L711 408L711 399L707 392L707 385L713 378L711 371L712 361L708 357L698 356L694 354L687 345L682 342L666 344L640 364L638 371L632 378L627 381L617 381L605 395L598 399L597 412L594 423L575 460L572 481L557 499L547 501Z","c":[646,448],"l":["Usulután"],"f":22,"r":0},"Cuscatlán":{"p":"M424 193L419 196L414 208L415 227L411 235L411 241L425 265L421 270L421 274L437 296L443 298L451 308L452 321L462 339L463 351L487 362L496 363L501 359L510 356L519 347L528 323L527 320L514 316L503 303L499 290L489 280L481 267L483 261L492 254L497 245L494 242L487 240L478 240L471 237L465 229L463 220L449 204L440 198Z","c":[453,260],"l":["Cuscatlán"],"f":15,"r":63},"Sonsonate":{"p":"M183 263L179 266L178 275L181 286L173 298L173 305L176 313L169 325L169 329L164 337L162 345L159 348L147 348L142 346L133 337L126 336L118 342L112 351L112 354L150 376L155 382L159 401L166 408L204 408L209 406L218 406L236 413L241 413L248 399L261 387L264 375L276 363L277 347L280 339L287 336L295 327L303 322L307 316L305 313L299 310L285 308L277 305L274 299L269 294L256 285L253 285L251 287L246 297L240 297L233 289L236 283L235 279L228 269L220 261L216 259L208 260L199 258L193 261Z","c":[219,347],"l":["Sonsonate"],"f":22,"r":0},"La Unión":{"p":"M916 254L912 255L904 263L899 265L886 263L879 268L875 268L872 266L868 266L867 268L870 285L869 315L872 322L871 344L860 375L860 381L844 400L842 405L844 425L837 434L838 452L843 461L843 469L839 488L839 500L834 513L830 514L822 510L819 510L817 513L815 544L820 548L879 552L888 549L888 546L883 541L884 536L890 530L920 515L927 509L930 501L928 493L899 470L900 461L905 451L910 445L913 447L916 453L921 454L948 441L956 431L954 418L946 412L939 414L934 413L930 407L931 394L941 371L941 347L945 339L950 334L951 329L949 326L949 322L957 301L960 297L960 294L954 291L937 276L930 273L925 268L922 258Z","c":[910,308],"l":["La","Unión"],"f":22,"r":0},"Chalatenango":{"p":"M344 63L358 78L360 83L369 89L377 97L377 101L371 120L355 128L355 141L349 151L343 156L334 158L326 169L320 169L317 171L310 193L311 202L315 207L327 209L330 208L336 202L348 196L353 196L359 200L374 203L381 199L394 202L399 198L405 202L409 202L426 194L440 199L448 204L460 217L463 222L463 226L470 237L478 241L487 241L495 244L522 244L552 234L571 221L584 220L588 218L587 212L581 207L573 206L569 203L568 195L570 191L570 183L568 180L564 179L557 183L535 183L532 180L530 171L525 161L513 148L506 144L501 144L488 150L484 146L482 135L477 127L464 115L463 105L460 97L454 93L439 90L437 87L438 79L436 73L432 69L425 69L421 73L417 82L412 85L396 80L385 72L367 69L352 62Z","c":[419,142],"l":["Chalatenango"],"f":19,"r":0},"La Paz":{"p":"M463 351L446 367L437 379L424 378L422 381L423 387L427 394L427 400L423 412L417 421L418 429L421 432L426 433L428 437L420 451L422 454L448 470L531 509L535 509L538 495L547 490L551 485L549 467L554 459L553 452L540 438L539 424L541 414L544 408L544 399L539 388L532 378L525 377L521 379L516 379L514 377L514 362L511 356L500 358L495 362L490 362L476 355Z","c":[483,424],"l":["La","Paz"],"f":22,"r":0},"La Libertad":{"p":"M348 195L333 203L328 220L326 242L318 247L316 250L311 252L308 256L307 283L301 297L299 306L300 311L306 317L288 334L282 336L278 340L275 351L276 361L273 366L262 377L259 388L248 398L242 410L242 413L245 415L270 421L328 421L333 423L349 423L377 430L402 441L417 451L420 451L429 435L428 433L422 431L417 423L413 421L402 422L399 419L399 416L395 413L392 404L396 398L395 377L397 372L394 366L395 358L391 353L395 347L392 346L390 348L387 348L382 343L380 331L374 325L377 313L379 311L378 307L380 304L381 292L391 275L391 259L398 252L399 249L388 242L382 243L376 239L373 231L369 226L371 216L370 202L359 199L353 195Z","c":[333,367],"l":["La","Libertad"],"f":22,"r":0},"San Vicente":{"p":"M647 318L643 320L630 319L622 311L613 308L605 302L593 300L581 301L573 297L569 297L564 301L558 301L545 307L529 308L528 321L518 348L512 354L511 358L513 362L514 379L521 380L529 378L533 380L543 399L543 408L538 423L538 433L540 440L553 453L553 459L548 466L550 485L547 489L540 492L537 495L535 500L536 511L541 512L543 506L547 502L557 500L573 481L575 475L576 460L595 423L598 412L599 400L602 397L606 396L617 382L626 382L633 378L640 369L641 364L664 346L664 342L650 327L649 320Z","c":[575,351],"l":["San","Vicente"],"f":22,"r":0},"Morazán":{"p":"M760 225L756 229L756 235L760 240L760 243L757 246L751 247L746 253L746 256L755 278L755 284L750 291L750 298L755 304L769 314L770 318L767 322L751 334L751 346L759 354L760 357L766 363L768 368L773 373L774 379L785 377L799 378L802 383L804 392L816 402L820 402L834 397L845 398L855 389L861 381L862 372L868 358L873 340L874 324L870 315L871 282L868 267L864 264L848 272L844 272L840 264L822 245L817 231L811 226L799 225L776 228Z","c":[821,331],"l":["Morazán"],"f":22,"r":0},"Ahuachapán":{"p":"M201 212L194 205L191 205L187 209L183 210L178 208L168 200L155 199L138 206L128 216L89 243L84 248L77 262L72 267L63 271L56 278L51 289L50 302L58 327L61 330L109 353L112 353L118 343L122 339L127 337L135 339L145 349L162 348L165 338L170 329L171 323L176 315L174 298L182 285L179 269L183 264L196 261L201 257L206 240L210 233L209 225L204 219Z","c":[124,285],"l":["Ahuachapán"],"f":22,"r":0},"Cabañas":{"p":"M661 232L654 227L637 226L607 216L597 216L571 220L565 223L556 231L521 243L498 244L492 253L482 261L480 267L489 281L497 288L505 307L516 318L528 320L529 310L531 308L545 308L555 303L563 302L571 297L581 302L605 303L613 309L623 313L628 319L641 322L650 315L655 306L655 301L662 291L660 284L665 276L665 268L660 257L662 244Z","c":[602,259],"l":["Cabañas"],"f":22,"r":0},"San Salvador":{"p":"M381 198L371 203L370 205L370 216L368 226L378 242L382 244L392 245L396 248L396 251L390 258L388 279L382 285L380 290L380 296L377 304L376 315L373 320L373 325L377 330L377 337L382 347L393 356L393 365L395 367L394 395L391 407L401 423L415 423L422 416L428 400L428 394L423 382L426 379L435 380L442 374L449 364L462 352L463 339L453 321L452 308L443 297L437 295L431 289L422 274L422 270L425 267L425 263L412 241L412 234L416 227L415 208L418 203L418 198L414 198L409 201L403 200L399 197L393 201Z","c":[416,326],"l":["San","Salvador"],"f":21,"r":0}},"geo":[["Guatemala",110,120],["Honduras",800,120],["Océano Pacífico",300,530]]};

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

/* Estado global (estado del clima, datos actuales, lugar) y reglas básicas de hora y lluvia. */
let cur='sun',D=null;
function cs(){return Object.assign({},S[cur],D||{})}
let LOC={lat:13.48,lon:-88.18};
const FH=new URLSearchParams(location.search).get('hora');
function nowH(){if(FH!==null&&FH!==''&&!isNaN(+FH))return Math.max(0,Math.min(23,Math.floor(+FH)));return D&&D.hr!=null&&!D.stale?D.hr:new Date().getHours()}
function isDark(h){return cur==='night'||h>=19||h<5||(D!==null&&D.sun===null)}
function wetNow(s){return s.r>=60||cur==='rain'||cur==='storm'}
function runOK(s,h){return !wetNow(s)&&!isDark(h)&&s.f<34&&s.uv<8&&!(h>=10&&h<16&&s.uv>=6)}
const DEMO=location.search.includes('demo');
function rnow(){return cur==='rain'||cur==='storm'}

/* Ajustes: preferencias guardadas en el celular y la pantalla de ajustes. */
const AVISOS_KEYS=['aTormenta','aLluvia','aViento','aCalor','aAire','aOleaje'];
const AVISO_ETIQ=[['aTormenta','⛈️ Tormenta eléctrica'],['aLluvia','🌧️ Lluvia intensa'],['aViento','💨 Viento fuerte'],['aCalor','🥵 Calor intenso'],['aAire','🌫️ Aire dañino'],['aOleaje','🌊 Oleaje fuerte']];
const AJ_BASE={tema:'auto',ahorro:false,ahorroAuto:true,volumen:90,sRain:true,sBirds:true,sNight:true,gotas:true,inclinar:true,vibrar:true,sGato:true,aTormenta:true,aLluvia:true,aViento:true,aCalor:true,aAire:true,aOleaje:true,lugarInicio:'ultimo'};
let AJ={...AJ_BASE};
function cargarAjustes(){let o=null;try{o=JSON.parse(localStorage.getItem('ajustes'))}catch(e){}
AJ={...AJ_BASE,...(o||{})};
if(!o){try{const t=localStorage.getItem('theme');if(t)AJ.tema=t;AJ.ahorro=localStorage.getItem('saver')==='1'}catch(e){}}}
function guardarAjustes(){try{localStorage.setItem('ajustes',JSON.stringify(AJ))}catch(e){}}
function swHTML(id,txt,on,nota){return '<label class="sw"><span>'+txt+(nota?'<small>'+nota+'</small>':'')+'</span><input type="checkbox" id="'+id+'"'+(on?' checked':'')+'></label>'}
function abrirAjustes(){const mb=$('mb');mb.className='wide';const F=favs(),nW=Object.keys(localStorage).filter(k=>k.startsWith('wx:')).length;
const seg=(id,lst,cur)=>'<div class="chips" id="'+id+'">'+lst.map(t=>'<button data-v="'+t[0]+'"'+(cur===t[0]?' class="on"':'')+'>'+t[1]+'</button>').join('')+'</div>';
mb.innerHTML='<button id="mx" aria-label="Cerrar">✕</button><h3>⚙️ Ajustes</h3><div id="ajw">'
+'<h4 class="ajh">🎨 Apariencia</h4>'+seg('ajtema',[['auto','🌓 Auto'],['dark','🌙 Oscuro'],['light','☀️ Claro']],AJ.tema)+'<p class="note">Auto: se oscurece de noche o si tu celular usa modo oscuro.</p>'
+'<h4 class="ajh">🔊 Sonido</h4>'+swHTML('ajson','Activar sonido',want,'Se apaga al cerrar la app')+'<div class="sw"><span>Volumen</span><input type="range" id="ajvol" min="10" max="100" step="5" value="'+AJ.volumen+'" aria-label="Volumen"></div>'
+swHTML('ajgato','El gato maúlla al tocarlo',AJ.sGato)+swHTML('ajrain','Lluvia y truenos',AJ.sRain)+swHTML('ajbirds','Pájaros (día cálido)',AJ.sBirds)+swHTML('ajnight','Grillos, ranas y búho (noche)',AJ.sNight)
+'<h4 class="ajh">🔋 Batería y animaciones</h4>'+swHTML('ajsaver','Modo ahorro',SAVER,'Sin animaciones ni sonido y menos actualizaciones')+swHTML('ajsauto','Activarlo con batería baja (15 %)',AJ.ahorroAuto)+swHTML('ajgotas','Gotas en el cristal (con lluvia)',AJ.gotas)+swHTML('ajinclinar','Efecto 3D al inclinar el celular',AJ.inclinar)+swHTML('ajvibrar','Vibrar con los truenos',AJ.vibrar)
+'<h4 class="ajh">⚠️ Avisos del clima</h4>'+AVISO_ETIQ.map(a=>swHTML('aj_'+a[0],a[1],AJ[a[0]])).join('')
+'<h4 class="ajh">📍 Lugares</h4><p class="note" style="margin-bottom:4px">Al abrir la app mostrar:</p>'+seg('ajinicio',[['ultimo','📌 El último lugar'],['gps','📍 Mi ubicación']],AJ.lugarInicio)
+'<p class="note" style="margin:10px 0 2px">Favoritos:</p>'+(F.length?F.map((f,i)=>'<div class="fvr"><span>⭐ '+esc(f.name)+'</span><button data-q="'+i+'" aria-label="Quitar de favoritos">✕</button></div>').join(''):'<p class="note">Aún no tienes favoritos. Búscalos con el botón de abajo y toca la ☆.</p>')
+'<div class="lk"><button class="mapbtn" id="ajbuscar">🔍 Buscar lugar</button></div>'
+'<h4 class="ajh">💾 Datos</h4><p class="note">Pronósticos guardados para usar sin internet: '+nW+(nW===1?' lugar.':' lugares.')+'</p><div class="lk"><button class="mapbtn" id="ajborrar">Borrar pronósticos guardados</button><button class="mapbtn" id="ajreset">Restablecer ajustes</button></div>'
+'<h4 class="ajh">ℹ️ Acerca de</h4><p class="note">Versión '+APP_VERSION+'. Datos: Open-Meteo.com. Aire: CAMS/Copernicus. Oleaje: DWD. Radar: RainViewer. Mapas © OpenStreetMap. Los avisos del clima los calcula la app con el pronóstico y no son avisos oficiales.</p><div class="lk"><a href="https://www.marn.gob.sv" target="_blank" rel="noopener">🏛️ MARN</a><a href="https://x.com/PROCIVILSV" target="_blank" rel="noopener">🚨 Protección Civil</a></div></div>';
$('md').classList.add('on');const w=$('ajw');
const refrescar=()=>{const y=mb.scrollTop;abrirAjustes();mb.scrollTop=y};
w.onchange=e=>{const t=e.target,id=t.id;if(id==='ajson'){setSnd(t.checked);t.checked=want;return}
if(id==='ajsaver'){setSaver(t.checked,true);t.checked=SAVER;return}
const m={ajrain:'sRain',ajbirds:'sBirds',ajnight:'sNight',ajsauto:'ahorroAuto',ajgato:'sGato',ajgotas:'gotas',ajinclinar:'inclinar',ajvibrar:'vibrar'};
if(m[id]){AJ[m[id]]=t.checked;guardarAjustes();updateSound();kickCristal();return}
if(id.startsWith('aj_')){AJ[id.slice(3)]=t.checked;guardarAjustes();refrescarAvisos();return}};
w.oninput=e=>{if(e.target.id==='ajvol'){AJ.volumen=+e.target.value;guardarAjustes();aplicarVolumen()}};
w.onclick=e=>{const b=e.target.closest('button,a');if(!b)return;const p=b.parentElement&&b.parentElement.id;
if(p==='ajtema'){AJ.tema=b.dataset.v;guardarAjustes();applyTheme(cs());refrescar();return}
if(p==='ajinicio'){AJ.lugarInicio=b.dataset.v;guardarAjustes();refrescar();return}
if(b.dataset.q!==undefined){quitarFav(+b.dataset.q);refrescar();return}
if(b.id==='ajbuscar'){openSearch();return}
if(b.id==='ajborrar'){if(confirm('¿Borrar los pronósticos guardados? Tendrás que abrir cada lugar con internet para volver a guardarlos.')){Object.keys(localStorage).filter(k=>k.startsWith('wx:')).forEach(k=>localStorage.removeItem(k));EX={};toast('🗑️ Pronósticos guardados borrados');refrescar()}return}
if(b.id==='ajreset'){if(confirm('¿Restablecer todos los ajustes a los valores originales? Tus favoritos no se borran.')){AJ={...AJ_BASE};try{localStorage.removeItem('theme');localStorage.removeItem('saver')}catch(_){}guardarAjustes();setSaver(false,true);if(want)setSnd(false);aplicarVolumen();updateSound();render();toast('↩️ Ajustes restablecidos');refrescar()}}}}
function refrescarAvisos(){const g2=$('g'),c=g2&&g2.querySelector('.card.wide');if(c&&/Avisos del clima/.test(c.textContent))c.outerHTML=alertsHTML(cs())}
function iniciarAjustes(){$('ajbtn').onclick=abrirAjustes}

/* Tema claro/oscuro (la elección vive en AJ.tema, ver ajustes.js). */
function isDarkUI(){return AJ.tema==='dark'||(AJ.tema==='auto'&&(cur==='night'||matchMedia('(prefers-color-scheme: dark)').matches))}
function applyTheme(s){const dk=isDarkUI(),k=dk&&cur!=='night'?.62:0,a=k?mixc(s.a,k):s.a,b=k?mixc(s.b,k):s.b,r=document.documentElement;r.style.setProperty('--c1',a);r.style.setProperty('--c2',b);r.classList.toggle('dk',dk);
const m=document.querySelector('meta[name=theme-color]');if(m)m.content=a}
function iniciarTema(){
try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(AJ.tema==='auto')render()})}catch(e){}
}

/* Modo ahorro de batería (la preferencia vive en AJ.ahorro, ver ajustes.js). */
let SAVER=false;
function setSaver(on,silent){SAVER=on;AJ.ahorro=on;guardarAjustes();document.documentElement.classList.toggle('sv',on);
if(on){if(want)setSnd(false);kick()}else kick();kickCristal();if(!silent)toast(on?'🔋 Modo ahorro: sin animaciones ni sonido, menos actualizaciones':'⚡ Modo ahorro apagado')}
function iniciarAhorro(){
SAVER=AJ.ahorro;
document.documentElement.classList.toggle('sv',SAVER);
try{navigator.getBattery&&navigator.getBattery().then(b=>{const chk=()=>{if(AJ.ahorroAuto&&!SAVER&&!b.charging&&b.level<=.15&&!sessionStorage.getItem('svAuto')){sessionStorage.setItem('svAuto','1');setSaver(true,true);toast('🔋 Batería baja: activé el modo ahorro')}};chk();b.addEventListener('levelchange',chk)})}catch(e){}
}

/* Reglas: qué estado, gato, mensaje, avisos y actividades mostrar según clima y hora. */
function syn24(s){const h0=nowH(),A={hh:[],t:[],f:[],r:[],c:[],mm:[],e:[],w:[],g:[]},code=cur==='storm'?95:cur==='rain'?63:cur==='cloud'?3:cur==='cold'?2:0,base=Math.cos((h0-15)/24*2*Math.PI);
for(let i=0;i<24;i++){const hh=(h0+i)%24,t=Math.round(s.t+4*(Math.cos((hh-15)/24*2*Math.PI)-base)),r=Math.max(0,Math.min(100,Math.round(s.r+18*Math.sin(i*.7+s.t)*(s.r>20?1:.3))));
A.hh.push(hh);A.t.push(t);A.f.push(t+(s.f-s.t));A.r.push(r);A.c.push(Math.max(0,Math.min(100,Math.round(s.c+12*Math.sin(i*.5)))));A.mm.push(r>=60?(cur==='storm'?4+8*Math.abs(Math.sin(i)):1+2*Math.abs(Math.sin(i))):0);A.w.push(code);A.e.push(wi(code,hh));A.g.push(Math.round(s.w*1.5+6*Math.abs(Math.sin(i))))}
return A}
function syn7(s){const dn=new Date().getDay(),nm=['dom','lun','mar','mié','jue','vie','sáb'],dr=[0,-10,12,-5,8,-15,5],dt=[0,-1,1,-2,0,1,-1];
return dr.map((x,k)=>{const r=Math.max(0,Math.min(100,s.r+x)),mx=s.t+dt[k];return{n:k?nm[(dn+k)%7]:'Hoy',e:r>=60?'🌧️':r>=30?'⛅':'☀️',mx,mn:mx-9,r,mm:r>=60?8:0,g:Math.round(s.w*1.4)}})}
function alertsFor(s){const H=s.h24||syn24(s),o=[],mmMax=Math.max(...H.mm),sum=H.mm.reduce((a,b)=>a+b,0),gMax=Math.max(...H.g),fMax=Math.max(...H.f),at=i=>'cerca de las '+H.hh[i]+' h';
const st=H.w.findIndex(c=>c>=95);if(st>=0)o.push({k:'aTormenta',l:'no',i:'⛈️',t:'Posible tormenta eléctrica',x:'Se esperan tormentas '+at(st)+'. Evita espacios abiertos y no te refugies bajo árboles ni postes.'});
if(mmMax>=7.6||sum>=50){const k=H.mm.indexOf(mmMax);o.push({k:'aLluvia',l:mmMax>=20||sum>=100?'no':'ojo',i:'🌧️',t:'Lluvia intensa',x:'Hasta '+Math.round(mmMax)+' mm en una hora ('+at(k)+') y unos '+Math.round(sum)+' mm en 24 h. Cuidado con calles inundadas y laderas.'})}
if(gMax>=45){const k=H.g.indexOf(gMax);o.push({k:'aViento',l:gMax>=65?'no':'ojo',i:'💨',t:'Viento fuerte',x:'Ráfagas de hasta '+gMax+' km/h '+at(k)+'. Asegura objetos sueltos y ten cuidado con ramas y láminas.'})}
if(fMax>=38){const k=H.f.indexOf(fMax);o.push({k:'aCalor',l:fMax>=41?'no':'ojo',i:'🥵',t:'Calor intenso',x:'Sensación térmica de hasta '+Math.round(fMax)+'° '+at(k)+'. Hidrátate y evita el sol de 11 a 15 h.'})}
if(s.aq&&s.aq.max>=151)o.push({k:'aAire',l:s.aq.max>=201?'no':'ojo',i:'🌫️',t:'Aire dañino',x:'El índice de calidad del aire llegaría a '+s.aq.max+'. Reduce el ejercicio al aire libre y usa mascarilla si hay humo.'});
if(s.mar&&s.mar.km<=30&&Math.max(...s.mar.h)>=2.5)o.push({k:'aOleaje',l:'ojo',i:'🌊',t:'Oleaje fuerte en la costa',x:'Olas de hasta '+Math.max(...s.mar.h).toFixed(1)+' m. Evita entrar al mar y las rocas cerca del agua.'});
return o.filter(a=>AJ[a.k])}
function alertsHTML(s){const A=alertsFor(s);
return '<div class="card wide"><h2>⚠️ Avisos del clima</h2>'+(A.length?A.map(a=>'<div class="al '+a.l+'"><span class="ic">'+a.i+'</span><div><b>'+(a.l==='no'?'Alerta: ':'Precaución: ')+a.t+'</b><small>'+a.x+'</small></div></div>').join(''):'<div class="al ok"><span class="ic">✅</span><div><b>Sin avisos por ahora</b><small>'+(AVISOS_KEYS.some(k=>!AJ[k])?'No hay avisos activos por ahora. Tienes algunos avisos desactivados en Ajustes.':'Con el pronóstico actual no se esperan tormentas, lluvias intensas, viento fuerte ni calor extremo en las próximas 24 horas.')+'</small></div></div>')+
'<p class="note">Estos avisos los calcula la app con el pronóstico; no son avisos oficiales. Para alertas oficiales (verde, amarilla, naranja o roja):</p><div class="lk"><a href="https://www.marn.gob.sv" target="_blank" rel="noopener">🏛️ MARN</a><a href="https://x.com/PROCIVILSV" target="_blank" rel="noopener">🚨 Protección Civil</a></div></div>'}
function stateLabel(s){if(cur==='night'){const h=nowH();if(h<5)return '🌙 Madrugada';if(h<8)return '🌅 Amanecer'}return s.e+' '+s.n}
function late(h){return h>=22?'Ya es tarde':'Es de madrugada'}
function poseFor(h){const s=cs();
if(h>=22||h<5)return 'noche';
if(wetNow(s))return 'lluvia';
if(isDark(h)){if(h>=5&&h<8)return 'manana';return (h>=17&&h<22)?'casa':'noche'}
if(cur==='cold')return 'frio';
if(((h>=6&&h<8)||(h>=16&&h<19))&&runOK(s,h))return 'ejercicio';
if(h>=10&&h<16&&(cur==='sun'||s.uv>=6))return 'sol';
if(h>=16&&h<19&&(s.uv>=8||s.f>=34))return 'sol';
return 'manana'}
function tipFor(p,h){const rain=wetNow(cs());
if(p==='noche'){if(h>=22||h<5)return rain?'Llueve afuera. ¡A dormir tranquilo!':late(h)+': ¡a dormir!';return rain?'Anocheció y llueve: mejor en casa':'Ya anocheció, ¡a relajarse!'}
if(p==='casa')return '¡Ya anocheció! Chocolatito y a relajarse';
if(p==='lluvia')return cur==='storm'?'Mejor quédate en casa':cur==='rain'?'¡No olvides el paraguas!':'Hay mucha probabilidad de lluvia: lleva paraguas';
if(p==='frio')return '¡Abrígate bien!';
if(p==='sol')return '¡Ponte protector solar!';
if(p==='ejercicio')return 'Buen momento para moverte. ¡Hidrátate!';
if(h<10)return isDark(h)?'Está amaneciendo: ¡buenos días! Un cafecito y a empezar':'¡Buenos días! Un cafecito y a empezar';
return cur==='cloud'?'Día fresquito, ¡disfrútalo!':'Buena tarde, ¡toma agua!'}
function pick(c,rp,t){const wc=c.weather_code;
if(wc>=95)return 'storm';
const cc=c.cloud_cover==null?100:c.cloud_cover;
if(((wc>=51&&wc<=67)||(wc>=80&&wc<=82))&&cc>=25)return 'rain';
if(rp>=60&&cc>=50)return 'rain';
if(!c.is_day)return 'night';
if(t<=18)return 'cold';
if(c.cloud_cover>=60)return 'cloud';
return 'sun'}
function uvNote(s){const h=nowH();if(isDark(h))return h<12?'Todavía no sale el sol: no hay radiación UV.':'Es de noche: no hay radiación UV.';if(rnow()&&s.uv<=5)return 'Con lluvia y nubes el UV baja.';return uvTip(s.uv)}
function sunNote(s){const h=nowH();if(s.sun===null||(!D&&isDark(h)))return h<12?'Todavía no sale el sol: amanece a las '+(s.sr||'5:41')+'.':'Ya se ocultó el sol. Amanece a las '+(s.sr||'5:41')+'.';return 'Atardece a las '+(s.ss||'17:36')+'.'+(rnow()||s.c>=85?' Hoy el sol está tapado.':'')}
function actsHTML(s){const st=cur==='storm',rn=rnow(),lk=s.r>=60&&!rn,hot=s.f>=34,uv=s.uv,wd=s.w>=40,h=nowH(),zz=h>=22||h<5,dk=isDark(h),H=s.h24||syn24(s),soon=!rn&&(H.mm.slice(1,7).some(v=>v>=.5)||H.r.slice(1,7).some(v=>v>=60)),sunny=hot||uv>=8||(h>=10&&h<16&&uv>=6),ss=s.ss||'17:36',tarde=late(h),L=[],hid=[];
L.push(['🏃','Correr o hacer ejercicio afuera',(zz||rn)?'no':(dk||sunny||lk||soon)?'ojo':'ok',
zz?(rn?tarde+' y está lloviendo: lo mejor es dormir. Deja el ejercicio para cuando pare la lluvia y sea de día.':tarde+': lo mejor es dormir. Deja el ejercicio para después de las 5 de la mañana.')
:rn?(st?'Hay tormenta'+(dk?' y poca luz':'')+': no hagas ejercicio afuera. Entrena bajo techo.':dk?'Está lloviendo y hay poca luz: no hagas ejercicio afuera. Entrena bajo techo.':'Está lloviendo: el piso resbala. Entrena bajo techo.')
:dk?'Hay poca luz: mejor entrena bajo techo o en una zona iluminada, con ropa visible.'+((lk||soon)?' Además puede llover pronto.':'')
:(lk||soon)?'Puede llover pronto: si sales, hazlo cerca de un lugar techado.'
:sunny?'Calor o sol muy fuerte: sal temprano o al atardecer y toma agua.':'Buen momento para moverte. Hidrátate.']);
L.push(['🏞️','Cruzar ríos o quebradas',(rn||s.r>=40||dk)?'no':soon?'ojo':'ok',
rn?'Está lloviendo: ríos y quebradas pueden crecer de golpe, aunque parezcan bajos. No los cruces (MARN y Protección Civil).'+(dk?' De noche es aún más difícil ver el agua.':'')
:s.r>=40?'Hay probabilidad de lluvia: ríos y quebradas pueden crecer rápido. Evita cruzarlos.'
:dk?'De noche no se ve cómo viene el agua: no cruces ríos ni quebradas.'
:soon?'Podría llover pronto, incluso en zonas altas: revisa el río antes de cruzar.':'Sin lluvia cerca. Aun así, no cruces si el río viene crecido o turbio.']);
if(st||rn||wd||lk||soon)L.push(['🏠','Dónde resguardarte',st?'no':(wd||rn)?'ojo':'ok',
st?'Hay tormenta eléctrica: no te refugies bajo árboles, postes, muros ni estructuras metálicas. Busca un edificio cerrado (MARN).'
:rn?'Está lloviendo: resguárdate en un lugar techado y firme, no bajo árboles, postes ni vallas: pueden caer ramas o cables.'
:wd?'Hay viento fuerte: aléjate de árboles, postes y vallas porque pueden caer ramas o láminas.'
:'Si empieza a llover, busca un lugar techado; evita árboles y postes.']);
else hid.push('Dónde resguardarte (sin tormenta ni viento fuerte)');
L.push(['⛰️','Excursiones y zonas de ladera',(rn||s.r>=80||dk)?'no':(s.r>=40||soon||h>=15)?'ojo':'ok',
rn?'Con lluvia el terreno se vuelve inestable y hay riesgo de deslizamientos y derrumbes. Evita laderas y caminos de montaña (MARN).'
:s.r>=80?'Hay mucha probabilidad de lluvia: el terreno puede volverse inestable. Evita laderas y caminos de montaña (MARN).'
:dk?'Con poca luz aumenta el riesgo de caídas y de perderse: deja las excursiones para el día.'
:(s.r>=40||soon)?'Puede llover: el terreno se vuelve resbaloso. Revisa el pronóstico y avisa a alguien tu ruta.'
:h>=15?'Queda poca luz del día: regresa antes de las '+ss+'.':'Buen momento para salir; revisa el pronóstico antes de ir.']);
L.push(['🚗','Manejar o ir en moto',(rn||dk||lk)?'ojo':'ok',
zz?(rn?tarde+' y está lloviendo: poca visibilidad y sueño al volante. Si puedes, espera a que pare o amanezca.':tarde+': hay poca visibilidad y sueño al volante. Si puedes, espera a que amanezca.')
:rn?(dk?'Está lloviendo y hay poca luz: reduce la velocidad, enciende las luces y evita calles inundadas.':'Está lloviendo: reduce la velocidad, enciende las luces y evita calles inundadas.')
:dk?'Poca luz: enciende las luces y maneja con calma.'+(lk?' Puede llover.':'')
:lk?'Puede llover: ten las luces listas y maneja con cuidado en pavimento mojado.':'Sin lluvia fuerte; maneja con normalidad.']);
if(!dk&&!rn)L.push(['☀️','Estar al sol sin protección',uv>=8?'no':uv>=3?'ojo':'ok',uv>=8?'UV muy alto: evita el sol directo de 10 a 15 h.':uv>=3?'Usa protector solar y gorra.':'UV bajo: no necesitas protección especial.']);
else hid.push('Estar al sol sin protección ('+(dk?'no hay sol':'está lloviendo')+')');
if(!dk&&!rn&&s.f>=30)L.push(['🥵','Esfuerzo largo bajo el calor',s.f>=38?'no':hot?'ojo':'ok',s.f>=38?'Sensación de calor extrema: evita esfuerzo y busca lugares ventilados.':hot?'Hidrátate, busca sombra y evita el esfuerzo de 11 a 15 h.':'Calor moderado: toma agua y descansa a la sombra de vez en cuando.']);
else hid.push('Esfuerzo largo bajo el calor ('+(dk?'no hay sol':rn?'la lluvia refresca':'temperatura llevadera')+')');
const o={no:0,ojo:1,ok:2},lb={no:'Evitar',ojo:'Con precaución',ok:'Bien'};L.sort((a,b)=>o[a[2]]-o[b[2]]);
return '<div class="card wide"><h2>🚦 Actividades según el clima y la hora</h2>'+L.map(x=>'<div class="act"><span class="ic">'+x[0]+'</span><div><b>'+x[1]+'<span class="st '+x[2]+'">'+lb[x[2]]+'</span></b><small>'+x[3]+'</small></div></div>').join('')+(hid.length?'<p class="note">Ahora no aplican: '+hid.join(' · ')+'.</p>':'')+'<p class="note">Basado en recomendaciones generales del MARN, Protección Civil y la OMS. Para alertas oficiales, consulta al Ministerio de Medio Ambiente (@MedioAmbienteSV).</p></div>'}

/* El gato: pose según clima y hora. */
const TIP={sun:'¡Ponte protector solar!',cloud:'Día fresquito, ¡disfrútalo!',rain:'¡No olvides el paraguas!',storm:'Mejor quédate en casa',night:'Buenas noches, a dormir',cold:'¡Abrígate bien!'};
let lastPose='';
function drawCat(){const h=nowH(),p=poseFor(h),c=$('cat');
if(p===lastPose&&c.querySelector('img')){const b=c.querySelector('.bub');if(b)b.textContent=tipFor(p,h);return}
lastPose=p;
c.innerHTML='<div class="cpic'+(p==='frio'?' shiver':'')+'" role="button" tabindex="0" aria-label="Acariciar al gato"><img src="gato-'+p+'.webp" alt="" width="768" height="768"></div><div class="bub">'+tipFor(p,h)+'</div>';
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

const GATO_MSG={gen:['¡Miau!','¡Cosquillas!','Prrrr… 😻','¿Ya es hora de comer?','¡Me gusta que me toques!'],sol:['¡Con estilo, ¿no? 😎','¡Qué calor!'],lluvia:['¡Cuidado con mi paraguas! ☂️','¡No me mojes!'],frio:['Brrr… ¡qué frío!','¿Me prestas tu abrigo?'],noche:['Zzz… ¡me despertaste!','Shhh… estoy durmiendo 😴'],manana:['¿Me das un cafecito? ☕','¡Buenos días!'],ejercicio:['¡Uno, dos, uno, dos! 💪','¡Casi llego a la meta!'],casa:['¡Mi chocolatito! 🍫','Película y manta, ¡qué rico!']};
let gatoMsgT=null,gatoUlt='';
function corazones(c){const n=1+(Math.random()*2|0);for(let i=0;i<n;i++){const e=document.createElement('span');e.className='cz';e.textContent=['❤️','💖','😻'][Math.random()*3|0];e.style.left=(30+Math.random()*40)+'%';e.style.animationDelay=(i*.12)+'s';c.appendChild(e);setTimeout(()=>e.remove(),1500)}}
function tocarGato(){const c=$('cat'),pic=c.querySelector('.cpic'),b=c.querySelector('.bub');if(!pic)return;
pic.classList.remove('salto');void pic.offsetWidth;pic.classList.add('salto');setTimeout(()=>pic.classList.remove('salto'),600);
const lst=(GATO_MSG[lastPose]||[]).concat(GATO_MSG.gen);let m;do{m=lst[Math.random()*lst.length|0]}while(m===gatoUlt&&lst.length>1);gatoUlt=m;
if(b){b.textContent=m;clearTimeout(gatoMsgT);gatoMsgT=setTimeout(()=>{const bb=$('cat').querySelector('.bub');if(bb)bb.textContent=tipFor(lastPose,nowH())},3200)}
miau();if(!(SAVER||NOANIM))corazones(c)}
function iniciarGato(){const c=$('cat');c.addEventListener('click',e=>{if(e.target.closest('.cpic'))tocarGato()});c.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest('.cpic')){e.preventDefault();tocarGato()}})}

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
let HORA_R=-1;
function render(){const sy=window.scrollY;renderInner();HORA_R=nowH();if(sy>0)window.scrollTo(0,sy)}
function renderInner(){
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
function detail(k,s){let t,p,sc='';const vis='<canvas id="dvc" aria-hidden="true"></canvas>';
if(k==='r'){t='💧 Probabilidad de lluvia';const n=Math.round(s.r/100*14);

p=(rnow()?'Está lloviendo ahora. ':'Es la probabilidad de lluvia medible en esta hora. ')+(rnow()?'Lleva paraguas y evita ríos y quebradas.':s.r<20?'Es baja: puedes planear al aire libre.':s.r<60?'Hay posibilidad de chubascos: ten un plan B.':'Es alta: lleva paraguas y evita ríos y quebradas.');
sc=scl(['0–19 % baja','20–59 % posible','60 %+ alta'],s.r<20?0:s.r<60?1:2)}
else if(k==='c'){t='☁️ Nubosidad';const n=Math.max(1,Math.round(s.c/25));

p='Porcentaje del cielo cubierto por nubes. '+(s.c<25?(isDark(nowH())?'El cielo está casi despejado: buena noche para ver las estrellas.':'El cielo está casi despejado.'):s.c<70?'Hay nubes y claros.':'El cielo está cubierto: baja el sol directo y sube la humedad.');
sc=scl(['0–24 % despejado','25–69 % parcial','70 %+ cubierto'],s.c<25?0:s.c<70?1:2)}
else if(k==='u'){t='🕶️ Índice UV';const u=s.uv;

p=isDark(nowH())?'Es de noche: no hay radiación UV. (Guía general de la OMS.)':(rnow()&&u<=5?'Con lluvia y nubes el UV baja, pero no desaparece del todo. ':'')+(u<=2?'No necesitas protección especial.':u<=5?'Usa protector y sombrero si estarás varias horas afuera.':u<=7?'Alto: protector, gorra y gafas; busca sombra al mediodía.':u<=10?'Muy alto: evita el sol directo de 10 a 15 h y reaplica protector cada 2 horas.':'Extremo: evita salir al sol del mediodía y cúbrete.')+' (Guía general de la OMS.)';
sc=scl(['0–2 bajo','3–5 moderado','6–7 alto','8–10 muy alto','11+ extremo'],u<=2?0:u<=5?1:u<=7?2:u<=10?3:4)}
else if(k==='w'){t='🍃 Viento';const d=Math.max(.8,18/Math.max(s.w,2)),f=(s.dir+180)%360,cd=['N','NE','E','SE','S','SO','O','NO'][Math.round(f/45)%8];

p=s.w+' km/h, del '+cd+'. '+(s.w<12?'Brisa ligera.':s.w<29?'Viento moderado: se mueven hojas y ramas pequeñas.':s.w<50?'Viento fuerte: asegura objetos sueltos y aléjate de árboles y vallas.':'Viento muy fuerte: quédate en un lugar seguro.');
sc=scl(['menos de 12 ligero','12–28 moderado','29–49 fuerte','50+ muy fuerte'],s.w<12?0:s.w<29?1:s.w<50?2:3)}
else if(k==='h'){t='💦 Humedad';

p=s.h<40?'Aire seco: hidrátate y cuida tu piel.':s.h<70?'Humedad cómoda.':'Aire muy húmedo: se siente más calor (sensación de '+s.f+'°)'+(rnow()?' y la lluvia mantiene el ambiente húmedo.':' y puede haber lluvia.');
sc=scl(['menos de 40 % seco','40–69 % cómodo','70 %+ húmedo'],s.h<40?0:s.h<70?1:2)}
else{t='🌅 Sol';p='Amanece a las '+(s.sr||'5:41')+' y atardece a las '+(s.ss||'17:36')+'. '+((s.sun===null||(!D&&isDark(nowH())))?(nowH()<12?'Todavía no sale el sol.':'Ahora es de noche.'):'El punto amarillo marca dónde va el sol ahora.'+(rnow()||s.c>=85?' Hoy está tapado por las nubes.':''))}
return {t,vis,p,sc}}
function openM(k,s){const d=detail(k,s);$('mb').className='';$('mb').innerHTML='<button id="mx" aria-label="Cerrar">✕</button><h3>'+d.t+'</h3><div class="vis">'+d.vis+'</div><p>'+d.p+'</p>'+d.sc;$('md').classList.add('on');iniciarEscena(k,s)}
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

/* Escenas animadas de las ventanas de detalle (lluvia, nubes, UV, viento, humedad, sol). Se dibujan con los datos reales. */
const NUBE_CLARA=['rgba(255,255,255,.97)','rgba(215,230,245,.9)'],NUBE_OSCURA=['rgba(135,145,165,.97)','rgba(85,95,115,.9)'];
function nubeDib(c,x,y,r,a,col){c.save();c.globalAlpha=a;const g1=c.createRadialGradient(x,y-r*.3,r*.1,x,y,r*1.4);g1.addColorStop(0,col[0]);g1.addColorStop(1,col[1]);c.fillStyle=g1;
for(const b of [[-.9,.15,.62],[-.35,-.2,.78],[.3,-.1,.7],[.85,.18,.58],[0,.25,.8]]){c.beginPath();c.arc(x+b[0]*r,y+b[1]*r,b[2]*r,0,7);c.fill()}c.restore()}
function sol(c,x,y,r,t,k){const R2=r*(3+k*2.5),g1=c.createRadialGradient(x,y,r*.3,x,y,R2);g1.addColorStop(0,'rgba(255,240,170,'+(.55*Math.min(1,.4+k))+')');g1.addColorStop(1,'rgba(255,226,120,0)');c.fillStyle=g1;c.beginPath();c.arc(x,y,R2,0,7);c.fill();
c.save();c.translate(x,y);c.rotate(t*.6);for(let i=0;i<14;i++){c.rotate(Math.PI/7);const L=r*(1.6+k*1.1)+Math.sin(t*3+i)*3;c.fillStyle='rgba(255,236,150,'+(.5+.3*Math.sin(t*2+i))+')';c.beginPath();c.moveTo(r*1.25,-2.5);c.lineTo(r+L,-.8);c.lineTo(r+L,.8);c.lineTo(r*1.25,2.5);c.fill()}c.restore();
const g2=c.createRadialGradient(x-r*.3,y-r*.3,r*.2,x,y,r);g2.addColorStop(0,'#fffbe0');g2.addColorStop(.6,'#ffe066');g2.addColorStop(1,'#ffb93b');c.fillStyle=g2;c.beginPath();c.arc(x,y,r,0,7);c.fill()}
function luna(c,x,y,r){const g1=c.createRadialGradient(x,y,r*.5,x,y,r*3.2);g1.addColorStop(0,'rgba(225,232,255,.35)');g1.addColorStop(1,'rgba(225,232,255,0)');c.fillStyle=g1;c.beginPath();c.arc(x,y,r*3.2,0,7);c.fill();
const g2=c.createRadialGradient(x-r*.3,y-r*.3,r*.2,x,y,r);g2.addColorStop(0,'#fffdf0');g2.addColorStop(1,'#e3dfc0');c.fillStyle=g2;c.beginPath();c.arc(x,y,r,0,7);c.fill();c.fillStyle='rgba(150,148,125,.28)';[[-.3,-.2,.22],[.28,.15,.28],[-.05,.45,.15]].forEach(q=>{c.beginPath();c.arc(x+q[0]*r,y+q[1]*r,q[2]*r,0,7);c.fill()})}
function estrellasDib(c,t,st){for(const a of st){c.globalAlpha=.25+.75*Math.abs(Math.sin(t*1.6+a.p));c.fillStyle='#fff';c.beginPath();c.arc(a.x,a.y,1.3,0,7);c.fill()}c.globalAlpha=1}
function textoGrande(c,txt,x,y,px){c.save();c.textAlign='center';c.fillStyle='rgba(255,255,255,.97)';c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=8;c.font='800 '+px+'px system-ui,sans-serif';c.fillText(txt,x,y);c.restore()}
const easeEl=k=>k>=1?1:1-Math.pow(1-k,3)*Math.cos(k*Math.PI*3),easeOut=k=>1-Math.pow(1-Math.min(1,k),3);
const ESC={
r:{init:(W,H,s)=>({dr:Array.from({length:Math.round(s.r*1.1)},()=>({x:W*.2+Math.random()*W*.6,y:70+Math.random()*(H-90),v:170+Math.random()*140,l:8+Math.random()*9})),ri:[]}),
draw(c,W,H,t,dt,s,st){const by=H-16,sl=Math.min(.45,s.w/90),osc=Math.min(1,s.r/70),dia=!isDark(nowH());
if(s.r<35&&dia)sol(c,W*.78,36,15,t,.7);
const cr=n=>Math.round(255-n*osc);nubeDib(c,W*.5+Math.sin(t*.6)*10,34,46,1,['rgba('+cr(130)+','+cr(120)+','+cr(100)+',.97)','rgba('+cr(120)+','+cr(120)+','+cr(110)+',.9)']);
c.fillStyle='rgba(180,215,255,.2)';c.beginPath();c.ellipse(W/2,by+4,W*.42,7,0,0,7);c.fill();
c.strokeStyle='rgba(215,235,255,.9)';c.lineWidth=1.7;c.lineCap='round';c.beginPath();
for(const d of st.dr){d.y+=d.v*dt;d.x+=d.v*dt*sl;if(d.y>by){if(Math.random()<.5&&st.ri.length<14)st.ri.push({x:d.x,t:0});d.y=64+Math.random()*10;d.x=W*.2+Math.random()*W*.6}c.moveTo(d.x,d.y);c.lineTo(d.x-d.l*sl,d.y-d.l)}c.stroke();
st.ri=st.ri.filter(o=>o.t<1);for(const o of st.ri){o.t+=dt*1.6;c.strokeStyle='rgba(225,240,255,'+(.75*(1-o.t))+')';c.lineWidth=1.3;c.beginPath();c.ellipse(o.x,by+3,4+o.t*16,1.5+o.t*5,0,0,7);c.stroke()}
textoGrande(c,s.r+'%',W/2,H*.56,38)}},
c:{init:(W,H,s)=>({cl:Array.from({length:Math.max(1,Math.round(1+s.c/100*6))},(_,i)=>({x:Math.random()*W,y:34+(i%3)*36+Math.random()*10,r:24+Math.random()*14+s.c*.12,v:6+Math.random()*10,a:.75+Math.random()*.25})),st:Array.from({length:34},()=>({x:Math.random()*W,y:Math.random()*H*.75,p:Math.random()*6}))}),
draw(c,W,H,t,dt,s,st){const noche=isDark(nowH());if(noche){estrellasDib(c,t,st.st);luna(c,W*.8,36,15)}else sol(c,W*.8,38,15,t,Math.max(.2,1-s.c/100));
for(const n of st.cl){n.x+=n.v*dt;if(n.x>W+n.r*2)n.x=-n.r*2;nubeDib(c,n.x,n.y+Math.sin(t*.8+n.r)*3,n.r,n.a,noche||s.c>=80?NUBE_OSCURA:NUBE_CLARA)}
textoGrande(c,s.c+'%',W*.3,H-30,36)}},
u:{init:(W,H)=>({st:Array.from({length:34},()=>({x:Math.random()*W,y:Math.random()*H*.7,p:Math.random()*6}))}),
draw(c,W,H,t,dt,s,st){const u=Math.max(0,s.uv),noche=isDark(nowH()),cx=W/2,cy=H-30,R=Math.min(W/2-26,H-70);if(noche)estrellasDib(c,t,st.st);
c.lineWidth=13;c.lineCap='butt';for(const g of [[0,3,'#4caf50'],[3,6,'#ffd54a'],[6,8,'#ff9800'],[8,11,'#f44336'],[11,12,'#b25bff']]){c.strokeStyle=g[2];c.beginPath();c.arc(cx,cy,R,Math.PI+g[0]/12*Math.PI,Math.PI+g[1]/12*Math.PI);c.stroke()}
c.fillStyle='rgba(255,255,255,.85)';c.font='600 11px system-ui,sans-serif';c.textAlign='center';c.fillText('0',cx-R,cy+18);c.fillText('11+',cx+R,cy+18);
const v=Math.min(12,u)*easeEl(t/1.8)+(t>1.8&&u>0?Math.sin(t*2.6)*.12:0),ang=Math.PI+Math.max(0,v)/12*Math.PI,x=cx+R*Math.cos(ang),y=cy+R*Math.sin(ang);
if(!noche){for(let i=0;i<2;i++){const q=((t*.7+i*.5)%1);c.strokeStyle='rgba(255,236,150,'+(.5*(1-q))+')';c.lineWidth=2;c.beginPath();c.arc(x,y,16+q*30,0,7);c.stroke()}sol(c,x,y,15,t,Math.min(1.2,.3+v/9))}else luna(c,x,y+Math.sin(t*1.3)*3,13);
textoGrande(c,String(Math.round(Math.max(0,v))),cx,cy-10,52);c.fillStyle='rgba(255,255,255,.9)';c.font='700 12px system-ui,sans-serif';c.fillText('ÍNDICE UV',cx,cy+14)}},
w:{init:(W,H,s)=>({p:Array.from({length:Math.round(16+s.w*.9)},()=>({x:Math.random()*W,y:Math.random()*H,l:14+Math.random()*28,v:.6+Math.random()*.8})),h:Array.from({length:7},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*6,v:.5+Math.random()*.8,col:['#7cb342','#fbc02d','#ef6c00','#8bc34a'][Math.random()*4|0]}))}),
draw(c,W,H,t,dt,s,st){const a=(s.dir-90)*Math.PI/180,vx=Math.cos(a),vy=Math.sin(a)*.35,sp=40+s.w*6,raf=1+.25*Math.sin(t*1.7);
const ajusta=o=>{if(o.x>W+40)o.x=-40;if(o.x<-40)o.x=W+40;if(o.y>H+10)o.y=-10;if(o.y<-10)o.y=H+10};
c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=1.6;c.lineCap='round';c.beginPath();
for(const p of st.p){p.x+=vx*sp*raf*p.v*dt;p.y+=vy*sp*raf*p.v*dt+Math.sin(t*2+p.l)*10*dt;ajusta(p);c.moveTo(p.x,p.y);c.lineTo(p.x-vx*p.l,p.y-vy*p.l)}c.stroke();
const tx=W*.5,ty=H-12,hh=H*.5;c.strokeStyle='rgba(255,255,255,.92)';c.lineWidth=4;c.beginPath();c.moveTo(tx,ty);c.lineTo(tx,ty-hh);c.stroke();
c.save();c.translate(tx,ty-hh);c.rotate(t*(.8+s.w*.18));c.fillStyle='#fff';for(let i=0;i<3;i++){c.rotate(Math.PI*2/3);c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(6,-hh*.2,0,-hh*.55);c.quadraticCurveTo(-5,-hh*.2,0,0);c.fill()}c.fillStyle='#ffd54a';c.beginPath();c.arc(0,0,4.5,0,7);c.fill();c.restore();
for(const h of st.h){h.x+=vx*sp*1.1*h.v*dt;h.y+=Math.sin(t*3+h.r*5)*30*dt+vy*sp*h.v*dt;h.r+=dt*(3+s.w*.1);ajusta(h);c.save();c.translate(h.x,h.y);c.rotate(h.r);c.fillStyle=h.col;c.beginPath();c.ellipse(0,0,6,3,0,0,7);c.fill();c.restore()}
textoGrande(c,s.w+' km/h',W*.2+10,34,26)}},
h:{init:()=>({b:Array.from({length:9},()=>({x:Math.random(),h:Math.random(),v:.1+Math.random()*.15,r:1.5+Math.random()*2.5}))}),
draw(c,W,H,t,dt,s,st){const cx=W/2,top=12,bot=H-12,hgt=bot-top,r=hgt*.34,cyc=bot-r,lvl=s.h*easeOut(t/1.6),wy=bot-hgt*lvl/100;
const gota=()=>{c.beginPath();c.moveTo(cx,top);c.bezierCurveTo(cx+r*.15,top+hgt*.2,cx+r,cyc-r*.9,cx+r,cyc);c.arc(cx,cyc,r,0,Math.PI,false);c.bezierCurveTo(cx-r,cyc-r*.9,cx-r*.15,top+hgt*.2,cx,top);c.closePath()};
c.save();gota();c.fillStyle='rgba(255,255,255,.12)';c.fill();c.clip();
for(const q of [[5,.05,2.2,'rgba(110,185,255,.88)'],[4,.065,-1.7,'rgba(60,140,235,.8)']]){c.fillStyle=q[3];c.beginPath();c.moveTo(0,H);for(let x=0;x<=W;x+=6)c.lineTo(x,wy+Math.sin(x*q[1]+t*q[2])*q[0]);c.lineTo(W,H);c.closePath();c.fill()}
for(const b of st.b){b.h+=b.v*dt;if(b.h>1)b.h=0;const by=bot-(bot-wy)*b.h;c.fillStyle='rgba(255,255,255,.55)';c.beginPath();c.arc(cx+(b.x-.5)*r*1.4+Math.sin(t*2+b.x*9)*3,by,b.r,0,7);c.fill()}
c.fillStyle='rgba(255,255,255,.25)';c.beginPath();c.ellipse(cx-r*.45,cyc-r*.25,r*.12,r*.35,.4,0,7);c.fill();c.restore();
gota();c.strokeStyle='rgba(255,255,255,.95)';c.lineWidth=3;c.stroke();
textoGrande(c,Math.round(lvl)+'%',cx,cyc+12,34)}},
z:{init:(W,H,s)=>({est:Array.from({length:30},()=>({x:Math.random()*W,y:Math.random()*H*.6,p:Math.random()*6})),n:[{x:W*.3,r:24,v:9},{x:W*.72,r:19,v:6}]}),
draw(c,W,H,t,dt,s,st){const cx=W/2,base=H-24,R=Math.min(W/2-26,H-82),noche=s.sun===null||(!D&&isDark(nowH())),k=easeOut(t/2.2);
const hh=nowH(),p=noche?Math.min(1,Math.max(0,((hh+24-18)%24)/12)):s.sun;
if(noche)estrellasDib(c,t,st.est);
c.setLineDash([4,6]);c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=2;c.beginPath();c.arc(cx,base,R,Math.PI,2*Math.PI);c.stroke();c.setLineDash([]);
const pp=p*k,x=cx-R*Math.cos(Math.PI*pp),y=base-R*Math.sin(Math.PI*pp);
if(noche)luna(c,x,y,13);else sol(c,x,y,14,t,.8);
if(!noche&&(s.c>=70||rnow()))for(const n of st.n){n.x+=n.v*dt;if(n.x>W+n.r*2)n.x=-n.r*2;nubeDib(c,n.x,y+8,n.r,.88,NUBE_OSCURA)}
c.fillStyle='rgba(15,30,50,.4)';c.beginPath();c.moveTo(0,H);c.lineTo(0,base+4);for(let x2=0;x2<=W;x2+=8)c.lineTo(x2,base+4-Math.sin(x2*.03)*5-Math.sin(x2*.011)*7);c.lineTo(W,H);c.fill();
c.fillStyle='rgba(255,255,255,.95)';c.font='700 12px system-ui,sans-serif';c.textAlign='left';c.fillText('🌅 '+(s.sr||'5:41'),10,H-6);c.textAlign='right';c.fillText((s.ss||'17:36')+' 🌇',W-10,H-6);
c.textAlign='center';c.font='700 13px system-ui,sans-serif';c.fillText(noche?'Noche':'Ya recorrió el '+Math.round(p*100)+' % del día',cx,base-R*.35)}}};
function iniciarEscena(k,s){const cv=$('dvc'),f=ESC[k];if(!cv||!f)return;const d=Math.min(2,devicePixelRatio||1),W=cv.clientWidth||320,H=cv.clientHeight||200;cv.width=W*d;cv.height=H*d;const c=cv.getContext('2d');
const st=f.init(W,H,s);let t0=null,ult=0;
const paso=now=>{if(!document.body.contains(cv)||!$('md').classList.contains('on'))return;if(t0===null)t0=now;const t=(now-t0)/1000,dt=Math.min(.05,Math.max(0,t-ult));ult=t;c.setTransform(d,0,0,d,0,0);c.clearRect(0,0,W,H);
try{f.draw(c,W,H,t,dt,s,st)}catch(e){console.error('escena '+k,e);return}
if(!(SAVER||NOANIM))requestAnimationFrame(paso)};
if(SAVER||NOANIM){c.setTransform(d,0,0,d,0,0);f.draw(c,W,H,2.5,.016,s,st)}else requestAnimationFrame(paso)}

/* Animaciones del cielo en canvas (lluvia, sol, nubes, estrellas, pájaros, rayos). */
let NOANIM=false,drawing=false;
const cv=$('fx'),g=cv.getContext('2d');
let W,H,DPRc=1,drops=[[],[],[]],clouds=[],stars=[],birds=[],splash=[],flash=0,tick=0,bolt=null,shoot=null,RAYS=null,CL=null,ff=[];
function rs(){W=innerWidth;H=innerHeight;const d=Math.min(2,devicePixelRatio||1);DPRc=d;cv.width=W*d;cv.height=H*d;g.setTransform(d,0,0,d,0,0)}
const SKY={wet:false,lvl:0,storm:false,birds:false,night:false};
function mkCloud(tone,sd){const c=document.createElement('canvas');c.width=300;c.height=140;const x=c.getContext('2d'),base=tone==='dark'?'62,72,88':'255,255,255';
const B=[[60,92,40],[108,68,52],[168,76,50],[226,94,40],[140,98,50],[88,104,34],[196,104,36]];
B.forEach((b,i)=>{const j=Math.sin(sd*7+i*2.3),bx=b[0]+j*8,by=b[1]+Math.cos(sd*5+i)*6,r=b[2]*(.9+.2*Math.abs(j));
const gr=x.createRadialGradient(bx,by-r*.25,r*.1,bx,by,r);gr.addColorStop(0,'rgba('+base+',.9)');gr.addColorStop(.6,'rgba('+base+',.55)');gr.addColorStop(1,'rgba('+base+',0)');x.fillStyle=gr;x.beginPath();x.arc(bx,by,r,0,7);x.fill()});
x.globalCompositeOperation='source-atop';const sh=x.createLinearGradient(0,50,0,140);sh.addColorStop(0,'rgba(255,255,255,0)');sh.addColorStop(1,tone==='dark'?'rgba(10,16,26,.6)':'rgba(110,140,175,.5)');x.fillStyle=sh;x.fillRect(0,0,300,140);return c}
function mkRays(){const c=document.createElement('canvas');c.width=c.height=760;const x=c.getContext('2d');x.translate(380,380);
for(let i=0;i<18;i++){x.rotate(Math.PI/9);const len=i%2?250:360,w=i%2?9:15,gr=x.createLinearGradient(40,0,len,0);gr.addColorStop(0,'rgba(255,240,170,.3)');gr.addColorStop(1,'rgba(255,240,170,0)');x.fillStyle=gr;x.beginPath();x.moveTo(40,-4);x.lineTo(len,-w);x.lineTo(len,w);x.lineTo(40,4);x.closePath();x.fill()}return c}
function nd(z,init){const P=[[8,6,7,9],[14,8,11,14],[22,12,17,22]][z];return{x:Math.random()*(W+160),y:init?Math.random()*H:-30,l:P[0]+Math.random()*P[1],v:P[2]+Math.random()*(P[3]-P[2])}}
function setup(){const s=cs(),wet=cur==='rain'||cur==='storm',st=cur==='storm';
if(!CL)CL={light:[1,2,3].map(i=>mkCloud('light',i)),dark:[4,5,6].map(i=>mkCloud('dark',i))};
const N=wet?Math.round(s.r*(st?5:3.4)):0;drops=[[],[],[]];
for(let i=0;i<N;i++){const m=i%100,z=m<50?0:m<82?1:2;drops[z].push(nd(z,true))}
const n=Math.round(s.c/12)+1+(wet?3:0);
clouds=Array.from({length:n},(_,i)=>{const L=i%3;return{x:Math.random()*W,y:20+Math.random()*H*(L===2?.4:.28),k:[.6+Math.random()*.3,1+Math.random()*.4,1.5+Math.random()*.5][L],v:[.08,.16,.3][L]*(.7+Math.random()*.6),a:[.5,.7,.85][L],i:Math.floor(Math.random()*3),L}}).sort((a,b)=>a.L-b.L);
stars=Array.from({length:110},(_,i)=>({x:Math.random()*W,y:Math.random()*H*.7,p:Math.random()*6,r:.6+Math.random()*1.5,c:i%7===0?'#fff1c9':i%5===0?'#cfe0ff':'#fff'}));
birds=[];splash=[];bolt=null;ff=Array.from({length:14},()=>({x:Math.random()*W,y:H*(.4+Math.random()*.55),t:Math.random()*20,p:Math.random()*6}));updateSound();kickCristal();if(SAVER)kick()}
function sunFX(a){const x=W*.82+INC.x*8,y=110+INC.y*6;g.save();g.globalAlpha=a;
const pl=1+Math.sin(tick/70)*.04;let gr=g.createRadialGradient(x,y,12,x,y,200*pl);gr.addColorStop(0,'rgba(255,244,180,.9)');gr.addColorStop(.22,'rgba(255,226,120,.4)');gr.addColorStop(1,'rgba(255,226,120,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,200*pl,0,7);g.fill();
if(!RAYS)RAYS=mkRays();g.translate(x,y);g.rotate(tick/1100);g.drawImage(RAYS,-380,-380);g.rotate(-tick/1100);g.translate(-x,-y);
gr=g.createRadialGradient(x-8,y-8,4,x,y,40);gr.addColorStop(0,'#fffbe0');gr.addColorStop(.55,'#ffe066');gr.addColorStop(1,'#ffb93b');g.fillStyle=gr;g.beginPath();g.arc(x,y,38,0,7);g.fill();
if(cur==='sun'){[[.35,16,.08],[.6,26,.06],[.85,11,.1]].forEach(f=>{const fx=x+(W*.45-x)*f[0]*1.7,fy=y+(H*.55-y)*f[0]*1.7;g.fillStyle='rgba(255,255,255,'+f[2]+')';g.beginPath();g.arc(fx,fy,f[1],0,7);g.fill();g.strokeStyle='rgba(255,230,150,'+f[2]+')';g.lineWidth=2;g.stroke()})}
g.restore()}
function nightFX(){stars.forEach(a=>{g.globalAlpha=.25+.75*Math.abs(Math.sin(tick/50+a.p));g.fillStyle=a.c;g.beginPath();g.arc(a.x,a.y,a.r,0,7);g.fill()});g.globalAlpha=1;
if(!shoot&&Math.random()<.002)shoot={x:W*(.3+Math.random()*.6),y:20+Math.random()*H*.2,vx:-9-Math.random()*4,vy:4+Math.random()*2,t:0};
if(shoot){shoot.x+=shoot.vx;shoot.y+=shoot.vy;shoot.t++;const al=Math.max(0,1-shoot.t/38),gr=g.createLinearGradient(shoot.x,shoot.y,shoot.x-shoot.vx*6,shoot.y-shoot.vy*6);gr.addColorStop(0,'rgba(255,255,255,'+al+')');gr.addColorStop(1,'rgba(255,255,255,0)');g.strokeStyle=gr;g.lineWidth=2;g.beginPath();g.moveTo(shoot.x,shoot.y);g.lineTo(shoot.x-shoot.vx*6,shoot.y-shoot.vy*6);g.stroke();if(shoot.t>38)shoot=null}
const mx=W*.82+INC.x*8,my=100+INC.y*6;let gr=g.createRadialGradient(mx,my,20,mx,my,120);gr.addColorStop(0,'rgba(225,232,255,.4)');gr.addColorStop(1,'rgba(225,232,255,0)');g.fillStyle=gr;g.beginPath();g.arc(mx,my,120,0,7);g.fill();
gr=g.createRadialGradient(mx-8,my-8,4,mx,my,32);gr.addColorStop(0,'#fffdf0');gr.addColorStop(1,'#e3dfc0');g.fillStyle=gr;g.beginPath();g.arc(mx,my,30,0,7);g.fill();
g.fillStyle='rgba(150,148,125,.28)';[[-9,-6,6],[8,4,8],[-2,13,4],[11,-11,3.5]].forEach(c=>{g.beginPath();g.arc(mx+c[0],my+c[1],c[2],0,7);g.fill()})}
function spawnBird(){const dir=Math.random()<.5?1:-1;birds.push({x:dir>0?-30:W+30,y:H*(.1+Math.random()*.3),v:dir*(.8+Math.random()*1.1),s:7+Math.random()*7,p:Math.random()*6,b:Math.random()*6,a:10+Math.random()*14});chirp(dir>0?-.6:.6,.07)}
function birdFX(){birds=birds.filter(b=>b.x>-60&&b.x<W+60);birds.forEach(b=>{b.x+=b.v;b.p+=.17+b.s*.004;b.b+=.03;const y=b.y+Math.sin(b.b)*b.a,w=Math.sin(b.p)*b.s*.7;g.strokeStyle='rgba(35,45,58,.72)';g.lineWidth=1.8;g.lineCap='round';g.beginPath();g.moveTo(b.x-b.s,y-w);g.quadraticCurveTo(b.x-b.s*.45,y-w*.2-b.s*.3,b.x,y);g.quadraticCurveTo(b.x+b.s*.45,y-w*.2-b.s*.3,b.x+b.s,y-w);g.stroke()})}
function makeBolt(){const pts=[];let x=W*(.2+Math.random()*.6),y=0;pts.push([x,y]);while(y<H*.55){y+=18+Math.random()*28;x+=(Math.random()-.5)*50;pts.push([x,y])}
const br=[];for(let i=3;i<pts.length-1;i+=3){if(Math.random()<.6){let bx=pts[i][0],by=pts[i][1];const q=[[bx,by]];for(let k=0;k<4;k++){bx+=(Math.random()-.3)*30*(Math.random()<.5?-1:1);by+=14+Math.random()*18;q.push([bx,by])}br.push(q)}}
return{pts,br,life:10}}
function boltFX(){if(!bolt)return;bolt.life--;if(bolt.life<=0){bolt=null;return}if(bolt.life%4===1)return;g.save();{const bg=g.createRadialGradient(bolt.pts[0][0],0,4,bolt.pts[0][0],0,200);bg.addColorStop(0,'rgba(200,215,255,.45)');bg.addColorStop(1,'rgba(200,215,255,0)');g.fillStyle=bg;g.fillRect(0,0,W,280)}g.shadowColor='rgba(190,210,255,.95)';g.shadowBlur=20;g.lineJoin='round';
const path=p=>{g.beginPath();p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.stroke()};
g.strokeStyle='rgba(255,255,255,.95)';g.lineWidth=2.4;path(bolt.pts);g.strokeStyle='rgba(215,228,255,.7)';g.lineWidth=1.2;bolt.br.forEach(path);g.restore()}
function draw(){tick++;g.setTransform(DPRc,0,0,DPRc,0,0);g.clearRect(0,0,W,H);const s=cs(),wet=cur==='rain'||cur==='storm',st=cur==='storm',night=cur==='night',gk=1+(Math.sin(tick/140)*.3+Math.sin(tick/53+1)*.18)*Math.min(1,.3+s.w/30);
if(night)nightFX();else if(cur==='sun'||cur==='cloud')sunFX(cur==='sun'?1:.55);
const sp=(wet||night)?CL.dark:CL.light,ca=night?.45:(document.documentElement.classList.contains('dk')?.55:1);
clouds.forEach(c=>{c.x+=c.v*gk;if(c.x>W+40)c.x=-300*c.k;g.globalAlpha=c.a*ca;g.drawImage(sp[c.i],c.x+INC.x*10*(c.L+1),c.y+INC.y*5*(c.L+1),300*c.k,140*c.k)});
if(flash>0&&CL){g.save();g.globalCompositeOperation='lighter';clouds.forEach(c=>{g.globalAlpha=Math.min(.5,flash*.55)*c.a;g.drawImage(CL.light[c.i],c.x+INC.x*10*(c.L+1),c.y+INC.y*5*(c.L+1),300*c.k,140*c.k)});g.restore()}g.globalAlpha=1;
if(SKY.birds&&birds.length<3&&Math.random()<.0035)spawnBird();birdFX();if(SKY.night)flyFX();
if(wet){const wx=-(.7+s.w*.045)*(st?1.5:1)*gk,LS=[['rgba(195,215,240,.3)',.8],['rgba(210,228,250,.45)',1.2],['rgba(228,240,255,.65)',1.8]];
drops.forEach((arr,z)=>{g.strokeStyle=LS[z][0];g.lineWidth=LS[z][1];g.beginPath();arr.forEach(d=>{d.y+=d.v;d.x+=wx;if(d.y>H){if(z>0&&splash.length<50&&Math.random()<.5)splash.push({x:d.x,y:H-6-Math.random()*10,t:0});d.y=-d.l;d.x=Math.random()*(W+160)}else if(d.x<-30)d.x+=W+160;g.moveTo(d.x,d.y);g.lineTo(d.x-wx*d.l/d.v,d.y-d.l)});g.stroke()});
g.lineWidth=1;splash=splash.filter(p=>p.t<12);splash.forEach(p=>{p.t++;g.strokeStyle='rgba(225,238,255,'+(.55*(1-p.t/12))+')';g.beginPath();g.ellipse(p.x,p.y,2+p.t*.9,(2+p.t*.9)*.33,0,0,7);g.stroke()});
const mg2=g.createLinearGradient(0,H-160,0,H);mg2.addColorStop(0,'rgba(190,210,230,0)');mg2.addColorStop(1,'rgba(190,210,230,.2)');g.fillStyle=mg2;g.fillRect(0,H-160,W,160)}
if(st){if(Math.random()<.006){flash=1;bolt=makeBolt();const dT=.4+Math.random()*2.2;thunder(dT);vibrarTrueno(dT)}boltFX();if(flash>0){g.fillStyle='rgba(255,255,255,'+flash*.42+')';g.fillRect(0,0,W,H);flash-=.06}}
if(SAVER||NOANIM){drawing=false;return}requestAnimationFrame(draw)}
function vibrarTrueno(d){if(!AJ.vibrar||SAVER||!navigator.vibrate)return;setTimeout(()=>{if(cur==='storm'&&!document.hidden)try{navigator.vibrate([40,40,90,40,60])}catch(e){}},d*1000)}
function kick(){if(drawing)return;drawing=true;draw()}
function flyFX(){ff.forEach((f,i)=>{f.t+=.012;const x=f.x+Math.sin(f.t*1.3+i)*40,y=f.y+Math.cos(f.t+i*2)*24,a=Math.pow(Math.max(0,Math.sin(f.t*2.1+f.p)),2);if(a<.02)return;g.fillStyle='rgba(215,255,120,'+(a*.28)+')';g.beginPath();g.arc(x,y,9,0,7);g.fill();g.fillStyle='rgba(240,255,170,'+a+')';g.beginPath();g.arc(x,y,2.2,0,7);g.fill()})}
function reiniciarCanvas(){rs();if(!drawing)kick()}
function iniciarCanvas(){
addEventListener('resize',rs);
rs();
cv.addEventListener('contextrestored',reiniciarCanvas);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)reiniciarCanvas()});
addEventListener('pageshow',e=>{if(e.persisted)reiniciarCanvas()});
}
function arrancarAnimacion(){
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
NOANIM=RM;
if(!RM){drawing=true;draw()}else{tick=0;g.clearRect(0,0,W,H)}
}

/* Gotas de lluvia en el cristal: capa transparente por encima de la pantalla (no estorba los toques). */
let GL=null,GW=0,GH=0,GD=1,gotas=[],gDrawing=false,gUlt=0,gFade=1;
function iniciarCristal(){const cv=$('glass');if(!cv)return;GL=cv.getContext('2d');rsCristal();addEventListener('resize',rsCristal)}
function rsCristal(){const cv=$('glass');if(!cv)return;GD=Math.min(2,devicePixelRatio||1);GW=innerWidth;GH=innerHeight;cv.width=GW*GD;cv.height=GH*GD}
function cristalActivo(){return AJ.gotas&&!SAVER&&!NOANIM&&(cur==='rain'||cur==='storm')}
function kickCristal(){if(GL&&!gDrawing){gDrawing=true;gUlt=performance.now();requestAnimationFrame(cristalPaso)}}
function cristalPaso(now){const activo=cristalActivo();GL.setTransform(GD,0,0,GD,0,0);GL.clearRect(0,0,GW,GH);
if(!activo&&!gotas.length){gDrawing=false;return}
const dt=Math.min(.05,Math.max(.001,(now-gUlt)/1000));gUlt=now;gFade=activo?Math.min(1,gFade+dt*1.2):Math.max(0,gFade-dt*.8);
if(!activo&&gFade<=0){gotas=[];gDrawing=false;return}
if(activo&&gotas.length<(cur==='storm'?36:28)&&Math.random()<.18)gotas.push({x:Math.random()*GW,y:Math.random()*GH*.92,r:1.5+Math.random()*2.6,vy:0,t:0,tope:5+Math.random()*3.5,tr:[]});
for(const g of gotas){g.t+=dt;if(!g.vy){g.r+=dt*(.35+Math.random()*.5);if(g.r>g.tope)g.vy=45+Math.random()*50}else{g.vy*=1+dt*.5;g.y+=g.vy*dt;g.r=Math.max(1.2,g.r-dt*.6);g.tr.push([g.x,g.y]);if(g.tr.length>26)g.tr.shift()}}
gotas=gotas.filter(g=>g.y<GH+12&&(g.vy||g.t<40));
GL.save();GL.globalAlpha=gFade;
for(const g of gotas){if(g.tr.length>1){GL.strokeStyle='rgba(220,235,255,.17)';GL.lineWidth=g.r*.7;GL.lineCap='round';GL.beginPath();GL.moveTo(g.tr[0][0],g.tr[0][1]);for(const q of g.tr)GL.lineTo(q[0],q[1]);GL.stroke()}
const gr=GL.createRadialGradient(g.x-g.r*.3,g.y-g.r*.35,g.r*.1,g.x,g.y,g.r*1.1);gr.addColorStop(0,'rgba(255,255,255,.55)');gr.addColorStop(.45,'rgba(200,225,255,.16)');gr.addColorStop(1,'rgba(20,40,70,.3)');
GL.fillStyle=gr;GL.beginPath();GL.ellipse(g.x,g.y,g.r*.9,g.r*1.15,0,0,7);GL.fill();GL.fillStyle='rgba(255,255,255,.8)';GL.beginPath();GL.arc(g.x-g.r*.3,g.y-g.r*.4,g.r*.22,0,7);GL.fill()}
GL.restore();requestAnimationFrame(cristalPaso)}

/* Efecto 3D: el gato, el cielo y la temperatura se desplazan un poco al inclinar el celular. */
let INC={x:0,y:0,tx:0,ty:0,vivo:false};
function inclinarActivo(){return AJ.inclinar&&!SAVER&&!NOANIM}
function pasoInclinar(){const r=document.documentElement.style;
if(inclinarActivo()){INC.x+=(INC.tx-INC.x)*.08;INC.y+=(INC.ty-INC.y)*.08}else{INC.x*=.9;INC.y*=.9}
r.setProperty('--ix',INC.x.toFixed(3));r.setProperty('--iy',INC.y.toFixed(3));requestAnimationFrame(pasoInclinar)}
function iniciarInclinar(){if(!('DeviceOrientationEvent' in window))return;
addEventListener('deviceorientation',e=>{if(e.gamma==null||e.beta==null)return;INC.tx=Math.max(-1,Math.min(1,e.gamma/30));INC.ty=Math.max(-1,Math.min(1,(e.beta-55)/30));if(!INC.vivo){INC.vivo=true;requestAnimationFrame(pasoInclinar)}})}

/* Sonido generado con Web Audio (lluvia, truenos, pájaros, grillos, ranas, búho). */
let ac=null,mg,rainG,patG,dropB,thB,crackB,birdBus,nightBus,RL=0,want=false;
function noiseBuf(sec,brown){const n=Math.floor(ac.sampleRate*sec),b=ac.createBuffer(1,n,ac.sampleRate),d=b.getChannelData(0);let l=0;for(let i=0;i<n;i++){const w=Math.random()*2-1;if(brown){l=(l+.02*w)/1.02;d[i]=l*3.5}else d[i]=w}return b}
function initAudio(){if(ac)return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;ac=new AC();mg=ac.createGain();mg.gain.value=0;mg.connect(ac.destination);birdBus=ac.createGain();birdBus.gain.value=0;birdBus.connect(mg);nightBus=ac.createGain();nightBus.gain.value=0;nightBus.connect(mg);
const wb=noiseBuf(3,false);const mk=(f1,f2)=>{const s=ac.createBufferSource();s.buffer=wb;s.loop=true;const hp=ac.createBiquadFilter();hp.type='highpass';hp.frequency.value=f1;const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=f2;const gn=ac.createGain();gn.gain.value=0;s.connect(hp);hp.connect(lp);lp.connect(gn);gn.connect(mg);s.start(0,Math.random()*2);return gn};
rainG=mk(500,9000);patG=mk(1800,3800);
dropB=noiseBuf(.04,false);{const d=dropB.getChannelData(0);for(let i=0;i<d.length;i++)d[i]*=Math.pow(1-i/d.length,3)}
thB=noiseBuf(6,true);crackB=noiseBuf(.35,false);{const cd=crackB.getChannelData(0);for(let i=0;i<cd.length;i++)cd[i]*=Math.pow(1-i/cd.length,2.5)}patLoop();truenoLejano();birdLoop();nightInit();updateSound()}
function dropSound(){const s=ac.createBufferSource();s.buffer=dropB;s.playbackRate.value=.7+Math.random()*1.5;const bp=ac.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1800+Math.random()*4200;bp.Q.value=1.5;const gn=ac.createGain();gn.gain.value=(.04+Math.random()*.08)*RL;s.connect(bp);bp.connect(gn);gn.connect(mg);s.start()}
function patLoop(){RL+=((AJ.sRain?SKY.lvl:0)-RL)*.1;if(ac&&want&&ac.state==='running'&&RL>.02)dropSound();setTimeout(patLoop,50+Math.random()*(220-170*RL))}
function chirp(pan,vol){if(!AJ.sBirds||!ac||!want||ac.state!=='running')return;const t0=ac.currentTime+.02,trill=Math.random()<.35,base=2400+Math.random()*2200,pn=ac.createStereoPanner?ac.createStereoPanner():null;if(pn){pn.pan.value=pan;pn.connect(birdBus)}const out=pn||birdBus,n=trill?1:2+Math.floor(Math.random()*4);let t=t0;
for(let i=0;i<n;i++){const o=ac.createOscillator(),gn=ac.createGain(),d=trill?.45+Math.random()*.4:.06+Math.random()*.07,f=base*(1+(Math.random()-.5)*.25);o.type='sine';
o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*(1.25+Math.random()*.35),t+d*.45);o.frequency.exponentialRampToValueAtTime(f*(.85+Math.random()*.2),t+d);
if(trill){const l=ac.createOscillator(),lg=ac.createGain();l.frequency.value=18+Math.random()*10;lg.gain.value=f*.07;l.connect(lg);lg.connect(o.frequency);l.start(t);l.stop(t+d+.05)}
gn.gain.setValueAtTime(.0001,t);gn.gain.exponentialRampToValueAtTime(vol,t+.012);gn.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(gn);gn.connect(out);o.start(t);o.stop(t+d+.05);t+=d+.05+Math.random()*.06}}
function birdLoop(){if(SKY.birds)chirp(Math.random()*2-1,.05+Math.random()*.05);setTimeout(birdLoop,1500+Math.random()*5500)}
function thunder(d,k){if(!ac||!want||ac.state!=='running'||!AJ.sRain)return;k=k||1;const t=ac.currentTime+d,pk=Math.min(1,.95*k/(1+d*.25))*.5;
const c=ac.createBufferSource();c.buffer=crackB;const hp=ac.createBiquadFilter();hp.type='highpass';hp.frequency.value=700;const cg=ac.createGain();cg.gain.value=.55*pk;c.connect(hp);hp.connect(cg);cg.connect(mg);c.start(t);
const s=ac.createBufferSource();s.buffer=thB;const lp=ac.createBiquadFilter();lp.type='lowpass';lp.Q.value=.7;lp.frequency.setValueAtTime(1600,t);lp.frequency.exponentialRampToValueAtTime(130,t+3.6);
const pe=ac.createBiquadFilter();pe.type='peaking';pe.frequency.value=320;pe.Q.value=.8;pe.gain.value=11;
const gn=ac.createGain(),ga=gn.gain;ga.setValueAtTime(.0001,t+.04);ga.exponentialRampToValueAtTime(pk,t+.12);ga.exponentialRampToValueAtTime(pk*.4,t+.55);ga.exponentialRampToValueAtTime(pk*.85,t+.95);ga.exponentialRampToValueAtTime(pk*.3,t+1.7);ga.exponentialRampToValueAtTime(pk*.5,t+2.3);ga.exponentialRampToValueAtTime(.0001,t+4.6);
s.connect(lp);lp.connect(pe);pe.connect(gn);gn.connect(mg);s.start(t+.04,Math.random()*1.5);s.stop(t+4.8)}
let CR=[],nextFrog=0,nextOwl=0;
function truenoLejano(){if(ac&&want&&ac.state==='running'&&AJ.sRain&&cur==='rain'&&cs().r>=75)thunder(1+Math.random()*3,.5);setTimeout(truenoLejano,22000+Math.random()*40000)}
function nightInit(){[[4300,-.7,.55],[4750,-.2,.7],[5150,.35,.5],[4050,.8,.62]].forEach(c=>{const o=ac.createOscillator(),gn=ac.createGain(),pn=ac.createStereoPanner?ac.createStereoPanner():null;o.type='sine';o.frequency.value=c[0];gn.gain.value=0;o.connect(gn);if(pn){pn.pan.value=c[1];gn.connect(pn);pn.connect(nightBus)}else gn.connect(nightBus);o.start();CR.push({g:gn.gain,n:0,r:c[2]})});
nextFrog=ac.currentTime+2;nextOwl=ac.currentTime+20+Math.random()*30;setInterval(nightTick,500)}
function nightTick(){if(!ac||!want||ac.state!=='running')return;const t=ac.currentTime,v=((SKY.night&&AJ.sNight)||nightBus.gain.value>.02)?.13:0;
CR.forEach(c=>{if(c.n<t)c.n=t+Math.random()*.4;while(c.n<t+1.2){if(v){const k=3+Math.floor(Math.random()*2);for(let i=0;i<k;i++){const tt=c.n+i*.05;c.g.setValueAtTime(0,tt);c.g.linearRampToValueAtTime(v,tt+.01);c.g.linearRampToValueAtTime(0,tt+.032)}}c.n+=c.r+Math.random()*.25}});
if(SKY.night&&AJ.sNight){if(t>nextFrog){frog(Math.random()*2-1);nextFrog=t+3+Math.random()*7}if(t>nextOwl){owl();nextOwl=t+30+Math.random()*50}}}
function frog(pan){const t0=ac.currentTime+.05,pn=ac.createStereoPanner?ac.createStereoPanner():null;if(pn){pn.pan.value=pan;pn.connect(nightBus)}const out=pn||nightBus;
if(Math.random()<.5){const base=240+Math.random()*160,n=3+Math.floor(Math.random()*4),bp=ac.createBiquadFilter();bp.type='bandpass';bp.frequency.value=base*3.2;bp.Q.value=3;bp.connect(out);
for(let i=0;i<n;i++){const t=t0+i*.085,o=ac.createOscillator(),gn=ac.createGain();o.type='sawtooth';o.frequency.setValueAtTime(base*1.35,t);o.frequency.exponentialRampToValueAtTime(base,t+.07);gn.gain.setValueAtTime(.0001,t);gn.gain.exponentialRampToValueAtTime(.9,t+.012);gn.gain.exponentialRampToValueAtTime(.0001,t+.075);o.connect(gn);gn.connect(bp);o.start(t);o.stop(t+.09)}}
else{const reps=2+Math.floor(Math.random()*3),f=1000+Math.random()*250;
for(let r=0;r<reps;r++){const t=t0+r*.52;[[f,f*.9,.1,0],[f*1.7,f*2.1,.22,.15]].forEach(p=>{const o=ac.createOscillator(),gn=ac.createGain(),s=t+p[3];o.type='sine';o.frequency.setValueAtTime(p[0],s);o.frequency.linearRampToValueAtTime(p[1],s+p[2]);gn.gain.setValueAtTime(.0001,s);gn.gain.exponentialRampToValueAtTime(.22,s+.02);gn.gain.exponentialRampToValueAtTime(.0001,s+p[2]);o.connect(gn);gn.connect(out);o.start(s);o.stop(s+p[2]+.03)})}}}
function owl(){const t0=ac.currentTime+.1,lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=900;lp.connect(nightBus);
[[0,.28],[.42,.28],[.84,.85]].forEach((p,i)=>{const s=t0+p[0],d=p[1],o=ac.createOscillator(),gn=ac.createGain();o.type='sine';o.frequency.setValueAtTime(i<2?400:380,s);o.frequency.linearRampToValueAtTime(i<2?370:320,s+d);gn.gain.setValueAtTime(.0001,s);gn.gain.exponentialRampToValueAtTime(.32,s+.06);gn.gain.exponentialRampToValueAtTime(.0001,s+d);o.connect(gn);gn.connect(lp);o.start(s);o.stop(s+d+.05)})}
function updateSound(){const s=cs(),h=nowH(),wet=cur==='rain'||cur==='storm';
SKY.wet=wet;SKY.storm=cur==='storm';SKY.lvl=wet?(cur==='storm'?1:Math.min(1,.35+s.r/130)):0;
SKY.night=!wet&&isDark(h);
SKY.birds=!wet&&cur!=='night'&&cur!=='cold'&&!isDark(h)&&h>=5&&h<18&&s.t>=24;
if(ac){const t=ac.currentTime;const rl=AJ.sRain?SKY.lvl:0;rainG.gain.setTargetAtTime(rl*.2,t,1.6);patG.gain.setTargetAtTime(rl*.1,t,1.6);birdBus.gain.setTargetAtTime(SKY.birds&&AJ.sBirds?1:0,t,1.8);nightBus.gain.setTargetAtTime(SKY.night&&AJ.sNight?1:0,t,2.2)}}
function volMaestro(){const md=$('md'),abierto=md&&md.classList.contains('on')&&!$('ajw');return AJ.volumen/100*(abierto?.45:1)}
function aplicarVolumen(){if(ac&&want)mg.gain.setTargetAtTime(volMaestro(),ac.currentTime,.3)}
function setSnd(on){if(on&&SAVER){toast('🔋 El modo ahorro mantiene el sonido apagado');return}want=on;if(on){initAudio();if(ac&&ac.resume)ac.resume()}if(ac)mg.gain.setTargetAtTime(on?volMaestro():0,ac.currentTime,.5);
const b=$('sndbtn');b.textContent=on?'🔊 Sonido':'🔇 Sonido';b.setAttribute('aria-pressed',on);b.setAttribute('aria-label',on?'Apagar sonido':'Activar sonido');
updateSound();toast(!on?'🔇 Sonido apagado':SKY.lvl>0?'🔊 Sonido de lluvia activado':SKY.birds?'🔊 Se oyen pájaros: hace calor y es de día':SKY.night?'🔊 Se oyen grillos y ranas: es de noche':'🔊 Activado: suena con lluvia, y con pájaros en días cálidos')}
function iniciarSonido(){
$('sndbtn').onclick=()=>setSnd(!want);
document.addEventListener('visibilitychange',()=>{if(!ac)return;if(document.hidden)ac.suspend();else if(want)ac.resume()});
try{const mo=new MutationObserver(()=>aplicarVolumen());mo.observe($('md'),{attributes:true,attributeFilter:['class']});mo.observe($('mb'),{childList:true})}catch(e){}
}

function miau(){if(!AJ.sGato||!ac||!want||ac.state!=='running')return;const t=ac.currentTime,o=ac.createOscillator(),lf=ac.createOscillator(),lg=ac.createGain(),f=ac.createBiquadFilter(),gn=ac.createGain();
o.type='sawtooth';o.frequency.setValueAtTime(480,t);o.frequency.linearRampToValueAtTime(900,t+.14);o.frequency.exponentialRampToValueAtTime(430,t+.6);
lf.frequency.value=7;lg.gain.value=14;lf.connect(lg);lg.connect(o.frequency);
f.type='bandpass';f.Q.value=3.2;f.frequency.setValueAtTime(900,t);f.frequency.linearRampToValueAtTime(2000,t+.16);f.frequency.exponentialRampToValueAtTime(750,t+.55);
gn.gain.setValueAtTime(.0001,t);gn.gain.exponentialRampToValueAtTime(.5,t+.06);gn.gain.exponentialRampToValueAtTime(.0001,t+.65);
o.connect(f);f.connect(gn);gn.connect(mg);lf.start(t);o.start(t);o.stop(t+.7);lf.stop(t+.7)}

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

/* Calidad del aire y estado del mar. */
let EX={};
function loadExtras(lat,lon,KEY){const mine=D,ds=[0,.1,.25,.4,.6],
aU='https://air-quality-api.open-meteo.com/v1/air-quality?latitude='+lat+'&longitude='+lon+'&current=us_aqi,pm2_5,pm10&hourly=us_aqi&timezone=auto&forecast_days=2',
mU='https://marine-api.open-meteo.com/v1/marine?latitude='+ds.map(d=>(lat-d).toFixed(3)).join(',')+'&longitude='+ds.map(()=>(+lon).toFixed(3)).join(',')+'&hourly=wave_height,wave_period,wave_direction,sea_surface_temperature&timezone=auto&forecast_days=2',
jf=u=>fetch(u).then(r=>{if(!r.ok)throw 0;return r.json()});
Promise.allSettled([jf(aU),jf(mU)]).then(([a,m])=>{if(D!==mine)return;
if(a.status==='fulfilled'){const j=a.value,c=j.current||{},h=j.hourly||{},T=h.time||[],now=(c.time||'').slice(0,13),i=Math.max(0,T.findIndex(x=>x.slice(0,13)===now)),nx=(h.us_aqi||[]).slice(i,i+24).filter(v=>v!=null);
if(c.us_aqi!=null)D.aq={us:Math.round(c.us_aqi),p25:c.pm2_5,p10:c.pm10,max:nx.length?Math.round(Math.max(...nx)):Math.round(c.us_aqi)}}
if(m.status==='fulfilled'){const arr=Array.isArray(m.value)?m.value:[m.value];D.mar=null;
for(let k=0;k<arr.length;k++){const h=arr[k]&&arr[k].hourly;if(h&&h.wave_height&&h.wave_height.some(v=>v!=null)){const i=D.h24?D.h24.hh[0]:new Date().getHours(),sl=q=>(q||[]).slice(i,i+24),wh=sl(h.wave_height);if(wh[0]==null)continue;
D.mar={km:Math.round(ds[k]*111),h:wh.map(v=>v==null?0:+(+v).toFixed(1)),p:sl(h.wave_period)[0],dir:sl(h.wave_direction)[0],sst:sl(h.sea_surface_temperature)[0]};break}}}
EX={key:KEY,aq:D.aq,mar:D.mar};
try{const o=JSON.parse(localStorage.getItem(KEY));if(o){o.D=D;localStorage.setItem(KEY,JSON.stringify(o))}}catch(e){}
drawExtras();const al=$('g').querySelector('.card.wide');if(al&&/Avisos/.test(al.textContent))al.outerHTML=alertsHTML(cs())})}
function aqHTML(a){const L=[[50,'Buena','#7be07f','Aire limpio: disfruta las actividades al aire libre.'],[100,'Moderada','#ffd54a','Aceptable. Las personas muy sensibles podrían notar molestias.'],[150,'Dañina para personas sensibles','#ffab40','Niños, adultos mayores y personas con asma o problemas del corazón: reduzcan el esfuerzo al aire libre.'],[200,'Dañina','#ff7961','Reduce el ejercicio al aire libre y usa mascarilla si hay humo.'],[300,'Muy dañina','#d58bff','Evita salir y el ejercicio al aire libre.'],[1e9,'Peligrosa','#ff6b8b','Quédate en interiores con puertas y ventanas cerradas.']],f=v=>L.find(x=>v<=x[0]),c=f(a.us),m=f(a.max);
return '<h2>🌫️ Calidad del aire</h2><div class="aq"><b class="aqn" style="color:'+c[2]+'">'+a.us+'</b><div><b>'+c[1]+'</b><small>'+c[3]+'</small></div></div><div class="aqb"><i style="left:'+Math.min(100,a.us/300*100)+'%"></i></div><div class="aqk">'+(a.p25!=null?'<span>PM2.5: '+Math.round(a.p25)+' µg/m³</span>':'')+(a.p10!=null?'<span>PM10: '+Math.round(a.p10)+'</span>':'')+'<span>Máx. próx. 24 h: '+a.max+(m!==c?' ('+m[1]+')':'')+'</span></div><p class="note">Estimación de modelo (CAMS/Copernicus), no de estaciones locales. Índice AQI de EE. UU.</p>'}
function marHTML(m){const mx=Math.max(...m.h),w=m.h[0],lv=w<.5?['tranquilo','Mar en calma.']:w<1.25?['moderado','Oleaje normal para la costa.']:w<2.5?['fuerte','Cuidado con las corrientes de resaca. Báñate solo en zonas con salvavidas.']:['muy fuerte','Evita entrar al mar y mantente lejos de rocas y espigones.'],dr=['N','NE','E','SE','S','SO','O','NO'][Math.round((m.dir||0)/45)%8],top=Math.max(mx,1);
return '<h2>🌊 Mar y olas</h2><div class="aq"><b class="aqn">'+w.toFixed(1)+' m</b><div><b>Oleaje '+lv[0]+'</b><small>'+lv[1]+'</small></div></div><div class="aqk">'+(m.p!=null?'<span>Periodo: '+Math.round(m.p)+' s</span>':'')+(m.dir!=null?'<span>Viene del '+dr+'</span>':'')+(m.sst!=null?'<span>Agua: '+Math.round(m.sst)+'°</span>':'')+'<span>Máx. próx. 24 h: '+mx.toFixed(1)+' m</span></div><div class="wb" aria-hidden="true">'+m.h.map(v=>'<i style="height:'+Math.max(4,Math.round(v/top*38))+'px"></i>').join('')+'</div><p class="note">'+(m.km>0?'Datos del mar a unos '+m.km+' km de tu ubicación, hacia el sur. ':'')+'Oleaje: DWD vía Open-Meteo. Es un pronóstico general; las condiciones en cada playa varían.</p>'}
function drawExtras(){const s=cs(),aq=s.aq||(isDemo()?{us:42,p25:9,p10:18,max:61}:null),mr=s.mar||(isDemo()?{km:0,h:Array.from({length:24},(_,i)=>+(1.2+.5*Math.sin(i/4)).toFixed(1)),p:9,dir:200,sst:29}:null),A=$('aqc'),M=$('marc');
if(A){A.hidden=!aq;if(aq)A.innerHTML=aqHTML(aq)}if(M){M.hidden=!mr;if(mr)M.innerHTML=marHTML(mr)}}

/* Compartir el pronóstico como imagen. */
async function shareImg(){const s=cs(),cn=document.createElement('canvas');cn.width=1080;cn.height=1920;const x=cn.getContext('2d'),dk=isDarkUI(),k=dk&&cur!=='night'?.62:0,gr=x.createLinearGradient(0,0,0,1920);gr.addColorStop(0,k?mixc(s.a,k):s.a);gr.addColorStop(1,k?mixc(s.b,k):s.b);x.fillStyle=gr;x.fillRect(0,0,1080,1920);
const F='system-ui,-apple-system,Segoe UI,Roboto,sans-serif';x.fillStyle='#fff';x.textAlign='center';
x.font='600 58px '+F;x.fillText('📍 '+$('city').textContent,540,120);x.font='400 36px '+F;x.globalAlpha=.85;x.fillText(new Date().toLocaleDateString('es',{weekday:'long',day:'numeric',month:'long'}),540,176);x.globalAlpha=1;
x.font='700 270px '+F;x.fillText(s.t+'°',540,450);x.font='500 58px '+F;x.fillText($('c').textContent,540,535);x.font='400 36px '+F;x.globalAlpha=.9;x.fillText($('s').textContent,540,592);x.globalAlpha=1;
const im=$('cat').querySelector('img');if(im){try{await im.decode()}catch(e){}const sz=520,px=540-sz/2,py=640;x.save();rr(x,px,py,sz,sz,52);x.clip();x.drawImage(im,px,py,sz,sz);x.restore();x.lineWidth=8;x.strokeStyle='rgba(255,255,255,.85)';rr(x,px,py,sz,sz,52);x.stroke()}
[['💧',s.r+'%','Lluvia'],['🍃',s.w+' km/h','Viento'],['🕶️',String(s.uv),'UV']].forEach((it,i)=>{const cx=180+i*360;x.font='60px '+F;x.fillText(it[0],cx,1290);x.font='700 50px '+F;x.fillText(it[1],cx,1355);x.font='400 32px '+F;x.globalAlpha=.85;x.fillText(it[2],cx,1400);x.globalAlpha=1});
const Q=(s.d7||syn7(s)).slice(0,5);Q.forEach((d,i)=>{const cx=108+i*216;x.font='500 36px '+F;x.fillText(d.n.charAt(0).toUpperCase()+d.n.slice(1),cx,1520);x.font='70px '+F;x.fillText(d.e,cx,1610);x.font='700 42px '+F;x.fillText(d.mx+'°',cx,1675);x.font='400 36px '+F;x.globalAlpha=.8;x.fillText(d.mn+'°',cx,1722);x.globalAlpha=1});
x.font='400 30px '+F;x.globalAlpha=.75;x.fillText('Clima · Datos: Open-Meteo.com',540,1860);x.globalAlpha=1;
const blob=await new Promise(r=>cn.toBlob(r,'image/png')),file=new File([blob],'clima.png',{type:'image/png'});
if(navigator.canShare&&navigator.canShare({files:[file]})){try{await navigator.share({files:[file],title:'Clima',text:'Clima en '+$('city').textContent});return}catch(e){if(e&&e.name==='AbortError')return}}
const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='clima.png';document.body.appendChild(a);a.click();a.remove();toast('🖼️ Imagen guardada en tus descargas')}

/* Datos: descarga del pronóstico, caché sin conexión y actualización. */
let LASTTS=0,STALE=false;
function setUpd(){const b=$('upd');if(!b||!LASTTS)return;b.textContent=(STALE?'📴 Sin conexión · datos de '+(Date.now()-LASTTS<6e4?'hace un momento':ago(Date.now()-LASTTS)):'🔄 Actualizado '+ago(Date.now()-LASTTS));b.classList.toggle('stale',STALE)}
let ESTADO0={cur:'sun',ts:0};
function recalcEstadoCache(){const n=new Date(),hr=n.getHours(),nm=hr*60+n.getMinutes(),mm=t=>{const a=t.split(':');return +a[0]*60+ +a[1]},sr=D.sr&&D.ss;
const luz=sr?(nm>mm(D.sr)&&nm<mm(D.ss)):(hr>=6&&hr<18);
D.sun=luz?(sr?Math.min(.97,Math.max(.03,(nm-mm(D.sr))/(mm(D.ss)-mm(D.sr)))):.5):null;
const c0=ESTADO0.cur,llueve=(c0==='rain'||c0==='storm')&&Date.now()-ESTADO0.ts<72e5;
cur=!luz?(llueve?c0:'night'):(llueve?c0:((c0==='night'||c0==='rain'||c0==='storm')?(D.c>=60?'cloud':'sun'):c0))}
function useCache(key,label){let o=null;try{o=JSON.parse(localStorage.getItem(key))}catch(e){}
if(!o||!o.D||Date.now()-o.ts>432e5)return false;
const h=Math.floor((Date.now()-o.ts)/36e5);D=o.D;D.stale=true;
if(h>0&&D.h24)Object.keys(D.h24).forEach(k=>{D.h24[k]=D.h24[k].slice(h)});
if(D.d7&&new Date(o.ts).toDateString()!==new Date().toDateString()&&D.d7.length>1){D.d7=D.d7.slice(1);D.d7[0].n='Hoy'}
ESTADO0={cur:o.cur,ts:o.ts};recalcEstadoCache();
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
document.addEventListener('visibilitychange',()=>{if(document.hidden)return;if(LASTTS&&Date.now()-LASTTS>(SAVER?18e5:6e5))start();else if(HORA_R!==-1&&nowH()!==HORA_R){if(STALE&&D)recalcEstadoCache();render()}});
setInterval(()=>{if(STALE&&D&&ESTADO0.ts){const a=cur,b=D.sun===null;recalcEstadoCache();if(cur!==a||(D.sun===null)!==b)render()}},60000);
addEventListener('online',()=>{if(STALE)start()});
}

/* Arranque de la app: orden en que se inicia cada parte. */
function arrancar(){
setTimeout(hideSplash,9000);
if(DEMO){hideSplash();$('tabs').style.display='flex';$('foot').textContent='Modo demo: datos de ejemplo.'}
else{$('t').textContent='--°';$('c').textContent='';$('s').textContent='Cargando…';$('g').style.visibility='hidden';start();setInterval(()=>{if(!SAVER||Date.now()-LASTTS>18e5)start()},900000)}
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js');
}
/* orden de arranque */
cargarAjustes();
iniciarAjustes();
iniciarTema();
iniciarAhorro();
iniciarPestanas();
iniciarGato();
iniciarCanvas();
iniciarCristal();
iniciarInclinar();
iniciarSonido();
render();
arrancarAnimacion();
iniciarRed();
iniciarModal();
iniciarLugares();
iniciarMapa();
arrancar();
