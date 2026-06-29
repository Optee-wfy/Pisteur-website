import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { LuArrowRight, LuPhone } from "react-icons/lu"
import { Link } from "react-router-dom"

const MotionBox = motion.create(Box)

interface PageCTAProps {
  title?: string
  variant?: "dark" | "light"
}

export function PageCTA({
  title = "Prêt à trouver vos prochains clients ?",
  variant = "dark",
}: PageCTAProps) {
  const isDark = variant === "dark"

  return (
    <Box
      py={{ base: "14", md: "20" }}
      px={{ base: "4", md: "6" }}
      bg={isDark ? "#071B63" : "white"}
      borderTop={isDark ? "none" : "1px solid #e8ecf5"}
    >
      <MotionBox
        maxW="4xl"
        mx="auto"
        textAlign="center"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55 }}
      >
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="900"
          color={isDark ? "white" : "#071B63"}
          letterSpacing="-0.04em"
          lineHeight="1.1"
          mb="4"
        >
          {title}
        </Text>
        <Text
          fontSize={{ base: "sm", md: "md" }}
          color={isDark ? "rgba(255,255,255,.65)" : "#6b7280"}
          lineHeight="1.75"
          mb="8"
          maxW="520px"
          mx="auto"
        >
          Décrivez votre activité et votre zone cible. Notre équipe vous montre en direct les prospects identifiés par Pisteur pour vous.
        </Text>

        <Flex gap="3" justifyContent="center" flexWrap="wrap">
          <Button
            bg="#23c55e"
            color="white"
            fontWeight="800"
            borderRadius="xl"
            px="7"
            py="5"
            fontSize="sm"
            _hover={{ bg: "#1da34e", transform: "translateY(-2px)" }}
            transition="all .15s"
            asChild
          >
            <Link to="/contact">
              <HStack gap="2">
                <Text>Essayer maintenant</Text>
                <LuArrowRight size={15} />
              </HStack>
            </Link>
          </Button>
          <Button
            variant="outline"
            borderColor={isDark ? "rgba(255,255,255,.25)" : "#071B63"}
            color={isDark ? "white" : "#071B63"}
            fontWeight="700"
            borderRadius="xl"
            px="7"
            py="5"
            fontSize="sm"
            _hover={
              isDark
                ? { bg: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.4)" }
                : { bg: "#f0f3f9" }
            }
            transition="all .15s"
            asChild
          >
            <Link to="/contact">
              <HStack gap="2">
                <LuPhone size={14} />
                <Text>Parler à un expert</Text>
              </HStack>
            </Link>
          </Button>
        </Flex>
      </MotionBox>
    </Box>
  )
}
