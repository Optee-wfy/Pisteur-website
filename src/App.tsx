import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { Layout } from "@/components/Layout"
import { ScrollToTop } from "@/components/ScrollToTop"
import { HomePage } from "@/pages/HomePage"
import { AnalyticsTracker } from "@/components/AnalyticsTracker"

const CommentCaMarchePage = lazy(() => import("@/pages/CommentCaMarchePage").then(m => ({ default: m.CommentCaMarchePage })))
const DonneesPage = lazy(() => import("@/pages/DonneesPage").then(m => ({ default: m.DonneesPage })))
const TarifsPage = lazy(() => import("@/pages/TarifsPage").then(m => ({ default: m.TarifsPage })))
const CasUsagePage = lazy(() => import("@/pages/CasUsagePage").then(m => ({ default: m.CasUsagePage })))
const BlogPage = lazy(() => import("@/pages/BlogPage").then(m => ({ default: m.BlogPage })))
const LegalPage = lazy(() => import("@/pages/LegalPage").then(m => ({ default: m.LegalPage })))
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then(m => ({ default: m.NotFoundPage })))
const SupportPage = lazy(() => import("@/pages/SupportPage").then(m => ({ default: m.SupportPage })))
const AdminPage = lazy(() => import("@/pages/AdminPage").then(m => ({ default: m.AdminPage })))
const BlogArticlePage = lazy(() => import("@/pages/BlogArticlePage").then(m => ({ default: m.BlogArticlePage })))
const VerticalPage = lazy(() => import("@/pages/VerticalPage").then(m => ({ default: m.VerticalPage })))
const ContactPage = lazy(() => import("@/pages/ContactPage").then(m => ({ default: m.ContactPage })))
const AgentPage = lazy(() => import("@/pages/AgentPage").then(m => ({ default: m.AgentPage })))

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AnalyticsTracker />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/comment-ca-marche" element={<CommentCaMarchePage />} />
              <Route path="/donnees" element={<DonneesPage />} />
              <Route path="/tarifs" element={<TarifsPage />} />
              <Route path="/cas-usage" element={<CasUsagePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogArticlePage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/agent-ia-prospection-batiment" element={<AgentPage />} />
              <Route path="/mentions-legales" element={<LegalPage page="mentions" />} />
              <Route path="/confidentialite" element={<LegalPage page="confidentialite" />} />
              <Route path="/cgu" element={<LegalPage page="cgu" />} />
              {/* Pages verticales par secteur */}
              <Route path="/courtage-energie" element={<VerticalPage vertical="courtage-energie" />} />
              <Route path="/renovation-energetique" element={<VerticalPage vertical="renovation-energetique" />} />
              <Route path="/cvc-equipements" element={<VerticalPage vertical="cvc-equipements" />} />
              <Route path="/solaire-enr" element={<VerticalPage vertical="solaire-enr" />} />
              <Route path="/bureaux-etudes" element={<VerticalPage vertical="bureaux-etudes" />} />
              <Route path="/services-immobiliers" element={<VerticalPage vertical="services-immobiliers" />} />
              <Route path="/fournisseurs-energie" element={<VerticalPage vertical="fournisseurs-energie" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
