import { Box, Button, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import {
  LuArrowRight,
  LuBadgeCheck,
  LuBuilding2,
  LuClipboardList,
  LuFactory,
  LuFlame,
  LuLandmark,
  LuMapPin,
  LuSun,
  LuUser,
  LuZap,
} from "react-icons/lu"
import { Link } from "react-router-dom"
import { PageHero } from "@/components/PageHero"
import { SEO } from "@/components/SEO"
import { Testimonials } from "@/sections/Testimonials"
import { FAQ } from "@/sections/FAQ"
import type { IconType } from "react-icons"

const MotionBox = motion.create(Box)

type Sector = {
  label: string
  sub: string
  href: string
  icon: IconType
  color: string
  bg: string
  border: string
  tagline: string
  description: string
  highlights: { icon: IconType; label: string; detail: string }[]
  mock: {
    signal: string
    company: string
    location: string
    size: string
    contact: string
    role: string
    score: number
    tags: string[]
    extra: string
  }
}

const sectors: Sector[] = [
  {
    label: "Courtage en énergie",
    sub: "CEE · Fourniture · Optimisation facture",
    href: "/courtage-energie",
    icon: LuZap,
    color: "#071FD6",
    bg: "#eef0fd",
    border: "#c7cef8",
    tagline: "Ciblez les gros consommateurs et obtenez le décideur en un clic.",
    description:
      "Pisteur analyse la consommation énergétique réelle de chaque bâtiment et la relie directement à son décideur : numéro de portable, adresse mail et profil LinkedIn vérifiés. Filtrez par niveau de consommation, identifiez les entreprises les plus gourmandes en énergie, et contactez la bonne personne instantanément — sans recherche manuelle.",
    highlights: [
      { icon: LuZap, label: "Ciblage par consommation réelle", detail: "Filtrez les bâtiments selon leur conso. en MWh" },
      { icon: LuUser, label: "Décideur livré instantanément", detail: "Mobile, e-mail et LinkedIn vérifiés" },
      { icon: LuBadgeCheck, label: "Bâtiment → décideur en 1 clic", detail: "Le lien bâtiment–contact, automatisé" },
    ],
    mock: {
      signal: "Consommation énergétique élevée détectée",
      company: "Leroy Industries SAS",
      location: "Amiens · Hauts-de-France",
      size: "PME · 78 salariés",
      contact: "Thomas Leblanc",
      role: "Directeur Général",
      score: 94,
      tags: ["Conso. 340 MWh/an", "DPE : C", "Mobile + Mail + LinkedIn"],
      extra: "📞 06 12 ··· ···  ·  ✉ t.leblanc@leroy-ind.fr  ·  in/ Profil",
    },
  },
  {
    label: "CVC & équipements",
    sub: "Chauffage · Climatisation · VMC",
    href: "/cvc-equipements",
    icon: LuFlame,
    color: "#ef4444",
    bg: "#fef2f2",
    border: "#fecaca",
    tagline: "Repérez les chantiers avant même l'appel d'offres.",
    description:
      "Permis déposés, copropriétés en mutation, bâtiments dont les équipements thermiques dépassent 15 ans : Pisteur détecte les opportunités CVC au moment précis où elles émergent.",
    highlights: [
      { icon: LuBuilding2, label: "Permis de chantier actifs", detail: "Données SITADEL en temps réel" },
      { icon: LuLandmark, label: "Copropriétés & syndics", detail: "Lots, gestionnaires, contacts" },
      { icon: LuBadgeCheck, label: "Équipements vieillissants", detail: "Chaudières > 15 ans ciblées" },
    ],
    mock: {
      signal: "Permis de rénovation thermique déposé",
      company: "Résidence Les Acacias",
      location: "Paris 15e · Île-de-France",
      size: "Copropriété · 48 lots",
      contact: "Cabinet Syndic Dupont",
      role: "Gestionnaire de copropriété",
      score: 88,
      tags: ["Chauffage collectif", "Chaudière > 15 ans", "Permis accordé"],
      extra: "Travaux estimés : Q3 2025",
    },
  },
  {
    label: "Rénovation énergétique",
    sub: "Isolation · Ravalement · MaPrimeRénov'",
    href: "/renovation-energetique",
    icon: LuBuilding2,
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    tagline: "Constituez votre pipeline avant que les aides ne soient attribuées.",
    description:
      "Bâtiments DPE F ou G éligibles aux aides, permis de ravalement récents, propriétaires actifs sur les dispositifs d'aide : Pisteur vous livre la liste exploitable avant vos concurrents.",
    highlights: [
      { icon: LuBuilding2, label: "Bâtiments DPE F & G", detail: "Éligibles MaPrimeRénov'" },
      { icon: LuMapPin, label: "Permis de ravalement", detail: "Données communales fraîches" },
      { icon: LuZap, label: "Aides mobilisables ciblées", detail: "CEE, Anah, éco-PTZ" },
    ],
    mock: {
      signal: "Bâtiment classé DPE F identifié",
      company: "SCI Patrimoine Vauban",
      location: "Toulon · Var (83)",
      size: "SCI · Immeuble 12 logements",
      contact: "Sophie Martin",
      role: "Gérante de SCI",
      score: 96,
      tags: ["DPE F", "Éligible MaPrimeRénov'", "Ravalement prévu"],
      extra: "Dépense énergétique : +18k€/an estimée",
    },
  },
  {
    label: "Solaire & ENR",
    sub: "Photovoltaïque · Autoconsommation",
    href: "/solaire-enr",
    icon: LuSun,
    color: "#d97706",
    bg: "#fefce8",
    border: "#fde68a",
    tagline: "Trouvez les toitures industrielles avant vos concurrents.",
    description:
      "Pisteur identifie les surfaces commerciales et industrielles propices à l'autoconsommation, les appels d'offres solaires et les entreprises ayant initié une démarche RSE ou bilan carbone.",
    highlights: [
      { icon: LuFactory, label: "Surfaces > 2 000 m²", detail: "Entrepôts, centres commerciaux" },
      { icon: LuClipboardList, label: "Appels d'offres ENR", detail: "Marchés publics & privés" },
      { icon: LuBadgeCheck, label: "Démarche RSE initiée", detail: "Bilan carbone, labels verts" },
    ],
    mock: {
      signal: "Surface industrielle >3 000 m² disponible",
      company: "Entrepôts Bertrand & Fils",
      location: "Mérignac · Gironde (33)",
      size: "ETI · Logistique · 210 sal.",
      contact: "Pascal Bertrand",
      role: "PDG",
      score: 91,
      tags: ["Toiture plate", "Conso. > 350 MWh/an", "Démarche RSE active"],
      extra: "ROI autoconsommation estimé : 6,5 ans",
    },
  },
  {
    label: "Bureaux d'études",
    sub: "Audit énergétique · RSET · OPERAT",
    href: "/bureaux-etudes",
    icon: LuClipboardList,
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    tagline: "Positionnez-vous en amont des obligations réglementaires.",
    description:
      "Obligations OPERAT, audits énergétiques légaux, opérations de construction en phase PC : Pisteur vous alerte avant que la commande parte à un concurrent mieux positionné.",
    highlights: [
      { icon: LuClipboardList, label: "Échéances OPERAT", detail: "Tertiaire soumis au décret" },
      { icon: LuBuilding2, label: "Opérations en conception", detail: "Permis déposés, maîtres d'ouvrage" },
      { icon: LuBadgeCheck, label: "Audits réglementaires", detail: "Article L.111-10-3 CEE" },
    ],
    mock: {
      signal: "Obligation OPERAT à déclarer",
      company: "Groupe Hôtelier Méridia",
      location: "Lyon · Métropole (69)",
      size: "Hôtel 4* · 85 chambres",
      contact: "Claire Renaud",
      role: "Directrice Technique",
      score: 85,
      tags: ["Tertiaire soumis", "Surface > 1 000 m²", "1re déclaration OPERAT"],
      extra: "Date limite légale : déc. 2025",
    },
  },
  {
    label: "Services immobiliers",
    sub: "Syndic · SCI · Gestion locative",
    href: "/services-immobiliers",
    icon: LuLandmark,
    color: "#0ea5e9",
    bg: "#f0f9ff",
    border: "#bae6fd",
    tagline: "Identifiez les mandats à reprendre avant qu'ils ne soient attribués.",
    description:
      "Mutations de copropriétés, SCI cherchant à optimiser leur parc, gestionnaires surchargés : Pisteur trace les signaux de changement qui précèdent une décision de gestion immobilière.",
    highlights: [
      { icon: LuLandmark, label: "Mutations de copropriétés", detail: "AG extraordinaires, litiges" },
      { icon: LuBadgeCheck, label: "SCI & patrimoine", detail: "Optimisation fiscale, revente" },
      { icon: LuUser, label: "Mandats à reprendre", detail: "Insatisfaction détectée" },
    ],
    mock: {
      signal: "Changement de syndic en cours",
      company: "Copropriété Tour Mirabeau",
      location: "Bordeaux · Gironde (33)",
      size: "Résidentiel · 148 lots",
      contact: "Conseil syndical",
      role: "3 membres élus",
      score: 90,
      tags: ["AG vote prévu", "Mandat non renouvelé", "148 lots"],
      extra: "Nouveau syndic attendu avant juin 2025",
    },
  },
  {
    label: "Fournisseurs d'énergie",
    sub: "Électricité · Gaz · Grands comptes",
    href: "/fournisseurs-energie",
    icon: LuFactory,
    color: "#23c55e",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    tagline: "Ciblez les grands consommateurs B2B avant l'appel d'offres.",
    description:
      "Pisteur croise secteur NAF, puissance souscrite, ouvertures de sites et changements de direction pour vous aider à approcher les grands comptes au moment le plus favorable.",
    highlights: [
      { icon: LuFactory, label: "Grands consommateurs B2B", detail: "Puissance souscrite, NAF" },
      { icon: LuZap, label: "Fins de contrat anticipées", detail: "Cycles de 1 à 3 ans" },
      { icon: LuUser, label: "Changements de direction", detail: "DAF, Achats, DSI" },
    ],
    mock: {
      signal: "Ouverture de nouveau site de production",
      company: "Plasturgie du Centre SARL",
      location: "Clermont-Ferrand · Puy-de-Dôme",
      size: "Industrie · NAF 222Z · 140 sal.",
      contact: "Marc Duval",
      role: "Directeur des Achats",
      score: 87,
      tags: ["Conso. > 500 MWh/an", "Site neuf", "Contrat à négocier"],
      extra: "Démarrage site : T2 2025",
    },
  },
]

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <Box>
      <HStack justifyContent="space-between" mb="1">
        <Text fontSize="10px" fontWeight="700" color="#6b7280" letterSpacing="wide">
          SCORE DE PERTINENCE
        </Text>
        <Text fontSize="11px" fontWeight="800" color={color}>
          {score}%
        </Text>
      </HStack>
      <Box w="full" h="5px" bg="#f0f3f9" borderRadius="full" overflow="hidden">
        <MotionBox
          h="full"
          bg={`linear-gradient(90deg, ${color}88, ${color})`}
          borderRadius="full"
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        />
      </Box>
    </Box>
  )
}

