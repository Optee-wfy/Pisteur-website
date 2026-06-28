import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { submitContact } from "@/lib/backend";

const GOOGLE_BUSINESS_URL = "https://share.google/TZfN2gdM3GjaIbIGm";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await submitContact({
        kind: "lead",
        ...form,
        source: "contact-home",
      });
      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Impossible d’envoyer votre demande pour le moment.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      as="section"
      id="contact"
      py={{ base: "16", md: "24" }}
      px={{ base: "4", md: "6" }}
      bg="#f7f9fc"
    >
      <Box maxW="7xl" mx="auto">
        <VStack textAlign="center" gap="3" mb={{ base: "9", md: "12" }}>
          <Text
            color="#00a84f"
            fontSize="xs"
            fontWeight="bold"
            letterSpacing=".12em"
          >
            NOUS CONTACTER
          </Text>
          <Text
            as="h2"
            color="#000d4d"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            letterSpacing="-.04em"
          >
            Parlons de vos prochaines opportunités.
          </Text>
          <Text color="gray.600" maxW="2xl" lineHeight="1.7">
            Une question ou un projet ? Écrivez-nous. L’équipe Pisteur vous
            répond dans les meilleurs délais.
          </Text>
        </VStack>

        <Grid
          templateColumns={{ base: "1fr", lg: "1.05fr .95fr" }}
          gap={{ base: "6", lg: "8" }}
          alignItems="stretch"
        >
          <Box
            bg="white"
            borderRadius="3xl"
            overflow="hidden"
            border="1px solid #e1e6ef"
            boxShadow="0 18px 50px rgba(0, 13, 77, .08)"
            minH={{ base: "360px", lg: "100%" }}
          >
            <iframe
              title="Pisteur — 10 rue Réaumur, 75003 Paris"
              src="https://www.google.com/maps?q=10%20rue%20R%C3%A9aumur%2C%2075003%20Paris%2C%20France&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, minHeight: "360px", display: "block" }}
              allowFullScreen
            />
          </Box>

          <VStack alignItems="stretch" gap="5">
            <Box
              bg="white"
              borderRadius="3xl"
              border="1px solid #e1e6ef"
              boxShadow="0 18px 50px rgba(0, 13, 77, .08)"
              p={{ base: "5", md: "7" }}
            >
              <Text color="#000d4d" fontSize="xl" fontWeight="bold" mb="5">
                Envoyez-nous un message
              </Text>
              {submitted ? (
                <Box
                  p="6"
                  bg="#effcf4"
                  border="1px solid #b9efca"
                  borderRadius="2xl"
                  textAlign="center"
                >
                  <Text color="#08783e" fontWeight="bold" fontSize="lg">
                    Merci, votre message est bien envoyé.
                  </Text>
                  <Text color="gray.600" fontSize="sm" mt="2">
                    L’équipe Pisteur revient vers vous rapidement.
                  </Text>
                </Box>
              ) : (
                <Box as="form" onSubmit={handleSubmit}>
                  <Flex
                    direction={{ base: "column", sm: "row" }}
                    gap="3"
                    mb="3"
                  >
                    <Input
                      required
                      aria-label="Prénom"
                      placeholder="Prénom"
                      value={form.firstName}
                      onChange={(event) =>
                        setForm({ ...form, firstName: event.target.value })
                      }
                      bg="#f7f9fc"
                      borderColor="#d8deea"
                    />
                    <Input
                      required
                      aria-label="Nom"
                      placeholder="Nom"
                      value={form.lastName}
                      onChange={(event) =>
                        setForm({ ...form, lastName: event.target.value })
                      }
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
                    onChange={(event) =>
                      setForm({ ...form, email: event.target.value })
                    }
                    bg="#f7f9fc"
                    borderColor="#d8deea"
                    mb="3"
                  />
                  <Input
                    type="tel"
                    aria-label="Téléphone"
                    placeholder="Téléphone"
                    value={form.phone}
                    onChange={(event) =>
                      setForm({ ...form, phone: event.target.value })
                    }
                    bg="#f7f9fc"
                    borderColor="#d8deea"
                    mb="3"
                  />
                  <Textarea
                    required
                    aria-label="Votre message"
                    placeholder="Comment pouvons-nous vous aider ?"
                    value={form.message}
                    onChange={(event) =>
                      setForm({ ...form, message: event.target.value })
                    }
                    bg="#f7f9fc"
                    borderColor="#d8deea"
                    minH="120px"
                    mb="3"
                  />
                  <HStack alignItems="flex-start" gap="2" mb="5">
                    <input
                      required
                      aria-label="Accepter d’être contacté"
                      type="checkbox"
                      checked={form.consent}
                      onChange={(event) =>
                        setForm({ ...form, consent: event.target.checked })
                      }
                      style={{
                        width: "16px",
                        height: "16px",
                        marginTop: "2px",
                      }}
                    />
                    <Text color="gray.600" fontSize="xs">
                      J’accepte d’être contacté par l’équipe Pisteur.
                    </Text>
                  </HStack>
                  <Button
                    type="submit"
                    w="full"
                    bg="#23c55e"
                    color="white"
                    fontWeight="bold"
                    _hover={{ bg: "#1da34e" }}
                    _active={{ bg: "#16893f" }}
                    disabled={submitting}
                  >
                    {submitting ? "Envoi en cours…" : "Envoyer mon message"}
                  </Button>
                  {error && (
                    <Text
                      color="red.600"
                      fontSize="sm"
                      mt="3"
                      textAlign="center"
                    >
                      {error}
                    </Text>
                  )}
                </Box>
              )}
            </Box>

            <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap="4">
              <VStack
                alignItems="flex-start"
                gap="3"
                bg="white"
                border="1px solid #e1e6ef"
                borderRadius="2xl"
                p="5"
              >
                <HStack color="#000d4d">
                  <LuMapPin />
                  <Text fontWeight="bold">Pisteur</Text>
                </HStack>
                <Text color="gray.600" fontSize="sm" lineHeight="1.7">
                  10 rue Réaumur
                  <br />
                  75003 Paris
                  <br />
                  France
                </Text>
                <HStack
                  as="a"
                  href="tel:+33620432059"
                  color="#000d4d"
                  _hover={{ color: "#00a84f" }}
                >
                  <LuPhone />
                  <Text fontSize="sm">06 20 43 20 59</Text>
                </HStack>
                <HStack
                  as="a"
                  href="mailto:maxime@pisteur.io"
                  color="#000d4d"
                  _hover={{ color: "#00a84f" }}
                >
                  <LuMail />
                  <Text fontSize="sm">maxime@pisteur.io</Text>
                </HStack>
              </VStack>

              <VStack
                as="a"
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noreferrer"
                alignItems="flex-start"
                justifyContent="center"
                gap="3"
                bg="white"
                border="1px solid #e1e6ef"
                borderRadius="2xl"
                p="5"
                transition="all .2s"
                _hover={{
                  borderColor: "#23c55e",
                  transform: "translateY(-2px)",
                }}
                aria-label="Voir Pisteur sur Google"
              >
                <HStack gap="2">
                  <FcGoogle size={25} />
                  <Text color="#000d4d" fontWeight="bold">
                    Pisteur
                  </Text>
                </HStack>
                <HStack
                  gap="1"
                  color="#fbbc04"
                  aria-label="5 étoiles sur Google"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} size={18} />
                  ))}
                </HStack>
                <Text color="gray.600" fontSize="xs">
                  Voir notre fiche Google
                </Text>
              </VStack>
            </Grid>
          </VStack>
        </Grid>
      </Box>
    </Box>
  );
}
