import { Box, Button, Grid, Input, Text, Textarea, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { SEO } from "@/components/SEO"
import { submitContact } from "@/lib/backend"

export function SupportPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "", priority: "normale" })
  const [state, setState] = useState<"idle" | "loading" | "done">("idle")
  const [error, setError] = useState("")
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setState("loading"); setError("")
    try { await submitContact({ kind: "support", ...form, source: "support" }); setState("done") }
    catch (err) { setState("idle"); setError(err instanceof Error ? err.message : "Envoi impossible") }
  }
  return <>
    <SEO title="Support technique Pisteur" description="Contactez le support technique Pisteur. Votre demande est enregistrée et notre équipe vous répond dans les meilleurs délais." path="/support" />
    <Box pt={{ base: "28", md: "36" }} pb="24" px="4" bg="#f7f9fc" minH="80vh">
      <VStack maxW="2xl" mx="auto" gap="4" textAlign="center">
        <Text color="#00aa4f" fontWeight="bold" fontSize="sm">SUPPORT PISTEUR</Text>
        <Text as="h1" color="#000d4d" fontWeight="extrabold" fontSize={{ base: "3xl", md: "5xl" }}>Comment pouvons-nous vous aider ?</Text>
        <Text color="gray.600">Décrivez votre problème. Vous recevrez immédiatement un accusé de réception par e-mail.</Text>
        {state === "done" ? <Box mt="8" bg="white" borderRadius="2xl" p="10" boxShadow="0 18px 50px rgba(0,13,77,.1)" w="full"><Text color="#00aa4f" fontWeight="bold" fontSize="xl">Demande bien reçue ✓</Text><Text mt="2" color="gray.600">Notre équipe technique revient vers vous dans les meilleurs délais.</Text></Box> :
        <Box as="form" onSubmit={submit} mt="8" bg="white" borderRadius="2xl" p={{ base: "5", md: "8" }} boxShadow="0 18px 50px rgba(0,13,77,.1)" w="full" textAlign="left">
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="4">
            <Field label="Prénom"><Input required value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} /></Field>
            <Field label="Nom"><Input required value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} /></Field>
            <Field label="E-mail"><Input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></Field>
            <Field label="Téléphone"><Input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></Field>
          </Grid>
          <Field label="Objet"><Input required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} /></Field>
          <Field label="Priorité"><select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} style={{ width: "100%", border: "1px solid #d6dbe7", borderRadius: 8, padding: 10 }}><option value="normale">Normale</option><option value="haute">Haute</option><option value="bloquante">Bloquante</option></select></Field>
          <Field label="Message"><Textarea required minH="140px" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></Field>
          <Button type="submit" disabled={state === "loading"} bg="#00bd59" color="white" w="full" size="lg" _hover={{ bg: "#00a84f", transform: "translateY(-1px)" }}>{state === "loading" ? "Envoi…" : "Envoyer au support →"}</Button>
          {error && <Text mt="3" color="red.500" textAlign="center">{error}</Text>}
        </Box>}
      </VStack>
    </Box>
  </>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <Box mb="4"><Text color="#000d4d" fontSize="sm" fontWeight="semibold" mb="1.5">{label}</Text>{children}</Box>
}
