import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import {
  LuBuilding2,
  LuShield,
  LuTarget,
  LuTrendingUp,
  LuZap,
} from "react-icons/lu"

const MotionBox = motion.create(Box)

const items = [
  { icon: LuBuilding2, value: "1,2M+", label: "bâtiments analysés" },
  { icon: LuZap, value: "+12M", label: "signaux / mois" },
  { icon: LuTarget, value: "2 884", label: "leads générés" },
  { icon: LuTrendingUp, value: "+40%", label: "taux de conversion RDV" },
  { icon: LuShield, value: "95%", label: "précision des données" },
]

const dividerStyle = {
  display: { base: "none", md: "block" } as const,
  w: "1px",
  h: "10",
  bg: "whiteAlpha.200",
  flexShrink: 0,
}

export function SocialProofBar() {
  return (
    <Box
      py={{ base: "10", md: "12" }}
      px={{ base: "4", md: "6" }}
      bg="#071B63"
      overflow="hidden"
      position="relative"
    >
      <Box
        position="absolute"
        inset="0"
        bgGradient="linear(135deg, #071FD6/10 0%, transparent 60%)"
        pointerEvents="none"
      />
      <Flex
        maxW="7xl"
        mx="auto"
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems="center"
        flexWrap="wrap"
        gap={{ base: "8", md: "0" }}
      >
        {items.map(({ icon: Icon, value, label }, i) => (
          <>
            {i > 0 && <Box key={`div-${i}`} {...dividerStyle} />}
            <MotionBox
              key={label}
              flex={{ base: "1 1 140px", md: "1" }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <VStack gap="2" textAlign="center">
                <HStack justifyContent="center" color="#23c55e">
                  <Icon size={20} />
                </HStack>
                <Text
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="extrabold"
                  color="white"
                  letterSpacing="-0.04em"
                  lineHeight="1"
                >
                  {value}
                </Text>
                <Text fontSize="xs" color="whiteAlpha.700" fontWeight="medium">
                  {label}
                </Text>
              </VStack>
            </MotionBox>
          </>
        ))}
      </Flex>
    </Box>
  )
}
