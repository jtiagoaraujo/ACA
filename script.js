const FB='https://www.facebook.com/armazens.stoantonio/',IG='https://www.instagram.com/armazensstoantonio/';
const HORAS=[['Segunda a sexta','09:00–12:30 · 14:00–18:30'],['Sábado','08:30–12:30'],['Domingo','Encerrado']];
const CONTACT={tel:'252 990 480',email:'geral@acaraujo.com',morada:'Av. Riopele, 28, 4770-420 Pousada de Saramagos'};
const CATS=[
 {id:'ferragens',n:'Ferragens e Ferramentas',i:'🔧'},
 {id:'ferro',n:'Ferro e Metais',i:'🏗️'},
 {id:'sanitaria',n:'Louça Sanitária e Banhos',i:'🚿'},
 {id:'cimento',n:'Artefactos de Cimento',i:'🧱'},
 {id:'basicos',n:'Materiais Básicos',i:'🪣'},
 {id:'cozinha',n:'Móveis e Cozinhas',i:'🍳'}];
// Produtos de EXEMPLO – substitua por produtos reais.
const P=[
 {id:1,n:'Ferro redondo para betão',c:'ferro',b:'Linha Obra',p:null,i:'🏗️',h:20,f:1,d:'Varão de aço nervurado para armaduras de betão armado.',s:{Material:'Aço A500',Utilização:'Estruturas de betão'},v:['Ø8','Ø10','Ø12','Ø16']},
 {id:2,n:'Perfil metálico estrutural',c:'ferro',b:'Linha Pro',p:null,i:'📐',h:210,d:'Perfis em aço para estruturas, vigas e reforços.',s:{Material:'Aço laminado',Acabamento:'Natural'},v:['IPE 100','IPE 140','UPN 80']},
 {id:3,n:'Bloco de cimento',c:'cimento',b:'Linha Obra',p:0.95,i:'🧱',h:30,f:1,d:'Bloco de betão para alvenaria e muros.',s:{Dimensões:'50×20×20 cm',Tipo:'Normal'},v:['15 cm','20 cm','25 cm']},
 {id:4,n:'Manilha de betão',c:'cimento',b:'Linha Obra',p:null,i:'⭕',h:40,d:'Manilhas para saneamento e drenagem.',s:{Material:'Betão',Aplicação:'Saneamento'},v:['Ø300','Ø400','Ø500']},
 {id:5,n:'Cimento Portland 25 kg',c:'basicos',b:'Linha Pro',p:5.9,i:'🪣',h:50,f:1,d:'Cimento de uso geral para argamassas e betões.',s:{Peso:'25 kg',Classe:'CEM II 32,5'},v:['25 kg']},
 {id:6,n:'Areia lavada',c:'basicos',b:'Linha Obra',p:null,i:'⏳',h:45,d:'Areia lavada para betão e reboco.',s:{Granulometria:'Fina / média'},v:['Saco','Big bag']},
 {id:7,n:'Conjunto de chaves de fendas',c:'ferragens',b:'Linha Pro',p:14.5,i:'🪛',h:0,f:1,n2:1,d:'Conjunto de 8 chaves com cabo ergonómico.',s:{Peças:'8',Material:'Aço cromo-vanádio'},v:['8 peças','12 peças']},
 {id:8,n:'Martelo de carpinteiro',c:'ferragens',b:'Linha Obra',p:9.9,i:'🔨',h:10,d:'Martelo com cabo antiderrapante.',s:{Peso:'500 g'},v:['400 g','500 g','600 g']},
 {id:9,n:'Torneira monocomando lavatório',c:'sanitaria',b:'Linha Casa',p:39,i:'🚰',h:190,f:1,n2:1,d:'Torneira de lavatório com cartucho cerâmico.',s:{Acabamento:'Cromado',Cartucho:'35 mm'},v:['Cromado','Preto mate']},
 {id:10,n:'Base de duche',c:'sanitaria',b:'Linha Casa',p:129,i:'🚿',h:200,d:'Base de duche extraplana antiderrapante.',s:{Material:'Resina mineral'},v:['80×80','90×90','120×80']},
 {id:11,n:'Sanita suspensa',c:'sanitaria',b:'Linha Casa',p:null,i:'🚽',h:180,n2:1,d:'Sanita suspensa em cerâmica com tampa amortecida.',s:{Material:'Cerâmica'},v:['Branco']},
 {id:12,n:'Móvel de cozinha base',c:'cozinha',b:'Linha Casa',p:null,i:'🗄️',h:30,n2:1,d:'Módulos de cozinha à medida em várias cores.',s:{Material:'Aglomerado melaminado'},v:['Branco','Carvalho','Cinza']}];
