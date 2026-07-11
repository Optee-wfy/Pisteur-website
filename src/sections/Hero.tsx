import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  LuArrowRight,
  LuBuilding2,
  LuCheck,
  LuClipboardList,
  LuDownload,
  LuFactory,
  LuFlame,
  LuLandmark,
  LuMapPin,
  LuSparkles,
  LuSun,
  LuWrench,
  LuZap,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import { leads } from "@/data/content";
import { DpeBadge } from "@/components/DpeBadge";

const MotionBox = motion.create(Box);
const AUTH_URL = "https://app.optee.io/auth";

function ProductPreview() {
  return (
    <Box
      bg="white"
      borderRadius={{ base: "2xl", md: "3xl" }}
      shadow="0 28px 80px rgba(0,13,77,.16)"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
    >
      <Flex
        bg="#f8fafc"
        px={{ base: "3", md: "5" }}
        py="3"
        borderBottomWidth="1px"
        borderColor="gray.200"
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack gap="2">
          <Image
            src="/logo-pisteur-ai.webp"
            alt="Logo Pisteur"
            w="6"
            h="7"
            objectFit="cover"
            borderRadius="sm"
          />
          <Text fontSize="sm" fontWeight="bold">
            Pisteur
          </Text>
        </HStack>
        <HStack gap="1.5">
          <Box w="2.5" h="2.5" borderRadius="full" bg="red.300" />
          <Box w="2.5" h="2.5" borderRadius="full" bg="yellow.300" />
          <Box w="2.5" h="2.5" borderRadius="full" bg="green.300" />
        </HStack>
      </Flex>
      <Box p={{ base: "3", md: "5" }}>
        <Flex
          justifyContent="space-between"
          alignItems={{ base: "flex-start", sm: "center" }}
          gap="3"
          mb="4"
          direction={{ base: "column", sm: "row" }}
        >
          <Box>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="bold"
              color="#000d4d"
            >
              Ma nouvelle recherche
            </Text>
            <Text fontSize="xs" color="gray.500">
              Courtage en énergie · Île-de-France
            </Text>
          </Box>
          <Button
            size="sm"
            bg="#23c55e"
            color="white"
            borderRadius="lg"
            _hover={{ bg: "#1da34e", transform: "translateY(-1px)" }}
            asChild
          >
            <a href={AUTH_URL}>
              Générer ma liste <LuSparkles />
            </a>
          </Button>
        </Flex>
        <Flex gap="2" mb="4" flexWrap="wrap">
          {[
            "Courtage en énergie",
            "50 km",
            "10–250 salariés",
            "Forte consommation",
          ].map((filter) => (
            <Badge
              key={filter}
              px="2.5"
              py="1.5"
              bg="#f3f6fa"
              color="#000d4d"
              borderRadius="lg"
              fontSize="2xs"
            >
              {filter}
            </Badge>
          ))}
        </Flex>
        <Flex
          px="3"
          pb="2"
          color="gray.400"
          fontSize="2xs"
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="wide"
        >
          <Text flex="1">Prospect détecté</Text>
          <Text w="20">Signal</Text>
          <Text w="14" textAlign="center">
            DPE
          </Text>
        </Flex>
        <VStack gap="2" alignItems="stretch">
          {leads.map((lead, i) => (
            <Flex
              key={lead.address}
              px="3"
              py="3"
              borderRadius="xl"
              bg={i === 0 ? "#f2fff6" : "#f8fafc"}
              border="1px solid"
              borderColor={i === 0 ? "#b9efca" : "gray.100"}
              alignItems="center"
              gap="2"
              transition="all .2s"
              _hover={{ borderColor: "#23c55e", transform: "translateX(2px)" }}
            >
              <HStack flex="1" minW="0" gap="2.5">
                <Box
                  p="2"
                  borderRadius="lg"
                  bg="white"
                  color={i === 0 ? "#23c55e" : "#70809c"}
                >
                  <LuBuilding2 size={15} />
                </Box>
                <Box minW="0">
                  <HStack gap="1">
                    <LuMapPin size={11} />
                    <Text fontSize="xs" fontWeight="semibold" lineClamp={1}>
                      {lead.address}
                    </Text>
                  </HStack>
                  <Text fontSize="2xs" color="gray.500" lineClamp={1}>
                    {lead.manager} · {lead.surface}
                  </Text>
                </Box>
              </HStack>
              <Badge
                w="20"
                textAlign="center"
                bg={i === 0 ? "#dcfce7" : "#eaf0f7"}
                color={i === 0 ? "#15803d" : "#52627a"}
                fontSize="2xs"
                borderRadius="full"
                py="1"
              >
                {i === 0 ? "Projet détecté" : "À contacter"}
              </Badge>
              <DpeBadge grade={lead.dpe} compact />
            </Flex>
          ))}
        </VStack>
        <Flex
          mt="4"
          pt="4"
          borderTopWidth="1px"
          borderColor="gray.100"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="xs" color="gray.500">
            307 prospects correspondent à votre cible
          </Text>
          <Button
            size="xs"
            bg="white"
            color="#008f3e"
            border="1px solid #00bd59"
            borderRadius="lg"
            boxShadow="0 4px 12px rgba(0, 189, 89, 0.12)"
            transition="all .2s ease"
            _hover={{
              bg: "#effcf4",
              color: "#007a35",
              borderColor: "#009f4b",
              transform: "translateY(-1px)",
              boxShadow: "0 7px 16px rgba(0, 189, 89, 0.18)",
            }}
          >
            <LuDownload /> Exporter en CSV
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export function Hero() {
  return (
    <Box
      pt={{ base: "28", md: "36" }}
      pb={{ base: "16", md: "24" }}
      px={{ base: "4", md: "6" }}
      bg="white"
      overflow="hidden"
    >
      <Flex
        maxW="7xl"
        mx="auto"
        direction={{ base: "column", lg: "row" }}
        gap={{ base: "12", lg: "14" }}
        alignItems="center"
      >
        <VStack flex=".9" alignItems="flex-start" gap="7">
          <Text
            as="h1"
            fontSize={{ base: "5xl", md: "7xl", lg: "76px" }}
            fontWeight="800"
            letterSpacing="-0.06em"
            lineHeight=".96"
            color="#000d4d"
          >
            Moins de recherche.
            <br />
            <Box as="span" color="#23c55e">
              Plus d’action.
            </Box>
          </Text>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.600"
            lineHeight="1.7"
            maxW="lg"
          >
            Détectez les meilleures opportunités, identifiez les décideurs et
            concentrez-vous sur ce qui compte : développer votre activité.
          </Text>
          <VStack alignItems="stretch" gap="3">
            {[
              "Les bons bâtiments",
              "Les bons contacts",
              "Au bon moment",
              "En quelques secondes",
            ].map((item) => (
              <HStack key={item} gap="2.5">
                <Box color="#23c55e">
                  <LuCheck size={16} />
                </Box>
                <Text fontSize="sm" color="#323878">
                  {item}
                </Text>
              </HStack>
            ))}
          </VStack>
          <HStack gap="3" flexWrap="wrap">
            <Button
              size="lg"
              bg="#23c55e"
              color="white"
              border="1px solid"
              borderColor="#23c55e"
              borderRadius="lg"
              px="7"
              boxShadow="0 8px 20px rgba(7,27,99,.10)"
              transition="all .22s ease"
              _hover={{
                bg: "#1da34e",
                borderColor: "#1da34e",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 28px rgba(7,27,99,.16)",
              }}
              _active={{
                transform: "translateY(0)",
                boxShadow: "0 6px 14px rgba(7,27,99,.10)",
              }}
              asChild
            >
              <Link to="/contact">
                Demander une démo <LuArrowRight />
              </Link>
            </Button>
            <Button
              size="lg"
              bg="#eef1f5"
              color="#000d4d"
              border="1px solid"
              borderColor="#dfe4eb"
              borderRadius="lg"
              boxShadow="0 8px 20px rgba(7,27,99,.10)"
              transition="all .22s ease"
              _hover={{
                bg: "#dfe5ec",
                color: "#000d4d",
                borderColor: "#cfd6df",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 28px rgba(7,27,99,.16)",
              }}
              _active={{
                transform: "translateY(0)",
                boxShadow: "0 6px 14px rgba(7,27,99,.10)",
              }}
              asChild
            >
              <Link to="/comment-ca-marche">Voir comment ça marche</Link>
            </Button>
          </HStack>
        </VStack>
        <Box flex="1.1" w="full" position="relative">
          <Box
            position="absolute"
            w="80%"
            h="80%"
            bg="#23c55e/8"
            filter="blur(80px)"
            top="10%"
            left="10%"
            borderRadius="full"
          />
          <MotionBox
            position="relative"
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
          >
            <ProductPreview />
          </MotionBox>
        </Box>
      </Flex>
    </Box>
  );
}
