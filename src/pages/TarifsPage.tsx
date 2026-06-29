import { SEO } from "@/components/SEO"
import { Credits } from "@/sections/Credits"
import { Pricing } from "@/sections/Pricing"
import { FAQ } from "@/sections/FAQ"
import { PageHero } from "@/components/PageHero"
import { PageCTA } from "@/sections/PageCTA"
import { RelatedLinks } from "@/components/RelatedLinks"
import { faqItems } from "@/data/content"

export function TarifsPage() {
  return (
    <>
      <SEO
        title="Tarifs Pisteur — Prospection bâtiment & énergie | Gratuit à Pro"
        description="Comparez les offres Pisteur : accès gratuit, Pro, Pro+ et Growth. Sans engagement, sans carte bancaire. Leads bâtiment qualifiés dès le premier jour."
        path="/tarifs"
        keywords={[
          "tarif logiciel prospection bâtiment",
          "prix leads bâtiment énergie",
          "abonnement Pisteur",
          "outil commercial prospection énergie",
          "logiciel leads qualifiés gratuit",
          "tarif CRM prospection B2B",
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.title,
                acceptedAnswer: { "@type": "Answer", text: item.text },
              })),
            },
            {
              "@type": "Product",
              name: "Pisteur — Logiciel de prospection bâtiment",
              description: "Moteur de prospection B2B pour le bâtiment et l'énergie. Leads qualifiés avec décideurs nominatifs.",
              brand: { "@type": "Brand", name: "Pisteur" },
              offers: [
                { "@type": "Offer", name: "Gratuit", price: "0", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
                { "@type": "Offer", name: "Pro", price: "149", priceCurrency: "EUR", priceSpecification: { "@type": "UnitPriceSpecification", price: "149", priceCurrency: "EUR", unitText: "MONTH" } },
                { "@type": "Offer", name: "Pro+", price: "299", priceCurrency: "EUR", priceSpecification: { "@type": "UnitPriceSpecification", price: "299", priceCurrency: "EUR", unitText: "MONTH" } },
                { "@type": "Offer", name: "Growth", price: "599", priceCurrency: "EUR", priceSpecification: { "@type": "UnitPriceSpecification", price: "599", priceCurrency: "EUR", unitText: "MONTH" } },
              ],
            },
          ],
        }}
      />
      <PageHero eyebrow="TARIFS" title="Une offre adaptée à chaque ambition commerciale." description="Commencez gratuitement, validez votre marché puis augmentez votre volume de prospects quand votre équipe est prête." />
      <Pricing />
      <Credits />
      <RelatedLinks
        title="ALLER PLUS LOIN"
        links={[
          { label: "Comment ça marche", to: "/comment-ca-marche", description: "Comprenez le processus complet de qualification des prospects en 30 secondes." },
          { label: "Nos données", to: "/donnees", description: "Découvrez les 50+ sources officielles qui alimentent chaque prospect." },
          { label: "Cas d'usage par secteur", to: "/cas-usage", description: "Votre secteur a ses propres signaux d'opportunité — trouvez les vôtres." },
        ]}
      />
      <PageCTA title="Vous hésitez encore ? Parlez-nous de votre marché." />
      <FAQ />
    </>
  )
}
