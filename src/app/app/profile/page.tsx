'use client';

import { Image } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaShareAlt } from 'react-icons/fa';
import { LuPencil } from 'react-icons/lu';
// import { PiPencilSimpleLineBold } from 'react-icons/pi';

import { useUserData } from '@/app/api/Auth/services';
import logout from '@/app/api/Logout/action';

import {
  useMonthlyStreakV2,
  useWeeklyStreakV2,
  useCurrentStreak,
} from '@/app/api/Streak/services';

export default function ActivityPage() {
  const user = useUserData();
  const router = useRouter();

  // --- 1. FETCH DATA STREAK ---
  const {
    data: weeklyResponse,
    isLoading: isWeeklyLoading,
    isError: isWeeklyError,
    error: weeklyError,
  } = useWeeklyStreakV2();

  const {
    data: monthlyResponse,
    isLoading: isMonthlyLoading,
    isError: isMonthlyError,
    error: monthlyError,
  } = useMonthlyStreakV2();

  const { data: currentStreakResponse, isLoading: isCurrentLoading } =
    useCurrentStreak();

  // --- 2. DATA PROCESSING ---
  // A. Monthly Data & Calendar
  const monthlyData = monthlyResponse?.data?.monthData || [];
  const totalCorrectMonth = monthlyResponse?.data?.totalCorrect || 0;
  // B. Today's Stats
  const today = new Date().toLocaleDateString('en-CA');
  const todayStats = monthlyData.find((d: any) => d.date === today);
  const todayPlays = todayStats?.attempts || 0;
  // C. Weekly Data Mapping
  const winStreakData = [
    { keyDay: 'Sun', day: 'Min', isStreak: false },
    { keyDay: 'Mon', day: 'Sen', isStreak: false },
    { keyDay: 'Tue', day: 'Sel', isStreak: false },
    { keyDay: 'Wed', day: 'Rab', isStreak: false },
    { keyDay: 'Thu', day: 'Kam', isStreak: false },
    { keyDay: 'Fri', day: 'Jum', isStreak: false },
    { keyDay: 'Sat', day: 'Sab', isStreak: false },
  ];
  const weeklyDataList = weeklyResponse?.data?.weekData || [];
  if (Array.isArray(weeklyDataList)) {
    weeklyDataList.forEach((item: { day: string; attempts: number }) => {
      const index = winStreakData.findIndex((day) => day.keyDay === item.day);
      if (index !== -1) {
        winStreakData[index].isStreak = item.attempts > 0;
      }
    });
  }
  // D. Current Streak
  const currentStreak = currentStreakResponse?.data?.streakCount ?? 0;
  const streakPercentage = Math.min((currentStreak / 30) * 100, 100);

  if (isWeeklyLoading || isMonthlyLoading || isCurrentLoading)
    return <div>Loading...</div>;
  if (isWeeklyError) return <div>Error Weekly: {weeklyError.message}</div>;
  if (isMonthlyError) return <div>Error Monthly: {monthlyError.message}</div>;

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      router.push('/login');
    } catch (e) {
      console.error('Logout error:', e);
      router.push('/login');
    }
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center p-4 pb-24 sm:p-5 md:h-full md:justify-center md:p-6">
      {/* Quarter Circles - Desktop Only */}
      <div className="absolute left-0 top-0 hidden h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-br-full bg-[#FEC536] md:block" />
      <div className="absolute right-0 top-0 hidden h-48 w-48 -translate-y-1/2 translate-x-1/2 rounded-bl-full bg-[#FEC536] md:block" />

      <div className="w-full max-w-2xl">
        <div className="flex w-full items-center justify-between">
          <Link href="/">
            <FaShareAlt className="text-lg text-[#6699CC] sm:text-xl" />
          </Link>
          <Link href="/app/profile/edit-profile">
            <LuPencil className="text-lg sm:text-2xl" />
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2 py-4 sm:py-6">
          <Image
            src="/assets/app/ava.png"
            width={120}
            height={120}
            alt=""
            className="h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32"
          />
          <h1 className="text-lg font-bold leading-7 sm:text-xl md:text-2xl">
            {user?.nama ?? 'Nama Pengguna'}
          </h1>
          {/* <Link
          href="/"
          className="flex items-center gap-[6px] text-xs sm:text-sm font-medium text-[#237AC1]"
        >
          Ubah Profil
          <PiPencilSimpleLineBold className="!text-base sm:!text-[21px]" />
        </Link> */}
        </div>
        <div className="flex w-full max-w-2xl flex-col gap-3 sm:gap-4">
          <h4 className="text-center text-sm font-normal sm:text-base">
            <span className="text-lg font-bold text-[#237AC1] sm:text-xl md:text-2xl">
              Aktivitas
            </span>{' '}
            terbaru kamu!
          </h4>
          <div className="grid w-full grid-cols-2 gap-2 sm:gap-3">
            <div className="col-span-2 grid place-items-center rounded-xl border py-2 sm:py-3">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="24"
                    viewBox="0 0 25 26"
                    fill="none"
                    className="h-6 w-5 sm:h-6 sm:w-6"
                  >
                    <path
                      d="M12.7763 24.4759C12.7763 24.4759 5.57083 24.5552 5.01624 18.2564C4.74509 13.7619 7.35372 12.5643 7.2088 8.25158C7.2047 8.12849 7.34552 8.05615 7.44378 8.13042C7.89939 8.47499 8.8569 9.32665 9.25223 10.6415C9.29636 10.7881 9.50746 10.7764 9.53592 10.626C9.91702 8.61098 11.4254 3.58145 17.1425 1.47786C17.2711 1.4306 17.3883 1.5719 17.3185 1.69005C16.707 2.72509 15.0709 5.81994 16.1472 7.67915C16.9233 9.01981 17.2666 9.92753 17.4173 10.4438C17.458 10.5829 17.654 10.5846 17.6976 10.4463L18.0063 9.46529C18.053 9.317 18.268 9.33364 18.291 9.48736C18.7125 12.3026 20.2509 14.8386 20.1074 17.7809C20.0212 19.5469 19.4802 21.3492 18.1875 22.6122C16.7587 24.0081 14.7157 24.4594 12.7763 24.4759Z"
                      fill="#EC6E45"
                    />
                    <path
                      d="M10.8747 15.81C10.9842 15.8966 11.1407 15.7967 11.1081 15.6609C10.3733 12.5934 12.2641 10.4101 13.0702 9.64395C13.1719 9.54714 13.3393 9.63491 13.3156 9.77344C13.0592 11.2781 13.7182 12.6909 14.8397 13.7402C15.7533 14.5949 15.7461 15.625 15.6824 16.0965C15.6667 16.213 15.788 16.2976 15.8938 16.246C16.5701 15.9164 17.0357 15.304 17.2605 14.9542C17.3267 14.8511 17.4816 14.8704 17.5221 14.986C18.4416 17.6135 18.8493 22.2916 12.932 22.2734C6.7623 22.2545 7.74923 17.7809 8.14528 16.5925C8.4186 15.7727 8.12635 15.179 7.91874 14.8897C7.85039 14.7944 7.91344 14.6631 8.03039 14.6564C9.15874 14.5907 10.3085 15.3625 10.8747 15.81Z"
                      fill="#F8D462"
                    />
                  </svg>
                  <h3 className="text-lg font-bold sm:text-2xl">
                    {currentStreak}
                  </h3>
                </div>
                <p className="text-xs text-[#A1A1AA]">Streak Harian</p>
              </div>
            </div>
            {/* ...existing code for other cards... */}
            <div className="col-span-1 grid place-items-center rounded-xl border py-2 sm:py-3">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="24"
                    viewBox="0 0 28 28"
                    fill="none"
                    className="h-6 w-5 sm:h-6 sm:w-6"
                  >
                    <path
                      d="M18.8884 2.33325H9.11171C4.86504 2.33325 2.33337 4.86492 2.33337 9.11159V18.8766C2.33337 23.1349 4.86504 25.6666 9.11171 25.6666H18.8767C23.1234 25.6666 25.655 23.1349 25.655 18.8883V9.11159C25.6667 4.86492 23.135 2.33325 18.8884 2.33325ZM14 21.2916C11.9117 21.2916 10.2784 20.2533 9.17004 19.2266V20.0549C9.17004 20.5333 8.77337 20.9299 8.29504 20.9299C7.81671 20.9299 7.42004 20.5333 7.42004 20.0549V16.8466C7.42004 16.3683 7.81671 15.9716 8.29504 15.9716H11.1884C11.6667 15.9716 12.0634 16.3683 12.0634 16.8466C12.0634 17.3249 11.6667 17.7216 11.1884 17.7216H10.1384C11.0017 18.5849 12.3434 19.5416 14 19.5416C17.0567 19.5416 19.5417 17.0566 19.5417 13.9999C19.5417 13.5216 19.9384 13.1249 20.4167 13.1249C20.895 13.1249 21.2917 13.5216 21.2917 13.9999C21.2917 18.0249 18.025 21.2916 14 21.2916ZM21.2917 11.1299C21.2917 11.1649 21.2917 11.1999 21.2917 11.2233C21.28 11.3516 21.245 11.4683 21.1867 11.5733C21.1284 11.6783 21.0467 11.7716 20.9417 11.8533C20.86 11.9116 20.7667 11.9583 20.6617 11.9933C20.58 12.0166 20.4984 12.0283 20.4167 12.0283H17.5817C17.1034 12.0283 16.7067 11.6316 16.7067 11.1533C16.7067 10.6749 17.1034 10.2783 17.5817 10.2783H18.55C17.6167 9.41492 16.1117 8.45825 14.0234 8.45825C10.9667 8.45825 8.48171 10.9433 8.48171 13.9999C8.48171 14.4783 8.08504 14.8749 7.60671 14.8749C7.12837 14.8749 6.70837 14.4783 6.70837 13.9999C6.70837 9.97492 9.97504 6.70825 14 6.70825C16.5084 6.70825 18.3517 7.79325 19.5417 8.83159V7.94492C19.5417 7.46659 19.9384 7.06992 20.4167 7.06992C20.895 7.06992 21.2917 7.46659 21.2917 7.94492V11.1299Z"
                      fill="#72C287"
                    />
                  </svg>
                  <h3 className="text-lg font-bold sm:text-2xl">
                    {todayPlays}
                  </h3>
                </div>
                <p className="text-xs text-[#A1A1AA]">Repetisi Materi</p>
              </div>
            </div>
            <div className="col-span-1 grid place-items-center rounded-xl border py-2 sm:py-3">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="24"
                    viewBox="0 0 28 28"
                    fill="none"
                    className="h-6 w-5 sm:h-6 sm:w-6"
                  >
                    <path
                      d="M18.6667 15.0499V19.9499C18.6667 24.0333 17.0334 25.6666 12.95 25.6666H8.05004C3.96671 25.6666 2.33337 24.0333 2.33337 19.9499V15.0499C2.33337 10.9666 3.96671 9.33325 8.05004 9.33325H12.95C17.0334 9.33325 18.6667 10.9666 18.6667 15.0499Z"
                      fill="#237AC1"
                    />
                    <path
                      d="M15.05 2.91659H19.95C21.9341 2.91659 23.1712 3.31698 23.9271 4.07281C24.6829 4.82864 25.0833 6.06579 25.0833 8.04992V12.9499C25.0833 14.6954 24.7705 15.8625 24.1805 16.6287C23.6048 17.3763 22.6873 17.8406 21.2384 18.0056C20.9806 18.035 20.7083 17.8191 20.7083 17.4744V15.0499C20.7083 12.5209 20.122 10.547 18.7874 9.21244C17.4529 7.87791 15.479 7.29159 12.95 7.29159H10.5255C10.1808 7.29159 9.96489 7.01928 9.99426 6.76144C10.1593 5.31255 10.6236 4.39507 11.3712 3.81937C12.1373 3.22936 13.3044 2.91659 15.05 2.91659Z"
                      fill="#237AC1"
                      stroke="#237AC1"
                      strokeWidth="1.16667"
                    />
                  </svg>
                  <h3 className="text-lg font-bold sm:text-2xl">
                    {totalCorrectMonth}
                  </h3>
                </div>
                <p className="text-xs text-[#A1A1AA]">Flash Cards</p>
              </div>
            </div>
            <div className="col-span-2">
              <button
                className="w-full rounded-[12px] bg-[#F31260] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#E20350] sm:px-[18px] sm:py-[10px] sm:text-base"
                type="button"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/assets/app/ladder.png"
        width={445}
        height={203}
        alt=""
        removeWrapper
        className="pointer-events-none absolute bottom-0 w-full max-w-sm sm:max-w-lg md:hidden"
      />
    </section>
  );
}
