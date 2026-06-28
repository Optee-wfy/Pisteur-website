import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import {
  LuArrowRight,
  LuBolt,
  LuListChecks,
  LuRadar,
  LuScanSearch,
  LuUsers,
  LuZap,
} from "react-icons/lu"
import { Link } from "react-router-dom"

const AUTH_URL = "https://app.optee.io/auth"
const MotionBox = motion.create(Box)

const steps = [
  {
    num: "01",
    icon: LuScanSearch,
    color: "#23c55e",
    colorBg: "rgba(35,197,94,.12)",
    title: "Définissez votre cible",
    desc: "Configurez votre ICP en quelques clics. Pisteur comprend votre métier et affine automatiquement les critères pour coller à votre réalité terrain.",
    tags: [
      "Métier & code NAF",
      "Zone géographique",
      "Type de bâtiment",
      "DPE E/F/G",
      "Surface & effectifs",
      "Consommation énergie",
      "Certifications",
    ],
  },
  {
    num: "02",
    icon: LuRadar,
    color: "#818cf8",
    colorBg: "rgba(129,140,248,.12)",
    title: "Pisteur analyse des millions de signaux",
    desc: "En quelques secondes, notre moteur croise 100+ sources de données pour identifier les opportunités actives — celles que personne d'autre ne voit encore.",
    tags: [
      "Données DPE & ADEME",
      "Permis de construire",
      "Signaux ENEDIS / GRDF",
      "Appels d'offres publics",
      "Annonces légales",
      "Recrutements en cours",
      "Financements & CEE",
    ],
  },
  {
    num: "03",
    icon: LuListChecks,
    color: "#38bdf8",
    colorBg: "rgba(56,189,248,.12)",
    title: "Recevez votre liste prête à démarcher",
    desc: "Chaque lead livré avec le contexte complet : bâtiment, décideur nominatif, coordonnées directes et score de pertinence. Vous n'avez plus qu'à appeler.",
    tags: [
      "Contacts décideurs vérifiés",
      "Email · Téléphone · LinkedIn",
      "Adresse + DPE + surface",
      "Potentiel chantier estimé",
      "Contexte & score de pertinence",
      "Export CSV prêt à l'emploi",
    ],
  },
]

