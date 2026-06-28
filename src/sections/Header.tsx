import { Box, Button, Flex, HStack, IconButton, Image, Text } from "@chakra-ui/react"
import { LuMenu, LuX } from "react-icons/lu"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const navLinks = [
  { label: "Comment ca marche", href: "/comment-ca-marche" },
  { label: "Nos donnees", href: "/donnees" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Cas d'usage", href: "/cas-usage" },
  { label: "Blog", href: "/blog" },
]

const AUTH_URL = "https://app.optee.io/auth"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="sticky"
      bg="white/80"
      backdropFilter="blur(12px)"
      borderBottomWidth="1px"
      borderColor="gray.100"
    >
      <Flex
        maxW="7xl"
        mx="auto"
        px={{ base: "4", md: "6" }}
        py="3"
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack gap="2" asChild>
          <Link to="/">
            <Image src="/logo-pisteur-ai.webp" alt="Logo Pisteur" w="7" h="8" objectFit="cover" borderRadius="md" />
            <Text fontWeight="bold" fontSize="xl" color="#000d4d">
              Pisteur
            </Text>
          </Link>
        </HStack>

        <HStack gap="6" display={{ base: "none", lg: "flex" }}>
          {navLinks.map((link) => (
            <Box key={link.href} asChild>
              <Link
                to={link.href}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: location.pathname === link.href ? 700 : 500,
                  color: location.pathname === link.href ? "#000d4d" : "#323878",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            </Box>
          ))}
        </HStack>

        <HStack gap="3" display={{ base: "none", lg: "flex" }}>
          <Button variant="ghost" size="sm" color="#323878" asChild>
            <a href={AUTH_URL}>Se connecter</a>
          </Button>
          <Button
            size="sm"
            bg="#000d4d"
            color="white"
            _hover={{ bg: "#323878" }}
            borderRadius="lg"
            asChild
          >
            <a href={AUTH_URL}>Essayer gratuitement &rarr;</a>
          </Button>
        </HStack>

        <IconButton
          display={{ base: "flex", lg: "none" }}
          variant="ghost"
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <LuX size={24} /> : <LuMenu size={24} />}
        </IconButton>
      </Flex>

      {mobileOpen && (
        <Box
          display={{ lg: "none" }}
          bg="white"
          px="4"
          pb="4"
          borderBottomWidth="1px"
          borderColor="gray.100"
        >
          <Flex direction="column" gap="3">
            {navLinks.map((link) => (
              <Box key={link.href} asChild>
                <Link
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#323878",
                    textDecoration: "none",
                    padding: "8px 0",
                  }}
                >
                  {link.label}
                </Link>
              </Box>
            ))}
            <Button variant="ghost" size="sm" color="#323878" asChild>
              <a href={AUTH_URL}>Se connecter</a>
            </Button>
            <Button
              size="sm"
              bg="#000d4d"
              color="white"
              _hover={{ bg: "#323878" }}
              borderRadius="lg"
              asChild
            >
              <a href={AUTH_URL}>Essayer gratuitement &rarr;</a>
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  )
}
