import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, escapeHtml, json } from "../_shared/http.ts";
import { confirmationEmail, sendEmail } from "../_shared/resend.ts";

Deno.serve(async (request) => {
  if (request.method === "OPTIONS")
    return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST")
    return json({ error: "Method not allowed" }, 405);

  try {
    const body = await request.json();
    const kind = body.kind === "support" ? "support" : body.kind === "agent-mathis" ? "agent-mathis" : "lead";
    if (!body.email || !String(body.email).includes("@"))
      return json({ error: "Email invalide" }, 400);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL");
    const emailEnabled = Boolean(
      Deno.env.get("RESEND_API_KEY") &&
      Deno.env.get("RESEND_FROM_EMAIL") &&
      notificationEmail,
    );

    if (kind === "support") {
      const name = `${body.firstName || ""} ${body.lastName || ""}`.trim();
      if (!name || !body.subject || !body.message)
        return json({ error: "Champs requis manquants" }, 400);
      const priorities: Record<string, string> = {
        normale: "normal",
        haute: "high",
        bloquante: "urgent",
      };
      const payload = {
        name,
        email: body.email,
        phone: body.phone || null,
        subject: body.subject,
        message: body.message,
        priority: priorities[body.priority] || "normal",
      };
      const { error } = await supabase.from("support_requests").insert(payload);
      if (error) throw error;
      if (emailEnabled && notificationEmail)
        await Promise.all([
          sendEmail({
            to: body.email,
            subject: "Votre demande support Pisteur est bien reçue",
            html: confirmationEmail(name, "support"),
          }),
          sendEmail({
            to: notificationEmail,
            subject: `[Support Pisteur] ${body.subject}`,
            html: `<h2>Nouvelle demande support</h2><p><strong>${escapeHtml(name)}</strong> — ${escapeHtml(body.email)}</p><p>${escapeHtml(body.message)}</p>`,
          }),
        ]);
    } else if (kind === "agent-mathis") {
      if (!body.firstName || !body.lastName || !body.company)
        return json({ error: "Champs requis manquants" }, 400);
      const payload = {
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        phone: body.phone || null,
        company: body.company,
        activity: body.activity || null,
        message: body.message || null,
        offer: "launch-1000",
      };
      const { error } = await supabase.from("agent_leads").insert(payload);
      if (error) throw error;
      if (emailEnabled && notificationEmail)
        await Promise.all([
          sendEmail({
            to: body.email,
            subject: "Votre place pour l'offre de lancement Mathis est réservée",
            html: confirmationEmail(body.firstName, "agent-mathis"),
          }),
          sendEmail({
            to: notificationEmail,
            subject: `[Offre Mathis] ${body.firstName} ${body.lastName} — ${body.company}`,
            html: `<h2>Nouvelle inscription offre de lancement Mathis (1000€/mois)</h2><p><strong>${escapeHtml(body.firstName)} ${escapeHtml(body.lastName)}</strong> — ${escapeHtml(body.company)}</p><p>${escapeHtml(body.email)} · ${escapeHtml(body.phone || "Sans téléphone")}</p><p>Activité : ${escapeHtml(body.activity || "Non précisée")}</p>${body.message ? `<p>Message : ${escapeHtml(body.message)}</p>` : ""}`,
          }),
        ]);
    } else {
      if (!body.firstName || !body.lastName || !body.consent)
        return json({ error: "Champs requis manquants" }, 400);
      const payload = {
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        phone: body.phone || null,
        company: body.company || null,
        activity: body.activity || null,
        zone: body.zone || null,
        message: body.message || null,
        source: body.source || "demo",
        consent: Boolean(body.consent),
      };
      const { error } = await supabase.from("contacts").insert(payload);
      if (error) throw error;
      if (emailEnabled && notificationEmail)
        await Promise.all([
          sendEmail({
            to: body.email,
            subject: "Merci d’avoir contacté Pisteur",
            html: confirmationEmail(body.firstName, "lead"),
          }),
          sendEmail({
            to: notificationEmail,
            subject: `[Lead Pisteur] ${body.firstName} ${body.lastName} — ${body.company || "Société non précisée"}`,
            html: `<h2>Nouveau contact commercial</h2><p><strong>${escapeHtml(body.firstName)} ${escapeHtml(body.lastName)}</strong></p><p>${escapeHtml(body.email)} · ${escapeHtml(body.phone || "Sans téléphone")}</p><p>Société : ${escapeHtml(body.company || "Non précisée")}</p><p>Activité : ${escapeHtml(body.activity || "Non précisée")}</p><p>Zone : ${escapeHtml(body.zone || "Non précisée")}</p>`,
          }),
        ]);
    }
    return json({ ok: true });
  } catch (error) {
    console.error(error);
    return json(
      { error: "Impossible de transmettre la demande pour le moment" },
      500,
    );
  }
});
