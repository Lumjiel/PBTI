"use client";

import { useState } from "react";
import Link from "next/link";
import { personalities } from "@/data/personalities";
import CharacterSVG from "@/components/CharacterSVG";

export default function TypesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const allTypes = [...personalities].sort((a, b) => a.code.localeCompare(b.code));
  const current = allTypes.find((p) => p.code === selected);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-[#ecfdf5]">
      <div className="grain-overlay" />
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-green-100/50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-stone-400 hover:text-green-500 transition text-sm font-medium">← 首页</Link>
          <span className="font-mono font-black text-green-600 text-sm">PBTI</span>
          <Link href="/test" className="text-sm text-green-600 font-bold hover:underline underline-offset-4">去测试 →</Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-center text-green-600 font-mono text-xs tracking-widest uppercase mb-2">All Personalities</p>
        <h1 className="text-3xl font-black text-center mb-2 text-stone-800">全部人格类型</h1>
        <p className="text-center text-stone-400 mb-10 text-sm">27 种普通人格 + 1 种隐藏人格，点击查看详情</p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2.5 mb-8">
          {allTypes.map((p, i) => (
            <button key={p.code} onClick={() => setSelected(selected === p.code ? null : p.code)}
              className={`bg-white rounded-xl p-3 card-hover text-center border-2 transition-all ${selected === p.code ? "border-green-400 shadow-lg shadow-green-100" : "border-transparent"}`}>
              <CharacterSVG type={p.code} size={50} className="mx-auto mb-1" />
              <div className="font-mono text-[10px] font-black" style={{ color: p.color }}>{p.code}</div>
              <div className="font-bold text-[10px] text-stone-600 truncate">{p.name}</div>
              {p.code === "CHOP" && <span className="inline-block text-[8px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded mt-0.5 font-black">隐藏</span>}
            </button>
          ))}
        </div>

        {current && (
          <div className="fade-in bg-white rounded-2xl shadow-xl p-6 mb-8 border border-green-100">
            <div className="flex items-center gap-5 mb-5">
              <CharacterSVG type={current.code} size={100} />
              <div className="flex-1">
                <div className="font-mono font-black text-2xl mb-1" style={{ color: current.color }}>{current.code}</div>
                <div className="font-black text-xl text-stone-800 mb-1">{current.name}</div>
                <div className="text-sm text-stone-500 italic mb-2">「{current.motto}」</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <h4 className="text-green-600 font-black text-xs mb-2">💪 优势</h4>
                <ul className="space-y-1">{current.strengths.map((s, i) => <li key={i} className="text-xs text-stone-600 flex items-start gap-2"><span className="text-green-400 font-bold">✓</span>{s}</li>)}</ul>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <h4 className="text-amber-600 font-black text-xs mb-2">⚠️ 注意</h4>
                <ul className="space-y-1">{current.weaknesses.map((w, i) => <li key={i} className="text-xs text-stone-600 flex items-start gap-2"><span className="text-amber-400 font-bold">!</span>{w}</li>)}</ul>
              </div>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 mb-5">
              <p className="text-xs text-stone-600 leading-relaxed">{current.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white rounded-lg p-3 border border-stone-100">
                <div className="text-stone-400 font-medium mb-1">🛠️ 技术特点</div>
                <div className="text-stone-700">{current.soulGear}</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-stone-100">
                <div className="text-stone-400 font-medium mb-1">💬 灵魂格言</div>
                <div className="text-stone-700 italic">「{current.spirit}」</div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link href="/test"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full text-sm font-black hover:bg-green-700 transition-all shadow-lg">
            立即测试 →
          </Link>
        </div>
      </div>
    </main>
  );
}
