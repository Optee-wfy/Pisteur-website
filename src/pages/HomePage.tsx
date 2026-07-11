import { Box, Text, VStack } from "@chakra-ui/react";
import { SEO } from "@/components/SEO";
import { SafariWindow } from "@/components/SafariWindow";
import { LeadPopup } from "@/components/LeadPopup";
import { Hero } from "@/sections/Hero";
import { Logos } from "@/sections/Logos";
import { FinalCTA, MarketingStory } from "@/sections/MarketingStory";
import { FAQ } from "@/sections/FAQ";
import { ContactSection } from "@/sections/ContactSection";
import { VerticalCards } from "@/sections/VerticalCards";
import { Stats } from "@/sections/Stats";
import { Testimonials } from "@/sections/Testimonials";
import { CompetitorCompare } from "@/sections/CompetitorCompare";
import { DataSourceLogos } from "@/sections/DataSourceLogos";
import { Pricing } from "@/sections/Pricing";
import { AgentShowcase } from "@/sections/AgentShowcase";

export function HomePage() {
  return (
    <>
      <SEO
        title="Pisteur — Prospection bâtiment & énergie B2B | Leads qualifiés"
        description="Pisteur génère des listes de prospects qualifiés pour le courtage en énergie, la rénovation, les équipements et les services aux bâtiments. Décideurs nominatifs et données prêtes à prospecter."
        path="/"
        keywords={[
          "prospection bâtiment",
          "leads qualifiés bâtiment",
          "courtage en énergie leads",
          "rénovation énergétique prospection",
          "données bâtiment B2B",
          "logiciel prospection commerciale",
          "DPE prospection",
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: "Pisteur",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description: "Moteur de prospection B2B pour identifier les bâtiments, entreprises et décideurs pertinents dans les secteurs du bâtiment et de l'énergie.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
                priceValidUntil: "2027-12-31",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                reviewCount: "12",
              },
            },
            {
              "@type": "VideoObject",
              name: "Démo interactive Pisteur — Prospection bâtiment en action",
              description: "Découvrez comment Pisteur filtre et qualifie des prospects bâtiment en quelques secondes.",
              thumbnailUrl: "https://pisteur.io/logo-pisteur-ai.webp",
              uploadDate: "2025-01-01",
              embedUrl: "https://app.arcade.software/share/NadC049RYMZAgOJ6mjFM",
            },
            {
              "@type": "WebSite",
              url: "https://pisteur.io",
              name: "Pisteur",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://pisteur.io/blog?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }}
      />
      <LeadPopup />
      <Hero />
      <Logos />
      <AgentShowcase />

      {/* ── Démo interactive ── */}
      <Box py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="#f7faff">
        <Box maxW="5xl" mx="auto">
          <VStack gap="3" textAlign="center" mb={{ base: "8", md: "12" }}>
            <Text fontSize="xs" fontWeight="bold" color="#23c55e" letterSpacing="widest">
              DÉMO INTERACTIVE
            </Text>
            <Text
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="900"
              color="#071B63"
              letterSpacing="-0.04em"
              lineHeight="1.1"
            >
              Découvrez Pisteur en action.
            </Text>
            <Text fontSize="sm" color="#6b7280" maxW="xl">
              Explorez la plateforme avant même de créer un compte — filtrez, ciblez et obtenez un prospect qualifié en quelques secondes.
            </Text>
          </VStack>
          <SafariWindow url="app.pisteur.fr — Démo interactive">
            <Box position="relative" w="full" pb="56.25%" overflow="hidden">
              <Box
                as="iframe"
                position="absolute"
                top="0"
                left="0"
                w="full"
                h="full"
                border="0"
                title="Démo Pisteur"
                src="https://app.arcade.software/share/NadC049RYMZAgOJ6mjFM?ref=share-link&embed&show_copy_link=true"
                loading="lazy"
                allowFullScreen
              />
            </Box>
          </SafariWindow>
        </Box>
      </Box>

      <MarketingStory />
      <DataSourceLogos />
      <VerticalCards />
      <Stats />
      <Testimonials />
      <CompetitorCompare />
      <FinalCTA />
      <ContactSection />
      <Pricing />
      <FAQ pagePath="/" />
    </>
  );
}
