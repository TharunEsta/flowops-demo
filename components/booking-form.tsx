"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DemoLabel } from "@/components/demo-label";
import { useIndustry } from "@/components/industry-provider";
import { industryConfigs } from "@/lib/demo-data";

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM"
];

function getTomorrowDate() {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toISOString().split("T")[0];
}

export function BookingForm() {
  const { industry } = useIndustry();
  const config = industryConfigs[industry];
  const router = useRouter();
  const [form, setForm] = useState({
    service: config.services[0],
    date: getTomorrowDate(),
    time: timeSlots[0],
    name: "",
    phone: ""
  });

  useEffect(() => {
    setForm((current) => ({
      ...current,
      service: config.services[0]
    }));
  }, [config.services]);

  const onChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams({
      industry,
      service: form.service,
      date: form.date,
      time: form.time,
      name: form.name,
      phone: form.phone
    });

    router.push(`/confirmation?${params.toString()}`);
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="space-y-5">
          <DemoLabel />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
              Booking Flow
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">
              {config.bookingLabel}
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-500">
              Show how a guided intake flow can route prospects into the right service, capture contact details, and prepare them for follow-up.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-soft">
            <p className="text-sm font-semibold text-slate-900">What this workflow highlights</p>
            <div className="mt-4 space-y-3">
              {[
                "Dynamic service labels per industry",
                "Clear next-step confirmation for the lead",
                "Simple data capture before the dashboard handoff"
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-soft sm:p-8">
          <form className="grid gap-5" onSubmit={onSubmit}>
            <Field label="Select Service">
              <select
                value={form.service}
                onChange={(event) => onChange("service", event.target.value)}
                className="field"
              >
                {config.services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Select Date">
                <input
                  type="date"
                  value={form.date}
                  onChange={(event) => onChange("date", event.target.value)}
                  className="field"
                  required
                />
              </Field>
              <Field label="Select Time Slot">
                <select
                  value={form.time}
                  onChange={(event) => onChange("time", event.target.value)}
                  className="field"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Name">
              <input
                type="text"
                value={form.name}
                onChange={(event) => onChange("name", event.target.value)}
                className="field"
                placeholder="Enter full name"
                required
              />
            </Field>

            <Field label="Phone">
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => onChange("phone", event.target.value)}
                className="field"
                placeholder="Enter phone number"
                required
              />
            </Field>

            <button
              type="submit"
              className="mt-2 rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Confirm Booking
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      {label}
      {children}
    </label>
  );
}
