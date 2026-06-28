# Audit UX, design, SEO et GEO — Pisteur

Date : 27 juin 2026  
Viewport de contrôle : 1440 × 1000  
Routes contrôlées : accueil, fonctionnement, données, tarifs, cas d’usage, démonstration et blog.

## Résultat général

Le rendu est de nouveau fonctionnel. La page blanche provenait d’un import manquant du composant Chakra `Image` dans le hero. Toutes les routes principales produisent maintenant un rendu visible, avec un header commun, une palette bleu nuit/vert cohérente et un footer structuré.

## Parcours audité

1. Accueil — bon état. Promesse claire, aperçu produit visible et métiers représentés. La suite de page est longue ; le hero reste néanmoins immédiatement compréhensible.
2. Comment ça marche — bon état. H1 explicite et progression logique. Les textes internes historiques méritent encore une passe typographique et orthographique complète.
3. Données — bon état. Le contraste et la hiérarchie sont solides. La démonstration des sources devrait à terme citer les dates de mise à jour et les limites de couverture.
4. Tarifs — bon état. Les offres sont comparables et la FAQ est désormais décrite en JSON-LD. Les prix et conditions devront être maintenus à jour dans une source unique.
5. Cas d’usage — bon état. La proposition est mieux ouverte aux métiers de l’énergie. Des pages dédiées par vertical amélioreraient le SEO transactionnel.
6. Démonstration — état correct. La page possède un H1 et un formulaire, mais l’iframe externe peut rester blanche tant que son contenu n’est pas chargé ; prévoir une image d’aperçu et un fallback.
7. Blog — fonctionnel mais faible. La page reste pauvre en contenu indexable et ne contient pas encore d’articles réels.

## Correctifs appliqués

- Correction du crash React responsable de la page blanche.
- H1 éditoriaux et introductions dédiées sur les pages internes.
- Métadonnées uniques : title, description, canonical, Open Graph, Twitter et robots.
- Données structurées Organization, WebPage, SoftwareApplication et FAQPage.
- Création de `robots.txt`, `sitemap.xml` et `llms.txt`.
- Remplacement de l’image sociale générique Bolt.
- Création de pages légales distinctes et d’une page 404.
- Harmonisation de la DA autour de #071B63, #071FD6, #23c55e et des surfaces #f7faff.

## Manques SEO prioritaires restants

1. Le site est une SPA rendue côté client. Un pré-rendu statique ou SSR améliorera l’indexation, les aperçus sociaux et la robustesse sans JavaScript.
2. Le blog doit publier de vrais contenus experts : ICP bâtiment, prospection courtier en énergie, utilisation du DPE, données SIRENE/SIRET et qualification des décideurs.
3. Créer une image Open Graph dédiée en 1200 × 630 plutôt que réutiliser le logo vertical.
4. Créer des pages d’atterrissage distinctes pour le courtage en énergie, CVC, solaire, rénovation, bureaux d’études et services immobiliers.
5. Ajouter des témoignages nominatifs vérifiables, études de cas datées et sources chiffrées pour renforcer E-E-A-T.
6. Ajouter des breadcrumbs visibles et leur schéma BreadcrumbList.
7. Vérifier dans Google Search Console et Bing Webmaster Tools le sitemap, les canonical et les Core Web Vitals.

## Manques GEO prioritaires restants

1. Ajouter sur chaque verticale des réponses courtes et factuelles aux questions métier fréquentes.
2. Citer explicitement les sources, dates de fraîcheur, périmètres et limites de chaque famille de données.
3. Publier des définitions stables de “prospect qualifié”, “signal bâtiment”, “score Pisteur” et “crédit”.
4. Enrichir les études de cas avec contexte, méthode, résultat et période mesurée.
5. Maintenir `llms.txt` et les données structurées à chaque évolution produit.

## Accessibilité à contrôler ensuite

- Navigation complète au clavier et ordre de focus.
- Contraste des textes `whiteAlpha.500` du footer.
- Alternatives textuelles des logos distants.
- Respect de `prefers-reduced-motion` pour les animations du hero et de qualification.
- Libellés, erreurs et confirmation de soumission du formulaire de démonstration.

## Limites

Les captures permettent de contrôler la composition et le rendu initial, mais pas de certifier l’accessibilité, les performances réseau, le comportement des formulaires ni l’indexation réelle par les moteurs.
