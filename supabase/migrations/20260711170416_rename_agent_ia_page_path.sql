-- Renommage de l'URL de la page agent IA : /agent-ia → /agent-ia-prospection-batiment (SEO)
update public.faq_items
set page_path = '/agent-ia-prospection-batiment'
where page_path = '/agent-ia';
