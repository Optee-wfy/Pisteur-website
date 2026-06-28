import { SEO } from "@/components/SEO"
import { DataInfra } from "@/sections/DataInfra"
import { SignalFilters } from "@/sections/SignalFilters"
import { PageHero } from "@/components/PageHero"
import { FAQ } from "@/sections/FAQ"

export function DonneesPage() {
  return (
    <>
      <SEO
        title="Données bâtiment, énergie et entreprise"
        description="Pisteur agrège BDNB, Cadastre, ENEDIS, GRDF, SIRENE, Pappers et d’autres sources pour qualifier bâtiments, entreprises et décideurs."
        path="/donnees"
        keywords={["base de données bâtiment", "données DPE", "données ENEDIS GRDF", "SIRENE SIRET", "prospection data B2B"]}
      />
      <PageHero eyebrow="DONNÉES PISTEUR" title="Les bonnes données. Au bon moment." description="Une infrastructure française qui relie données bâtimentaires, énergétiques, juridiques et contacts professionnels." />
      <SignalFilters />
      <DataInfra />
      <FAQ pagePath="/donnees" />
    </>
  )
}
