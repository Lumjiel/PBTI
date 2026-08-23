import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PBTI - 乒乓球行为类型测试",
  description: "你是 HEXA 还是 BANANA？30 道题测出你的乒乓人格。27 种乒乓球人格类型等你解锁。",
  keywords: ["PBTI", "乒乓球测试", "乒乓人格", "乒乓球性格", "乒乓球人格测试", "六边形战士"],
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    title: "PBTI - 你是什么类型的乒乓球选手？",
    description: "30 道题，测出你的乒乓人格。你是六边形战士还是反手怪？",
    type: "website",
    url: "https://pbti.codefather.cn",
  },
  metadataBase: new URL("https://pbti.codefather.cn"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
