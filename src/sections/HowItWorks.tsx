import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import {
  LuArrowRight,
  LuListChecks,
  LuRadar,
  LuScanSearch,
} from "react-icons/lu"
import { Link } from "react-router-dom"

const AUTH_URL = "https://app.optee.io/auth"
const MotionBox = motion.create(Box)

const steps = [
  {
    num: 1,
    icon: LuScanSearch,
    title: "Définissez votre cible",
    desc: "Métiers, zones géographiques, types de bâtiments, effectifs, consommation, DPE et certifications.",
    color: "#071FD6",
    colorLight: "#eef0fd",
  },
  {
    num: 2,
    icon: LuRadar,
    title: "Pisteur analyse des millions de signaux",
    desc: "Données énergétiques, permis, appels d'offres, annonces légales, recrutements et financements.",
    color: "#7c3aed",
    colorLight: "#f5f3ff",
  },
  {
    num: 3,
    icon: LuListChecks,
    title: "Recevez votre liste de prospects prête à démarcher",
    desc: "Contacts décideurs vérifiés, coordonnées directes, contexte et score de pertinence.",
    color: "#059669",
    colorLight: "#ecfdf5",
  },
]

export function HowItWorks() {
  return (
    <Box
      as="section"
      py={{ base: "20", md: "28" }}
      px={{ base: "4", md: "6" }}
      bg="white"
    >
      <Box maxW="5xl" mx="auto">

        {/* ── En-tête ── */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          mb={{ base: "14", md: "18" }}
          textAlign="center"
        >
          <Text
            fontSize="xs"
            fontWeight="bold"
            color="#059669"
            letterSpacing="widest"
            mb="4"
          >
            COMMENT ÇA MARCHE
          </Text>
          <Text
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="900"
            color="#071B63"
            letterSpacing="-0.04em"
            lineHeight="1.05"
            mb="4"
          >
            Des prospects qualifiés.
            <Box as="br" />
            Instantanément.
          </Text>
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="#6b7280"
            maxW="420px"
            mx="auto"
            lineHeight="1.7"
          >
            Ce que vos concurrents cherchent en 3 jours — vous l'obtenez en quelques secondes.
          </Text>
        </MotionBox>

        {/* ── Étapes ── */}
        <VStack gap="0" alignItems="stretch">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isLast = i === steps.length - 1
            return (
              <MotionBox
                key={step.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.14 }}
              >
                <Flex gap={{ base: "5", md: "8" }} alignItems="flex-start">

                  {/* Colonne gauche : numéro + ligne */}
                  <VStack gap="0" alignItems="center" flexShrink={0} w={{ base: "48px", md: "64px" }}>
                    {/* Cercle numéroté */}
                    <Box
                      w={{ base: "48px", md: "56px" }}
                      h={{ base: "48px", md: "56px" }}
                      borderRadius="full"
                      bg={step.colorLight}
                      border={`2px solid ${step.color}25`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      position="relative"
                      zIndex="1"
                    >
                      <Text
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight="900"
                        color={step.color}
                        lineHeight="1"
                      >
                        {step.num}
                      </Text>
                    </Box>

                    {/* Ligne verticale entre les étapes */}
                    {!isLast && (
                      <Box
                        w="2px"
                        flex="1"
                        minH="48px"
                        bg={`linear-gradient(180deg, ${step.color}30 0%, ${steps[i + 1].color}30 100%)`}
                        my="2"
                      />
                    )}
                  </VStack>

                  {/* Contenu */}
                  <Box
                    pb={isLast ? "0" : { base: "8", md: "12" }}
                    pt="1"
                    flex="1"
                  >
                    <HStack gap="3" mb="2" alignItems="center">
                      <Box color={step.color}>
                        <Icon size={18} />
                      </Box>
                      <Text
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="800"
                        color="#071B63"
                        letterSpacing="-0.02em"
                        lineHeight="1.2"
                      >
                        {step.title}
                      </Text>
                    </HStack>
                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      color="#6b7280"
                      lineHeight="1.7"
                      pl={{ base: "0", md: "0" }}
                    >
                      {step.desc}
                    </Text>
                  </Box>
                </Flex>
              </MotionBox>
            )
          })}
        </VStack>

        {/* ── Résultat final ── */}
        <MotionBox
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          mt={{ base: "12", md: "16" }}
        >
          <Box
            bg="#071B63"
            borderRadius="2xl"
            p={{ base: "6", md: "8" }}
            textAlign="center"
          >
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="800"
              color="white"
              mb="2"
              letterSpacing="-0.02em"
            >
              Résultat : une liste de prospects actionnables en quelques secondes
            </Text>
            <Text fontSize="sm" color="rgba(255,255,255,.55)" mb="6" maxW="480px" mx="auto">
              Ce qu'il vous aurait fallu des jours à rassembler manuellement — livré instantanément,
              avec le bon décideur et le bon contexte.
            </Text>
            <HStack gap="3" justifyContent="center" flexWrap="wrap">
              <Button
                bg="#23c55e"
                color="white"
                fontWeight="bold"
                borderRadius="xl"
                px="6"
                _hover={{ bg: "#1da34e" }}
                asChild
              >
                <a href={AUTH_URL}>Voir mes premiers prospects →</a>
              </Button>
              <Button
                variant="ghost"
                color="rgba(255,255,255,.7)"
                borderRadius="xl"
                px="6"
                border="1px solid rgba(255,255,255,.15)"
                _hover={{ bg: "rgba(255,255,255,.06)", color: "white" }}
                asChild
              >
                <Link to="/demo">
                  <HStack gap="1.5">
                    <Text>Voir une démo</Text>
                    <LuArrowRight size={14} />
                  </HStack>
                </Link>
              </Button>
            </HStack>
          </Box>
        </MotionBox>

      </Box>
    </Box>
  )
}
