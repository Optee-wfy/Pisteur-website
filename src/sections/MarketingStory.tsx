import { Box, Button, Flex, Grid, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import { motion } from "framer-motion"
import { FaLinkedinIn } from "react-icons/fa"
import { LuArrowRight, LuBadgeCheck, LuBuilding2, LuCheck, LuDatabase, LuFactory, LuFileDigit, LuFlame, LuHouse, LuMail, LuMapPin, LuMousePointerClick, LuPhone, LuSend, LuTarget, LuZap } from "react-icons/lu"
import { Link } from "react-router-dom"

const MotionBox = motion.create(Box)
const AUTH_URL = "https://app.optee.io/auth"

const steps = [
  { icon: LuTarget, n: "1", title: "Définissez votre cible", text: "Métiers, zones géographiques, types de bâtiments, effectifs, consommation, DPE et certifications." },
  { icon: LuDatabase, n: "2", title: "Pisteur analyse des millions de signaux", text: "Données énergétiques, permis, appels d’offres, annonces légales, recrutements et financements." },
  { icon: LuSend, n: "3", title: "Recevez votre liste de prospects prête à démarcher", text: "Contacts décideurs vérifiés, coordonnées directes, contexte et score de pertinence." },
]

const signals = [
  "Permis de construire & déclarations préalables",
  "Appels d’offres & marchés publics",
  "Annonces légales & créations d’entreprises",
  "Recrutements & croissance des équipes",
  "Chantiers en cours & livraisons",
  "Financements & aides mobilisées",
]

const metrics = [
  ["+12M", "signaux de marché", "analysés chaque mois"],
  ["+280K", "entreprises du bâtiment", "référencées en France"],
  ["+40", "sources de données", "fiables et exclusives"],
  ["95%", "de mails délivrés", "en moyenne"],
]

const orbit = keyframes`
  to { transform: rotate(360deg); }
`

const signalIcons = [LuHouse, LuBuilding2, LuFactory, LuFileDigit, LuZap, LuBadgeCheck, LuDatabase]

function AnimatedSignalFlow() {
  return (
    <Box position="relative" minH={{ base: "300px", md: "420px" }} overflow="hidden" aria-label="Les signaux marché sont analysés par l'intelligence Pisteur">
      <Image src="/pisteur-data-flow.png" alt="" position="absolute" inset="0" w="full" h="full" objectFit="cover" objectPosition="center" opacity=".42" />
      {Array.from({ length: 18 }).map((_, i) => {
        const Icon = signalIcons[i % signalIcons.length]
        const top = 7 + ((i * 17) % 82)
        const left = 2 + ((i * 11) % 35)
        return (
          <MotionBox
            key={i}
            position="absolute"
            top={`${top}%`}
            left={`${left}%`}
            color={i % 3 === 0 ? "#071FD6" : "#7180A8"}
            initial={{ opacity: 0, x: -12, scale: .7 }}
            animate={{ opacity: [0, .9, .9, 0], x: [0, 30, 95, 170], y: [0, (i % 2 ? 8 : -8), 0, 50 - top], scale: [.7, 1, .75, .35] }}
            transition={{ duration: 5.5 + (i % 4), delay: (i % 9) * .55, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon size={i % 4 === 0 ? 18 : 13} />
          </MotionBox>
        )
      })}

      <Box
        position="absolute"
        left="82%"
        top="calc(50% + 0.4cm)"
        transform="translate(-50%, -50%)"
      >
      <VStack gap="3" textAlign="center" userSelect="none">
        <Box position="relative" w={{ base: "94px", md: "124px" }} h={{ base: "94px", md: "124px" }}>
          <Box position="absolute" inset="0" borderRadius="full" bg="conic-gradient(from 0deg, #071FD6, #00E653, #071B63, #071FD6)" animation={`${orbit} 3.5s linear infinite`} />
          <Box position="absolute" inset="3px" borderRadius="full" bg="white" />
          <Box position="absolute" inset={{ base: "12px", md: "15px" }} borderRadius="full" bg="white" boxShadow="0 10px 34px rgba(7,31,214,.12)" overflow="hidden" display="flex" alignItems="center" justifyContent="center">
            <Image src="/logo-pisteur-ai.webp" alt="Logo Pisteur AI" w="72%" h="72%" objectFit="contain" />
          </Box>
        </Box>
        <Text fontSize="xs" fontWeight="bold" color="#071B63" lineHeight="1.25">IA & règles métier<br />Pisteur</Text>
      </VStack>
      </Box>

    </Box>
  )
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <MotionBox initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .55, delay }}>{children}</MotionBox>
}

export function MarketingStory() {
  return (
    <>
      <Box py={{ base: "20", md: "28" }} px={{ base: "4", md: "6" }} bg="#F7FAFF">
        <Box maxW="7xl" mx="auto">
          <VStack textAlign="center" gap="3" mb="16"><Text color="#00b842" fontSize="sm" fontWeight="bold">EN 3 ÉTAPES</Text><Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="800" letterSpacing="-.045em" color="#071B63">Des prospects qualifiés.<br />Instantanément.</Text></VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "12", md: "14" }}>
            {steps.map(({ icon: Icon, n, title, text }, i) => <Reveal key={n} delay={i * .1}><VStack alignItems="flex-start" gap="5"><Flex w="full" alignItems="center" gap="4"><Box w="16" h="16" borderRadius="full" bg="white" border="1px solid #E5EAF5" color="#071B63" display="flex" alignItems="center" justifyContent="center"><Icon size={26} /></Box><Box h="1px" flex="1" bg="#D9E1F2" display={{ base: "none", md: i < 2 ? "block" : "none" }} /></Flex><HStack alignItems="flex-start" gap="3"><Box flexShrink="0" w="6" h="6" borderRadius="full" bg="#00c94c" color="white" display="flex" alignItems="center" justifyContent="center" fontSize="xs" fontWeight="bold">{n}</Box><Box><Text fontSize="md" fontWeight="bold" color="#071B63">{title}</Text><Text mt="3" fontSize="sm" color="#4B587C" lineHeight="1.7">{text}</Text></Box></HStack></VStack></Reveal>)}
          </SimpleGrid>
        </Box>
      </Box>

      <Box py={{ base: "20", md: "28" }} px={{ base: "4", md: "6" }} bg="white">
        <Box maxW="7xl" mx="auto">
          <Grid
            templateColumns={{ base: "1fr", lg: "minmax(250px, .9fr) minmax(360px, 1.3fr) minmax(300px, 1fr)" }}
            gap={{ base: "12", lg: "6", xl: "8" }}
            alignItems="center"
          >
            <Reveal>
              <VStack alignItems="flex-start" gap="5">
                <Text color="#00b842" fontSize="xs" fontWeight="bold" letterSpacing="wide">DE LA DONNÉE BRUTE AU BON DÉCIDEUR</Text>
                <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="800" letterSpacing="-.04em" lineHeight="1.02" color="#071B63">Des millions de signaux<br />pour ne garder que<br />l’essentiel.</Text>
                <Text fontSize="sm" color="#4B587C" lineHeight="1.75">Pisteur agrège et analyse en continu des sources fiables pour identifier les entreprises qui réalisent des travaux et qui ont besoin de vos solutions.</Text>
                <VStack alignItems="stretch" gap="3" pt="2">{signals.map((signal) => <HStack key={signal} gap="2.5" alignItems="flex-start"><Box color="#00c94c" pt="0.5"><LuCheck size={15} /></Box><Text fontSize="sm" color="#071B63">{signal}</Text></HStack>)}</VStack>
              </VStack>
            </Reveal>

            <Reveal delay={.08}><AnimatedSignalFlow /></Reveal>

            <Reveal delay={.14}>
              <Box bg="white" border="1px solid #E5EAF5" borderRadius="xl" boxShadow="0 12px 36px rgba(7,27,99,.07)" overflow="hidden">
                <MotionBox initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .6 }} transition={{ duration: .38, delay: .2, ease: "easeOut" }}>
                  <Flex px="5" py="4" alignItems="center" justifyContent="space-between" borderBottom="1px solid #DFF7E8" bg="#F3FFF7"><Box><HStack gap="2"><Box w="6" h="6" borderRadius="full" bg="#00c94c" color="white" display="flex" alignItems="center" justifyContent="center"><LuCheck size={14} /></Box><Text fontSize="sm" fontWeight="800" color="#071B63">Prospect qualifié</Text></HStack><Text mt="1.5" fontSize="2xs" color="#4B587C">Prêt à être transmis à votre équipe commerciale</Text></Box><Box px="2.5" py="1.5" borderRadius="full" bg="#DDFBE8" color="#008F35" fontSize="xs" fontWeight="800">Score 96/100</Box></Flex>
                </MotionBox>
                <VStack alignItems="stretch" gap="0" px="5" py="2">
                  {[
                    { icon: LuBuilding2, label: "Bâtiment", value: "Résidence Les Terrasses" },
                    { icon: LuMapPin, label: "Adresse", value: "24 rue des Lilas, 69003 Lyon" },
                    { icon: LuFlame, label: "Mode de chauffage", value: "Gaz collectif" },
                    { icon: LuZap, label: "Consommation énergétique", value: "1 840 MWh/an" },
                    { icon: LuBuilding2, label: "Entreprise gestionnaire", value: "ÉcoGestion Rhône" },
                  ].map(({ icon: Icon, label, value }, i) => <MotionBox key={label} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .7 }} transition={{ duration: .36, delay: .52 + i * .16, ease: "easeOut" }}><Flex py="3" gap="3" alignItems="center" borderBottom="1px solid #EEF2F8"><Box w="7" h="7" borderRadius="md" bg="#F2F5FF" color="#071FD6" display="flex" alignItems="center" justifyContent="center" flexShrink="0"><Icon size={13} /></Box><Box flex="1"><Text fontSize="2xs" color="#7B86A3">{label}</Text><Text mt="0.5" fontSize="xs" fontWeight="semibold" color="#071B63">{value}</Text></Box><MotionBox color="#00c94c" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: .2, delay: .76 + i * .16 }}><LuCheck size={15} /></MotionBox></Flex></MotionBox>)}
                  <MotionBox initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: .38, delay: 1.38, ease: "easeOut" }}><Box py="4"><HStack mb="3" justifyContent="space-between"><Text fontSize="2xs" fontWeight="bold" color="#00a83d">DÉCIDEUR IDENTIFIÉ</Text><HStack gap="1" color="#00c94c"><Text fontSize="2xs">Coordonnées vérifiées</Text><LuCheck size={13} /></HStack></HStack><Flex alignItems="center" gap="3"><Box w="9" h="9" borderRadius="full" bg="#071B63" color="white" display="flex" alignItems="center" justifyContent="center" fontSize="2xs" fontWeight="bold">JM</Box><Box flex="1"><Text fontSize="xs" fontWeight="bold" color="#071B63">Julien Morel</Text><Text fontSize="2xs" color="#7B86A3">Dirigeant</Text></Box></Flex><VStack mt="3" alignItems="stretch" gap="2"><HStack gap="2" color="#4B587C"><LuMail size={12} /><Text fontSize="2xs">julien.morel@ecogestion.fr</Text></HStack><HStack gap="2" color="#4B587C"><LuPhone size={12} /><Text fontSize="2xs">06 12 34 56 78</Text></HStack><HStack gap="2" color="#0A66C2"><FaLinkedinIn size={12} /><Text fontSize="2xs">linkedin.com/in/julien-morel</Text></HStack></VStack></Box></MotionBox>
                  <MotionBox mx="-5" px="5" py="3.5" bg="#F3FFF7" borderTop="1px solid #DFF7E8" initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .8 }} transition={{ duration: .38, delay: 1.7, ease: "easeOut" }}><Flex alignItems="center" justifyContent="space-between"><HStack gap="2"><Box w="5" h="5" borderRadius="full" bg="#00c94c" color="white" display="flex" alignItems="center" justifyContent="center"><LuCheck size={12} /></Box><Text fontSize="2xs" fontWeight="bold" color="#008F35">Transmission automatique par email</Text></HStack><Box color="#071FD6"><LuSend size={16} /></Box></Flex></MotionBox>
                </VStack>
              </Box>
            </Reveal>
          </Grid>

          <SimpleGrid columns={{ base: 2, md: 4 }} mt={{ base: "16", md: "20" }} borderTop="1px solid #E5EAF5" borderBottom="1px solid #E5EAF5">
            {metrics.map(([value, line1, line2], i) => <VStack key={value} py={{ base: "7", md: "9" }} px="3" gap="1" textAlign="center" borderRight={{ base: i % 2 === 0 ? "1px solid #E5EAF5" : "0", md: i < 3 ? "1px solid #E5EAF5" : "0" }} borderBottom={{ base: i < 2 ? "1px solid #E5EAF5" : "0", md: "0" }}><Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="800" color="#00c94c" letterSpacing="-.04em">{value}</Text><Text fontSize="xs" color="#071B63">{line1}</Text><Text fontSize="xs" color="#071B63">{line2}</Text></VStack>)}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  )
}

