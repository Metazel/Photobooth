/* Cabine Photo — service worker
   Rend l'application utilisable sans réseau : tout est servi depuis le cache.
   Change CACHE lors d'une mise à jour pour forcer le rechargement des fichiers. */
const CACHE='cabine-photo-v1';

const ASSETS=[
  './',
  'index.html',
  'manifest.webmanifest',
  'bandeaux/index.json',
  'bandeaux/bandeau-haut-sacha.jpg',
  'bandeaux/pied-de-bande-sacha.jpg',
  'bandeaux/thumbs/bandeau-haut-sacha.jpg',
  'bandeaux/thumbs/pied-de-bande-sacha.jpg',
  'cadres/solo-rap-street-art.png',
  'cadres/solo-stade-om.png',
  'cadres/solo-vieux-port.png',
  'cadres/solo-marseille-13.png',
  'cadres/groupe-marseille-13.png',
  'cadres/thumbs/solo-rap-street-art.png',
  'cadres/thumbs/solo-stade-om.png',
  'cadres/thumbs/solo-vieux-port.png',
  'cadres/thumbs/solo-marseille-13.png',
  'cadres/thumbs/groupe-marseille-13.png'
];

self.addEventListener('install',e=>{
  e.waitUntil((async()=>{
    const c=await caches.open(CACHE);
    /* addAll échoue en bloc si un fichier manque : on met en cache un par un */
    await Promise.all(ASSETS.map(u=>c.add(u).catch(()=>{})));
    self.skipWaiting();
  })());
});

self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    const noms=await caches.keys();
    await Promise.all(noms.filter(n=>n!==CACHE).map(n=>caches.delete(n)));
    self.clients.claim();
  })());
});

self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;                     /* les envois d'e-mail passent au réseau */
  const url=new URL(req.url);
  if(url.hostname.indexOf('script.google.com')>=0)return;

  e.respondWith((async()=>{
    const cached=await caches.match(req,{ignoreSearch:false});
    if(cached)return cached;
    try{
      const res=await fetch(req);
      /* on garde au passage les polices Google et tout ce qui est récupéré */
      if(res&&(res.ok||res.type==='opaque')){
        const c=await caches.open(CACHE);
        c.put(req,res.clone());
      }
      return res;
    }catch(err){
      /* hors ligne et absent du cache : on renvoie la page si c'est une navigation */
      if(req.mode==='navigate'){
        const p=await caches.match('index.html');
        if(p)return p;
      }
      throw err;
    }
  })());
});
