import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { corsHeaders, json } from "../_shared/http.ts"

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405)
  try {
    const body = await request.json()
    if (!body.eventName || !body.pagePath) return json({ error: "Invalid event" }, 400)
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!)
    const { error } = await supabase.from("analytics_events").insert({ event_name: String(body.eventName).slice(0, 80), page_path: String(body.pagePath).slice(0, 300), element_label: body.elementLabel ? String(body.elementLabel).slice(0, 200) : null, element_href: body.elementHref ? String(body.elementHref).slice(0, 500) : null, referrer: body.referrer ? String(body.referrer).slice(0, 500) : null, session_id: body.sessionId ? String(body.sessionId).slice(0, 100) : null, user_agent: request.headers.get("user-agent"), metadata: body.metadata || {} })
    if (error) throw error
    return json({ ok: true }, 202)
  } catch (error) {
    console.error(error)
    return json({ ok: false }, 500)
  }
})

