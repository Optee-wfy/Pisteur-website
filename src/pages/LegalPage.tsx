import { Box, Text, VStack } from "@chakra-ui/react"
import { PageHero } from "@/components/PageHero"
import { SEO } from "@/components/SEO"

const legalContent = {
  mentions: {
    title: "Mentions légales",
    description: "Informations légales relatives au site Pisteur et à son éditeur CEELAB SAS.",
    sections: [
      ["Éditeur du site", "Le site Pisteur est édité par CEELAB SAS, société établie à Paris, France. Contact : contact@optee.io."],
      ["Hébergement", "Le service est exploité sur une infrastructure cloud sécurisée au sein de l’Union européenne."],
      ["Propriété intellectuelle", "La marque Pisteur, ses interfaces, textes, visuels, bases de données et éléments logiciels sont protégés. Toute reproduction non autorisée est interdite."],
      ["Responsabilité", "Pisteur veille à fournir des informations fiables et actualisées, sans pouvoir garantir l’absence totale d’erreurs provenant de sources tierces."],
    ],
  },
  confidentialite: {
    title: "Politique de confidentialité",
    description: "Comment Pisteur collecte, utilise et protège les données personnelles.",
    sections: [
      ["Données collectées", "Nous collectons les informations transmises via les formulaires, les données nécessaires à la gestion des comptes et les mesures techniques indispensables au fonctionnement du service."],
      ["Finalités", "Les données servent à fournir le service, répondre aux demandes, sécuriser la plateforme, améliorer l’expérience et communiquer avec les utilisateurs ayant donné leur accord."],
      ["Base légale et conservation", "Les traitements reposent selon les cas sur l’exécution du contrat, l’intérêt légitime, une obligation légale ou le consentement. Les données sont conservées pendant une durée proportionnée à leur finalité."],
      ["Vos droits", "Vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou la portabilité de vos données en écrivant à contact@optee.io."],
    ],
  },
  cgu: {
    title: "Conditions générales d’utilisation",
    description: "Conditions applicables à l’accès et à l’utilisation de la plateforme Pisteur.",
    sections: [
      ["Objet", "Les présentes conditions encadrent l’accès au site et aux fonctionnalités de prospection proposées par Pisteur."],
      ["Compte utilisateur", "L’utilisateur est responsable de la confidentialité de ses accès, de l’exactitude des informations fournies et de l’usage réalisé depuis son compte."],
      ["Utilisation autorisée", "Le service doit être utilisé dans un cadre professionnel, licite et conforme aux règles applicables à la prospection commerciale et à la protection des données."],
      ["Disponibilité et évolution", "Pisteur peut faire évoluer ses fonctionnalités pour améliorer la qualité, la sécurité et la conformité du service."],
    ],
  },
}

export function LegalPage({ page }: { page: keyof typeof legalContent }) {
  const content = legalContent[page]
  const path = page === "mentions" ? "/mentions-legales" : page === "confidentialite" ? "/confidentialite" : "/cgu"
  return (
    <>
      <SEO title={content.title} description={content.description} path={path} />
      <PageHero eyebrow="INFORMATIONS LÉGALES" title={content.title} description={content.description} />
      <Box py={{ base: "14", md: "20" }} px={{ base: "4", md: "6" }}>
        <VStack maxW="3xl" mx="auto" alignItems="stretch" gap="10">
          {content.sections.map(([title, text]) => <Box key={title}><Text as="h2" fontSize="xl" fontWeight="bold" color="#071B63" mb="3">{title}</Text><Text color="#4B587C" lineHeight="1.8">{text}</Text></Box>)}
          <Text fontSize="xs" color="gray.500">Dernière mise à jour : 27 juin 2026.</Text>
        </VStack>
      </Box>
    </>
  )
}
