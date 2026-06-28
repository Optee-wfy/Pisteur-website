import { SEO } from "@/components/SEO"
import { Impact } from "@/sections/Impact"
import { Testimonials } from "@/sections/Testimonials"
import { PageHero } from "@/components/PageHero"
import { FAQ } from "@/sections/FAQ"

export function CasUsagePage() {
  return (
    <>
      <SEO
        title="Cas d’usage bâtiment et énergie"
        description="Courtage en énergie, CVC, rénovation, solaire et services immobiliers : découvrez comment les équipes commerciales utilisent Pisteur."
        path="/cas-usage"
        keywords={["cas usage prospection bâtiment", "prospection courtier énergie", "leads rénovation énergétique", "leads CVC"]}
      />
      <PageHero eyebrow="CAS D’USAGE" title="Chaque métier a ses signaux d’opportunité." description="Pisteur adapte le ciblage, les données et la qualification à votre activité, votre zone et votre stratégie commerciale." />
      <Impact />
      <Testimonials />
      <FAQ pagePath="/cas-usage" />
    </>
  )
}
