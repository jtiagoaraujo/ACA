const FB='https://www.facebook.com/armazens.stoantonio/',IG='https://www.instagram.com/armazensstoantonio/';
const HORAS=[['Segunda a sexta','09:00–12:30 · 14:00–18:30'],['Sábado','08:30–12:30'],['Domingo','Encerrado']];
const CONTACT={tel:'252 990 480',email:'geral@acaraujo.com',morada:'Av. Riopele, 28, 4770-420 Pousada de Saramagos'};
const FAQ=[
 ['Que tipo de produtos vendem?','Materiais de construção, artefactos de cimento, ferro e metais, ferragens e ferramentas, louça sanitária, torneiras, móveis e equipamentos de cozinha.'],
 ['Os preços estão disponíveis no site?','Alguns produtos mostram preço indicativo. Para orçamentos, contacte-nos por telefone ou email.'],
 ['Como sei se um produto está em stock?','A disponibilidade varia. Ligue para '+CONTACT.tel+' ou envie email para confirmar antes de se deslocar.'],
 ['Fazem entregas?','Contacte-nos com a morada e os materiais pretendidos para combinarmos a entrega.'],
 ['Pedem orçamentos para obras?','Sim. Envie a lista de materiais pelo formulário de contacto e respondemos o mais breve possível.'],
 ['Têm apoio na escolha de materiais?','Sim, a nossa equipa ajuda a escolher a solução certa para cada obra.']];
const C=window.REMOTE||(typeof CUSTOM!=='undefined'?CUSTOM:{});const ABA=Object.assign({ativa:false,titulo:'Promoções',intro:''},C.aba),BAN=C.banners||[];
const ALT=C.alteracoes||{};P.forEach(p=>{const a=ALT[p.r];if(a)Object.assign(p,a)});
(C.produtos||[]).forEach(x=>P.push({id:P.length,r:x.ref,n:x.n,c:x.c,p:x.p,ant:x.ant,d:x.d,img:x.img,dest:x.dest,novo:x.novo,promo:x.promo,custom:1}));
const eur=n=>n.toFixed(2).replace('.',',')+' €';
const preco=p=>p.p!=null?(p.ant?`<s>${eur(p.ant)}</s> `:'')+eur(p.p):'';
const banner=b=>`<a class="banner" href="${esc(b.link||'#/promocoes')}"><img src="${b.img}" alt="${esc(b.titulo||'Promoção')}">${b.titulo||b.texto?`<div><h3>${esc(b.titulo||'')}</h3><p>${esc(b.texto||'')}</p></div>`:''}</a>`;
const $=s=>document.querySelector(s),app=$('#app');
const esc=t=>t.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ci=id=>CATS.findIndex(c=>c[0]===id),catName=id=>CATS[ci(id)][1];
// Imagem real: coloque ficheiros em imagens/<REF>.jpg (ex.: imagens/5MORRAT.jpg). Sem ficheiro, mostra o ícone da categoria.
// Imagens por família de artigo (só domínio público/CC0 confirmado). Formato: [expressão sobre o nome, URL].
const FAM=[[/^PARAF/i,'https://commons.wikimedia.org/wiki/Special:FilePath/Screws.jpg?width=400']];
const famImg=p=>(FAM.find(f=>f[0].test(p.n))||[])[1];
function imgFail(el){const f=el.dataset.fam;if(f&&el.dataset.t!=='1'){el.dataset.t='1';el.src=f}else el.remove()}
const ph=(p,cls='')=>`<div class="ph ${cls}"><span></span><img src="${p.img||'imagens/'+encodeURIComponent(p.r)+'.jpg'}" data-fam="${famImg(p)||''}" alt="${esc(p.n)}" loading="lazy" onerror="imgFail(this)"></div>`;
const card=p=>`<a class="card" href="#/produto/${p.id}">${ph(p)}<small>${catName(p.c)}${p.promo?'<span class="tag">Promoção</span>':''}</small><h3>${esc(p.n)}</h3><b>${p.p!=null?'<span class="pv">'+preco(p)+'</span> · ':''}Ref. ${esc(p.r)}</b></a>`;
const pick=(k,n)=>CATS.slice(0,8).map((c,i)=>{const l=P.filter(p=>p.c===c[0]);return l[Math.floor(l.length*k)+i%3]}).slice(0,n);

