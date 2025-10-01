import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { i18n, type Locale } from '@/i18n-config'
import "../globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  
  return (
    <html lang={lang} className={inter.variable}>
      <body className="font-sans antialiased bg-background text-primary">
        <Header lang={lang} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer lang={lang} />
      </body>
    </html>
  )
}

