import { Box, HStack, Text } from "@chakra-ui/react"

interface SafariWindowProps {
  url?: string
  children: React.ReactNode
}

export function SafariWindow({ url = "app.pisteur.fr", children }: SafariWindowProps) {
  return (
    <Box
      borderRadius="2xl"
      overflow="hidden"
      shadow="2xl"
      border="1px solid"
      borderColor="gray.200"
      bg="white"
    >
      <Box bg="gray.100" px="4" py="3" borderBottomWidth="1px" borderColor="gray.200">
        <HStack gap="3" alignItems="center">
          <HStack gap="1.5">
            <Box w="3" h="3" borderRadius="full" bg="#ff5f57" />
            <Box w="3" h="3" borderRadius="full" bg="#febc2e" />
            <Box w="3" h="3" borderRadius="full" bg="#28c840" />
          </HStack>

          <Box
            flex="1"
            maxW="md"
            mx="auto"
            bg="white"
            borderRadius="md"
            px="3"
            py="1"
            border="1px solid"
            borderColor="gray.200"
          >
            <Text fontSize="xs" color="gray.500" textAlign="center" truncate>
              {url}
            </Text>
          </Box>

          <Box w="12" />
        </HStack>
      </Box>

      <Box>{children}</Box>
    </Box>
  )
}
