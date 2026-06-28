import { Box, Flex, Grid, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import {
  LuBuilding2,
  LuCheck,
  LuDatabase,
  LuExternalLink,
  LuFileDigit,
  LuFileText,
  LuFlame,
  LuHash,
  LuHouse,
  LuLandmark,
  LuLink,
  LuMapPin,
  LuRefreshCw,
  LuSend,
  LuShieldCheck,
  LuUsers,
  LuZap,
} from "react-icons/lu"
import type { IconType } from "react-icons"

const MotionBox = motion.create(Box)

const sourceGroups = [
  {
    icon: LuBuilding2,
    title: "Données bâtiment",
    accent: "#071FD6",
    bg: "#eef0fd",
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
    accent: "#7c3aed",
    bg: "#f5f3ff",
    sources: [
      { name: "SIRENE / SIRET", href: "https://www.insee.fr/fr/information/3591226" },
      { name: "RNIC", href: "https://www.data.gouv.fr/datasets/registre-national-dimmatriculation-des-coproprietes" },
      { name: "MAJIC", href: "https://datafoncier.cerema.fr/fichiers-fonciers" },
      { name: "Pappers", href: "https://www.pappers.fr/" },
      { name: "Sociétéinfo", href: "https://societeinfo.com/" },
    ],
  },
  {
    icon: LuUsers,
    title: "Données contact",
    accent: "#059669",
    bg: "#ecfdf5",
    sources: [
      { name: "FullEnrich", href: "https://www.fullenrich.com/" },
      { name: "Hunter.io", href: "https://hunter.io/email-finder.html" },
    ],
  },
]

// Icônes représentant les types de données qui "volent" vers le logo
const flowIcons: { icon: IconType; color: string; bg: string }[] = [
  { icon: LuBuilding2, color: "#071FD6", bg: "#eef0fd" },
  { icon: LuHash,      color: "#7c3aed", bg: "#f5f3ff" },
  { icon: LuFileText,  color: "#059669", bg: "#ecfdf5" },
  { icon: LuHouse,     color: "#071FD6", bg: "#eef0fd" },
  { icon: LuZap,       color: "#d97706", bg: "#fffbeb" },
  { icon: LuFileDigit, color: "#0ea5e9", bg: "#f0f9ff" },
  { icon: LuMapPin,    color: "#7c3aed", bg: "#f5f3ff" },
  { icon: LuLandmark,  color: "#059669", bg: "#ecfdf5" },
  { icon: LuDatabase,  color: "#071FD6", bg: "#eef0fd" },
  { icon: LuFlame,     color: "#ef4444", bg: "#fef2f2" },
  { icon: LuUsers,     color: "#059669", bg: "#ecfdf5" },
  { icon: LuFileText,  color: "#0ea5e9", bg: "#f0f9ff" },
]

// 12 flux de particules répartis verticalement
const FLOW_LANES = [
  { yPct: 4,  delay: 0.0  },
  { yPct: 13, delay: 1.2  },
  { yPct: 22, delay: 0.4  },
  { yPct: 31, delay: 1.8  },
  { yPct: 40, delay: 0.8  },
  { yPct: 50, delay: 0.0  },
  { yPct: 59, delay: 1.4  },
  { yPct: 68, delay: 0.6  },
  { yPct: 77, delay: 1.0  },
  { yPct: 86, delay: 0.2  },
  { yPct: 94, delay: 1.6  },
]

function Particle({ lane, iconDef, wave }: {
  lane: typeof FLOW_LANES[0]
  iconDef: typeof flowIcons[0]
  wave: number
}) {
  const Icon = iconDef.icon
  const dur = 2.8 + wave * 0.35

  return (
    <MotionBox
      position="absolute"
      top={`${lane.yPct}%`}
      left="-40px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="36px"
      h="36px"
      borderRadius="10px"
      bg={iconDef.bg}
      border={`1.5px solid ${iconDef.color}28`}
      boxShadow={`0 4px 12px ${iconDef.color}18`}
      color={iconDef.color}
      animate={{
        x: [0, 120, 240, 360, 480],
        opacity: [0, 1, 1, 0.6, 0],
        scale: [0.75, 1, 1, 0.85, 0.5],
      }}
      transition={{
        duration: dur,
        delay: lane.delay + wave * 1.1,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 0.6,
      }}
    >
      <Icon size={15} />
    </MotionBox>
  )
}

// Petite particule "dot" pour remplir entre les icônes
function Dot({ yPct, delay, color }: { yPct: number; delay: number; color: string }) {
  const size = 5 + Math.round((yPct % 3) * 2.5)
  return (
    <MotionBox
      position="absolute"
      top={`${yPct}%`}
      left="-8px"
      w={`${size}px`}
      h={`${size}px`}
      borderRadius="full"
      bg={color}
      opacity={0.7}
      animate={{
        x: [0, 180, 380, 520],
        opacity: [0, 0.8, 0.5, 0],
      }}
      transition={{
        duration: 3.4 + (yPct % 4) * 0.3,
        delay,
        repeat: Infinity,
        ease: "easeIn",
        repeatDelay: 1.0,
      }}
    />
  )
}

function DataFlowVisual() {
  return (
    <Box
      position="relative"
      h={{ base: "340px", md: "460px" }}
      w="full"
      overflow="hidden"
      bg="linear-gradient(135deg, #f8faff 0%, #eef2fb 50%, #f0fdf8 100%)"
      borderRadius="2xl"
      border="1px solid #e4e9f5"
    >
      {/* Grille déco très discrète */}
      <Box
        position="absolute"
        inset="0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(7,31,214,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        pointerEvents="none"
      />

      {/* Icônes animées — 2 vagues */}
      {FLOW_LANES.map((lane, li) => (
        <Particle key={`a-${li}`} lane={lane} iconDef={flowIcons[li % flowIcons.length]} wave={0} />
      ))}
      {FLOW_LANES.map((lane, li) => (
        <Particle
          key={`b-${li}`}
          lane={{ yPct: lane.yPct + 4.5, delay: lane.delay + 0.6 }}
          iconDef={flowIcons[(li + 5) % flowIcons.length]}
          wave={1}
        />
      ))}

      {/* Dots supplémentaires */}
      {[
        { yPct: 8,  delay: 0.5,  color: "#23c55e" },
        { yPct: 26, delay: 1.3,  color: "#071FD6" },
        { yPct: 45, delay: 0.1,  color: "#23c55e" },
        { yPct: 63, delay: 1.7,  color: "#7c3aed" },
        { yPct: 80, delay: 0.8,  color: "#071FD6" },
        { yPct: 18, delay: 2.1,  color: "#059669" },
        { yPct: 55, delay: 0.3,  color: "#23c55e" },
        { yPct: 72, delay: 1.5,  color: "#071FD6" },
        { yPct: 90, delay: 0.9,  color: "#7c3aed" },
      ].map((d, i) => (
        <Dot key={i} {...d} />
      ))}

      {/* Logo Pisteur — cercle central */}
      <MotionBox
        position="absolute"
        right={{ base: "8%", md: "12%" }}
        top="50%"
        transform="translateY(-50%)"
        zIndex={3}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Halos concentriques */}
        {[80, 56, 32].map((offset, i) => (
          <MotionBox
            key={i}
            position="absolute"
            inset={`-${offset}px`}
            borderRadius="full"
            border={`1px solid rgba(${i === 0 ? "35,197,94" : "7,31,214"},.${i === 0 ? "12" : "08"})`}
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.97, 1.03, 0.97] }}
            transition={{ duration: 2.6 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            pointerEvents="none"
          />
        ))}

        {/* Cercle principal avec logo */}
        <Box
          w={{ base: "100px", md: "128px" }}
          h={{ base: "100px", md: "128px" }}
          borderRadius="full"
          bg="white"
          border="2px solid rgba(7,31,214,.12)"
          boxShadow="0 24px 64px rgba(7,31,214,.2), 0 6px 20px rgba(0,0,0,.08)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          zIndex={1}
          overflow="hidden"
        >
          {/* Anneau conic-gradient identique au screenshot */}
          <Box
            position="absolute"
            inset="0"
            borderRadius="full"
            style={{
              background: "conic-gradient(from 0deg, #071FD6, #23c55e, #071B63, #7c3aed, #071FD6)",
              opacity: 0.15,
            }}
          />
          <Box
            position="absolute"
            inset="3px"
            borderRadius="full"
            bg="white"
          />
          <Image
            src="/logo-pisteur-ai.webp"
            alt="Logo Pisteur"
            w="54%"
            h="54%"
            objectFit="contain"
            position="relative"
            zIndex={1}
          />
          {/* Point vert en bas à droite */}
          <Box
            position="absolute"
            bottom="10px"
            right="10px"
            w="12px"
            h="12px"
            borderRadius="full"
            bg="#23c55e"
            border="2px solid white"
            zIndex={2}
          />
        </Box>

        {/* Badge sous le cercle */}
        <Box textAlign="center" mt="3">
          <Box
            display="inline-flex"
            alignItems="center"
            gap="1.5"
            bg="rgba(7,27,99,.9)"
            color="white"
            borderRadius="full"
            px="3"
            py="1"
            backdropFilter="blur(8px)"
          >
            <MotionBox
              w="5px"
              h="5px"
              borderRadius="full"
              bg="#23c55e"
              flexShrink={0}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <Text fontSize="9px" fontWeight="700" letterSpacing="wide">
              IA Pisteur · Live
            </Text>
          </Box>
        </Box>
      </MotionBox>
    </Box>
  )
}

