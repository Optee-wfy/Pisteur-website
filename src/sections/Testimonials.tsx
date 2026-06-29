import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { LuStar } from "react-icons/lu"
import { testimonials } from "@/data/content"
import { useEffect, useState } from "react"
import { publicRows } from "@/lib/backend"

const MotionBox = motion.create(Box)

export function Testimonials() {
  const [remote, setRemote] = useState<Array<{ id: string; name: string; company: string; quote: string; rating: number }>>([])
  useEffect(() => { publicRows<{ id: string; name: string; company: string; quote: string; rating: number }>("testimonials", "select=*&active=eq.true&order=sort_order.asc").then(setRemote) }, [])
  const items = remote.length ? remote.map(t => ({ ...t, text: t.quote })) : testimonials
  return (
    <Box py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="#f6f8fb">
      <Box maxW="7xl" mx="auto">
        <VStack gap="4" textAlign="center" mb={{ base: "10", md: "16" }}>
          <Text
            as="h2"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="extrabold"
            color="#000d4d"
          >
            Des professionnels qui ont trouvé leur marché adressable
          </Text>
          <Text fontSize="md" color="gray.600" maxW="2xl">
            De la prospection manuelle à une stratégie commerciale structurée
            — en quelques jours.
          </Text>
        </VStack>

        <Flex gap="6" flexWrap="wrap" justifyContent="center">
          {items.map((t, i) => (
            <MotionBox
              key={`${t.company}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              flex="1"
              minW={{ base: "full", md: "300px" }}
              maxW={{ base: "full", md: "380px" }}
            >
              <VStack
                h="full"
                gap="4"
                p="6"
                borderRadius="2xl"
                bg="white"
                border="1px solid"
                borderColor="gray.100"
                shadow="sm"
                alignItems="flex-start"
              >
                <HStack gap="1">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Box key={si} color="#ff8a3d">
                      <LuStar size={16} fill="#ff8a3d" />
                    </Box>
                  ))}
                </HStack>

                <Text fontSize="sm" color="gray.700" lineHeight="tall" flex="1">
                  "{t.text}"
                </Text>

                <HStack gap="3">
                  <Box
                    w="9"
                    h="9"
                    borderRadius="full"
                    bg="#000d4d"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xs"
                    fontWeight="bold"
                  >
                    {t.name.charAt(0)}
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" color="#000d4d">
                      {t.name}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {t.company}
                    </Text>
                  </Box>
                </HStack>
              </VStack>
            </MotionBox>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}
