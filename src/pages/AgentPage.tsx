import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useState } from "react"
import { LuArrowRight, LuChevronDown, LuFlame, LuSparkles } from "react-icons/lu"
import { Link } from "react-router-dom"
import { SEO } from "@/components/SEO"
import { FAQ } from "@/sections/FAQ"
import { ContactSection } from "@/sections/ContactSection"
import { AgentOfferForm } from "@/sections/AgentOfferForm"
import { MathisOrbitAvatar } from "@/components/MathisOrbitAvatar"
import { Logos } from "@/sections/Logos"

const MotionBox = motion.create(Box)

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionBox>
  )
}

function HoverGrow({ children }: { children: React.ReactNode }) {
  return (
    <MotionBox whileHover={{ scale: 1.08 }} transition={{ duration: 0.35, ease: "easeOut" }}>
      {children}
    </MotionBox>
  )
}

type Step = {
  n: string
  title: string
  text: string
  more: string
  image: string
  alt: string
  glow: string
}

const steps: Step[] = [
  {
    n: "01",
    title: "Il trouve vos prospects avant vous.",
    text: "Mathis interroge en continu la base Pisteur — bâtiments, entreprises, signaux d'opportunité — pour ne retenir que ce qui correspond exactement à votre client idéal.",
    more: "Il croise DPE, surface, activité, localisation et des dizaines d'autres signaux Pisteur pour ne garder que les bâtiments et entreprises qui matchent vraiment votre ICP — pas une liste générique de prospects froids.",
    image: "/mathis/mathis-recherche-ciblage.webp",
    alt: "Mathis recherche et cible les bâtiments correspondant à votre client idéal",
    glow: "#071FD6",
  },
  {
    n: "02",
    title: "Il engage la conversation. Seul.",
    text: "Email personnalisé au bon décideur, message LinkedIn : Mathis initie l'échange avec un ton naturel, jamais générique, jamais robotique.",
    more: "Chaque message est rédigé à partir du contexte réel du bâtiment et du décideur — pas d'un template envoyé en masse. Email et LinkedIn sont synchronisés pour multiplier les points de contact sans jamais spammer.",
    image: "/mathis/mathis-prise-de-contact.webp",
    alt: "Mathis engage la prise de contact automatisée par email et LinkedIn",
    glow: "#23c55e",
  },
  {
    n: "03",
    title: "Il ne lâche jamais une affaire.",
    text: "Pas de réponse ? Mathis relance au bon moment, avec le bon ton — sans jamais harceler un prospect qui a déjà répondu ailleurs.",
    more: "Mathis adapte la fréquence et le ton de ses relances au comportement du prospect : un message ouvert plusieurs fois sans réponse ne reçoit pas la même relance qu'un silence total. Il s'arrête dès qu'un prospect se désinscrit ou répond négativement.",
    image: "/mathis/mathis-relance-intelligente.webp",
    alt: "Mathis relance intelligemment les prospects sans réponse",
    glow: "#071FD6",
  },
  {
    n: "04",
    title: "Il trie le bon grain de l'ivraie.",
    text: "Chaque échange est analysé pour ne remonter que les prospects réellement intéressés — avec tout le contexte pour que vous n'ayez plus qu'à conclure.",
    more: "Il analyse le ton, les questions posées et le contexte de chaque réponse pour distinguer un simple accusé de réception d'un vrai signal d'intérêt commercial, avant de vous transmettre le lead.",
    image: "/mathis/mathis-qualification-leads.webp",
    alt: "Mathis qualifie intelligemment les leads intéressés",
    glow: "#23c55e",
  },
  {
    n: "05",
    title: "Il priorise ce qui rapporte vraiment.",
    text: "Plutôt que de vous noyer sous le volume, Mathis classe en continu les bâtiments et entreprises les plus prometteurs de votre marché.",
    more: "Le score de chaque opportunité est recalculé en continu à mesure que de nouveaux signaux bâtimentaires ou de nouvelles interactions arrivent, pour que votre pipeline reflète toujours les meilleures opportunités du moment.",
    image: "/mathis/mathis-analyse-opportunites.webp",
    alt: "Mathis analyse et trie les meilleures opportunités",
    glow: "#071FD6",
  },
  {
    n: "06",
    title: "Il verrouille le rendez-vous.",
    text: "Quand un prospect est chaud, Mathis propose des créneaux et bloque le rendez-vous directement dans votre agenda. Vous, vous n'avez plus qu'à signer.",
    more: "Il consulte votre agenda en temps réel, propose des créneaux compatibles, gère les reports et envoie les rappels — vous arrivez au rendez-vous avec le contexte complet du prospect.",
    image: "/mathis/mathis-prise-de-rdv.webp",
    alt: "Mathis prend rendez-vous de façon autonome dans votre agenda",
    glow: "#23c55e",
  },
]

