import { Box, Text, VStack } from "@chakra-ui/react"
import { SEO } from "@/components/SEO"
import { SafariWindow } from "@/components/SafariWindow"
import { HowItWorks } from "@/sections/HowItWorks"
import { SignalFilters } from "@/sections/SignalFilters"
import { PageHero } from "@/components/PageHero"
import { FAQ } from "@/sections/FAQ"
import { ProcessComparison } from "@/sections/ProcessComparison"
import { DataSources } from "@/sections/DataSources"
import { Testimonials } from "@/sections/Testimonials"
import { RelatedLinks } from "@/components/RelatedLinks"
import { AgentTeaser } from "@/sections/AgentTeaser"

export function CommentCaMarchePage() {
  return (
    <>
      <SEO
        title="Comment fonctionne Pisteur — Prospection bâtiment automatisée"
        description="Pisteur croise BDNB, ENEDIS, SIRENE et 50+ signaux bâtiment pour identifier vos prospects et livrer le bon décideur avec coordonnées vérifiées. Résultat en 30 secondes."
        path="/comment-ca-marche"
        keywords={[
          "comment générer des leads bâtiment",
          "prospection bâtiment automatisée",
          "qualification prospects B2B automatique",
          "ciblage commercial énergie",
          "données DPE prospection",
          "leads courtage énergie",
          "logiciel prospection bâtiment",
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "HowTo",
              name: "Comment Pisteur génère des prospects qualifiés bâtiment",
              description: "Pisteur croise plus de 50 signaux bâtiment pour identifier les meilleures opportunités commerciales et livrer les coordonnées vérifiées du décideur.",
              step: [
                {
                  "@type": "HowToStep",
                  position: 1,
                  name: "Définissez votre cible",
                  text: "Sélectionnez votre métier, zone géographique, type de bâtiment, consommation énergétique et DPE.",
                },
                {
                  "@type": "HowToStep",
                  position: 2,
                  name: "Pisteur analyse les signaux",
                  text: "L'algorithme croise BDNB, ENEDIS, GRDF, SIRENE, permis et appels d'offres pour scorer chaque opportunité.",
                },
                {
                  "@type": "HowToStep",
                  position: 3,
                  name: "Recevez votre liste de prospects",
                  text: "Contacts décideurs vérifiés (mobile, mail, LinkedIn), contexte bâtiment et score de pertinence livrés instantanément.",
                },
              ],
            },
            {
              "@type": "VideoObject",
              name: "Démo interactive Pisteur — Prospection bâtiment en action",
              description: "Voyez comment Pisteur filtre et qualifie des prospects bâtiment en quelques secondes grâce à 50+ signaux officiels.",
              thumbnailUrl: "https://pisteur.io/logo-pisteur-ai.webp",
              uploadDate: "2025-01-01",
              embedUrl: "https://app.arcade.software/share/NadC049RYMZAgOJ6mjFM",
            },
          ],
        }}
      />

      <PageHero
        eyebrow="COMMENT ÇA MARCHE"
        title="De votre marché à vos prochains clients."
        description="Définissez votre cible, laissez Pisteur analyser les signaux pertinents, puis recevez une liste directement exploitable par vos commerciaux."
      />

      <HowItWorks />

      {/* ── Démo interactive ── */}
      <Box py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="#f8fafc">
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
              Voyez par vous-même.
            </Text>
            <Text fontSize="sm" color="#6b7280" maxW="xl">
              Filtrez, ciblez et obtenez un prospect qualifié avec coordonnées vérifiées — sans inscription.
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

      <AgentTeaser />

      <ProcessComparison />

      <SignalFilters />

      <DataSources />

      <Testimonials />

      <RelatedLinks
        title="ALLER PLUS LOIN"
        links={[
          { label: "Nos données", to: "/donnees", description: "50+ sources officielles croisées pour qualifier chaque bâtiment, entreprise et décideur." },
          { label: "Cas d'usage par secteur", to: "/cas-usage", description: "Courtage énergie, rénovation, CVC : découvrez les signaux adaptés à votre métier." },
          { label: "Tarifs", to: "/tarifs", description: "Commencez gratuitement et montez en puissance quand votre équipe est prête." },
        ]}
      />

      <FAQ pagePath="/comment-ca-marche" />
    </>
  )
}
