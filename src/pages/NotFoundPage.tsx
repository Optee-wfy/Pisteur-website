import { Box, Button, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { SEO } from "@/components/SEO"

export function NotFoundPage() {
  return (
    <><SEO title="Page introuvable" description="La page demandée n’existe pas ou a été déplacée." path="/404" noIndex /><Box minH="70vh" pt={{ base: "32", md: "40" }} px="4" bg="#f7faff">
      <VStack gap="5" textAlign="center">
        <Text color="#00b842" fontWeight="bold">ERREUR 404</Text>
        <Text as="h1" fontSize={{ base: "4xl", md: "6xl" }} fontWeight="800" letterSpacing="-.05em" color="#071B63">Cette page reste introuvable.</Text>
        <Text color="#4B587C">Revenez à l’accueil pour continuer votre exploration de Pisteur.</Text>
        <Button bg="#23c55e" color="white" borderRadius="lg" asChild><Link to="/">Retour à l’accueil</Link></Button>
      </VStack>
    </Box></>
  )
}
