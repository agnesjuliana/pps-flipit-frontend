'use client';

import {
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  Trophy,
  X,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  PanInfo,
} from 'framer-motion';
import parse, { domToReact, Element, DOMNode } from 'html-react-parser';

// --- IMPORTS ---
// Helper mock data baru (Pastikan file mockData.ts sudah diupdate)
import {
  getSimulationItems,
  type MockSimulationItem,
} from '@/lib/data/mockData';

// API Actions
import { createPlayResult, finishQuiz } from '@/app/api/Play/action';
import type { CreatePlayResultType } from '@/app/api/Play/model';

// Components
import { Card } from '@/lib/components/Card';
import { cn } from '@/lib/styles/utils';

// --- 1. KOMPONEN MOCK BROWSER ---
// Wrapper visual agar soal terlihat seperti di dalam browser/email client
const MockBrowser = ({
  children,
  url = 'https://mail.google.com',
}: {
  children: React.ReactNode;
  url?: string;
}) => (
  <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-inner">
    {/* Browser Bar */}
    <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-100 px-4 py-2">
      <div className="flex gap-1.5">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />
      </div>
      <div className="mx-2 flex flex-1 items-center gap-2 truncate rounded-md bg-white px-3 py-1 text-xs text-gray-500 shadow-sm">
        <div className="h-3 w-3 rounded-full bg-gray-300" />
        {url}
      </div>
    </div>
    {/* Content Area */}
    <div className="relative flex-1 overflow-y-auto bg-white p-4">
      {children}
    </div>
  </div>
);

// --- 2. KOMPONEN SIMULATED LINK ---
// Menggantikan tag <a> agar aman (tidak navigasi) tapi interaktif (hover tooltip)
const SimulatedLink = ({
  text,
  realUrl,
  className,
}: {
  text: React.ReactNode;
  realUrl: string;
  className?: string;
}) => {
  return (
    <span className="group relative inline-block">
      {/* Tampilan Link */}
      <span
        className={cn(
          'cursor-pointer font-medium hover:opacity-80',
          className || 'text-blue-600 underline'
        )}
      >
        {text}
      </span>

      {/* Tooltip Hover (URL Asli) */}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-gray-700 bg-gray-900 px-3 py-1.5 text-xs text-white shadow-xl group-hover:block">
        Link: <span className="font-mono text-yellow-400">{realUrl}</span>
        {/* Panah Tooltip */}
        <span className="absolute left-1/2 top-full -mt-1 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></span>
      </span>
    </span>
  );
};

