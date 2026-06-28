import { ContactSection } from "@/sections/ContactSection";
import { SEO } from "@/components/SEO";

export function ContactPage() {
  return (
    <>
      <SEO
        title="Contact"
        description="Contactez l'équipe Pisteur pour toute question sur notre outil de prospection B2B pour le bâtiment et l'énergie. Réponse rapide garantie."
        path="/contact"
        keywords={["contact Pisteur", "prospection bâtiment", "démo Pisteur", "équipe Pisteur"]}
      />
      <ContactSection />
    </>
  );
}
