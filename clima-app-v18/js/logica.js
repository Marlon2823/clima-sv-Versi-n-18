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
