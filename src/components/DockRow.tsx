import { Box, Flex, Text } from "@chakra-ui/react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { useRef } from "react"

type DockItemData = { label: string; image: string }

const ITEM_SIZE = { base: "92px", md: "112px" }

function DockItem({ mouseX, label, image }: { mouseX: MotionValue<number>; label: string; image: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return Infinity
    return val - (bounds.x + bounds.width / 2)
  })

  const scaleRaw = useTransform(distance, [-140, 0, 140], [1, 1.4, 1])
  const scale = useSpring(scaleRaw, { mass: 0.2, stiffness: 260, damping: 16 })
  const zIndex = useTransform(scale, (s) => (s > 1.03 ? 10 : 1))

  return (
    <Box
      ref={ref}
      flex={`0 0 ${ITEM_SIZE.base}`}
      w={ITEM_SIZE}
      display="flex"
      justifyContent="center"
      position="relative"
    >
      <motion.div style={{ scale, zIndex, transformOrigin: "center bottom" }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap="2" cursor="default" w={ITEM_SIZE}>
          <Box as="img" src={image} alt={label} w={{ base: "14", md: "16" }} h={{ base: "14", md: "16" }} objectFit="contain" display="block" />
          <Text
            fontSize={{ base: "13px", md: "sm" }}
            color="whiteAlpha.900"
            fontWeight="700"
            textAlign="center"
            lineHeight="1.3"
          >
            {label}
          </Text>
        </Box>
      </motion.div>
    </Box>
  )
}

export function DockRow({ items }: { items: DockItemData[] }) {
  const mouseX = useMotionValue(Infinity)

  return (
    <Flex
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      gap={{ base: "3", md: "3" }}
      flexWrap={{ base: "wrap", md: "nowrap" }}
      justifyContent="center"
      alignItems="flex-end"
      bg="whiteAlpha.100"
      border="1px solid"
      borderColor="whiteAlpha.150"
      borderRadius="3xl"
      px={{ base: "3", md: "8" }}
      py={{ base: "4", md: "6" }}
    >
      {items.map((item) => (
        <DockItem key={item.label} mouseX={mouseX} label={item.label} image={item.image} />
      ))}
    </Flex>
  )
}
