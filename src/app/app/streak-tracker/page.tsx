'use client';

import { Image } from '@nextui-org/react';
import { Calendar, Flame, Target, Trophy, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useMonthlyStreak, useWeeklyStreak } from '@/app/api/Streak/services';
import { Calendar as CalendarComponent } from '@/app/components/ui/calendar';
import { Card } from '@/lib/components/Card';
import { cn } from '@/lib/styles/utils';

export default function StreakTrackerPage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>();
  const {
    data: weeklyStreakData,
    isLoading: isWeeklyLoading,
    isError: isWeeklyError,
    error: weeklyError,
  } = useWeeklyStreak();

  const {
    data: monthlyStreakData,
    isLoading: isMonthlyLoading,
    isError: isMonthlyError,
    error: monthlyError,
  } = useMonthlyStreak();

  useEffect(() => {
    if (!isMonthlyLoading && monthlyStreakData) {
      const newSelectedDates: Date[] = monthlyStreakData.streakMonth
        .filter((day) => day.isStreak)
        .map(
          (day) =>
            new Date(
              `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${day.day}`
            )
        );
      setSelectedDates(newSelectedDates);
    }
  }, [isMonthlyLoading, monthlyStreakData]);

  if (isWeeklyLoading || isMonthlyLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-brand-base border-t-transparent"></div>
          <p className="text-gray-600">Memuat data streak...</p>
        </div>
      </div>
    );

  if (isWeeklyError)
    return <div className="p-6">Error: {weeklyError.message}</div>;
  if (isMonthlyError)
    return <div className="p-6">Error: {monthlyError.message}</div>;

  const weekDays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
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
    if (index !== -1) {
      winStreakData[index].isStreak = item.isStreak;
    }
  });

  const currentStreak = weeklyStreakData?.streakTotal || 0;
  const totalFlashcards = monthlyStreakData?.flashcardTotal || 0;
  const todayPlays = monthlyStreakData?.todayPlayTotal || 0;
  
  // Calculate streak percentage (assuming 30 days max for a "perfect" month)
  const streakPercentage = Math.min((currentStreak / 30) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-blue-50 pb-24 md:pb-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white"></div>
          <div className="absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-white"></div>
        </div>
        
        <div className="relative mx-auto max-w-4xl px-6 py-12 md:px-8">
          <Link
            href="/app/activity"
            className="mb-4 inline-flex items-center text-brand-100 transition-colors hover:text-white"
          >
            ← Kembali ke Activity
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-extrabold md:text-5xl">
                Streak Tracker
              </h1>
              <p className="text-brand-100">
                Jaga konsistensi belajar kamu setiap hari! 🔥
              </p>
            </div>
            <div className="hidden md:block">
              <Flame className="h-24 w-24 text-orange-400" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8 md:px-8">
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Current Streak */}
          <Card className="transform border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 p-6 transition-transform hover:scale-105">
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-600">
                  Streak Saat Ini
                </p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-5xl font-bold text-orange-600">
                    {currentStreak}
                  </h2>
                  <span className="text-xl text-gray-500">hari</span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-orange-200">
                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500"
                    style={{ width: `${streakPercentage}%` }}
                  ></div>
                </div>
              </div>
              <Flame className="h-12 w-12 text-orange-500" />
            </div>
          </Card>

          {/* Total Flashcards */}
          <Card className="transform border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 transition-transform hover:scale-105">
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-600">
                  Total Flashcard
                </p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-5xl font-bold text-blue-600">
                    {totalFlashcards}
                  </h2>
                  <span className="text-xl text-gray-500">cards</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Sudah dikerjakan</p>
              </div>
              <Target className="h-12 w-12 text-blue-500" />
            </div>
          </Card>

          {/* Today's Activity */}
          <Card className="transform border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 transition-transform hover:scale-105">
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-600">
                  Repetisi Hari Ini
                </p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-5xl font-bold text-green-600">
                    {todayPlays}
                  </h2>
                  <span className="text-xl text-gray-500">kali</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Terus semangat!</p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-500" />
            </div>
          </Card>
        </div>

        {/* Weekly Progress */}
        <Card className="mb-8 overflow-hidden border-2 border-gray-200 p-0">
          <div className="bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-white">
              <Calendar className="h-6 w-6" />
              Progress Minggu Ini
            </h3>
          </div>
          <div className="p-6">
            <div className="flex justify-around">
              {winStreakData.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 transition-transform hover:scale-110"
                >
                  <span className="text-sm font-semibold text-gray-600">
                    {item.day}
                  </span>
                  <div
                    className={cn(
                      'flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300',
                      item.isStreak
                        ? 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-300'
                        : 'bg-gray-200'
                    )}
                  >
                    {item.isStreak ? (
                      <Flame className="h-7 w-7 text-white" />
                    ) : (
                      <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Monthly Calendar */}
        <Card className="mb-8 overflow-hidden border-2 border-gray-200 p-0">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-white">
              <Calendar className="h-6 w-6" />
              Kalender Aktivitas Bulanan
            </h3>
          </div>
          <div className="flex justify-center p-6">
            <CalendarComponent mode="multiple" selected={selectedDates} />
          </div>
        </Card>

        {/* Achievements Section */}
        <Card className="overflow-hidden border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50 p-0">
          <div className="bg-gradient-to-r from-yellow-500 to-amber-600 px-6 py-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-white">
              <Trophy className="h-6 w-6" />
              Pencapaian
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-4">
            <div className="text-center">
              <div
                className={cn(
                  'mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full',
                  currentStreak >= 3
                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-600'
                    : 'bg-gray-200'
                )}
              >
                <Flame
                  className={cn(
                    'h-8 w-8',
                    currentStreak >= 3 ? 'text-white' : 'text-gray-400'
                  )}
                />
              </div>
              <p className="text-xs font-semibold">3 Hari Berturut</p>
              <p className="text-xs text-gray-500">Pemula</p>
            </div>

            <div className="text-center">
              <div
                className={cn(
                  'mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full',
                  currentStreak >= 7
                    ? 'bg-gradient-to-br from-orange-400 to-orange-600'
                    : 'bg-gray-200'
                )}
              >
                <Flame
                  className={cn(
                    'h-8 w-8',
                    currentStreak >= 7 ? 'text-white' : 'text-gray-400'
                  )}
                />
              </div>
              <p className="text-xs font-semibold">7 Hari Berturut</p>
              <p className="text-xs text-gray-500">Konsisten</p>
            </div>

            <div className="text-center">
              <div
                className={cn(
                  'mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full',
                  currentStreak >= 14
                    ? 'bg-gradient-to-br from-purple-400 to-purple-600'
                    : 'bg-gray-200'
                )}
              >
                <Trophy
                  className={cn(
                    'h-8 w-8',
                    currentStreak >= 14 ? 'text-white' : 'text-gray-400'
                  )}
                />
              </div>
              <p className="text-xs font-semibold">14 Hari Berturut</p>
              <p className="text-xs text-gray-500">Dedikasi</p>
            </div>

            <div className="text-center">
              <div
                className={cn(
                  'mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full',
                  currentStreak >= 30
                    ? 'bg-gradient-to-br from-red-400 to-red-600'
                    : 'bg-gray-200'
                )}
              >
                <Trophy
                  className={cn(
                    'h-8 w-8',
                    currentStreak >= 30 ? 'text-white' : 'text-gray-400'
                  )}
                />
              </div>
              <p className="text-xs font-semibold">30 Hari Berturut</p>
              <p className="text-xs text-gray-500">Master</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
