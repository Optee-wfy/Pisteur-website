import { Box, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { LuCheck, LuX, LuClock, LuZap } from "react-icons/lu"

const MotionBox = motion.create(Box)

const manualSteps = [
  { label: "Recherche sur Google Maps + Pappers", time: "45 min" },
  { label: "Récupération du contact décideur sur LinkedIn", time: "30 min" },
  { label: "Vérification des coordonnées (mail / tél)", time: "20 min" },
  { label: "Mise à jour du CRM", time: "15 min" },
  { label: "Qualification du potentiel commercial", time: "20 min" },
]

const pisteurSteps = [
  { label: "Définissez vos critères métier, zone, type de bâtiment" },
  { label: "Pisteur croise 50+ signaux bâtiment en temps réel" },
  { label: "Contacts décideurs vérifiés livrés instantanément" },
  { label: "Export ou envoi CRM en 1 clic" },
]

export function ProcessComparison() {
  return (
    <Box as="section" py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="#f8fafc">
      <Box maxW="6xl" mx="auto">

        <MotionBox
          textAlign="center"
          mb={{ base: "10", md: "14" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Text fontSize="xs" fontWeight="bold" color="#23c55e" letterSpacing="widest" mb="3">
            PISTEUR VS PROSPECTION MANUELLE
          </Text>
          <Text
            as="h2"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="900"
            color="#071B63"
            letterSpacing="-0.03em"
            lineHeight="1.15"
          >
            Ce qui vous prend 2 heures — livré en 30 secondes.
          </Text>
        </MotionBox>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="6" alignItems="start">

          {/* Colonne AVANT */}
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <Box
              bg="white"
              borderRadius="2xl"
              border="1.5px solid #fecaca"
              overflow="hidden"
            >
              <Box bg="#fef2f2" px="5" py="4" borderBottom="1px solid #fecaca">
                <HStack gap="2">
                  <Box color="#ef4444"><LuX size={16} /></Box>
                  <Text fontWeight="800" color="#991b1b" fontSize="sm">Sans Pisteur</Text>
                </HStack>
                <HStack gap="2" mt="1">
                  <LuClock size={13} color="#dc2626" />
                  <Text fontSize="xs" color="#dc2626" fontWeight="600">≈ 2h 10 min par prospect</Text>
                </HStack>
              </Box>
              <VStack gap="0" alignItems="stretch" px="5" py="4">
                {manualSteps.map((step, i) => (
                  <HStack
                    key={i}
                    gap="3"
                    py="3"
                    borderBottom={i < manualSteps.length - 1 ? "1px solid #f3f4f6" : "none"}
                    justifyContent="space-between"
                  >
                    <HStack gap="2" flex="1">
                      <Box w="5" h="5" borderRadius="full" bg="#fee2e2" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                        <LuX size={10} color="#ef4444" />
                      </Box>
                      <Text fontSize="sm" color="#374151">{step.label}</Text>
                    </HStack>
                    <Text fontSize="xs" color="#ef4444" fontWeight="600" whiteSpace="nowrap">{step.time}</Text>
                  </HStack>
                ))}
              </VStack>
              <Box bg="#fef2f2" px="5" py="3" borderTop="1px solid #fecaca">
                <Text fontSize="xs" color="#991b1b" fontWeight="700" textAlign="center">
                  ≈ 10 prospects qualifiés par jour maximum
                </Text>
              </Box>
            </Box>
          </MotionBox>

          {/* Colonne AVEC PISTEUR */}
          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <Box
              bg="white"
              borderRadius="2xl"
              border="1.5px solid #bbf7d0"
              overflow="hidden"
            >
              <Box bg="#f0fdf4" px="5" py="4" borderBottom="1px solid #bbf7d0">
                <HStack gap="2">
                  <Box color="#16a34a"><LuCheck size={16} /></Box>
                  <Text fontWeight="800" color="#166534" fontSize="sm">Avec Pisteur</Text>
                </HStack>
                <HStack gap="2" mt="1">
                  <LuZap size={13} color="#16a34a" />
                  <Text fontSize="xs" color="#16a34a" fontWeight="600">Résultat en moins de 30 secondes</Text>
                </HStack>
              </Box>
              <VStack gap="0" alignItems="stretch" px="5" py="4">
                {pisteurSteps.map((step, i) => (
                  <HStack
                    key={i}
                    gap="3"
                    py="3"
                    borderBottom={i < pisteurSteps.length - 1 ? "1px solid #f3f4f6" : "none"}
                  >
                    <Box w="5" h="5" borderRadius="full" bg="#dcfce7" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                      <LuCheck size={10} color="#16a34a" />
                    </Box>
                    <Text fontSize="sm" color="#374151">{step.label}</Text>
                  </HStack>
                ))}
              </VStack>
              <Box bg="#f0fdf4" px="5" py="3" borderTop="1px solid #bbf7d0">
                <Text fontSize="xs" color="#166534" fontWeight="700" textAlign="center">
                  Des centaines de prospects qualifiés en quelques clics
                </Text>
              </Box>
            </Box>

            {/* Gain de temps */}
            <Flex
              mt="4"
              gap="4"
              flexWrap="wrap"
            >
              {[
                { stat: "×20", label: "plus de prospects par jour" },
                { stat: "−95%", label: "de temps de recherche" },
                { stat: "100%", label: "contacts vérifiés" },
              ].map((item) => (
                <Box
                  key={item.stat}
                  flex="1"
                  minW="110px"
                  bg="#071B63"
                  borderRadius="xl"
                  px="4"
                  py="3"
                  textAlign="center"
                >
                  <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="900" color="#23c55e">{item.stat}</Text>
                  <Text fontSize="xs" color="white/70">{item.label}</Text>
                </Box>
              ))}
            </Flex>
          </MotionBox>

        </Grid>
      </Box>
    </Box>
  )
}
