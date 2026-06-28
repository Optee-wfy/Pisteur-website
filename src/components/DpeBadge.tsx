import { Box, Text } from "@chakra-ui/react"

const dpeColors: Record<string, { bg: string; color: string }> = {
  A: { bg: "#319834", color: "white" },
  B: { bg: "#33A357", color: "white" },
  C: { bg: "#8DBD42", color: "#071B3A" },
  D: { bg: "#F2E64B", color: "#332F00" },
  E: { bg: "#F0B443", color: "#332000" },
  F: { bg: "#E67E22", color: "white" },
  G: { bg: "#D73027", color: "white" },
}

export function DpeBadge({ grade, compact = false }: { grade: string; compact?: boolean }) {
  const normalizedGrade = grade.toUpperCase()
  const colors = dpeColors[normalizedGrade] ?? dpeColors.D

  return (
    <Box
      aria-label={`Classe énergétique DPE ${normalizedGrade}`}
      bg={colors.bg}
      color={colors.color}
      h={compact ? "5" : "6"}
      minW={compact ? "12" : "14"}
      pl={compact ? "2" : "2.5"}
      pr={compact ? "3.5" : "4"}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      clipPath="polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)"
      filter="drop-shadow(0 1px 1px rgba(7,27,99,.12))"
      flexShrink="0"
    >
      <Text fontSize={compact ? "2xs" : "xs"} fontWeight="800" lineHeight="1">
        DPE {normalizedGrade}
      </Text>
    </Box>
  )
}