function StepRow({ step, index }: { step: Step; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const reverse = index % 2 === 1

  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", md: reverse ? "row-reverse" : "row" }}
      alignItems="center"
      gap={{ base: "8", md: "14" }}
    >
      <Reveal delay={0.05}>
        <VStack alignItems={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }} gap="4" flex="1">
          <Box
            w={{ base: "14", md: "16" }}
            h={{ base: "14", md: "16" }}
            borderRadius="2xl"
            bg={`linear-gradient(135deg, ${step.glow}, #071B63)`}
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="900"
            letterSpacing="-0.02em"
            boxShadow={`0 14px 32px ${step.glow}55`}
            flexShrink={0}
          >
            {step.n}
          </Box>
          <Text
            as="h3"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="900"
            letterSpacing="-0.03em"
            lineHeight="1.15"
            color="#071B63"
          >
            {step.title}
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }} color="#4b587c" lineHeight="1.75" maxW="md">
            {step.text}
          </Text>

          <Box
            as="button"
            onClick={() => setExpanded((v) => !v)}
            display="inline-flex"
            alignItems="center"
            gap="1.5"
            color={step.glow}
            fontWeight="800"
            fontSize="sm"
            bg="transparent"
            border="none"
            cursor="pointer"
            p="0"
            _hover={{ opacity: 0.75 }}
          >
            <Text>{expanded ? "Voir moins" : "En savoir plus"}</Text>
            <MotionBox animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }} display="flex">
              <LuChevronDown size={16} />
            </MotionBox>
          </Box>

          <MotionBox
            initial={false}
            animate={{ opacity: expanded ? 1 : 0, height: expanded ? "auto" : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            overflow="hidden"
            w="full"
          >
            <Box pt="1" pb="1" pl={{ base: "0", md: "4" }} borderLeft={{ base: "none", md: "2px solid" }} borderColor={`${step.glow}55`}>
              <Text fontSize={{ base: "sm", md: "md" }} color="#6b7a99" lineHeight="1.75" maxW="md">
                {step.more}
              </Text>
            </Box>
          </MotionBox>
        </VStack>
      </Reveal>

      <Reveal delay={0.12}>
        <Box flex="1" position="relative" display="flex" justifyContent="center">
          <Box
            position="absolute"
            w="70%"
            h="70%"
            bg={`${step.glow}22`}
            filter="blur(60px)"
            borderRadius="full"
            pointerEvents="none"
          />
          <HoverGrow>
            <Image
              src={step.image}
              alt={step.alt}
              w={{ base: "220px", md: "300px" }}
              position="relative"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </HoverGrow>
        </Box>
      </Reveal>
    </Box>
  )
}

