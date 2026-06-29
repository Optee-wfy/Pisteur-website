import { Box, Button, Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import {
  LuArrowRight,
  LuBuilding2,
  LuCheck,
  LuClipboardList,
  LuFactory,
  LuFlame,
  LuLandmark,
  LuSun,
  LuZap,
} from "react-icons/lu"
import { Link } from "react-router-dom"
import { SEO } from "@/components/SEO"
import { FAQ } from "@/sections/FAQ"
import { Testimonials } from "@/sections/Testimonials"
import { PageHero } from "@/components/PageHero"
import { PageCTA } from "@/sections/PageCTA"
import { RelatedLinks } from "@/components/RelatedLinks"

const AUTH_URL = "https://app.optee.io/auth"
const MotionBox = motion.create(Box)

const relatedVerticals: Record<string, { label: string; to: string; description: string }[]> = {
  "courtage-energie": [
    { label: "Fournisseurs d'énergie", to: "/fournisseurs-energie", description: "Identifiez les sites multi-sites et négociez en position de force." },
    { label: "Rénovation énergétique", to: "/renovation-energetique", description: "Combinez CEE et MaPrimeRénov' pour un pitch décideur irrésistible." },
  ],
  "renovation-energetique": [
    { label: "CVC & équipements", to: "/cvc-equipements", description: "Ciblez les bâtiments avec équipements vieillissants à remplacer." },
    { label: "Solaire & ENR", to: "/solaire-enr", description: "Proposez panneaux et rénovation thermique dans la même visite." },
  ],
  "cvc-equipements": [
    { label: "Rénovation énergétique", to: "/renovation-energetique", description: "Les mêmes bâtiments ont souvent besoin des deux — élargissez votre proposition." },
    { label: "Bureaux d'études", to: "/bureaux-etudes", description: "Ciblez les appels d'offres HVAC avant qu'ils soient publiés." },
  ],
  "solaire-enr": [
    { label: "Rénovation énergétique", to: "/renovation-energetique", description: "Complétez vos installations solaires avec de la rénovation thermique." },
    { label: "Fournisseurs d'énergie", to: "/fournisseurs-energie", description: "Les producteurs ENR cherchent aussi à optimiser leur contrat." },
  ],
  "bureaux-etudes": [
    { label: "CVC & équipements", to: "/cvc-equipements", description: "Identifiez les marchés avant le lancement des appels d'offres." },
    { label: "Services immobiliers", to: "/services-immobiliers", description: "Les gestionnaires d'actifs font appel à vos expertises." },
  ],
  "services-immobiliers": [
    { label: "Bureaux d'études", to: "/bureaux-etudes", description: "Détectez les bâtiments nécessitant audits et diagnostics réglementaires." },
    { label: "Courtage en énergie", to: "/courtage-energie", description: "Proposez l'optimisation énergie à vos clients immobiliers." },
  ],
  "fournisseurs-energie": [
    { label: "Courtage en énergie", to: "/courtage-energie", description: "Ciblez les mêmes bâtiments énergivores avec une approche complémentaire." },
    { label: "Solaire & ENR", to: "/solaire-enr", description: "Les producteurs ENR cherchent aussi à optimiser leurs contrats fournisseurs." },
  ],
}

type VerticalConfig = {
  slug: string
  seoTitle: string
  seoDescription: string
  keywords: string[]
  eyebrow: string
  heroTitle: string
  heroDescription: string
  color: string
  bg: string
  icon: React.ElementType
  signals: string[]
  metrics: { value: string; label: string }[]
  useCases: { title: string; description: string }[]
  ctaText: string
}

const verticalMap: Record<string, VerticalConfig> = {
  "courtage-energie": {
    slug: "courtage-energie",
    seoTitle: "Prospection courtage en énergie — Leads qualifiés bâtiment",
    seoDescription: "Identifiez les bâtiments à forte consommation, les décideurs signataires et le potentiel CEE de chaque prospect. Pisteur génère vos listes en quelques secondes.",
    keywords: ["leads courtage énergie", "prospection CEE", "bâtiments forte consommation", "décideurs énergie bâtiment"],
    eyebrow: "COURTAGE EN ÉNERGIE",
    heroTitle: "Trouvez les bâtiments qui consomment le plus.",
    heroDescription: "Pisteur croise DPE, consommation réelle ENEDIS/GRDF et surface pour vous livrer uniquement les bâtiments où le potentiel CEE justifie l'appel.",
    color: "#071FD6",
    bg: "#eef0fd",
    icon: LuZap,
    signals: [
      "DPE E, F, G détecté automatiquement",
      "Consommation annuelle ENEDIS / GRDF",
      "Surface et année de construction",
      "Gestionnaire signataire nominatif",
      "Potentiel CEE estimé en €",
      "Fin de contrat énergie détectée",
    ],
    metrics: [
      { value: "+40%", label: "de taux de conversion en RDV" },
      { value: "< 5 min", label: "pour générer une liste qualifiée" },
      { value: "95%", label: "de précision sur les données DPE" },
    ],
    useCases: [
      { title: "Ciblage CEE résidentiel collectif", description: "Identifiez les copropriétés avec chauffage collectif fioul/gaz et DPE E/F/G — les plus éligibles aux primes CEE." },
      { title: "Tertiaire haute consommation", description: "Bureaux, hôtels, commerces > 1 000 m² avec > 200 kWh/m²·an : vos prospects les plus rentables en un clic." },
      { title: "Renouvellement de contrat", description: "Pisteur détecte les signaux d'expiration de contrat pour vous positionner au bon moment." },
    ],
    ctaText: "Générer ma liste courtage énergie",
  },
  "renovation-energetique": {
    slug: "renovation-energetique",
    seoTitle: "Prospection rénovation énergétique — Leads copropriétés et bâtiments",
    seoDescription: "Pisteur identifie les bâtiments non isolés, les copropriétés en attente de vote et le financement MaPrimeRénov' mobilisable pour chaque prospect.",
    keywords: ["leads rénovation énergétique", "prospection isolation bâtiment", "copropriétés rénovation", "MaPrimeRénov prospection"],
    eyebrow: "RÉNOVATION ÉNERGÉTIQUE",
    heroTitle: "Les copropriétés prêtes à rénover vous attendent.",
    heroDescription: "Filtrez par DPE, type d'isolation, mode de chauffage et surface. Pisteur calcule le financement mobilisable et vous livre le contact du syndic ou du président de conseil syndical.",
    color: "#f59e0b",
    bg: "#fffbeb",
    icon: LuBuilding2,
    signals: [
      "Isolation non réalisée détectée (BDNB)",
      "Copropriété : nombre de lots et syndic",
      "Chaudière fioul/gaz collective identifiée",
      "MaPrimeRénov' copropriété estimé",
      "DPE collectif E/F/G",
      "Vote assemblée générale récent",
    ],
    metrics: [
      { value: "2/3", label: "des RDV inutiles évités" },
      { value: "32M+", label: "bâtiments analysés en France" },
      { value: "< 10 s", label: "pour obtenir un contact syndic" },
    ],
    useCases: [
      { title: "Copropriétés en chauffage collectif gaz", description: "Identifiez les résidences dont le DPE nécessite un passage en pompe à chaleur collective — et le financement disponible." },
      { title: "Ravalement et isolation extérieure", description: "Bâtiments construits avant 1975 sans ITE : filtrez par zone climatique et surface de façade." },
      { title: "Certification BBC Rénovation", description: "Accompagnez les maîtres d'ouvrage vers le label en ciblant les bâtiments avec les meilleurs ratios coût/gain énergétique." },
    ],
    ctaText: "Générer ma liste rénovation",
  },
  "cvc-equipements": {
    slug: "cvc-equipements",
    seoTitle: "Prospection CVC et équipements bâtiment — Leads qualifiés",
    seoDescription: "Trouvez les bâtiments avec chaudières à remplacer, VMC obsolètes et équipements énergivores. Pisteur identifie le bon décideur et le potentiel chantier.",
    keywords: ["leads CVC bâtiment", "prospection chauffage climatisation", "remplacement chaudière fioul", "VMC bâtiment prospection"],
    eyebrow: "CVC & ÉQUIPEMENTS",
    heroTitle: "Chaudières à remplacer. Vous êtes le bon interlocuteur.",
    heroDescription: "Pisteur détecte les équipements obsolètes ou énergivores — chaudière fioul, VMC simple flux, absence de PAC — et vous donne le contact du gestionnaire à appeler aujourd'hui.",
    color: "#ef4444",
    bg: "#fef2f2",
    icon: LuFlame,
    signals: [
      "Chaudière fioul collective identifiée",
      "VMC simple flux ou absence de VMC",
      "Absence de pompe à chaleur",
      "Consommation > 150 kWh/m²·an",
      "Bâtiment > 10 ans sans audit technique",
      "Gestionnaire maintenance nominatif",
    ],
    metrics: [
      { value: "+60%", label: "de CA sur les bâtiments identifiés" },
      { value: "100+", label: "critères techniques croisés" },
      { value: "95%", label: "de délivrabilité email décideur" },
    ],
    useCases: [
      { title: "Remplacement chaudière fioul", description: "La loi Climat et Résilience interdit les chaudières fioul neuves. Pisteur identifie les parcs encore équipés — et leurs gestionnaires." },
      { title: "Installation PAC tertiaire", description: "Bureaux et commerces sans système PAC : vos prochains projets de climatisation réversible." },
      { title: "Contrats de maintenance", description: "Ciblez les bâtiments multi-logements sans contrat de maintenance connu pour proposer vos offres récurrentes." },
    ],
    ctaText: "Générer ma liste CVC",
  },
  "solaire-enr": {
    slug: "solaire-enr",
    seoTitle: "Prospection solaire photovoltaïque et ENR — Leads bâtiments",
    seoDescription: "Pisteur identifie les toitures > 200 m² orientées sud, les tertiaires à forte consommation diurne et les bâtiments sans installation ENR existante.",
    keywords: ["leads solaire bâtiment", "prospection photovoltaïque", "autoconsommation tertiaire", "installation ENR bâtiment"],
    eyebrow: "SOLAIRE & ENR",
    heroTitle: "32 millions de toitures. Lesquelles valent la prospection ?",
    heroDescription: "Filtrez par surface de toiture, orientation, consommation diurne et absence d'installation existante. Pisteur calcule le potentiel de production et vous livre le décideur.",
    color: "#f59e0b",
    bg: "#fffbeb",
    icon: LuSun,
    signals: [
      "Toiture > 200 m² orientée sud/sud-est",
      "Consommation diurne élevée (tertiaire)",
      "Aucune installation ENR existante",
      "Zone d'irradiation solaire favorable",
      "Propriétaire identifié (SCI, personne morale)",
      "Puissance installable estimée (kWc)",
    ],
    metrics: [
      { value: "280K+", label: "entreprises référencées France" },
      { value: "+40%", label: "de taux de conversion RDV" },
      { value: "3 s", label: "pour générer un email personnalisé IA" },
    ],
    useCases: [
      { title: "Autoconsommation collective tertiaire", description: "Bureaux, entrepôts et surfaces commerciales avec forte consommation diurne — les profils les plus rentables en autoconsommation." },
      { title: "Centrales sur copropriétés", description: "Résidences avec toiture commune > 500 m² et charges électricité élevées : identifiez le syndic pour monter le projet." },
      { title: "Power Purchase Agreement (PPA)", description: "Grands bâtiments publics et tertiaire > 1 000 m² : vos prospects PPA longue durée avec décideur nominatif." },
    ],
    ctaText: "Générer ma liste solaire",
  },
  "bureaux-etudes": {
    slug: "bureaux-etudes",
    seoTitle: "Prospection bureaux d'études énergie — Leads audit et OPERAT",
    seoDescription: "Identifiez les bâtiments obligés OPERAT non conformes, les projets nécessitant un audit DPE et les permis de construire avec RSET requis.",
    keywords: ["leads bureau d'études énergie", "prospection audit DPE", "OPERAT non conformes", "RSET bâtiment prospection"],
    eyebrow: "BUREAUX D'ÉTUDES",
    heroTitle: "Obligés OPERAT non conformes. Votre carnet de commandes.",
    heroDescription: "Le décret tertiaire impose des audits à des milliers de bâtiments encore non conformes. Pisteur vous donne la liste, les surfaces et le responsable technique à contacter.",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    icon: LuClipboardList,
    signals: [
      "Obligé OPERAT non déclaré ou non conforme",
      "Bâtiment > 1 000 m² sans audit énergétique",
      "Permis de construire avec RSET requis",
      "Certification HQE / BREEAM en cours",
      "Responsable technique / DAT identifié",
      "Périmètre ICPE ou ERP concerné",
    ],
    metrics: [
      { value: "40+", label: "sources de données fiables" },
      { value: "100%", label: "opérations réalisables par adresse" },
      { value: "< 5 min", label: "pour définir votre ICP complet" },
    ],
    useCases: [
      { title: "Décret tertiaire OPERAT", description: "Des milliers d'assujettis n'ont pas encore déclaré ou atteint leur objectif -40% en 2030. Pisteur vous donne leur liste par département." },
      { title: "Audits DPE tertiaire obligatoires", description: "Les bâtiments > 1 000 m² sans DPE valide doivent réaliser un audit avant 2026. Ciblez les retardataires." },
      { title: "Assistance à maîtrise d'ouvrage", description: "Promoteurs et collectivités en phase permis : les projets avec RSET requis sont vos missions AMO d'aujourd'hui." },
    ],
    ctaText: "Générer ma liste bureaux d'études",
  },
  "services-immobiliers": {
    slug: "services-immobiliers",
    seoTitle: "Prospection services immobiliers — Leads syndics et propriétaires",
    seoDescription: "Pisteur identifie les syndics de copropriété, les SCI propriétaires et les bâtiments en mutation pour vos offres de gestion, transaction ou facility management.",
    keywords: ["leads services immobiliers", "prospection syndics copropriété", "SCI propriétaires bâtiments", "facility management prospects"],
    eyebrow: "SERVICES IMMOBILIERS",
    heroTitle: "Syndics, SCI, propriétaires. Tous dans une seule liste.",
    heroDescription: "Pisteur croise le registre des copropriétés, MAJIC et Pappers pour vous donner le gestionnaire réel de chaque bâtiment — avec ses coordonnées directes.",
    color: "#0ea5e9",
    bg: "#f0f9ff",
    icon: LuLandmark,
    signals: [
      "Syndic professionnel nominatif (RNIC)",
      "SCI et personne morale propriétaire",
      "Copropriété sans gestionnaire identifié",
      "Bâtiment en mutation (vente/succession)",
      "Nombre de lots et quote-parts",
      "Carences de gestion détectées",
    ],
    metrics: [
      { value: "32M+", label: "actifs immobiliers référencés" },
      { value: "2 884", label: "leads générés depuis le lancement" },
      { value: "+40%", label: "de taux de conversion en RDV" },
    ],
    useCases: [
      { title: "Reprise de mandats syndic", description: "Copropriétés avec syndic bénévole ou non professionnel : identifiez celles qui cherchent à externaliser la gestion." },
      { title: "Facility management multi-sites", description: "Groupes immobiliers avec > 5 bâtiments : un seul contact DRE pour décrocher un contrat multi-lots." },
      { title: "Transactions hors marché", description: "SCI en difficulté, successions en cours, propriétaires âgés : Pisteur vous donne les signaux avant la mise en vente." },
    ],
    ctaText: "Générer ma liste services immobiliers",
  },
  "fournisseurs-energie": {
    slug: "fournisseurs-energie",
    seoTitle: "Prospection fournisseurs d'énergie — Leads grands consommateurs",
    seoDescription: "Identifiez les grands consommateurs d'électricité et de gaz, les fins de contrat imminentes et les décideurs DAF/DG à contacter pour vos offres de fourniture.",
    keywords: ["leads fournisseurs énergie", "prospection grands consommateurs électricité", "fourniture gaz bâtiment", "switch contrat énergie"],
    eyebrow: "FOURNISSEURS D'ÉNERGIE",
    heroTitle: "Les grands consommateurs prêts à changer de fournisseur.",
    heroDescription: "Pisteur calcule la consommation annuelle de chaque bâtiment et détecte les signaux de fin de contrat pour vous permettre d'appeler au bon moment avec la bonne proposition.",
    color: "#23c55e",
    bg: "#f0fdf4",
    icon: LuFactory,
    signals: [
      "Consommation > 200 MWh/an (ENEDIS/GRDF)",
      "Fin de contrat énergie estimée",
      "Bâtiment tertiaire > 500 m²",
      "DAF / Directeur Général identifié",
      "Groupement multi-sites détectable",
      "Potentiel économies estimé en €/an",
    ],
    metrics: [
      { value: "+12M", label: "signaux de marché analysés / mois" },
      { value: "280K+", label: "entreprises référencées France" },
      { value: "95%", label: "de délivrabilité email décideur" },
    ],
    useCases: [
      { title: "Offres sur mesure grands comptes", description: "Industrie et tertiaire > 500 MWh/an : des décideurs DAF qui arbitrent le contrat énergie chaque année." },
      { title: "Switch en fin de contrat", description: "Pisteur détecte les signaux de fin de contrat 3 à 6 mois à l'avance pour que vous soyez le premier à proposer." },
      { title: "Groupements d'achats", description: "Identifiez les fédérations professionnelles et SCI multi-lots pour des contrats groupés à plus fort volume." },
    ],
    ctaText: "Générer ma liste fournisseurs énergie",
  },
}

export function VerticalPage({ vertical }: { vertical: string }) {
  const config = verticalMap[vertical]
  if (!config) return null

  const { icon: Icon } = config

  return (
    <>
      <SEO
        title={config.seoTitle}
        description={config.seoDescription}
        path={`/${config.slug}`}
        keywords={config.keywords}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Pisteur — ${config.eyebrow}`,
          description: config.seoDescription,
          provider: {
            "@type": "Organization",
            name: "Pisteur by CEELAB",
            url: "https://pisteur.io",
          },
          areaServed: "FR",
          serviceType: "Prospection commerciale B2B bâtiment",
          url: `https://pisteur.io/${config.slug}`,
        }}
      />
      <PageHero
        eyebrow={config.eyebrow}
        title={config.heroTitle}
        description={config.heroDescription}
      />

      {/* Signaux clés */}
      <Box py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="#f7faff">
        <Box maxW="7xl" mx="auto">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "10", lg: "16" }} alignItems="center">
            <MotionBox
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <Text color="#00b842" fontSize="sm" fontWeight="bold" mb="3">
                SIGNAUX DÉTECTÉS
              </Text>
              <Text
                as="h2"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="800"
                color="#071B63"
                letterSpacing="-.04em"
                mb="6"
              >
                Les données qui rendent
                <br />
                vos appels crédibles.
              </Text>
              <VStack alignItems="flex-start" gap="3">
                {config.signals.map((sig) => (
                  <HStack key={sig} gap="3" alignItems="flex-start">
                    <Box
                      w="6"
                      h="6"
                      borderRadius="full"
                      bg="#23c55e"
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <LuCheck size={13} />
                    </Box>
                    <Text fontSize="sm" color="#071B63" lineHeight="1.6">
                      {sig}
                    </Text>
                  </HStack>
                ))}
              </VStack>
              <Flex gap="3" mt="8" flexWrap="wrap">
                <Button
                  size="lg"
                  bg="#23c55e"
                  color="white"
                  borderRadius="lg"
                  px="7"
                  _hover={{ bg: "#1da34e", transform: "translateY(-2px)" }}
                  transition="all .22s"
                  asChild
                >
                  <a href={AUTH_URL}>
                    {config.ctaText} <LuArrowRight />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="#071B63"
                  color="#071B63"
                  borderRadius="lg"
                  _hover={{ bg: "#f0f3ff" }}
                  asChild
                >
                  <Link to="/contact">Demander une démo</Link>
                </Button>
              </Flex>
            </MotionBox>

            {/* Metrics */}
            <MotionBox
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <VStack gap="5">
                {config.metrics.map((m, i) => (
                  <Box
                    key={i}
                    w="full"
                    p="6"
                    bg="white"
                    borderRadius="2xl"
                    border="1px solid #e5eaf0"
                    boxShadow="0 8px 28px rgba(7,27,99,.06)"
                  >
                    <Flex alignItems="center" gap="4">
                      <Box
                        w="14"
                        h="14"
                        borderRadius="xl"
                        bg={config.bg}
                        color={config.color}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                      >
                        <Icon size={26} />
                      </Box>
                      <Box>
                        <Text
                          fontSize="3xl"
                          fontWeight="extrabold"
                          color="#23c55e"
                          letterSpacing="-.04em"
                          lineHeight="1"
                        >
                          {m.value}
                        </Text>
                        <Text fontSize="sm" color="#4B587C" mt="1">
                          {m.label}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </MotionBox>
          </SimpleGrid>
        </Box>
      </Box>

      {/* Use cases */}
      <Box py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="white">
        <Box maxW="7xl" mx="auto">
          <VStack textAlign="center" gap="3" mb={{ base: "10", md: "14" }}>
            <Text color="#00b842" fontSize="sm" fontWeight="bold">
              CAS D'USAGE
            </Text>
            <Text
              as="h2"
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="800"
              color="#071B63"
              letterSpacing="-.04em"
            >
              Comment les équipes utilisent Pisteur
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
            {config.useCases.map((uc, i) => (
              <MotionBox
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <VStack
                  alignItems="flex-start"
                  gap="4"
                  h="full"
                  p="6"
                  bg="#f7faff"
                  borderRadius="2xl"
                  border="1px solid #e5eaf0"
                >
                  <Box
                    w="10"
                    h="10"
                    borderRadius="xl"
                    bg={config.bg}
                    color={config.color}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon size={20} />
                  </Box>
                  <Text fontSize="md" fontWeight="bold" color="#071B63">
                    {uc.title}
                  </Text>
                  <Text fontSize="sm" color="#4B587C" lineHeight="1.75">
                    {uc.description}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      <Testimonials />

      <RelatedLinks
        title="SOLUTIONS COMPLÉMENTAIRES"
        links={[
          ...(relatedVerticals[config.slug] ?? []),
          { label: "Nos données", to: "/donnees", description: "Découvrez les 50+ sources officielles qui alimentent chaque prospect." },
        ]}
      />

      <PageCTA title={`Trouvez vos prochains clients en ${config.eyebrow.toLowerCase()} dès maintenant.`} />
      <FAQ pagePath={`/${config.slug}`} />
    </>
  )
}
