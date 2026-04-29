"use client";

import Link from "next/link";
import { AUTHOR_URL } from "@/lib/constants";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-[#FFF9F0]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[200px] -left-[200px] w-[500px] h-[500px] rounded-full bg-[#FF6600]/10 blur-[100px]" />
        <div className="absolute -bottom-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-[#FF6600]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        <div className="mb-8">
          <span className="text-6xl">🏓</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-[#FF6600] mb-4 tracking-wider">
          PBTI
        </h1>
        <p className="text-xl md:text-2xl text-[#333] mb-2 font-bold">乒乓球行为类型测试</p>
        <p className="text-sm text-[#999] mb-12 leading-relaxed">
          30 道题，测出你的乒乓人格<br />
          你是 爆爆 还是 香蕉？是 年轮 还是 卡尺？
        </p>
        <Link href="/test"
          className="inline-flex items-center gap-2 bg-[#FF6600] text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-[#FF8533] transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
          <span>开始测试</span>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M6 4l8 6-8 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10 text-center space-y-2">
        <p className="text-[#E0E0E0] text-xs">
          <Link href="/types" className="underline underline-offset-2 hover:text-[#FF6600] transition">查看全部人格</Link>
          {" · "}
        </p>
        <p className="text-[#E5E5E5] text-[10px]">
          PBTI · 仅供娱乐
        </p>
      </div>
    </main>
  );
}