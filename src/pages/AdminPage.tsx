import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
  LuActivity,
  LuCalendar,
  LuEye,
  LuFileText,
  LuLayoutDashboard,
  LuMail,
  LuMessageSquare,
  LuMousePointerClick,
  LuRefreshCw,
  LuSettings,
  LuStar,
  LuTrendingUp,
  LuUsers,
} from "react-icons/lu";
import {
  adminRequest,
  backendConfigured,
  imageToWebp,
  slugify,
} from "@/lib/backend";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";

type Row = Record<string, unknown> & { id: string; created_at?: string };

const tabs = [
  { id: "dashboard", label: "Tableau de bord", icon: LuLayoutDashboard },
  { id: "contacts", label: "Contacts", icon: LuMail },
  { id: "support", label: "Support", icon: LuMessageSquare },
  { id: "posts", label: "Blog", icon: LuFileText },
  { id: "analytics", label: "Statistiques", icon: LuActivity },
  { id: "faq", label: "FAQ", icon: LuSettings },
  { id: "testimonials", label: "Avis clients", icon: LuStar },
];

const lightButtonStyles = {
  bg: "#eef1f6",
  color: "#111827",
  border: "1px solid #d8dee9",
  fontWeight: "semibold",
  _hover: { bg: "#dde3ec", color: "#111827", borderColor: "#c4ccd9" },
  _active: { bg: "#cfd7e3", color: "#111827" },
  _focusVisible: { outline: "3px solid #00bd59", outlineOffset: "2px" },
};

// ── SVG Chart Utilities ──────────────────────────────────────────────────────

