import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import { useReducedMotion } from "framer-motion"

const storageBaseUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/Image%20du%20site/logo%20partenaires`

const brands = [
  { name: "Mon Courtier Énergie", file: "mon-courtier-en-energies-logo.webp" },
  { name: "Place des Énergies", file: "place-des-energies-logo.webp" },
  { name: "UNIS", file: "unis-logo.webp" },
  { name: "FNAIM", file: "fnaim-logo.webp" },
  { name: "Emera", file: "emera-logo.webp" },
  { name: "Mieux Rénover", file: "mieux-renover-logo.webp" },
  { name: "Calomatech", file: "calomatech-logo.webp" },
  { name: "CBRE", file: "cbre-logo.webp" },
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
      {brands.map((brand) => (
        <Box
          as="li"
          key={brand.file}
          w={{ base: "160px", md: "190px" }}
          h={{ base: "76px", md: "88px" }}
          flexShrink="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={{ base: "5", md: "6" }}
          py="4"
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
            src={`${storageBaseUrl}/${brand.file}`}
            alt={duplicate ? "" : `Logo officiel ${brand.name}`}
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

export function Logos() {
  const reduceMotion = useReducedMotion()

  return (
    <Box py={{ base: "14", md: "18" }} bg="#f6f8fb" overflow="hidden">
      <Text textAlign="center" fontSize="sm" fontWeight="medium" color="gray.500" mb="8" px={{ base: "4", md: "6" }}>
        ILS CIBLENT MIEUX. ILS DÉVELOPPENT LEUR ACTIVITÉ AVEC PISTEUR.
      </Text>

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
          animation={reduceMotion ? undefined : `${marquee} 26s linear infinite`}
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
