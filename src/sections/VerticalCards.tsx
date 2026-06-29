import { Badge, Box, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import {
  LuArrowRight,
  LuBuilding2,
  LuClipboardList,
  LuFactory,
  LuFlame,
  LuLandmark,
  LuSun,
  LuZap,
} from "react-icons/lu"
import { Link } from "react-router-dom"

const MotionBox = motion.create(Box)

const verticals = [
  {
    icon: LuZap,
    color: "#071FD6",
    bg: "#eef0fd",
    title: "Courtage en énergie",
    subtitle: "CEE · Fourniture · Optimisation",
    signals: [
      "DPE E/F/G → forte consommation facture",
      "Gestionnaire signataire identifié",
      "Potentiel CEE estimé en euros",
    ],
    href: "/courtage-energie",
    badge: "Le plus populaire",
  },
  {
    icon: LuFlame,
    color: "#ef4444",
    bg: "#fef2f2",
    title: "CVC & équipements",
    subtitle: "Chauffage · Climatisation · VMC",
    signals: [
      "Chaudières fioul/gaz à remplacer",
      "Bâtiments sans PAC ni VMC double-flux",
      "Permis de construire récents",
    ],
    href: "/cvc-equipements",
    badge: null,
  },
  {
    icon: LuBuilding2,
    color: "#f59e0b",
    bg: "#fffbeb",
    title: "Rénovation énergétique",
    subtitle: "Isolation · Ravalement · MaPrimeRénov'",
    signals: [
      "Copropriétés en attente de vote DPE",
      "Isolation non réalisée détectée",
      "MaPrimeRénov' mobilisable calculé",
    ],
    href: "/renovation-energetique",
    badge: null,
  },
  {
    icon: LuSun,
    color: "#f59e0b",
    bg: "#fffbeb",
    title: "Solaire & ENR",
    subtitle: "Photovoltaïque · Autoconsommation",
    signals: [
      "Toitures > 200 m² orientées sud",
      "Tertiaire à forte consommation diurne",
      "Aucune installation ENR existante",
    ],
    href: "/solaire-enr",
    badge: null,
  },
  {
    icon: LuClipboardList,
    color: "#8b5cf6",
    bg: "#f5f3ff",
    title: "Bureaux d'études",
    subtitle: "Audit · RSET · OPERAT",
    signals: [
      "Obligés OPERAT non conformes",
      "Bâtiments > 1 000 m² sans audit DPE",
      "Permis de construire avec RSET requis",
    ],
    href: "/bureaux-etudes",
    badge: null,
  },
  {
    icon: LuLandmark,
    color: "#0ea5e9",
    bg: "#f0f9ff",
    title: "Services immobiliers",
    subtitle: "Gestion · Syndic · Transaction",
    signals: [
      "Syndics de copropriété ciblables",
      "SCI et propriétaires nominatifs",
      "Bâtiments en mutation (vente/succession)",
    ],
    href: "/services-immobiliers",
    badge: null,
  },
  {
    icon: LuFactory,
    color: "#23c55e",
    bg: "#f0fdf4",
    title: "Fournisseurs d'énergie",
    subtitle: "Électricité · Gaz · Tarification",
    signals: [
      "Grands consommateurs (> 200 MWh/an)",
      "Fin de contrat détectée",
      "Décideur DAF/DG identifié",
    ],
    href: "/fournisseurs-energie",
    badge: null,
  },
]

export function VerticalCards() {
  return (
    <Box
      py={{ base: "20", md: "28" }}
      px={{ base: "4", md: "6" }}
      bg="white"
    >
      <Box maxW="7xl" mx="auto">
        <MotionBox
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <VStack textAlign="center" gap="3" mb={{ base: "12", md: "16" }}>
            <Text color="#00b842" fontSize="sm" fontWeight="bold" letterSpacing="wide">
              POUR VOTRE MÉTIER
            </Text>
            <Text
              as="h2"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="800"
              letterSpacing="-.045em"
              color="#071B63"
              lineHeight="1.05"
            >
              Chaque secteur a ses
              <br />
              signaux d'opportunité.
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }} color="#4B587C" maxW="xl" lineHeight="1.75">
              Pisteur adapte automatiquement les critères, les données et la
              qualification à votre activité, votre zone et votre cible.
            </Text>
          </VStack>
        </MotionBox>

        <Flex gap="5" flexWrap="wrap" justifyContent="center">
          {verticals.map((v, i) => (
            <MotionBox
              key={v.title}
              flex={{ base: "1 1 100%", sm: "1 1 calc(50% - 10px)", lg: "1 1 calc(33.33% - 14px)" }}
              maxW={{ base: "full", sm: "calc(50% - 10px)", lg: "calc(33.33% - 14px)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <VStack
                as={Link}
                to={v.href}
                h="full"
                alignItems="flex-start"
                gap="4"
                p={{ base: "5", md: "6" }}
                bg="white"
                border="1px solid #e5eaf0"
                borderRadius="2xl"
                boxShadow="0 4px 20px rgba(7,27,99,.05)"
                transition="all .22s ease"
                textDecoration="none"
                _hover={{
                  borderColor: v.color,
                  boxShadow: `0 12px 36px rgba(7,27,99,.10)`,
                  transform: "translateY(-3px)",
                }}
                position="relative"
                overflow="hidden"
              >
                {v.badge && (
                  <Badge
                    position="absolute"
                    top="4"
                    right="4"
                    bg="#23c55e"
                    color="white"
                    fontSize="2xs"
                    fontWeight="bold"
                    borderRadius="full"
                    px="2.5"
                    py="1"
                  >
                    {v.badge}
                  </Badge>
                )}
                <Box
                  w="11"
                  h="11"
                  borderRadius="xl"
                  bg={v.bg}
                  color={v.color}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <v.icon size={22} />
                </Box>

                <Box>
                  <Text as="h3" fontSize="md" fontWeight="bold" color="#071B63" mb="0.5">
                    {v.title}
                  </Text>
                  <Text fontSize="xs" color="#7B86A3">
                    {v.subtitle}
                  </Text>
                </Box>

                <VStack alignItems="flex-start" gap="2" flex="1">
                  {v.signals.map((sig) => (
                    <HStack key={sig} gap="2.5" alignItems="flex-start">
                      <Box
                        w="5"
                        h="5"
                        borderRadius="full"
                        bg={v.bg}
                        color={v.color}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        mt="0.5"
                      >
                        <Box w="1.5" h="1.5" borderRadius="full" bg={v.color} />
                      </Box>
                      <Text fontSize="xs" color="#4B587C" lineHeight="1.55">
                        {sig}
                      </Text>
                    </HStack>
                  ))}
                </VStack>

                <HStack color={v.color} gap="1" fontSize="xs" fontWeight="bold" mt="2">
                  <Text>Voir les signaux</Text>
                  <LuArrowRight size={13} />
                </HStack>
              </VStack>
            </MotionBox>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}
