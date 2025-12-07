import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/services/QueryProvider";
import Nav from "@/componenets/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