function ProspectMockCard({ sector }: { sector: Sector }) {
  const Icon = sector.icon
  return (
    <Box position="relative">
      {/* Glow décoratif */}
      <Box
        position="absolute"
        top="-20px"
        right="-20px"
        w="180px"
        h="180px"
        borderRadius="full"
        bg={sector.bg}
        filter="blur(40px)"
        opacity="0.7"
        zIndex={0}
        pointerEvents="none"
      />

      {/* Badge flottant haut */}
      <MotionBox
        position="absolute"
        top="-14px"
        right={{ base: "10px", md: "24px" }}
        zIndex={2}
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <HStack
          bg="white"
          border="1.5px solid #e5eaf5"
          borderRadius="full"
          px="3"
          py="1.5"
          gap="2"
          boxShadow="0 4px 16px rgba(7,27,99,.1)"
        >
          <Box w="6px" h="6px" borderRadius="full" bg="#23c55e" flexShrink={0} />
          <Text fontSize="10px" fontWeight="700" color="#071B63" whiteSpace="nowrap">
            Signal détecté
          </Text>
        </HStack>
      </MotionBox>

      {/* Carte principale */}
      <Box
        bg="white"
        border={`1.5px solid ${sector.border}`}
        borderRadius="2xl"
        overflow="hidden"
        boxShadow={`0 20px 60px ${sector.color}14, 0 4px 16px rgba(0,0,0,.06)`}
        position="relative"
        zIndex={1}
      >
        {/* Header coloré */}
        <Box bg={sector.bg} px="5" py="4" borderBottom={`1px solid ${sector.border}`}>
          <HStack gap="3">
            <Box
              w="9"
              h="9"
              borderRadius="xl"
              bg="white"
              color={sector.color}
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow={`0 2px 8px ${sector.color}25`}
              flexShrink={0}
            >
              <Icon size={16} />
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight="800" color="#071B63" lineHeight="1.2">
                {sector.label}
              </Text>
              <Text fontSize="10px" color={sector.color} fontWeight="600">
                {sector.sub}
              </Text>
            </Box>
          </HStack>
        </Box>

        <VStack alignItems="stretch" gap="4" p="5">
          {/* Signal */}
          <Box bg={sector.bg} borderRadius="xl" px="4" py="3" border={`1px solid ${sector.border}`}>
            <Text fontSize="10px" fontWeight="700" color={sector.color} letterSpacing="wide" mb="0.5">
              SIGNAL IDENTIFIÉ
            </Text>
            <Text fontSize="sm" fontWeight="700" color="#071B63" lineHeight="1.35">
              {sector.mock.signal}
            </Text>
            <Text fontSize="10px" color="#9aaabb" mt="1">
              {sector.mock.extra}
            </Text>
          </Box>

          {/* Entreprise */}
          <Box>
            <Text fontSize="10px" fontWeight="700" color="#9aaabb" letterSpacing="wide" mb="2">
              ENTREPRISE CIBLÉE
            </Text>
            <HStack gap="3" alignItems="flex-start">
              <Box
                w="9"
                h="9"
                borderRadius="lg"
                bg="#f0f3f9"
                color="#071B63"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <LuBuilding2 size={15} />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="800" color="#071B63" lineHeight="1.2">
                  {sector.mock.company}
                </Text>
                <HStack gap="2" mt="1" flexWrap="wrap">
                  <HStack gap="1">
                    <LuMapPin size={10} color="#9aaabb" />
                    <Text fontSize="10px" color="#9aaabb">
                      {sector.mock.location}
                    </Text>
                  </HStack>
                  <Text fontSize="10px" color="#d1d5db">·</Text>
                  <Text fontSize="10px" color="#9aaabb">
                    {sector.mock.size}
                  </Text>
                </HStack>
              </Box>
            </HStack>
          </Box>

          {/* Décideur */}
          <Box borderTop="1px solid #f0f3f9" pt="4">
            <Text fontSize="10px" fontWeight="700" color="#9aaabb" letterSpacing="wide" mb="2">
              DÉCIDEUR IDENTIFIÉ
            </Text>
            <HStack gap="3">
              <Box
                w="8"
                h="8"
                borderRadius="full"
                bg={sector.bg}
                color={sector.color}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <LuUser size={13} />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="700" color="#071B63" lineHeight="1.2">
                  {sector.mock.contact}
                </Text>
                <Text fontSize="10px" color="#6b7280">
                  {sector.mock.role}
                </Text>
              </Box>
              <Box ml="auto" flexShrink={0}>
                <LuBadgeCheck size={16} color={sector.color} />
              </Box>
            </HStack>
          </Box>

          {/* Score */}
          <Box borderTop="1px solid #f0f3f9" pt="4">
            <ScoreBar score={sector.mock.score} color={sector.color} />
          </Box>

          {/* Tags */}
          <Flex gap="1.5" flexWrap="wrap">
            {sector.mock.tags.map((tag) => (
              <Box
                key={tag}
                bg={sector.bg}
                color={sector.color}
                fontSize="9px"
                fontWeight="700"
                px="2.5"
                py="1"
                borderRadius="full"
                border={`1px solid ${sector.border}`}
                whiteSpace="nowrap"
              >
                {tag}
              </Box>
            ))}
          </Flex>
        </VStack>
      </Box>

      {/* Badge flottant bas */}
      <MotionBox
        position="absolute"
        bottom="-12px"
        left={{ base: "10px", md: "24px" }}
        zIndex={2}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <HStack
          bg="#071B63"
          borderRadius="full"
          px="3"
          py="1.5"
          gap="2"
          boxShadow="0 4px 16px rgba(7,27,99,.25)"
        >
          <Text fontSize="10px" fontWeight="700" color="white" whiteSpace="nowrap">
            Coordonnées vérifiées ✓
          </Text>
        </HStack>
      </MotionBox>
    </Box>
  )
}

