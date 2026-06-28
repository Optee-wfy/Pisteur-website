import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import {
  LuBuilding2,
  LuChevronDown,
  LuClipboardList,
  LuFactory,
  LuFlame,
  LuLandmark,
  LuMenu,
  LuSun,
  LuX,
  LuZap,
} from "react-icons/lu"
import { Link, useLocation } from "react-router-dom"

// Liens AVANT le dropdown "Par métier"
const navBefore = [
  { label: "Comment ça marche", href: "/comment-ca-marche" },
]

// Liens APRÈS le dropdown "Par métier"
const navAfter = [
  { label: "Nos données", href: "/donnees" },
  { label: "Cas d'usage", href: "/cas-usage" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const navLinks = [...navBefore, ...navAfter]

const verticals = [
  {
    label: "Courtage en énergie",
    sub: "CEE · Fourniture · Optimisation facture",
    href: "/courtage-energie",
    icon: LuZap,
    color: "#071FD6",
    bg: "#eef0fd",
  },
  {
    label: "CVC & équipements",
    sub: "Chauffage · Climatisation · VMC",
    href: "/cvc-equipements",
    icon: LuFlame,
    color: "#ef4444",
    bg: "#fef2f2",
  },
  {
    label: "Rénovation énergétique",
    sub: "Isolation · Ravalement · MaPrimeRénov'",
    href: "/renovation-energetique",
    icon: LuBuilding2,
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    label: "Solaire & ENR",
    sub: "Photovoltaïque · Autoconsommation",
    href: "/solaire-enr",
    icon: LuSun,
    color: "#d97706",
    bg: "#fefce8",
  },
  {
    label: "Bureaux d'études",
    sub: "Audit énergétique · RSET · OPERAT",
    href: "/bureaux-etudes",
    icon: LuClipboardList,
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
  {
    label: "Services immobiliers",
    sub: "Syndic · SCI · Gestion locative",
    href: "/services-immobiliers",
    icon: LuLandmark,
    color: "#0ea5e9",
    bg: "#f0f9ff",
  },
  {
    label: "Fournisseurs d'énergie",
    sub: "Électricité · Gaz · Grands comptes",
    href: "/fournisseurs-energie",
    icon: LuFactory,
    color: "#23c55e",
    bg: "#f0fdf4",
  },
]

const AUTH_URL = "https://app.optee.io/auth"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sectorOpen, setSectorOpen] = useState(false)
  const [mobileSectorOpen, setMobileSectorOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Fermer le dropdown au clic extérieur
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setSectorOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // Fermer le dropdown à la navigation
  useEffect(() => {
    setSectorOpen(false)
    setMobileOpen(false)
    setMobileSectorOpen(false)
  }, [location.pathname])

  const isSectorActive = verticals.some((v) => location.pathname === v.href)

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="sticky"
      bg="white/90"
      backdropFilter="blur(14px)"
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
        {/* Logo */}
        <HStack gap="2" asChild>
          <Link to="/">
            <Image src="/logo-pisteur-ai.webp" alt="Logo Pisteur" w="7" h="8" objectFit="cover" borderRadius="md" />
            <Text fontWeight="bold" fontSize="xl" color="#000d4d">
              Pisteur
            </Text>
          </Link>
        </HStack>

        {/* Nav desktop */}
        <HStack gap="5" display={{ base: "none", lg: "flex" }}>

          {/* Liens avant le dropdown */}
          {navBefore.map((link) => (
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

          {/* Dropdown "Par métier" */}
          <Box position="relative" ref={dropdownRef}>
            <Flex
              as="button"
              alignItems="center"
              gap="1"
              cursor="pointer"
              fontSize="0.875rem"
              fontWeight={isSectorActive ? 700 : 500}
              color={isSectorActive ? "#000d4d" : "#323878"}
              _hover={{ color: "#000d4d" }}
              onClick={() => setSectorOpen((v) => !v)}
              border="none"
              bg="transparent"
              p="0"
            >
              Par métier
              <Box
                as={LuChevronDown}
                size={14}
                style={{
                  transition: "transform .2s",
                  transform: sectorOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </Flex>

            {/* Dropdown panel */}
            {sectorOpen && (
              <Box
                position="absolute"
                top="calc(100% + 14px)"
                left="50%"
                transform="translateX(-50%)"
                w="480px"
                bg="white"
                borderRadius="2xl"
                boxShadow="0 20px 60px rgba(0,13,77,.13), 0 0 0 1px rgba(0,13,77,.06)"
                overflow="hidden"
                zIndex={200}
              >
                {/* En-tête du panel */}
                <Box px="5" pt="4" pb="3" borderBottom="1px solid #f0f3f9">
                  <Text fontSize="xs" fontWeight="bold" color="#9aaabb" letterSpacing="wide">
                    VOTRE SECTEUR
                  </Text>
                  <Text fontSize="sm" fontWeight="bold" color="#000d4d" mt="0.5">
                    Pisteur s'adapte à votre métier
                  </Text>
                </Box>

                {/* Liste des verticaux */}
                <Box p="3">
                  {verticals.map((v) => {
                    const Icon = v.icon
                    const isActive = location.pathname === v.href
                    return (
                      <Box
                        key={v.href}
                        asChild
                        display="block"
                        textDecoration="none"
                      >
                        <Link to={v.href}>
                          <Flex
                            alignItems="center"
                            gap="3"
                            px="3"
                            py="2.5"
                            borderRadius="xl"
                            bg={isActive ? v.bg : "transparent"}
                            _hover={{ bg: v.bg }}
                            transition="background .12s"
                            cursor="pointer"
                          >
                            <Box
                              w="8"
                              h="8"
                              borderRadius="lg"
                              bg={v.bg}
                              color={v.color}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              flexShrink={0}
                            >
                              <Icon size={15} />
                            </Box>
                            <Box>
                              <Text
                                fontSize="sm"
                                fontWeight={isActive ? "bold" : "medium"}
                                color="#000d4d"
                                lineHeight="1.2"
                              >
                                {v.label}
                              </Text>
                              <Text fontSize="xs" color="#9aaabb" mt="0.5">
                                {v.sub}
                              </Text>
                            </Box>
                            {isActive && (
                              <Box
                                ml="auto"
                                w="6px"
                                h="6px"
                                borderRadius="full"
                                bg={v.color}
                                flexShrink={0}
                              />
                            )}
                          </Flex>
                        </Link>
                      </Box>
                    )
                  })}
                </Box>

                {/* Pied du panel */}
                <Box
                  px="5"
                  py="3"
                  borderTop="1px solid #f0f3f9"
                  bg="#f8fafb"
                >
                  <Text fontSize="xs" color="#9aaabb">
                    Vous ne trouvez pas votre secteur ?{" "}
                    <Box as={Link} to="/cas-usage" color="#071FD6" fontWeight="bold" textDecoration="none">
                      Voir tous les cas d'usage →
                    </Box>
                  </Text>
                </Box>
              </Box>
            )}
          </Box>

          {/* Liens après le dropdown */}
          {navAfter.map((link) => (
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

        {/* CTA desktop */}
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
            <a href={AUTH_URL}>Essayer gratuitement →</a>
          </Button>
        </HStack>

        {/* Burger mobile */}
        <Box
          as="button"
          display={{ base: "flex", lg: "none" }}
          alignItems="center"
          justifyContent="center"
          w="9"
          h="9"
          borderRadius="lg"
          bg="transparent"
          border="1px solid #e2e8f0"
          cursor="pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <LuX size={20} color="#323878" /> : <LuMenu size={20} color="#323878" />}
        </Box>
      </Flex>

      {/* Menu mobile */}
      {mobileOpen && (
        <Box
          display={{ lg: "none" }}
          bg="white"
          px="4"
          pb="5"
          borderBottomWidth="1px"
          borderColor="gray.100"
        >
          <Flex direction="column" gap="0">

            {/* Liens avant le dropdown — mobile */}
            {navBefore.map((link) => (
              <Box key={link.href} asChild>
                <Link
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: location.pathname === link.href ? 700 : 500,
                    color: location.pathname === link.href ? "#000d4d" : "#323878",
                    textDecoration: "none",
                    padding: "12px 0",
                    borderBottom: "1px solid #f0f3f9",
                    display: "block",
                  }}
                >
                  {link.label}
                </Link>
              </Box>
            ))}

            {/* Section Par métier — mobile */}
            <Box>
              <Flex
                as="button"
                w="full"
                alignItems="center"
                justifyContent="space-between"
                py="3"
                borderBottom="1px solid #f0f3f9"
                bg="transparent"
                border="none"
                cursor="pointer"
                onClick={() => setMobileSectorOpen((v) => !v)}
              >
                <Text
                  fontSize="sm"
                  fontWeight={isSectorActive ? 700 : 500}
                  color={isSectorActive ? "#000d4d" : "#323878"}
                >
                  Par métier
                </Text>
                <Box
                  as={LuChevronDown}
                  size={14}
                  color="#9aaabb"
                  style={{
                    transition: "transform .2s",
                    transform: mobileSectorOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </Flex>

              {mobileSectorOpen && (
                <Box bg="#f8fafb" borderRadius="xl" mt="1" mb="2" overflow="hidden">
                  {verticals.map((v) => {
                    const Icon = v.icon
                    const isActive = location.pathname === v.href
                    return (
                      <Box key={v.href} asChild display="block" textDecoration="none">
                        <Link to={v.href} onClick={() => setMobileOpen(false)}>
                          <Flex
                            alignItems="center"
                            gap="3"
                            px="3"
                            py="2.5"
                            bg={isActive ? v.bg : "transparent"}
                            _hover={{ bg: v.bg }}
                          >
                            <Box
                              w="7"
                              h="7"
                              borderRadius="lg"
                              bg={v.bg}
                              color={v.color}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              flexShrink={0}
                            >
                              <Icon size={13} />
                            </Box>
                            <Box>
                              <Text fontSize="sm" fontWeight={isActive ? "bold" : "medium"} color="#000d4d">
                                {v.label}
                              </Text>
                              <Text fontSize="2xs" color="#9aaabb">{v.sub}</Text>
                            </Box>
                          </Flex>
                        </Link>
                      </Box>
                    )
                  })}
                </Box>
              )}
            </Box>

            {/* Liens après le dropdown — mobile */}
            {navAfter.map((link) => (
              <Box key={link.href} asChild>
                <Link
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: location.pathname === link.href ? 700 : 500,
                    color: location.pathname === link.href ? "#000d4d" : "#323878",
                    textDecoration: "none",
                    padding: "12px 0",
                    borderBottom: "1px solid #f0f3f9",
                    display: "block",
                  }}
                >
                  {link.label}
                </Link>
              </Box>
            ))}

            {/* CTA mobile */}
            <Flex direction="column" gap="2" mt="4">
              <Button variant="outline" size="sm" color="#323878" borderColor="#e2e8f0" asChild>
                <a href={AUTH_URL}>Se connecter</a>
              </Button>
              <Button size="sm" bg="#000d4d" color="white" _hover={{ bg: "#323878" }} borderRadius="lg" asChild>
                <a href={AUTH_URL}>Essayer gratuitement →</a>
              </Button>
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  )
}
