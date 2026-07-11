import { Box, HStack, Text } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import { motion } from "framer-motion"
import { LuSparkle } from "react-icons/lu"
import { Link } from "react-router-dom"

const MotionBox = motion.create(Box)

const shimmer = keyframes`
  to { background-position: 300% center; }
`

export function NewAgentBadge({ size = "md" }: { size?: "md" | "lg" }) {
  const isLg = size === "lg"
  return (
    <MotionBox
      as={Link}
      to="/agent-ia-prospection-batiment"
      display="inline-block"
      borderRadius="full"
      p={isLg ? "3px" : "2.5px"}
      bg="linear-gradient(90deg, #071FD6, #23c55e, #00c94c, #071B63, #071FD6, #23c55e)"
      backgroundSize="300% auto"
      animation={`${shimmer} 7s linear infinite`}
      textDecoration="none"
      cursor="pointer"
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      <HStack
        gap="2"
        bg="#23c55e"
        color="white"
        px={isLg ? "6" : "5"}
        py={isLg ? "3" : "2.5"}
        borderRadius="full"
        fontWeight="900"
        fontSize={isLg ? { base: "sm", md: "md" } : { base: "xs", md: "sm" }}
        letterSpacing="wide"
      >
        <LuSparkle size={isLg ? 19 : 16} fill="white" />
        <Text as="span">NOUVEAU · AGENT IA</Text>
      </HStack>
    </MotionBox>
  )
}
