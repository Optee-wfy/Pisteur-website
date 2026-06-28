import { Box, Button, Flex, HStack, Input, Text, Textarea, VStack } from "@chakra-ui/react"
import { LuClock, LuRadar, LuShield } from "react-icons/lu"
import { useState } from "react"
import { activityOptions } from "@/data/content"
import { submitContact } from "@/lib/backend"

export function DemoForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    societe: "",
    activite: "",
    zone: "",
    telephone: "",
    message: "",
    consent: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")
    try {
      await submitContact({ kind: "lead", firstName: form.prenom, lastName: form.nom, email: form.email, phone: form.telephone, company: form.societe, activity: form.activite, zone: form.zone, message: form.message, consent: form.consent, source: "demo" })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible d’envoyer votre demande.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="white">
      <Box maxW="3xl" mx="auto">
        <VStack gap="4" textAlign="center" mb={{ base: "8", md: "12" }}>
          <Text
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="extrabold"
            color="#000d4d"
          >
            Voir Pisteur sur vos vraies cibles
          </Text>
          <Text fontSize="md" color="gray.600" maxW="xl">
            Notre equipe configure Pisteur sur votre ICP reel et vous montre
            les batiments disponibles dans votre marche.
          </Text>
        </VStack>

        {submitted ? (
          <Box
            p="8"
            borderRadius="2xl"
            bg="#f3fff7"
            backdropFilter="blur(8px)"
            border="1px solid"
            borderColor="#ccefd9"
            textAlign="center"
          >
            <Text fontSize="lg" fontWeight="bold" color="#23c55e" mb="2">
              C'est parti !
            </Text>
            <Text fontSize="sm" color="gray.600">
              Notre equipe vous contacte sous 24h pour vous montrer Pisteur sur
              vos vraies cibles.
            </Text>
          </Box>
        ) : (
          <Box
            as="form"
            onSubmit={handleSubmit}
            p={{ base: "5", md: "8" }}
            borderRadius="2xl"
            bg="#f7f9fc"
            backdropFilter="blur(8px)"
            border="1px solid"
            borderColor="#e3e8f2"
            boxShadow="0 18px 55px rgba(0, 13, 77, 0.08)"
          >
            <Flex gap="4" direction={{ base: "column", md: "row" }} mb="4">
              <Box flex="1">
                <Text fontSize="xs" color="#4b587c" mb="1.5">
                  Prenom
                </Text>
                <Input
                  required
                  bg="white"
                  border="1px solid"
                  borderColor="#d8deea"
                  color="#000d4d"
                  placeholder="Jean"
                  borderRadius="lg"
                  value={form.prenom}
                  onChange={(e) =>
                    setForm({ ...form, prenom: e.target.value })
                  }
                />
              </Box>
              <Box flex="1">
                <Text fontSize="xs" color="#4b587c" mb="1.5">
                  Nom
                </Text>
                <Input
                  required
                  bg="white"
                  border="1px solid"
                  borderColor="#d8deea"
                  color="#000d4d"
                  placeholder="Dupont"
                  borderRadius="lg"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                />
              </Box>
            </Flex>

            <Box mb="4">
              <Text fontSize="xs" color="#4b587c" mb="1.5">
                Email professionnel
              </Text>
              <Input
                required
                bg="white"
                border="1px solid"
                borderColor="#d8deea"
                color="#000d4d"
                placeholder="jean@entreprise.fr"
                borderRadius="lg"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Box>

            <Box mb="4">
              <Text fontSize="xs" color="#4b587c" mb="1.5">
                Societe
              </Text>
              <Input
                required
                bg="white"
                border="1px solid"
                borderColor="#d8deea"
                color="#000d4d"
                placeholder="Mon entreprise"
                borderRadius="lg"
                value={form.societe}
                onChange={(e) =>
                  setForm({ ...form, societe: e.target.value })
                }
              />
            </Box>

            <Box mb="4">
              <Text fontSize="xs" color="#4b587c" mb="1.5">
                Activite principale
              </Text>
              <Box
                asChild
              >
                <select
                  required
                  value={form.activite}
                  onChange={(e) =>
                    setForm({ ...form, activite: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: "white",
                    border: "1px solid #d8deea",
                    color: "#000d4d",
                    fontSize: "14px",
                  }}
                >
                  <option value="" style={{ color: "#000d4d" }}>
                    Selectionnez votre activite
                  </option>
                  {activityOptions.map((opt) => (
                    <option key={opt} value={opt} style={{ color: "#000d4d" }}>
                      {opt}
                    </option>
                  ))}
                </select>
              </Box>
            </Box>

            <Box mb="4">
              <Text fontSize="xs" color="#4b587c" mb="1.5">
                Zone geographique cible
              </Text>
              <Input
                bg="white"
                border="1px solid"
                borderColor="#d8deea"
                color="#000d4d"
                placeholder="Ile-de-France, Rhone-Alpes..."
                borderRadius="lg"
                value={form.zone}
                onChange={(e) => setForm({ ...form, zone: e.target.value })}
              />
            </Box>

            <Box mb="4">
              <Text fontSize="xs" color="#4b587c" mb="1.5">Téléphone</Text>
              <Input required type="tel" bg="white" border="1px solid" borderColor="#d8deea" color="#000d4d" placeholder="06 12 34 56 78" borderRadius="lg" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} />
            </Box>

            <Box mb="4">
              <Text fontSize="xs" color="#4b587c" mb="1.5">Votre besoin</Text>
              <Textarea bg="white" border="1px solid" borderColor="#d8deea" color="#000d4d" placeholder="Décrivez votre cible commerciale…" borderRadius="lg" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </Box>

            <HStack gap="2" mb="6">
              <Box asChild>
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(e) =>
                    setForm({ ...form, consent: e.target.checked })
                  }
                  style={{ width: "16px", height: "16px" }}
                />
              </Box>
              <Text fontSize="xs" color="gray.600">
                J'accepte d'etre contacte par l'equipe Pisteur.
              </Text>
            </HStack>

            <Button
              type="submit"
              w="full"
              size="lg"
              bg="#23c55e"
              color="white"
              _hover={{ bg: "#1da34e" }}
              borderRadius="xl"
              disabled={submitting}
            >
              {submitting ? "Envoi en cours…" : "Voir Pisteur sur mes cibles →"}
            </Button>
            {error && <Text mt="3" fontSize="sm" color="red.200" textAlign="center">{error}</Text>}

            <HStack
              gap="6"
              justifyContent="center"
              mt="6"
              flexWrap="wrap"
            >
              <HStack gap="1.5" color="gray.500">
                <LuShield size={14} />
                <Text fontSize="xs">Donnees securisees</Text>
              </HStack>
              <HStack gap="1.5" color="gray.500">
                <LuClock size={14} />
                <Text fontSize="xs">Reponse sous 24h</Text>
              </HStack>
              <HStack gap="1.5" color="gray.500">
                <LuRadar size={14} />
                <Text fontSize="xs">Demo sur votre ICP</Text>
              </HStack>
            </HStack>
          </Box>
        )}
      </Box>
    </Box>
  )
}
