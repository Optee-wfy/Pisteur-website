import { Badge, Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { LuCheck } from "react-icons/lu"
import { pricingPlans } from "@/data/content"

const MotionBox = motion.create(Box)
const AUTH_URL = "https://app.optee.io/auth"

export function Pricing() {
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
            as="h2"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="extrabold"
            color="#000d4d"
          >
            Simple, transparent, sans engagement
          </Text>
          <Text fontSize="md" color="gray.600" maxW="2xl">
            Commencez gratuitement, scalez quand vous êtes prêt.
          </Text>
          <HStack gap="4" flexWrap="wrap" justifyContent="center" mt="1">
            {["Sans carte bancaire requise", "Résiliation à tout moment", "Support inclus"].map((badge) => (
              <HStack key={badge} gap="1.5" bg="#f0fdf4" px="3" py="1.5" borderRadius="full" border="1px solid #bbf7d0">
                <Box color="#16a34a"><LuCheck size={12} /></Box>
                <Text fontSize="xs" fontWeight="600" color="#166534">{badge}</Text>
              </HStack>
            ))}
          </HStack>
        </VStack>

        <Flex
          gap="5"
          direction={{ base: "column", lg: "row" }}
          alignItems="stretch"
          justifyContent="center"
        >
          {pricingPlans.map((plan, i) => (
            <MotionBox
              key={plan.name}
              flex="1"
              maxW={{ lg: "300px" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <VStack
                h="full"
                gap="5"
                p="6"
                borderRadius="2xl"
                bg={plan.popular ? "#000d4d" : "#f6f8fb"}
                border="2px solid"
                borderColor={plan.popular ? "#23c55e" : "gray.100"}
                alignItems="flex-start"
                position="relative"
              >
                {plan.popular && (
                  <Badge
                    position="absolute"
                    top="-3"
                    right="4"
                    bg="#23c55e"
                    color="white"
                    borderRadius="full"
                    px="3"
                    py="1"
                    fontSize="xs"
                  >
                    Populaire
                  </Badge>
                )}

                <Box>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={plan.popular ? "white" : "#000d4d"}
                  >
                    {plan.name}
                  </Text>
                  <Text
                    fontSize="xs"
                    color={plan.popular ? "white/60" : "gray.500"}
                  >
                    {plan.subtitle}
                  </Text>
                </Box>

                <HStack alignItems="baseline" gap="1">
                  <Text
                    fontSize="3xl"
                    fontWeight="extrabold"
                    color={plan.popular ? "white" : "#000d4d"}
                  >
                    {plan.price}€
                  </Text>
                  {plan.period && (
                    <Text
                      fontSize="sm"
                      color={plan.popular ? "white/60" : "gray.500"}
                    >
                      {plan.period}
                    </Text>
                  )}
                </HStack>

                {plan.credits && (
                  <Badge
                    bg={plan.popular ? "#23c55e/20" : "#23c55e/15"}
                    color="#23c55e"
                    borderRadius="md"
                    px="2"
                    fontSize="xs"
                  >
                    {plan.credits}
                  </Badge>
                )}

                <VStack gap="2.5" alignItems="flex-start" flex="1">
                  {plan.features.map((feature) => (
                    <HStack key={feature} gap="2" alignItems="flex-start">
                      <Box
                        color={plan.popular ? "#23c55e" : "#23c55e"}
                        mt="0.5"
                      >
                        <LuCheck size={14} />
                      </Box>
                      <Text
                        fontSize="sm"
                        color={plan.popular ? "white/90" : "gray.700"}
                      >
                        {feature}
                      </Text>
                    </HStack>
                  ))}
                </VStack>

                <Button
                  w="full"
                  mt="2"
                  variant={plan.ctaVariant}
                  bg={
                    plan.popular
                      ? "#23c55e"
                      : plan.ctaVariant === "solid"
                        ? "#000d4d"
                        : undefined
                  }
                  color={
                    plan.popular
                      ? "white"
                      : plan.ctaVariant === "solid"
                        ? "white"
                        : "#000d4d"
                  }
                  borderColor={plan.ctaVariant === "outline" ? (plan.popular ? "white" : "#000d4d") : undefined}
                  _hover={{
                    opacity: 0.9,
                  }}
                  borderRadius="xl"
                  asChild
                >
                  <a href={AUTH_URL}>{plan.cta}</a>
                </Button>
              </VStack>
            </MotionBox>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}
