/* Sonido generado con Web Audio (lluvia, truenos, pájaros, grillos, ranas, búho). */
let ac=null,mg,rainG,patG,dropB,thB,birdBus,nightBus,RL=0,want=false;
function noiseBuf(sec,brown){const n=Math.floor(ac.sampleRate*sec),b=ac.createBuffer(1,n,ac.sampleRate),d=b.getChannelData(0);let l=0;for(let i=0;i<n;i++){const w=Math.random()*2-1;if(brown){l=(l+.02*w)/1.02;d[i]=l*3.5}else d[i]=w}return b}
function initAudio(){if(ac)return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;ac=new AC();mg=ac.createGain();mg.gain.value=0;mg.connect(ac.destination);birdBus=ac.createGain();birdBus.gain.value=0;birdBus.connect(mg);nightBus=ac.createGain();nightBus.gain.value=0;nightBus.connect(mg);
const wb=noiseBuf(3,false);const mk=(f1,f2)=>{const s=ac.createBufferSource();s.buffer=wb;s.loop=true;const hp=ac.createBiquadFilter();hp.type='highpass';hp.frequency.value=f1;const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=f2;const gn=ac.createGain();gn.gain.value=0;s.connect(hp);hp.connect(lp);lp.connect(gn);gn.connect(mg);s.start(0,Math.random()*2);return gn};
rainG=mk(500,9000);patG=mk(1800,3800);
dropB=noiseBuf(.04,false);{const d=dropB.getChannelData(0);for(let i=0;i<d.length;i++)d[i]*=Math.pow(1-i/d.length,3)}
thB=noiseBuf(6,true);patLoop();birdLoop();nightInit();updateSound()}
function dropSound(){const s=ac.createBufferSource();s.buffer=dropB;s.playbackRate.value=.7+Math.random()*1.5;const bp=ac.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1800+Math.random()*4200;bp.Q.value=1.5;const gn=ac.createGain();gn.gain.value=(.04+Math.random()*.08)*RL;s.connect(bp);bp.connect(gn);gn.connect(mg);s.start()}
function patLoop(){RL+=((AJ.sRain?SKY.lvl:0)-RL)*.1;if(ac&&want&&ac.state==='running'&&RL>.02)dropSound();setTimeout(patLoop,50+Math.random()*(220-170*RL))}
function chirp(pan,vol){if(!AJ.sBirds||!ac||!want||ac.state!=='running')return;const t0=ac.currentTime+.02,trill=Math.random()<.35,base=2400+Math.random()*2200,pn=ac.createStereoPanner?ac.createStereoPanner():null;if(pn){pn.pan.value=pan;pn.connect(birdBus)}const out=pn||birdBus,n=trill?1:2+Math.floor(Math.random()*4);let t=t0;
for(let i=0;i<n;i++){const o=ac.createOscillator(),gn=ac.createGain(),d=trill?.45+Math.random()*.4:.06+Math.random()*.07,f=base*(1+(Math.random()-.5)*.25);o.type='sine';
o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*(1.25+Math.random()*.35),t+d*.45);o.frequency.exponentialRampToValueAtTime(f*(.85+Math.random()*.2),t+d);
if(trill){const l=ac.createOscillator(),lg=ac.createGain();l.frequency.value=18+Math.random()*10;lg.gain.value=f*.07;l.connect(lg);lg.connect(o.frequency);l.start(t);l.stop(t+d+.05)}
gn.gain.setValueAtTime(.0001,t);gn.gain.exponentialRampToValueAtTime(vol,t+.012);gn.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(gn);gn.connect(out);o.start(t);o.stop(t+d+.05);t+=d+.05+Math.random()*.06}}
function birdLoop(){if(SKY.birds)chirp(Math.random()*2-1,.05+Math.random()*.05);setTimeout(birdLoop,1500+Math.random()*5500)}
function thunder(d){if(!ac||!want||ac.state!=='running'||!SKY.storm||!AJ.sRain)return;const t=ac.currentTime+d,s=ac.createBufferSource();s.buffer=thB;const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.setValueAtTime(260,t);lp.frequency.exponentialRampToValueAtTime(70,t+2.8);
const gn=ac.createGain(),pk=.7/(1+d*.4);gn.gain.setValueAtTime(.0001,t);gn.gain.exponentialRampToValueAtTime(pk,t+.08);gn.gain.exponentialRampToValueAtTime(pk*.3,t+.9);gn.gain.exponentialRampToValueAtTime(.0001,t+3.4);s.connect(lp);lp.connect(gn);gn.connect(mg);s.start(t,Math.random()*3);s.stop(t+3.6)}
let CR=[],nextFrog=0,nextOwl=0;
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
function aplicarVolumen(){if(ac&&want)mg.gain.setTargetAtTime(AJ.volumen/100,ac.currentTime,.2)}
function setSnd(on){if(on&&SAVER){toast('🔋 El modo ahorro mantiene el sonido apagado');return}want=on;if(on){initAudio();if(ac&&ac.resume)ac.resume()}if(ac)mg.gain.setTargetAtTime(on?AJ.volumen/100:0,ac.currentTime,.5);
const b=$('sndbtn');b.textContent=on?'🔊 Sonido':'🔇 Sonido';b.setAttribute('aria-pressed',on);b.setAttribute('aria-label',on?'Apagar sonido':'Activar sonido');
updateSound();toast(!on?'🔇 Sonido apagado':SKY.lvl>0?'🔊 Sonido de lluvia activado':SKY.birds?'🔊 Se oyen pájaros: hace calor y es de día':SKY.night?'🔊 Se oyen grillos y ranas: es de noche':'🔊 Activado: suena con lluvia, y con pájaros en días cálidos')}
function iniciarSonido(){
$('sndbtn').onclick=()=>setSnd(!want);
document.addEventListener('visibilitychange',()=>{if(!ac)return;if(document.hidden)ac.suspend();else if(want)ac.resume()});
}