export function AgentPage() {
  return (
    <>
      <SEO
        title="Mathis — Agent IA prospection bâtiment"
        description="Mathis est l'agent IA Pisteur qui recherche vos prospects, engage le contact par email et LinkedIn, qualifie les leads et vous décroche des rendez-vous avec votre client idéal, 24h/24. Offre de lancement à 1 000€/mois pour les 3 premiers clients."
        path="/agent-ia-prospection-batiment"
        keywords={["agent IA prospection", "assistant IA commercial bâtiment", "prospection automatisée B2B", "IA prise de rendez-vous", "Mathis Pisteur"]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Mathis — Agent IA de prospection Pisteur",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: "Agent IA conversationnel qui automatise la recherche, la prise de contact, la relance, la qualification et la prise de rendez-vous en prospection B2B bâtiment.",
          brand: { "@type": "Brand", name: "Pisteur" },
          offers: [
            {
              "@type": "Offer",
              name: "Offre de lancement — 3 premiers clients",
              price: "1000",
              priceCurrency: "EUR",
              availability: "https://schema.org/LimitedAvailability",
              url: "https://pisteur.io/agent-ia-prospection-batiment",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "1000",
                priceCurrency: "EUR",
                unitCode: "MON",
                unitText: "mois",
              },
            },
            {
              "@type": "Offer",
              name: "Tarif standard",
              price: "1500",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              url: "https://pisteur.io/agent-ia-prospection-batiment",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "1500",
                priceCurrency: "EUR",
                unitCode: "MON",
                unitText: "mois",
              },
            },
          ],
        }}
      />

      {/* ── Hero ── */}
      <Box pt={{ base: "28", md: "40" }} pb={{ base: "16", md: "20" }} px={{ base: "4", md: "6" }} bg="white" overflow="hidden" position="relative">
        <Box
          position="absolute"
          w="60%"
          h="60%"
          bg="#23c55e/10"
          filter="blur(120px)"
          top="-10%"
          left="20%"
          borderRadius="full"
          pointerEvents="none"
        />
        <VStack maxW="4xl" mx="auto" textAlign="center" gap="6" position="relative">
          <Reveal>
            <Box display="flex" justifyContent="center">
              <MathisOrbitAvatar size={{ base: "180px", md: "260px" }} ringWidth="6px" duration="5s" />
            </Box>
          </Reveal>
          <Reveal delay={0.06}>
            <HStack gap="1.5" bg="#f0f3ff" color="#071B63" px="3.5" py="1.5" borderRadius="full" fontSize="xs" fontWeight="800">
              <LuSparkles size={13} />
              <Text>NOUVEAU CHEZ PISTEUR</Text>
            </HStack>
          </Reveal>
          <Reveal delay={0.12}>
            <Text
              as="h1"
              fontSize={{ base: "6xl", md: "8xl" }}
              fontWeight="900"
              letterSpacing="-0.05em"
              lineHeight="0.95"
              color="#000d4d"
            >
              Mathis.
            </Text>
          </Reveal>
          <Reveal delay={0.18}>
            <Text
              as="h2"
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="800"
              letterSpacing="-0.03em"
              lineHeight="1.1"
              color="#23c55e"
            >
              L'agent IA qui prospecte à votre place.
            </Text>
          </Reveal>
          <Reveal delay={0.24}>
            <Text fontSize={{ base: "md", md: "xl" }} color="gray.600" lineHeight="1.6" maxW="2xl">
              Il cherche vos prospects. Il les contacte. Il relance. Il qualifie.
              Il prend rendez-vous. Vous, vous n'avez plus qu'à signer.
            </Text>
          </Reveal>
          <Reveal delay={0.3}>
            <HStack gap="3" flexWrap="wrap" justifyContent="center" pt="2">
              <Box
                as="a"
                href="#offre"
                bg="#000d4d"
                color="white"
                fontWeight="800"
                fontSize="sm"
                borderRadius="xl"
                px="7"
                py="4"
                display="inline-flex"
                alignItems="center"
                gap="2"
                transition="all .2s"
                _hover={{ bg: "#10226f", transform: "translateY(-2px)" }}
              >
                Réserver ma place à 1 000€/mois <LuArrowRight size={15} />
              </Box>
              <Box
                as="a"
                href="#ce-quil-fait"
                bg="#f0f3f9"
                color="#000d4d"
                fontWeight="700"
                fontSize="sm"
                borderRadius="xl"
                px="7"
                py="4"
                display="inline-flex"
                alignItems="center"
                transition="all .2s"
                _hover={{ bg: "#e2e8f0" }}
              >
                Voir ce qu'il fait
              </Box>
            </HStack>
          </Reveal>
        </VStack>
      </Box>

      <Logos />

      {/* ── Statement ── */}
      <Box py={{ base: "20", md: "32" }} px={{ base: "4", md: "6" }} bg="#000d4d">
        <Reveal>
          <VStack maxW="4xl" mx="auto" textAlign="center" gap="0">
            <Text
              fontSize={{ base: "3xl", md: "6xl" }}
              fontWeight="800"
              letterSpacing="-0.04em"
              lineHeight="1.15"
              color="whiteAlpha.500"
            >
              Votre prospection tournait
            </Text>
            <Text
              fontSize={{ base: "3xl", md: "6xl" }}
              fontWeight="800"
              letterSpacing="-0.04em"
              lineHeight="1.15"
              color="white"
            >
              à l'huile de coude.
            </Text>
            <Text
              fontSize={{ base: "3xl", md: "6xl" }}
              fontWeight="800"
              letterSpacing="-0.04em"
              lineHeight="1.15"
              color="#23c55e"
              mt="2"
            >
              Maintenant, elle tourne seule.
            </Text>
          </VStack>
        </Reveal>
      </Box>

      {/* ── Features : récit en 6 étapes ── */}
      <Box id="ce-quil-fait" scrollMarginTop="20" py={{ base: "16", md: "20" }} px={{ base: "4", md: "6" }} bg="white">
        <Box maxW="5xl" mx="auto">
          <Reveal>
            <VStack textAlign="center" gap="3" mb={{ base: "16", md: "24" }}>
              <Text color="#00b842" fontSize="xs" fontWeight="800" letterSpacing="widest">
                CE QUE MATHIS FAIT POUR VOUS
              </Text>
              <Text
                as="h2"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="900"
                letterSpacing="-0.04em"
                color="#071B63"
                lineHeight="1.1"
              >
                Toute votre prospection.
                <br />
                Une seule intelligence.
              </Text>
            </VStack>
          </Reveal>

          <VStack gap={{ base: "20", md: "28" }} alignItems="stretch">
            {steps.map((step, i) => (
              <StepRow key={step.n} step={step} index={i} />
            ))}
          </VStack>
        </Box>
      </Box>

      {/* ── Résultat ── */}
      <Box py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="#f7faff" overflow="hidden">
        <Box maxW="4xl" mx="auto" position="relative">
          <Box
            position="absolute"
            w="60%"
            h="60%"
            bg="#23c55e22"
            filter="blur(90px)"
            top="10%"
            left="20%"
            borderRadius="full"
            pointerEvents="none"
          />
          <VStack gap="6" position="relative">
            <Reveal>
              <HoverGrow>
                <Image
                  src="/mathis/mathis-chantiers-qualifies.webp"
                  alt="Résultat : plus de chantiers qualifiés grâce à Mathis"
                  w={{ base: "200px", md: "260px" }}
                />
              </HoverGrow>
            </Reveal>
            <Reveal delay={0.1}>
              <Text
                as="h2"
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight="900"
                letterSpacing="-0.04em"
                lineHeight="1.15"
                color="#071B63"
                textAlign="center"
              >
                Le résultat ? Plus de chantiers qualifiés.
              </Text>
            </Reveal>
            <Reveal delay={0.16}>
              <Text fontSize={{ base: "sm", md: "md" }} color="#4b587c" lineHeight="1.75" textAlign="center" maxW="lg">
                Pas plus de bruit dans votre pipeline — plus de rendez-vous avec des prospects qui ont un vrai besoin, un vrai budget, et qui correspondent exactement à votre client idéal.
              </Text>
            </Reveal>
          </VStack>
        </Box>
      </Box>

      {/* ── 24/7 ── */}
      <Box py={{ base: "20", md: "28" }} px={{ base: "4", md: "6" }} bg="white">
        <Box maxW="4xl" mx="auto" textAlign="center">
          <Reveal>
            <HStack gap="2" justifyContent="center" mb="6">
              <MotionBox
                w="2.5"
                h="2.5"
                borderRadius="full"
                bg="#23c55e"
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <Text fontSize="xs" fontWeight="800" color="#166534" letterSpacing="wide">
                EN LIGNE — TRAVAILLE ACTUELLEMENT POUR SES CLIENTS
              </Text>
            </HStack>
          </Reveal>
          <Reveal delay={0.08}>
            <Text
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="900"
              letterSpacing="-0.04em"
              lineHeight="1.15"
              color="#071B63"
            >
              Il ne dort jamais.
              <br />
              Il ne rate jamais un prospect.
            </Text>
          </Reveal>
          <Reveal delay={0.16}>
            <Text fontSize={{ base: "md", md: "lg" }} color="#4b587c" lineHeight="1.7" mt="5" maxW="xl" mx="auto">
              Week-end compris, Mathis cherche, contacte et relance pendant que votre équipe dort, vend ou prend des congés.
              Zéro prospect perdu faute de suivi.
            </Text>
          </Reveal>
        </Box>
      </Box>

      {/* ── Pricing ── */}
      <Box py={{ base: "20", md: "28" }} px={{ base: "4", md: "6" }} bg="#f7faff">
        <Box maxW="lg" mx="auto">
          <Reveal>
            <VStack
              gap="5"
              p={{ base: "8", md: "10" }}
              bg="#071B63"
              borderRadius="3xl"
              boxShadow="0 30px 80px rgba(7,27,99,.25)"
              position="relative"
            >
              <Box position="absolute" top="-4" right="-4" bg="#23c55e" color="white" px="5" py="2" borderRadius="full" fontSize="xs" fontWeight="800" transform="rotate(6deg)" boxShadow="0 8px 20px rgba(0,0,0,.2)">
                <HStack gap="1.5">
                  <LuFlame size={13} />
                  <Text>3 PLACES SEULEMENT</Text>
                </HStack>
              </Box>
              <Text color="whiteAlpha.700" fontSize="xs" fontWeight="800" letterSpacing="widest">
                OFFRE DE LANCEMENT
              </Text>
              <HStack alignItems="baseline" gap="3" flexWrap="wrap" justifyContent="center">
                <Text fontSize="2xl" color="whiteAlpha.500" textDecoration="line-through" fontWeight="600" whiteSpace="nowrap">
                  1 500€
                </Text>
                <Text fontSize={{ base: "5xl", md: "6xl" }} fontWeight="900" color="white" letterSpacing="-0.04em" whiteSpace="nowrap">
                  1 000€
                </Text>
                <Text color="whiteAlpha.700" fontSize="sm" whiteSpace="nowrap">/ mois</Text>
              </HStack>
              <Text color="whiteAlpha.800" fontSize="sm" textAlign="center" maxW="sm" lineHeight="1.65">
                Réservé aux 3 premiers clients. Tarif verrouillé tant que vous restez client — ensuite, Mathis passe à 1 500€/mois.
              </Text>
              <Box
                as="a"
                href="#offre"
                w="full"
                bg="#23c55e"
                color="white"
                fontWeight="800"
                fontSize="sm"
                borderRadius="xl"
                py="4"
                textAlign="center"
                transition="all .2s"
                _hover={{ bg: "#1da34e", transform: "translateY(-2px)" }}
              >
                Je réserve ma place →
              </Box>
            </VStack>
          </Reveal>
        </Box>
      </Box>

      <AgentOfferForm />

      <ContactSection />

      <FAQ pagePath="/agent-ia-prospection-batiment" />

      <Box py={{ base: "14", md: "20" }} px={{ base: "4", md: "6" }} bg="#f7faff" textAlign="center" borderTop="1px solid #e8ecf5">
        <Text fontSize="sm" color="#6b7280">
          Envie de découvrir Pisteur avant d'activer Mathis ?{" "}
          <Box as={Link} to="/comment-ca-marche" color="#071FD6" fontWeight="700">
            Voir comment ça marche →
          </Box>
        </Text>
      </Box>
    </>
  )
}
