create extension if not exists pgcrypto;

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  company text,
  activity text,
  zone text,
  message text,
  source text not null default 'demo',
  status text not null default 'new' check (status in ('new','contacted','qualified','closed')),
  consent boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  status text not null default 'open' check (status in ('open','in_progress','resolved','closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  image_url text,
  image_alt text,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  event_name text not null,
  page_path text not null,
  element_label text,
  element_href text,
  referrer text,
  session_id text,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  page_path text not null,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  company text,
  quote text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  avatar_url text,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-images', 'blog-images', true, 5242880, array['image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

alter table public.contacts enable row level security;
alter table public.support_requests enable row level security;
alter table public.blog_posts enable row level security;
alter table public.analytics_events enable row level security;
alter table public.faq_items enable row level security;
alter table public.testimonials enable row level security;

drop policy if exists "published blog posts are public" on public.blog_posts;
create policy "published blog posts are public" on public.blog_posts for select using (status = 'published');
drop policy if exists "active faq items are public" on public.faq_items;
create policy "active faq items are public" on public.faq_items for select using (active = true);
drop policy if exists "active testimonials are public" on public.testimonials;
create policy "active testimonials are public" on public.testimonials for select using (active = true);

create index if not exists contacts_created_at_idx on public.contacts (created_at desc);
create index if not exists support_created_at_idx on public.support_requests (created_at desc);
create index if not exists analytics_created_at_idx on public.analytics_events (created_at desc);
create index if not exists analytics_event_name_idx on public.analytics_events (event_name, created_at desc);
create index if not exists faq_page_path_idx on public.faq_items (page_path, sort_order);
create index if not exists blog_status_published_idx on public.blog_posts (status, published_at desc);

insert into public.faq_items (page_path, question, answer, sort_order) values
('/', 'À qui s’adresse Pisteur ?', 'Pisteur s’adresse aux entreprises qui vendent aux bâtiments : énergie, rénovation, CVC, solaire, bureaux d’études et services immobiliers.', 1),
('/', 'Qu’est-ce qu’un prospect qualifié ?', 'Un prospect qualifié associe un bâtiment, une entreprise gestionnaire, des signaux pertinents et, lorsque disponible, le bon décideur.', 2),
('/', 'Combien de temps faut-il pour créer une liste ?', 'Une cible peut être configurée en quelques minutes et la liste correspondante est générée immédiatement.', 3),
('/', 'Les données couvrent-elles toute la France ?', 'Pisteur couvre le parc immobilier français et permet un ciblage national ou local.', 4),
('/', 'Puis-je essayer gratuitement ?', 'Oui, une formule gratuite permet de découvrir le moteur avant d’activer les exports et contacts.', 5),
('/comment-ca-marche', 'Comment définir ma cible ?', 'Sélectionnez votre activité, votre zone, les types de bâtiments et les signaux adaptés à votre offre.', 1),
('/comment-ca-marche', 'Quels signaux sont analysés ?', 'Pisteur croise des données bâtimentaires, énergétiques, juridiques, commerciales et des données de contact.', 2),
('/comment-ca-marche', 'Comment les prospects sont-ils classés ?', 'Les résultats sont priorisés selon leur correspondance avec vos critères et la présence de signaux d’opportunité.', 3),
('/comment-ca-marche', 'Puis-je exporter mes listes ?', 'Oui, les offres compatibles permettent l’export CSV vers votre CRM ou vos outils commerciaux.', 4),
('/comment-ca-marche', 'Les décideurs sont-ils nominatifs ?', 'Lorsqu’ils sont disponibles, Pisteur fournit le nom, la fonction et les coordonnées professionnelles vérifiées.', 5),
('/donnees', 'Quelles sources utilise Pisteur ?', 'Pisteur utilise notamment BDNB, Cadastre, SIRENE, données énergétiques et sources privées spécialisées.', 1),
('/donnees', 'À quelle fréquence les données sont-elles mises à jour ?', 'La fréquence dépend de la source ; les données de contact sont enrichies au moment de la demande.', 2),
('/donnees', 'Pisteur fournit-il le DPE ?', 'Oui, le DPE fait partie des critères disponibles lorsque l’information existe pour le bâtiment.', 3),
('/donnees', 'Les données sont-elles conformes au RGPD ?', 'Pisteur applique les principes de minimisation, finalité et base légale adaptés à la prospection B2B.', 4),
('/donnees', 'Que se passe-t-il si une donnée est absente ?', 'L’absence est signalée et aucun crédit contact n’est consommé lorsqu’une information payante est introuvable.', 5),
('/tarifs', 'Existe-t-il une offre gratuite ?', 'Oui, l’offre Starter permet de découvrir le moteur sans carte bancaire.', 1),
('/tarifs', 'Les abonnements sont-ils sans engagement ?', 'Les abonnements sont mensuels et peuvent être arrêtés selon les conditions de l’offre.', 2),
('/tarifs', 'Comment fonctionnent les crédits ?', 'Les crédits sont consommés lors de l’accès à certaines informations ou actions précisées dans chaque offre.', 3),
('/tarifs', 'Peut-on ajouter des utilisateurs ?', 'Oui, les offres Pro et supérieures incluent plusieurs postes et peuvent évoluer selon vos besoins.', 4),
('/tarifs', 'Pisteur s’intègre-t-il à un CRM ?', 'Les exports CSV sont compatibles avec les principaux CRM ; des intégrations directes peuvent être proposées.', 5),
('/cas-usage', 'Pisteur convient-il aux courtiers en énergie ?', 'Oui, ils peuvent cibler les entreprises et bâtiments selon l’activité, la taille, la zone et les profils énergétiques.', 1),
('/cas-usage', 'Pisteur convient-il aux entreprises de rénovation ?', 'Oui, les critères DPE, chauffage, surface et gestionnaire permettent de prioriser les bâtiments pertinents.', 2),
('/cas-usage', 'Peut-on cibler le tertiaire et l’industrie ?', 'Oui, le moteur permet de filtrer différents usages et typologies de bâtiments.', 3),
('/cas-usage', 'Comment éviter les rendez-vous inutiles ?', 'La qualification en amont fournit le contexte bâtiment, entreprise et décideur avant la prise de contact.', 4),
('/cas-usage', 'Peut-on travailler sur plusieurs zones ?', 'Oui, les recherches peuvent être adaptées à différentes zones commerciales.', 5),
('/demo', 'La démonstration utilise-t-elle mes vraies cibles ?', 'Oui, l’équipe peut configurer la démonstration avec votre activité, vos critères et votre zone.', 1),
('/demo', 'Combien de temps dure une démonstration ?', 'Le format est adapté à votre besoin et vise à montrer rapidement les prospects disponibles.', 2),
('/demo', 'Dois-je préparer des informations ?', 'Votre activité, zone cible et client idéal suffisent pour personnaliser la démonstration.', 3),
('/demo', 'La démonstration est-elle gratuite ?', 'Oui, la demande de démonstration est gratuite et sans engagement.', 4),
('/demo', 'Quand serai-je recontacté ?', 'L’équipe Pisteur vous répond dans les meilleurs délais après réception du formulaire.', 5)
on conflict do nothing;

