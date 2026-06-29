import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import {
  LuBuilding2,
  LuCheck,
  LuChevronLeft,
  LuFactory,
  LuFlame,
  LuGift,
  LuHouse,
  LuLayoutGrid,
  LuSun,
  LuX,
  LuZap,
} from "react-icons/lu"
import { submitContact } from "@/lib/backend"

const MotionBox = motion.create(Box)

// ── Données des étapes ────────────────────────────────────────────────────────

const sectors = [
  { label: "Courtage énergie", icon: LuZap, value: "Courtage en énergie" },
  { label: "Rénovation", icon: LuFlame, value: "Rénovation énergétique" },
  { label: "CVC & équipements", icon: LuFactory, value: "CVC & équipements" },
  { label: "Solaire & ENR", icon: LuSun, value: "Solaire & ENR" },
  { label: "Services immo", icon: LuBuilding2, value: "Services immobiliers" },
  { label: "Autre", icon: LuLayoutGrid, value: "Autre" },
]

const buildingTypes = [
  { label: "Résidentiel collectif", icon: LuHouse, value: "Résidentiel collectif" },
  { label: "Tertiaire", icon: LuBuilding2, value: "Tertiaire (bureaux, commerces)" },
  { label: "Industriel", icon: LuFactory, value: "Industriel & logistique" },
  { label: "Tous types", icon: LuLayoutGrid, value: "Tous types de bâtiments" },
]

const STORAGE_KEY = "pisteur_lead_popup_done"

// ── Composant ─────────────────────────────────────────────────────────────────

