"use client";

import { Activity, CalendarRange, CircleDollarSign, Users } from "lucide-react";
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
const bookingSources = ["WhatsApp", "Call", "Website"] as const;

export function DashboardView() {
  const { industry } = useIndustry();
  const config = industryConfigs[industry];
  const stats = getStatsByIndustry(industry);
  const bookings = getBookingsByIndustry(industry);
  const chartData = weeklyBookingTrends[industry];

  const summaryItems = [
    {
      label: "Bookings confirmed",
      value: `${stats.todaysBookings} bookings confirmed today`,
      icon: CalendarRange
    },
    {
      label: "Follow-ups needed",
      value: `${bookings.filter((item) => item.status === "Pending").length} leads need follow-up`,
      icon: Activity
    },
    {
      label: "Top service",
      value: `Top service: ${bookings[0]?.service ?? config.services[0]}`,
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
              {config.label} daily bookings and revenue
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
              See what was booked, what still needs follow-up, and where today&apos;s revenue is coming from.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-white p-5 shadow-[0_18px_40px_-28px_rgba(37,99,235,0.25)] transition duration-300 hover:shadow-[0_20px_50px_-28px_rgba(37,99,235,0.3)] sm:p-6">
          <p className="text-sm font-semibold text-slate-800">
            All bookings from WhatsApp, calls, and website are captured here automatically.
          </p>
          <div className="mt-4 flex flex-col gap-3 lg:flex-row">
            <InfoPill label="Source" value="WhatsApp / Call / Website" />
            <InfoPill label="Status" value="Booked / Follow-up / Completed" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.16)] sm:p-6">
          <p className="text-sm font-semibold text-slate-800">
            How bookings move through your business
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm font-medium text-slate-600 lg:flex-row lg:items-center lg:gap-2">
            {["WhatsApp", "Booking", "Dashboard", "Follow-up", "Conversion"].map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-800">
                  {step}
                </span>
                {index < 4 ? <span className="hidden text-brand-500 lg:inline">→</span> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Today’s Bookings"
          subtext="Patients who confirmed appointments today"
          value={String(stats.todaysBookings)}
          icon={CalendarRange}
        />
        <StatCard
          label="Total Enquiries"
          subtext="All leads captured from every channel"
          value={String(stats.totalLeads)}
          icon={Users}
        />
        <StatCard
          label="Conversion Rate"
          subtext="How many enquiries turned into bookings"
          value={`${stats.conversionRate}%`}
          icon={Activity}
        />
        <StatCard
          label="Today’s Revenue"
          subtext="Revenue expected from confirmed bookings"
          value={currencyFormatter.format(stats.todaysRevenue)}
          icon={CircleDollarSign}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_-30px_rgba(15,23,42,0.22)]">
          <div className="mb-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-slate-950">Your Weekly Bookings & Revenue</h2>
            <p className="text-sm leading-6 text-slate-500">
              A simple view of how enquiries are turning into bookings and revenue over the last 7 days.
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
                  <Bar
                    dataKey="revenue"
                    fill={chartBlueSoft}
                    radius={[12, 12, 4, 4]}
                    maxBarSize={36}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_-30px_rgba(15,23,42,0.22)]">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              Today’s Actions
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              What Needs Attention
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              Focus here to improve today&apos;s results.
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

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-white p-6 shadow-[0_18px_40px_-30px_rgba(37,99,235,0.18)] transition duration-300 hover:shadow-[0_24px_56px_-30px_rgba(37,99,235,0.24)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            Monthly Impact
          </p>
          <div className="mt-4 space-y-3">
            <p className="text-2xl font-bold tracking-tight text-slate-950">+5 extra bookings/day</p>
            <p className="text-lg font-semibold text-slate-700">₹400 per booking</p>
            <p className="text-3xl font-bold tracking-tight text-brand-700">
              = ₹60,000/month potential increase
            </p>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            Even a small lift in captured bookings and follow-ups can make a meaningful difference to monthly revenue.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.18)] transition duration-300 hover:shadow-[0_24px_56px_-30px_rgba(15,23,42,0.22)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            How this works
          </p>
          <div className="mt-5 grid gap-3">
            {[
              "Lead comes in (WhatsApp / call / web)",
              "Booking is captured instantly",
              "Data appears in dashboard",
              "Follow-ups are triggered",
              "Conversion improves"
            ].map((step, index) => (
              <div
                key={step}
                className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-slate-50/70 px-4 py-3"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                  {index + 1}
                </span>
                <p className="text-sm font-medium text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.18)] transition duration-300 hover:shadow-[0_24px_56px_-30px_rgba(15,23,42,0.22)]">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Recent bookings</h2>
            <p className="text-sm leading-6 text-slate-500">
              Example data showing where bookings come from and what needs follow-up.
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
                  <th className="px-5 py-4">Source</th>
                  <th className="px-5 py-4">Service</th>
                  <th className="px-5 py-4">Time</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {bookings.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className="text-sm text-slate-600 transition duration-200 hover:bg-brand-50/40"
                  >
                    <td className="px-5 py-4 font-medium text-slate-900">{entry.name}</td>
                    <td className="px-5 py-4">{entry.phone}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {bookingSources[index % bookingSources.length]}
                      </span>
                    </td>
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
  subtext,
  value,
  icon: Icon
}: {
  label: string;
  subtext: string;
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
      <p className="mt-2 text-sm leading-6 text-slate-500">{subtext}</p>
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
