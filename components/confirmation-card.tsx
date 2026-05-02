"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DemoLabel } from "@/components/demo-label";
import { industryConfigs, IndustryKey } from "@/lib/demo-data";

export function ConfirmationCard() {
  const params = useSearchParams();
  const rawIndustry = params.get("industry") as IndustryKey | null;
  const industry = rawIndustry && rawIndustry in industryConfigs ? rawIndustry : "healthcare";
  const config = industryConfigs[industry];
  const service = params.get("service") ?? config.services[0];
  const date = params.get("date") ?? "Selected date";
  const time = params.get("time") ?? "Selected time";
  const name = params.get("name") ?? "Guest";

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-soft sm:p-8">
        <DemoLabel />
        <div className="mt-6 rounded-3xl bg-brand-600 p-6 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-100">
            Booking successful
          </p>
          <h1 className="mt-3 text-3xl font-bold">{config.bookingLabel} confirmed</h1>
          <p className="mt-3 text-sm text-brand-100">
            {name}, your workflow has been captured and is ready for follow-up.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <DetailCard label="Service" value={service} />
          <DetailCard label="Selected time" value={time} />
          <DetailCard label="Selected date" value={date} />
          <DetailCard label="Next step" value={config.confirmationNote} />
        </div>

        <p className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-700">
          Arrive 10 minutes early
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Open Dashboard
          </Link>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center rounded-2xl border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            Book Another
          </Link>
        </div>
      </div>
    </main>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-base font-semibold text-slate-900">{value}</p>
    </div>
  );
}
