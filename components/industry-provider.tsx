"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { IndustryKey, industryConfigs } from "@/lib/demo-data";

type IndustryContextValue = {
  industry: IndustryKey;
  setIndustry: (industry: IndustryKey) => void;
};

const IndustryContext = createContext<IndustryContextValue | null>(null);

const STORAGE_KEY = "lead-flow-industry";

export function IndustryProvider({ children }: { children: React.ReactNode }) {
  const [industry, setIndustry] = useState<IndustryKey>("healthcare");

  useEffect(() => {
    const savedIndustry = window.localStorage.getItem(STORAGE_KEY) as IndustryKey | null;
    if (savedIndustry && industryConfigs[savedIndustry]) {
      setIndustry(savedIndustry);
    }
  }, []);

  const handleIndustryChange = (nextIndustry: IndustryKey) => {
    setIndustry(nextIndustry);
    window.localStorage.setItem(STORAGE_KEY, nextIndustry);
  };

  const value = useMemo(
    () => ({
      industry,
      setIndustry: handleIndustryChange
    }),
    [industry]
  );

  return <IndustryContext.Provider value={value}>{children}</IndustryContext.Provider>;
}

export function useIndustry() {
  const context = useContext(IndustryContext);
  if (!context) {
    throw new Error("useIndustry must be used inside IndustryProvider");
  }
  return context;
}
