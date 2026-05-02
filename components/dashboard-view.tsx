"use client";

import {
  Activity,
  CalendarRange,
  CircleDollarSign,
  Users,
} from "lucide-react";
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

const chartGridColor = "#e8eef8";
const chartAxisColor = "#94a3b8";
const chartBlue = "#4f8df7";
const chartBlueSoft = "#8bb8ff";

export function DashboardView() {
  const { industry } = useIndustry();
  const config = industryConfigs[industry];
  const stats = getStatsByIndustry(industry);
  const bookings = getBookingsByIndustry(industry);
  const chartData = weeklyBookingTrends[industry];

  const summaryItems = [
    {
      label: "Booked today",
      value: `${stats.todaysBookings} active today`,
      icon: CalendarRange
    },
    {
      label: "Pending follow-ups",
      value: `${bookings.filter((item) => item.status === "Pending").length} leads to nudge`,
      icon: Activity
    },
    {
      label: "Top service",
      value: bookings[0]?.service ?? config.services[0],
      icon: Users
    }
  ];

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-6">
        <div className="space-y-4">
          <DemoLabel />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">
              Dashboard
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {config.label} lead workflow overview
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
              Track bookings, lead quality, and revenue performance across a structured conversion funnel.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-white p-5 shadow-[0_18px_40px_-28px_rgba(37,99,235,0.25)] transition duration-300 hover:shadow-[0_20px_50px_-28px_rgba(37,99,235,0.3)] sm:p-6">
          <p className="text-sm font-semibold text-slate-800">
            This dashboard shows all bookings, revenue, and follow-ups in one place.
          </p>
          <div className="mt-4 flex flex-col gap-3 lg:flex-row">
            <InfoPill label="Source" value="WhatsApp / Call / Website" />
            <InfoPill label="Status" value="Booked / Follow-up / Completed" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Today’s Bookings"
          value={String(stats.todaysBookings)}
          icon={CalendarRange}
        />
        <StatCard label="Total Leads" value={String(stats.totalLeads)} icon={Users} />
        <StatCard
          label="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={Activity}
        />
        <StatCard
          label="Today’s Revenue"
          value={currencyFormatter.format(stats.todaysRevenue)}
          icon={CircleDollarSign}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_-30px_rgba(15,23,42,0.22)]">
          <div className="mb-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-slate-950">Pipeline activity</h2>
            <p className="text-sm leading-6 text-slate-500">
              Bookings and revenue trends across the last 7 days.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <ChartCard title="Bookings per Day">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke={chartGridColor} strokeDasharray="2 8" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: chartAxisColor, fontSize: 12 }}
                    dy={8}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: chartAxisColor, fontSize: 12 }}
                    dx={-8}
                  />
                  <Tooltip
                    cursor={{ stroke: "#dbeafe", strokeWidth: 1 }}
                    contentStyle={{
                      borderRadius: 16,
                      border: "1px solid #dbeafe",
                      boxShadow: "0 18px 40px -24px rgba(37, 99, 235, 0.25)",
                      backgroundColor: "#ffffff"
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke={chartBlue}
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 5, fill: chartBlue, stroke: "#ffffff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Revenue per Day">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke={chartGridColor} strokeDasharray="2 8" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: chartAxisColor, fontSize: 12 }}
                    dy={8}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: chartAxisColor, fontSize: 12 }}
                    dx={-8}
                  />
                  <Tooltip
                    formatter={(value: number) => currencyFormatter.format(value)}
                    cursor={{ fill: "rgba(219, 234, 254, 0.35)" }}
                    contentStyle={{
                      borderRadius: 16,
                      border: "1px solid #dbeafe",
                      boxShadow: "0 18px 40px -24px rgba(37, 99, 235, 0.25)",
                      backgroundColor: "#ffffff"
                    }}
                  />
                  <Bar dataKey="revenue" fill={chartBlueSoft} radius={[12, 12, 4, 4]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_-30px_rgba(15,23,42,0.22)]">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              Workflow Summary
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              {config.bookingLabel}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              A compact view of the signals your team would watch throughout the day.
            </p>
          </div>

          <div className="grid gap-4">
            {summaryItems.map((item) => (
              <MiniStatCard
                key={item.label}
                label={item.label}
                value={item.value}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.18)] transition duration-300 hover:shadow-[0_24px_56px_-30px_rgba(15,23,42,0.22)]">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Recent bookings</h2>
            <p className="text-sm leading-6 text-slate-500">
              Example data for the current industry view.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200/80">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200/80">
              <thead className="bg-slate-50/80 backdrop-blur">
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Phone</th>
                  <th className="px-5 py-4">Service</th>
                  <th className="px-5 py-4">Time</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {bookings.map((entry) => (
                  <tr
                    key={entry.id}
                    className="text-sm text-slate-600 transition duration-200 hover:bg-brand-50/40"
                  >
                    <td className="px-5 py-4 font-medium text-slate-900">{entry.name}</td>
                    <td className="px-5 py-4">{entry.phone}</td>
                    <td className="px-5 py-4">{entry.service}</td>
                    <td className="px-5 py-4">{entry.time}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          entry.status === "Booked"
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                            : "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
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

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-600 shadow-[0_12px_24px_-20px_rgba(15,23,42,0.2)]">
      <span className="font-semibold text-slate-900">{label}:</span> {value}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_24px_56px_-30px_rgba(37,99,235,0.24)]">
      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-brand-50 p-3 text-brand-600 transition duration-300 group-hover:bg-brand-100">
          <Icon className="h-5 w-5" />
        </div>
        <div className="h-2 w-2 rounded-full bg-brand-200" />
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{value}</p>
    </div>
  );
}

function MiniStatCard({
  label,
  value,
  icon: Icon
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 transition duration-300 hover:border-brand-200 hover:bg-white hover:shadow-[0_18px_40px_-30px_rgba(37,99,235,0.18)]">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-white p-3 text-brand-600 shadow-[0_12px_24px_-20px_rgba(15,23,42,0.2)] transition duration-300 group-hover:bg-brand-50">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-lg font-semibold text-slate-950">{value}</p>
        </div>
      </div>
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
    <div className="rounded-2xl border border-slate-200/70 bg-slate-50/65 p-5 transition duration-300 hover:border-brand-200/70 hover:bg-white">
      <p className="mb-4 text-sm font-semibold text-slate-700">{title}</p>
      {children}
    </div>
  );
}
