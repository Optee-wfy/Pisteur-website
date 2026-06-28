export const navLinks = [
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Nos données", href: "#donnees" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Cas d'usage", href: "#cas-usage" },
  { label: "Blog", href: "#blog" },
]

export const stats = [
  { value: "1,2M+", label: "Bâtiments analysés en France" },
  { value: "100+", label: "Critères de filtrage signal bâtiment" },
  { value: "2 884", label: "Leads générés depuis le lancement" },
  { value: "100%", label: "Opérations réalisables par adresse" },
]

export const logos = [
  "Mon Courtier Energie",
  "Place des Energies",
  "UNIS",
  "FNAIM",
  "Emera",
  "Mieux Renover",
  "Calomatech",
  "CBRE",
]

export const leads = [
  {
    address: "22 av. de la Paix, Strasbourg",
    manager: "Foncia Alsace",
    match: 67,
    potential: "101 900",
    dpe: "F",
    surface: "3 200 m2",
  },
  {
    address: "56 rue du Docteur Lebegue, Enghien",
    manager: "1001 Vies Habitat",
    match: 72,
    potential: "21 600",
    dpe: "E",
    surface: "1 800 m2",
  },
  {
    address: "33 av. de Ceinture, Enghien",
    manager: "Foncia Lacombe Vauban",
    match: 83,
    potential: "29 400",
    dpe: "G",
    surface: "2 450 m2",
  },
]

export const howItWorksCards = [
  {
    title: "Votre ICP en 5 minutes chrono",
    text: "Type de bâtiment, code NAF, chauffage, DPE, surface. Pisteur croise 100+ signaux pour ne vous livrer que les bâtiments où vous avez une vraie chance de signer.",
    tags: [
      "Type bâtiment",
      "Code NAF",
      "Chauffage",
      "DPE",
      "Localisation",
      "Surface",
      "+94 critères",
    ],
  },
  {
    title: "Le lead parfait dans votre boîte mail",
    text: "Chaque lead = un bâtiment + son gestionnaire + le bon décideur à appeler — avec son email, son téléphone et son LinkedIn.",
    items: [
      "Adresse + DPE + surface + énergie",
      "Entreprise gestionnaire + code NAF",
      "Contacts nominatifs : DG, PDG, Syndic",
      "Email · Téléphone · LinkedIn",
      "Potentiel chantier estimé en euros",
    ],
  },
  {
    title: "Un email personnalisé en 3 secondes",
    text: "Pisteur génère un email qui cite le bâtiment exact, ses données énergétiques réelles et le prénom du décideur.",
    steps: [
      "Choisissez le bâtiment + l'opération",
      "Sélectionnez le contexte + l'intention",
      "L'IA génère l'email en 3 secondes",
      "Score 0-100 validé · Envoi depuis Gmail",
    ],
  },
]

export const impactCards = [
  {
    stat: "+40%",
    title: "de taux de conversion en rendez-vous",
    before: "Prospection généraliste sans données bâtiment",
    after: "Avec le DPE, la surface et le gestionnaire identifié, chaque appel est contextualisé et crédible.",
  },
  {
    stat: "2/3",
    title: "des rendez-vous inutiles évités",
    before: "RDV pris sans qualification",
    after: "Pisteur cible uniquement les bâtiments où votre expertise crée de la valeur.",
  },
  {
    stat: "+60%",
    title: "de CA sur les bâtiments identifiés",
    before: "Marché adressable sous-estimé",
    after: "En visualisant l'intégralité du parc correspondant à votre ICP, les clients augmentent leur CA.",
  },
]

export const testimonials = [
  {
    name: "Hamadi Sow",
    company: "FGAir",
    role: "Dirigeant",
    text: "Pisteur nous a permis d'identifier des bâtiments que nous n'aurions jamais trouvés seuls. Le ciblage est remarquablement précis.",
    rating: 5,
  },
  {
    name: "Responsable commercial",
    company: "Place des Énergies",
    role: "Responsable commercial",
    text: "Les leads qualifiés nous arrivent chaque matin. Notre taux de conversion a explosé depuis qu'on utilise la plateforme.",
    rating: 5,
  },
  {
    name: "Geoffrey Lanier",
    company: "Lades Expertise",
    role: "Dirigeant",
    text: "L'assistant IA nous fait gagner un temps fou sur la rédaction des emails de prospection. Chaque message est personnalisé.",
    rating: 5,
  },
  {
    name: "Direction commerciale",
    company: "SOPI Ravalement",
    role: "Direction commerciale",
    text: "Nous avons augmenté notre CA de 60% en ciblant les bons bâtiments. Les données sont fiables et à jour.",
    rating: 5,
  },
  {
    name: "Dirigeant",
    company: "Calomatech",
    role: "Dirigeant",
    text: "La base de données est impressionnante. 1,2 million de bâtiments analysés, c'est un avantage concurrentiel énorme.",
    rating: 4,
  },
  {
    name: "Responsable développement",
    company: "Mieux Rénover",
    role: "Responsable développement",
    text: "De la prospection manuelle à une stratégie commerciale structurée en quelques jours. Le ROI est immédiat.",
    rating: 5,
  },
]

export const credits = [
  {
    amount: "1 crédit",
    description: "1 lead qualifié",
    note: "",
  },
  {
    amount: "1 crédit",
    description: "1 adresse email",
    note: "0 crédit si non trouvé",
  },
  {
    amount: "10 crédits",
    description: "1 numéro de téléphone portable",
    note: "0 crédit si non trouvé",
  },
]

