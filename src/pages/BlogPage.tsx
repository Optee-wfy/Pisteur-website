import { Box, Grid, Image, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { SEO } from "@/components/SEO"
import { publicRows } from "@/lib/backend"

export type BlogSource = { label: string; url: string }
export type BlogPost = { id: string; slug: string; title: string; excerpt: string; content: string; image_url?: string; image_alt?: string; published_at?: string; sources?: BlogSource[] }

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  useEffect(() => { publicRows<BlogPost>("blog_posts", "select=*&status=eq.published&order=published_at.desc").then(setPosts) }, [])
  return <><SEO title="Guides de prospection bâtiment et énergie" description="Guides pratiques sur la prospection bâtiment, le courtage en énergie, les données DPE, la rénovation énergétique et la vente B2B." path="/blog" keywords={["blog prospection bâtiment", "guide courtage énergie", "stratégie commerciale rénovation", "données DPE"]} type="article" />
    <Box pt={{ base: "28", md: "36" }} pb="24" px="5" bg="#f8fafc" minH="75vh"><VStack gap="4" textAlign="center" maxW="3xl" mx="auto"><Text color="#00aa4f" fontWeight="bold" fontSize="sm">RESSOURCES</Text><Text as="h1" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="extrabold" color="#000d4d">Guides et analyses Pisteur</Text><Text color="gray.600">Des contenus concrets pour mieux cibler les bâtiments, entreprises et décideurs de votre marché.</Text></VStack><Grid maxW="6xl" mx="auto" mt="12" templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap="6">{posts.map(post => <Box key={post.id} asChild bg="white" borderRadius="2xl" overflow="hidden" boxShadow="0 12px 36px rgba(0,13,77,.08)" transition=".25s" _hover={{ transform: "translateY(-4px)" }}><Link to={`/blog/${post.slug}`}>{post.image_url && <Image src={post.image_url} alt={post.image_alt || post.title} w="full" h="210px" objectFit="cover" loading="lazy" />}<Box p="6"><Text fontWeight="extrabold" fontSize="xl" color="#000d4d">{post.title}</Text><Text mt="3" color="gray.600" fontSize="sm">{post.excerpt}</Text><Text mt="5" color="#00aa4f" fontWeight="bold" fontSize="sm">Lire l’article →</Text></Box></Link></Box>)}{!posts.length && <Box gridColumn="1/-1" bg="white" p="10" borderRadius="2xl" textAlign="center"><Text color="gray.500">Les prochains guides Pisteur arrivent bientôt.</Text></Box>}</Grid></Box>
  </>
}
