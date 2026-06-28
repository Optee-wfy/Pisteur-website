import { Box, Flex, Grid, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import { motion, useReducedMotion } from "framer-motion"
import {
  LuBuilding2,
  LuDatabase,
  LuExternalLink,
  LuMessageSquareText,
  LuRefreshCw,
  LuShieldCheck,
  LuSparkles,
  LuUsers,
} from "react-icons/lu"

const MotionBox = motion.create(Box)

const sourceGroups = [
  {
    icon: LuBuilding2,
    title: "Données bâtiment",
    accent: "#071FD6",
    sources: [
      { name: "BDNB", href: "https://bdnb.io/" },
      { name: "Cadastre", href: "https://cadastre.data.gouv.fr/" },
      { name: "Etalab", href: "https://www.etalab.gouv.fr/" },
      { name: "Enedis", href: "https://data.enedis.fr/" },
      { name: "GRDF", href: "https://opendata.grdf.fr/pages/accueil/" },
      { name: "Base propriétaire Pisteur", href: "/donnees" },
    ],
  },
  {
    icon: LuDatabase,
    title: "Données entreprise",
    accent: "#5B46F5",
    sources: [
      { name: "SIRENE / SIRET", href: "https://www.insee.fr/fr/information/3591226" },
      { name: "RNIC", href: "https://www.data.gouv.fr/datasets/registre-national-dimmatriculation-des-coproprietes" },
      { name: "MAJIC", href: "https://datafoncier.cerema.fr/fichiers-fonciers" },
      { name: "Pappers", href: "https://www.pappers.fr/" },
    ],
  },
  {
    icon: LuUsers,
    title: "Données contact",
    accent: "#00B94F",
    sources: [
      { name: "Sociétéinfo", href: "https://societeinfo.com/" },
      { name: "FullEnrich", href: "https://www.fullenrich.com/" },
      { name: "Hunter.io", href: "https://hunter.io/email-finder.html" },
    ],
  },
]

const orbitSources = ["BDNB", "Cadastre", "Enedis", "GRDF", "SIRENE", "Pappers", "FullEnrich", "Sociétéinfo"]

const flow = keyframes`
  0% { background-position: 0% 50%; opacity: .32; }
  50% { background-position: 100% 50%; opacity: .9; }
  100% { background-position: 0% 50%; opacity: .32; }
`

function OrbitVisual() {
  const reduceMotion = useReducedMotion()
  const orbitSize = "clamp(330px, 43vw, 510px)"
  const radius = "calc(clamp(330px, 43vw, 510px) / 2 - 54px)"

  return (
    <Box
      position="relative"
      w={orbitSize}
      h={orbitSize}
      mx="auto"
      aria-label="Les sources de données enrichissent continuellement l’algorithme Pisteur"
    >
      <Box
        position="absolute"
        inset="8%"
        borderRadius="full"
        border="1px solid rgba(7,31,214,.13)"
        bg="radial-gradient(circle, rgba(35,197,94,.07) 0%, rgba(7,31,214,.035) 38%, transparent 70%)"
      />
      <Box
        position="absolute"
        inset="20%"
        borderRadius="full"
        border="1px dashed rgba(7,31,214,.18)"
      />

      <MotionBox
        position="absolute"
        inset="0"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {orbitSources.map((source, index) => {
          const angle = (index * 360) / orbitSources.length - 90
          const delay = index * 0.18

          return (
            <Box key={source} position="absolute" inset="0">
              <Box
                position="absolute"
                left="50%"
                top="50%"
                w={radius}
                h="2px"
                transformOrigin="left center"
                transform={`rotate(${angle}deg)`}
                bg="linear-gradient(90deg, rgba(35,197,94,.9), rgba(7,31,214,.65), rgba(91,70,245,.12))"
                backgroundSize="200% 100%"
                animation={reduceMotion ? undefined : `${flow} 3.2s ease-in-out ${delay}s infinite`}
              >
                <MotionBox
                  position="absolute"
                  top="-3px"
                  left="100%"
                  w="8px"
                  h="8px"
                  borderRadius="full"
                  bg="#23c55e"
                  boxShadow="0 0 12px rgba(35,197,94,.8)"
                  animate={reduceMotion ? undefined : { left: ["100%", "0%"], opacity: [0, 1, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, delay, ease: "easeInOut" }}
                />
              </Box>

              <Box
                position="absolute"
                left="50%"
                top="50%"
                transform={`rotate(${angle}deg) translateX(${radius})`}
                transformOrigin="left center"
              >
                <Box transform="translate(-50%, -50%)">
                  <MotionBox
                    animate={reduceMotion ? { rotate: -angle } : { rotate: [-angle, -angle - 360] }}
                    transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
                    px={{ base: "2.5", md: "3.5" }}
                    py={{ base: "1.5", md: "2" }}
                    borderRadius="full"
                    bg="white"
                    border="1px solid rgba(7,31,214,.14)"
                    boxShadow="0 8px 24px rgba(7,27,99,.1)"
                    whiteSpace="nowrap"
                  >
                    <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="bold" color="#071B63">
                      {source}
                    </Text>
                  </MotionBox>
                </Box>
              </Box>
            </Box>
          )
        })}
      </MotionBox>

      <MotionBox
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
        w={{ base: "104px", md: "132px" }}
        h={{ base: "104px", md: "132px" }}
        borderRadius="3xl"
        bg="white"
        border="1px solid rgba(7,31,214,.12)"
        boxShadow="0 22px 55px rgba(7,31,214,.16)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex="2"
        animate={reduceMotion ? undefined : { scale: [1, 1.035, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/logo-pisteur-ai.webp" alt="Logo Pisteur" w="66%" h="66%" objectFit="contain" />
        <Box
          position="absolute"
          inset="-10px"
          borderRadius="calc(1.5rem + 10px)"
          border="1px solid rgba(35,197,94,.28)"
          pointerEvents="none"
        />
      </MotionBox>
    </Box>
  )
}

function SourceCard({ group, index }: { group: (typeof sourceGroups)[number]; index: number }) {
  const Icon = group.icon

  return (
    <MotionBox
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      h="full"
      p={{ base: "5", md: "6" }}
      borderRadius="2xl"
      bg="white"
      border="1px solid #E4E9F3"
      boxShadow="0 10px 32px rgba(7,27,99,.055)"
    >
      <HStack gap="3" mb="5">
        <Box
          w="10"
          h="10"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="xl"
          bg={`${group.accent}12`}
          color={group.accent}
        >
          <Icon size={20} />
        </Box>
        <Text fontWeight="extrabold" color="#071B63">
          {group.title}
        </Text>
      </HStack>

      <Flex gap="2" flexWrap="wrap">
        {group.sources.map((source) => {
          const isExternal = source.href.startsWith("http")
          return (
            <Box
              as="a"
              key={source.name}
              href={source.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              px="3"
              py="2"
              borderRadius="lg"
              bg="#F7F9FC"
              border="1px solid #E7EBF2"
              color="#465377"
              fontSize="xs"
              fontWeight="semibold"
              transition="all .2s ease"
              _hover={{ color: group.accent, borderColor: `${group.accent}55`, bg: `${group.accent}08`, transform: "translateY(-1px)" }}
              _focusVisible={{ outline: `2px solid ${group.accent}`, outlineOffset: "2px" }}
            >
              <HStack gap="1.5">
                <Text>{source.name}</Text>
                {isExternal && <LuExternalLink size={11} aria-hidden="true" />}
              </HStack>
            </Box>
          )
        })}
      </Flex>
    </MotionBox>
  )
}

function McpFeature() {
  const storageBase = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/Image%20du%20site/data-sources`

  return (
    <MotionBox
      mt={{ base: "10", md: "14" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
      borderRadius={{ base: "2xl", md: "3xl" }}
      overflow="hidden"
      bg="#071B63"
      color="white"
      position="relative"
    >
      <Box position="absolute" inset="0" bg="radial-gradient(circle at 88% 20%, rgba(35,197,94,.19), transparent 28%), linear-gradient(120deg, rgba(7,31,214,.45), transparent 55%)" />
      <Grid position="relative" templateColumns={{ base: "1fr", lg: "1.15fr .85fr" }} gap="0">
        <VStack alignItems="flex-start" gap="4" p={{ base: "6", md: "10" }}>
          <HStack gap="2" color="#62F391">
            <LuSparkles size={17} />
            <Text fontSize="xs" fontWeight="extrabold" letterSpacing=".12em">
              NOUVEAUTÉS
            </Text>
          </HStack>
          <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" letterSpacing="-.035em" maxW="xl">
            Dialoguez directement avec MCP data.gouv.fr dans Pisteur.
          </Text>
          <Text color="whiteAlpha.750" fontSize="sm" lineHeight="1.75" maxW="xl">
            Recherchez, interrogez et analysez les données publiques en langage naturel, sans quitter votre espace de travail.
          </Text>
          <HStack gap="3" mt="1">
            <Box bg="white" borderRadius="xl" px="4" py="3">
              <Image src={`${storageBase}/data-gouv-logo-source-donnees-publiques.webp`} alt="Logo data.gouv.fr" h="8" maxW="32" objectFit="contain" />
            </Box>
            <Box bg="white" borderRadius="xl" px="4" py="3">
              <Image src={`${storageBase}/serveur-mcp-data-gouv-logo.webp`} alt="Logo MCP data.gouv.fr" h="8" maxW="40" objectFit="contain" />
            </Box>
          </HStack>
        </VStack>

        <Box p={{ base: "6", md: "8" }} bg="rgba(255,255,255,.055)" borderLeft={{ base: "0", lg: "1px solid rgba(255,255,255,.1)" }}>
          <VStack h="full" justifyContent="center" gap="3" alignItems="stretch">
            <HStack alignSelf="flex-end" maxW="90%" px="4" py="3" borderRadius="xl xl sm xl" bg="white" color="#071B63">
              <LuMessageSquareText size={17} />
              <Text fontSize="sm">Quels bâtiments tertiaires ont un DPE F à Lyon ?</Text>
            </HStack>
            <Box maxW="94%" px="4" py="3" borderRadius="xl xl xl sm" bg="rgba(35,197,94,.14)" border="1px solid rgba(98,243,145,.22)">
              <HStack gap="2" mb="2" color="#62F391">
                <LuRefreshCw size={13} />
                <Text fontSize="2xs" fontWeight="bold">MCP DATA.GOUV.FR · SOURCES CROISÉES</Text>
              </HStack>
              <Text fontSize="sm" color="whiteAlpha.900">J’ai identifié les bâtiments correspondants et vérifié leurs données publiques disponibles.</Text>
            </Box>
          </VStack>
        </Box>
      </Grid>
    </MotionBox>
  )
}

export function DataInfra() {
  return (
    <Box py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="#F6F8FB" overflow="hidden">
      <Box maxW="7xl" mx="auto">
        <VStack gap="4" textAlign="center" mb={{ base: "10", md: "14" }}>
          <HStack px="3" py="1.5" bg="#EAFBF0" color="#009B3A" borderRadius="full" gap="2">
            <LuRefreshCw size={13} />
            <Text fontSize="2xs" fontWeight="extrabold" letterSpacing=".06em">DONNÉES MISES À JOUR EN JUIN 2026</Text>
          </HStack>
          <Text fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }} fontWeight="extrabold" color="#071B63" letterSpacing="-.045em" lineHeight="1.08">
            Une base construite sur les meilleures sources françaises
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }} color="#5D6988" maxW="3xl" lineHeight="1.75">
            Pisteur agrège, normalise et enrichit des dizaines de sources officielles et privées pour créer la base la plus complète sur le parc immobilier français.
          </Text>
        </VStack>

        <Grid templateColumns={{ base: "1fr", xl: "minmax(480px, .9fr) minmax(560px, 1.1fr)" }} gap={{ base: "10", xl: "12" }} alignItems="center">
          <OrbitVisual />
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", xl: "1fr" }} gap="4">
            {sourceGroups.map((group, index) => <SourceCard key={group.title} group={group} index={index} />)}
          </Grid>
        </Grid>

        <McpFeature />

        <HStack mt="7" justifyContent="center" alignItems="flex-start" gap="2" color="#6A7694">
          <Box mt="0.5"><LuShieldCheck size={15} /></Box>
          <Text fontSize="xs" textAlign="center" maxW="3xl">
            Les contacts sont enrichis uniquement à la demande. Aucune donnée personnelle n’est stockée sans base légale conforme au RGPD.
          </Text>
        </HStack>
      </Box>
    </Box>
  )
}
