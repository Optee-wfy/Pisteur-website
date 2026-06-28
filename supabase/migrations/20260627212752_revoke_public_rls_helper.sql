-- This pre-existing project helper is privileged and must not be exposed by the Data API.
revoke all on function public.rls_auto_enable() from public, anon, authenticated;