function home(){return `
<section class="hero"><div class="wrap"><h1>Materiais de construção e ferragens para todas as obras</h1>
<p>Procure entre mais de ${Math.floor(P.length/100)*100} artigos e peça orçamento. Atendimento em loja em Pousada de Saramagos.</p>
<form class="search" id="hs"><input type="search" id="hq" placeholder="Pesquisar produto ou referência" aria-label="Pesquisar produtos"><button>Pesquisar</button></form>
<div class="chips">${CATS.slice(0,8).map(c=>`<a href="#/catalogo?c=${c[0]}">${c[1]}</a>`).join('')}</div></div></section>
${BAN.length&&ABA.ativa?`<section class="wrap nopad" style="padding-top:32px">${banner(BAN[0])}</section>`:''}
<div class="facts"><div class="wrap"><div><b>${Math.floor(P.length/100)*100}+</b><span>artigos no catálogo</span></div><div><b>${CATS.length}</b><span>categorias de produto</span></div><div><b>Orçamentos</b><span>pedidos online, resposta por email ou telefone</span></div><div><b>Pousada de Saramagos</b><span>Av. Riopele, 28</span></div></div></div>
<section class="wrap"><div class="sec-head"><h2>Categorias principais</h2><a href="#/catalogo">Ver todo o catálogo</a></div><div class="grid cats">${CATS.map(c=>`<a href="#/catalogo?c=${c[0]}">${c[1]}<small>${P.filter(p=>p.c===c[0]).length} artigos</small></a>`).join('')}</div></section>
<section class="wrap nopad"><h2>Produtos em destaque</h2><div class="grid">${[...P.filter(p=>p.dest),...pick(.3,8)].slice(0,8).map(card).join('')}</div></section>
<section class="band"><div class="wrap"><h2>Novidades e coleções</h2><div class="grid">${[...P.filter(p=>p.novo),...pick(.7,8)].slice(0,8).map(card).join('')}</div></div></section>
<section class="wrap two"><div><h2>Bem-vindo aos Armazéns Santo António</h2>
<p>A Abílio da Costa Araújo & Filhos, Lda é uma loja de materiais de construção e diversos, com soluções para obras novas, remodelações e pequenas reparações.</p><p><a class="btn" href="#/sobre">Conheça a loja</a></p></div>
<div class="box"><h3>Visite-nos</h3><p>${CONTACT.morada}<br>Tel. ${CONTACT.tel}<br>${CONTACT.email}</p><p><a class="btn" href="#/contactos">Contactos e horário</a></p></div></section>`}

let F={q:'',c:'',o:'n',pg:0};const PS=48;
function list(){
 const q=F.q.toLowerCase().trim();
 let r=P.filter(p=>(!F.c||p.c===F.c)&&(!q||(p.n+' '+p.r+' '+(p.d||'')).toLowerCase().includes(q)));
 if(F.o==='n')r=[...r].sort((a,b)=>(b.custom?1:0)-(a.custom?1:0)||a.id-b.id);if(F.o==='r')r=[...r].sort((a,b)=>a.r.localeCompare(b.r));else if(F.o==='a')r=[...r].sort((a,b)=>a.n.localeCompare(b.n,'pt'));else if(F.o==='z')r=[...r].reverse();
 const pages=Math.max(1,Math.ceil(r.length/PS));F.pg=Math.min(F.pg,pages-1);
 $('#res').innerHTML=r.length?r.slice(F.pg*PS,F.pg*PS+PS).map(card).join(''):'<p>Nenhum produto encontrado.</p>';
 $('#cnt').textContent=r.length+' artigo(s)';
 $('#pg').innerHTML=pages>1?`<button class="btn" ${F.pg?'':'disabled'} data-d="-1">‹ Anterior</button><span>Página ${F.pg+1} de ${pages}</span><button class="btn" ${F.pg<pages-1?'':'disabled'} data-d="1">Seguinte ›</button>`:'';
 document.querySelectorAll('#pg button').forEach(b=>b.onclick=()=>{F.pg+=+b.dataset.d;list();scrollTo(0,0)})}
