import { SEO } from "@/components/SEO"
import { HowItWorks } from "@/sections/HowItWorks"
import { SignalFilters } from "@/sections/SignalFilters"
import { PageHero } from "@/components/PageHero"
import { FAQ } from "@/sections/FAQ"

export function CommentCaMarchePage() {
  return (
    <>
      <SEO
        title="Comment fonctionne Pisteur"
        description="Découvrez comment Pisteur croise plus de 100 signaux pour identifier les entreprises, bâtiments et décideurs à prospecter selon votre activité."
        path="/comment-ca-marche"
        keywords={["comment générer des leads bâtiment", "ciblage commercial B2B", "prospection énergétique", "qualification de prospects"]}
      />
      <PageHero eyebrow="COMMENT ÇA MARCHE" title="De votre marché à vos prochains clients." description="Définissez votre cible, laissez Pisteur analyser les signaux pertinents, puis recevez une liste directement exploitable par vos commerciaux." />
      <HowItWorks />
      <SignalFilters />
      <FAQ pagePath="/comment-ca-marche" />
    </>
  )
}
