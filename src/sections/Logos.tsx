import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react"

const brands = [
  { name: "Mon Courtier Énergie", domain: "moncourtierenergie.com" },
  { name: "Place des Énergies", domain: "placedesenergies.com" },
  { name: "UNIS", domain: "unis-immo.fr" },
  { name: "FNAIM", domain: "fnaim.fr" },
  { name: "Emera", domain: "emera.fr" },
  { name: "Mieux Rénover", domain: "mieuxrenover.com" },
  { name: "Calomatech", domain: "calomatech.fr" },
  { name: "CBRE", domain: "cbre.fr" },
]

export function Logos() {
  return (
    <Box py={{ base: "14", md: "18" }} px={{ base: "4", md: "6" }} bg="#f6f8fb">
      <Box maxW="7xl" mx="auto" textAlign="center">
        <Text fontSize="sm" fontWeight="medium" color="gray.500" mb="8">
          ILS CIBLENT MIEUX. ILS DÉVELOPPENT LEUR ACTIVITÉ AVEC PISTEUR.
        </Text>
        <Flex
          justifyContent="center"
          alignItems="center"
          gap={{ base: "4", md: "8" }}
          flexWrap="wrap"
        >
          {brands.map((brand) => (
            <Box
              key={brand.name}
              px="4"
              py="3.5"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="xl"
              boxShadow="0 5px 15px rgba(7,27,99,.04)"
              transition="all .22s ease"
              _hover={{ transform: "translateY(-2px)", borderColor: "#cbd5e1", boxShadow: "0 9px 22px rgba(7,27,99,.08)" }}
            >
              <HStack gap="3">
                <Image
                  src={`https://www.google.com/s2/favicons?domain_url=https://${brand.domain}&sz=128`}
                  alt={`Logo officiel ${brand.name}`}
                  w="9"
                  h="9"
                  objectFit="contain"
                />
                <Text fontSize="sm" fontWeight="semibold" color="#071B63" whiteSpace="nowrap">{brand.name}</Text>
              </HStack>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}
