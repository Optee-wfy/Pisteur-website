import { Box, HStack, Text } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import { motion } from "framer-motion"
import { LuArrowRight, LuFlame } from "react-icons/lu"
import { Link } from "react-router-dom"
import { NewAgentBadge } from "@/components/NewAgentBadge"
import { MathisOrbitAvatar } from "@/components/MathisOrbitAvatar"
import { DockRow } from "@/components/DockRow"

const MotionBox = motion.create(Box)

const shimmer = keyframes`
  to { background-position: 300% center; }
`

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionBox>
  )
}

const miniFeatures = [
  { label: "Recherche & ciblage", image: "/mathis/mathis-recherche-ciblage.webp" },
  { label: "Prise de contact", image: "/mathis/mathis-prise-de-contact.webp" },
  { label: "Relance intelligente", image: "/mathis/mathis-relance-intelligente.webp" },
  { label: "Qualification des leads", image: "/mathis/mathis-qualification-leads.webp" },
  { label: "Analyse & tri", image: "/mathis/mathis-analyse-opportunites.webp" },
  { label: "Prise de RDV qualifiés", image: "/mathis/mathis-prise-de-rdv.webp" },
]

export function AgentShowcase() {
  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bg="linear-gradient(165deg, #000d4d 0%, #071B63 55%, #050b30 100%)"
      py={{ base: "20", md: "36" }}
      px={{ base: "5", md: "8" }}
    >
      {/* Halos de fond animés */}
      <MotionBox
        position="absolute"
        w="45%"
        h="45%"
        bg="#23c55e/16"
        filter="blur(120px)"
        borderRadius="full"
        top="-10%"
        left="-8%"
        pointerEvents="none"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <MotionBox
        position="absolute"
        w="50%"
        h="50%"
        bg="#071FD6/20"
        filter="blur(130px)"
        borderRadius="full"
        bottom="-15%"
        right="-10%"
        pointerEvents="none"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <Box maxW="5xl" mx="auto" position="relative" textAlign="center">
        <Reveal>
          <Box display="flex" justifyContent="center" mb="7">
            <NewAgentBadge size="lg" />
          </Box>
        </Reveal>

        <Reveal delay={0.08}>
          <Text
            as="h2"
            fontSize={{ base: "4xl", sm: "5xl", md: "7xl" }}
            fontWeight="900"
            letterSpacing="-0.045em"
            lineHeight={{ base: "1.05", md: "1.02" }}
            color="white"
          >
            Et si vous passiez
            <br />
            à la <Box as="span" color="#23c55e">vitesse supérieure</Box> ?
          </Text>
        </Reveal>

        <Reveal delay={0.16}>
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="800"
            color="whiteAlpha.600"
            mt={{ base: "5", md: "6" }}
            letterSpacing="-0.02em"
          >
            Rencontrez Mathis.
          </Text>
        </Reveal>

        <Reveal delay={0.22}>
          <Text
            maxW="2xl"
            mx="auto"
            mt={{ base: "5", md: "6" }}
            fontSize={{ base: "md", md: "lg" }}
            color="whiteAlpha.700"
            lineHeight="1.75"
          >
            L'agent IA qui recherche vos prospects, engage le contact, relance et vous décroche des
            rendez-vous avec votre client idéal — pendant que vous, vous vendez. 24h/24, 7j/7.
          </Text>
        </Reveal>

        <Reveal delay={0.3}>
          <Box display="flex" justifyContent="center" my={{ base: "14", md: "20" }}>
            <MathisOrbitAvatar size={{ base: "200px", md: "300px" }} ringWidth="6px" duration="5s" />
          </Box>
        </Reveal>

        <Reveal delay={0.36}>
          <Box maxW="4xl" mx="auto" mb={{ base: "10", md: "14" }}>
            <DockRow items={miniFeatures} />
          </Box>
        </Reveal>

        <Reveal delay={0.42}>
          <Box
            display="inline-block"
            borderRadius="full"
            p="2.5px"
            bg="linear-gradient(90deg, #071FD6, #23c55e, #00c94c, #071B63, #071FD6, #23c55e)"
            backgroundSize="300% auto"
            animation={`${shimmer} 3s linear infinite`}
            mb={{ base: "8", md: "10" }}
          >
            <HStack
              gap="2"
              bg="white"
              color="#071B63"
              px="4"
              py="2.5"
              borderRadius="full"
              fontSize="sm"
              fontWeight="800"
            >
              <LuFlame size={15} color="#071B63" />
              <Text>1 500€ → 1 000€/mois pour les 3 premiers clients</Text>
            </HStack>
          </Box>
        </Reveal>

        <Reveal delay={0.48}>
          <HStack gap="3" flexWrap="wrap" justifyContent="center">
            <Box
              as={Link}
              to="/agent-ia-prospection-batiment"
              bg="#23c55e"
              color="white"
              fontWeight="800"
              fontSize="sm"
              borderRadius="xl"
              px="7"
              py="4"
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
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor="whiteAlpha.300"
              color="white"
              fontWeight="700"
              fontSize="sm"
              borderRadius="xl"
              px="7"
              py="4"
              display="inline-flex"
              alignItems="center"
              transition="all .2s"
              _hover={{ bg: "whiteAlpha.200" }}
            >
              Réserver mon offre de lancement
            </Box>
          </HStack>
        </Reveal>
      </Box>
    </Box>
  )
}
