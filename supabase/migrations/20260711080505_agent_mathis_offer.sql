-- Offre de lancement Mathis (agent IA de prospection) : leads dédiés + compteur de places public

create table if not exists public.agent_leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  company text not null,
  activity text,
  message text,
  offer text not null default 'launch-1000',
  status text not null default 'new' check (status in ('new','contacted','qualified','won','lost')),
  created_at timestamptz not null default now()
);

alter table public.agent_leads enable row level security;
-- Pas de policy publique : les écritures passent par public-contact (service role),
-- les lectures par admin-api (service role). Rien n'est accessible directement via l'anon key.

create index if not exists agent_leads_created_at_idx on public.agent_leads (created_at desc);
create index if not exists agent_leads_offer_idx on public.agent_leads (offer);

-- Compteur public de places restantes sur l'offre de lancement (3 clients),
-- sans exposer les données personnelles des inscrits.
create or replace function public.agent_leads_offer_count(p_offer text default 'launch-1000')
returns integer
language sql
security definer
set search_path = public
stable
as $$
  select count(*)::integer from public.agent_leads where offer = p_offer and status <> 'lost';
$$;

revoke all on function public.agent_leads_offer_count(text) from public;
grant execute on function public.agent_leads_offer_count(text) to anon, authenticated;

-- FAQ dédiée à la page /agent-ia
insert into public.faq_items (page_path, question, answer, sort_order) values
('/agent-ia', 'Qu''est-ce que Mathis exactement ?', 'Mathis est un agent IA conversationnel Pisteur. Vous lui donnez votre client idéal (ICP) et vos critères, il recherche vos prospects, engage le contact par email et LinkedIn, relance, qualifie les réponses et vous propose des rendez-vous directement dans votre agenda.', 1),
('/agent-ia', 'Mathis remplace-t-il mon équipe commerciale ?', 'Non. Mathis prend en charge la recherche, la prise de contact et la qualification en amont pour que votre équipe se concentre sur la conversation finale et la signature, une fois le rendez-vous qualifié obtenu.', 2),
('/agent-ia', 'Comment fonctionne l''offre de lancement à 1 000€/mois ?', 'Le tarif normal de Mathis est de 1 500€/mois. Les 3 premiers clients qui s''inscrivent bénéficient d''un tarif de lancement à 1 000€/mois, verrouillé tant qu''ils restent client. Une fois les 3 places prises, l''offre n''est plus disponible.', 3),
('/agent-ia', 'Sur quels canaux Mathis contacte-t-il mes prospects ?', 'Email personnalisé au bon décideur et messages LinkedIn dans un premier temps, avec la possibilité d''étendre à d''autres réseaux selon votre secteur et votre ICP.', 4),
('/agent-ia', 'Quand puis-je activer Mathis sur mon compte ?', 'Dès votre inscription via le formulaire de cette page, notre équipe vous recontacte rapidement pour configurer Mathis sur votre client idéal et l''activer sur votre compte.', 5)
on conflict do nothing;