export function HowItWorks() {
  return (
    <Box
      as="section"
      py={{ base: "20", md: "28" }}
      px={{ base: "4", md: "6" }}
      bg="#040e3a"
      position="relative"
      overflow="hidden"
    >
      {/* Fond décoratif */}
      <Box
        position="absolute"
        top="-200px"
        left="50%"
        transform="translateX(-50%)"
        w="900px"
        h="600px"
        borderRadius="full"
        bg="radial-gradient(ellipse, rgba(35,197,94,.07) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Box maxW="7xl" mx="auto" position="relative">

        {/* ── En-tête ── */}
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <VStack textAlign="center" gap="4" mb={{ base: "14", md: "20" }}>
            {/* Badge gain de temps */}
            <HStack
              gap="2"
              bg="rgba(35,197,94,.12)"
              border="1px solid rgba(35,197,94,.25)"
              borderRadius="full"
              px="4"
              py="1.5"
            >
              <LuZap size={13} color="#23c55e" />
              <Text fontSize="xs" fontWeight="bold" color="#23c55e" letterSpacing="wide">
                CE QUE VOS CONCURRENTS FONT EN 3 JOURS — VOUS LE FAITES EN 3 MINUTES
              </Text>
            </HStack>

            <Text
              fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
              fontWeight="900"
              color="white"
              letterSpacing="-0.045em"
              lineHeight="1"
            >
              Des prospects qualifiés.
              <Box as="span" color="#23c55e" display="block">
                Instantanément.
              </Box>
            </Text>

            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="rgba(255,255,255,.55)"
              maxW="600px"
              lineHeight="1.7"
            >
              En 3 étapes, Pisteur remplace des heures de recherche manuelle par une liste
              de leads actionnables — avec le bon interlocuteur, les bonnes données, au bon moment.
            </Text>
          </VStack>
        </MotionBox>

        {/* ── Étapes ── */}
        <Box position="relative">
          {/* Ligne de connexion desktop */}
          <Box
            display={{ base: "none", lg: "block" }}
            position="absolute"
            top="52px"
            left="calc(16.66% + 28px)"
            right="calc(16.66% + 28px)"
            h="1px"
            bg="linear-gradient(90deg, #23c55e 0%, #818cf8 50%, #38bdf8 100%)"
            opacity="0.3"
            pointerEvents="none"
          />

          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={{ base: "5", lg: "6" }}
            alignItems="stretch"
          >
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <MotionBox
                  key={step.num}
                  flex="1"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: i * 0.18 }}
                >
                  <Box
                    h="full"
                    bg="rgba(255,255,255,.04)"
                    border="1px solid rgba(255,255,255,.08)"
                    borderRadius="2xl"
                    p={{ base: "6", md: "7" }}
                    position="relative"
                    overflow="hidden"
                    _hover={{
                      bg: "rgba(255,255,255,.07)",
                      borderColor: `${step.color}40`,
                      transform: "translateY(-4px)",
                    }}
                    transition="all .25s ease"
                  >
                    {/* Numéro watermark */}
                    <Text
                      position="absolute"
                      top="-10px"
                      right="16px"
                      fontSize="100px"
                      fontWeight="900"
                      color="rgba(255,255,255,.03)"
                      lineHeight="1"
                      pointerEvents="none"
                      userSelect="none"
                    >
                      {step.num}
                    </Text>

                    {/* Icône + numéro visible */}
                    <Flex alignItems="center" gap="3" mb="5">
                      <Box
                        w="11"
                        h="11"
                        borderRadius="xl"
                        bg={step.colorBg}
                        border={`1px solid ${step.color}30`}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color={step.color}
                        flexShrink={0}
                      >
                        <Icon size={20} />
                      </Box>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color={step.color}
                        letterSpacing="wide"
                      >
                        ÉTAPE {step.num}
                      </Text>
                    </Flex>

                    {/* Titre */}
                    <Text
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="800"
                      color="white"
                      lineHeight="1.15"
                      mb="3"
                      letterSpacing="-0.02em"
                    >
                      {step.title}
                    </Text>

                    {/* Description */}
                    <Text
                      fontSize="sm"
                      color="rgba(255,255,255,.55)"
                      lineHeight="1.7"
                      mb="5"
                    >
                      {step.desc}
                    </Text>

                    {/* Tags */}
                    <Flex gap="2" flexWrap="wrap">
                      {step.tags.map((tag) => (
                        <Box
                          key={tag}
                          px="2.5"
                          py="1"
                          borderRadius="full"
                          bg={step.colorBg}
                          border={`1px solid ${step.color}25`}
                          fontSize="2xs"
                          fontWeight="bold"
                          color={step.color}
                          letterSpacing="0.01em"
                        >
                          {tag}
                        </Box>
                      ))}
                    </Flex>
                  </Box>
                </MotionBox>
              )
            })}
          </Flex>
        </Box>

        {/* ── Bandeau résultat ── */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          mt={{ base: "10", md: "14" }}
        >
          <Box
            bg="rgba(35,197,94,.07)"
            border="1px solid rgba(35,197,94,.18)"
            borderRadius="2xl"
            p={{ base: "6", md: "8" }}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              alignItems={{ base: "flex-start", md: "center" }}
              justifyContent="space-between"
              gap="5"
            >
              <HStack gap="4" alignItems="flex-start">
                <Box
                  w="10"
                  h="10"
                  borderRadius="xl"
                  bg="rgba(35,197,94,.15)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="#23c55e"
                  flexShrink={0}
                  mt="0.5"
                >
                  <LuBolt size={20} />
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="800"
                    color="white"
                    mb="1"
                  >
                    Résultat : une liste de prospects actionnables en quelques secondes
                  </Text>
                  <Text fontSize="sm" color="rgba(255,255,255,.5)" maxW="520px">
                    Contacts nominatifs vérifiés, contexte bâtiment complet, score de pertinence —
                    tout ce qu'il vous aurait fallu des jours à rassembler manuellement.
                  </Text>
                </Box>
              </HStack>

              {/* Mini stats */}
              <Flex
                gap={{ base: "6", md: "8" }}
                flexShrink={0}
                flexWrap="wrap"
              >
                {[
                  { val: "32M+", label: "bâtiments indexés" },
                  { val: "+12M", label: "signaux / mois" },
                  { val: "95%", label: "précision données" },
                ].map(({ val, label }) => (
                  <VStack key={label} gap="0" textAlign="center">
                    <Text
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="900"
                      color="#23c55e"
                      letterSpacing="-0.03em"
                    >
                      {val}
                    </Text>
                    <Text fontSize="2xs" color="rgba(255,255,255,.4)" fontWeight="medium">
                      {label}
                    </Text>
                  </VStack>
                ))}
              </Flex>
            </Flex>
          </Box>
        </MotionBox>

        {/* ── CTA ── */}
        <MotionBox
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          mt={{ base: "10", md: "12" }}
        >
          <VStack gap="4" textAlign="center">
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
              color="white"
            >
              Prêt à voir vos prochains clients ?
            </Text>
            <HStack gap="3" flexWrap="wrap" justifyContent="center">
              <Button
                size="lg"
                bg="#23c55e"
                color="white"
                fontWeight="bold"
                borderRadius="xl"
                px="8"
                _hover={{ bg: "#1da34e", transform: "translateY(-2px)" }}
                _active={{ transform: "translateY(0)" }}
                transition="all .2s"
                asChild
              >
                <a href={AUTH_URL}>
                  <HStack gap="2">
                    <LuUsers size={17} />
                    <Text>Voir mes premiers prospects</Text>
                  </HStack>
                </a>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                color="rgba(255,255,255,.7)"
                borderRadius="xl"
                px="8"
                border="1px solid rgba(255,255,255,.15)"
                _hover={{
                  bg: "rgba(255,255,255,.06)",
                  color: "white",
                  borderColor: "rgba(255,255,255,.3)",
                }}
                asChild
              >
                <Link to="/demo">
                  <HStack gap="2">
                    <Text>Voir une démo</Text>
                    <LuArrowRight size={15} />
                  </HStack>
                </Link>
              </Button>
            </HStack>
          </VStack>
        </MotionBox>
      </Box>
    </Box>
  )
}