export function FinalCTA() {
  return <Box px={{ base: "4", md: "6" }} py={{ base: "16", md: "24" }} bg="white"><VStack maxW="7xl" mx="auto" bg="#071B63" color="white" borderRadius={{ base: "2xl", md: "3xl" }} px={{ base: "6", md: "16" }} py={{ base: "14", md: "20" }} textAlign="center" gap="6"><Box color="#00E653"><LuMousePointerClick size={38} /></Box><Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="800" letterSpacing="-.045em" lineHeight="1.05">Prêt à trouver vos<br />prochains clients ?</Text><Text fontSize={{ base: "md", md: "lg" }} color="whiteAlpha.700" maxW="2xl">Courtage en énergie, rénovation, équipements ou services : décrivez votre activité et Pisteur transforme votre marché en prospects qualifiés.</Text><HStack gap="3" flexWrap="wrap" justifyContent="center"><Button size="lg" bg="#00c94c" color="white" borderRadius="lg" px="8" _hover={{ bg: "#00ad41", transform: "translateY(-2px)" }} asChild><a href={AUTH_URL}>Générer ma première liste <LuArrowRight /></a></Button><Button size="lg" variant="ghost" color="white" _hover={{ bg: "whiteAlpha.200" }} asChild><Link to="/demo">Demander une démo</Link></Button></HStack></VStack></Box>
}
