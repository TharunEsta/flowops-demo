import { Suspense } from "react";
import { AppHeader } from "@/components/app-header";
import { ConfirmationCard } from "@/components/confirmation-card";

export default function ConfirmationPage() {
  return (
    <>
      <AppHeader />
      <Suspense fallback={null}>
        <ConfirmationCard />
      </Suspense>
    </>
  );
}
