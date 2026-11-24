// Carrega produtos, alterações, banners e aba de promoções do Supabase e só depois arranca o site.
(async()=>{
 if(typeof SUPA!=='undefined'&&SUPA.url&&SUPA.key){try{
  const H={apikey:SUPA.key,Authorization:'Bearer '+SUPA.key},ctl=new AbortController();setTimeout(()=>ctl.abort(),6000);
  const g=t=>fetch(SUPA.url+'/rest/v1/'+t,{headers:H,signal:ctl.signal}).then(r=>{if(!r.ok)throw 0;return r.json()});
  const [pr,ba,cf]=await Promise.all([g('produtos?select=*'),g('banners?select=*&order=ordem.asc,id.asc'),g('config?select=*&id=eq.1')]);
  const c=cf[0]||{},C={aba:{ativa:!!c.ativa,titulo:c.titulo||'Promoções',intro:c.intro||''},banners:ba.map(b=>({img:b.img,titulo:b.titulo||'',texto:b.texto||'',link:b.link||''})),produtos:[],alteracoes:{}};
  pr.forEach(x=>{const o={};['n','c','p','ant','d','img','dest','novo','promo'].forEach(k=>{if(x[k]!==null&&x[k]!==undefined&&x[k]!=='')o[k]=x[k]});
   if(x.custom)C.produtos.push({ref:x.ref,...o});else C.alteracoes[x.ref]=o});
  window.REMOTE=C}catch(e){console.warn('Supabase indisponível; a usar custom.js')}}
 const s=document.createElement('script');s.src='script.js';document.body.appendChild(s)})();
