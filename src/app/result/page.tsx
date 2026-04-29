"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { calculateResult, type TestResult } from "@/lib/scoring";
import { getSiteUrl, AUTHOR_URL } from "@/lib/constants";
import { dimensionDefs } from "@/data/dimensions";
import CharacterSVG from "@/components/CharacterSVG";
import QRCode from "qrcode";

const dimColors: Record<string, string> = {
  BURN: "#ef4444",
  TOUGH: "#3b82f6",
  PREC: "#f59e0b",
  SHOW: "#ec4899",
  BOND: "#8b5cf6",
};

function getLevelKey(percentage: number): string {
  if (percentage < 20) return 'L1';
  if (percentage < 35) return 'L2';
  if (percentage < 50) return 'L3';
  if (percentage < 65) return 'L4';
  if (percentage < 80) return 'L5';
  return 'L6';
}

function StarRating({ score, max = 5 }: { score: number; max?: number }) {
  const stars = Math.round((score / 100) * max);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`text-xs ${i < stars ? 'text-amber-400' : 'text-stone-200'}`}>★</span>
      ))}
    </div>
  );
}

function DimensionBar({ dim }: { dim: { code: string; name: string; percentage: number } }) {
  const def = dimensionDefs.find((d) => d.code === dim.code);
  const levelKey = getLevelKey(dim.percentage);
  const levelDesc = def?.levels[levelKey as keyof typeof def.levels] || '';
  const color = dimColors[dim.code] || '#10b981';

  return (
    <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-black text-sm" style={{ color }}>{dim.name}</span>
          <StarRating score={dim.percentage} />
        </div>
        <span className="text-xs font-mono text-stone-400">{dim.percentage}%</span>
      </div>
      <div className="h-2 bg-stone-100 rounded-full overflow-hidden mb-2">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${dim.percentage}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-xs text-stone-500">{levelDesc}</p>
    </div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<TestResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [generatingPoster, setGeneratingPoster] = useState(false);

  const generatePoster = useCallback(async () => {
    if (!result || generatingPoster) return;
    setGeneratingPoster(true);
    const p = result.personality;
    const siteUrl = getSiteUrl();

    const S = 3;
    const W = 750 * S, H = 1334 * S;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    const f = (v: number) => v * S;

    // BG
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#fff7ed");
    bg.addColorStop(1, "#fffbf5");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Top bar
    const bar = ctx.createLinearGradient(0, 0, W, 0);
    bar.addColorStop(0, "#f97316");
    bar.addColorStop(1, "#fbbf24");
    ctx.fillStyle = bar;
    ctx.fillRect(0, 0, W, f(8));

    // Title
    ctx.textAlign = "center";
    ctx.fillStyle = "#f97316";
    ctx.font = `900 ${f(28)}px system-ui, sans-serif`;
    ctx.fillText("PBTI · 乒乓球人格测试", W / 2, f(55));

    // Character image
    try {
      const charImg = new Image();
      charImg.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        charImg.onload = () => resolve();
        charImg.onerror = () => reject();
        charImg.src = `/characters/${p.code}.png`;
      });
      const imgH = f(280);
      const imgW = imgH * (charImg.width / charImg.height);
      ctx.drawImage(charImg, (W - imgW) / 2, f(100), imgW, imgH);
    } catch { }

    // Code
    ctx.fillStyle = p.color;
    ctx.font = `900 ${f(80)}px ui-monospace, monospace`;
    ctx.fillText(p.code, W / 2, f(450));

    // Name
    ctx.fillStyle = "#1c1917";
    ctx.font = `900 ${f(42)}px system-ui, sans-serif`;
    ctx.fillText(p.name, W / 2, f(505));

    // Tagline
    ctx.fillStyle = "#78716c";
    ctx.font = `${f(22)}px system-ui, sans-serif`;
    ctx.fillText(`「${p.tagline}」`, W / 2, f(545));

    // Similarity
    ctx.fillStyle = p.color;
    ctx.font = `900 ${f(60)}px system-ui, sans-serif`;
    ctx.fillText(`${result.similarity}%`, W / 2, f(620));
    ctx.fillStyle = "#a8a29e";
    ctx.font = `${f(18)}px system-ui, sans-serif`;
    ctx.fillText("匹配度", W / 2, f(650));

    // Divider
    ctx.strokeStyle = "#fed7aa";
    ctx.lineWidth = f(2);
    ctx.beginPath();
    ctx.moveTo(f(60), f(680));
    ctx.lineTo(W - f(60), f(680));
    ctx.stroke();

    // Description (word wrap)
    ctx.fillStyle = "#57534e";
    ctx.font = `${f(20)}px system-ui, sans-serif`;
    ctx.textAlign = "left";
    const maxTW = W - f(120);
    const desc = p.description.slice(0, 120) + (p.description.length > 120 ? "..." : "");
    let line = "";
    let ty = f(720);
    for (const char of desc) {
      const test = line + char;
      if (ctx.measureText(test).width > maxTW) {
        ctx.fillText(line, f(60), ty);
        line = char;
        ty += f(30);
        if (ty > f(900)) { ctx.fillText(line + "...", f(60), ty); line = ""; break; }
      } else { line = test; }
    }
    if (line) ctx.fillText(line, f(60), ty);

    // Strengths section
    ctx.fillStyle = "#f97316";
    ctx.font = `900 ${f(24)}px system-ui, sans-serif`;
    ctx.fillText("💪 优势", f(60), f(960));
    ctx.fillStyle = "#57534e";
    ctx.font = `${f(16)}px system-ui, sans-serif`;
    p.strengths.slice(0, 3).forEach((s, i) => {
      ctx.fillText(`✓  ${s.slice(0, 18)}`, f(85), f(995 + i * 30));
    });

    // Weaknesses
    ctx.fillStyle = "#d97706";
    ctx.font = `900 ${f(24)}px system-ui, sans-serif`;
    ctx.fillText("⚠️ 注意", W / 2 + f(10), f(960));
    ctx.fillStyle = "#57534e";
    ctx.font = `${f(16)}px system-ui, sans-serif`;
    p.weaknesses.slice(0, 3).forEach((w, i) => {
      ctx.fillText(`!  ${w.slice(0, 18)}`, W / 2 + f(35), f(995 + i * 30));
    });

    // Bottom section - QR + CTA
    const bottomY = f(1110);
    const qrSize = f(140);

    // QR code
    try {
      const qrDataUrl = await QRCode.toDataURL(siteUrl, {
        width: qrSize,
        margin: 1,
        color: { dark: "#f97316", light: "#ffffff" },
      });
      const qrImg = new Image();
      await new Promise<void>((resolve) => { qrImg.onload = () => resolve(); qrImg.src = qrDataUrl; });
      ctx.fillStyle = "#fff7ed";
      ctx.beginPath();
      ctx.roundRect(f(50), bottomY - f(10), qrSize + f(20), qrSize + f(20), f(12));
      ctx.fill();
      ctx.strokeStyle = "#fed7aa";
      ctx.lineWidth = f(2);
      ctx.stroke();
      ctx.drawImage(qrImg, f(60), bottomY, qrSize, qrSize);
    } catch { }

    // CTA text next to QR
    const ctaX = f(60) + qrSize + f(40);
    ctx.textAlign = "left";
    ctx.fillStyle = "#1c1917";
    ctx.font = `900 ${f(28)}px system-ui, sans-serif`;
    ctx.fillText("你是哪种乒乓人格？", ctaX, bottomY + f(50));

    ctx.fillStyle = "#f97316";
    ctx.font = `900 ${f(22)}px system-ui, sans-serif`;
    ctx.fillText("扫码或访问", ctaX, bottomY + f(90));
    ctx.fillText("pbti.test", ctaX, bottomY + f(120));

    ctx.fillStyle = "#a8a29e";
    ctx.font = `${f(18)}px system-ui, sans-serif`;
    ctx.fillText("20 道题 · N 种乒乓人格", ctaX, bottomY + f(160));

    // Footer
    ctx.textAlign = "center";
    ctx.fillStyle = "#d6d3d1";
    ctx.font = `${f(14)}px system-ui, sans-serif`;
    ctx.fillText("PBTI · 乒乓球人格测试 · 作者 Lumjiel", W / 2, H - f(30));

    setPosterUrl(canvas.toDataURL("image/png", 1.0));
    setGeneratingPoster(false);
  }, [result, generatingPoster]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("pbti_data");
      if (!raw) { router.push("/"); return; }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResult(calculateResult(JSON.parse(raw).answers, JSON.parse(raw).hidden));
    } catch { router.push("/"); }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fffbf5] to-[#fff7ed]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-400 border-t-transparent mx-auto mb-4" />
          <p className="text-stone-400 text-sm">正在编译你的人格类型...</p>
        </div>
      </div>
    );
  }

  const { personality: p, similarity, dimensions: dims } = result;
  const siteUrl = getSiteUrl();
  const shareText = `我在 PBTI 乒乓球人格测试中测出了【${p.code} · ${p.name}】！\n「${p.tagline}」\n匹配度 ${similarity}%\n\n你是哪种乒乓人格？来测测 👉 ${siteUrl}`;

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(shareText); } catch {
      const ta = document.createElement("textarea"); ta.value = shareText;
      document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleSavePoster = () => {
    if (!posterUrl) return;
    const a = document.createElement("a");
    a.href = posterUrl;
    a.download = `PBTI-${p.code}.png`;
    a.click();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffbf5] to-[#fff7ed]">
      <div className="grain-overlay" />

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-orange-100/50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="text-stone-400 hover:text-orange-500 transition text-sm font-medium">← 首页</button>
          <span className="font-mono font-black text-orange-500 text-sm">🏓 PBTI</span>
          <span className="text-xs text-stone-400 font-mono">RESULT</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="slide-up">
          {/* Header Card */}
          <div className="text-center mb-8">
            {result.isSpecial && (
              <div className="inline-block bg-amber-100 text-amber-700 text-xs font-black px-4 py-1.5 rounded-lg mb-4">☕ 隐藏人格触发！</div>
            )}
            <CharacterSVG type={p.code} size={160} className="mx-auto mb-4" />
            <div className="font-mono text-5xl md:text-6xl font-black tracking-wider mb-2" style={{ color: p.color }}>{p.code}</div>
            <h1 className="text-3xl font-black text-stone-800 mb-2">{p.name}</h1>
            <p className="text-stone-500 italic text-base mb-4">「{p.tagline}」</p>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-6 py-3 rounded-full border border-orange-100 shadow-sm">
              <span className="text-xs text-stone-400">匹配度</span>
              <span className="text-4xl font-black" style={{ color: p.color }}>{similarity}%</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 border border-orange-100">
            <p className="text-stone-600 leading-relaxed text-sm">{p.description}</p>
          </div>

          {/* Dimension Spectrum */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 border border-orange-100">
            <h3 className="font-black text-base mb-4 text-stone-700 flex items-center gap-2">
              <span>📊</span> 你的人格光谱
            </h3>
            <div className="space-y-3">
              {dims.map((dim) => (
                <DimensionBar key={dim.code} dim={dim} />
              ))}
            </div>
          </div>

          {/* Hidden Persona */}
          {p.hiddenTrigger && p.hiddenTrigger !== "无" && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6 mb-5 border border-amber-200">
              <h3 className="font-black text-base mb-3 text-amber-700 flex items-center gap-2">
                <span>🎭</span> 你的隐藏人格
              </h3>
              <div className="bg-white/80 rounded-xl p-4 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-stone-400">激活条件</span>
                </div>
                <p className="text-sm text-stone-600">{p.hiddenTrigger}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-400">短暂觉醒为</span>
                <span className="font-black text-amber-600">👉 {p.hiddenPersona}</span>
              </div>
            </div>
          )}

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-green-100">
              <h4 className="font-black text-sm mb-3 text-green-600 flex items-center gap-1">💪 优势</h4>
              <ul className="space-y-2">
                {p.strengths.map((s, i) => <li key={i} className="text-xs text-stone-600 flex items-start gap-2"><span className="text-green-400 mt-0.5 font-bold shrink-0">✓</span>{s}</li>)}
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-amber-100">
              <h4 className="font-black text-sm mb-3 text-amber-600 flex items-center gap-1">⚠️ 注意</h4>
              <ul className="space-y-2">
                {p.weaknesses.map((w, i) => <li key={i} className="text-xs text-stone-600 flex items-start gap-2"><span className="text-amber-400 mt-0.5 font-bold shrink-0">!</span>{w}</li>)}
              </ul>
            </div>
          </div>

          {/* Soul Gear & Spirit */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 border border-stone-100">
            <div className="mb-4">
              <h4 className="font-black text-xs text-stone-400 uppercase tracking-wider mb-2">🛠️ 灵魂装备</h4>
              <p className="text-sm text-stone-700">{p.soulGear}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-black text-xs text-stone-400 uppercase tracking-wider mb-2">💬 灵魂格言</h4>
              <p className="text-sm text-stone-700 italic">「{p.spirit}」</p>
            </div>
            {p.survivalGuide && (
              <div className="border-t border-stone-100 pt-4 mt-4">
                <h4 className="font-black text-xs text-stone-400 uppercase tracking-wider mb-3">📋 生存指南</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 font-black">优势</span>
                    <span className="text-stone-600">{p.survivalGuide.strengthScene}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 font-black">警惕</span>
                    <span className="text-stone-600">{p.survivalGuide.trapWarning}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 font-black">伙伴</span>
                    <span className="text-stone-600">{p.survivalGuide.idealPartner1}；{p.survivalGuide.idealPartner2}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 font-black">天敌</span>
                    <span className="text-stone-600">{p.survivalGuide.nemesis}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Share */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl shadow-2xl p-6 text-center text-stone-800 mb-5 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-black text-lg mb-2 text-orange-800">分享你的乒乓人格</h3>
              <p className="text-orange-700 text-xs mb-4">让更多球友发现自己的类型</p>
              <div className="bg-white/70 backdrop-blur rounded-xl p-4 mb-4 text-left border border-orange-200/50">
                <p className="text-sm text-stone-700 whitespace-pre-line">{shareText}</p>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button onClick={handleCopy} className="bg-orange-500 text-white px-5 py-2.5 rounded-full font-black text-sm hover:bg-orange-600 transition-all active:scale-95 shadow-lg">
                  {copied ? "✓ 已复制！" : "📋 复制文案"}
                </button>
                <button onClick={posterUrl ? handleSavePoster : generatePoster}
                  className="bg-white text-orange-600 border-2 border-orange-200 px-5 py-2.5 rounded-full font-black text-sm hover:bg-orange-50 transition-all active:scale-95">
                  {generatingPoster ? "生成中..." : posterUrl ? "💾 保存海报" : "🖼️ 生成海报"}
                </button>
              </div>
              {posterUrl && (
                <div className="mt-4 fade-in">
                  <p className="text-orange-700/70 text-[11px] mb-2">长按图片保存到手机</p>
                  <img src={posterUrl} alt="分享海报" className="w-full max-w-[320px] mx-auto rounded-xl shadow-lg" />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => { sessionStorage.removeItem("pbti_data"); router.push("/test"); }}
              className="flex-1 bg-white text-orange-500 border-2 border-orange-200 px-6 py-3 rounded-full font-black text-sm hover:bg-orange-50 transition-all">
              重新测试
            </button>
            <button onClick={() => router.push("/")}
              className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-full font-black text-sm hover:bg-orange-600 transition-all shadow-lg">
              回到首页
            </button>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center text-[10px] text-stone-300 pb-8 space-y-1">
            <p className="font-mono">PBTI · 作者 <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Lumjiel</a></p>
          </div>
        </div>
      </div>
    </main>
  );
}
