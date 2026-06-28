import { Box, Text, VStack } from "@chakra-ui/react"
import { SEO } from "@/components/SEO"
import { DemoForm } from "@/sections/DemoForm"
import { SafariWindow } from "@/components/SafariWindow"
import { PageHero } from "@/components/PageHero"
import { FAQ } from "@/sections/FAQ"

export function DemoPage() {
  return (
    <>
      <SEO
        title="Démonstration personnalisée"
        description="Demandez une démonstration de Pisteur sur votre marché réel : activité, zone, critères bâtimentaires et décideurs disponibles."
        path="/demo"
        keywords={["démo Pisteur", "démonstration logiciel prospection", "essai prospection bâtiment"]}
      />
      <PageHero eyebrow="DÉMONSTRATION" title="Voyez Pisteur sur vos vraies cibles." description="Notre équipe configure la plateforme avec votre métier et votre zone pour vous montrer des opportunités réellement pertinentes." />
      <Box pt={{ base: "14", md: "20" }} pb={{ base: "8", md: "12" }} px={{ base: "4", md: "6" }} bg="white">
        <Box maxW="5xl" mx="auto">
          <VStack gap="4" textAlign="center" mb="8">
            <Text
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="extrabold"
              color="#000d4d"
            >
              Decouvrez Pisteur en action
            </Text>
            <Text fontSize="md" color="gray.600" maxW="2xl">
              Explorez la plateforme en demo interactive avant de demander un
              acces personnalise.
            </Text>
          </VStack>

          <SafariWindow url="app.pisteur.fr — Demo interactive">
            <Box position="relative" w="full" pb="56.25%" overflow="hidden">
              <Box
                as="iframe"
                position="absolute"
                top="0"
                left="0"
                w="full"
                h="full"
                border="0"
                title="Demo Pisteur"
                src="https://app.arcade.software/share/NadC049RYMZAgOJ6mjFM?ref=share-link&embed&show_copy_link=true"
                loading="lazy"
                allowFullScreen
              />
            </Box>
          </SafariWindow>
        </Box>
      </Box>

      <DemoForm />
      <FAQ pagePath="/demo" />
    </>
  )
}