function catalog(qs){
 const u=new URLSearchParams(qs);if(u.has('c')){F.c=u.get('c');F.pg=0}if(u.has('q')){F.q=u.get('q');F.pg=0}
 app.innerHTML=`<section class="wrap"><h1 style="margin-bottom:20px">Catálogo de produtos</h1><div class="shop"><aside class="side"><h3>Categorias</h3>
 <a href="#/catalogo?c=" class="${F.c?'':'on'}">Todas <em>${P.length}</em></a>${CATS.map(c=>`<a href="#/catalogo?c=${c[0]}" class="${F.c===c[0]?'on':''}">${c[1]} <em>${P.filter(p=>p.c===c[0]).length}</em></a>`).join('')}</aside>
 <div><div class="tools"><select id="cs" class="mob" aria-label="Categoria"><option value="">Todas as categorias</option>${CATS.map(c=>`<option value="${c[0]}" ${F.c===c[0]?'selected':''}>${c[1]}</option>`).join('')}</select><input type="search" id="q" placeholder="Pesquisar por nome ou referência…" value="${esc(F.q)}" aria-label="Pesquisar">
 <select id="o" aria-label="Ordenar"><option value="n">Relevância</option><option value="a">Nome A–Z</option><option value="z">Nome Z–A</option><option value="r">Referência</option></select></div>
 <p id="cnt" class="note" style="margin:0 0 16px"></p><div class="grid" id="res"></div><div class="pager" id="pg"></div></div></div></section>`;
 $('#o').value=F.o;
 ['q','o'].forEach(k=>$('#'+k).addEventListener('input',e=>{F[k]=e.target.value;F.pg=0;list()}));
 $('#cs').onchange=e=>{location.hash='#/catalogo?c='+e.target.value};
 list()}

function product(id){
 const p=P[id];if(!p)return location.hash='#/catalogo';
 const w=p.n.split(' ')[0];
 const sim=P.filter(x=>x.c===p.c&&x.id!==p.id&&x.n.split(' ')[0]===w).slice(0,4);
 app.innerHTML=`<div class="wrap"><p class="crumb"><a href="#/catalogo">Catálogo</a> / <a href="#/catalogo?c=${p.c}">${catName(p.c)}</a> / ${esc(p.n)}</p>
 <div class="two" style="align-items:start"><div class="gal">${ph(p,'bigph')}</div>
 <div><small style="color:var(--o);font-weight:600">${catName(p.c)}</small><h1>${esc(p.n)}</h1>
 <div class="price">${preco(p)||'Preço sob consulta'}</div>${p.d?`<p>${esc(p.d)}</p>`:''}
 <table><tr><td>Referência</td><td>${esc(p.r)}</td></tr><tr><td>Categoria</td><td>${catName(p.c)}</td></tr><tr><td>Disponibilidade</td><td>Consulte-nos em loja ou por telefone</td></tr></table>
 <a class="btn" href="#/contactos?ref=${encodeURIComponent(p.r+' – '+p.n)}">Pedir orçamento</a></div></div>
 <section><h2>Produtos semelhantes</h2><div class="grid">${sim.map(card).join('')||'<p>Sem produtos semelhantes.</p>'}</div></section></div>`}

const about=()=>`<section class="wrap"><h2>Sobre nós</h2><div class="two"><div>
<h3>A nossa história</h3><p>A Abílio da Costa Araújo & Filhos, Lda é uma empresa familiar sediada em Pousada de Saramagos, com loja de materiais de construção e diversos.</p>
<p><i>Desde 1952.</i></p>
<h3 style="margin-top:20px">Missão</h3><p>Fornecer materiais de qualidade, com aconselhamento próximo, para que cada obra corra bem.</p></div>
<img class="about-logo" src="logo.png" alt="Emblema Armazéns Santo António"></div></section>
<section class="band"><div class="wrap"><h2>Valores</h2><div class="values">
<div><h3>Confiança</h3><p>Relação de proximidade e palavra dada.</p></div>
<div><h3>Qualidade</h3><p>Materiais selecionados para durar.</p></div>
<div><h3>Serviço</h3><p>Aconselhamento para cada projeto.</p></div>
<div><h3>Tradição familiar</h3><p>Uma empresa de família ao serviço da região.</p></div></div></div></section>
<section class="wrap"><h2>A nossa loja</h2><div class="grid">${[1,2,3].map(()=>'<div class="ph"><span></span></div>').join('')}</div></section>`;

