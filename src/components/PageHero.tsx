import { Box, Text, VStack } from "@chakra-ui/react"

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <Box pt={{ base: "28", md: "36" }} pb={{ base: "14", md: "20" }} px={{ base: "4", md: "6" }} bg="#f7faff">
      <VStack maxW="4xl" mx="auto" textAlign="center" gap="5">
        <Text color="#00b842" fontSize="xs" fontWeight="bold" letterSpacing="wide">{eyebrow}</Text>
        <Text as="h1" fontSize={{ base: "4xl", md: "6xl" }} lineHeight="1" letterSpacing="-.05em" fontWeight="800" color="#071B63">{title}</Text>
        <Text fontSize={{ base: "md", md: "lg" }} lineHeight="1.7" color="#4B587C" maxW="2xl">{description}</Text>
      </VStack>
    </Box>
  )
}
