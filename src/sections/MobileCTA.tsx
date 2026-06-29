import { Box, Button, HStack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const AUTH_URL = "https://app.optee.io/auth"

export function MobileCTA() {
  return (
    <Box
      display={{ base: "block", lg: "none" }}
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex="sticky"
      bg="white"
      borderTopWidth="1px"
      borderColor="gray.200"
      px="4"
      py="3"
      shadow="lg"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Button
          flex="1"
          size="sm"
          bg="#000d4d"
          color="white"
          _hover={{ bg: "#323878" }}
          borderRadius="lg"
          asChild
        >
          <a href={AUTH_URL}>Essayer gratuitement -- sans CB</a>
        </Button>
        <Box ml="3">
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <Text fontSize="xs" color="#323878" textDecoration="underline">
              Voir ma demo
            </Text>
          </Link>
        </Box>
      </HStack>
    </Box>
  )
}
