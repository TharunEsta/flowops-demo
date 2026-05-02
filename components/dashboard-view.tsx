"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { DemoLabel } from "@/components/demo-label";
import { useIndustry } from "@/components/industry-provider";
import {
  getBookingsByIndustry,
  getStatsByIndustry,
  industryConfigs,
  weeklyBookingTrends
} from "@/lib/demo-data";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export function DashboardView() {
  const { industry } = useIndustry();
  const config = industryConfigs[industry];
  const stats = getStatsByIndustry(industry);
  const bookings = getBookingsByIndustry(industry);
  const chartData = weeklyBookingTrends[industry];

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <DemoLabel />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
              Dashboard
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">
              {config.label} lead workflow overview
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
              Track bookings, lead quality, and revenue performance across a structured conversion funnel.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-brand-100 bg-brand-50/80 p-5 shadow-soft">
        <p className="text-sm font-semibold text-brand-800">
          This dashboard shows all bookings, revenue, and follow-ups in one place.
        </p>
        <div className="mt-4 flex flex-col gap-3 lg:flex-row">
          <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            <span className="font-semibold text-slate-900">Source:</span> WhatsApp / Call / Website
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            <span className="font-semibold text-slate-900">Status:</span> Booked / Follow-up / Completed
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Today’s Bookings"
          value={String(stats.todaysBookings)}
          accent="from-brand-500 to-blue-400"
        />
        <StatCard
          label="Total Leads"
          value={String(stats.totalLeads)}
          accent="from-slate-900 to-slate-700"
        />
        <StatCard
          label="Conversion Rate"
          value={`${stats.conversionRate}%`}
          accent="from-cyan-500 to-sky-400"
        />
        <StatCard
          label="Today’s Revenue"
          value={currencyFormatter.format(stats.todaysRevenue)}
          accent="from-brand-700 to-indigo-500"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/95 p-5 shadow-soft sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">Pipeline activity</h2>
            <p className="text-sm text-slate-500">Bookings and revenue trends across the last 7 days.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <ChartCard title="Bookings per Day">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData}>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ fill: "#2563eb", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Revenue per Day">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData}>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip formatter={(value: number) => currencyFormatter.format(value)} />
                  <Bar dataKey="revenue" fill="#60a5fa" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/80 bg-slate-950 p-6 text-white shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-200">
            Workflow signal
          </p>
          <h2 className="mt-3 text-2xl font-semibold">{config.bookingLabel}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            This view shows how consistent intake, status visibility, and reporting can tighten conversion loops for teams operating across multiple service categories.
          </p>
          <div className="mt-6 space-y-4">
            {[
              { label: "Booked leads", value: `${stats.todaysBookings} active today` },
              {
                label: "Pending follow-up",
                value: `${bookings.filter((item) => item.status === "Pending").length} leads to nudge`
              },
              { label: "Top service", value: bookings[0]?.service ?? config.services[0] }
            ].map((item) => (
              <div key={item.label} className="rounded-3xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">{item.label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/80 bg-white/95 p-5 shadow-soft sm:p-6">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Recent bookings</h2>
            <p className="text-sm text-slate-500">Example data for the current industry view.</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm font-semibold text-slate-600">
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Phone</th>
                  <th className="px-4 py-4">Service</th>
                  <th className="px-4 py-4">Time</th>
                  <th className="px-4 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {bookings.map((entry) => (
                  <tr key={entry.id} className="text-sm text-slate-600">
                    <td className="px-4 py-4 font-medium text-slate-900">{entry.name}</td>
                    <td className="px-4 py-4">{entry.phone}</td>
                    <td className="px-4 py-4">{entry.service}</td>
                    <td className="px-4 py-4">{entry.time}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          entry.status === "Booked"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
  accent
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/80 bg-white/95 p-5 shadow-soft">
      <div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${accent}`} />
      <p className="mt-5 text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
    </div>
  );
}

function ChartCard({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4">
      <p className="mb-3 text-sm font-semibold text-slate-700">{title}</p>
      {children}
    </div>
  );
}
