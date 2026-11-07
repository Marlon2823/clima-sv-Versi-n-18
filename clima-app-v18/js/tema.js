/* Tema claro/oscuro (la elección vive en AJ.tema, ver ajustes.js). */
function isDarkUI(){return AJ.tema==='dark'||(AJ.tema==='auto'&&(cur==='night'||matchMedia('(prefers-color-scheme: dark)').matches))}
function applyTheme(s){const dk=isDarkUI(),k=dk&&cur!=='night'?.62:0,a=k?mixc(s.a,k):s.a,b=k?mixc(s.b,k):s.b,r=document.documentElement;r.style.setProperty('--c1',a);r.style.setProperty('--c2',b);r.classList.toggle('dk',dk);
const m=document.querySelector('meta[name=theme-color]');if(m)m.content=a}
function iniciarTema(){
try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(AJ.tema==='auto')render()})}catch(e){}
}