export function LeadPopup() {
  const alreadyDone = Boolean(localStorage.getItem(STORAGE_KEY))

  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [dismissed, setDismissed] = useState(alreadyDone)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [sector, setSector] = useState("")
  const [buildingType, setBuildingType] = useState("")
  const [zone, setZone] = useState("")
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  if (dismissed && !open) return null

  function dismiss() {
    setOpen(false)
    setDismissed(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError("")
    try {
      await submitContact({
        kind: "lead-popup",
        sector,
        buildingType,
        zone,
        firstName,
        email,
        phone,
        source: "lead-popup-homepage",
      })
      localStorage.setItem(STORAGE_KEY, "1")
      setStep(4)
    } catch {
      setError("Une erreur est survenue. Réessayez dans un instant.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box position="fixed" bottom={{ base: "20", lg: "6" }} left={{ base: "4", lg: "6" }} zIndex="9998">
      <AnimatePresence mode="popLayout">

        {/* ── Bouton bulle ── */}
        {!open && (
          <MotionBox
            key="bubble"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ duration: 0.25 }}
          >
            <Box
              as="button"
              onClick={() => { setOpen(true); setStep(1) }}
              display="flex"
              alignItems="center"
              gap="2.5"
              bg="#071B63"
              color="white"
              px="4"
              py="3"
              borderRadius="2xl"
              boxShadow="0 8px 32px rgba(7,27,99,.35)"
              fontSize="sm"
              fontWeight="700"
              transition="all .2s"
              _hover={{ bg: "#071FD6", transform: "translateY(-2px)", boxShadow: "0 12px 40px rgba(7,27,99,.45)" }}
            >
              <Box bg="#23c55e" borderRadius="lg" p="1.5" color="white">
                <LuGift size={14} />
              </Box>
              <Text>1 lead gratuit 🎁</Text>
            </Box>
          </MotionBox>
        )}

        {/* ── Popup ── */}
        {open && (
          <MotionBox
            key="popup"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            w={{ base: "calc(100vw - 32px)", sm: "360px" }}
          >
            <Box
              bg="white"
              borderRadius="2xl"
              boxShadow="0 24px 64px rgba(7,27,99,.2), 0 4px 16px rgba(0,0,0,.06)"
              border="1px solid rgba(7,27,99,.08)"
              overflow="hidden"
            >
              {/* Header */}
              <Box bg="#071B63" px="5" py="4" position="relative">
                <Box
                  as="button"
                  position="absolute"
                  top="3"
                  right="3"
                  color="rgba(255,255,255,.5)"
                  _hover={{ color: "white" }}
                  onClick={dismiss}
                  p="1"
                  borderRadius="md"
                  transition=".15s"
                  aria-label="Fermer"
                >
                  <LuX size={15} />
                </Box>
                <HStack gap="2.5" mb="1">
                  <Box bg="#23c55e" borderRadius="lg" p="1.5" color="white" flexShrink={0}>
                    <LuGift size={13} />
                  </Box>
                  <Text fontSize="sm" fontWeight="800" color="white">Recevez 1 lead qualifié</Text>
                </HStack>
                <Text fontSize="xs" color="rgba(255,255,255,.6)">
                  Gratuit, sans engagement, livré sous 24h
                </Text>

                {/* Barre de progression */}
                {step < 4 && (
                  <HStack gap="1.5" mt="3">
                    {[1, 2, 3].map((n) => (
                      <Box
                        key={n}
                        h="2px"
                        flex="1"
                        borderRadius="full"
                        bg={n <= step ? "#23c55e" : "rgba(255,255,255,.2)"}
                        transition="background .3s"
                      />
                    ))}
                  </HStack>
                )}
              </Box>

              {/* Contenu */}
              <Box px="5" py="5">
                <AnimatePresence mode="wait">

                  {/* ── Étape 1 : Secteur ── */}
                  {step === 1 && (
                    <MotionBox
                      key="s1"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Text fontSize="xs" fontWeight="700" color="#071B63" mb="3">
                        ÉTAPE 1/3 — Votre secteur d'activité ?
                      </Text>
                      <Box
                        display="grid"
                        gridTemplateColumns="1fr 1fr"
                        gap="2"
                      >
                        {sectors.map((s) => {
                          const Icon = s.icon
                          const selected = sector === s.value
                          return (
                            <Box
                              key={s.value}
                              as="button"
                              onClick={() => { setSector(s.value); setStep(2) }}
                              display="flex"
                              alignItems="center"
                              gap="2"
                              px="3"
                              py="2.5"
                              borderRadius="xl"
                              border={`1.5px solid ${selected ? "#071B63" : "#e8edf5"}`}
                              bg={selected ? "#f0f3ff" : "white"}
                              fontSize="xs"
                              fontWeight="600"
                              color={selected ? "#071B63" : "#374151"}
                              transition="all .15s"
                              _hover={{ borderColor: "#071B63", bg: "#f7faff" }}
                              textAlign="left"
                            >
                              <Box color={selected ? "#071B63" : "#9aaabb"} flexShrink={0}>
                                <Icon size={13} />
                              </Box>
                              {s.label}
                            </Box>
                          )
                        })}
                      </Box>
                    </MotionBox>
                  )}

                  {/* ── Étape 2 : Type de bâtiment ── */}
                  {step === 2 && (
                    <MotionBox
                      key="s2"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Text fontSize="xs" fontWeight="700" color="#071B63" mb="3">
                        ÉTAPE 2/3 — Quel type de bâtiment ?
                      </Text>
                      <Box display="grid" gridTemplateColumns="1fr 1fr" gap="2" mb="4">
                        {buildingTypes.map((b) => {
                          const Icon = b.icon
                          const selected = buildingType === b.value
                          return (
                            <Box
                              key={b.value}
                              as="button"
                              onClick={() => setBuildingType(b.value)}
                              display="flex"
                              alignItems="center"
                              gap="2"
                              px="3"
                              py="2.5"
                              borderRadius="xl"
                              border={`1.5px solid ${selected ? "#071B63" : "#e8edf5"}`}
                              bg={selected ? "#f0f3ff" : "white"}
                              fontSize="xs"
                              fontWeight="600"
                              color={selected ? "#071B63" : "#374151"}
                              transition="all .15s"
                              _hover={{ borderColor: "#071B63", bg: "#f7faff" }}
                              textAlign="left"
                            >
                              <Box color={selected ? "#071B63" : "#9aaabb"} flexShrink={0}>
                                <Icon size={13} />
                              </Box>
                              {b.label}
                            </Box>
                          )
                        })}
                      </Box>
                      <Input
                        placeholder="Votre ville ou région (ex. Paris, Lyon…)"
                        fontSize="xs"
                        bg="#f7faff"
                        borderColor="#e2e8f0"
                        borderRadius="xl"
                        value={zone}
                        onChange={(e) => setZone(e.target.value)}
                        mb="4"
                      />
                      <Flex gap="2">
                        <Button
                          onClick={() => setStep(1)}
                          variant="ghost"
                          color="#6b7280"
                          fontSize="xs"
                          px="3"
                          h="8"
                          borderRadius="xl"
                          _hover={{ bg: "#f0f3f9" }}
                        >
                          <LuChevronLeft size={13} />
                        </Button>
                        <Button
                          flex="1"
                          onClick={() => setStep(3)}
                          disabled={!buildingType || !zone.trim()}
                          bg="#071B63"
                          color="white"
                          fontSize="xs"
                          fontWeight="700"
                          h="8"
                          borderRadius="xl"
                          _hover={{ bg: "#071FD6" }}
                          _disabled={{ opacity: 0.4, cursor: "not-allowed" }}
                          transition=".15s"
                        >
                          Continuer →
                        </Button>
                      </Flex>
                    </MotionBox>
                  )}

                  {/* ── Étape 3 : Formulaire ── */}
                  {step === 3 && (
                    <MotionBox
                      key="s3"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Text fontSize="xs" fontWeight="700" color="#071B63" mb="1">
                        ÉTAPE 3/3 — Où envoyer votre lead ?
                      </Text>
                      <Text fontSize="xs" color="#6b7280" mb="3">
                        100% gratuit. Livraison sous 24h.
                      </Text>
                      <Box as="form" onSubmit={handleSubmit}>
                        <VStack gap="2.5" mb="3">
                          <Input
                            required
                            placeholder="Votre prénom"
                            fontSize="xs"
                            bg="#f7faff"
                            borderColor="#e2e8f0"
                            borderRadius="xl"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                          <Input
                            required
                            type="email"
                            placeholder="E-mail professionnel"
                            fontSize="xs"
                            bg="#f7faff"
                            borderColor="#e2e8f0"
                            borderRadius="xl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <Input
                            type="tel"
                            placeholder="Téléphone (optionnel)"
                            fontSize="xs"
                            bg="#f7faff"
                            borderColor="#e2e8f0"
                            borderRadius="xl"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </VStack>
                        {error && (
                          <Text fontSize="xs" color="red.500" mb="2">{error}</Text>
                        )}
                        <Flex gap="2">
                          <Button
                            type="button"
                            onClick={() => setStep(2)}
                            variant="ghost"
                            color="#6b7280"
                            fontSize="xs"
                            px="3"
                            h="9"
                            borderRadius="xl"
                            _hover={{ bg: "#f0f3f9" }}
                          >
                            <LuChevronLeft size={13} />
                          </Button>
                          <Button
                            type="submit"
                            flex="1"
                            disabled={submitting || !firstName.trim() || !email.trim()}
                            bg="#23c55e"
                            color="white"
                            fontSize="xs"
                            fontWeight="700"
                            h="9"
                            borderRadius="xl"
                            _hover={{ bg: "#1da34e" }}
                            _disabled={{ opacity: 0.4, cursor: "not-allowed" }}
                            transition=".15s"
                          >
                            {submitting ? "Envoi…" : "Recevoir mon lead gratuit 🎁"}
                          </Button>
                        </Flex>
                        <Text fontSize="2xs" color="#9aaabb" mt="2.5" textAlign="center">
                          Aucune carte bancaire requise. Résiliation à tout moment.
                        </Text>
                      </Box>
                    </MotionBox>
                  )}

                  {/* ── Succès ── */}
                  {step === 4 && (
                    <MotionBox
                      key="s4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <VStack gap="3" textAlign="center" py="2">
                        <Box
                          w="12"
                          h="12"
                          bg="#ecfdf5"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mx="auto"
                        >
                          <LuCheck size={22} color="#23c55e" />
                        </Box>
                        <Text fontWeight="800" fontSize="sm" color="#071B63">
                          Votre lead est en préparation !
                        </Text>
                        <Text fontSize="xs" color="#6b7280" lineHeight="1.65">
                          Notre équipe sélectionne le meilleur prospect pour votre marché
                          en <Text as="span" fontWeight="700" color="#071B63">{zone}</Text>.
                          Vous le recevrez sous 24h à l'adresse <Text as="span" fontWeight="700" color="#071B63">{email}</Text>.
                        </Text>
                        <Box
                          bg="#f0fdf4"
                          border="1px solid #bbf7d0"
                          borderRadius="xl"
                          px="4"
                          py="3"
                          w="full"
                        >
                          <Text fontSize="xs" color="#166534" fontWeight="600">
                            🎁 100% gratuit — aucun engagement
                          </Text>
                        </Box>
                        <Button
                          onClick={dismiss}
                          variant="ghost"
                          color="#6b7280"
                          fontSize="xs"
                          h="8"
                          borderRadius="xl"
                          _hover={{ bg: "#f0f3f9" }}
                        >
                          Fermer
                        </Button>
                      </VStack>
                    </MotionBox>
                  )}

                </AnimatePresence>
              </Box>
            </Box>
          </MotionBox>
        )}

      </AnimatePresence>
    </Box>
  )
}