function getLast30Days(): string[] {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function formatShortDate(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${d}/${m}`;
}

// ── LineChart ────────────────────────────────────────────────────────────────

function LineChart({
  data,
  color = "#071FD6",
}: {
  data: { x: string; y: number }[];
  color?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  const W = 540,
    H = 160;
  const PAD = { top: 14, right: 12, bottom: 38, left: 42 };
  const cW = W - PAD.left - PAD.right;
  const cH = H - PAD.top - PAD.bottom;

  const maxY = Math.max(...data.map((d) => d.y), 1);
  const gradId = `lg-${color.replace("#", "")}`;

  const points = data.map((d, i) => ({
    px: PAD.left + (i / Math.max(data.length - 1, 1)) * cW,
    py: PAD.top + cH - (d.y / maxY) * cH,
    ...d,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.px.toFixed(1)},${p.py.toFixed(1)}`)
    .join(" ");
  const areaD = `${pathD} L${(PAD.left + cW).toFixed(1)},${(PAD.top + cH).toFixed(1)} L${PAD.left},${(PAD.top + cH).toFixed(1)} Z`;

  const yLabels = [maxY, Math.round(maxY / 2), 0];
  const showEvery = Math.ceil(data.length / 6);

  if (!data.length)
    return (
      <Flex h="160px" alignItems="center" justifyContent="center">
        <Text fontSize="sm" color="gray.400">
          Aucune donnée
        </Text>
      </Flex>
    );

  return (
    <Box position="relative" w="full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid & Y labels */}
        {yLabels.map((val, i) => {
          const y = PAD.top + cH - (val / maxY) * cH;
          return (
            <g key={i}>
              <line
                x1={PAD.left}
                y1={y}
                x2={PAD.left + cW}
                y2={y}
                stroke="#e8edf5"
                strokeWidth="1"
              />
              <text
                x={PAD.left - 6}
                y={y + 4}
                textAnchor="end"
                fontSize="9"
                fill="#9aaabb"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* X labels */}
        {points
          .filter((_, i) => i % showEvery === 0)
          .map((p) => (
            <text
              key={p.x}
              x={p.px}
              y={H - 6}
              textAnchor="middle"
              fontSize="8.5"
              fill="#9aaabb"
            >
              {formatShortDate(p.x)}
            </text>
          ))}

        {/* Area */}
        <path d={areaD} fill={`url(#${gradId})`} />

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Hover vertical line */}
        {hovered !== null && (
          <line
            x1={points[hovered].px}
            y1={PAD.top}
            x2={points[hovered].px}
            y2={PAD.top + cH}
            stroke={color}
            strokeWidth="1"
            strokeDasharray="3,3"
            opacity="0.5"
          />
        )}

        {/* Dots */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.px}
            cy={p.py}
            r={hovered === i ? 5 : 3}
            fill={hovered === i ? color : "white"}
            stroke={color}
            strokeWidth="2"
            style={{ cursor: "pointer", transition: "r .1s" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}

        {/* Tooltip */}
        {hovered !== null && (() => {
          const p = points[hovered];
          const tx = Math.min(Math.max(p.px - 30, 4), W - 64);
          const ty = Math.max(p.py - 36, 4);
          return (
            <g>
              <rect
                x={tx}
                y={ty}
                width="60"
                height="26"
                rx="5"
                fill="#071B63"
              />
              <text
                x={tx + 30}
                y={ty + 11}
                textAnchor="middle"
                fontSize="8"
                fill="rgba(255,255,255,.7)"
              >
                {formatShortDate(p.x)}
              </text>
              <text
                x={tx + 30}
                y={ty + 22}
                textAnchor="middle"
                fontSize="10"
                fill="white"
                fontWeight="bold"
              >
                {p.y}
              </text>
            </g>
          );
        })()}
      </svg>
    </Box>
  );
}

// ── HBarChart ────────────────────────────────────────────────────────────────

function HBarChart({
  data,
  color = "#23c55e",
}: {
  data: { label: string; value: number }[];
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  if (!data.length)
    return (
      <Text fontSize="sm" color="gray.400">
        Aucune donnée
      </Text>
    );
  return (
    <VStack alignItems="stretch" gap="2.5">
      {data.slice(0, 8).map(({ label, value }) => (
        <Box key={label}>
          <Flex justifyContent="space-between" mb="1.5">
            <Text
              fontSize="xs"
              color="#4b587c"
              maxW="180px"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {label}
            </Text>
            <Text fontSize="xs" fontWeight="bold" color="#000d4d" flexShrink={0}>
              {value}
            </Text>
          </Flex>
          <Box h="7px" bg="#f0f3f9" borderRadius="full" overflow="hidden">
            <Box
              h="full"
              w={`${(value / max) * 100}%`}
              bg={color}
              borderRadius="full"
              transition="width 0.9s cubic-bezier(.2,.8,.2,1)"
            />
          </Box>
        </Box>
      ))}
    </VStack>
  );
}

// ── DonutChart ───────────────────────────────────────────────────────────────

const DONUT_COLORS = [
  "#071FD6",
  "#23c55e",
  "#f59e0b",
  "#a855f7",
  "#0ea5e9",
  "#ef4444",
  "#14b8a6",
];

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number,
) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const gap = 0.8;
  const s = polarToCartesian(cx, cy, r, startAngle + gap);
  const e = polarToCartesian(cx, cy, r, endAngle - gap);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

function DonutChart({
  data,
}: {
  data: { label: string; value: number }[];
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const total = data.reduce((s, d) => s + d.value, 0);

  if (!total)
    return (
      <Text fontSize="sm" color="gray.400">
        Aucune donnée
      </Text>
    );

  const slices = useMemo(() => {
    let cum = 0;
    return data.slice(0, 7).map((d, i) => {
      const start = (cum / total) * 360;
      cum += d.value;
      const end = (cum / total) * 360;
      return {
        ...d,
        start,
        end,
        pct: Math.round((d.value / total) * 100),
        color: DONUT_COLORS[i % DONUT_COLORS.length],
      };
    });
  }, [data, total]);

  const cx = 72,
    cy = 72,
    R = 58,
    rInner = 38;

  return (
    <Flex alignItems="center" gap="6" flexWrap="wrap">
      <Box flexShrink={0}>
        <svg
          viewBox="0 0 144 144"
          style={{ width: "144px", height: "144px" }}
        >
          {slices.map((s, i) => (
            <path
              key={i}
              d={describeArc(cx, cy, R, s.start, s.end)}
              fill="none"
              stroke={s.color}
              strokeWidth={hovered === i ? 22 : 18}
              strokeLinecap="round"
              style={{ cursor: "pointer", transition: "stroke-width .15s" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
          <circle cx={cx} cy={cy} r={rInner} fill="white" />
          <text
            x={cx}
            y={cy - 7}
            textAnchor="middle"
            fontSize="18"
            fontWeight="bold"
            fill="#000d4d"
          >
            {hovered !== null ? slices[hovered].value : total}
          </text>
          <text
            x={cx}
            y={cy + 10}
            textAnchor="middle"
            fontSize="8"
            fill="#9aaabb"
          >
            {hovered !== null
              ? `${slices[hovered].pct}%`
              : "total"}
          </text>
        </svg>
      </Box>
      <VStack alignItems="flex-start" gap="2" flex="1" minW="120px">
        {slices.map((s, i) => (
          <HStack
            key={i}
            gap="2"
            cursor="pointer"
            opacity={hovered === null || hovered === i ? 1 : 0.45}
            transition="opacity .15s"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <Box
              w="10px"
              h="10px"
              borderRadius="full"
              bg={s.color}
              flexShrink={0}
            />
            <Text
              fontSize="xs"
              color="#4b587c"
              maxW="140px"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {s.label}
            </Text>
            <Text fontSize="xs" fontWeight="bold" color="#000d4d">
              {s.pct}%
            </Text>
          </HStack>
        ))}
      </VStack>
    </Flex>
  );
}

// ── HourBarChart ─────────────────────────────────────────────────────────────

function HourBarChart({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const W = 460,
    H = 80;
  const barW = Math.floor(W / 24) - 1;

  return (
    <Box w="full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {data.map((v, h) => {
          const bH = ((v / max) * (H - 22)) || 2;
          const x = h * (barW + 1);
          const y = H - 18 - bH;
          const isDay = h >= 8 && h <= 19;
          return (
            <g key={h}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={bH}
                rx="2"
                fill={isDay ? "#071FD6" : "#d1d9ef"}
                opacity={v === 0 ? 0.3 : 0.85}
              />
              {h % 4 === 0 && (
                <text
                  x={x + barW / 2}
                  y={H - 4}
                  textAnchor="middle"
                  fontSize="7.5"
                  fill="#9aaabb"
                >
                  {h}h
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <HStack gap="3" mt="1" justify="center">
        <HStack gap="1.5">
          <Box w="8px" h="8px" borderRadius="sm" bg="#071FD6" />
          <Text fontSize="2xs" color="#9aaabb">
            Heures ouvrées
          </Text>
        </HStack>
        <HStack gap="1.5">
          <Box w="8px" h="8px" borderRadius="sm" bg="#d1d9ef" />
          <Text fontSize="2xs" color="#9aaabb">
            Hors heures
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
}

// ── KpiCard ──────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  color,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  sub?: string;
  color: string;
  icon: React.ElementType;
}) {
  return (
    <Box
      bg="white"
      p="5"
      borderRadius="xl"
      border="1px solid #e8edf5"
      boxShadow="0 2px 12px rgba(0,13,77,.05)"
    >
      <Flex justifyContent="space-between" alignItems="flex-start" mb="3">
        <Text fontSize="xs" color="#586580" fontWeight="medium">
          {label}
        </Text>
        <Box
          w="8"
          h="8"
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ background: `${color}18` }}
          color={color}
        >
          <Icon size={15} />
        </Box>
      </Flex>
      <Text
        fontSize="2xl"
        fontWeight="extrabold"
        color="#000d4d"
        letterSpacing="-0.03em"
        lineHeight="1"
      >
        {value}
      </Text>
      {sub && (
        <Text fontSize="xs" color="#9aaabb" mt="1.5">
          {sub}
        </Text>
      )}
    </Box>
  );
}

// ── ChartCard ────────────────────────────────────────────────────────────────

function ChartCard({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      bg="white"
      p="5"
      borderRadius="xl"
      border="1px solid #e8edf5"
      boxShadow="0 2px 12px rgba(0,13,77,.05)"
    >
      <Box mb="4">
        <Text fontWeight="bold" color="#000d4d" fontSize="sm">
          {title}
        </Text>
        {sub && (
          <Text fontSize="xs" color="#9aaabb" mt="0.5">
            {sub}
          </Text>
        )}
      </Box>
      {children}
    </Box>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ code }: { code: string }) {
  const [analytics, setAnalytics] = useState<Row[]>([]);
  const [contacts, setContacts] = useState<Row[]>([]);
  const [posts, setPosts] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const [a, c, p] = await Promise.all([
      adminRequest(code, "analytics").catch(() => ({ data: [] })),
      adminRequest(code, "contacts").catch(() => ({ data: [] })),
      adminRequest(code, "posts").catch(() => ({ data: [] })),
    ]);
    setAnalytics(a.data || []);
    setContacts(c.data || []);
    setPosts(p.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const stats = useMemo(() => {
    const sessions = new Set(
      analytics.map((r) => r.session_id).filter(Boolean),
    ).size;
    const pageViews = analytics.filter((r) => r.event_name === "page_view").length;
    const ctaClicks = analytics.filter((r) => r.event_name === "cta_click").length;
    const demoForms = analytics.filter((r) => r.event_name === "demo_form").length;
    return { sessions, pageViews, ctaClicks, demoForms };
  }, [analytics]);

  const trafficData = useMemo(() => {
    const byDay = analytics
      .filter((r) => r.event_name === "page_view")
      .reduce<Record<string, number>>((acc, r) => {
        const day = String(r.created_at || "").slice(0, 10);
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});
    return getLast30Days().map((date) => ({ x: date, y: byDay[date] || 0 }));
  }, [analytics]);

  const topPages = useMemo(() => {
    const counts = analytics
      .filter((r) => r.event_name === "page_view")
      .reduce<Record<string, number>>((acc, r) => {
        const page = String(r.page_path || "/");
        acc[page] = (acc[page] || 0) + 1;
        return acc;
      }, {});
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([label, value]) => ({ label, value }));
  }, [analytics]);

  const eventDist = useMemo(() => {
    const counts = analytics.reduce<Record<string, number>>((acc, r) => {
      const key = String(r.event_name || "autre");
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([label, value]) => ({ label, value }));
  }, [analytics]);

  const topCtas = useMemo(() => {
    const counts = analytics
      .filter((r) => r.event_name === "cta_click" && r.element_label)
      .reduce<Record<string, number>>((acc, r) => {
        const label = String(r.element_label || "CTA");
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([label, value]) => ({ label, value }));
  }, [analytics]);

  if (loading)
    return (
      <Flex minH="60vh" alignItems="center" justifyContent="center">
        <VStack gap="3">
          <Box
            w="8"
            h="8"
            border="2px solid #23c55e"
            borderTopColor="transparent"
            borderRadius="full"
            animation="spin 0.7s linear infinite"
          />
          <Text fontSize="sm" color="gray.500">
            Chargement du tableau de bord…
          </Text>
        </VStack>
      </Flex>
    );

  return (
    <Box>
      {/* KPI Cards */}
      <SimpleGrid columns={{ base: 2, xl: 5 }} gap="4" mb="5">
        <KpiCard
          label="Sessions uniques"
          value={stats.sessions}
          sub="visiteurs identifiés"
          color="#23c55e"
          icon={LuUsers}
        />
        <KpiCard
          label="Pages vues"
          value={stats.pageViews}
          sub="événements page_view"
          color="#071FD6"
          icon={LuEye}
        />
        <KpiCard
          label="Clics CTA"
          value={stats.ctaClicks}
          sub="boutons cliqués"
          color="#f59e0b"
          icon={LuMousePointerClick}
        />
        <KpiCard
          label="Contacts reçus"
          value={contacts.length}
          sub="formulaires soumis"
          color="#a855f7"
          icon={LuMail}
        />
        <KpiCard
          label="Démos demandées"
          value={stats.demoForms}
          sub="formulaires démo"
          color="#0ea5e9"
          icon={LuCalendar}
        />
      </SimpleGrid>

      {/* Traffic + Distribution */}
      <Grid templateColumns={{ base: "1fr", lg: "1.6fr 1fr" }} gap="4" mb="4">
        <ChartCard
          title="Pages vues — 30 derniers jours"
          sub={`Total : ${stats.pageViews} vues · ${stats.sessions} sessions`}
        >
          <LineChart data={trafficData} color="#071FD6" />
        </ChartCard>
        <ChartCard
          title="Répartition des événements"
          sub={`${analytics.length} événements totaux`}
        >
          <DonutChart data={eventDist} />
        </ChartCard>
      </Grid>

      {/* Top Pages + Top CTAs + Contacts + Posts */}
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "1fr 1fr 1fr 1fr" }} gap="4" mb="4">
        <ChartCard title="Pages les plus visitées" sub="par nombre de vues">
          <HBarChart data={topPages} color="#071FD6" />
        </ChartCard>

        <ChartCard title="CTAs les plus cliqués" sub="par nombre de clics">
          {topCtas.length ? (
            <HBarChart data={topCtas} color="#f59e0b" />
          ) : (
            <Text fontSize="sm" color="gray.400">
              Aucun clic CTA tracé
            </Text>
          )}
        </ChartCard>

        <ChartCard title="Derniers contacts" sub={`${contacts.length} total`}>
          <VStack alignItems="stretch" gap="2.5">
            {contacts.slice(0, 5).map((c) => (
              <Box
                key={c.id}
                p="3"
                bg="#f8fafb"
                borderRadius="lg"
                border="1px solid #edf0f6"
              >
                <Text fontSize="xs" fontWeight="bold" color="#000d4d" noOfLines={1}>
                  {[c.first_name, c.last_name]
                    .filter(Boolean)
                    .map(String)
                    .join(" ") || String(c.email || "Contact")}
                </Text>
                <Text fontSize="2xs" color="gray.500" mt="0.5">
                  {String(c.company || "")}
                  {c.created_at
                    ? ` · ${new Date(String(c.created_at)).toLocaleDateString("fr-FR")}`
                    : ""}
                </Text>
              </Box>
            ))}
            {!contacts.length && (
              <Text fontSize="sm" color="gray.400">
                Aucun contact
              </Text>
            )}
          </VStack>
        </ChartCard>

        <ChartCard title="Articles publiés" sub={`${posts.filter((p) => p.status === "published").length} publiés`}>
          <VStack alignItems="stretch" gap="2.5">
            {posts.slice(0, 5).map((p) => (
              <Box
                key={p.id}
                p="3"
                bg="#f8fafb"
                borderRadius="lg"
                border="1px solid #edf0f6"
              >
                <Text fontSize="xs" fontWeight="bold" color="#000d4d" noOfLines={2}>
                  {String(p.title || "Article")}
                </Text>
                <HStack gap="2" mt="0.5">
                  <Box
                    px="1.5"
                    py="0.5"
                    borderRadius="full"
                    bg={p.status === "published" ? "#dcfce7" : "#fef3c7"}
                    color={p.status === "published" ? "#15803d" : "#92400e"}
                    fontSize="2xs"
                    fontWeight="bold"
                  >
                    {p.status === "published" ? "Publié" : "Brouillon"}
                  </Box>
                  {p.published_at && (
                    <Text fontSize="2xs" color="gray.400">
                      {new Date(String(p.published_at)).toLocaleDateString("fr-FR")}
                    </Text>
                  )}
                </HStack>
              </Box>
            ))}
            {!posts.length && (
              <Text fontSize="sm" color="gray.400">
                Aucun article
              </Text>
            )}
          </VStack>
        </ChartCard>
      </Grid>

      {/* Refresh */}
      <Flex justifyContent="flex-end">
        <Button
          size="sm"
          variant="ghost"
          color="#586580"
          gap="1.5"
          onClick={fetchAll}
          _hover={{ color: "#000d4d" }}
        >
          <LuRefreshCw size={13} /> Actualiser le tableau de bord
        </Button>
      </Flex>
    </Box>
  );
}

// ── Analytics (enhanced) ─────────────────────────────────────────────────────

function Analytics({ rows }: { rows: Row[] }) {
  const stats = useMemo(() => {
    const sessions = new Set(rows.map((r) => r.session_id).filter(Boolean)).size;
    const pageViews = rows.filter((r) => r.event_name === "page_view").length;
    const ctaClicks = rows.filter((r) => r.event_name === "cta_click").length;
    return { sessions, pageViews, ctaClicks };
  }, [rows]);

  const trafficData = useMemo(() => {
    const byDay = rows
      .filter((r) => r.event_name === "page_view")
      .reduce<Record<string, number>>((acc, r) => {
        const day = String(r.created_at || "").slice(0, 10);
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});
    return getLast30Days().map((date) => ({ x: date, y: byDay[date] || 0 }));
  }, [rows]);

  const allEventsData = useMemo(() => {
    const byDay = rows.reduce<Record<string, number>>((acc, r) => {
      const day = String(r.created_at || "").slice(0, 10);
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});
    return getLast30Days().map((date) => ({ x: date, y: byDay[date] || 0 }));
  }, [rows]);

  const pagesCounts = useMemo(() => {
    const counts = rows
      .filter((r) => r.event_name === "page_view")
      .reduce<Record<string, number>>((acc, r) => {
        const page = String(r.page_path || "/");
        acc[page] = (acc[page] || 0) + 1;
        return acc;
      }, {});
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([label, value]) => ({ label, value }));
  }, [rows]);

  const eventDist = useMemo(() => {
    const counts = rows.reduce<Record<string, number>>((acc, r) => {
      const key = String(r.event_name || "autre");
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([label, value]) => ({ label, value }));
  }, [rows]);

  const hourData = useMemo(() => {
    const counts = Array(24).fill(0) as number[];
    rows.forEach((r) => {
      const h = new Date(String(r.created_at || "")).getHours();
      if (!isNaN(h)) counts[h]++;
    });
    return counts;
  }, [rows]);

  const topCtas = useMemo(() => {
    const counts = rows
      .filter((r) => r.event_name === "cta_click" && r.element_label)
      .reduce<Record<string, number>>((acc, r) => {
        const label = String(r.element_label);
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([label, value]) => ({ label, value }));
  }, [rows]);

  const referrers = useMemo(() => {
    const counts = rows
      .filter((r) => r.referrer && String(r.referrer).startsWith("http"))
      .reduce<Record<string, number>>((acc, r) => {
        try {
          const host = new URL(String(r.referrer)).hostname.replace("www.", "");
          acc[host] = (acc[host] || 0) + 1;
        } catch { /* skip */ }
        return acc;
      }, {});
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([label, value]) => ({ label, value }));
  }, [rows]);

  return (
    <Box>
      {/* KPI */}
      <SimpleGrid columns={{ base: 2, md: 3 }} gap="4" mb="5">
        <KpiCard label="Sessions uniques" value={stats.sessions} color="#23c55e" icon={LuUsers} />
        <KpiCard label="Pages vues" value={stats.pageViews} color="#071FD6" icon={LuEye} />
        <KpiCard label="Clics CTA" value={stats.ctaClicks} color="#f59e0b" icon={LuMousePointerClick} />
      </SimpleGrid>

      {/* Traffic timelines */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="4" mb="4">
        <ChartCard title="Pages vues — 30 derniers jours" sub="événements page_view">
          <LineChart data={trafficData} color="#071FD6" />
        </ChartCard>
        <ChartCard title="Tous les événements — 30 jours" sub="activité totale">
          <LineChart data={allEventsData} color="#23c55e" />
        </ChartCard>
      </Grid>

      {/* Pages + Distribution */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="4" mb="4">
        <ChartCard title="Pages les plus visitées" sub="par nombre de page_view">
          <HBarChart data={pagesCounts} color="#071FD6" />
        </ChartCard>
        <ChartCard title="Répartition des événements" sub="types d'actions">
          <DonutChart data={eventDist} />
        </ChartCard>
      </Grid>

      {/* CTA + Hour + Referrers */}
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "1fr 1fr 1fr" }} gap="4" mb="4">
        <ChartCard title="CTAs les plus cliqués" sub="par libellé bouton">
          {topCtas.length ? (
            <HBarChart data={topCtas} color="#f59e0b" />
          ) : (
            <Text fontSize="sm" color="gray.400">
              Aucun clic CTA tracé
            </Text>
          )}
        </ChartCard>

        <ChartCard title="Activité par heure" sub="distribution sur 24h">
          <HourBarChart data={hourData} />
        </ChartCard>

        <ChartCard title="Sources de trafic" sub="domaines référents">
          {referrers.length ? (
            <HBarChart data={referrers} color="#a855f7" />
          ) : (
            <Text fontSize="sm" color="gray.400">
              Aucun référent externe
            </Text>
          )}
        </ChartCard>
      </Grid>

      {/* Raw table */}
      <ChartCard title="Derniers événements" sub={`${rows.length} événements au total`}>
        <VStack alignItems="stretch" gap="2" maxH="340px" overflowY="auto">
          {rows.slice(0, 30).map((row) => (
            <Flex
              key={row.id}
              py="2.5"
              px="3"
              bg="#f8fafb"
              borderRadius="lg"
              alignItems="center"
              gap="3"
              flexWrap="wrap"
            >
              <Box
                px="2"
                py="0.5"
                borderRadius="full"
                bg={
                  row.event_name === "page_view"
                    ? "#e0e7ff"
                    : row.event_name === "cta_click"
                      ? "#fef3c7"
                      : "#dcfce7"
                }
                color={
                  row.event_name === "page_view"
                    ? "#3730a3"
                    : row.event_name === "cta_click"
                      ? "#92400e"
                      : "#15803d"
                }
                fontSize="2xs"
                fontWeight="bold"
                flexShrink={0}
              >
                {String(row.event_name || "event")}
              </Box>
              <Text fontSize="xs" color="#4b587c" flex="1" minW="0" noOfLines={1}>
                {String(row.page_path || "")}
                {row.element_label ? ` · ${String(row.element_label)}` : ""}
              </Text>
              <Text fontSize="2xs" color="gray.400" flexShrink={0}>
                {row.created_at
                  ? new Date(String(row.created_at)).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </Text>
            </Flex>
          ))}
        </VStack>
      </ChartCard>
    </Box>
  );
}

// ── Stat (simple) ─────────────────────────────────────────────────────────────

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Box bg="white" p="6" borderRadius="xl" border="1px solid #e8edf5">
      <Text color="gray.500" fontSize="sm">
        {label}
      </Text>
      <Text color="#000d4d" fontWeight="extrabold" fontSize="3xl">
        {value}
      </Text>
    </Box>
  );
}

// ── Editor ───────────────────────────────────────────────────────────────────

function Editor({
  resource,
  code,
  onDone,
}: {
  resource: string;
  code: string;
  onDone: () => void;
}) {
  const [form, setForm] = useState<Record<string, string>>({
    title: "",
    excerpt: "",
    content: "",
    image_alt: "",
    sources: "",
    question: "",
    answer: "",
    quote: "",
    author_name: "",
    author_role: "",
    company: "",
    page_path: "/",
    status: "published",
  });
  const [file, setFile] = useState<File | null>(null),
    [busy, setBusy] = useState(false);
  const save = async () => {
    setBusy(true);
    try {
      let payload: Record<string, unknown>;
      if (resource === "posts") {
        let image_url = "";
        if (file) {
          const converted = await imageToWebp(file, form.title);
          image_url = (
            await adminRequest(code, "posts", "POST", {
              action: "upload-image",
              ...converted,
            })
          ).url;
        }
        const sources = form.sources
          .split("\n")
          .map((line) => {
            const [label, ...url] = line.split("|");
            return { label: label?.trim(), url: url.join("|").trim() };
          })
          .filter(
            (source) => source.label && /^https:\/\//.test(source.url),
          );
        payload = {
          title: form.title,
          slug: slugify(form.title),
          excerpt: form.excerpt,
          content: form.content,
          image_url,
          image_alt: form.image_alt,
          sources,
          status: form.status,
          published_at: new Date().toISOString(),
        };
      } else if (resource === "faq")
        payload = {
          question: form.question,
          answer: form.answer,
          page_path: form.page_path,
          active: true,
          sort_order: 0,
        };
      else
        payload = {
          quote: form.quote,
          name: form.author_name,
          role: form.author_role,
          company: form.company,
          active: true,
          sort_order: 0,
        };
      await adminRequest(code, resource, "POST", payload);
      onDone();
    } finally {
      setBusy(false);
    }
  };
  return (
    <Box bg="white" p="5" borderRadius="xl" mb="6" border="1px solid #e8edf5">
      <Text fontWeight="bold" color="#000d4d" mb="3">
        Ajouter
      </Text>
      {resource === "posts" ? (
        <Grid gap="3">
          <Input
            placeholder="Titre"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Input
            placeholder="Résumé"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
          <Textarea
            minH="260px"
            placeholder="Contenu de l'article (## pour un intertitre)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <Textarea
            placeholder={"Sources officielles, une par ligne :\nNom de la source | https://…"}
            value={form.sources}
            onChange={(e) => setForm({ ...form, sources: e.target.value })}
          />
          <Input
            placeholder="Texte alternatif SEO de l'image"
            value={form.image_alt}
            onChange={(e) => setForm({ ...form, image_alt: e.target.value })}
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </Grid>
      ) : resource === "faq" ? (
        <Grid gap="3">
          <Input
            placeholder="Question"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
          />
          <Textarea
            placeholder="Réponse"
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
          />
          <Input
            placeholder="Page (/tarifs, /donnees…)"
            value={form.page_path}
            onChange={(e) =>
              setForm({ ...form, page_path: e.target.value })
            }
          />
        </Grid>
      ) : (
        <Grid gap="3">
          <Textarea
            placeholder="Avis"
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
          />
          <Input
            placeholder="Nom"
            value={form.author_name}
            onChange={(e) =>
              setForm({ ...form, author_name: e.target.value })
            }
          />
          <Input
            placeholder="Fonction"
            value={form.author_role}
            onChange={(e) =>
              setForm({ ...form, author_role: e.target.value })
            }
          />
          <Input
            placeholder="Entreprise"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </Grid>
      )}
      <Button
        mt="3"
        bg="#00bd59"
        color="white"
        _hover={{ bg: "#00a84f" }}
        _active={{ bg: "#008f43" }}
        onClick={save}
        disabled={busy}
      >
        {busy ? "Enregistrement…" : "Publier"}
      </Button>
    </Box>
  );
}

// ── RowList ───────────────────────────────────────────────────────────────────

function RowList({
  rows,
  resource,
  code,
  onDone,
  loading,
}: {
  rows: Row[];
  resource: string;
  code: string;
  onDone: () => void;
  loading: boolean;
}) {
  const editable = ["posts", "faq", "testimonials"].includes(resource);
  const [faqPageFilter, setFaqPageFilter] = useState("all");
  const faqPagePaths = useMemo(
    () =>
      [...new Set(rows.map((row) => String(row.page_path || "/")))].sort(
        (a, b) => a.localeCompare(b, "fr"),
      ),
    [rows],
  );
  const displayedRows = useMemo(
    () =>
      resource === "faq" && faqPageFilter !== "all"
        ? rows.filter(
            (row) => String(row.page_path || "/") === faqPageFilter,
          )
        : rows,
    [faqPageFilter, resource, rows],
  );
  const edit = async (row: Row) => {
    const source =
      resource === "posts"
        ? {
            title: row.title,
            excerpt: row.excerpt,
            content: row.content,
            image_alt: row.image_alt,
            sources: row.sources,
            status: row.status,
          }
        : resource === "faq"
          ? {
              question: row.question,
              answer: row.answer,
              page_path: row.page_path,
              active: row.active,
            }
          : {
              quote: row.quote,
              name: row.name,
              role: row.role,
              company: row.company,
              rating: row.rating,
              active: row.active,
            };
    const next = prompt(
      "Modifiez les informations au format JSON :",
      JSON.stringify(source, null, 2),
    );
    if (!next) return;
    try {
      const changes = JSON.parse(next);
      if (resource === "posts" && changes.title)
        changes.slug = slugify(changes.title);
      await adminRequest(code, resource, "PATCH", { id: row.id, ...changes });
      onDone();
    } catch {
      alert("JSON invalide : aucune modification enregistrée.");
    }
  };
  if (loading) return <Text>Chargement…</Text>;
  return (
    <Grid gap="3">
      {resource === "faq" && (
        <Flex
          bg="white"
          border="1px solid #d8dee9"
          borderRadius="xl"
          p={{ base: "4", md: "5" }}
          align={{ base: "stretch", md: "end" }}
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap="4"
        >
          <Box flex="1" maxW={{ md: "420px" }}>
            <Text
              as="label"
              htmlFor="faq-page-filter"
              display="block"
              mb="2"
              color="#000d4d"
              fontWeight="bold"
              fontSize="sm"
            >
              Filtrer les questions par page
            </Text>
            <NativeSelectRoot>
              <NativeSelectField
                id="faq-page-filter"
                value={faqPageFilter}
                onChange={(event) => setFaqPageFilter(event.target.value)}
                bg="#eef1f6"
                color="#111827"
                borderColor="#c4ccd9"
                _hover={{ borderColor: "#000d4d" }}
                _focusVisible={{
                  borderColor: "#00a84f",
                  outline: "3px solid rgba(0, 189, 89, .2)",
                }}
              >
                <option value="all">Toutes les pages</option>
                {faqPagePaths.map((path) => (
                  <option key={path} value={path}>
                    {path === "/" ? "Accueil (/)" : path}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>
          </Box>
          <Text color="#4b5563" fontSize="sm" fontWeight="semibold">
            {displayedRows.length} question
            {displayedRows.length > 1 ? "s" : ""} affichée
            {displayedRows.length > 1 ? "s" : ""}
          </Text>
        </Flex>
      )}
      {displayedRows.map((row) => (
        <Box
          key={row.id}
          bg="white"
          p="4"
          borderRadius="xl"
          border="1px solid #edf0f6"
        >
          <Flex justify="space-between" gap="4">
            <Box minW="0">
              <Text fontWeight="bold" color="#000d4d">
                {String(
                  row.title ||
                    row.question ||
                    row.subject ||
                    row.email ||
                    row.name ||
                    "Élément",
                )}
              </Text>
              {resource === "faq" && (
                <Text
                  display="inline-block"
                  mt="2"
                  mb="1"
                  px="2.5"
                  py="1"
                  borderRadius="full"
                  bg="#e6f8ee"
                  color="#076b38"
                  fontSize="xs"
                  fontWeight="bold"
                >
                  Page : {String(row.page_path || "/")}
                </Text>
              )}
              {(resource === "contacts" || resource === "support") && (
                <Text fontSize="sm" color="#26345f">
                  {[
                    row.first_name,
                    row.last_name,
                    row.company,
                    row.activity,
                    row.zone,
                    row.phone,
                  ]
                    .filter(Boolean)
                    .map(String)
                    .join(" · ")}
                </Text>
              )}
              <Text fontSize="sm" color="gray.600" whiteSpace="pre-wrap">
                {String(
                  row.message ||
                    row.excerpt ||
                    row.answer ||
                    row.quote ||
                    "",
                )}
              </Text>
              <Text fontSize="xs" color="gray.400" mt="2">
                {row.created_at
                  ? new Date(String(row.created_at)).toLocaleString("fr-FR")
                  : ""}
              </Text>
            </Box>
            <Flex gap="2" wrap="wrap" justify="flex-end">
              {row.email ? (
                <Button asChild size="sm" {...lightButtonStyles}>
                  <a href={`mailto:${String(row.email)}`}>Répondre</a>
                </Button>
              ) : null}
              {row.phone ? (
                <Button asChild size="sm" {...lightButtonStyles}>
                  <a href={`tel:${String(row.phone)}`}>Appeler</a>
                </Button>
              ) : null}
              {editable && (
                <Button
                  size="sm"
                  {...lightButtonStyles}
                  onClick={() => edit(row)}
                >
                  Modifier
                </Button>
              )}
              {editable && (
                <Button
                  size="sm"
                  colorPalette="red"
                  _hover={{ bg: "red.600" }}
                  _active={{ bg: "red.700" }}
                  onClick={async () => {
                    if (confirm("Supprimer cet élément ?")) {
                      await adminRequest(code, resource, "DELETE", {
                        id: row.id,
                      });
                      onDone();
                    }
                  }}
                >
                  Supprimer
                </Button>
              )}
            </Flex>
          </Flex>
        </Box>
      ))}
      {!displayedRows.length && (
        <Text color="gray.500">
          {resource === "faq" && faqPageFilter !== "all"
            ? "Aucune question pour cette page."
            : "Aucune donnée pour le moment."}
        </Text>
      )}
    </Grid>
  );
}

// ── AdminPage ─────────────────────────────────────────────────────────────────

export function AdminPage() {
  const [code, setCode] = useState(
    () => sessionStorage.getItem("pisteur_admin_code") || "",
  );
  const [logged, setLogged] = useState(false),
    [tab, setTab] = useState("dashboard"),
    [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState(""),
    [loading, setLoading] = useState(false);

  const load = async (resource = tab, auth = code) => {
    if (resource === "dashboard") return;
    setLoading(true);
    setError("");
    try {
      const result = await adminRequest(auth, resource);
      setRows(result.data || []);
      setLogged(true);
      sessionStorage.setItem("pisteur_admin_code", auth);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  const loginAndLoad = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await adminRequest(code, "contacts");
      setRows(result.data || []);
      setLogged(true);
      setTab("dashboard");
      sessionStorage.setItem("pisteur_admin_code", code);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (logged && tab !== "dashboard") load(tab);
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!logged)
    return (
      <Flex minH="100vh" align="center" justify="center" bg="#f5f7fb" px="4">
        <Box
          bg="white"
          p="8"
          borderRadius="2xl"
          boxShadow="0 20px 60px rgba(0,13,77,.12)"
          maxW="420px"
          w="full"
        >
          <HStack gap="3" mb="5">
            <Box
              w="10"
              h="10"
              borderRadius="xl"
              bg="#e8f5e9"
              color="#23c55e"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <LuLayoutDashboard size={20} />
            </Box>
            <Box>
              <Text fontSize="xl" fontWeight="extrabold" color="#000d4d">
                Administration Pisteur
              </Text>
              <Text fontSize="xs" color="gray.400">
                Back-office sécurisé
              </Text>
            </Box>
          </HStack>
          <Text color="gray.500" mb="4" fontSize="sm">
            Saisissez votre code d'accès sécurisé.
          </Text>
          <Input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && loginAndLoad()}
            placeholder="Code d'accès"
          />
          <Button
            mt="4"
            w="full"
            bg="#00bd59"
            color="white"
            _hover={{ bg: "#00a84f" }}
            _active={{ bg: "#008f43" }}
            onClick={loginAndLoad}
            disabled={loading}
          >
            {loading ? "Vérification…" : "Se connecter"}
          </Button>
          {!backendConfigured && (
            <Text mt="4" color="orange.600" fontSize="sm">
              Configurez d'abord les variables Supabase.
            </Text>
          )}
          {error && (
            <Text mt="3" color="red.500">
              {error}
            </Text>
          )}
        </Box>
      </Flex>
    );

  return (
    <Flex minH="100vh" bg="#f5f7fb" align="stretch">
      {/* Sidebar */}
      <Box
        w={{ base: "72px", md: "240px" }}
        bg="#000d4d"
        color="white"
        p={{ base: "3", md: "5" }}
        flexShrink={0}
      >
        <HStack
          gap="2.5"
          mb="8"
          display={{ base: "none", md: "flex" }}
          px="1"
        >
          <Box
            w="8"
            h="8"
            borderRadius="lg"
            bg="#23c55e"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <LuTrendingUp size={16} color="white" />
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="extrabold" lineHeight="1.1">
              Pisteur Admin
            </Text>
            <Text fontSize="2xs" color="whiteAlpha.500">
              Back-office
            </Text>
          </Box>
        </HStack>

        <VStack align="stretch" gap="1">
          {tabs.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <Button
                key={item.id}
                justifyContent={{ base: "center", md: "flex-start" }}
                variant="ghost"
                color={active ? "#00e06f" : "whiteAlpha.700"}
                bg={active ? "whiteAlpha.100" : "transparent"}
                borderRadius="lg"
                gap="2.5"
                px={{ base: "2", md: "3" }}
                py="2"
                h="auto"
                _hover={{
                  bg: "whiteAlpha.150",
                  color: active ? "#00e06f" : "white",
                }}
                _active={{ bg: "whiteAlpha.200" }}
                onClick={() => setTab(item.id)}
              >
                <Box flexShrink={0}>
                  <Icon size={17} />
                </Box>
                <Text
                  display={{ base: "none", md: "block" }}
                  fontSize="sm"
                  fontWeight={active ? "bold" : "medium"}
                >
                  {item.label}
                </Text>
              </Button>
            );
          })}
        </VStack>

        <Box mt="auto" pt="8">
          <Button
            w={{ base: "full", md: "full" }}
            size="sm"
            bg="transparent"
            color="whiteAlpha.500"
            border="1px solid"
            borderColor="whiteAlpha.200"
            fontWeight="medium"
            fontSize="xs"
            _hover={{ bg: "#dc2626", color: "white", borderColor: "#dc2626" }}
            onClick={() => {
              sessionStorage.removeItem("pisteur_admin_code");
              setLogged(false);
            }}
          >
            <Box display={{ base: "block", md: "none" }}>⏻</Box>
            <Text display={{ base: "none", md: "block" }}>Déconnexion</Text>
          </Button>
        </Box>
      </Box>

      {/* Main */}
      <Box flex="1" p={{ base: "4", md: "6" }} overflow="auto">
        {/* Header */}
        <Flex justify="space-between" align="center" mb="6">
          <Box>
            <Text color="#00a84f" fontWeight="bold" fontSize="xs" letterSpacing="wide">
              BACK-OFFICE
            </Text>
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="extrabold"
              color="#000d4d"
            >
              {tabs.find((x) => x.id === tab)?.label}
            </Text>
          </Box>
          {tab !== "dashboard" && (
            <Button
              onClick={() => load()}
              disabled={loading}
              bg="#000d4d"
              color="white"
              border="1px solid #000d4d"
              fontWeight="bold"
              size="sm"
              boxShadow="0 4px 12px rgba(0, 13, 77, .18)"
              _hover={{ bg: "#10226f", borderColor: "#10226f", transform: "translateY(-1px)" }}
              _active={{ bg: "#07185c", transform: "translateY(0)" }}
              _focusVisible={{ outline: "3px solid #00bd59", outlineOffset: "2px" }}
            >
              {loading ? "Actualisation…" : "Actualiser"}
            </Button>
          )}
        </Flex>

        {error && (
          <Text color="red.500" mb="4" fontSize="sm">
            {error}
          </Text>
        )}

        {/* Content */}
        {tab === "dashboard" ? (
          <Dashboard code={code} />
        ) : tab === "analytics" ? (
          <Analytics rows={rows} />
        ) : (
          <>
            {["posts", "faq", "testimonials"].includes(tab) && (
              <Editor resource={tab} code={code} onDone={() => load()} />
            )}
            <RowList
              rows={rows}
              resource={tab}
              code={code}
              onDone={() => load()}
              loading={loading}
            />
          </>
        )}
      </Box>
    </Flex>
  );
}

// Keep for backward compatibility
function _Stat({ label, value }: { label: string; value: number }) {
  return <Stat label={label} value={value} />;
}
void _Stat;
