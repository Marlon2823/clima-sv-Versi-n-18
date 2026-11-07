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
