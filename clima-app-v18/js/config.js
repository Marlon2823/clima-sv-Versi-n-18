/* Constantes: paletas de cada estado del clima, departamentos y versión de la app. */
const APP_VERSION='18';
const S={
sun:{n:'Soleado',e:'☀️',a:'#2e8bd8',b:'#9bd6f7',t:32,f:35,r:5,c:10,uv:10,w:12,dir:60,h:46,sun:.55},
cloud:{n:'Nublado',e:'⛅',a:'#5d7388',b:'#b3c2d0',t:27,f:29,r:25,c:78,uv:4,w:18,dir:120,h:68,sun:.55},
rain:{n:'Lluvia',e:'🌧️',a:'#334a5e',b:'#7189a0',t:24,f:25,r:82,c:92,uv:1,w:22,dir:200,h:88,sun:.55},
storm:{n:'Tormenta',e:'⛈️',a:'#171f2b',b:'#475565',t:23,f:25,r:96,c:100,uv:0,w:38,dir:240,h:92,sun:.55},
night:{n:'Noche',e:'🌙',a:'#0a1030',b:'#2b2f6b',t:22,f:22,r:8,c:15,uv:0,w:6,dir:20,h:70,sun:null},
cold:{n:'Frío',e:'🥶',a:'#6f8fb5',b:'#d4e3f2',t:12,f:9,r:10,c:40,uv:1,w:20,dir:300,h:60,sun:.55}
};
const DEPS={'Ahuachapán':[13.92,-89.85],'Santa Ana':[13.99,-89.56],'Sonsonate':[13.72,-89.72],'La Libertad':[13.68,-89.28],'Chalatenango':[14.03,-88.93],'San Salvador':[13.69,-89.22],'Cuscatlán':[13.72,-88.93],'La Paz':[13.51,-88.87],'Cabañas':[13.87,-88.63],'San Vicente':[13.64,-88.79],'Usulután':[13.35,-88.45],'San Miguel':[13.48,-88.18],'Morazán':[13.70,-88.10],'La Unión':[13.34,-87.84]};
