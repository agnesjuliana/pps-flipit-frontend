/* eslint-disable react/no-unstable-nested-components */
'use client';

import { Image } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation'; // Tambahkan useParams
import { RiCloseLine } from 'react-icons/ri';
import Fire from '@/lib/assets/fire.svg';
import { useWeeklyStreak } from '@/app/api/Streak/services';

const Page = () => {
  const router = useRouter();
  // 1. Ambil flashcardId dan playId dari URL params
  const params = useParams();
  const { flashcardId, playId } = params;

  const {
    data: weeklyStreakData,
    isLoading: isWeeklyStreakLoading,
    isError: isWeeklyStreakError,
    error: weeklyStreakError,
  } = useWeeklyStreak();

  if (isWeeklyStreakLoading) return <div>Loading...</div>;
  if (isWeeklyStreakError) return <div>Error: {weeklyStreakError.message}</div>;

  const winStreakData = [
    {
      keyDay: 'Sun',
      day: 'Min',
      attempts: 0,
      correctAnswers: 0,
      isStreak: false,
    },
    {
      keyDay: 'Mon',
      day: 'Sen',
      attempts: 0,
      correctAnswers: 0,
      isStreak: false,
    },
    {
      keyDay: 'Tue',
      day: 'Sel',
      attempts: 0,
      correctAnswers: 0,
      isStreak: false,
    },
    {
      keyDay: 'Wed',
      day: 'Rab',
      attempts: 0,
      correctAnswers: 0,
      isStreak: false,
    },
    {
      keyDay: 'Thu',
      day: 'Kam',
      attempts: 0,
      correctAnswers: 0,
      isStreak: false,
    },
    {
      keyDay: 'Fri',
      day: 'Jum',
      attempts: 0,
      correctAnswers: 0,
      isStreak: false,
    },
    {
      keyDay: 'Sat',
      day: 'Sab',
      attempts: 0,
      correctAnswers: 0,
      isStreak: false,
    },
  ];

  weeklyStreakData?.weekData?.forEach(
    (item: { day: string; attempts: number; correctAnswers: number }) => {
      const index = winStreakData.findIndex((day) => day.keyDay === item.day);
      if (index !== -1) {
        winStreakData[index].attempts = item.attempts;
        winStreakData[index].correctAnswers = item.correctAnswers;
        // Logic isStreak bisa disesuaikan, misal attempts > 0
        winStreakData[index].isStreak = item.attempts > 0;
      }
    }
  );

  const handleClose = () => {
    router.push('/app/home');
  };

  // 2. Fungsi untuk pindah ke halaman Quiz
  const handleStartQuiz = () => {
    // Asumsi route base-nya ada di /app/quiz sesuai struktur folder
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
            className="sm:h-[26px] sm:w-[26px]"
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
        <button onClick={() => handleClose()} type="button" aria-label="Close">
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
          {/* Streak Number */}
          <div className="relative flex items-center justify-center md:items-end md:justify-start ">
            <h1 className="relative z-10 text-[100px] font-extrabold sm:text-8xl md:text-7xl">
              {weeklyStreakData?.streakTotal ? weeklyStreakData.streakTotal : 0}
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
            {/* 3. Text Update sesuai request */}
            <p className="max-w-xs text-center text-sm text-[#52525B] sm:max-w-sm sm:text-base md:max-w-[320px] md:text-left">
              Mau dapat <b>Streak</b> hari ini? <br />
              Ayo kerjakan quiznya sekarang!
            </p>

            {/* Indicator Mingguan */}
            <div className="flex justify-between gap-2 sm:gap-3">
              {winStreakData?.map((item, i) => (
                <StreakIndicator
                  key={i as number}
                  day={item?.day}
                  isStreak={item?.isStreak}
                />
              ))}
            </div>

            {/* 4. Tombol Menuju Quiz */}
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
