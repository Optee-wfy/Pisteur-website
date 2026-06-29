import { Accordion, Box, Span, Text, VStack } from "@chakra-ui/react"
import { faqItems } from "@/data/content"
import { useEffect, useState } from "react"
import { publicRows } from "@/lib/backend"

type FaqRow = { id: string; question: string; answer: string }

export function FAQ({ pagePath = "/tarifs" }: { pagePath?: string }) {
  const [remoteItems, setRemoteItems] = useState<FaqRow[]>([])
  useEffect(() => { publicRows<FaqRow>("faq_items", `select=id,question,answer&page_path=eq.${encodeURIComponent(pagePath)}&active=eq.true&order=sort_order.asc`).then(setRemoteItems) }, [pagePath])
  const items = remoteItems.length ? remoteItems.map(item => ({ value: item.id, title: item.question, text: item.answer })) : faqItems
  return (
    <Box py={{ base: "16", md: "24" }} px={{ base: "4", md: "6" }} bg="#f6f8fb">
      <Box maxW="3xl" mx="auto">
        <VStack gap="4" textAlign="center" mb={{ base: "10", md: "16" }}>
          <Text
            as="h2"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="extrabold"
            color="#000d4d"
          >
            Questions fréquentes
          </Text>
        </VStack>

        <Accordion.Root collapsible size="lg" display="flex" flexDirection="column" gap="3">
          {items.map((item) => (
            <Accordion.Item
              key={item.value}
              value={item.value}
              bg="white"
              border="1px solid"
              borderColor="#e5eaf3"
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="0 2px 8px rgba(0, 13, 77, 0.025)"
              transition="border-color .25s ease, box-shadow .25s ease, transform .25s ease"
              css={{
                "&[data-state=open]": {
                  borderColor: "#d8e2f0",
                  boxShadow: "0 12px 32px rgba(0, 13, 77, 0.07)",
                },
              }}
            >
              <Accordion.ItemTrigger
                px={{ base: "5", md: "6" }}
                py={{ base: "4", md: "5" }}
                bg="white"
                color="#000d4d"
                cursor="pointer"
                transition="background-color .22s ease"
                _hover={{ bg: "#f8fafc" }}
                _focusVisible={{ outline: "2px solid #00bd59", outlineOffset: "-2px" }}
              >
                <Span flex="1" textAlign="left" fontWeight="semibold" fontSize={{ base: "sm", md: "md" }} color="#000d4d">
                  {item.title}
                </Span>
                <Accordion.ItemIndicator color="#00a84f" transition="transform .3s cubic-bezier(.2,.8,.2,1)" />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent bg="white">
                <Accordion.ItemBody px={{ base: "5", md: "6" }} pt="0" pb={{ base: "5", md: "6" }} bg="white">
                  <Box h="1px" bg="#edf1f6" mb="4" />
                  <Text fontSize="sm" color="#586580" lineHeight="1.8" maxW="95%">
                    {item.text}
                  </Text>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Box>
    </Box>
  )
}
