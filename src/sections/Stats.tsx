import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { LuBuilding2, LuFilter, LuTarget, LuZap } from "react-icons/lu"
import { stats } from "@/data/content"

const MotionBox = motion.create(Box)

const icons = [LuBuilding2, LuFilter, LuTarget, LuZap]

export function Stats() {
  return (
    <Box py={{ base: "16", md: "20" }} px={{ base: "4", md: "6" }} bg="white">
      <Box maxW="7xl" mx="auto">
        <Text textAlign="center" color="#23c55e" fontSize="sm" fontWeight="bold" mb="12">DES DONNÉES PUISSANTES. DES RÉSULTATS CONCRETS.</Text>
        <Flex
          gap="0"
          flexWrap="wrap"
          justifyContent="center"
          borderTopWidth="1px"
          borderBottomWidth="1px"
          borderColor="gray.200"
        >
          {stats.map((stat, i) => {
            const IconComp = icons[i]
            return (
              <MotionBox
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                flex="1"
                minW={{ base: "50%", md: "220px" }}
                maxW="none"
              >
                <VStack
                  gap="3"
                  p={{ base: "6", md: "9" }}
                  bg="white"
                  borderRightWidth={{ base: "0", md: i < stats.length - 1 ? "1px" : "0" }}
                  borderColor="gray.200"
                  textAlign="center"
                >
                  <Box color="#23c55e">
                    <IconComp size={28} />
                  </Box>
                  <Text
                    fontSize="3xl"
                    fontWeight="extrabold"
                    color="#000d4d"
                  >
                    {stat.value}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {stat.label}
                  </Text>
                </VStack>
              </MotionBox>
            )
          })}
        </Flex>
      </Box>
    </Box>
  )
}
