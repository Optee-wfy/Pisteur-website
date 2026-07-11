import { Box, Flex, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { LuArrowRight, LuFlame } from "react-icons/lu"
import { Link } from "react-router-dom"
import { NewAgentBadge } from "@/components/NewAgentBadge"

const MotionBox = motion.create(Box)
const AGENT_IMAGE = "/mathis/mathis-toutes-les-actions.webp"

const miniFeatures = [
  { label: "Recherche & ciblage", image: "/mathis/mathis-recherche-ciblage.webp" },
  { label: "Email + LinkedIn", image: "/mathis/mathis-prise-de-contact.webp" },
  { label: "Relance intelligente", image: "/mathis/mathis-relance-intelligente.webp" },
  { label: "Qualification des leads", image: "/mathis/mathis-qualification-leads.webp" },
  { label: "Analyse & tri", image: "/mathis/mathis-analyse-opportunites.webp" },
  { label: "Prise de RDV qualifiés", image: "/mathis/mathis-prise-de-rdv.webp" },
]

export function AgentTeaser() {
  return (
    <Box py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="white">
      <MotionBox
        maxW="7xl"
        mx="auto"
        bg="#071B63"
        borderRadius={{ base: "2xl", md: "3xl" }}
        overflow="hidden"
        position="relative"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65 }}
      >
        <Box position="absolute" w="50%" h="140%" bg="#23c55e/12" filter="blur(100px)" top="-20%" right="-10%" pointerEvents="none" />
        <Box position="absolute" w="35%" h="100%" bg="#071FD6/18" filter="blur(90px)" bottom="-20%" left="-5%" pointerEvents="none" />

        <Flex direction={{ base: "column", lg: "row" }} alignItems="center" gap={{ base: "0", lg: "8" }}>
          <VStack
            flex="1"
            alignItems="flex-start"
            gap="5"
            p={{ base: "8", md: "12" }}
            position="relative"
          >
            <NewAgentBadge />
            <Text
              as="h2"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="900"
              letterSpacing="-0.04em"
              lineHeight="1.05"
              color="white"
            >
              Et si votre prospection
              <br />
              tournait toute seule ?
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }} color="whiteAlpha.700" lineHeight="1.7" maxW="lg">
              Découvrez <Text as="span" color="#23c55e" fontWeight="800">Mathis</Text>, l'agent IA qui recherche vos prospects,
              les contacte, les relance et vous décroche des rendez-vous avec votre client idéal — 24h/24, 7j/7.
            </Text>

            <SimpleGrid columns={{ base: 3, sm: 6 }} gap="2.5" w="full" pt="1">
              {miniFeatures.map((f, i) => (
                <MotionBox
                  key={f.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <VStack
                    gap="1.5"
                    bg="whiteAlpha.100"
                    borderRadius="xl"
                    p="2.5"
                    transition="all .2s"
                    _hover={{ bg: "whiteAlpha.200", transform: "translateY(-2px)" }}
                  >
                    <Image src={f.image} alt={f.label} w="9" h="9" objectFit="contain" />
                    <Text fontSize="9px" color="whiteAlpha.800" fontWeight="700" textAlign="center" lineHeight="1.3">
                      {f.label}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>

            <HStack gap="2" bg="#fff1e8" color="#c2410c" px="3.5" py="2" borderRadius="xl" fontSize="xs" fontWeight="800">
              <LuFlame size={13} />
              <Text>Offre de lancement : 1 000€/mois pour les 3 premiers clients</Text>
            </HStack>
            <HStack gap="3" flexWrap="wrap" pt="2">
              <Box
                as={Link}
                to="/agent-ia-prospection-batiment"
                bg="#23c55e"
                color="white"
                fontWeight="800"
                fontSize="sm"
                borderRadius="xl"
                px="6"
                py="3.5"
                display="inline-flex"
                alignItems="center"
                gap="2"
                transition="all .2s"
                _hover={{ bg: "#1da34e", transform: "translateY(-2px)" }}
              >
                Découvrir Mathis <LuArrowRight size={15} />
              </Box>
              <Box
                as={Link}
                to="/agent-ia-prospection-batiment#offre"
                color="white"
                fontWeight="700"
                fontSize="sm"
                px="2"
                py="3.5"
                _hover={{ color: "#23c55e" }}
              >
                Réserver mon offre de lancement →
              </Box>
            </HStack>
          </VStack>

          <Box flex="0 0 auto" w={{ base: "full", lg: "420px" }} p={{ base: "6", lg: "6" }} position="relative">
            <MotionBox
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={AGENT_IMAGE}
                alt="Mathis, l'agent IA Pisteur, orchestrant la recherche de prospects, la prise de contact automatisée et la prise de rendez-vous qualifiés"
                w="full"
                objectFit="contain"
                display="block"
              />
            </MotionBox>
          </Box>
        </Flex>
      </MotionBox>
    </Box>
  )
}
