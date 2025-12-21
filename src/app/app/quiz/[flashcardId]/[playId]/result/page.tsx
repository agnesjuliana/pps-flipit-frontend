/* eslint-disable react/no-unstable-nested-components */
'use client';

import { Image } from '@nextui-org/react';
import { useRouter, useParams } from 'next/navigation';
import { RiCloseLine, RiBookOpenLine, RiTrophyLine } from 'react-icons/ri';
import { useState, useEffect } from 'react';
import Fire from '@/lib/assets/fire.svg';

// Import hooks streak
import { useWeeklyStreakV2, useCurrentStreak } from '@/app/api/Streak/services';

const Page = () => {
  const router = useRouter();
  const params = useParams();

  const flashcardId = params.flashcardId as string;
  const playId = params.playId as string;

  // --- STATE SCORE (FRONTEND ONLY) ---
  const [scoreData, setScoreData] = useState({
    correct: 0,
    total: 0,
    score: 0,
  });

  // --- 1. Load Score from Local Storage ---
  useEffect(() => {
    // Ambil data yang disimpan saat Quiz selesai
    const storedData = localStorage.getItem('latest_quiz_score');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        const correct = parsed.correct || 0;
        const total = parsed.total || 0;

        // Hitung Score: (Benar / Total) * 100, Bulatkan ke atas
        const calculatedScore =
          total > 0 ? Math.ceil((correct / total) * 100) : 0;

        setScoreData({
          correct,
          total,
          score: calculatedScore,
        });
      } catch (e) {
        console.error('Gagal membaca score dari storage', e);
      }
    }
  }, []);

  // --- 2. Fetch Data Streak (API Backend) ---
  const { data: weeklyResponse, isLoading: isWeeklyLoading } =
    useWeeklyStreakV2();

  const { data: currentStreakResponse, isLoading: isCurrentLoading } =
    useCurrentStreak();

  // --- 3. Data Preparation ---
  const winStreakData = [
    { keyDay: 'Sun', day: 'Min', isStreak: false },
    { keyDay: 'Mon', day: 'Sen', isStreak: false },
    { keyDay: 'Tue', day: 'Sel', isStreak: false },
    { keyDay: 'Wed', day: 'Rab', isStreak: false },
    { keyDay: 'Thu', day: 'Kam', isStreak: false },
    { keyDay: 'Fri', day: 'Jum', isStreak: false },
    { keyDay: 'Sat', day: 'Sab', isStreak: false },
  ];

  // Mapping Weekly Data
  const weeklyData = weeklyResponse?.data?.weekData || [];
  if (Array.isArray(weeklyData)) {
    weeklyData.forEach((item: { day: string; attempts: number }) => {
      const index = winStreakData.findIndex((d) => d.keyDay === item.day);
      if (index !== -1) {
        winStreakData[index].isStreak = item.attempts > 0;
      }
    });
  }

  // Mapping Current Streak
  const currentStreakCount = currentStreakResponse?.data?.streakCount ?? 0;

  // --- 4. Handlers ---
  const handleClose = () => router.push('/app/home');
  const handlePembahasan = () =>
    router.push(`/app/quiz/${flashcardId}/${playId}/pembahasan`);

  // --- UI Loading ---
  if (isWeeklyLoading || isCurrentLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-base border-t-transparent" />
      </div>
    );
  }

  const StreakIndicator = ({
    day,
    isStreak,
  }: {
    day: string;
    isStreak: boolean;
  }) => (
    <div className="flex flex-col items-center justify-center gap-1">
      <p className="rounded-md bg-gray-100 px-1 text-xs font-semibold sm:text-sm">
        {day}
      </p>
      {isStreak ? (
        <Fire
          style={{ width: '20px', height: '20px' }}
          className="text-orange-500 sm:h-[26px] sm:w-[26px]"
        />
      ) : (
        <div className="h-5 w-5 rounded-full bg-gray-300 sm:h-[26px] sm:w-[26px]" />
      )}
    </div>
  );

  return (
    <section className="relative flex min-h-screen flex-col bg-white p-4 sm:p-5 md:p-6">
      {/* Tombol Close */}
      <div className="relative z-30 flex justify-end">
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close"
          className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200"
        >
          <RiCloseLine className="text-xl text-gray-700 sm:text-2xl" />
        </button>
      </div>

      <div className="relative z-20 flex flex-1 flex-col items-center justify-center pb-20 pt-4 md:flex-row md:gap-12 md:pb-0">
        {/* Mascot - Desktop Only */}
        <div className="hidden md:flex md:flex-1 md:items-end md:justify-end">
          <Image
            src="/assets/app/streak-hero.png"
            className="w-full max-w-md lg:max-w-lg"
            removeWrapper
            alt="Mascot"
          />
        </div>

        {/* Content Container */}
        <div className="relative flex w-full max-w-md flex-col items-center gap-6 md:flex-1 md:items-start md:gap-8">
          {/* HEADER SECTION: SCORE & STREAK */}
          <div className="flex w-full flex-col items-center gap-4 md:items-start">
            {/* SCORE CARD (Calculated Frontend) */}
            <div className="flex w-full flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-brand-base to-blue-600 p-6 text-white shadow-lg md:items-start">
              <div className="flex items-center gap-2 opacity-90">
                <RiTrophyLine className="text-xl" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Total Score
                </span>
              </div>
              <h1 className="mt-2 text-6xl font-black tracking-tight sm:text-7xl">
                {scoreData.score}
              </h1>
              <div className="mt-2 flex gap-4 text-sm font-medium opacity-80">
                <span>✅ {scoreData.correct} Benar</span>
                <span>❌ {scoreData.total - scoreData.correct} Salah</span>
              </div>
            </div>

            {/* STREAK INFO */}
            <div className="mt-2 flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src="/fire.png"
                    className="h-full w-full object-contain"
                    removeWrapper
                    alt="Fire"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">
                    Current Streak
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {currentStreakCount}{' '}
                    <span className="text-sm font-normal text-gray-500">
                      Hari
                    </span>
                  </p>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase text-gray-400">
                  Status
                </p>
                <p className="text-sm font-bold text-green-600">Aman 🔥</p>
              </div>
            </div>
          </div>

          {/* WEEKLY GRAPH & ACTIONS */}
          <div className="flex w-full flex-col gap-6">
            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="mb-4 text-center text-sm font-semibold text-gray-600 md:text-left">
                Aktivitas Minggu Ini
              </p>
              <div className="flex justify-between gap-2">
                {winStreakData.map((item, i) => (
                  <StreakIndicator
                    key={i}
                    day={item.day}
                    isStreak={item.isStreak}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handlePembahasan}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-base px-6 py-4 font-bold text-white shadow-lg transition-transform hover:bg-brand-700 active:scale-95"
              >
                <RiBookOpenLine className="text-xl" />
                Lihat Pembahasan
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-6 py-3.5 font-bold text-gray-600 transition-colors hover:bg-gray-50 active:scale-95"
              >
                Kembali ke Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mascot Mobile */}
      <Image
        src="/assets/app/streak-hero.png"
        className="pointer-events-none fixed bottom-0 left-1/2 -z-10 w-64 -translate-x-1/2 opacity-20 sm:hidden"
        removeWrapper
        alt="Mascot"
      />
    </section>
  );
};

export default Page;
