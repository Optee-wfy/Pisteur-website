import { Box, Button, Flex, HStack, Image, Input, Text, Textarea, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { LuCheck, LuFlame } from "react-icons/lu"
import { submitContact, publicRpc } from "@/lib/backend"

const MotionBox = motion.create(Box)
const TOTAL_SPOTS = 3

export function AgentOfferForm() {
  const [taken, setTaken] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    activity: "",
    message: "",
  })

  useEffect(() => {
    publicRpc<number>("agent_leads_offer_count", { p_offer: "launch-1000" }).then((count) => {
      if (typeof count === "number") setTaken(count)
    })
  }, [])

  const spotsLeft = taken === null ? null : Math.max(TOTAL_SPOTS - taken, 0)
  const soldOut = spotsLeft === 0

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError("")
    try {
      await submitContact({
        kind: "agent-mathis",
        ...form,
        source: "agent-ia-page",
      })
      setSubmitted(true)
      setTaken((current) => (current === null ? null : current + 1))
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Impossible d’envoyer votre demande pour le moment.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box id="offre" as="section" py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="#f7faff" scrollMarginTop="24">
      <Box maxW="lg" mx="auto">
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <VStack gap="3" textAlign="center" mb="8">
            {spotsLeft !== null && (
              <HStack
                gap="1.5"
                bg={soldOut ? "#f1f5f9" : "#fff1e8"}
                color={soldOut ? "#64748b" : "#c2410c"}
                px="3.5"
                py="1.5"
                borderRadius="full"
                fontSize="xs"
                fontWeight="800"
              >
                <LuFlame size={13} />
                <Text>
                  {soldOut
                    ? "Offre de lancement complète"
                    : `Plus que ${spotsLeft} place${spotsLeft > 1 ? "s" : ""} sur ${TOTAL_SPOTS} à 1 000€/mois`}
                </Text>
              </HStack>
            )}
            <Text as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="900" color="#071B63" letterSpacing="-0.03em">
              Réservez votre place.
            </Text>
            <Text color="#4b587c" fontSize="sm" maxW="sm">
              Laissez-nous vos coordonnées, notre équipe configure Mathis sur votre client idéal et vous recontacte sous 24h.
            </Text>
          </VStack>

          <Box
            bg="white"
            borderRadius="3xl"
            border="1px solid #e1e6ef"
            boxShadow="0 20px 60px rgba(0,13,77,.10)"
            p={{ base: "6", md: "8" }}
          >
            {submitted ? (
              <VStack gap="3" py="6" textAlign="center">
                <Box position="relative" w="16" h="16">
                  <Image src="/mathis-agent-ia-avatar.webp" alt="Mathis" w="full" h="full" borderRadius="full" />
                  <Box
                    position="absolute"
                    bottom="-2px"
                    right="-2px"
                    w="6"
                    h="6"
                    bg="#23c55e"
                    borderRadius="full"
                    border="2px solid white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <LuCheck size={13} color="white" />
                  </Box>
                </Box>
                <Text fontWeight="800" fontSize="lg" color="#071B63">
                  Votre place est réservée !
                </Text>
                <Text color="#6b7280" fontSize="sm" lineHeight="1.7">
                  L’équipe Pisteur vous contacte rapidement pour activer Mathis sur votre compte et le configurer sur votre client idéal.
                </Text>
              </VStack>
            ) : soldOut ? (
              <VStack gap="3" py="6" textAlign="center">
                <Text fontWeight="800" fontSize="lg" color="#071B63">
                  Les 3 places à 1 000€/mois sont prises.
                </Text>
                <Text color="#6b7280" fontSize="sm" lineHeight="1.7">
                  Laissez-nous votre email pour être prévenu si une place se libère, ou découvrez Mathis au tarif standard de 1 500€/mois.
                </Text>
              </VStack>
            ) : (
              <Box as="form" onSubmit={handleSubmit}>
                <Flex direction={{ base: "column", sm: "row" }} gap="3" mb="3">
                  <Input
                    required
                    aria-label="Prénom"
                    placeholder="Prénom"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    bg="#f7f9fc"
                    borderColor="#d8deea"
                  />
                  <Input
                    required
                    aria-label="Nom"
                    placeholder="Nom"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    bg="#f7f9fc"
                    borderColor="#d8deea"
                  />
                </Flex>
                <Input
                  required
                  type="email"
                  aria-label="E-mail professionnel"
                  placeholder="E-mail professionnel"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  bg="#f7f9fc"
                  borderColor="#d8deea"
                  mb="3"
                />
                <Flex direction={{ base: "column", sm: "row" }} gap="3" mb="3">
                  <Input
                    required
                    aria-label="Entreprise"
                    placeholder="Entreprise"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    bg="#f7f9fc"
                    borderColor="#d8deea"
                  />
                  <Input
                    type="tel"
                    aria-label="Téléphone"
                    placeholder="Téléphone (optionnel)"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    bg="#f7f9fc"
                    borderColor="#d8deea"
                  />
                </Flex>
                <Textarea
                  aria-label="Votre client idéal"
                  placeholder="Votre client idéal, votre secteur… (optionnel)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  bg="#f7f9fc"
                  borderColor="#d8deea"
                  minH="90px"
                  mb="4"
                />
                <Button
                  type="submit"
                  w="full"
                  bg="#23c55e"
                  color="white"
                  fontWeight="800"
                  fontSize="sm"
                  borderRadius="xl"
                  py="3.5"
                  h="auto"
                  transition="all .18s"
                  _hover={{ bg: "#1da34e", transform: "translateY(-1px)" }}
                  disabled={submitting}
                  opacity={submitting ? 0.7 : 1}
                >
                  {submitting ? "Envoi en cours…" : "Réserver ma place à 1 000€/mois"}
                </Button>
                <Text fontSize="2xs" color="#9aaabb" mt="3" textAlign="center">
                  Tarif verrouillé tant que vous restez client. Sans engagement de durée.
                </Text>
                {error && (
                  <Text color="red.600" fontSize="sm" mt="3" textAlign="center">
                    {error}
                  </Text>
                )}
              </Box>
            )}
          </Box>
        </MotionBox>
      </Box>
    </Box>
  )
}
