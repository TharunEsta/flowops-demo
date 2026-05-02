import Link from "next/link";
import { IndustrySwitch } from "@/components/industry-switch";

export function AppHeader() {
  return (
    <header className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div>
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Lead Flow System Demo
        </Link>
        <p className="mt-1 text-sm text-slate-500">
          From booking to tracking to conversion.
        </p>
      </div>
      <IndustrySwitch />
    </header>
  );
}
