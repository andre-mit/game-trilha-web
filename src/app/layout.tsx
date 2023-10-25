import { SignalRProvider } from "@/context/signalR/signalRContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/context/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jogo da Trilha",
  description: "Game Triha",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen`}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
