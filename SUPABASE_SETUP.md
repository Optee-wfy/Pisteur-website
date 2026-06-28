# Activation Supabase + Resend

Le code applicatif est prêt, mais aucun secret n'est enregistré dans le dépôt.

## 1. Sécuriser Resend

La clé communiquée dans la conversation doit être révoquée dans Resend, puis remplacée par une nouvelle clé. Vérifiez également votre domaine d'envoi dans Resend.

## 2. Déployer la base et les fonctions

Depuis ce dossier, avec la CLI Supabase installée :

```bash
supabase login
supabase link --project-ref VOTRE_PROJECT_REF
supabase db push
supabase functions deploy public-contact --no-verify-jwt
supabase functions deploy track-event --no-verify-jwt
supabase functions deploy admin-api --no-verify-jwt
```

Ajoutez ensuite les secrets serveur (ne jamais les préfixer par `VITE_`) :

```bash
supabase secrets set RESEND_API_KEY=VOTRE_NOUVELLE_CLE
supabase secrets set RESEND_FROM_EMAIL="Pisteur <contact@votre-domaine.fr>"
supabase secrets set NOTIFICATION_EMAIL=votre-email@domaine.fr
supabase secrets set ADMIN_ACCESS_CODE=jordan
```

## 3. Configurer le frontend

Copiez `.env.example` en `.env` puis renseignez `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`. Ces deux valeurs sont publiques par conception ; les tables privées restent protégées par RLS et les écritures passent par les fonctions serveur.

## 4. Fonctionnalités

- `/demo` : contact commercial, confirmation client et notification interne.
- `/support` : ticket technique, accusé de réception et notification interne.
- `/admin` : contacts, tickets, blog, statistiques, FAQ et avis.
- Les images de blog sont converties en WebP, redimensionnées et renommées avec un slug SEO avant envoi dans `blog-images`.
- Les clics et pages vues sont enregistrés sans donnée personnelle directe.

Pour une sécurité renforcée à terme, remplacez le code partagé par Supabase Auth avec MFA et rôles administrateurs.
