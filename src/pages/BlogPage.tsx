import { Box, Flex, Grid, Image, Input, Text, VStack, HStack, Button } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { LuSearch, LuCalendar, LuArrowRight, LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { SEO } from "@/components/SEO"
import { PageHero } from "@/components/PageHero"
import { RelatedLinks } from "@/components/RelatedLinks"
import { publicRows } from "@/lib/backend"
import { ContactSection } from "@/sections/ContactSection"

export type BlogSource = { label: string; url: string }
export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image_url?: string
  image_alt?: string
  published_at?: string
  sources?: BlogSource[]
}

const PER_PAGE = 6

function formatDate(iso?: string) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
}

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    publicRows<BlogPost>("blog_posts", "select=*&status=eq.published&order=published_at.desc").then(setPosts)
  }, [])

  const featured = posts[0] ?? null
  const rest = posts.slice(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rest
    return rest.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content?.toLowerCase().includes(q),
    )
  }, [rest, query])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function handleSearch(val: string) {
    setQuery(val)
    setPage(1)
  }

  return (
    <>
      <SEO
        title="Blog Pisteur — Guides prospection bâtiment & énergie B2B"
        description="Guides pratiques sur la prospection bâtiment, le courtage en énergie, les données DPE, la rénovation énergétique et la vente B2B. Stratégies et analyses par Pisteur."
        path="/blog"
        keywords={["blog prospection bâtiment", "guide courtage énergie", "stratégie commerciale rénovation", "données DPE", "leads bâtiment B2B"]}
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://pisteur.io" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://pisteur.io/blog" },
          ],
        }}
      />

      <PageHero
        eyebrow="RESSOURCES"
        title="Guides et analyses Pisteur"
        description="Des contenus concrets pour mieux cibler les bâtiments, entreprises et décideurs de votre marché."
      />

      <Box bg="#f7faff" pb="24" px={{ base: "4", md: "6" }}>
        {/* ── Breadcrumb + Recherche ── */}
        <Box maxW="6xl" mx="auto" pt="8" pb="10">
          <HStack gap="1.5" fontSize="xs" color="#9aaabb" mb="6">
            <Box as={Link} to="/" color="#071B63" fontWeight="600" _hover={{ textDecoration: "underline" }}>Accueil</Box>
            <Text>/</Text>
            <Text color="#9aaabb">Blog</Text>
          </HStack>
          <Box maxW="xl">
            <Flex
              align="center"
              bg="white"
              borderRadius="2xl"
              border="1.5px solid #e2e8f0"
              px="4"
              gap="3"
              boxShadow="0 4px 20px rgba(0,13,77,.07)"
              _focusWithin={{ borderColor: "#071B63", boxShadow: "0 0 0 3px rgba(7,27,99,.1)" }}
              transition="all .2s"
            >
              <Box color="#9aaabb" flexShrink={0}>
                <LuSearch size={18} />
              </Box>
              <Input
                placeholder="Rechercher un article, un mot-clé…"
                border="none"
                outline="none"
                bg="transparent"
                fontSize="sm"
                color="#071B63"
                _placeholder={{ color: "#9aaabb" }}
                py="3.5"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {query && (
                <Box
                  as="button"
                  color="#9aaabb"
                  fontSize="xs"
                  fontWeight="600"
                  flexShrink={0}
                  onClick={() => handleSearch("")}
                  _hover={{ color: "#071B63" }}
                >
                  Effacer
                </Box>
              )}
            </Flex>
            {query && (
              <Text fontSize="xs" color="#9aaabb" mt="2">
                {filtered.length} article{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
              </Text>
            )}
          </Box>
        </Box>
        <Box maxW="6xl" mx="auto">

          {/* ── Article en avant (featured) ── */}
          {featured && !query && page === 1 && (
            <Box mb="14">
              <Text as="h2" fontSize="xs" fontWeight="700" color="#071B63" letterSpacing="widest" mb="4">
                À LA UNE
              </Text>
              <Box
                asChild
                bg="white"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="0 16px 48px rgba(0,13,77,.10)"
                display="block"
                transition=".25s"
                _hover={{ transform: "translateY(-3px)", boxShadow: "0 24px 64px rgba(0,13,77,.14)" }}
              >
                <Link to={`/blog/${featured.slug}`}>
                  <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }}>
                    {featured.image_url ? (
                      <Box overflow="hidden" h={{ base: "220px", lg: "360px" }}>
                        <Image
                          src={featured.image_url}
                          alt={featured.image_alt || featured.title}
                          w="full"
                          h="full"
                          objectFit="cover"
                          loading="eager"
                        />
                      </Box>
                    ) : (
                      <Box
                        h={{ base: "220px", lg: "360px" }}
                        bg="linear-gradient(135deg, #071B63 0%, #071FD6 100%)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text fontSize="5xl" fontWeight="900" color="white/10">P</Text>
                      </Box>
                    )}
                    <Flex direction="column" justify="center" p={{ base: "6", md: "10" }} gap="4">
                      <Box
                        display="inline-flex"
                        alignSelf="flex-start"
                        bg="#ecfdf5"
                        color="#059669"
                        fontSize="2xs"
                        fontWeight="700"
                        px="2.5"
                        py="1"
                        borderRadius="full"
                        letterSpacing="wide"
                      >
                        ARTICLE VEDETTE
                      </Box>
                      <Text
                        as="h3"
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight="900"
                        color="#000d4d"
                        letterSpacing="-0.03em"
                        lineHeight="1.2"
                      >
                        {featured.title}
                      </Text>
                      <Text color="gray.500" fontSize="sm" lineHeight="1.7">
                        {featured.excerpt}
                      </Text>
                      {featured.published_at && (
                        <HStack gap="1.5" color="#9aaabb" fontSize="xs">
                          <LuCalendar size={12} />
                          <Text>{formatDate(featured.published_at)}</Text>
                        </HStack>
                      )}
                      <HStack gap="1.5" color="#00aa4f" fontWeight="700" fontSize="sm" mt="2">
                        <Text>Lire l'article</Text>
                        <LuArrowRight size={14} />
                      </HStack>
                    </Flex>
                  </Grid>
                </Link>
              </Box>
            </Box>
          )}

          {/* ── Grille d'articles ── */}
          {paginated.length > 0 ? (
            <>
              {!query && page === 1 && (
                <Text as="h2" fontSize="xs" fontWeight="700" color="#071B63" letterSpacing="widest" mb="4">
                  TOUS LES ARTICLES
                </Text>
              )}
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap="6">
                {paginated.map((post) => (
                  <Box
                    key={post.id}
                    asChild
                    bg="white"
                    borderRadius="2xl"
                    overflow="hidden"
                    boxShadow="0 8px 28px rgba(0,13,77,.07)"
                    display="block"
                    transition=".25s"
                    _hover={{ transform: "translateY(-4px)", boxShadow: "0 16px 40px rgba(0,13,77,.12)" }}
                  >
                    <Link to={`/blog/${post.slug}`}>
                      {post.image_url && (
                        <Image
                          src={post.image_url}
                          alt={post.image_alt || post.title}
                          w="full"
                          h="180px"
                          objectFit="cover"
                          loading="lazy"
                        />
                      )}
                      <Box p="6">
                        {post.published_at && (
                          <HStack gap="1.5" color="#9aaabb" fontSize="xs" mb="2">
                            <LuCalendar size={11} />
                            <Text>{formatDate(post.published_at)}</Text>
                          </HStack>
                        )}
                        <Text as="h3" fontWeight="800" fontSize="lg" color="#000d4d" lineHeight="1.25" mb="2">
                          {post.title}
                        </Text>
                        <Text color="gray.500" fontSize="sm" lineHeight="1.65">
                          {post.excerpt}
                        </Text>
                        <HStack gap="1.5" color="#00aa4f" fontWeight="700" fontSize="sm" mt="4">
                          <Text>Lire l'article</Text>
                          <LuArrowRight size={13} />
                        </HStack>
                      </Box>
                    </Link>
                  </Box>
                ))}
              </Grid>

              {/* ── Pagination ── */}
              {totalPages > 1 && (
                <Flex justifyContent="center" alignItems="center" gap="3" mt="12">
                  <Button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    variant="outline"
                    borderColor="#e2e8f0"
                    color="#071B63"
                    borderRadius="xl"
                    px="4"
                    fontSize="sm"
                    fontWeight="600"
                    _hover={{ bg: "#f0f3f9" }}
                    _disabled={{ opacity: 0.35, cursor: "not-allowed" }}
                  >
                    <HStack gap="1.5">
                      <LuChevronLeft size={15} />
                      <Text>Précédent</Text>
                    </HStack>
                  </Button>

                  <HStack gap="1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                      <Box
                        key={n}
                        as="button"
                        onClick={() => setPage(n)}
                        w="8"
                        h="8"
                        borderRadius="lg"
                        fontSize="sm"
                        fontWeight={n === page ? "800" : "500"}
                        bg={n === page ? "#071B63" : "transparent"}
                        color={n === page ? "white" : "#6b7280"}
                        _hover={{ bg: n === page ? "#071B63" : "#f0f3f9" }}
                        transition=".15s"
                      >
                        {n}
                      </Box>
                    ))}
                  </HStack>

                  <Button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    variant="outline"
                    borderColor="#e2e8f0"
                    color="#071B63"
                    borderRadius="xl"
                    px="4"
                    fontSize="sm"
                    fontWeight="600"
                    _hover={{ bg: "#f0f3f9" }}
                    _disabled={{ opacity: 0.35, cursor: "not-allowed" }}
                  >
                    <HStack gap="1.5">
                      <Text>Suivant</Text>
                      <LuChevronRight size={15} />
                    </HStack>
                  </Button>
                </Flex>
              )}
            </>
          ) : (
            <Box bg="white" p="12" borderRadius="2xl" textAlign="center">
              {query ? (
                <>
                  <Text fontSize="lg" fontWeight="700" color="#071B63" mb="2">
                    Aucun article trouvé
                  </Text>
                  <Text color="gray.500" fontSize="sm">
                    Essayez un autre mot-clé ou{" "}
                    <Box as="span" color="#00aa4f" cursor="pointer" fontWeight="600" onClick={() => handleSearch("")}>
                      effacez la recherche
                    </Box>
                    .
                  </Text>
                </>
              ) : (
                <Text color="gray.500">Les prochains guides Pisteur arrivent bientôt.</Text>
              )}
            </Box>
          )}

        </Box>
      </Box>

      <RelatedLinks
        title="EXPLORER PISTEUR"
        links={[
          { label: "Comment ça marche", to: "/comment-ca-marche", description: "Comprenez comment Pisteur génère vos listes de prospects en quelques secondes." },
          { label: "La base de données", to: "/donnees", description: "32M+ bâtiments analysés, 50+ signaux croisés, décideurs nominatifs vérifiés." },
          { label: "Solutions par secteur", to: "/cas-usage", description: "Courtage énergie, rénovation, CVC, solaire : des signaux adaptés à chaque métier." },
        ]}
      />

      <ContactSection />
    </>
  )
}
