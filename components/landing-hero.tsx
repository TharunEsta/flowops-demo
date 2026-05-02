"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CircleDollarSign,
  PhoneCall,
  Workflow
} from "lucide-react";
import { useIndustry } from "@/components/industry-provider";
import { DemoLabel } from "@/components/demo-label";
import { industryConfigs } from "@/lib/demo-data";

const highlights = [
  {
    title: "Capture demand",
    copy: "Channel inbound interest into a guided booking path that feels tailored."
  },
  {
    title: "Track activity",
    copy: "See bookings, status, and revenue patterns in one clean dashboard."
  },
  {
    title: "Improve conversion",
    copy: "Make follow-up workflows visible so teams can act faster."
  }
];

export function LandingHero() {
  const { industry } = useIndustry();
  const activeIndustry = industryConfigs[industry];

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <DemoLabel />
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
              Lead orchestration for modern teams
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Lead Flow System Demo
            </h1>
            <p className="max-w-2xl text-lg text-slate-600 sm:text-xl">
              From booking → tracking → conversion
            </p>
            <p className="max-w-2xl text-base leading-7 text-slate-500">
              {activeIndustry.headline}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
            >
              Open Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-2xl border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-brand-50"
            >
              Try Booking Flow
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-soft backdrop-blur"
              >
                <p className="mb-2 text-sm font-semibold text-brand-700">0{index + 1}</p>
                <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-soft backdrop-blur">
          <div className="rounded-[1.5rem] bg-hero-grid bg-[size:22px_22px] p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <p className="text-sm text-slate-300">Booking CTA</p>
                <p className="mt-2 text-2xl font-semibold">
                  {activeIndustry.bookingLabel}
                </p>
              </div>
              <div className="rounded-3xl bg-brand-600 p-5 text-white">
                <div className="mb-4 inline-flex rounded-2xl bg-white/15 p-3">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <p className="text-sm text-brand-100">Conversion visibility</p>
                <p className="mt-2 text-2xl font-semibold">Live dashboard</p>
              </div>
              <div className="rounded-3xl border border-brand-100 bg-white p-5 sm:col-span-2">
                <div className="mb-4 inline-flex rounded-2xl bg-brand-50 p-3 text-brand-700">
                  <CircleDollarSign className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-slate-500">Workflow promise</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  Show teams how consistent follow-up improves bookings, attendance, and revenue outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
            Explanation Layer
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            How This System Works
          </h2>
          <p className="text-base leading-7 text-slate-500">
            A simple view of the systems working together behind every booking, follow-up, and conversion.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <article className="rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-soft">
            <div className="mb-5 inline-flex rounded-2xl bg-brand-50 p-3 text-brand-700">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">
              CRM (Customer Tracking System)
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              This is where every booking or patient is stored and tracked in one place.
            </p>
            <div className="mt-5 overflow-hidden rounded-3xl border border-slate-100">
              <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
                  {[
                    ["Ava Thompson", "+1 555-0190", "Booked", "09:00 AM"],
                    ["Mia Carter", "+1 555-0128", "Follow-up", "10:15 AM"],
                    ["Sophia Reed", "+1 555-0104", "Pending", "11:30 AM"]
                  ].map(([name, phone, status, time]) => (
                    <tr key={name}>
                      <td className="px-4 py-3 font-medium text-slate-900">{name}</td>
                      <td className="px-4 py-3">{phone}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-700">
              No patient or lead is ever lost.
            </p>
          </article>

          <article className="rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-soft">
            <div className="mb-5 inline-flex rounded-2xl bg-brand-50 p-3 text-brand-700">
              <PhoneCall className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">
              Voice Agent (Call Handling System)
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              This answers calls automatically when your team is busy.
            </p>
            <div className="mt-5 rounded-3xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Incoming call
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Front desk support line
                  </p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Live
                </span>
              </div>
              <div className="mt-4 rounded-2xl bg-brand-600 px-4 py-4 text-sm text-white">
                AI says: “Hi, how can I help you?”
              </div>
              <div className="mt-3 inline-flex rounded-2xl border border-brand-200 bg-white px-4 py-3 text-sm font-semibold text-brand-700">
                Option: Book appointment
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-700">
              No missed calls, even during peak hours.
            </p>
          </article>

          <article className="rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-soft">
            <div className="mb-5 inline-flex rounded-2xl bg-brand-50 p-3 text-brand-700">
              <Workflow className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">
              Automation (Follow-up System)
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              This handles reminders and follow-ups automatically.
            </p>
            <div className="mt-5 rounded-3xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                {["Booking", "Confirmation", "Reminder", "Follow-up"].map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm">
                      {step}
                    </div>
                    {index < 3 ? <span className="text-brand-500">→</span> : null}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-700">
              No manual work needed for follow-ups.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-ink">
              Everything updates here in real-time
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-500">
              All bookings from WhatsApp, calls, or website are stored and visible in your dashboard.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
          >
            View Live Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
            ROI Snapshot
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Business Impact
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Daily uplift", value: "+5 bookings/day" },
            { label: "Average value", value: "₹400 per booking" },
            { label: "Monthly opportunity", value: "₹60,000/month potential increase" }
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[1.75rem] border border-white/80 bg-white/95 p-6 shadow-soft"
            >
              <p className="text-sm font-medium text-slate-500">{item.label}</p>
              <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
