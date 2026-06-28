import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { LuBuilding2, LuDatabase, LuShield, LuUsers } from "react-icons/lu"
import { dataSources, orbitSources } from "@/data/content"

const MotionBox = motion.create(Box)

function OrbitVisual() {
  return (
    <Box position="relative" w="280px" h="280px" mx="auto" my="8">
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="20"
        h="20"
        borderRadius="full"
        bg="#000d4d"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex="1"
        shadow="lg"
      >
        <Text fontSize="xs" fontWeight="bold" color="white" textAlign="center">
          PISTEUR
        </Text>
      </Box>

      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="220px"
        h="220px"
        borderRadius="full"
        border="1px dashed"
        borderColor="gray.300"
      />

      {orbitSources.map((source, i) => {
        const angle = (i * 360) / orbitSources.length
        const rad = (angle * Math.PI) / 180
        const x = Math.cos(rad) * 110
        const y = Math.sin(rad) * 110
        return (
          <Box
            key={source}
            position="absolute"
            top="50%"
            left="50%"
            transform={`translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`}
            px="2"
            py="1"
            borderRadius="md"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            shadow="sm"
          >
            <Text fontSize="2xs" fontWeight="medium" color="#000d4d">
              {source}
            </Text>
          </Box>
        )
      })}
    </Box>
  )
}

export function DataInfra() {
  const sections = [
    {
      icon: LuBuilding2,
      title: "Donnees batiment",
      items: dataSources.batiment,
    },
    {
      icon: LuDatabase,
      title: "Donnees entreprise",
      items: dataSources.entreprise,
    },
    {
      icon: LuUsers,
      title: "Donnees contact",
      items: dataSources.contact,
    },
  ]

  return (
    <Box py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="#f6f8fb">
      <Box maxW="7xl" mx="auto">
        <VStack gap="4" textAlign="center" mb={{ base: "6", md: "10" }}>
          <Text
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="extrabold"
            color="#000d4d"
          >
            Une base construite sur les meilleures sources francaises
          </Text>
          <Text fontSize="md" color="gray.600" maxW="2xl">
            Pisteur agrege, normalise et enrichit des dizaines de sources
            officielles et privees pour creer la base la plus complete sur le
            parc immobilier francais.
          </Text>
        </VStack>

        <OrbitVisual />

        <Flex
          gap="6"
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
          alignItems="stretch"
          mt="8"
        >
          {sections.map((section, i) => {
            const IconComp = section.icon
            return (
              <MotionBox
                key={section.title}
                flex="1"
                maxW="360px"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <VStack
                  h="full"
                  gap="3"
                  p="6"
                  borderRadius="2xl"
                  bg="white"
                  border="1px solid"
                  borderColor="gray.100"
                  shadow="sm"
                  alignItems="flex-start"
                >
                  <Box color="#000d4d">
                    <IconComp size={22} />
                  </Box>
                  <Text fontSize="md" fontWeight="bold" color="#000d4d">
                    {section.title}
                  </Text>
                  <VStack gap="1.5" alignItems="flex-start">
                    {section.items.map((item) => (
                      <Text key={item} fontSize="sm" color="gray.600">
                        {item}
                      </Text>
                    ))}
                  </VStack>
                </VStack>
              </MotionBox>
            )
          })}
        </Flex>

        <Box mt="8" textAlign="center">
          <Flex
            gap="2"
            alignItems="center"
            justifyContent="center"
            color="gray.500"
          >
            <LuShield size={16} />
            <Text fontSize="xs">
              Les contacts sont enrichis uniquement a la demande. Aucune donnee
              personnelle n'est stockee sans base legale conforme au RGPD.
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
