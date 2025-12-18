/* eslint-disable react/no-unstable-nested-components */

'use client';

import { Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { RiCloseLine } from 'react-icons/ri';
import Fire from '@/lib/assets/fire.svg';
import { useWeeklyStreak } from '@/app/api/Streak/services';

const Page = () => {
  const route = useRouter();

  const {
    data: weeklyStreakData,
    isLoading: isWeeklyStreakLoading,
    isError: isWeeklyStreakError,
    error: weeklyStreakError,
    refetch,
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
      }
    }
  );

  const handleClose = () => {
    route.push('/app/home');
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
        {/* Mascot - Left side on desktop, bottom on mobile */}
        <div className="hidden md:flex md:flex-1 md:items-end md:justify-end">
          <Image
            src="/assets/app/streak-hero.png"
            className="w-full max-w-md lg:max-w-lg"
            removeWrapper
            alt="Mascot"
          />
        </div>

        {/* Content Container - Right side on desktop */}
        <div className="relative flex w-full max-w-md flex-col items-center md:flex-1 md:items-start">
          {/* Streak Number with Fire Behind */}
          <div className="relative flex items-center justify-center md:items-end md:justify-start ">
            <h1 className="relative z-10 text-[100px] font-extrabold sm:text-8xl md:text-7xl">
              {weeklyStreakData?.streakTotal ? weeklyStreakData.streakTotal : 0}
            </h1>

            {/* Fire Icon */}
            <Image
              src="/fire.png"
              className="absolute -top-3 left-1/2 z-0 aspect-square h-24 -translate-x-1/2 -translate-y-1/2 sm:h-32 md:relative md:-top-1 md:left-0 md:h-20 md:translate-x-0 md:translate-y-0 "
              removeWrapper
              alt="Fire"
            />
          </div>

          {/* Streak Text */}
          <h2 className="relative z-10 mt-6 text-3xl text-[#FEC536] sm:mt-9 sm:text-5xl md:text-4xl">
            Streak
          </h2>
          <div className="relative z-10 mt-4 flex flex-col items-center gap-3 sm:mt-7 sm:gap-5 md:items-start">
            <p className="max-w-xs text-center text-xs text-[#52525B] sm:max-w-sm sm:text-sm md:max-w-[290px] md:text-left">
              Perbaharui rekor <b>Streak</b> kamu dengan latihan setiap hari !
            </p>
            <div className="flex justify-between gap-2 sm:gap-3">
              {winStreakData?.map((item, i) => (
                <StreakIndicator
                  key={i as number}
                  day={item?.day}
                  isStreak={item?.isStreak}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mascot - Bottom on mobile only */}
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
