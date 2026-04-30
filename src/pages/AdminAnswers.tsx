import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { normalizeState } from '../lib/nigerianStates'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'

interface Applicant {
  id: string
  created_at: string
  full_name: string
  phone: string
  email: string | null
  city: string
  has_sales_exp: boolean
  sales_exp_detail: string | null
  call_comfort: 'yes' | 'somewhat' | 'no'
  hours_per_day: '1-2' | '2-4' | '4+'
  has_stable_internet: boolean
  why_interested: string
  income_goal: string
  commission_ok: boolean
}

const ORANGE = '#F26522'
const DARK = '#1a1a1a'
const PIE_COLORS = [ORANGE, '#e5e7eb']
const COMFORT_COLORS: Record<string, string> = { yes: '#22c55e', somewhat: '#f59e0b', no: '#ef4444' }
const COMFORT_LABELS: Record<string, string> = { yes: 'Comfortable', somewhat: 'Somewhat', no: 'Not Comfortable' }
const HOURS_LABELS: Record<string, string> = { '1-2': '1–2 hrs', '2-4': '2–4 hrs', '4+': '4+ hrs' }

function countBy<T>(arr: T[], key: keyof T): { name: string; value: number }[] {
  const map: Record<string, number> = {}
  arr.forEach((a) => {
    const k = String(a[key]).trim()
    map[k] = (map[k] || 0) + 1
  })
  return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
}

function countByCity(arr: Applicant[]): { name: string; value: number }[] {
  const map: Record<string, number> = {}
  arr.forEach((a) => {
    const normalized = normalizeState(a.city)
    map[normalized] = (map[normalized] || 0) + 1
  })
  return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
}

const pct = (n: number, total: number) => total ? `${Math.round((n / total) * 100)}%` : '—'

// ── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-20 bg-white border-r border-gray-100 min-h-screen flex-shrink-0 items-center py-6">
      <img src="/icon.png" alt="Skage.dev" className="w-10 h-10 rounded-xl object-contain" />
    </aside>
  )
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  label, value, sub, accent
}: { label: string; value: string | number; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 flex flex-col gap-3 ${accent ? 'bg-[#F26522]' : 'bg-white border border-gray-100'}`}>
      <p className={`text-xs font-semibold uppercase tracking-widest ${accent ? 'text-white/70' : 'text-gray-400'}`}>
        {label}
      </p>
      <p className={`text-4xl font-bold leading-none ${accent ? 'text-white' : 'text-gray-900'}`}>{value}</p>
      {sub && <p className={`text-xs ${accent ? 'text-white/60' : 'text-gray-400'}`}>{sub}</p>}
    </div>
  )
}

// ── Chart card ────────────────────────────────────────────────────────────────
function ChartCard({ title, sub, children, className = '' }: { title: string; sub?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 p-6 flex flex-col ${className}`}>
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      {children}
    </div>
  )
}

// ── Donut chart ───────────────────────────────────────────────────────────────
function DonutChart({ yes, no, yesLabel, noLabel }: { yes: number; no: number; yesLabel: string; noLabel: string }) {
  const data = [{ name: yesLabel, value: yes }, { name: noLabel, value: no }]
  const total = yes + no
  return (
    <div className="relative flex-1 flex items-center justify-center">
      <ResponsiveContainer width="100%" height={170}>
        <PieChart>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={52} outerRadius={72} paddingAngle={3} startAngle={90} endAngle={-270}>
            {data.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} strokeWidth={0} />)}
          </Pie>
          <Tooltip formatter={(v) => [`${v} (${pct(Number(v), total)})`, '']} />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-2xl font-bold text-gray-900">{pct(yes, total)}</p>
        <p className="text-xs text-gray-400">{yesLabel}</p>
      </div>
    </div>
  )
}

