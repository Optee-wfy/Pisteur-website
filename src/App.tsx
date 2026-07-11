import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { Layout } from "@/components/Layout"
import { ScrollToTop } from "@/components/ScrollToTop"
import { HomePage } from "@/pages/HomePage"
import { CommentCaMarchePage } from "@/pages/CommentCaMarchePage"
import { DonneesPage } from "@/pages/DonneesPage"
import { TarifsPage } from "@/pages/TarifsPage"
import { CasUsagePage } from "@/pages/CasUsagePage"
import { BlogPage } from "@/pages/BlogPage"
import { LegalPage } from "@/pages/LegalPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { AnalyticsTracker } from "@/components/AnalyticsTracker"
import { SupportPage } from "@/pages/SupportPage"
import { AdminPage } from "@/pages/AdminPage"
import { BlogArticlePage } from "@/pages/BlogArticlePage"
import { VerticalPage } from "@/pages/VerticalPage"
import { ContactPage } from "@/pages/ContactPage"
import { AgentPage } from "@/pages/AgentPage"

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AnalyticsTracker />
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
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