const FAQ=[
 ['Que tipo de produtos vendem?','Materiais de construção, artefactos de cimento, ferro e metais, ferragens e ferramentas, louça sanitária, torneiras, móveis e equipamentos de cozinha.'],
 ['Os preços estão disponíveis no site?','Alguns produtos mostram preço indicativo. Para orçamentos, contacte-nos por telefone ou email.'],
 ['Como sei se um produto está em stock?','A disponibilidade varia. Ligue para '+CONTACT.tel+' ou envie email para confirmar antes de se deslocar.'],
 ['Fazem entregas?','Contacte-nos com a morada e os materiais pretendidos para combinarmos a entrega.'],
 ['Pedem orçamentos para obras?','Sim. Envie a lista de materiais pelo formulário de contacto e respondemos o mais breve possível.'],
 ['Têm apoio na escolha de materiais?','Sim, a nossa equipa ajuda a escolher a solução certa para cada obra.']];
const $=s=>document.querySelector(s),app=$('#app');
const eur=p=>p==null?'Sob consulta':p.toFixed(2).replace('.',',')+' €';
const card=p=>`<a class="card" href="#/produto/${p.id}"><div class="ph" style="--h:${p.h}">${p.i}</div><small>${p.b}${p.n2?'<span class="tag">Novo</span>':''}</small><h3>${p.n}</h3><b>${eur(p.p)}</b></a>`;
const catName=id=>CATS.find(c=>c.id===id).n;

function home(){return `
<section class="hero"><div class="wrap"><h1>Tudo para a sua obra, num só armazém.</h1>
<p>Materiais de construção, ferragens, louça sanitária e cozinhas. Atendimento de proximidade em Pousada de Saramagos.</p>
<a class="btn" href="#/catalogo">Ver catálogo</a><a class="btn ghost" href="#/contactos">Pedir orçamento</a></div></section>
<section class="wrap two"><div><h2>Bem-vindo aos Armazéns Santo António</h2>
<p>A Abílio da Costa Araújo & Filhos, Lda é uma loja de materiais de construção e diversos, com soluções para obras novas, remodelações e pequenas reparações.</p></div>
<div class="box"><b>Contacte-nos</b><p>📍 ${CONTACT.morada}<br>📞 ${CONTACT.tel}<br>✉️ ${CONTACT.email}</p></div></section>
<section class="wrap"><h2>Categorias principais</h2><div class="grid cats">${CATS.map(c=>`<a href="#/catalogo?c=${c.id}"><i>${c.i}</i>${c.n}</a>`).join('')}</div></section>
<section class="wrap"><h2>Produtos em destaque</h2><div class="grid">${P.filter(p=>p.f).map(card).join('')}</div></section>
<section class="band"><div class="wrap"><h2>Novidades e coleções</h2><div class="grid">${P.filter(p=>p.n2).map(card).join('')}</div></div></section>`}

let F={q:'',c:'',b:'',max:'',o:'n'};
function list(){
 let r=P.filter(p=>(!F.c||p.c===F.c)&&(!F.b||p.b===F.b)&&(!F.q||(p.n+p.d).toLowerCase().includes(F.q.toLowerCase()))&&(!F.max||(p.p!=null&&p.p<=+F.max)));
 r.sort((a,b)=>F.o==='n'?a.n.localeCompare(b.n):F.o==='a'?(a.p??1e9)-(b.p??1e9):(b.p??-1)-(a.p??-1));
 $('#res').innerHTML=r.length?r.map(card).join(''):'<p>Nenhum produto encontrado.</p>';
 $('#cnt').textContent=r.length+' produto(s)'}
