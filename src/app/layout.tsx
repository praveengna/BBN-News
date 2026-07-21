import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Ticker } from "@/components/news/ticker";
import { TopBar } from "@/components/widgets/top-bar";
import { CommandMenu } from "@/components/search/cmd-menu";
import { BreakingNewsPopup } from "@/components/widgets/breaking-news-popup";

export const revalidate = 60;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bbn-news.example.com"),
  title: "BBN NEWS - Global Premium Newsroom",
  description: "BBN NEWS - Breaking News, Latest News and Videos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${merriweather.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#dc2626" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <TopBar />
            <Header />
            <Ticker />
            <main className="flex-1">{children}</main>
            <Footer />
            <CommandMenu />
            <BreakingNewsPopup />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
