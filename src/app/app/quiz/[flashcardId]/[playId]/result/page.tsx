/* eslint-disable react/no-unstable-nested-components */
'use client';

import { Image } from '@nextui-org/react';
import { useRouter, useParams } from 'next/navigation';
import { RiCloseLine, RiBookOpenLine } from 'react-icons/ri';
import Fire from '@/lib/assets/fire.svg';

// Pastikan path import ini sesuai dengan file services Anda
import { useWeeklyStreakV2, useCurrentStreak } from '@/app/api/Streak/services';

const Page = () => {
  const router = useRouter();
  const params = useParams();

  const flashcardId = params.flashcardId as string;
  const playId = params.playId as string;

  // --- 1. Fetch Data API ---
  const { data: weeklyResponse, isLoading: isWeeklyLoading } =
    useWeeklyStreakV2();

  const { data: currentStreakResponse, isLoading: isCurrentLoading } =
    useCurrentStreak();

  // --- 2. Data Preparation ---

  // Default UI Structure untuk 7 Hari
  const winStreakData = [
    { keyDay: 'Sun', day: 'Min', isStreak: false },
    { keyDay: 'Mon', day: 'Sen', isStreak: false },
    { keyDay: 'Tue', day: 'Sel', isStreak: false },
    { keyDay: 'Wed', day: 'Rab', isStreak: false },
    { keyDay: 'Thu', day: 'Kam', isStreak: false },
    { keyDay: 'Fri', day: 'Jum', isStreak: false },
    { keyDay: 'Sat', day: 'Sab', isStreak: false },
  ];

  // Mapping Data Weekly (API -> UI)
  // Struktur API: response.data.weekData -> Array[{ day: "Sun", attempts: 0 }, ...]
  const weeklyData = weeklyResponse?.data?.weekData || [];

  if (Array.isArray(weeklyData)) {
    weeklyData.forEach((item: { day: string; attempts: number }) => {
      // Cari hari yang cocok (API "Sun" == UI keyDay "Sun")
      const index = winStreakData.findIndex((d) => d.keyDay === item.day);

      if (index !== -1) {
        // Logic: Jika attempts > 0, berarti streak hari itu aktif
        winStreakData[index].isStreak = item.attempts > 0;
      }
    });
  }

  // Mapping Data Current Streak (API -> UI)
  // Struktur API: response.data.streakCount
  const currentStreakCount = currentStreakResponse?.data?.streakCount ?? 0;

  // --- 3. Handlers ---
  const handleClose = () => {
    router.push('/app/home');
  };

  const handlePembahasan = () => {
    router.push(`/app/quiz/${flashcardId}/${playId}/pembahasan`);
  };

  // --- 4. Component UI ---
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
  }) => {
    return (
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
  };

  return (
    <section className="relative flex h-screen flex-col p-4 sm:p-5 md:h-full md:p-6">
      <div className="relative z-30 flex justify-end">
        <button onClick={handleClose} type="button" aria-label="Close">
          <RiCloseLine className="text-2xl sm:text-3xl" />
        </button>
      </div>

      <div className="relative z-20 flex flex-1 flex-col items-center justify-center pb-32 sm:pb-40 md:flex-row md:items-center md:gap-8 md:pb-8 lg:gap-12">
        {/* Mascot - Desktop */}
        <div className="hidden md:flex md:flex-1 md:items-end md:justify-end">
          <Image
            src="/assets/app/streak-hero.png"
            className="w-full max-w-md lg:max-w-lg"
            removeWrapper
            alt="Mascot"
          />
        </div>

        {/* Content Container */}
        <div className="relative flex w-full max-w-md flex-col items-center md:flex-1 md:items-start">
          {/* Big Streak Number (Current Streak) */}
          <div className="relative flex items-center justify-center md:items-end md:justify-start ">
            <h1 className="relative z-10 text-[100px] font-extrabold sm:text-8xl md:text-7xl">
              {currentStreakCount}
            </h1>
            <Image
              src="/fire.png"
              className="absolute -top-3 left-1/2 z-0 aspect-square h-24 -translate-x-1/2 -translate-y-1/2 sm:h-32 md:relative md:-top-1 md:left-0 md:h-20 md:translate-x-0 md:translate-y-0 "
              removeWrapper
              alt="Fire"
            />
          </div>

          <h2 className="relative z-10 mt-6 text-3xl text-[#FEC536] sm:mt-9 sm:text-5xl md:text-4xl">
            Streak Aman!
          </h2>

          <div className="relative z-10 mt-4 flex flex-col items-center gap-6 sm:mt-7 md:items-start">
            <p className="max-w-xs text-center text-xs text-[#52525B] sm:max-w-sm sm:text-sm md:max-w-[290px] md:text-left">
              Kamu hebat! Rekor <b>Streak</b> harianmu berhasil diperbarui hari
              ini.
            </p>

            {/* Streak Indicators (Weekly Data) */}
            <div className="flex justify-between gap-2 sm:gap-3">
              {winStreakData.map((item, i) => (
                <StreakIndicator
                  key={i}
                  day={item.day}
                  isStreak={item.isStreak}
                />
              ))}
            </div>

            {/* Action Button */}
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handlePembahasan}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-100 px-6 py-3 font-bold text-blue-700 transition-transform hover:bg-blue-200 active:scale-95 sm:w-auto"
              >
                <RiBookOpenLine className="text-xl" />
                Lihat Pembahasan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mascot Mobile */}
      <Image
        src="/assets/app/streak-hero.png"
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-full max-w-xs -translate-x-1/2 sm:max-w-lg md:hidden"
        removeWrapper
        alt="Mascot"
      />
    </section>
  );
};

export default Page;
