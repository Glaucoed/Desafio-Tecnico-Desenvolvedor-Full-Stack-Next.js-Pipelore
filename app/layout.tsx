import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/services/QueryProvider";
import Nav from "@/components/Nav";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pipelore - Ordem de Serviço",
  description:
    "Desafio Técnico - Desenvolvedor(a) Full Stack Next.js - Pipelore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 h-screen`}
      >
        <QueryProvider>
          <Nav />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
