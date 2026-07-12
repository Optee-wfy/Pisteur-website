import { Helmet } from "react-helmet-async"

interface SEOProps {
  title: string
  description: string
  path: string
  keywords?: string[]
  type?: "website" | "article"
  structuredData?: Record<string, unknown> | Record<string, unknown>[]
  noIndex?: boolean
}

export function SEO({ title, description, path, keywords = [], type = "website", structuredData, noIndex = false }: SEOProps) {
  const baseUrl = "https://pisteur.io"
  const fullTitle = `${title} | Pisteur — Prospection bâtiment intelligente`
  const canonical = `${baseUrl}${path}`
  const image = `${baseUrl}/logo-pisteur-ai.webp`
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Pisteur",
      alternateName: "Pisteur.io",
      url: baseUrl,
      logo: image,
      email: "contact@optee.io",
      sameAs: ["https://www.linkedin.com/company/optee"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: fullTitle,
      description,
      url: canonical,
      inLanguage: "fr-FR",
      isPartOf: { "@type": "WebSite", name: "Pisteur", url: baseUrl },
    },
    ...(structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : []),
  ]

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      <meta name="robots" content={noIndex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Pisteur" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Pisteur, moteur de prospection bâtiment et énergie" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {schemas.map((schema, index) => <script key={index} type="application/ld+json">{JSON.stringify(schema)}</script>)}
    </Helmet>
  )
}
