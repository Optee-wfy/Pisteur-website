import { Flex } from "@chakra-ui/react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

type LiveLeadCounterProps = {
  value: number
}

export function LiveLeadCounter({ value }: LiveLeadCounterProps) {
  const reduceMotion = useReducedMotion()
  const characters = new Intl.NumberFormat("fr-FR").format(value).split("")

  return (
    <Flex
      as="span"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      gap="0.08em"
      role="img"
      aria-label={`${value} leads générés à ce jour`}
      style={{ perspective: "500px" }}
    >
      {characters.map((character, index) => {
        const isDigit = /\d/.test(character)

        if (!isDigit) {
          return (
            <span key={`separator-${index}`} aria-hidden="true" style={{ width: "0.2em" }} />
          )
        }

        return (
          <span
            key={`digit-${index}`}
            aria-hidden="true"
            style={{
              position: "relative",
              display: "inline-flex",
              width: "0.72em",
              height: "1.08em",
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={`${index}-${character}`}
                initial={reduceMotion ? false : { y: "-70%", rotateX: 70, opacity: 0 }}
                animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                exit={reduceMotion ? undefined : { y: "70%", rotateX: -70, opacity: 0 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  inset: 0,
                  transformOrigin: "center",
                }}
              >
                {character}
              </motion.span>
            </AnimatePresence>
          </span>
        )
      })}
    </Flex>
  )
}
