import { questions } from "@/data/questions";
import { personalities, specialPersonality, type Personality } from "@/data/personalities";
import { dimensionDefs } from "@/data/dimensions";

export interface DimensionScore {
  code: string;
  name: string;
  raw: number;
  max: number;
  percentage: number;
}

export interface TestResult {
  personality: Personality;
  similarity: number;
  dimensions: DimensionScore[];
  isSpecial: boolean;
  matchDetails: { code: string; name: string; similarity: number }[];
}

export function calculateResult(
  answers: Record<number, number>,
  hiddenAnswers?: { drink?: string; drinkAttitude?: string }
): TestResult {
  const dims = calculateDimensions(answers);

  if (
    hiddenAnswers?.drink === "coffee" &&
    hiddenAnswers?.drinkAttitude === "addict"
  ) {
    return {
      personality: specialPersonality,
      similarity: 100,
      dimensions: dims,
      isSpecial: true,
      matchDetails: [],
    };
  }

  const userSpectrum = dims.map((d) => d.percentage);

  const ranked = personalities.map((p) => {
    let distance = 0;
    for (let i = 0; i < 5; i++) {
      distance += Math.abs(userSpectrum[i] - p.spectrum[i]);
    }
    const similarity = Math.max(0, Math.round((1 - distance / 500) * 100));
    return { personality: p, distance, similarity };
  });

  ranked.sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    return b.similarity - a.similarity;
  });

  const best = ranked[0];

  const matchDetails = ranked.slice(0, 5).map((r) => ({
    code: r.personality.code,
    name: r.personality.name,
    similarity: r.similarity,
  }));

  return {
    personality: best.personality,
    similarity: best.similarity,
    dimensions: dims,
    isSpecial: false,
    matchDetails,
  };
}

function calculateDimensions(answers: Record<number, number>): DimensionScore[] {
  return dimensionDefs.map((def) => {
    const dimQuestions = questions.filter((q) => q.dimension === def.code);
    const maxScore = dimQuestions.length * 3;
    let raw = 0;
    for (const q of dimQuestions) {
      const ans = answers[q.id];
      if (ans != null) {
        raw += ans;
      }
    }
    const percentage = maxScore > 0 ? Math.round((raw / maxScore) * 100) : 0;
    return {
      code: def.code,
      name: def.name,
      raw,
      max: maxScore,
      percentage,
    };
  });
}