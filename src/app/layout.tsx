// app/layout.tsx
import { jaJP } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Header from "./_components/layout/header/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "🍊ChatLife",
  description: "App RouterとServer Actionsを使ったチャットアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Providerを作ってcontextを参照できるようにする
    <ClerkProvider localization={jaJP}>
      <html lang="ja">
        <body className={inter.className}>
          <Header />
          <main className="mx-auto flex min-h-screen max-w-5xl flex-col place-content-center justify-between md:p-12">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
