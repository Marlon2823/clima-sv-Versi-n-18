/* Animaciones del cielo en canvas (lluvia, sol, nubes, estrellas, pájaros, rayos). */
let NOANIM=false,drawing=false;
const cv=$('fx'),g=cv.getContext('2d');
let W,H,drops=[[],[],[]],clouds=[],stars=[],birds=[],splash=[],flash=0,tick=0,bolt=null,shoot=null,RAYS=null,CL=null,ff=[];
function rs(){W=innerWidth;H=innerHeight;const d=Math.min(2,devicePixelRatio||1);cv.width=W*d;cv.height=H*d;g.setTransform(d,0,0,d,0,0)}
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
birds=[];splash=[];bolt=null;ff=Array.from({length:14},()=>({x:Math.random()*W,y:H*(.4+Math.random()*.55),t:Math.random()*20,p:Math.random()*6}));updateSound();if(SAVER)kick()}
function sunFX(a){const x=W*.82,y=110;g.save();g.globalAlpha=a;
const pl=1+Math.sin(tick/70)*.04;let gr=g.createRadialGradient(x,y,12,x,y,200*pl);gr.addColorStop(0,'rgba(255,244,180,.9)');gr.addColorStop(.22,'rgba(255,226,120,.4)');gr.addColorStop(1,'rgba(255,226,120,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,200*pl,0,7);g.fill();
if(!RAYS)RAYS=mkRays();g.translate(x,y);g.rotate(tick/1100);g.drawImage(RAYS,-380,-380);g.rotate(-tick/1100);g.translate(-x,-y);
gr=g.createRadialGradient(x-8,y-8,4,x,y,40);gr.addColorStop(0,'#fffbe0');gr.addColorStop(.55,'#ffe066');gr.addColorStop(1,'#ffb93b');g.fillStyle=gr;g.beginPath();g.arc(x,y,38,0,7);g.fill();
if(cur==='sun'){[[.35,16,.08],[.6,26,.06],[.85,11,.1]].forEach(f=>{const fx=x+(W*.45-x)*f[0]*1.7,fy=y+(H*.55-y)*f[0]*1.7;g.fillStyle='rgba(255,255,255,'+f[2]+')';g.beginPath();g.arc(fx,fy,f[1],0,7);g.fill();g.strokeStyle='rgba(255,230,150,'+f[2]+')';g.lineWidth=2;g.stroke()})}
g.restore()}
function nightFX(){stars.forEach(a=>{g.globalAlpha=.25+.75*Math.abs(Math.sin(tick/50+a.p));g.fillStyle=a.c;g.beginPath();g.arc(a.x,a.y,a.r,0,7);g.fill()});g.globalAlpha=1;
if(!shoot&&Math.random()<.002)shoot={x:W*(.3+Math.random()*.6),y:20+Math.random()*H*.2,vx:-9-Math.random()*4,vy:4+Math.random()*2,t:0};
if(shoot){shoot.x+=shoot.vx;shoot.y+=shoot.vy;shoot.t++;const al=Math.max(0,1-shoot.t/38),gr=g.createLinearGradient(shoot.x,shoot.y,shoot.x-shoot.vx*6,shoot.y-shoot.vy*6);gr.addColorStop(0,'rgba(255,255,255,'+al+')');gr.addColorStop(1,'rgba(255,255,255,0)');g.strokeStyle=gr;g.lineWidth=2;g.beginPath();g.moveTo(shoot.x,shoot.y);g.lineTo(shoot.x-shoot.vx*6,shoot.y-shoot.vy*6);g.stroke();if(shoot.t>38)shoot=null}
const mx=W*.82,my=100;let gr=g.createRadialGradient(mx,my,20,mx,my,120);gr.addColorStop(0,'rgba(225,232,255,.4)');gr.addColorStop(1,'rgba(225,232,255,0)');g.fillStyle=gr;g.beginPath();g.arc(mx,my,120,0,7);g.fill();
gr=g.createRadialGradient(mx-8,my-8,4,mx,my,32);gr.addColorStop(0,'#fffdf0');gr.addColorStop(1,'#e3dfc0');g.fillStyle=gr;g.beginPath();g.arc(mx,my,30,0,7);g.fill();
g.fillStyle='rgba(150,148,125,.28)';[[-9,-6,6],[8,4,8],[-2,13,4],[11,-11,3.5]].forEach(c=>{g.beginPath();g.arc(mx+c[0],my+c[1],c[2],0,7);g.fill()})}
function spawnBird(){const dir=Math.random()<.5?1:-1;birds.push({x:dir>0?-30:W+30,y:H*(.1+Math.random()*.3),v:dir*(.8+Math.random()*1.1),s:7+Math.random()*7,p:Math.random()*6,b:Math.random()*6,a:10+Math.random()*14});chirp(dir>0?-.6:.6,.07)}
function birdFX(){birds=birds.filter(b=>b.x>-60&&b.x<W+60);birds.forEach(b=>{b.x+=b.v;b.p+=.17+b.s*.004;b.b+=.03;const y=b.y+Math.sin(b.b)*b.a,w=Math.sin(b.p)*b.s*.7;g.strokeStyle='rgba(35,45,58,.72)';g.lineWidth=1.8;g.lineCap='round';g.beginPath();g.moveTo(b.x-b.s,y-w);g.quadraticCurveTo(b.x-b.s*.45,y-w*.2-b.s*.3,b.x,y);g.quadraticCurveTo(b.x+b.s*.45,y-w*.2-b.s*.3,b.x+b.s,y-w);g.stroke()})}
function makeBolt(){const pts=[];let x=W*(.2+Math.random()*.6),y=0;pts.push([x,y]);while(y<H*.55){y+=18+Math.random()*28;x+=(Math.random()-.5)*50;pts.push([x,y])}
const br=[];for(let i=3;i<pts.length-1;i+=3){if(Math.random()<.6){let bx=pts[i][0],by=pts[i][1];const q=[[bx,by]];for(let k=0;k<4;k++){bx+=(Math.random()-.3)*30*(Math.random()<.5?-1:1);by+=14+Math.random()*18;q.push([bx,by])}br.push(q)}}
return{pts,br,life:10}}
function boltFX(){if(!bolt)return;bolt.life--;if(bolt.life<=0){bolt=null;return}if(bolt.life%4===1)return;g.save();g.shadowColor='rgba(190,210,255,.95)';g.shadowBlur=20;g.lineJoin='round';
const path=p=>{g.beginPath();p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.stroke()};
g.strokeStyle='rgba(255,255,255,.95)';g.lineWidth=2.4;path(bolt.pts);g.strokeStyle='rgba(215,228,255,.7)';g.lineWidth=1.2;bolt.br.forEach(path);g.restore()}
function draw(){tick++;g.clearRect(0,0,W,H);const s=cs(),wet=cur==='rain'||cur==='storm',st=cur==='storm',night=cur==='night';
if(night)nightFX();else if(cur==='sun'||cur==='cloud')sunFX(cur==='sun'?1:.55);
const sp=(wet||night)?CL.dark:CL.light,ca=night?.45:(document.documentElement.classList.contains('dk')?.55:1);
clouds.forEach(c=>{c.x+=c.v;if(c.x>W+40)c.x=-300*c.k;g.globalAlpha=c.a*ca;g.drawImage(sp[c.i],c.x,c.y,300*c.k,140*c.k)});g.globalAlpha=1;
if(SKY.birds&&birds.length<3&&Math.random()<.0035)spawnBird();birdFX();if(SKY.night)flyFX();
if(wet){const wx=-(.7+s.w*.045)*(st?1.5:1),LS=[['rgba(195,215,240,.3)',.8],['rgba(210,228,250,.45)',1.2],['rgba(228,240,255,.65)',1.8]];
drops.forEach((arr,z)=>{g.strokeStyle=LS[z][0];g.lineWidth=LS[z][1];g.beginPath();arr.forEach(d=>{d.y+=d.v;d.x+=wx;if(d.y>H){if(z>0&&splash.length<50&&Math.random()<.5)splash.push({x:d.x,y:H-6-Math.random()*10,t:0});d.y=-d.l;d.x=Math.random()*(W+160)}else if(d.x<-30)d.x+=W+160;g.moveTo(d.x,d.y);g.lineTo(d.x-wx*d.l/d.v,d.y-d.l)});g.stroke()});
g.lineWidth=1;splash=splash.filter(p=>p.t<12);splash.forEach(p=>{p.t++;g.strokeStyle='rgba(225,238,255,'+(.55*(1-p.t/12))+')';g.beginPath();g.ellipse(p.x,p.y,2+p.t*.9,(2+p.t*.9)*.33,0,0,7);g.stroke()});
const mg2=g.createLinearGradient(0,H-160,0,H);mg2.addColorStop(0,'rgba(190,210,230,0)');mg2.addColorStop(1,'rgba(190,210,230,.2)');g.fillStyle=mg2;g.fillRect(0,H-160,W,160)}
if(st){if(Math.random()<.006){flash=1;bolt=makeBolt();thunder(.4+Math.random()*2.2)}boltFX();if(flash>0){g.fillStyle='rgba(255,255,255,'+flash*.42+')';g.fillRect(0,0,W,H);flash-=.06}}
if(SAVER||NOANIM){drawing=false;return}requestAnimationFrame(draw)}
function kick(){if(drawing)return;drawing=true;draw()}
function flyFX(){ff.forEach((f,i)=>{f.t+=.012;const x=f.x+Math.sin(f.t*1.3+i)*40,y=f.y+Math.cos(f.t+i*2)*24,a=Math.pow(Math.max(0,Math.sin(f.t*2.1+f.p)),2);if(a<.02)return;g.fillStyle='rgba(215,255,120,'+(a*.28)+')';g.beginPath();g.arc(x,y,9,0,7);g.fill();g.fillStyle='rgba(240,255,170,'+a+')';g.beginPath();g.arc(x,y,2.2,0,7);g.fill()})}
function iniciarCanvas(){
addEventListener('resize',rs);
rs();
}
function arrancarAnimacion(){
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
NOANIM=RM;
if(!RM){drawing=true;draw()}else{tick=0;g.clearRect(0,0,W,H)}
}
