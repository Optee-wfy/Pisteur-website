import { SEO } from "@/components/SEO"
import { Credits } from "@/sections/Credits"
import { Pricing } from "@/sections/Pricing"
import { FAQ } from "@/sections/FAQ"
import { PageHero } from "@/components/PageHero"
import { faqItems } from "@/data/content"

export function TarifsPage() {
  return (
    <>
      <SEO
        title="Tarifs de Pisteur"
        description="Comparez les offres Pisteur : accès gratuit, Pro, Pro+ et Growth. Choisissez le volume de prospects et les fonctionnalités adaptés à votre équipe."
        path="/tarifs"
        keywords={["tarif logiciel prospection", "prix leads bâtiment", "abonnement Pisteur", "outil commercial énergie"]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.title,
            acceptedAnswer: { "@type": "Answer", text: item.text },
          })),
        }}
      />
      <PageHero eyebrow="TARIFS" title="Une offre adaptée à chaque ambition commerciale." description="Commencez gratuitement, validez votre marché puis augmentez votre volume de prospects quand votre équipe est prête." />
      <Pricing />
      <Credits />
      <FAQ />
    </>
  )
}
