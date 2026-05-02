import type { Metadata } from "next";
import "./globals.css";
import { IndustryProvider } from "@/components/industry-provider";

export const metadata: Metadata = {
  title: "Lead Flow System Demo",
  description: "Demo SaaS flow for bookings, tracking, and conversion analytics."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="app-shell min-h-screen">
        <IndustryProvider>{children}</IndustryProvider>
      </body>
    </html>
  );
}
