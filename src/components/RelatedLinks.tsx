import { Box, Grid, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { LuArrowRight } from "react-icons/lu"

type RelatedLink = {
  label: string
  description: string
  to: string
}

export function RelatedLinks({ title = "EXPLORER", links }: { title?: string; links: RelatedLink[] }) {
  const cols = Math.min(links.length, 3)
  return (
    <Box py={{ base: "10", md: "14" }} px={{ base: "4", md: "6" }} bg="white" borderTop="1px solid #edf0f7">
      <Box maxW="5xl" mx="auto">
        <Text fontSize="xs" fontWeight="700" color="#071B63" letterSpacing="widest" mb="6" textAlign="center">
          {title}
        </Text>
        <Grid templateColumns={{ base: "1fr", md: `repeat(${cols}, 1fr)` }} gap="4">
          {links.map((link) => (
            <Box
              key={link.to}
              as={Link}
              to={link.to}
              display="block"
              p="5"
              borderRadius="xl"
              border="1.5px solid #e8edf5"
              transition="all .2s"
              _hover={{ borderColor: "#071B63", bg: "#f7faff", transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(7,27,99,.08)" }}
            >
              <Text fontWeight="700" fontSize="sm" color="#071B63" mb="1.5" lineHeight="1.3">
                {link.label}
              </Text>
              <Text fontSize="xs" color="#6b7280" lineHeight="1.6" mb="3">
                {link.description}
              </Text>
              <Text fontSize="xs" color="#071FD6" fontWeight="700" display="flex" alignItems="center" gap="1">
                Découvrir <LuArrowRight size={11} />
              </Text>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