function catalog(qs){
 F.c=new URLSearchParams(qs).get('c')||'';
 const brands=[...new Set(P.map(p=>p.b))];
 app.innerHTML=`<section class="wrap"><h2>Catálogo de produtos</h2><div class="tools">
 <input type="search" id="q" placeholder="Pesquisar produtos…" value="${F.q}">
 <select id="c"><option value="">Todas as categorias</option>${CATS.map(c=>`<option value="${c.id}" ${F.c===c.id?'selected':''}>${c.n}</option>`).join('')}</select>
 <select id="b"><option value="">Todas as marcas</option>${brands.map(b=>`<option ${F.b===b?'selected':''}>${b}</option>`).join('')}</select>
 <select id="max"><option value="">Qualquer preço</option><option value="10">até 10 €</option><option value="50">até 50 €</option><option value="150">até 150 €</option></select>
 <select id="o"><option value="n">Nome A–Z</option><option value="a">Preço ↑</option><option value="d">Preço ↓</option></select></div>
 <p id="cnt" class="note"></p><div class="grid" id="res"></div></section>`;
 ['q','c','b','max','o'].forEach(k=>$('#'+k).addEventListener('input',e=>{F[k]=e.target.value;list()}));
 list()}

function product(id){
 const p=P.find(x=>x.id==id);if(!p)return location.hash='#/catalogo';
 const sim=P.filter(x=>x.c===p.c&&x.id!==p.id).slice(0,4);
 app.innerHTML=`<div class="wrap"><p class="crumb"><a href="#/catalogo">Catálogo</a> / ${catName(p.c)} / ${p.n}</p>
 <div class="two" style="align-items:start"><div class="gal"><div class="ph" id="big" style="--h:${p.h}">${p.i}</div>
 <div class="thumbs">${[0,30,60].map((d,k)=>`<div class="ph ${k?'':'on'}" data-h="${p.h+d}" style="--h:${p.h+d}">${p.i}</div>`).join('')}</div></div>
 <div><small style="color:var(--o);font-weight:600">${p.b}</small><h1>${p.n}</h1><div class="price">${eur(p.p)}</div><p>${p.d}</p>
 <p style="margin-top:14px"><b>Variantes</b></p><div class="opts">${p.v.map((v,k)=>`<button class="${k?'':'on'}">${v}</button>`).join('')}</div>
 <a class="btn" href="#/contactos">Pedir orçamento</a>
 <h3 style="margin-top:24px">Características</h3><table>${Object.entries(p.s).map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join('')}<tr><td>Categoria</td><td>${catName(p.c)}</td></tr></table></div></div>
 <section><h2>Produtos semelhantes</h2><div class="grid">${sim.map(card).join('')||'<p>Sem produtos semelhantes.</p>'}</div></section></div>`;
 document.querySelectorAll('.thumbs .ph').forEach(t=>t.onclick=()=>{$('#big').style.setProperty('--h',t.dataset.h);document.querySelectorAll('.thumbs .ph').forEach(x=>x.classList.remove('on'));t.classList.add('on')});
 document.querySelectorAll('.opts button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.opts button').forEach(x=>x.classList.remove('on'));b.classList.add('on')})}

