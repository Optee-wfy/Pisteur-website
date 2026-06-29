import { ContactSection } from "@/sections/ContactSection";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/PageHero";

export function ContactPage() {
  return (
    <>
      <SEO
        title="Contacter Pisteur — Démonstration & Devis prospection bâtiment"
        description="Parlez à l'équipe Pisteur de votre marché et découvrez les prospects qualifiés identifiés pour votre secteur. Réponse sous 24h, démo personnalisée offerte."
        path="/contact"
        keywords={[
          "contacter Pisteur",
          "démo prospection bâtiment",
          "devis logiciel prospection",
          "contact équipe Pisteur",
          "démonstration leads bâtiment énergie",
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Pisteur by CEELAB",
          url: "https://pisteur.io",
          logo: "https://pisteur.io/logo-pisteur-ai.webp",
          description: "Moteur de prospection B2B pour identifier les bâtiments, entreprises et décideurs pertinents dans les secteurs du bâtiment et de l'énergie.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "10 rue Réaumur",
            addressLocality: "Paris",
            postalCode: "75003",
            addressCountry: "FR",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+33-6-20-43-20-59",
              contactType: "customer service",
              email: "contact@optee.io",
              availableLanguage: "French",
              areaServed: "FR",
            },
          ],
          sameAs: [
            "https://www.linkedin.com/company/optee",
            "https://www.instagram.com/optee.io",
            "https://www.facebook.com/optee.io",
          ],
        }}
      />
      <PageHero
        eyebrow="NOUS CONTACTER"
        title="Parlons de vos prochaines opportunités."
        description="Une question ou un projet ? Écrivez-nous. L'équipe Pisteur vous répond dans les meilleurs délais."
      />
      <ContactSection hideHeader />
    </>
  );
}
