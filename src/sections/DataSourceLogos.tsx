import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import { useReducedMotion } from "framer-motion"

const storageBaseUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/Image%20du%20site/data-sources`

const dataSourceLogos = [
  {
    name: "data.gouv.fr",
    file: "data-gouv-logo-source-donnees-publiques.webp",
    alt: "Logo data.gouv.fr, plateforme française des données publiques",
  },
  {
    name: "Référentiel National des Bâtiments",
    file: "referentiel-national-batiments-rnb-logo.webp",
    alt: "Logo du Référentiel National des Bâtiments RNB",
  },
  {
    name: "République française",
    file: "republique-francaise-logo-donnees-officielles.webp",
    alt: "Logo République française, source de données officielles",
  },
  {
    name: "Annuaire des Entreprises",
    file: "annuaire-entreprises-logo-officiel.webp",
    alt: "Logo officiel de l’Annuaire des Entreprises",
  },
  {
    name: "MCP data.gouv.fr",
    file: "serveur-mcp-data-gouv-logo.webp",
    alt: "Logo du serveur MCP de data.gouv.fr",
  },
  {
    name: "Insee",
    file: "insee-logo-mesurer-pour-comprendre.webp",
    alt: "Logo Insee, mesurer pour comprendre",
  },
  {
    name: "Insee statistiques publiques",
    file: "insee-logo-institut-national-statistique.webp",
    alt: "Logo de l’Institut national de la statistique et des études économiques",
  },
]

const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`

function LogoGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <Flex
      as="ul"
      role={duplicate ? "presentation" : "list"}
      aria-hidden={duplicate || undefined}
      alignItems="stretch"
      gap={{ base: "3", md: "5" }}
      pr={{ base: "3", md: "5" }}
      listStyleType="none"
      m="0"
      p="0"
    >
      {dataSourceLogos.map((source) => (
        <Box
          as="li"
          key={source.file}
          w={{ base: "210px", md: "250px" }}
          h={{ base: "108px", md: "124px" }}
          flexShrink="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={{ base: "5", md: "7" }}
          py="5"
          bg="white"
          border="1px solid"
          borderColor="#e3e8f2"
          borderRadius="2xl"
          boxShadow="0 8px 24px rgba(7, 27, 99, 0.06)"
          transition="transform .25s ease, border-color .25s ease, box-shadow .25s ease"
          _hover={{
            transform: "translateY(-3px)",
            borderColor: "#b9c5df",
            boxShadow: "0 13px 30px rgba(7, 27, 99, 0.11)",
          }}
        >
          <Image
            src={`${storageBaseUrl}/${source.file}`}
            alt={duplicate ? "" : source.alt}
            w="full"
            h="full"
            objectFit="contain"
            loading="lazy"
            draggable={false}
          />
        </Box>
      ))}
    </Flex>
  )
}

export function DataSourceLogos() {
  const reduceMotion = useReducedMotion()

  return (
    <Box
      as="section"
      py={{ base: "14", md: "20" }}
      bg="#f6f8fb"
      overflow="hidden"
      aria-labelledby="data-sources-title"
    >
      <VStack px={{ base: "5", md: "6" }} gap="3" textAlign="center" mb={{ base: "8", md: "11" }}>
        <Text color="#23c55e" fontSize="xs" fontWeight="extrabold" letterSpacing=".12em">
          NOS SOURCES DE DONNÉES
        </Text>
        <Text
          id="data-sources-title"
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="extrabold"
          color="#071B63"
          letterSpacing="-.035em"
        >
          Des données officielles, croisées en continu.
        </Text>
        <Text maxW="2xl" color="gray.600" fontSize={{ base: "sm", md: "md" }}>
          Pisteur agrège et normalise les référentiels publics français pour transformer la donnée brute en opportunités directement exploitables.
        </Text>
      </VStack>

      <Box
        position="relative"
        overflowX={reduceMotion ? "auto" : "hidden"}
        overflowY="visible"
        py="2"
        css={{
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "clamp(32px, 8vw, 130px)",
            zIndex: 2,
            pointerEvents: "none",
          },
          "&::before": {
            left: 0,
            background: "linear-gradient(90deg, #f6f8fb, transparent)",
          },
          "&::after": {
            right: 0,
            background: "linear-gradient(270deg, #f6f8fb, transparent)",
          },
        }}
      >
        <Flex
          w="max-content"
          animation={reduceMotion ? undefined : `${marquee} 30s linear infinite`}
          _hover={{ animationPlayState: "paused" }}
          _focusWithin={{ animationPlayState: "paused" }}
          willChange={reduceMotion ? undefined : "transform"}
        >
          <LogoGroup />
          {!reduceMotion && <LogoGroup duplicate />}
        </Flex>
      </Box>
    </Box>
  )
}
