import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { LuCheck, LuMail, LuPhone } from "react-icons/lu"
import { credits } from "@/data/content"

const MotionBox = motion.create(Box)
const icons = [LuCheck, LuMail, LuPhone]

export function Credits() {
  return (
    <Box py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="white">
      <Box maxW="7xl" mx="auto">
        <VStack gap="4" textAlign="center" mb={{ base: "10", md: "16" }}>
          <Text
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="extrabold"
            color="#000d4d"
          >
            Transparent. Sans surprise.
          </Text>
          <Text fontSize="md" color="gray.600" maxW="2xl">
            Vous consommez des credits uniquement quand vous obtenez une
            information.
          </Text>
        </VStack>

        <Flex
          gap="6"
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
          alignItems="stretch"
        >
          {credits.map((credit, i) => {
            const IconComp = icons[i]
            return (
              <MotionBox
                key={credit.description}
                flex="1"
                maxW="320px"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <VStack
                  h="full"
                  gap="4"
                  p="6"
                  borderRadius="2xl"
                  bg="#f6f8fb"
                  border="1px solid"
                  borderColor="gray.100"
                  textAlign="center"
                >
                  <Box
                    w="12"
                    h="12"
                    borderRadius="xl"
                    bg="#23c55e/15"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="#23c55e"
                  >
                    <IconComp size={24} />
                  </Box>
                  <Text fontSize="lg" fontWeight="bold" color="#000d4d">
                    {credit.amount}
                  </Text>
                  <Text fontSize="sm" color="gray.700">
                    {credit.description}
                  </Text>
                  {credit.note && (
                    <Text fontSize="xs" color="gray.500">
                      {credit.note}
                    </Text>
                  )}
                </VStack>
              </MotionBox>
            )
          })}
        </Flex>
      </Box>
    </Box>
  )
}