export const dataSources = {
  batiment: ["BDNB", "Cadastre", "Etalab", "ENEDIS", "GRDF", "Base proprietaire Pisteur"],
  entreprise: ["SIRENE / SIRET", "RNIC", "MAJIC", "Pappers"],
  contact: ["Societeinfo", "FullEnrich", "Hunter.io"],
}

export const orbitSources = [
  "BDNB",
  "Cadastre",
  "ENEDIS",
  "GRDF",
  "SIRENE",
  "Pappers",
  "FullEnrich",
  "Societeinfo",
]

export const pricingPlans = [
  {
    name: "Starter",
    price: "0",
    period: "",
    subtitle: "Sans carte bancaire",
    credits: "",
    seats: "",
    popular: false,
    features: [
      "Moteur de recherche complet",
      "1,2M actifs immobiliers",
      "Assistant IA conversationnel",
      "Visualisation bâtiments",
    ],
    cta: "Essayer gratuitement",
    ctaVariant: "outline" as const,
  },
  {
    name: "Pro",
    price: "390",
    period: "HT / mois",
    subtitle: "2 postes",
    credits: "1 000 crédits / mois",
    seats: "",
    popular: false,
    features: [
      "Tout Starter",
      "Contacts clés nominatifs",
      "Score Match",
      "Génération d'emails IA",
      "Liste IA chaque matin",
      "Export CSV illimité",
    ],
    cta: "Démarrer le Pro",
    ctaVariant: "solid" as const,
  },
  {
    name: "Pro+",
    price: "590",
    period: "HT / mois",
    subtitle: "5 postes",
    credits: "2 500 crédits / mois",
    seats: "",
    popular: true,
    features: [
      "Tout Pro",
      "5 postes",
      "Support premium",
      "Connexion Gmail/Outlook",
      "Onboarding dédié",
    ],
    cta: "Démarrer le Pro+",
    ctaVariant: "solid" as const,
  },
  {
    name: "Growth",
    price: "990",
    period: "HT / mois",
    subtitle: "Accompagnement expert",
    credits: "",
    seats: "",
    popular: false,
    features: [
      "Tout Pro+",
      "Growth Marketers dédiés",
      "25 à 50 emails de prospection/jour",
      "Pilotage campagnes",
      "Reporting mensuel",
      "Stratégie GTM personnalisée",
    ],
    cta: "Nous contacter",
    ctaVariant: "outline" as const,
  },
]

export const faqItems = [
  {
    value: "credits",
    title: "Comment fonctionne le système de crédits ?",
    text: "Chaque action de consultation de données consomme des crédits. Un lead qualifié = 1 crédit. Un email = 1 crédit. Un numéro de téléphone = 10 crédits. Si l'information n'est pas trouvée, aucun crédit n'est débité.",
  },
  {
    value: "engagement",
    title: "Y a-t-il un engagement minimum ?",
    text: "Non, aucun engagement. Vous pouvez annuler à tout moment. Vos crédits restent valables jusqu'à la fin de votre période de facturation.",
  },
  {
    value: "qualite",
    title: "Quelle est la qualité des données ?",
    text: "Nos données proviennent de sources officielles (BDNB, Cadastre, SIRENE) et sont croisées avec des bases privées. Le taux de précision est supérieur à 95% sur les données bâtiment.",
  },
  {
    value: "introuvable",
    title: "Que se passe-t-il si un email ou un numéro est introuvable ?",
    text: "Aucun crédit n'est débité. Vous ne payez que pour les informations effectivement trouvées et livrées.",
  },
  {
    value: "maj",
    title: "À quelle fréquence les données sont-elles mises à jour ?",
    text: "Les données bâtiment sont mises à jour mensuellement. Les données entreprise et contact sont vérifiées en temps réel au moment de la requête.",
  },
  {
    value: "multi-users",
    title: "Peut-on avoir plusieurs utilisateurs sur le même compte ?",
    text: "Oui, les offres Pro (2 postes), Pro+ (5 postes) et Growth incluent plusieurs utilisateurs. Des postes supplémentaires peuvent être ajoutés sur demande.",
  },
  {
    value: "crm",
    title: "Pisteur s'intègre-t-il à mon CRM ?",
    text: "Oui, Pisteur permet l'export CSV illimité compatible avec tous les CRM. L'intégration directe HubSpot et Salesforce est en cours de déploiement.",
  },
]

export const activityOptions = [
  "Travaux / Entreprise generale de batiment",
  "CVC / Chauffage / Climatisation",
  "Isolation / Renovation energetique",
  "Courtage CEE / Audit energetique",
  "Maintenance / Facility management",
  "Promotion immobiliere",
  "Autre",
]

export const filterGroups = [
  {
    title: "Energie & Performance",
    tags: ["DPE E", "DPE F", "DPE G", "Gaz collectif", "Fioul", "Electrique"],
  },
  {
    title: "Type de batiment",
    tags: ["Residentiel collectif", "Tertiaire", "Industriel"],
  },
  {
    title: "Surface habitable",
    tags: ["> 2 000 m2"],
  },
  {
    title: "Consommation energetique",
    tags: ["> 200 kWh/m2"],
  },
  {
    title: "Technique",
    tags: ["Isolation non realisee", "Chaudiere fioul", "VMC simple flux", "Sans PAC"],
  },
  {
    title: "Entreprise gestionnaire",
    tags: [
      "Syndic copropriete",
      "Gestion immobiliere",
      "SCI proprietaire",
      "50-250 salaries",
    ],
  },
]
