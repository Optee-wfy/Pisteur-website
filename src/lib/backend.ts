const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const backendConfigured = Boolean(supabaseUrl && anonKey)

async function invoke(functionName: string, body: unknown, extraHeaders: Record<string, string> = {}, method = "POST") {
  if (!supabaseUrl || !anonKey) throw new Error("Le backend Supabase n’est pas encore configuré.")
  const response = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
    method,
    headers: { Authorization: `Bearer ${anonKey}`, apikey: anonKey, "Content-Type": "application/json", ...extraHeaders },
    body: method === "GET" ? undefined : JSON.stringify(body),
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload.error || "Une erreur est survenue")
  return payload
}

export function submitContact(body: Record<string, unknown>) {
  return invoke("public-contact", body)
}

export function trackEvent(eventName: string, details: Record<string, unknown> = {}) {
  if (!backendConfigured) return Promise.resolve()
  let sessionId = sessionStorage.getItem("pisteur_session_id")
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    sessionStorage.setItem("pisteur_session_id", sessionId)
  }
  return invoke("track-event", { eventName, pagePath: location.pathname, referrer: document.referrer, sessionId, ...details }).catch(() => undefined)
}

export function adminRequest(code: string, resource: string, method = "GET", body?: Record<string, unknown>) {
  if (!supabaseUrl || !anonKey) throw new Error("Le backend Supabase n’est pas encore configuré.")
  return fetch(`${supabaseUrl}/functions/v1/admin-api?resource=${encodeURIComponent(resource)}`, {
    method,
    headers: { Authorization: `Bearer ${anonKey}`, apikey: anonKey, "Content-Type": "application/json", "x-admin-code": code },
    body: method === "GET" ? undefined : JSON.stringify(body || {}),
  }).then(async (response) => {
    const payload = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(payload.error || "Erreur administrateur")
    return payload
  })
}

export async function publicRows<T>(table: string, query = ""): Promise<T[]> {
  if (!supabaseUrl || !anonKey) return []
  const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${query}`, { headers: { Authorization: `Bearer ${anonKey}`, apikey: anonKey } })
  if (!response.ok) return []
  return response.json()
}

export function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export function imageToWebp(file: File, slug: string): Promise<{ base64: string; fileName: string }> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      const maxWidth = 1600
      const scale = Math.min(1, maxWidth / image.width)
      const canvas = document.createElement("canvas")
      canvas.width = Math.round(image.width * scale)
      canvas.height = Math.round(image.height * scale)
      canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error("Conversion WebP impossible"))
        const reader = new FileReader()
        reader.onload = () => resolve({ base64: String(reader.result).split(",")[1], fileName: `${slugify(slug)}-${Date.now()}.webp` })
        reader.onerror = reject
        reader.readAsDataURL(blob)
      }, "image/webp", .84)
    }
    image.onerror = reject
    image.src = URL.createObjectURL(file)
  })
}