const about=()=>`<section class="wrap"><h2>Sobre nós</h2><div class="two"><div>
<h3>A nossa história</h3><p>A Abílio da Costa Araújo & Filhos, Lda é uma empresa familiar sediada em Pousada de Saramagos, com loja de materiais de construção e diversos.</p>
<p><i>[Edite aqui: ano de fundação, fundadores e marcos importantes.]</i></p>
<h3 style="margin-top:20px">Missão</h3><p>Fornecer materiais de qualidade, com aconselhamento próximo, para que cada obra corra bem.</p></div>
<img class="about-logo" src="logo.png" alt="Emblema Armazéns Santo António"></div></section>
<section class="band"><div class="wrap"><h2>Valores</h2><div class="grid">
<div><h3 style="color:var(--o)">Confiança</h3><p>Relação de proximidade e palavra dada.</p></div>
<div><h3 style="color:var(--o)">Qualidade</h3><p>Materiais selecionados para durar.</p></div>
<div><h3 style="color:var(--o)">Serviço</h3><p>Aconselhamento para cada projeto.</p></div>
<div><h3 style="color:var(--o)">Tradição familiar</h3><p>Uma empresa de família ao serviço da região.</p></div></div></div></section>
<section class="wrap"><h2>A nossa loja</h2><div class="grid">${['🏪','📦','🚚'].map((e,k)=>`<div class="ph" style="--h:${20+k*40};border-radius:12px">${e}</div>`).join('')}</div><p class="note">Substitua estes espaços por fotografias reais da loja.</p></section>`;

const contacts=()=>`<section class="wrap"><h2>Contactos</h2><div class="two" style="align-items:start"><div>
<div class="box"><p>📍 <b>Morada</b><br>${CONTACT.morada}</p><p style="margin-top:12px">📞 <b>Telefone</b><br><a href="tel:+351252990480">${CONTACT.tel}</a></p>
<p style="margin-top:12px">✉️ <b>Email</b><br><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></p>
<p style="margin-top:12px">🕒 <b>Horário de funcionamento</b></p><table class="hours">${HORAS.map(([d,h])=>`<tr><td>${d}</td><td>${h}</td></tr>`).join('')}</table>
<p class="soc">🌐 <b style="color:var(--t)">Redes sociais</b><br><a href="${FB}" target="_blank" rel="noopener">Facebook</a> · <a href="${IG}" target="_blank" rel="noopener">Instagram</a></p></div>
<iframe title="Mapa" style="width:100%;height:240px;border:0;border-radius:12px;margin-top:16px" loading="lazy" src="https://www.google.com/maps?q=Av.+Riopele+28,+4770-420+Pousada+de+Saramagos&output=embed"></iframe></div>
<form class="form box" id="cf"><h3>Envie-nos uma mensagem</h3><input name="n" placeholder="Nome" required><input name="e" type="email" placeholder="Email" required>
<input name="t" placeholder="Telefone"><textarea name="m" rows="5" placeholder="Mensagem ou lista de materiais" required></textarea><button class="btn">Enviar</button>
<p class="note">Abre o seu programa de email. Para envio direto, ligue o formulário a um serviço (ex.: Formspree).</p></form></div></section>`;

const faq=()=>`<section class="wrap" style="max-width:800px"><h2>Perguntas frequentes</h2>${FAQ.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>`;

function route(){
 const [path,qs]=(location.hash.slice(2)||'').split('?'),[r,id]=path.split('/');
 ({'':home,catalogo:()=>catalog(qs),produto:()=>product(id),sobre:()=>app.innerHTML=about(),contactos:()=>{app.innerHTML=contacts();$('#cf').onsubmit=e=>{e.preventDefault();const d=new FormData(e.target);location.href=`mailto:${CONTACT.email}?subject=${encodeURIComponent('Contacto via site – '+d.get('n'))}&body=${encodeURIComponent(d.get('m')+'\n\nTel: '+d.get('t')+'\nEmail: '+d.get('e'))}`}},faq:()=>app.innerHTML=faq()}[r]||home)();
 if(r==='')app.innerHTML=home();
 if(r==='faq')app.innerHTML=faq();
 document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.dataset.r===(r==='produto'?'catalogo':r)));
 $('#nav').classList.remove('open');scrollTo(0,0)}
$('#burger').onclick=()=>$('#nav').classList.toggle('open');
$('#y').textContent=new Date().getFullYear();
addEventListener('hashchange',route);route();
