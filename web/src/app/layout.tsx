import { cn } from "@/lib/utils";
import { Funnel_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import QueryProvider from "@/providers/query-provider";
import type { Metadata } from "next";

import "./globals.css";

const font = Funnel_Sans({
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin", "latin-ext"]
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_ENV_URL as string),
  title: "Elfa - Digital Products",
  description: "description",
  openGraph: {
    url: new URL(process.env.SITE_ENV_URL as string),
    locale: "pt_BR",
    siteName: "Elfa - Digital Products",
    title: "Elfa - Digital Products",
    description: "description",
    type: "website",
    images: {
      url: "metadata/elfa.svg",
      type: "image/svg+xml",
      width: "1200",
      height: "700"
    }
  },
  formatDetection: {
    address: false,
    date: false,
    email: false,
    telephone: false,
    url: false
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html
      lang="pt-BR"
      className={cn(font.className, "scroll-smooth")}
      suppressHydrationWarning
    >
      <body>
        <Header />
        <QueryProvider>{children}</QueryProvider>
        <Toaster duration={3000} richColors closeButton />
        <Footer />
      </body>
    </html>
  );
}