// --- MAIN COMPONENT ---
export default function QuizInteractivePage() {
  const params = useParams();
  const router = useRouter();

  // Menggunakan flashcardId dari URL sebagai simulationId
  const simulationId = Number(params.flashcardId);
  const playId = Number(params.playId);

  // --- STATE ---
  const [simulationItems, setSimulationItems] = useState<MockSimulationItem[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, boolean>>(new Map());
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(0);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      // Ambil data soal simulasi dari mockData
      const items = getSimulationItems(simulationId);

      // Fallback ke ID 1 jika data kosong (untuk keperluan demo/dev)
      if (!items || items.length === 0) {
        const demoItems = getSimulationItems(1);
        setSimulationItems(demoItems || []);
      } else {
        setSimulationItems(items);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [simulationId]);

  // --- TIMER ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (!showResult) setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [showResult]);

  // --- FRAMER MOTION VALUES ---
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const bgOpacityLeft = useTransform(x, [-150, -20], [1, 0]); // Merah (Kiri)
  const bgOpacityRight = useTransform(x, [20, 150], [0, 1]); // Hijau (Kanan)
  const boxColor = useTransform(
    x,
    [-150, 0, 150],
    ['#ef4444', '#ffffff', '#22c55e']
  );

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-base border-t-transparent" />
      </div>
    );
  }

  // --- EMPTY STATE ---
  if (!simulationItems || simulationItems.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md p-8 text-center">
          <X className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h2 className="text-xl font-bold text-gray-800">
            Simulasi Tidak Tersedia
          </h2>
          <Link
            href="/app/home"
            className="mt-4 inline-block font-semibold text-brand-base hover:underline"
          >
            Kembali ke Home
          </Link>
        </Card>
      </div>
    );
  }

  const currentItem = simulationItems[currentIndex];
  const correctAnswers = Array.from(answers.values()).filter((v) => v).length;

  // --- HTML PARSER CONFIG ---
  const parseOptions = {
    replace: (domNode: DOMNode) => {
      // Ganti tag <a> dengan SimulatedLink
      if (domNode instanceof Element && domNode.name === 'a') {
        const href = domNode.attribs.href || '#';
        const className = domNode.attribs.class;
        return (
          <SimulatedLink
            text={domToReact(domNode.children as DOMNode[], parseOptions)}
            realUrl={href}
            className={className}
          />
        );
      }
    },
  };

  // --- LOGIC SWIPE & JAWABAN ---
  const handleSwipeComplete = async (direction: 'left' | 'right') => {
    // 1. Tentukan Jawaban Benar/Salah untuk kartu INI
    const isActuallyPhishing = currentItem.isPhishing;
    const userGuessIsPhishing = direction === 'left';
    const isCorrect = userGuessIsPhishing === isActuallyPhishing;

    // 2. Simpan State Lokal (untuk UI)
    const newAnswers = new Map(answers).set(currentItem.id, isCorrect);
    setAnswers(newAnswers);

    // 3. Kirim Jawaban Per Soal ke Backend
    try {
      await createPlayResult({
        playId,
        flashcardItemId: currentItem.id,
        isTrue: isCorrect,
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
    }

    // 4. Cek Apakah Ini Kartu Terakhir?
    if (currentIndex < simulationItems.length - 1) {
      // Belum selesai, lanjut next card
      setCurrentIndex((prev) => prev + 1);
      x.set(0);
    } else {
      // --- KARTU TERAKHIR SELESAI ---
      try {
        // HITUNG SKOR FINAL SECARA MANUAL
        // Kita pakai 'newAnswers' karena state 'answers' mungkin belum update
        const finalCorrectCount = Array.from(newAnswers.values()).filter(
          Boolean
        ).length;
        const totalQuestions = simulationItems.length;

        // Panggil finishPlay dengan parameter lengkap
        await finishQuiz(playId, totalQuestions, finalCorrectCount);

        setShowResult(true);
      } catch (error) {
        console.error('Finish Error:', error);
        setShowResult(true); // Tetap tampilkan result agar user tidak stuck
      }
    }
  };

  // Handler Drag Framer Motion
  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 100; // Jarak swipe minimal
    if (info.offset.x > threshold) {
      handleSwipeComplete('right');
    } else if (info.offset.x < -threshold) {
      handleSwipeComplete('left');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- VIEW: HASIL (RESULT SCREEN) ---
  if (showResult) {
    const score = Math.round((correctAnswers / simulationItems.length) * 100);
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-50 p-4">
        <Card className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <Trophy className="mx-auto mb-4 h-20 w-20 text-yellow-500" />
          <h1 className="mb-2 text-3xl font-bold text-gray-800">Selesai!</h1>
          <div className="mb-6 text-5xl font-black text-brand-base">
            {score}%
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-green-50 p-4">
              <div className="mb-1 flex justify-center text-green-600">
                <Check size={24} />
              </div>
              <div className="text-xl font-bold text-green-700">
                {correctAnswers}
              </div>
              <div className="text-sm text-green-600">Benar</div>
            </div>
            <div className="rounded-xl bg-red-50 p-4">
              <div className="mb-1 flex justify-center text-red-600">
                <X size={24} />
              </div>
              <div className="text-xl font-bold text-red-700">
                {answers.size - correctAnswers}
              </div>
              <div className="text-sm text-red-600">Salah</div>
            </div>
          </div>

          {/* Tombol ke Halaman Pembahasan */}
          <button
            onClick={() =>
              router.push(`/app/quiz/${simulationId}/${playId}/pembahasan`)
            }
            className="w-full rounded-xl bg-brand-base py-3 font-bold text-white transition hover:bg-brand-700 active:scale-95"
          >
            Lihat Pembahasan Detail
          </button>
        </Card>
      </div>
    );
  }

  // --- VIEW: UTAMA (TINDER CARDS) ---
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-gray-50">
      {/* 1. Header & Progress */}
      <div className="mx-auto w-full max-w-lg px-6 pb-2 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/app/home"
            className="rounded-full bg-white p-2 shadow-sm transition hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Phishing Detector
            </span>
            <span className="font-mono text-lg font-bold text-gray-700">
              {formatTime(timer)}
            </span>
          </div>
          <div className="w-9" />
        </div>

        {/* Progress Bar Segmented */}
        <div className="mb-2 flex h-1.5 gap-1">
          {simulationItems.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                'h-full flex-1 rounded-full transition-colors duration-300',
                idx < currentIndex
                  ? 'bg-brand-base'
                  : idx === currentIndex
                    ? 'bg-gray-400'
                    : 'bg-gray-200'
              )}
            />
          ))}
        </div>
      </div>

      {/* 2. Card Area (Swipeable) */}
      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            style={{ x, rotate, borderColor: boxColor }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={onDragEnd}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.2 } }}
            className="relative aspect-[3/4] w-full cursor-grab touch-none overflow-hidden rounded-3xl border-4 bg-white shadow-2xl active:cursor-grabbing sm:aspect-[4/5]"
          >
            {/* Overlay Labels (Aman/Bahaya saat di-drag) */}
            <motion.div
              style={{ opacity: bgOpacityRight }}
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-green-500/20"
            >
              <div className="-rotate-12 transform rounded-lg border-4 border-green-500 px-4 py-2 text-4xl font-black text-green-500">
                AMAN
              </div>
            </motion.div>
            <motion.div
              style={{ opacity: bgOpacityLeft }}
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-red-500/20"
            >
              <div className="rotate-12 transform rounded-lg border-4 border-red-500 px-4 py-2 text-4xl font-black text-red-500">
                BAHAYA
              </div>
            </motion.div>

            {/* KONTEN KARTU */}
            <div className="h-full w-full p-2">
              <MockBrowser>
                {/* Render Content Berdasarkan Data Mock (htmlContent) */}
                {currentItem.htmlContent ? (
                  parse(currentItem.htmlContent, parseOptions)
                ) : (
                  // Fallback UI
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                    <h3 className="mb-4 text-xl font-bold text-gray-800">
                      Analisa Kasus Ini
                    </h3>
                    <p className="text-gray-600">{currentItem.scenarioTitle}</p>
                    <p className="mt-8 text-xs text-gray-400">
                      (Data simulasi visual tidak tersedia)
                    </p>
                  </div>
                )}
              </MockBrowser>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Footer Action Buttons */}
      <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-4 px-6 pb-8">
        <button
          onClick={() => handleSwipeComplete('left')}
          className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-red-100 bg-white p-4 text-red-500 shadow-md transition hover:bg-red-50 active:scale-95"
        >
          <div className="rounded-full bg-red-100 p-3">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <span className="text-sm font-bold">BAHAYA</span>
        </button>

        <button
          onClick={() => handleSwipeComplete('right')}
          className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-green-100 bg-white p-4 text-green-500 shadow-md transition hover:bg-green-50 active:scale-95"
        >
          <div className="rounded-full bg-green-100 p-3">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <span className="text-sm font-bold">AMAN</span>
        </button>
      </div>
    </div>
  );
}
