import { escapeHtml } from "./http.ts"

type EmailInput = { to: string | string[]; subject: string; html: string }

export async function sendEmail(input: EmailInput) {
  const apiKey = Deno.env.get("RESEND_API_KEY")
  const from = Deno.env.get("RESEND_FROM_EMAIL")
  if (!apiKey || !from) throw new Error("Resend secrets are not configured")

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, ...input }),
  })
  if (!response.ok) throw new Error(`Resend error: ${await response.text()}`)
  return response.json()
}

export function confirmationEmail(name: string, kind: "lead" | "support") {
  const safeName = escapeHtml(name)
  const support = kind === "support"
  return `<!doctype html><html><body style="margin:0;background:#f7faff;font-family:Inter,Arial,sans-serif;color:#071B63"><div style="max-width:620px;margin:0 auto;padding:40px 20px"><div style="background:#fff;border:1px solid #e5eaf5;border-radius:18px;padding:36px"><div style="font-size:24px;font-weight:800;margin-bottom:24px">Pisteur</div><h1 style="font-size:28px;line-height:1.2;margin:0 0 16px">Merci ${safeName}, votre demande est bien reçue.</h1><p style="font-size:16px;line-height:1.7;color:#4b587c">${support ? "Notre équipe support analyse votre demande et vous répondra dans les meilleurs délais." : "Notre équipe va étudier votre besoin et vous recontactera dans les plus brefs délais."}</p><div style="margin-top:28px;padding:16px;background:#f3fff7;border-radius:12px;color:#008f35;font-weight:700">✓ Votre demande a été transmise à l’équipe Pisteur.</div></div></div></body></html>`
}