function SectorRow({ sector, index }: { sector: Sector; index: number }) {
  const Icon = sector.icon
  const isTextLeft = index % 2 === 0

  const textBlock = (
    <VStack alignItems="flex-start" gap="6" justifyContent="center" h="full">
      {/* Badge secteur */}
      <HStack gap="3">
        <Box
          w="11"
          h="11"
          borderRadius="xl"
          bg={sector.bg}
          color={sector.color}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          border={`1.5px solid ${sector.border}`}
        >
          <Icon size={20} />
        </Box>
        <Box>
          <Text fontSize="xs" fontWeight="700" color={sector.color} letterSpacing="wide">
            {sector.sub}
          </Text>
          <Text fontSize="lg" fontWeight="900" color="#071B63" lineHeight="1.2">
            {sector.label}
          </Text>
        </Box>
      </HStack>

      {/* Tagline */}
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="800"
        color="#071B63"
        letterSpacing="-0.03em"
        lineHeight="1.25"
      >
        {sector.tagline}
      </Text>

      {/* Description */}
      <Text fontSize="sm" color="#4B587C" lineHeight="1.8">
        {sector.description}
      </Text>

      {/* Highlights */}
      <VStack alignItems="stretch" gap="3" w="full">
        {sector.highlights.map((h) => {
          const HIcon = h.icon
          return (
            <HStack
              key={h.label}
              gap="3"
              bg="#f8faff"
              border="1px solid #e8ecf5"
              borderRadius="xl"
              px="4"
              py="3"
            >
              <Box
                w="8"
                h="8"
                borderRadius="lg"
                bg={sector.bg}
                color={sector.color}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <HIcon size={14} />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="700" color="#071B63" lineHeight="1.2">
                  {h.label}
                </Text>
                <Text fontSize="xs" color="#6b7280">
                  {h.detail}
                </Text>
              </Box>
            </HStack>
          )
        })}
      </VStack>

      {/* CTA */}
      <Button
        bg={sector.color}
        color="white"
        fontWeight="700"
        borderRadius="xl"
        px="6"
        size="sm"
        _hover={{ opacity: 0.88 }}
        asChild
      >
        <Link to={sector.href}>
          <HStack gap="2">
            <Text>Voir le détail {sector.label}</Text>
            <LuArrowRight size={14} />
          </HStack>
        </Link>
      </Button>
    </VStack>
  )

  const cardBlock = (
    <Box px={{ base: "0", md: "4" }} py={{ base: "10", md: "0" }}>
      <ProspectMockCard sector={sector} />
    </Box>
  )

  return (
    <MotionBox
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
    >
      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={{ base: "8", lg: "16" }}
        alignItems="center"
        py={{ base: "14", md: "20" }}
        px={{ base: "4", md: "0" }}
      >
        {isTextLeft ? (
          <>
            {textBlock}
            {cardBlock}
          </>
        ) : (
          <>
            <Box display={{ base: "none", lg: "block" }}>{cardBlock}</Box>
            {textBlock}
            <Box display={{ base: "block", lg: "none" }}>{cardBlock}</Box>
          </>
        )}
      </Grid>
    </MotionBox>
  )
}

