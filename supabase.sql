-- Colar no Supabase: SQL Editor > New query > Run
create table if not exists produtos(
  ref text primary key, n text, c text, p numeric, ant numeric, d text, img text,
  dest boolean not null default false, novo boolean not null default false, promo boolean not null default false,
  custom boolean not null default false,  -- true = produto novo; false = alteração a um produto do inventário
  atualizado timestamptz default now());
create table if not exists banners(
  id bigint generated always as identity primary key, ordem int not null default 0,
  img text not null, titulo text, texto text, link text);
create table if not exists config(
  id int primary key default 1 check (id=1), ativa boolean not null default false,
  titulo text not null default 'Promoções', intro text not null default '');
insert into config(id) values (1) on conflict do nothing;

alter table produtos enable row level security;
alter table banners  enable row level security;
alter table config   enable row level security;
create policy "ler produtos" on produtos for select using (true);
create policy "ler banners"  on banners  for select using (true);
create policy "ler config"   on config   for select using (true);
create policy "gerir produtos" on produtos for all to authenticated using (true) with check (true);
create policy "gerir banners"  on banners  for all to authenticated using (true) with check (true);
create policy "gerir config"   on config   for all to authenticated using (true) with check (true);

insert into storage.buckets(id,name,public) values ('imagens','imagens',true) on conflict do nothing;
create policy "ler imagens"   on storage.objects for select using (bucket_id='imagens');
create policy "enviar imagens" on storage.objects for insert to authenticated with check (bucket_id='imagens');
create policy "editar imagens" on storage.objects for update to authenticated using (bucket_id='imagens');
create policy "apagar imagens" on storage.objects for delete to authenticated using (bucket_id='imagens');
