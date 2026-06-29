import { useEffect, useState } from "react"
import { Box, Flex, Grid, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import {
  LuBuilding2,
  LuCheck,
  LuDatabase,
  LuExternalLink,
  LuFileText,
  LuLink,
  LuMail,
  LuMapPin,
  LuPhone,
  LuRefreshCw,
  LuSearch,
  LuSend,
  LuShieldCheck,
  LuSparkles,
  LuTrendingUp,
  LuUsers,
} from "react-icons/lu"

const MotionBox = motion.create(Box)

const aiPhases = ["logo", "search", "success"] as const

function PisteurAiLogo() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = aiPhases[phaseIndex]

  useEffect(() => {
    const timer = window.setTimeout(
      () => setPhaseIndex((current) => (current + 1) % aiPhases.length),
      phase === "search" ? 2200 : phase === "success" ? 1500 : 2600,
    )
    return () => window.clearTimeout(timer)
  }, [phase])

  return (
    <MotionBox
      w={{ base: "88px", md: "110px", xl: "132px" }}
      h={{ base: "88px", md: "110px", xl: "132px" }}
      borderRadius="full"
      position="relative"
      p="3px"
      animate={{ scale: phase === "success" ? [1, 1.08, 1] : [1, 1.02, 1] }}
      transition={{ duration: phase === "success" ? 0.55 : 2.4, ease: "easeInOut" }}
    >
      <MotionBox
        position="absolute"
        inset="0"
        borderRadius="full"
        bg="conic-gradient(from 0deg, #071FD6, #6945ff, #00d978, #50f2b0, #071FD6)"
        animate={{ rotate: 360 }}
        transition={{ duration: phase === "search" ? 1.25 : 3.5, repeat: Infinity, ease: "linear" }}
        boxShadow={phase === "success"
          ? "0 0 34px rgba(0,217,120,.42)"
          : "0 0 28px rgba(61,72,255,.26)"}
      />
      <Box
        position="relative"
        w="full"
        h="full"
        borderRadius="full"
        bg="white"
        border="1px solid rgba(7,31,214,.06)"
        boxShadow="0 18px 48px rgba(7,31,214,.13), 0 4px 16px rgba(0,0,0,.05)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          {phase === "logo" && (
            <MotionBox
              key="logo"
              position="absolute"
              inset="0"
              display="flex"
              alignItems="center"
              justifyContent="center"
              initial={{ opacity: 0, scale: 0.72, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.82, filter: "blur(4px)" }}
              transition={{ duration: 0.45 }}
            >
              <Image src="/logo-pisteur-ai.webp" alt="Logo Pisteur" w="58%" h="58%" objectFit="contain" />
            </MotionBox>
          )}

          {phase === "search" && (
            <MotionBox
              key="search"
              position="absolute"
              inset="0"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap="1"
              color="#071FD6"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.35 }}
            >
              <MotionBox
                animate={{ x: [-5, 5, -5], y: [-2, 2, -2], rotate: [-8, 8, -8] }}
                transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
              >
                <LuSearch size={30} strokeWidth={2.2} />
              </MotionBox>
              <Text fontSize={{ base: "7px", md: "8px" }} fontWeight="800" letterSpacing=".08em">
                RECHERCHE IA
              </Text>
            </MotionBox>
          )}

          {phase === "success" && (
            <MotionBox
              key="success"
              position="absolute"
              inset="0"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap="1"
              color="#00B864"
              initial={{ opacity: 0, scale: 0.45, rotate: -18 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ type: "spring", stiffness: 260, damping: 17 }}
            >
              <LuCheck size={36} strokeWidth={3} />
              <Text fontSize={{ base: "7px", md: "8px" }} fontWeight="900" letterSpacing=".06em">
                LEAD VALIDÉ
              </Text>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </MotionBox>
  )
}

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

function DataFlowVisual() {
  return (
    <Box
      position="relative"
      h={{ base: "300px", md: "440px", xl: "560px" }}
      w="full"
      minW="0"
      overflow="hidden"
      isolation="isolate"
    >
      <Box
        position="absolute"
        top="0"
        left="67%"
        h="full"
        aspectRatio="1.536 / 1"
        transform="translateX(-67%)"
      >
        <Image
          src="/pisteur-data-flow.png"
          alt="Flux des données françaises vers la base Pisteur"
          position="absolute"
          inset="0"
          w="full"
          h="full"
          objectFit="fill"
          pointerEvents="none"
        />

        {/* Logo ancré au centre exact du cercle de l'illustration */}
        <Box
          position="absolute"
          left="73.3%"
          top="50%"
          transform="translate(-50%, -50%)"
          zIndex={3}
        >
          <PisteurAiLogo />
        </Box>
      </Box>
    </Box>
  )
}

const leadSteps = [
  { label: "Détection", detail: "Signal bâtiment identifié" },
  { label: "Enrichissement", detail: "Entreprise et décideur trouvés" },
  { label: "Lead qualifié", detail: "Score commercial calculé" },
]

