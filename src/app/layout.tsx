import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Wiki Risk Portal",
  description: "Web3 实体排名，从规模转向可验证的风险与质量",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <Navbar />
        <main className="min-h-screen bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
