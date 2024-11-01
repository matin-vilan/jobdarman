"use client";
import ClientOnly from "@/components/clientOnly";
import RequireAuth from "@/components/providers/requireAuth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientOnly>
      <RequireAuth>{children}</RequireAuth>
    </ClientOnly>
  );
}
