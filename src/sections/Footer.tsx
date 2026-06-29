import { Box, Flex, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { LuMail } from "react-icons/lu"
import { Link } from "react-router-dom"

const footerGroups = [
  {
    title: "Produit",
    links: [
      ["Accueil", "/"],
      ["Comment ça marche", "/comment-ca-marche"],
      ["Nos données", "/donnees"],
      ["Tarifs", "/tarifs"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Courtage en énergie", "/courtage-energie"],
      ["CVC & équipements", "/cvc-equipements"],
      ["Rénovation énergétique", "/renovation-energetique"],
      ["Solaire & ENR", "/solaire-enr"],
      ["Bureaux d’études", "/bureaux-etudes"],
      ["Services immobiliers", "/services-immobiliers"],
      ["Fournisseurs d’énergie", "/fournisseurs-energie"],
    ],
  },
  {
    title: "Ressources",
    links: [
      ["Blog", "/blog"],
      ["Questions fréquentes", "/tarifs#faq"],
      ["Demander une démo", "/contact"],
      ["Support technique", "/support"],
      ["Se connecter", "https://app.optee.io/auth"],
    ],
  },
  {
    title: "Informations",
    links: [
      ["Mentions légales", "/mentions-legales"],
      ["Confidentialité", "/confidentialite"],
      ["Conditions d’utilisation", "/cgu"],
      ["Plan du site", "/#plan-du-site"],
    ],
  },
]

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/optee", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/optee.io", icon: FaInstagram },
  { label: "Facebook", href: "https://www.facebook.com/optee.io", icon: FaFacebookF },
]

export function Footer() {
  return (
    <Box as="footer" id="plan-du-site" bg="#000d4d" color="white" px={{ base: "5", md: "8" }} pt={{ base: "14", md: "18" }} pb={{ base: "8", md: "10" }}>
      <Box maxW="7xl" mx="auto">
        <Flex direction={{ base: "column", lg: "row" }} gap={{ base: "12", lg: "20" }} alignItems="flex-start">
          <VStack alignItems="flex-start" gap="5" maxW={{ lg: "290px" }}>
            <HStack gap="3" asChild>
              <Link to="/">
                <Image src="/logo-pisteur-ai.webp" alt="Logo Pisteur" w="10" h="12" objectFit="cover" borderRadius="lg" />
                <Text fontWeight="bold" fontSize="2xl">Pisteur</Text>
              </Link>
            </HStack>
            <Text fontSize="sm" color="whiteAlpha.700" lineHeight="1.7">Le moteur de prospection qui transforme les données du bâtiment et de l’énergie en opportunités commerciales qualifiées.</Text>
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.500" mb="3">NOUS CONTACTER</Text>
              <HStack as="a" href="mailto:contact@optee.io" gap="2" color="white" _hover={{ color: "#23c55e" }} transition="color .2s"><LuMail size={16} /><Text fontSize="sm">contact@optee.io</Text></HStack>
            </Box>
            <HStack gap="2">
              {socials.map(({ label, href, icon: Icon }) => <Box key={label} as="a" href={href} target="_blank" rel="noreferrer" aria-label={label} w="9" h="9" borderRadius="full" border="1px solid" borderColor="whiteAlpha.300" display="flex" alignItems="center" justifyContent="center" color="whiteAlpha.800" transition="all .2s" _hover={{ bg: "#23c55e", borderColor: "#23c55e", color: "white", transform: "translateY(-2px)" }}><Icon size={15} /></Box>)}
            </HStack>
          </VStack>

          <SimpleGrid flex="1" w="full" columns={{ base: 2, md: 4 }} gap={{ base: "9", md: "12" }}>
            {footerGroups.map((group) => <VStack key={group.title} alignItems="flex-start" gap="3"><Text fontSize="xs" fontWeight="bold" color="white" mb="1">{group.title}</Text>{group.links.map(([label, href]) => href.startsWith("http") ? <Box key={label} as="a" href={href} fontSize="xs" color="whiteAlpha.600" transition="color .2s" _hover={{ color: "white" }}>{label}</Box> : <Box key={label} asChild><Link to={href} style={{ fontSize: ".75rem", color: "rgba(255,255,255,.62)", textDecoration: "none" }}>{label}</Link></Box>)}</VStack>)}
          </SimpleGrid>
        </Flex>

        <Box mt={{ base: "12", md: "16" }} pt="7" borderTop="1px solid" borderColor="whiteAlpha.200">
          <Flex direction={{ base: "column", md: "row" }} justifyContent="space-between" alignItems="center" gap="4" textAlign="center">
            <Text fontSize="2xs" color="whiteAlpha.500">© 2026 CEELAB SAS — Pisteur · Paris, France · Tous droits réservés.</Text>
            <Text fontSize="2xs" color="whiteAlpha.500">Données sécurisées · Hébergement européen · Conformité RGPD</Text>
          </Flex>
          <Text mt="6" textAlign="center" fontSize="xs" color="whiteAlpha.700">Site réalisé par <Box as="a" href="https://webfityou.com" target="_blank" rel="noreferrer" fontWeight="bold" textDecoration="underline" textUnderlineOffset="3px" color="white" _hover={{ color: "#23c55e" }}>WebFitYou</Box></Text>
        </Box>
      </Box>
    </Box>
  )
}
