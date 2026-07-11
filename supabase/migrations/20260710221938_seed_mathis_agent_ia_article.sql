insert into public.blog_posts
  (slug, title, excerpt, content, image_url, image_alt, seo_title, seo_description, sources, status, published_at)
values
(
  'mathis-agent-ia-prospection-batiment-pisteur',
  'Mathis : l’agent IA Pisteur qui prend en charge toute votre prospection',
  'Nouveauté Pisteur : Mathis est un agent IA conversationnel qui recherche vos prospects, engage le contact par email et LinkedIn, qualifie les leads et vous décroche des rendez-vous avec vos clients idéaux. 100% automatisé, 24/7.',
  $article$
## Un agent IA avec qui vous discutez, pas un énième outil à configurer

Jusqu’ici, Pisteur vous livrait chaque jour les bâtiments à prospecter : les bons signaux, les bons décideurs, le bon potentiel. Mathis va plus loin. C’est un agent IA conversationnel : vous lui parlez, vous lui donnez votre client idéal (ICP), vos zones, vos critères, et il exécute la prospection à votre place, du premier repérage jusqu’au rendez-vous qualifié dans votre agenda.

Plus besoin de jongler entre un export de leads, un outil d’emailing et un CRM de relance. Mathis orchestre l’ensemble de la séquence commerciale, en continu, et vous rend compte de ce qu’il a fait.

## Ce que Mathis fait concrètement

Recherche et ciblage. Mathis interroge en continu la base Pisteur pour repérer les bâtiments et entreprises qui correspondent à votre ICP : activité, zone, typologie de bâtiment, DPE, signaux d’opportunité.

Prise de contact automatisée. Une fois une cible qualifiée, Mathis initie l’échange : email personnalisé au bon décideur, message LinkedIn, publication sur les réseaux pour construire votre visibilité auprès de votre marché.

Relance intelligente. Pas de réponse ? Mathis relance au bon moment, avec le bon ton, sans jamais harceler un prospect ni relancer quelqu’un qui a déjà répondu ailleurs.

Qualification des leads. Chaque échange est analysé pour ne remonter que les prospects réellement intéressés, avec le contexte nécessaire pour que votre équipe commerciale n’ait plus qu’à conclure.

Analyse et tri des opportunités. Mathis priorise en permanence les bâtiments et entreprises les plus prometteurs plutôt que de vous noyer sous un volume de contacts non triés.

Prise de rendez-vous qualifiés. Quand un prospect est chaud, Mathis propose des créneaux et verrouille le rendez-vous directement dans votre agenda.

## Pensé pour votre ICP, pas pour du volume

Mathis n’envoie pas des milliers de messages génériques. Il travaille votre client idéal en profondeur : le bon type de bâtiment, la bonne activité, le bon interlocuteur, le bon niveau de signal. L’objectif n’est pas d’inonder votre boîte de contacts non qualifiés, mais de vous amener des rendez-vous avec des prospects qui ont un vrai besoin et un vrai budget.

Courtage en énergie, rénovation énergétique, CVC, solaire : Mathis s’adapte à votre secteur et à vos critères de qualification, avec la même base de données bâtimentaire qui fait la force de Pisteur.

## Disponible 24/7, sans effort de votre part

Mathis travaille en continu, weekend compris, pendant que votre équipe se concentre sur la vente et la relation client. Résultat : zéro prospect perdu faute de relance, un pipeline qui se remplit en permanence, et des rendez-vous qualifiés qui arrivent directement dans votre agenda.

Mathis est disponible dès maintenant en avant-première pour les clients Pisteur. [Découvrez Mathis en détail et réservez votre place](/agent-ia-prospection-batiment) pour l’activer sur votre compte et le configurer sur votre client idéal.
  $article$,
  'https://bhuiavszbkurhjmgmgkw.supabase.co/storage/v1/object/public/blog-images/agent-ia-mathis-prospection-batiment-automatisee.webp',
  'Mathis, l’agent IA Pisteur, orchestrant la recherche de prospects, la prise de contact automatisée et la prise de rendez-vous qualifiés',
  'Mathis, l’agent IA de prospection bâtiment | Pisteur',
  'Découvrez Mathis, l’agent IA Pisteur qui recherche, contacte, qualifie et booke vos rendez-vous avec vos clients idéaux. 100% automatisé, 24/7.',
  '[]'::jsonb,
  'published', '2026-07-11T09:00:00+02:00'
)
on conflict (slug) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  image_url = excluded.image_url,
  image_alt = excluded.image_alt,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  sources = excluded.sources,
  status = excluded.status,
  published_at = excluded.published_at,
  updated_at = now();
