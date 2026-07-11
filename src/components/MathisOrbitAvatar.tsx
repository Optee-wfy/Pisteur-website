import { Box, Image } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"

const orbit = keyframes`
  to { transform: rotate(360deg); }
`

const MATHIS_AVATAR = "/mathis-agent-ia-avatar.webp"

export function MathisOrbitAvatar({
  size = { base: "180px", md: "240px" },
  ringWidth = "5px",
  duration = "4s",
}: {
  size?: { base: string; md: string }
  ringWidth?: string
  duration?: string
}) {
  return (
    <Box position="relative" w={size} h={size} flexShrink={0}>
      <Box
        position="absolute"
        inset="0"
        borderRadius="full"
        bg="conic-gradient(from 0deg, #071FD6, #00E653, #071B63, #071FD6)"
        animation={`${orbit} ${duration} linear infinite`}
      />
      <Box position="absolute" inset={ringWidth} borderRadius="full" bg="white" />
      <Box
        position="absolute"
        inset={`calc(${ringWidth} + 4px)`}
        borderRadius="full"
        bg="white"
        boxShadow="0 16px 48px rgba(7,27,99,.22)"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={MATHIS_AVATAR} alt="Mathis, l'agent IA Pisteur" w="full" h="full" objectFit="cover" />
      </Box>
    </Box>
  )
}