export function CasUsagePage() {
  return (
    <>
      <SEO
        title="Cas d'usage bâtiment et énergie"
        description="Courtage en énergie, CVC, rénovation, solaire et services immobiliers : découvrez comment les équipes commerciales utilisent Pisteur."
        path="/cas-usage"
        keywords={["cas usage prospection bâtiment", "prospection courtier énergie", "leads rénovation énergétique", "leads CVC"]}
      />
      <PageHero
        eyebrow="CAS D'USAGE"
        title="Chaque secteur a ses signaux d'opportunité."
        description="Pisteur adapte le ciblage, les données et la qualification à votre activité, votre zone et votre stratégie commerciale."
      />

      {/* Secteurs en alternance */}
      <Box bg="white">
        <Box maxW="6xl" mx="auto" px={{ base: "4", md: "6" }}>
          {sectors.map((sector, i) => (
            <Box
              key={sector.href}
              borderBottom={i < sectors.length - 1 ? "1px solid #f0f3f9" : "none"}
            >
              <SectorRow sector={sector} index={i} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Bandeau CTA */}
      <Box py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="#F7FAFF">
        <Box maxW="3xl" mx="auto" textAlign="center">
          <MotionBox
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <Text fontSize="xs" fontWeight="bold" color="#23c55e" letterSpacing="widest" mb="4">
              PAS ENCORE TROUVÉ VOTRE SECTEUR ?
            </Text>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="900"
              color="#071B63"
              letterSpacing="-0.04em"
              lineHeight="1.1"
              mb="4"
            >
              Pisteur s'adapte à tous les métiers du bâtiment et de l'énergie.
            </Text>
            <Text fontSize="sm" color="#6b7280" lineHeight="1.7" mb="8" maxW="440px" mx="auto">
              Parlez-nous de votre activité et nous vous montrons les signaux les plus pertinents pour votre prospection.
            </Text>
            <Flex gap="3" justifyContent="center" flexWrap="wrap">
              <Button
                bg="#071B63"
                color="white"
                fontWeight="bold"
                borderRadius="xl"
                px="7"
                py="5"
                _hover={{ bg: "#323878" }}
                asChild
              >
                <a href="https://app.optee.io/auth">Essayer gratuitement →</a>
              </Button>
              <Button
                variant="outline"
                borderColor="#d1d5db"
                color="#071B63"
                fontWeight="bold"
                borderRadius="xl"
                px="7"
                py="5"
                _hover={{ bg: "#f8fafb" }}
                asChild
              >
                <Link to="/contact">Parler à un expert</Link>
              </Button>
            </Flex>
          </MotionBox>
        </Box>
      </Box>

      <Testimonials />
      <FAQ pagePath="/cas-usage" />
    </>
  )
}
