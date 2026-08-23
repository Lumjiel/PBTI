"use client";

import type { DimensionScore } from "@/lib/scoring";

interface Props {
  dimensions: DimensionScore[];
  size?: number;
}

const dimColors: Record<string, string> = {
  BURN: "#ef4444",
  TOUGH: "#3b82f6",
  PREC: "#f59e0b",
  SHOW: "#ec4899",
  BOND: "#8b5cf6",
};

export default function RadarChart({ dimensions, size = 300 }: Props) {
  const n = dimensions.length;
  const pad = 45;
  const vw = size + pad * 2;
  const vh = size + pad * 2;
  const cx = vw / 2;
  const cy = vh / 2;
  const maxR = size * 0.34;
  const levels = 3;

  const scores = dimensions.map((d) => d.percentage);

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const r = (value / 100) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const gridPaths = Array.from({ length: levels }, (_, level) => {
    const r = ((level + 1) / levels) * maxR;
    return Array.from({ length: n }, (_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(" ");
  });

  const dataPoints = scores.map((s, i) => getPoint(i, s));
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${vw} ${vh}`} className="radar-chart">
      <defs>
        <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {gridPaths.map((points, i) => (
        <polygon key={i} points={points} fill="none" stroke="#bbf7d0" strokeWidth="1" opacity={0.5 + i * 0.1} />
      ))}

      {dimensions.map((_, i) => {
        const p = getPoint(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#bbf7d0" strokeWidth="1" opacity={0.3} />;
      })}

      <polygon points={dataPath} fill="url(#radarFill)" stroke="#10b981" strokeWidth="2.5" />

      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill={dimColors[dimensions[i].code] || "#10b981"} />
      ))}

      {dimensions.map((dim, i) => {
        const p = getPoint(i, 110);
        return (
          <text key={dim.code} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="bold" fill={dimColors[dim.code] || "#10b981"}>
            {dim.name}
          </text>
        );
      })}
    </svg>
  );
}