// ── Badge ─────────────────────────────────────────────────────────────────────
function Badge({ yes, yesLabel = 'Yes', noLabel = 'No' }: { yes: boolean; yesLabel?: string; noLabel?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
      yes ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'
    }`}>
      {yes ? yesLabel : noLabel}
    </span>
  )
}

function ComfortBadge({ value }: { value: 'yes' | 'somewhat' | 'no' }) {
  const styles = { yes: 'bg-green-50 text-green-700', somewhat: 'bg-amber-50 text-amber-700', no: 'bg-red-50 text-red-600' }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${styles[value]}`}>
      {COMFORT_LABELS[value]}
    </span>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────
function Empty({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 0 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
      </div>
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AdminAnswers() {
  const [data, setData] = useState<Applicant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    supabase
      .from('applicants')
      .select('*')
      .order('created_at', { ascending: false })
      .then((res) => {
        if (res.error) setError(res.error.message)
        else setData(res.data ?? [])
        setLoading(false)
      })
  }, [])

  const total = data.length
  const withSalesExp = data.filter((a) => a.has_sales_exp).length
  const commissionOk = data.filter((a) => a.commission_ok).length
  const stableNet = data.filter((a) => a.has_stable_internet).length

  const comfortData = countBy(data, 'call_comfort').map((d) => ({
    name: COMFORT_LABELS[d.name] ?? d.name,
    value: d.value,
    fill: COMFORT_COLORS[d.name] ?? ORANGE,
  }))
  const hoursData = countBy(data, 'hours_per_day').map((d) => ({ ...d, name: HOURS_LABELS[d.name] ?? d.name }))
  const cityData = countByCity(data).slice(0, 7)
  const incomeData = countBy(data, 'income_goal').slice(0, 6)

  const filtered = data.filter((a) =>
    [a.full_name, a.phone, a.city, a.email ?? ''].join(' ').toLowerCase().includes(search.toLowerCase())
  )

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="flex min-h-screen bg-[#f7f7f6] font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-10">
          <div>
            <h1 className="text-base font-bold text-gray-900">Applications Dashboard</h1>
            <p className="text-xs text-gray-400">{today}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                type="text"
                placeholder="Search applicants…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#F26522]/25 focus:border-[#F26522] w-52"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#F26522] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">S</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-5 overflow-auto">
          {loading && (
            <div className="flex items-center justify-center py-32">
              <div className="flex items-center gap-3 text-gray-400">
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                <span className="text-sm">Loading data…</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-sm text-red-500">
              <strong>Error:</strong> {error}. Make sure you've run the SQL to create the applicants table and RLS policy.
            </div>
          )}

          {!loading && !error && (
            <>
              {/* ── Stat row ── */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Applicants" value={total} sub="All time" accent />
                <StatCard label="Sales Experience" value={pct(withSalesExp, total)} sub={`${withSalesExp} applicants`} />
                <StatCard label="Commission Ready" value={pct(commissionOk, total)} sub={`${commissionOk} applicants`} />
                <StatCard label="Stable Internet" value={pct(stableNet, total)} sub={`${stableNet} applicants`} />
              </div>

              {/* ── Bento row 1: 3 donuts ── */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ChartCard title="Sales Experience" sub="Prior background in sales">
                  <DonutChart yes={withSalesExp} no={total - withSalesExp} yesLabel="Experienced" noLabel="No exp." />
                </ChartCard>
                <ChartCard title="Commission-Based OK" sub="Comfortable with performance pay">
                  <DonutChart yes={commissionOk} no={total - commissionOk} yesLabel="Commission OK" noLabel="Not OK" />
                </ChartCard>
                <ChartCard title="Stable Internet" sub="Has reliable phone & internet">
                  <DonutChart yes={stableNet} no={total - stableNet} yesLabel="Stable" noLabel="Unstable" />
                </ChartCard>
              </div>

              {/* ── Bento row 2: comfort + hours ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ChartCard title="Call Comfort" sub="Comfort talking to business owners">
                  {comfortData.length === 0
                    ? <Empty message="No data yet" />
                    : (
                      <ResponsiveContainer width="100%" height={190}>
                        <BarChart data={comfortData} barSize={44}>
                          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                          <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: 12, border: '1px solid #f3f4f6', fontSize: 12 }} />
                          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            {comfortData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    )
                  }
                </ChartCard>

                <ChartCard title="Daily Availability" sub="Hours per day applicants can commit">
                  {hoursData.length === 0
                    ? <Empty message="No data yet" />
                    : (
                      <ResponsiveContainer width="100%" height={190}>
                        <BarChart data={hoursData} barSize={44}>
                          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                          <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: 12, border: '1px solid #f3f4f6', fontSize: 12 }} />
                          <Bar dataKey="value" fill={DARK} radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    )
                  }
                </ChartCard>
              </div>

              {/* ── Bento row 3: income + cities ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ChartCard title="Income Goals" sub="30-day income targets">
                  {incomeData.length === 0
                    ? <Empty message="No data yet" />
                    : (
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={incomeData} layout="vertical" barSize={22}>
                          <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                          <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} width={100} />
                          <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: 12, border: '1px solid #f3f4f6', fontSize: 12 }} />
                          <Bar dataKey="value" fill={ORANGE} radius={[0, 8, 8, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    )
                  }
                </ChartCard>

                <ChartCard title="Top Cities" sub="Where applicants are from">
                  {cityData.length === 0
                    ? <Empty message="No data yet" />
                    : (
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={cityData} layout="vertical" barSize={22}>
                          <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                          <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} width={100} />
                          <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: 12, border: '1px solid #f3f4f6', fontSize: 12 }} />
                          <Bar dataKey="value" fill={DARK} radius={[0, 8, 8, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    )
                  }
                </ChartCard>
              </div>

              {/* ── Applicants table ── */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">All Applicants</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{filtered.length} of {total} shown</p>
                  </div>
                </div>

                {filtered.length === 0
                  ? <Empty message={total === 0 ? 'No applications received yet. Share the form link to get started.' : 'No results match your search.'} />
                  : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm min-w-[900px]">
                        <thead>
                          <tr className="bg-gray-50/70">
                            {['Name', 'Phone', 'City', 'Sales Exp', 'Call Comfort', 'Hrs/Day', 'Internet', 'Commission', 'Income Goal', 'Date'].map((h) => (
                              <th key={h} className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide text-left whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {filtered.map((a) => (
                            <tr key={a.id} className="hover:bg-gray-50/60 transition-colors group">
                              <td className="px-4 py-3.5">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-7 h-7 rounded-full bg-[#F26522]/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-[11px] font-bold text-[#F26522] uppercase">{a.full_name.charAt(0)}</span>
                                  </div>
                                  <span className="font-medium text-gray-900 whitespace-nowrap">{a.full_name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">{a.phone}</td>
                              <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{a.city}</td>
                              <td className="px-4 py-3.5"><Badge yes={a.has_sales_exp} /></td>
                              <td className="px-4 py-3.5"><ComfortBadge value={a.call_comfort} /></td>
                              <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{HOURS_LABELS[a.hours_per_day]}</td>
                              <td className="px-4 py-3.5"><Badge yes={a.has_stable_internet} /></td>
                              <td className="px-4 py-3.5"><Badge yes={a.commission_ok} /></td>
                              <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap font-medium">{a.income_goal}</td>
                              <td className="px-4 py-3.5 text-gray-400 whitespace-nowrap text-xs">
                                {new Date(a.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                }
              </div>

              {/* ── Why interested (qualitative feed) ── */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">Motivation Feed</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Why applicants want this role — qualitative filter</p>
                </div>
                {data.length === 0
                  ? <Empty message="No responses yet." />
                  : (
                    <div className="divide-y divide-gray-50">
                      {data.slice(0, 15).map((a) => (
                        <div key={a.id} className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50/50 transition-colors">
                          <div className="w-9 h-9 rounded-full bg-[#F26522]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-[#F26522] uppercase">{a.full_name.charAt(0)}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold text-gray-900">{a.full_name}</span>
                              <span className="text-xs text-gray-400">{a.city}</span>
                              <span className="text-xs text-gray-300">·</span>
                              <span className="text-xs font-medium text-[#F26522]">{a.income_goal}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{a.why_interested}</p>
                          </div>
                          <ComfortBadge value={a.call_comfort} />
                        </div>
                      ))}
                    </div>
                  )
                }
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
