import { SEO } from "@/components/SEO";
import { Hero } from "@/sections/Hero";
import { Logos } from "@/sections/Logos";
import { FinalCTA, MarketingStory } from "@/sections/MarketingStory";
import { FAQ } from "@/sections/FAQ";
import { ContactSection } from "@/sections/ContactSection";
import { SocialProofBar } from "@/sections/SocialProofBar";
import { VerticalCards } from "@/sections/VerticalCards";
import { Stats } from "@/sections/Stats";
import { Testimonials } from "@/sections/Testimonials";
import { CompetitorCompare } from "@/sections/CompetitorCompare";
import { DataSourceLogos } from "@/sections/DataSourceLogos";

export function HomePage() {
  return (
    <>
      <SEO
        title="Accueil"
        description="Pisteur génère des listes de prospects qualifiés pour le courtage en énergie, la rénovation, les équipements et les services aux bâtiments. Décideurs nominatifs et données prêtes à prospecter."
        path="/"
        keywords={[
          "prospection bâtiment",
          "leads qualifiés",
          "courtage en énergie",
          "rénovation énergétique",
          "données bâtiment",
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Pisteur",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description:
            "Moteur de prospection B2B pour identifier les bâtiments, entreprises et décideurs pertinents.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        }}
      />
      <Hero />
      <SocialProofBar />
      <MarketingStory />
      <DataSourceLogos />
      <VerticalCards />
      <Logos />
      <Stats />
      <Testimonials />
      <CompetitorCompare />
      <FAQ pagePath="/" />
      <FinalCTA />
      <ContactSection />
    </>
  );
}
