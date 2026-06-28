import { Badge, Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { LuCheck, LuMail, LuSettings, LuTarget } from "react-icons/lu"
import { Link } from "react-router-dom"
import { howItWorksCards } from "@/data/content"

const AUTH_URL = "https://app.optee.io/auth"

const MotionBox = motion.create(Box)
const icons = [LuSettings, LuMail, LuTarget]

export function HowItWorks() {
  return (
    <Box
      py={{ base: "16", md: "24" }}
      px={{ base: "4", md: "6" }}
      bg="#f6f8fb"
      pt={{ base: "16", md: "24" }}
    >
      <Box maxW="7xl" mx="auto">
        <VStack gap="4" textAlign="center" mb={{ base: "10", md: "16" }}>
          <Text
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="extrabold"
            color="#000d4d"
            maxW="3xl"
          >
            Recevez chaque matin les bâtiments à prospecter aujourd'hui
          </Text>
          <Text fontSize="md" color="gray.600" maxW="2xl">
            Pisteur fait le travail de ciblage à votre place. Vous recevez
            chaque jour des leads qualifiés — avec les bons interlocuteurs et
            le potentiel chiffré de chaque chantier.
          </Text>
        </VStack>

        <Flex
          gap="6"
          direction={{ base: "column", lg: "row" }}
          alignItems="stretch"
        >
          {howItWorksCards.map((card, i) => {
            const IconComp = icons[i]
            return (
              <MotionBox
                key={card.title}
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
                  bg="white"
                  border="1px solid"
                  borderColor="gray.100"
                  shadow="sm"
                  alignItems="flex-start"
                >
                  <Box
                    w="12"
                    h="12"
                    borderRadius="xl"
                    bg="#000d4d/10"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="#000d4d"
                  >
                    <IconComp size={24} />
                  </Box>

                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="#000d4d"
                  >
                    {card.title}
                  </Text>

                  <Text fontSize="sm" color="gray.600" lineHeight="tall">
                    {card.text}
                  </Text>

                  {card.tags && (
                    <HStack gap="2" flexWrap="wrap">
                      {card.tags.map((tag) => (
                        <Badge
                          key={tag}
                          bg="#000d4d/8"
                          color="#000d4d"
                          borderRadius="md"
                          fontSize="2xs"
                          px="2"
                          py="0.5"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                  )}

                  {card.items && (
                    <VStack gap="2" alignItems="flex-start">
                      {card.items.map((item) => (
                        <HStack key={item} gap="2" alignItems="flex-start">
                          <Box color="#23c55e" mt="0.5">
                            <LuCheck size={14} />
                          </Box>
                          <Text fontSize="sm" color="gray.700">
                            {item}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  )}

                  {card.steps && (
                    <VStack gap="2" alignItems="flex-start">
                      {card.steps.map((step, si) => (
                        <HStack key={step} gap="2" alignItems="flex-start">
                          <Box
                            minW="5"
                            h="5"
                            borderRadius="full"
                            bg="#23c55e"
                            color="white"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="2xs"
                            fontWeight="bold"
                          >
                            {si + 1}
                          </Box>
                          <Text fontSize="sm" color="gray.700">
                            {step}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  )}
                </VStack>
              </MotionBox>
            )
          })}
        </Flex>

        <VStack gap="4" mt={{ base: "10", md: "16" }} textAlign="center">
          <Text fontSize="lg" fontWeight="semibold" color="#000d4d">
            Prêt à voir les bâtiments qui vous correspondent ?
          </Text>
          <HStack gap="3" flexWrap="wrap" justifyContent="center">
            <Button
              size="lg"
              bg="#000d4d"
              color="white"
              _hover={{ bg: "#323878" }}
              borderRadius="xl"
              px="8"
              asChild
            >
              <a href={AUTH_URL}>Essayer gratuitement →</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              borderColor="#000d4d"
              color="#000d4d"
              _hover={{ bg: "#000d4d/5" }}
              borderRadius="xl"
              px="8"
              asChild
            >
              <Link to="/demo">Demander une démo</Link>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}
