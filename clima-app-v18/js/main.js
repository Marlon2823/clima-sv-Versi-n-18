/* Arranque de la app: orden en que se inicia cada parte. */
function arrancar(){
setTimeout(hideSplash,9000);
if(DEMO){hideSplash();$('tabs').style.display='flex';$('foot').textContent='Modo demo: datos de ejemplo.'}
else{$('t').textContent='--°';$('c').textContent='';$('s').textContent='Cargando…';$('g').style.visibility='hidden';start();setInterval(()=>{if(!SAVER||Date.now()-LASTTS>18e5)start()},900000);document.addEventListener('visibilitychange',()=>{if(!document.hidden&&(!SAVER||Date.now()-LASTTS>18e5))start()})}
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js');
}
/* orden de arranque */
cargarAjustes();
iniciarAjustes();
iniciarTema();
iniciarAhorro();
iniciarPestanas();
iniciarCanvas();
iniciarSonido();
render();
arrancarAnimacion();
iniciarRed();
iniciarModal();
iniciarLugares();
iniciarMapa();
arrancar();
