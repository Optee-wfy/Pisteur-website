import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { Header } from "@/sections/Header"
import { Footer } from "@/sections/Footer"
import { MobileCTA } from "@/sections/MobileCTA"
import { CookieBanner } from "@/components/CookieBanner"

export function Layout() {
  return (
    <Box pb={{ base: "14", lg: "0" }}>
      <Header />
      <Outlet />
      <Footer />
      <MobileCTA />
      <CookieBanner />
    </Box>
  )
}
