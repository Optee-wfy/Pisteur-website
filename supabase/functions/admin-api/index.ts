import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { corsHeaders, json } from "../_shared/http.ts"

const resources: Record<string, string> = {
  contacts: "contacts",
  support: "support_requests",
  posts: "blog_posts",
  analytics: "analytics_events",
  faq: "faq_items",
  testimonials: "testimonials",
}

function authorized(request: Request) {
  const supplied = request.headers.get("x-admin-code") || ""
  const expected = Deno.env.get("ADMIN_ACCESS_CODE") || ""
  return expected.length >= 6 && supplied === expected
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })
  if (!authorized(request)) return json({ error: "Accès refusé" }, 401)

  try {
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!)
    const url = new URL(request.url)
    const resource = url.searchParams.get("resource") || "contacts"
    const table = resources[resource]
    if (!table) return json({ error: "Ressource inconnue" }, 400)

    if (request.method === "GET") {
      const limit = Math.min(Number(url.searchParams.get("limit") || 200), 500)
      const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false }).limit(limit)
      if (error) throw error
      return json({ data })
    }

    const body = await request.json()

    if (request.method === "POST" && body.action === "upload-image") {
      if (!body.fileName?.endsWith(".webp") || !body.base64) return json({ error: "Image WebP requise" }, 400)
      const bytes = Uint8Array.from(atob(body.base64), (char) => char.charCodeAt(0))
      if (bytes.byteLength > 5_242_880) return json({ error: "Image trop volumineuse" }, 413)
      const { error } = await supabase.storage.from("blog-images").upload(body.fileName, bytes, { contentType: "image/webp", upsert: true })
      if (error) throw error
      const { data } = supabase.storage.from("blog-images").getPublicUrl(body.fileName)
      return json({ url: data.publicUrl })
    }

    if (request.method === "POST") {
      const payload = { ...body }
      delete payload.action
      const { data, error } = await supabase.from(table).insert(payload).select().single()
      if (error) throw error
      return json({ data }, 201)
    }

    if (request.method === "PATCH") {
      if (!body.id) return json({ error: "ID requis" }, 400)
      const { id, ...payload } = body
      const hasUpdatedAt = ["blog_posts", "faq_items", "testimonials"].includes(table)
      const changes = hasUpdatedAt ? { ...payload, updated_at: new Date().toISOString() } : payload
      const { data, error } = await supabase.from(table).update(changes).eq("id", id).select().single()
      if (error) throw error
      return json({ data })
    }

    if (request.method === "DELETE") {
      if (!body.id) return json({ error: "ID requis" }, 400)
      const { error } = await supabase.from(table).delete().eq("id", body.id)
      if (error) throw error
      return json({ ok: true })
    }

    return json({ error: "Method not allowed" }, 405)
  } catch (error) {
    console.error(error)
    return json({ error: "Erreur serveur" }, 500)
  }
})
