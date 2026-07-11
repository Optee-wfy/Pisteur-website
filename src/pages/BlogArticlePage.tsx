import { Box, Grid, Image, Text } from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { SEO } from "@/components/SEO"
import { publicRows } from "@/lib/backend"
import type { BlogPost } from "./BlogPage"

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g

function renderWithLinks(text: string) {
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0
  MARKDOWN_LINK.lastIndex = 0
  while ((match = MARKDOWN_LINK.exec(text))) {
    if (match.index > lastIndex) nodes.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>)
    const [, label, url] = match
    const linkStyle = { color: "#00aa4f", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: "3px" }
    nodes.push(
      url.startsWith("/")
        ? <Link key={key++} to={url} style={linkStyle}>{label}</Link>
        : <a key={key++} href={url} target="_blank" rel="noreferrer" style={linkStyle}>{label}</a>,
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>)
  return nodes
}

export function BlogArticlePage() {
  const { slug = "" } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [suggestions, setSuggestions] = useState<BlogPost[]>([])

  useEffect(() => {
    publicRows<BlogPost>("blog_posts", `select=*&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`).then(rows => setPost(rows[0] || null))
    publicRows<BlogPost>("blog_posts", `select=id,slug,title,excerpt,image_url,image_alt,published_at&status=eq.published&slug=neq.${encodeURIComponent(slug)}&order=published_at.desc&limit=3`).then(setSuggestions)
  }, [slug])

  if (!post) return <Box pt="36" pb="24" textAlign="center"><Text fontWeight="bold" color="#000d4d">Article introuvable</Text><Box asChild color="#00aa4f"><Link to="/blog">Retour au blog</Link></Box></Box>

  return <><SEO title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} type="article" /><Box pt={{ base: "28", md: "36" }} pb="24" px="5"><Box maxW="3xl" mx="auto"><Box asChild color="#00aa4f" fontWeight="bold" fontSize="sm"><Link to="/blog">← Tous les guides</Link></Box><Text as="h1" mt="7" fontSize={{ base: "3xl", md: "5xl" }} lineHeight="1.05" fontWeight="extrabold" color="#000d4d">{post.title}</Text><Text mt="5" fontSize="lg" color="gray.600">{post.excerpt}</Text>{post.image_url && <Image src={post.image_url} alt={post.image_alt || post.title} w="full" aspectRatio="16 / 9" objectFit="cover" borderRadius="2xl" mt="10" />}<Box mt="10">{post.content.split(/\n\n+/).map((paragraph, index) => paragraph.startsWith("## ") ? <Text as="h2" key={index} color="#000d4d" fontSize={{ base: "xl", md: "2xl" }} fontWeight="extrabold" mt="10" mb="4">{paragraph.slice(3)}</Text> : <Text key={index} color="#26345f" fontSize="md" lineHeight="1.9" mb="5" whiteSpace="pre-wrap">{renderWithLinks(paragraph)}</Text>)}</Box>{post.sources?.length ? <Box mt="12" p="6" bg="#f3f8f5" borderRadius="2xl"><Text as="h2" fontSize="xl" fontWeight="extrabold" color="#000d4d">Sources officielles</Text>{post.sources.map(source => <Box key={source.url} asChild display="block" color="#08783d" mt="3" textDecoration="underline" textUnderlineOffset="3px"><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></Box>)}</Box> : null}</Box>{suggestions.length ? <Box maxW="6xl" mx="auto" mt="20" pt="12" borderTop="1px solid #e6eaf0"><Text as="h2" textAlign="center" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" color="#000d4d">Ces articles pourraient aussi vous intéresser</Text><Grid mt="8" templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="6">{suggestions.map(item => <Box key={item.id} asChild bg="white" border="1px solid #e7ebf0" borderRadius="2xl" overflow="hidden" transition=".2s" _hover={{ transform: "translateY(-3px)", boxShadow: "0 12px 30px rgba(0,13,77,.08)" }}><Link to={`/blog/${item.slug}`}>{item.image_url && <Image src={item.image_url} alt={item.image_alt || item.title} w="full" aspectRatio="16 / 9" objectFit="cover" loading="lazy" />}<Box p="5"><Text fontWeight="extrabold" color="#000d4d">{item.title}</Text><Text mt="2" color="gray.600" fontSize="sm">{item.excerpt}</Text></Box></Link></Box>)}</Grid></Box> : null}</Box></>
}
