"use client";

import Image from "next/image";

interface Props {
  type?: string;
  className?: string;
  size?: number;
}

const ALL_CODES = new Set([
  "FORGE", "FUSE", "CLOCK", "MAZE", "WALL", "ARCHIVE", "ECHO", "HUB", "ISLE",
  "VAULT", "MONK", "STAGE", "GHOST", "OAK", "MIRROR", "WING", "DAWN", "STORM",
  "LEAF", "SWAN", "TOME", "ZEN", "WILD", "RISE", "BANANA",
]);

function resolveCode(type: string): string | null {
  if (type === "//TODO") return "TODO";
  if (ALL_CODES.has(type)) return type;
  return null;
}

export default function CharacterSVG({ type = "default", className = "", size = 200 }: Props) {
  const code = resolveCode(type) ?? "SUDO";

  return (
    <Image
      src={`/characters/${code}.png`}
      alt={type}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
      priority={size >= 150}
    />
  );
}
