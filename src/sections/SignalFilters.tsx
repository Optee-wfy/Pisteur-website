import { Badge, Box, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { filterGroups, leads } from "@/data/content"
import { DpeBadge } from "@/components/DpeBadge"

const MotionBox = motion.create(Box)

export function SignalFilters() {
  return (
    <Box
      py={{ base: "16", md: "24" }}
      px={{ base: "4", md: "6" }}
      bg="#000d4d"
    >
      <Box maxW="7xl" mx="auto">
        <VStack gap="4" textAlign="center" mb={{ base: "10", md: "16" }}>
          <Text
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="extrabold"
            color="white"
          >
            Ciblez au millimetre. 100+ signaux batiment.
          </Text>
          <Text fontSize="md" color="white/70" maxW="2xl">
            Chaque filtre affine votre ciblage. Plus vous etes precis, plus
            chaque lead vaut de l'or.
          </Text>
        </VStack>

        <Flex
          direction={{ base: "column", lg: "row" }}
          gap="6"
          alignItems="stretch"
        >
          <MotionBox
            flex="1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box
              p={{ base: "5", md: "6" }}
              borderRadius="2xl"
              bg="white/10"
              backdropFilter="blur(8px)"
              border="1px solid"
              borderColor="white/20"
              h="full"
            >
              <HStack justifyContent="space-between" mb="5">
                <Text fontSize="sm" fontWeight="semibold" color="white">
                  Definition de vos cibles marketing
                </Text>
                <Badge bg="#23c55e" color="white" borderRadius="md" px="2" fontSize="xs">
                  4 800 batiments
                </Badge>
              </HStack>

              <VStack gap="4" alignItems="stretch">
                {filterGroups.map((group) => (
                  <Box key={group.title}>
                    <Text fontSize="xs" fontWeight="medium" color="white/60" mb="2">
                      {group.title}
                    </Text>
                    <HStack gap="2" flexWrap="wrap">
                      {group.tags.map((tag) => (
                        <Badge
                          key={tag}
                          bg="white/15"
                          color="white"
                          borderRadius="md"
                          fontSize="2xs"
                          px="2"
                          py="0.5"
                          border="1px solid"
                          borderColor="white/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>
          </MotionBox>

          <MotionBox
            flex="1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box
              p={{ base: "5", md: "6" }}
              borderRadius="2xl"
              bg="white/10"
              backdropFilter="blur(8px)"
              border="1px solid"
              borderColor="white/20"
              h="full"
            >
              <HStack gap="4" mb="5">
                <Box
                  px="3"
                  py="1.5"
                  borderRadius="lg"
                  bg="#23c55e/20"
                  border="1px solid"
                  borderColor="#23c55e/40"
                >
                  <Text fontSize="xs" fontWeight="semibold" color="#23c55e">
                    4 800 batiments correspondants
                  </Text>
                </Box>
                <Box
                  px="3"
                  py="1.5"
                  borderRadius="lg"
                  bg="white/10"
                  border="1px solid"
                  borderColor="white/20"
                >
                  <Text fontSize="xs" fontWeight="medium" color="white/80">
                    2 658 contacts identifies
                  </Text>
                </Box>
              </HStack>

              <Text fontSize="xs" color="white/50" mb="3">
                Resultats — par pertinence
              </Text>

              <VStack gap="3" alignItems="stretch">
                {leads.map((lead, i) => (
                  <Box
                    key={i}
                    p="3"
                    borderRadius="xl"
                    bg="white/5"
                    border="1px solid"
                    borderColor="white/10"
                  >
                    <Flex justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap="2">
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" color="white">
                          {lead.address}
                        </Text>
                        <Text fontSize="xs" color="white/60">
                          {lead.manager}
                        </Text>
                      </Box>
                      <HStack gap="2">
                        <Badge
                          bg={lead.match >= 80 ? "#23c55e" : "#23c55e/60"}
                          color="white"
                          borderRadius="md"
                          fontSize="2xs"
                          px="2"
                        >
                          {lead.match}%
                        </Badge>
                        <Badge
                          bg="white/10"
                          color="white"
                          borderRadius="md"
                          fontSize="2xs"
                          px="2"
                        >
                          {lead.potential} EUR
                        </Badge>
                      </HStack>
                    </Flex>
                    <HStack gap="2" mt="2">
                      <DpeBadge grade={lead.dpe} compact />
                      <Badge
                        variant="outline"
                        borderColor="white/30"
                        color="white/80"
                        fontSize="2xs"
                        borderRadius="sm"
                      >
                        {lead.surface}
                      </Badge>
                    </HStack>
                  </Box>
                ))}
              </VStack>

              <Text fontSize="xs" color="white/40" mt="3" textAlign="center">
                + 4 797 autres batiments avec votre abonnement
              </Text>
            </Box>
          </MotionBox>
        </Flex>
      </Box>
    </Box>
  )
}
