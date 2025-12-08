/* eslint-disable react/no-unstable-nested-components */

'use client';

import { Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { RiCloseLine } from 'react-icons/ri';

import { useWeeklyStreak } from '@/app/api/Streak/services';
import Fire from '@/lib/assets/fire.svg';

const Page = () => {
  const route = useRouter();
  const {
    data: weeklyStreakData,
    isLoading: isWeeklyStreakLoading,
    isError: isWeeklyStreakError,
    error: weeklyStreakError,
  } = useWeeklyStreak();
  if (isWeeklyStreakLoading) return <div>Loading...</div>;
  if (isWeeklyStreakError) return <div>Error: {weeklyStreakError.message}</div>;

  const winStreakData = [
    { keyDay: 'Monday', day: 'Sen', isStreak: false },
    { keyDay: 'Tuesday', day: 'Sel', isStreak: false },
    { keyDay: 'Wednesday', day: 'Rab', isStreak: false },
    { keyDay: 'Thursday', day: 'Kam', isStreak: false },
    { keyDay: 'Friday', day: 'Jum', isStreak: false },
    { keyDay: 'Saturday', day: 'Sab', isStreak: false },
    { keyDay: 'Sunday', day: 'Min', isStreak: false },
  ];

  weeklyStreakData?.streakWeek.forEach((item) => {
    const index = winStreakData.findIndex((day) => day.keyDay === item.day);
    winStreakData[index].isStreak = item.isStreak;
  });

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
        <p className="rounded-md bg-gray-100 px-1 font-semibold">{day}</p>
        {isStreak ? (
          <Fire style={{ width: '26px', height: '26px' }} />
        ) : (
          <div className="h-[26px] w-[26px] rounded-full bg-gray-300" />
        )}
      </div>
    );
  };

  return (
    <section className="relative flex h-full flex-col p-5">
      <div className="flex justify-end">
        <button onClick={() => handleClose()} type="button" aria-label="Close">
          <RiCloseLine className="text-3xl" />
        </button>
      </div>
      <div className="flex flex-col">
        <div className="relative mt-10 flex justify-center">
          <Image
            src="/fire.png"
            className=" absolute"
            width={130}
            height={130}
            removeWrapper
          />
        </div>
        <div className="relative z-20 mx-auto mt-20 flex flex-col items-center justify-center gap-12">
          <h1 className=" text-[140px] font-extrabold ">
            {weeklyStreakData?.streakTotal}
          </h1>
          <h2 className="text-[60px] text-[#FEC536]">Streak</h2>
        </div>
        <div className="mt-7 flex flex-col items-center gap-5">
          <p className="max-w-[290px] text-center text-[#52525B]">
            Perbaharui rekor <b>Streak</b> kamu dengan latihan setiap hari !
          </p>
          <div className="flex justify-between gap-3">
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
      <Image
        src="/assets/app/streak-hero.png"
        className=" absolute bottom-0 left-1/2 -translate-x-1/2"
        removeWrapper
        alt=""
      />
    </section>
  );
};

export default Page;