const contacts=(ref)=>`<section class="wrap"><h2>Contactos</h2><div class="two" style="align-items:start"><div>
<div class="box"><p><b>Morada</b><br>${CONTACT.morada}</p><p style="margin-top:12px"><b>Telefone</b><br><a href="tel:+351252990480">${CONTACT.tel}</a></p>
<p style="margin-top:12px"><b>Email</b><br><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></p>
<p style="margin-top:12px"><b>Horário de funcionamento</b></p><table class="hours">${HORAS.map(([d,h])=>`<tr><td>${d}</td><td>${h}</td></tr>`).join('')}</table>
<p class="soc"><b style="color:var(--t)">Redes sociais</b><br><a href="${FB}" target="_blank" rel="noopener">Facebook</a> · <a href="${IG}" target="_blank" rel="noopener">Instagram</a></p></div>
<iframe title="Mapa" style="width:100%;height:240px;border:0;border-radius:12px;margin-top:16px" loading="lazy" src="https://www.google.com/maps?q=Av.+Riopele+28,+4770-420+Pousada+de+Saramagos&output=embed"></iframe></div>
<form class="form box" id="cf"><h3>Envie-nos uma mensagem</h3><input name="n" placeholder="Nome" required><input name="e" type="email" placeholder="Email" required>
<input name="t" placeholder="Telefone"><textarea name="m" rows="5" placeholder="Mensagem ou lista de materiais" required>${ref?esc("Pedido de orçamento: "+ref):''}</textarea><button class="btn">Enviar</button>
<p class="note">Abre o seu programa de email. Para envio direto, ligue o formulário a um serviço (ex.: Formspree).</p></form></div></section>`;

const promos=()=>`<section class="wrap"><h1>${esc(ABA.titulo)}</h1>${ABA.intro?`<p style="margin:10px 0">${esc(ABA.intro)}</p>`:''}<div style="display:grid;gap:18px;margin:22px 0">${BAN.map(banner).join('')}</div>${P.filter(p=>p.promo).length?`<div class="grid">${P.filter(p=>p.promo).map(card).join('')}</div>`:(BAN.length?'':'<p>Sem promoções de momento.</p>')}</section>`;

const faq=()=>`<section class="wrap" style="max-width:800px"><h2>Perguntas frequentes</h2>${FAQ.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>`;

function route(){
 const [path,qs]=(location.hash.slice(2)||'').split('?'),[r,id]=path.split('/');
 ({'':home,catalogo:()=>catalog(qs),produto:()=>product(+id),sobre:()=>app.innerHTML=about(),contactos:()=>{app.innerHTML=contacts(new URLSearchParams(qs).get('ref'));$('#cf').onsubmit=e=>{e.preventDefault();const d=new FormData(e.target);location.href=`mailto:${CONTACT.email}?subject=${encodeURIComponent('Contacto via site – '+d.get('n'))}&body=${encodeURIComponent(d.get('m')+'\n\nTel: '+d.get('t')+'\nEmail: '+d.get('e'))}`}},faq:()=>app.innerHTML=faq(),promocoes:()=>app.innerHTML=promos()}[r]||home)();
 if(r===''){app.innerHTML=home();$('#hs').onsubmit=e=>{e.preventDefault();F.c='';location.hash='#/catalogo?q='+encodeURIComponent($('#hq').value)}}
 if(r==='faq')app.innerHTML=faq();
 document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.dataset.r===(r==='produto'?'catalogo':r)));
 $('#nav').classList.remove('open');scrollTo(0,0)}
if(ABA.ativa)document.querySelector('#nav a[data-r="sobre"]').insertAdjacentHTML('beforebegin',`<a href="#/promocoes" data-r="promocoes">${esc(ABA.titulo)}</a>`);
$('#burger').onclick=()=>{const o=$('#nav').classList.toggle('open');$('#burger').setAttribute('aria-expanded',o)};
$('#y').textContent=new Date().getFullYear();
addEventListener('hashchange',route);route();
