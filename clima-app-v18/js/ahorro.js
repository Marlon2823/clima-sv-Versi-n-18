/* Modo ahorro de batería (la preferencia vive en AJ.ahorro, ver ajustes.js). */
let SAVER=false;
function setSaver(on,silent){SAVER=on;AJ.ahorro=on;guardarAjustes();document.documentElement.classList.toggle('sv',on);
if(on){if(want)setSnd(false);kick()}else kick();if(!silent)toast(on?'🔋 Modo ahorro: sin animaciones ni sonido, menos actualizaciones':'⚡ Modo ahorro apagado')}
function iniciarAhorro(){
SAVER=AJ.ahorro;
document.documentElement.classList.toggle('sv',SAVER);
try{navigator.getBattery&&navigator.getBattery().then(b=>{const chk=()=>{if(AJ.ahorroAuto&&!SAVER&&!b.charging&&b.level<=.15&&!sessionStorage.getItem('svAuto')){sessionStorage.setItem('svAuto','1');setSaver(true,true);toast('🔋 Batería baja: activé el modo ahorro')}};chk();b.addEventListener('levelchange',chk)})}catch(e){}
}
