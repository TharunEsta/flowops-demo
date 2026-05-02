"use client";

import { IndustryKey, industryConfigs } from "@/lib/demo-data";
import { useIndustry } from "@/components/industry-provider";

const industryOrder: IndustryKey[] = ["healthcare", "real-estate", "logistics"];

export function IndustrySwitch() {
  const { industry, setIndustry } = useIndustry();

  return (
    <div className="inline-flex rounded-full border border-brand-100 bg-white/80 p-1 shadow-soft backdrop-blur">
      {industryOrder.map((item) => {
        const active = item === industry;

        return (
          <button
            key={item}
            type="button"
            onClick={() => setIndustry(item)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              active
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
            }`}
          >
            {industryConfigs[item].label}
          </button>
        );
      })}
    </div>
  );
}
