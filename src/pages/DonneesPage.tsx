import { SEO } from "@/components/SEO"
import { DataInfra } from "@/sections/DataInfra"
import { SignalFilters } from "@/sections/SignalFilters"
import { PageHero } from "@/components/PageHero"
import { FAQ } from "@/sections/FAQ"
import { DataSourceLogos } from "@/sections/DataSourceLogos"
import { PageCTA } from "@/sections/PageCTA"
import { RelatedLinks } from "@/components/RelatedLinks"

export function DonneesPage() {
  return (
    <>
      <SEO
        title="Données bâtiment, énergie et entreprise — Pisteur"
        description="Pisteur agrège BDNB, Cadastre, ENEDIS, GRDF, SIRENE, Pappers et d’autres sources officielles pour qualifier bâtiments, entreprises et décideurs. 32M+ bâtiments analysés."
        path="/donnees"
        keywords={[
          "base de données bâtiment France",
          "données DPE bâtiment",
          "données ENEDIS GRDF consommation",
          "SIRENE SIRET prospection",
          "BDNB base nationale bâtiment",
          "prospection data B2B énergie",
          "décret tertiaire OPERAT données",
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: "Base de données bâtiment Pisteur",
          description: "Pisteur agrège BDNB, Cadastre, ENEDIS, GRDF, SIRENE, Pappers et d’autres sources officielles françaises pour qualifier bâtiments, entreprises et décideurs.",
          url: "https://pisteur.io/donnees",
          creator: {
            "@type": "Organization",
            name: "Pisteur by CEELAB",
            url: "https://pisteur.io",
          },
          keywords: ["bâtiment", "DPE", "ENEDIS", "GRDF", "SIRENE", "Cadastre", "BDNB"],
          spatialCoverage: "France",
          license: "https://pisteur.io/confidentialite",
        }}
      />
      <PageHero eyebrow="DONNÉES PISTEUR" title="Les bonnes données. Au bon moment." description="Une infrastructure française qui relie données bâtimentaires, énergétiques, juridiques et contacts professionnels." />
      <SignalFilters />
      <DataSourceLogos />
      <DataInfra />
      <RelatedLinks
        title="ALLER PLUS LOIN"
        links={[
          { label: "Comment ça marche", to: "/comment-ca-marche", description: "Comprenez comment ces données se transforment en liste de prospects actionnables." },
          { label: "Courtage en énergie", to: "/courtage-energie", description: "Identifiez les sites énergivores et leurs décideurs grâce aux données ENEDIS/GRDF." },
          { label: "Rénovation énergétique", to: "/renovation-energetique", description: "Ciblez les bâtiments mal classés DPE et calculez le financement mobilisable." },
        ]}
      />
      <PageCTA title="Accédez à la base de données la plus complète du marché." variant="light" />
      <FAQ pagePath="/donnees" />
    </>
  )
}
