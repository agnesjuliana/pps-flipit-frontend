/* eslint-disable react/no-unstable-nested-components */
'use client';

import { Image } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import { RiCloseLine } from 'react-icons/ri';
import Fire from '@/lib/assets/fire.svg';

// Import kedua hook (Weekly & Current)
import { useWeeklyStreakV2, useCurrentStreak } from '@/app/api/Streak/services';

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { flashcardId, playId } = params;

  // --- 1. Fetch Data API ---
  const {
    data: weeklyResponse,
    isLoading: isWeeklyLoading,
    isError: isWeeklyError,
    error: weeklyError,
  } = useWeeklyStreakV2();

  const { data: currentStreakResponse, isLoading: isCurrentLoading } =
    useCurrentStreak();

  // --- 2. Loading & Error Handling ---
  if (isWeeklyLoading || isCurrentLoading) return <div>Loading...</div>;
  if (isWeeklyError) return <div>Error: {weeklyError.message}</div>;

  // --- 3. Data Processing ---

  // Template Data UI (Indonesian Days)
  const hariMinggu = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const winStreakData = [
    { keyDay: 'Sun', day: 'Min', isStreak: false },
    { keyDay: 'Mon', day: 'Sen', isStreak: false },
    { keyDay: 'Tue', day: 'Sel', isStreak: false },
    { keyDay: 'Wed', day: 'Rab', isStreak: false },
    { keyDay: 'Thu', day: 'Kam', isStreak: false },
    { keyDay: 'Fri', day: 'Jum', isStreak: false },
    { keyDay: 'Sat', day: 'Sab', isStreak: false },
  ];

  // Mapping Weekly Data dari API ke UI
  const weeklyData = weeklyResponse?.data?.weekData || [];

  if (Array.isArray(weeklyData)) {
    weeklyData.forEach((item: { day: string; attempts: number }) => {
      // Cari hari yang sesuai
      const index = winStreakData.findIndex((day) => day.keyDay === item.day);
      if (index !== -1) {
        // Logic: Jika attempts > 0, tandai sebagai streak (api)
        winStreakData[index].isStreak = item.attempts > 0;
      }
    });
  }

  // Ambil Angka Streak Saat Ini dari API Current
  const currentStreakCount = currentStreakResponse?.data?.streakCount ?? 0;

  // --- 4. Handlers ---
  const handleClose = () => {
    router.push('/app/home');
  };

  const handleStartQuiz = () => {
    router.push(`/app/quiz/${flashcardId}/${playId}`);
  };

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
        {/* Mascot - Left side on desktop */}
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
          {/* Streak Number (DATA REAL DARI API) */}
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
            Streak
          </h2>

          <div className="relative z-10 mt-4 flex flex-col items-center gap-6 sm:mt-7 md:items-start">
            <p className="max-w-xs text-center text-sm text-[#52525B] sm:max-w-sm sm:text-base md:max-w-[320px] md:text-left">
              Mau dapat <b>Streak</b> hari ini? <br />
              Ayo kerjakan quiznya sekarang!
            </p>

            {/* Indicator Mingguan (DATA REAL DARI API) */}
            <div className="flex justify-between gap-2 sm:gap-3">
              {winStreakData.map((item, i) => {
                // Hari +1, wrap ke awal jika Sabtu
                const nextDayIdx = (i + 1) % hariMinggu.length;
                const nextDay = hariMinggu[nextDayIdx];
                return (
                  <StreakIndicator
                    key={i}
                    day={nextDay}
                    isStreak={item.isStreak}
                  />
                );
              })}
            </div>

            {/* Tombol Menuju Quiz */}
            <button
              type="button"
              onClick={handleStartQuiz}
              className="mt-2 w-full rounded-xl bg-orange-500 px-8 py-3 font-bold text-white shadow-lg transition-transform hover:bg-orange-600 active:scale-95 sm:w-auto"
            >
              Mulai Quiz 🚀
            </button>
          </div>
        </div>
      </div>

      {/* Mascot - Mobile Bottom */}
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
