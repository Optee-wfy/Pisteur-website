import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { LuArrowRight, LuCheck, LuMinus, LuX } from "react-icons/lu"
import { Link } from "react-router-dom"

const MotionBox = motion.create(Box)

const columns = [
  { name: "Pisteur", highlight: true },
  { name: "LinkedIn Sales Nav.", highlight: false },
  { name: "Apollo.io", highlight: false },
  { name: "Fichier Excel", highlight: false },
]

type FeatureValue = true | false | "partial"

const features: { label: string; values: FeatureValue[] }[] = [
  { label: "Données DPE / énergie bâtiment",        values: [true,  false,   false,   false] },
  { label: "1,2M+ bâtiments France",                values: [true,  false,   false,   false] },
  { label: "Signaux ENEDIS / GRDF",                 values: [true,  false,   false,   false] },
  { label: "Score Match IA",                        values: [true,  false,   false,   false] },
  { label: "Email personnalisé IA",                 values: [true,  false,   false,   false] },
  { label: "Contacts nominatifs décideurs",          values: [true,  true,    true,    false] },
  { label: "Code NAF / SIRET",                      values: [true,  true,    true,    false] },
  { label: "Export CSV illimité",                   values: [true,  "partial", true,  false] },
  { label: "Mise à jour mensuelle",                 values: [true,  true,    true,    false] },
  { label: "Conformité RGPD France",                values: [true,  "partial", "partial", false] },
]

function Cell({ value }: { value: FeatureValue }) {
  if (value === true)
    return (
      <Box color="#23c55e" display="flex" justifyContent="center">
        <LuCheck size={18} strokeWidth={2.5} />
      </Box>
    )
  if (value === false)
    return (
      <Box color="#d1d5e0" display="flex" justifyContent="center">
        <LuX size={16} strokeWidth={2} />
      </Box>
    )
  return (
    <Box color="#f59e0b" display="flex" justifyContent="center">
      <LuMinus size={16} strokeWidth={2.5} />
    </Box>
  )
}

export function CompetitorCompare() {
  return (
    <Box
      py={{ base: "20", md: "28" }}
      px={{ base: "4", md: "6" }}
      bg="#f7faff"
    >
      <Box maxW="5xl" mx="auto">
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <VStack textAlign="center" gap="3" mb={{ base: "12", md: "16" }}>
            <Text color="#00b842" fontSize="sm" fontWeight="bold" letterSpacing="wide">
              POURQUOI PISTEUR ?
            </Text>
            <Text
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="800"
              letterSpacing="-.045em"
              color="#071B63"
              lineHeight="1.05"
            >
              La seule plateforme avec
              <br />
              la donnée bâtiment réelle.
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }} color="#4B587C" maxW="xl" lineHeight="1.75">
              LinkedIn, Apollo ou Excel ne connaissent pas le DPE, la surface,
              la consommation ou le gestionnaire d'un bâtiment. Pisteur si.
            </Text>
          </VStack>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          overflowX="auto"
        >
          <Box
            minW="560px"
            bg="white"
            borderRadius="2xl"
            border="1px solid #e5eaf0"
            boxShadow="0 16px 56px rgba(7,27,99,.07)"
            overflow="hidden"
          >
            {/* Header */}
            <Flex borderBottom="2px solid #e5eaf0">
              <Box flex="2" px="5" py="4" />
              {columns.map((col) => (
                <Box
                  key={col.name}
                  flex="1"
                  textAlign="center"
                  px="3"
                  py="4"
                  bg={col.highlight ? "#071B63" : "transparent"}
                  position="relative"
                >
                  {col.highlight && (
                    <Box
                      position="absolute"
                      top="-1px"
                      left="0"
                      right="0"
                      h="3px"
                      bg="#23c55e"
                    />
                  )}
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color={col.highlight ? "white" : "#071B63"}
                    lineHeight="1.3"
                  >
                    {col.name}
                  </Text>
                </Box>
              ))}
            </Flex>

            {/* Rows */}
            {features.map((feat, ri) => (
              <Flex
                key={feat.label}
                borderBottom={ri < features.length - 1 ? "1px solid #f0f3f9" : "none"}
                _hover={{ bg: "#fafbfd" }}
                transition="background .15s"
              >
                <Box flex="2" px="5" py="3.5">
                  <Text fontSize="sm" color="#071B63" fontWeight="medium">
                    {feat.label}
                  </Text>
                </Box>
                {feat.values.map((val, ci) => (
                  <Box
                    key={ci}
                    flex="1"
                    px="3"
                    py="3.5"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg={ci === 0 ? "#f3fff8" : "transparent"}
                  >
                    <Cell value={val} />
                  </Box>
                ))}
              </Flex>
            ))}

            {/* Footer CTA */}
            <Flex borderTop="2px solid #e5eaf0">
              <Box flex="2" px="5" py="4">
                <HStack gap="3">
                  <Box w="2" h="2" borderRadius="full" bg="#23c55e" />
                  <Text fontSize="xs" color="#4B587C">= Partiel / selon configuration</Text>
                </HStack>
              </Box>
              <Box flex="1" />
              <Box
                flex="1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                py="3"
                bg="#071B63"
              >
                <Box
                  as={Link}
                  to="/demo"
                  display="flex"
                  alignItems="center"
                  gap="1.5"
                  color="#23c55e"
                  fontSize="xs"
                  fontWeight="bold"
                  textDecoration="none"
                  _hover={{ color: "#00e06f" }}
                >
                  Essayer <LuArrowRight size={13} />
                </Box>
              </Box>
              <Box flex="1" />
              <Box flex="1" />
            </Flex>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  )
}
