alter table public.blog_posts
  add column if not exists sources jsonb not null default '[]'::jsonb;

comment on column public.blog_posts.sources is
  'Liste de sources vérifiées : [{"label":"…","url":"https://…"}]';

alter table public.blog_posts drop constraint if exists blog_posts_sources_is_array;
alter table public.blog_posts add constraint blog_posts_sources_is_array
  check (jsonb_typeof(sources) = 'array');

grant usage on schema public to anon, authenticated;
grant select on public.blog_posts, public.faq_items, public.testimonials to anon, authenticated;

create or replace function public.set_updated_at()
returns trigger language plpgsql security invoker set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at before update on public.blog_posts
for each row execute function public.set_updated_at();

create index if not exists blog_posts_public_feed_idx
  on public.blog_posts (published_at desc) where status = 'published';
