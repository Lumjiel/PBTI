"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { questions } from "@/data/questions";

type Phase = "main" | "hidden1" | "hidden2";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const answersRef = useRef<Record<number, number>>({});
  const [phase, setPhase] = useState<Phase>("main");
  const [hiddenAnswers, setHiddenAnswers] = useState<{ drink?: string; drinkAttitude?: string }>({});
  const [shuffledOptions] = useState<typeof questions[0]["options"][]>(() =>
    questions.map((q) => shuffleArray(q.options.map((opt) => ({ ...opt, label: opt.label.replace(/^[A-C]\.\s*/, '') }))))
  );
  const [toast, setToast] = useState<string | null>(null);

  const total = questions.length;
  const answered = Object.keys(answers).length;
  const currentQ = phase === "main" ? questions[currentIndex] : null;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const getShuffledOptions = (index: number) => {
    return shuffledOptions[index];
  };

  const optionLabels = ["A", "B", "C", "D"];

  const handleSelect = (value: number) => {
    if (!currentQ) return;
    const next = { ...answersRef.current, [currentQ.id]: value };
    answersRef.current = next;
    setAnswers(next);
    const newAnswered = Object.keys(next).length;
    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    } else if (newAnswered >= questions.length) {
      setPhase("hidden1");
    } else {
      const remain = questions.length - newAnswered;
      const msgs = [
        `别急，还没到赛点呢，还差${remain}题才能开球！`,
        `这球还没过网呢，再来${remain}板！`,
        `擦网了不算，再答${remain}题！`,
        `比分还领先呢，先把${remain}题答完再说！`,
      ];
      const idx = (remain * 17 + currentIndex * 31) % msgs.length;
      showToast(msgs[idx]);
    }
  };

  const handleHidden1 = (value: string) => {
    setHiddenAnswers((p) => ({ ...p, drink: value }));
    setPhase("hidden2");
  };

  const handleHidden2 = (value: string) => {
    finish({ ...hiddenAnswers, drink: "coffee", drinkAttitude: value });
  };

  const finish = (hidden: { drink?: string; drinkAttitude?: string }) => {
    sessionStorage.setItem("pbti_data", JSON.stringify({ answers: answersRef.current, hidden }));
    router.push("/result");
  };

  const handleJumpTo = (index: number) => {
    setCurrentIndex(index);
  };

  const hiddenOptions1 = [
    { label: 'A. 什么都行，手边有什么喝什么', value: "a" },
    { label: 'B. 一瓶可乐，必须是冰的', value: "b" },
    { label: 'C. 什么都行，手边有什么喝什么', value: "c" },
    { label: 'D.先喘口气，水的事等会儿再说', value: "d" },
  ];

  const hiddenOptions2 = [
    { label: "A. 樊振东", value: "a" },
    { label: "B. 马龙", value: "b" },
    { label: "C. 许昕", value: "c" },
    { label: "D. 王楚钦", value: "d" },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      <header className="header">
        <Link href="/" className="back-btn">
          <span>←</span>
          <span>首页</span>
        </Link>
        <div className="progress">{phase === "main" ? currentIndex + 1 : "?"} / {total}</div>
        <div className="answered">{answered} 已答</div>
      </header>

      <main className="main-container">
        {toast && (
          <div className="toast">
            <span>🏓</span>
            <span>{toast}</span>
          </div>
        )}
        {phase === "main" && currentQ && (
          <>
            <div className="question-tag">
              <div className="q-tag">Q{currentQ.id}</div>
              <div className="c-tag">C{currentQ.id}</div>
            </div>
            <h1 className="question-title">{currentQ.text}</h1>

            <div className="options-list">
              {getShuffledOptions(currentIndex).map((opt, i) => {
                const isSelected = answers[currentQ.id] === opt.value;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt.value)}
                    className={`option-item ${isSelected ? "selected" : ""}`}
                  >
                    <div className="option-prefix">{optionLabels[i]}</div>
                    <span className="option-text">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="prev-btn"
            >
              <span>←</span>
              上一题
            </button>

            <div className="answer-sheet">
              <div className="sheet-header">
                <div className="sheet-title">答题卡</div>
                <div className="sheet-progress">{answered}/{total}</div>
              </div>
              <div className="question-numbers">
                {Array.from({ length: Math.min(10, total) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handleJumpTo(i)}
                    className={`number-btn ${currentIndex === i ? "current" : ""} ${answers[questions[i]?.id] ? "answered" : ""}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              {total > 10 && (
                <div className="question-numbers row2">
                  {Array.from({ length: total - 10 }, (_, i) => (
                    <button
                      key={i + 10}
                      onClick={() => handleJumpTo(i + 10)}
                      className={`number-btn ${currentIndex === i + 10 ? "current" : ""} ${answers[questions[i + 10]?.id] ? "answered" : ""}`}
                    >
                      {i + 11}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {phase === "hidden1" && (
          <div className="card">
            <div className="text-4xl mb-4">🏓</div>
            <h2 className="text-xl font-bold text-[#222] mb-2">最后一题</h2>
            <p className="text-sm text-[#999] mb-6">打完球你最想喝什么？</p>
            <div className="options-list">
              {hiddenOptions1.map((opt, i) => (
                <button
                  key={opt.value}
                  onClick={() => handleHidden1(opt.value)}
                  className="option-item"
                >
                  <div className="option-prefix">{optionLabels[i]}</div>
                  <span className="option-text">{opt.label.replace(/^[A-D]\.\s*/, '')}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "hidden2" && (
          <div className="card">
            <div className="text-4xl mb-4">🥤</div>
            <h2 className="text-xl font-bold text-[#222] mb-2">最最后一题</h2>
            <p className="text-sm text-[#999] mb-6">你最喜欢的乒乒球运动员是谁？</p>
            <div className="options-list">
              {hiddenOptions2.map((opt, i) => (
                <button
                  key={opt.value}
                  onClick={() => handleHidden2(opt.value)}
                  className="option-item"
                >
                  <div className="option-prefix">{optionLabels[i]}</div>
                  <span className="option-text">{opt.label.replace(/^[A-D]\.\s*/, '')}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        PBTI · 仅供娱乐
      </footer>

      <style jsx global>{`
        .header {
          width: 100%;
          height: 48px;
          background-color: #FFFFFF;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .back-btn {
          color: #999999;
          font-size: 14px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .progress {
          color: #FF6600;
          font-size: 14px;
          font-weight: bold;
        }
        .answered {
          color: #999999;
          font-size: 14px;
        }
        .main-container {
          max-width: 600px;
          margin: 40px auto 0;
          padding: 0 20px;
        }
        .question-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .q-tag {
          background-color: #FF6600;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: bold;
          padding: 4px 8px;
          border-radius: 6px;
        }
        .c-tag {
          color: #999999;
          font-size: 14px;
        }
        .question-title {
          font-size: 20px;
          font-weight: bold;
          color: #222222;
          margin-bottom: 24px;
          line-height: 1.4;
        }
        .options-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }
        .option-item {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #FFD2B3;
          border-radius: 12px;
          background-color: #FFFFFF;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: border-color 0.1s ease;
          text-align: left;
        }
        .option-item.selected {
          border-color: #FF6600;
          border-width: 2px;
        }
        .option-prefix {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background-color: #FFE8D6;
          color: #FF6600;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
          flex-shrink: 0;
        }
        .option-item.selected .option-prefix {
          background-color: #FF6600;
          color: #FFFFFF;
        }
        .option-text {
          font-size: 15px;
          color: #333333;
          line-height: 1.5;
        }
        .prev-btn {
          color: #E5E5E5;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          background: none;
          border: none;
          margin-bottom: 40px;
        }
        .prev-btn:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .card {
          background: white;
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          border: 1px solid #FFD2B3;
        }
        .answer-sheet {
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid #FFE8D6;
        }
        .sheet-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .sheet-title {
          font-size: 14px;
          color: #666666;
        }
        .sheet-progress {
          font-size: 14px;
          color: #666666;
        }
        .question-numbers {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 6px;
          margin-bottom: 8px;
        }
        .question-numbers.row2 {
          grid-template-columns: repeat(5, 1fr);
        }
        @media (min-width: 400px) {
          .question-numbers {
            grid-template-columns: repeat(10, 1fr);
            gap: 8px;
          }
          .question-numbers.row2 {
            grid-template-columns: repeat(10, 1fr);
          }
        }
        .number-btn {
          width: 100%;
          aspect-ratio: 1;
          max-width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          border: 1px solid #E5E5E5;
          background-color: transparent;
          color: #CCCCCC;
          cursor: pointer;
        }
        .number-btn.current {
          background-color: #FF6600;
          color: #FFFFFF;
          border-color: #FF6600;
        }
        .number-btn.answered {
          background-color: #FFE8D6;
          color: #FF6600;
          border-color: #FFD2B3;
        }
        .number-btn.current.answered {
          background-color: #FF6600;
          color: #FFFFFF;
        }
        .footer {
          text-align: center;
          margin-top: 80px;
          padding-bottom: 20px;
          font-size: 12px;
          color: #E0E0E0;
        }
        .toast {
          position: fixed;
          top: 70px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #333333;
          color: #FFFFFF;
          padding: 12px 20px;
          border-radius: 24px;
          font-size: 14px;
          font-weight: 500;
          z-index: 200;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          animation: toastIn 0.3s ease;
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}