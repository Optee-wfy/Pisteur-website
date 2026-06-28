import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { impactCards } from "@/data/content"

const MotionBox = motion.create(Box)

export function Impact() {
  return (
    <Box
      py={{ base: "16", md: "24" }}
      px={{ base: "4", md: "6" }}
      bg="white"
      pt={{ base: "16", md: "24" }}
    >
      <Box maxW="7xl" mx="auto">
        <VStack gap="4" textAlign="center" mb={{ base: "10", md: "16" }}>
          <Text
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="extrabold"
            color="#000d4d"
          >
            Ce que ça change concrètement
          </Text>
          <Text fontSize="md" color="gray.600" maxW="2xl">
            Les équipes commerciales qui utilisent Pisteur mesurent des
            résultats immédiats sur leurs indicateurs clés.
          </Text>
        </VStack>

        <Flex
          gap="6"
          direction={{ base: "column", lg: "row" }}
          alignItems="stretch"
        >
          {impactCards.map((card, i) => (
            <MotionBox
              key={card.stat}
              flex="1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <VStack
                h="full"
                gap="4"
                p={{ base: "6", md: "8" }}
                borderRadius="2xl"
                bg="#f6f8fb"
                border="1px solid"
                borderColor="gray.100"
                alignItems="flex-start"
              >
                <Text
                  fontSize="3xl"
                  fontWeight="extrabold"
                  color="#23c55e"
                >
                  {card.stat}
                </Text>
                <Text fontSize="md" fontWeight="bold" color="#000d4d">
                  {card.title}
                </Text>

                <Box w="full">
                  <Box
                    p="3"
                    borderRadius="lg"
                    bg="red.50"
                    border="1px solid"
                    borderColor="red.100"
                    mb="3"
                  >
                    <Text fontSize="xs" fontWeight="medium" color="red.600" mb="1">
                      Avant
                    </Text>
                    <Text fontSize="sm" color="gray.700">
                      {card.before}
                    </Text>
                  </Box>
                  <Box
                    p="3"
                    borderRadius="lg"
                    bg="green.50"
                    border="1px solid"
                    borderColor="green.100"
                  >
                    <Text fontSize="xs" fontWeight="medium" color="green.600" mb="1">
                      Avec Pisteur
                    </Text>
                    <Text fontSize="sm" color="gray.700">
                      {card.after}
                    </Text>
                  </Box>
                </Box>
              </VStack>
            </MotionBox>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}
