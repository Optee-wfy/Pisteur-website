import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { LuCookie, LuX } from "react-icons/lu"

const MotionBox = motion.create(Box)
const STORAGE_KEY = "pisteur_cookie_consent"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted")
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <MotionBox
          position="fixed"
          bottom={{ base: "20", lg: "6" }}
          right={{ base: "4", lg: "6" }}
          zIndex="9999"
          maxW="340px"
          w="calc(100vw - 32px)"
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="0 20px 60px rgba(7,27,99,.18), 0 4px 16px rgba(0,0,0,.06)"
            border="1px solid rgba(7,27,99,.08)"
            p="5"
            position="relative"
          >
            {/* Bouton fermer */}
            <Box
              as="button"
              position="absolute"
              top="3"
              right="3"
              color="#9aaabb"
              _hover={{ color: "#071B63" }}
              onClick={decline}
              p="1"
              borderRadius="md"
              transition=".15s"
              aria-label="Fermer"
            >
              <LuX size={15} />
            </Box>

            <VStack gap="3" alignItems="flex-start">
              {/* Icône + titre */}
              <HStack gap="2.5">
                <Box
                  bg="#eef0fd"
                  borderRadius="lg"
                  p="2"
                  color="#071FD6"
                  flexShrink={0}
                >
                  <LuCookie size={16} />
                </Box>
                <Text fontWeight="800" fontSize="sm" color="#071B63">
                  Cookies & vie privée
                </Text>
              </HStack>

              {/* Message */}
              <Text fontSize="xs" color="#6b7280" lineHeight="1.65">
                Nous utilisons des cookies pour analyser notre trafic et améliorer votre expérience. Vos données ne sont jamais revendues.{" "}
                <Box
                  as={Link}
                  to="/confidentialite"
                  color="#071FD6"
                  fontWeight="600"
                  _hover={{ textDecoration: "underline" }}
                >
                  En savoir plus
                </Box>
              </Text>

              {/* Boutons */}
              <HStack gap="2" w="full">
                <Button
                  onClick={accept}
                  bg="#071B63"
                  color="white"
                  fontSize="xs"
                  fontWeight="700"
                  borderRadius="xl"
                  px="4"
                  h="8"
                  flex="1"
                  _hover={{ bg: "#071FD6" }}
                  transition=".15s"
                >
                  Accepter
                </Button>
                <Button
                  onClick={decline}
                  variant="outline"
                  borderColor="#e2e8f0"
                  color="#6b7280"
                  fontSize="xs"
                  fontWeight="600"
                  borderRadius="xl"
                  px="4"
                  h="8"
                  flex="1"
                  _hover={{ bg: "#f8fafc", borderColor: "#071B63", color: "#071B63" }}
                  transition=".15s"
                >
                  Refuser
                </Button>
              </HStack>
            </VStack>
          </Box>
        </MotionBox>
      )}
    </AnimatePresence>
  )
}