function McpChatCard() {
  const storageBase = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/Image%20du%20site/data-sources`

  return (
    <MotionBox
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      bg="white"
      border="1.5px solid #e4e9f3"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="0 20px 60px rgba(7,27,99,.1), 0 4px 16px rgba(0,0,0,.05)"
      w={{ base: "full", xl: "300px" }}
      flexShrink={0}
    >
      {/* ── Zone supérieure : badge + titre + logos ── */}
      <Box px="5" pt="5" pb="4">
        {/* Badge "Nouveautés" */}
        <Box
          display="inline-flex"
          alignItems="center"
          bg="#071B63"
          color="white"
          borderRadius="full"
          px="3"
          py="1"
          mb="3"
        >
          <Text fontSize="9px" fontWeight="800" letterSpacing=".08em">Nouveautés</Text>
        </Box>

        {/* Titre */}
        <Text
          fontSize="sm"
          fontWeight="800"
          color="#071B63"
          lineHeight="1.4"
          letterSpacing="-0.02em"
          mb="4"
        >
          Dialoguez directement avec MCP data.gouv.fr dans Pisteur
        </Text>

        {/* Logo data.gouv centré */}
        <Flex justifyContent="center" mb="3">
          <Image
            src={`${storageBase}/data-gouv-logo-source-donnees-publiques.webp`}
            alt="data.gouv.fr"
            h="9"
            maxW="130px"
            objectFit="contain"
          />
        </Flex>

        {/* Séparateur avec pill "MCP" */}
        <Flex alignItems="center" gap="2" mb="3">
          <Box flex="1" h="1px" bg="#e4e9f3" />
          <Box
            px="2.5"
            py="0.5"
            bg="#f0f3f9"
            borderRadius="full"
            border="1px solid #e4e9f3"
          >
            <Text fontSize="9px" fontWeight="800" color="#6b7280" letterSpacing=".06em">MCP</Text>
          </Box>
          <Box flex="1" h="1px" bg="#e4e9f3" />
        </Flex>

        {/* "Le serveur MCP de data.gouv.fr" */}
        <HStack gap="2">
          <Box color="#9aaabb" flexShrink={0}>
            <LuLink size={13} />
          </Box>
          <Text fontSize="xs" fontWeight="600" color="#374151" lineHeight="1.3">
            Le serveur MCP de data.gouv.fr
          </Text>
        </HStack>
      </Box>

      {/* Séparateur horizontal */}
      <Box h="1px" bg="#f0f3f9" />

      {/* ── Zone chat ── */}
      <VStack gap="3" p="4" alignItems="stretch">

        {/* Message utilisateur */}
        <Box>
          <HStack justifyContent="space-between" mb="1.5" px="1">
            <Text fontSize="9px" fontWeight="700" color="#374151">Vous</Text>
            <Text fontSize="9px" color="#9aaabb">09:41</Text>
          </HStack>
          <Box
            bg="white"
            border="1px solid #e4e9f3"
            borderRadius="xl"
            px="3"
            py="2.5"
            boxShadow="0 2px 8px rgba(0,0,0,.04)"
          >
            <Text fontSize="xs" color="#374151" lineHeight="1.6">
              Donne-moi la consommation d'énergie moyenne des bâtiments tertiaires de plus de 1 000 m² en France.
            </Text>
          </Box>
        </Box>

        {/* Réponse MCP */}
        <Box>
          <HStack justifyContent="space-between" mb="1.5" px="1">
            <Text fontSize="9px" fontWeight="700" color="#071FD6">MCP data.gouv.fr</Text>
            <Text fontSize="9px" color="#9aaabb">09:41</Text>
          </HStack>
          <Box>
            <Text fontSize="xs" color="#374151" lineHeight="1.6" mb="2" px="1">
              Voici les données 2024 issues de la source officielle :
            </Text>
            {/* Fichier attaché */}
            <HStack
              bg="#f8faff"
              border="1px solid #e4e9f3"
              borderRadius="lg"
              px="3"
              py="2.5"
              gap="2.5"
            >
              <Box
                w="7"
                h="7"
                bg="white"
                borderRadius="md"
                border="1px solid #e4e9f3"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <LuFileText size={13} color="#374151" />
              </Box>
              <Box flex="1" minW="0">
                <Text fontSize="9px" fontWeight="700" color="#071B63" noOfLines={1}>
                  consommation_tertiaire_2024.csv
                </Text>
                <Text fontSize="9px" color="#9aaabb">12,4 Ko</Text>
              </Box>
              <Box
                w="6"
                h="6"
                borderRadius="md"
                bg="#071FD6"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <LuSend size={10} color="white" />
              </Box>
            </HStack>
          </Box>
        </Box>
      </VStack>

      {/* ── Input ── */}
      <Box px="4" pb="3">
        <HStack
          bg="#f8faff"
          border="1px solid #e4e9f3"
          borderRadius="xl"
          px="3.5"
          py="2.5"
          gap="2"
        >
          <Text fontSize="xs" color="#b0b8c8" flex="1">Posez votre question...</Text>
          <Box
            w="7"
            h="7"
            bg="#071FD6"
            color="white"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <LuSend size={11} />
          </Box>
        </HStack>
      </Box>

      {/* ── Footer ── */}
      <Box px="5" pb="4">
        <HStack gap="1.5" justifyContent="center">
          <LuCheck size={10} color="#059669" />
          <Text fontSize="9px" color="#9aaabb" textAlign="center" lineHeight="1.5">
            Sources officielles · Données sécurisées<br />Conformes aux standards de l'État
          </Text>
        </HStack>
      </Box>
    </MotionBox>
  )
}

function SourceList() {
  return (
    <MotionBox
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {/* Badge mise à jour */}
      <HStack
        display="inline-flex"
        px="3"
        py="1.5"
        bg="#EAFBF0"
        color="#009B3A"
        borderRadius="full"
        gap="2"
        mb="5"
      >
        <LuRefreshCw size={12} />
        <Text fontSize="10px" fontWeight="800" letterSpacing=".06em">
          DONNÉES MISES À JOUR EN JUIN 2026
        </Text>
      </HStack>

      {/* Titre */}
      <Text
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="900"
        color="#071B63"
        letterSpacing="-0.04em"
        lineHeight="1.1"
        mb="3"
      >
        Une base construite sur les meilleures sources françaises
      </Text>
      <Text fontSize="sm" color="#5D6988" lineHeight="1.75" mb="6" maxW="380px">
        Pisteur agrège, normalise et enrichit des dizaines de sources officielles et privées pour créer la base la plus complète sur le parc immobilier français.
      </Text>

      {/* Liste des sources */}
      <VStack gap="5" alignItems="stretch">
        {sourceGroups.map((group, gi) => {
          const GIcon = group.icon
          return (
            <Box key={group.title}>
              {/* Titre de groupe */}
              <HStack gap="2" mb="2">
                <Box
                  w="6"
                  h="6"
                  borderRadius="md"
                  bg={group.bg}
                  color={group.accent}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <GIcon size={13} />
                </Box>
                <Text fontSize="xs" fontWeight="800" color={group.accent}>
                  {group.title}
                </Text>
              </HStack>

              {/* Sources */}
              <VStack gap="0" alignItems="stretch" pl="0">
                {group.sources.map((source, si) => {
                  const isExternal = source.href.startsWith("http")
                  return (
                    <Box
                      as="a"
                      key={source.name}
                      href={source.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      px="3"
                      py="2"
                      borderRadius="lg"
                      borderBottom={si < group.sources.length - 1 ? "1px solid #f0f3f9" : "none"}
                      color="#374151"
                      textDecoration="none"
                      transition="all .12s"
                      _hover={{ bg: group.bg, color: group.accent, pl: "4" }}
                    >
                      <Text fontSize="sm" fontWeight="500">{source.name}</Text>
                      {isExternal && (
                        <Box color="#d1d5db" flexShrink={0}>
                          <LuExternalLink size={12} />
                        </Box>
                      )}
                    </Box>
                  )
                })}
              </VStack>
            </Box>
          )
        })}
      </VStack>
    </MotionBox>
  )
}

export function DataInfra() {
  return (
    <Box py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="white" overflow="hidden">
      <Box maxW="7xl" mx="auto">

        {/* Layout 3 colonnes */}
        <Grid
          templateColumns={{ base: "1fr", xl: "minmax(280px, 1fr) minmax(300px, 1.2fr) minmax(280px, 0.9fr)" }}
          gap={{ base: "12", xl: "10" }}
          alignItems="center"
        >
          {/* Col 1 : liste des sources */}
          <SourceList />

          {/* Col 2 : animation flux d'icônes → logo */}
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <DataFlowVisual />
          </MotionBox>

          {/* Col 3 : carte MCP chat */}
          <McpChatCard />
        </Grid>

        {/* Footer RGPD */}
        <HStack mt="10" justifyContent="center" alignItems="flex-start" gap="2" color="#6A7694">
          <Box mt="0.5"><LuShieldCheck size={15} /></Box>
          <Text fontSize="xs" textAlign="center" maxW="3xl">
            Les contacts sont enrichis uniquement à la demande. Aucune donnée personnelle n'est stockée sans base légale conforme au RGPD.
          </Text>
        </HStack>
      </Box>
    </Box>
  )
}