function AutomaticLeadCard() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => setStep((current) => (current + 1) % leadSteps.length), step === 2 ? 3600 : 1800)
    return () => window.clearTimeout(timer)
  }, [step])

  return (
    <MotionBox
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65 }}
      bg="#071B63"
      borderRadius="2xl"
      p="1px"
      boxShadow="0 24px 70px rgba(7,27,99,.2)"
      overflow="hidden"
      w="full"
      maxW={{ base: "full", xl: "330px" }}
      justifySelf="end"
    >
      <Box bg="#F8FAFF" borderRadius="calc(1rem - 1px)" overflow="hidden">
        <Flex px="4" py="3.5" bg="white" borderBottom="1px solid #E7ECF6" alignItems="center" justifyContent="space-between">
          <HStack gap="2.5">
            <Box w="8" h="8" borderRadius="lg" bg="#071FD6" display="flex" alignItems="center" justifyContent="center">
              <Image src="/logo-pisteur-ai.webp" alt="Pisteur" w="5" h="5" objectFit="contain" filter="brightness(0) invert(1)" />
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight="900" color="#071B63">Générateur de leads</Text>
              <Text fontSize="9px" color="#7A86A3">Propulsé par l’IA Pisteur</Text>
            </Box>
          </HStack>
          <HStack gap="1" bg="#EAFBF0" color="#009B58" px="2" py="1" borderRadius="full">
            <MotionBox w="5px" h="5px" bg="#00C96B" borderRadius="full" animate={{ opacity: [1, .25, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            <Text fontSize="8px" fontWeight="900">LIVE</Text>
          </HStack>
        </Flex>

        <Box px="4" pt="4" pb="3">
          <HStack gap="1.5" mb="3">
            {leadSteps.map((item, index) => (
              <Box key={item.label} flex="1">
                <MotionBox
                  h="3px"
                  borderRadius="full"
                  bg={index <= step ? (step === 2 ? "#00C96B" : "#3047FF") : "#DCE3F0"}
                  initial={false}
                  animate={{ opacity: index <= step ? 1 : .55 }}
                />
              </Box>
            ))}
          </HStack>
          <HStack gap="2" color={step === 2 ? "#009B58" : "#071FD6"}>
            <MotionBox animate={{ rotate: step < 2 ? 360 : 0 }} transition={{ duration: 1.4, repeat: step < 2 ? Infinity : 0, ease: "linear" }}>
              {step === 2 ? <LuCheck size={14} strokeWidth={3} /> : <LuSparkles size={14} />}
            </MotionBox>
            <Box>
              <Text fontSize="10px" fontWeight="900">{leadSteps[step].label}</Text>
              <Text fontSize="9px" color="#7A86A3">{leadSteps[step].detail}</Text>
            </Box>
          </HStack>
        </Box>

        <AnimatePresence mode="wait">
          <MotionBox
            key={step}
            mx="3"
            mb="3"
            bg="white"
            border="1px solid #E4E9F3"
            borderRadius="xl"
            overflow="hidden"
            initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: .38 }}
          >
            <Flex p="3.5" alignItems="flex-start" justifyContent="space-between" borderBottom="1px solid #EEF1F7">
              <HStack gap="3" alignItems="flex-start">
                <Box w="10" h="10" borderRadius="xl" bg="#EEF1FF" color="#071FD6" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                  <LuBuilding2 size={19} />
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="900" color="#071B63">Résidence Les Jardins</Text>
                  <Text fontSize="9px" color="#7A86A3">Copropriété · Lyon 6e</Text>
                  <HStack mt="1.5" gap="1" color="#596785"><LuMapPin size={9} /><Text fontSize="8px">24 rue Duquesne, 69006</Text></HStack>
                </Box>
              </HStack>
              <Box textAlign="center" bg="#EAFBF0" borderRadius="lg" px="2.5" py="1.5">
                <Text fontSize="lg" lineHeight="1" fontWeight="900" color="#009B58">94</Text>
                <Text fontSize="7px" fontWeight="800" color="#009B58">SCORE</Text>
              </Box>
            </Flex>

            <Grid templateColumns="repeat(3, 1fr)" gap="1" p="3">
              {[
                ["2 480 m²", "Surface"], ["D", "DPE"], ["1974", "Construction"],
              ].map(([value, label]) => (
                <Box key={label} bg="#F7F9FD" borderRadius="lg" py="2" textAlign="center">
                  <Text fontSize="10px" fontWeight="900" color="#071B63">{value}</Text>
                  <Text fontSize="7px" color="#8A94AC">{label}</Text>
                </Box>
              ))}
            </Grid>

            <Box px="3" pb="3">
              <Text fontSize="8px" fontWeight="900" color="#7A86A3" mb="2" letterSpacing=".08em">SIGNAL DÉTECTÉ</Text>
              <HStack bg="#FFF8E8" color="#9A6500" border="1px solid #F7E3AD" borderRadius="lg" px="2.5" py="2" gap="2">
                <LuTrendingUp size={13} />
                <Text fontSize="9px" fontWeight="700">Rénovation énergétique prioritaire</Text>
              </HStack>
            </Box>

            <Box px="3" pb="3">
              <Text fontSize="8px" fontWeight="900" color="#7A86A3" mb="2" letterSpacing=".08em">DÉCIDEUR ENRICHI</Text>
              <HStack bg="#F3F5FF" borderRadius="lg" px="2.5" py="2.5" justifyContent="space-between">
                <Box>
                  <Text fontSize="10px" fontWeight="900" color="#071B63">Sophie Martin</Text>
                  <Text fontSize="8px" color="#7A86A3">Présidente du conseil syndical</Text>
                </Box>
                <HStack gap="1.5">
                  <Box w="6" h="6" borderRadius="md" bg="white" color="#071FD6" display="flex" alignItems="center" justifyContent="center"><LuMail size={11} /></Box>
                  <Box w="6" h="6" borderRadius="md" bg="#071FD6" color="white" display="flex" alignItems="center" justifyContent="center"><LuPhone size={11} /></Box>
                </HStack>
              </HStack>
            </Box>
          </MotionBox>
        </AnimatePresence>

        <HStack px="4" pb="4" color="#009B58" gap="1.5"><LuShieldCheck size={11} /><Text fontSize="8px" fontWeight="700">Données vérifiées · Contact conforme RGPD</Text></HStack>
      </Box>
    </MotionBox>
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
      w="full"
      maxW="380px"
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
        {sourceGroups.map((group) => {
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

          {/* Col 3 : génération automatique de lead */}
          <AutomaticLeadCard />
        </Grid>

        {/* Section MCP data.gouv.fr */}
        <Grid
          mt={{ base: "20", md: "28" }}
          p={{ base: "6", md: "10", xl: "12" }}
          templateColumns={{ base: "1fr", lg: "minmax(0, 1.15fr) minmax(320px, .85fr)" }}
          gap={{ base: "10", lg: "16" }}
          alignItems="center"
          bg="#F7F9FF"
          border="1px solid #E3E8F5"
          borderRadius={{ base: "2xl", md: "3xl" }}
          position="relative"
          overflow="hidden"
        >
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .25 }}
            transition={{ duration: .6 }}
            position="relative"
            zIndex={1}
          >
            <HStack gap="3" mb="6">
              <Box bg="white" border="1px solid #E1E7F3" borderRadius="xl" px="4" py="3" boxShadow="0 8px 24px rgba(7,27,99,.06)">
                <Image
                  src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/Image%20du%20site/data-sources/data-gouv-logo-source-donnees-publiques.webp`}
                  alt="Logo officiel data.gouv.fr"
                  h="8"
                  maxW="140px"
                  objectFit="contain"
                />
              </Box>
              <Box px="3" py="1.5" bg="#071FD6" color="white" borderRadius="full">
                <Text fontSize="9px" fontWeight="900" letterSpacing=".08em">MCP OFFICIEL</Text>
              </Box>
            </HStack>

            <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="900" color="#071B63" lineHeight="1.05" letterSpacing="-.04em" maxW="620px">
              Interrogez les données publiques françaises directement dans Pisteur
            </Text>
            <Text mt="4" fontSize={{ base: "sm", md: "md" }} color="#5D6988" lineHeight="1.75" maxW="620px">
              Le protocole MCP connecte l’IA Pisteur au serveur officiel de data.gouv.fr. Une question en langage naturel suffit pour rechercher, croiser et restituer des données publiques à jour, avec leur source et leur fichier d’origine.
            </Text>

            <Grid mt="7" templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap="3">
              {[
                { icon: LuSearch, title: "Question naturelle", text: "Décrivez simplement la donnée recherchée." },
                { icon: LuLink, title: "Connexion officielle", text: "Pisteur dialogue avec le serveur MCP de l’État." },
                { icon: LuFileText, title: "Résultat traçable", text: "Chaque réponse conserve sa source officielle." },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Box key={item.title} bg="white" border="1px solid #E3E8F3" borderRadius="xl" p="4">
                    <Box w="8" h="8" borderRadius="lg" bg="#EEF1FF" color="#071FD6" display="flex" alignItems="center" justifyContent="center" mb="3"><Icon size={15} /></Box>
                    <Text fontSize="10px" fontWeight="900" color="#071B63" mb="1">{item.title}</Text>
                    <Text fontSize="9px" color="#7A86A3" lineHeight="1.55">{item.text}</Text>
                  </Box>
                )
              })}
            </Grid>

            <HStack mt="6" gap="2" color="#009B58"><LuShieldCheck size={15} /><Text fontSize="xs" fontWeight="700">Sources officielles · Données sécurisées · Réponses traçables</Text></HStack>
          </MotionBox>

          <Flex justifyContent={{ base: "center", lg: "flex-end" }} position="relative" zIndex={1}>
            <McpChatCard />
          </Flex>
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
