import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { LuDatabase, LuFileText, LuBuilding2, LuZap, LuUsers, LuMapPin } from "react-icons/lu"
import { Link } from "react-router-dom"
import { LuArrowRight } from "react-icons/lu"

const MotionBox = motion.create(Box)

const sources = [
  {
    icon: LuBuilding2,
    name: "BDNB / Cadastre",
    desc: "Caractéristiques physiques de chaque bâtiment (surface, année, usage, DPE)",
    color: "#071FD6",
    bg: "#eef0fd",
  },
  {
    icon: LuZap,
    name: "ENEDIS / GRDF",
    desc: "Consommation électrique et gaz réelle par point de livraison",
    color: "#f59e0b",
    bg: "#fef3c7",
  },
  {
    icon: LuFileText,
    name: "SIRENE / Pappers",
    desc: "Données juridiques, effectifs, chiffre d'affaires et structure de l'entreprise",
    color: "#059669",
    bg: "#ecfdf5",
  },
  {
    icon: LuUsers,
    name: "Décideurs vérifiés",
    desc: "Dirigeants, DPO, facility managers — mobile, mail et LinkedIn vérifiés",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: LuDatabase,
    name: "Permis de construire",
    desc: "Projets déclarés en mairie — chantiers avant même l'appel d'offres",
    color: "#dc2626",
    bg: "#fef2f2",
  },
  {
    icon: LuMapPin,
    name: "Géolocalisation",
    desc: "Zone de chalandise, département, commune ou rayon GPS configurable",
    color: "#0891b2",
    bg: "#e0f2fe",
  },
]

export function DataSources() {
  return (
    <Box as="section" py={{ base: "16", md: "22" }} px={{ base: "4", md: "6" }} bg="white">
      <Box maxW="6xl" mx="auto">

        <MotionBox
          textAlign="center"
          mb={{ base: "10", md: "14" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Text fontSize="xs" fontWeight="bold" color="#071FD6" letterSpacing="widest" mb="3">
            INFRASTRUCTURE DE DONNÉES
          </Text>
          <Text
            as="h2"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="900"
            color="#071B63"
            letterSpacing="-0.03em"
            lineHeight="1.15"
            mb="3"
          >
            Des sources officielles. Une intelligence commerciale.
          </Text>
          <Text fontSize="sm" color="#6b7280" maxW="500px" mx="auto">
            Pisteur agrège des bases de données publiques et privées pour qualifier chaque opportunité avant que vous ne décrochiez le téléphone.
          </Text>
        </MotionBox>

        <Grid
          templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }}
          gap="4"
          mb="8"
        >
          {sources.map((src, i) => {
            const Icon = src.icon
            return (
              <MotionBox
                key={src.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Box
                  bg="#f8faff"
                  border="1px solid #e8ecf5"
                  borderRadius="2xl"
                  p="5"
                  h="full"
                  _hover={{ borderColor: src.color + "44", boxShadow: `0 4px 24px ${src.color}15` }}
                  transition="all .25s"
                >
                  <HStack gap="3" mb="3">
                    <Box
                      w="9"
                      h="9"
                      borderRadius="xl"
                      bg={src.bg}
                      color={src.color}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Icon size={16} />
                    </Box>
                    <Text fontSize="sm" fontWeight="800" color="#071B63">{src.name}</Text>
                  </HStack>
                  <Text fontSize="xs" color="#6b7280" lineHeight="1.7">{src.desc}</Text>
                </Box>
              </MotionBox>
            )
          })}
        </Grid>

        <MotionBox
          textAlign="center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <HStack gap="1.5" justifyContent="center" color="#071FD6" fontSize="sm" fontWeight="600" asChild>
            <Link to="/donnees">
              <Text>Découvrir toutes nos sources de données</Text>
              <LuArrowRight size={14} />
            </Link>
          </HStack>
        </MotionBox>

      </Box>
    </Box>
  )
}
