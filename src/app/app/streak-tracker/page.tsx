'use client';

import { Calendar, Flame, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';
// Hapus useState dan useEffect karena tidak dibutuhkan untuk derived data
// import { useEffect, useState } from 'react';

import {
  useMonthlyStreakV2,
  useWeeklyStreakV2,
  useCurrentStreak,
} from '@/app/api/Streak/services';
import { Calendar as CalendarComponent } from '@/app/components/ui/calendar';
import { Card } from '@/lib/components/Card';
import { cn } from '@/lib/styles/utils';

export default function StreakTrackerPage() {
  // --- 1. FETCH DATA ---
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

  // Hitung selectedDates dan selectedDays (+1 hari)
  const selectedDates = monthlyData
    .filter((d: any) => d.attempts > 0)
    .map((d: any) => {
      const date = new Date(d.date);
      date.setDate(date.getDate() + 1);
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    });

  // Ambil hari dari tanggal yang sudah +1
  const hariIndo = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
  ];
  const selectedDays = selectedDates.map((date) => hariIndo[date.getDay()]);

  // B. Today's Stats
  // Menggunakan new Date() local untuk mencocokkan tanggal hari ini
  // Note: Pastikan format API YYYY-MM-DD sesuai dengan output lokal
  const today = new Date().toLocaleDateString('en-CA'); // Format YYYY-MM-DD yang aman timezone
  const todayStats = monthlyData.find((d: any) => d.date === today);
  const todayPlays = todayStats?.attempts || 0;

  // C. Weekly Data Mapping
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

  const weeklyDataList = weeklyResponse?.data?.weekData || [];

  // Pengecekan Array.isArray ini yang memperbaiki error forEach sebelumnya
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
  // Calculate percentage (Max 30 hari)
  const streakPercentage = Math.min((currentStreak / 30) * 100, 100);

  // --- 3. RENDERING ---

  if (isWeeklyLoading || isMonthlyLoading || isCurrentLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-brand-base border-t-transparent"></div>
          <p className="text-gray-600">Memuat data streak...</p>
        </div>
      </div>
    );

  if (isWeeklyError)
    return <div className="p-6">Error Weekly: {weeklyError.message}</div>;
  if (isMonthlyError)
    return <div className="p-6">Error Monthly: {monthlyError.message}</div>;

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
            href="/app/home"
            className="mb-4 inline-flex items-center text-brand-100 transition-colors hover:text-white"
          >
            ← Kembali ke Home
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
          {/* Current Streak Card */}
          <Card className="transform border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 p-6 transition-transform hover:scale-105">
            <div className="flex items-start justify-between">
              <div className="w-full">
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
              <Flame className="ml-2 h-12 w-12 flex-shrink-0 text-orange-500" />
            </div>
          </Card>

          {/* Total Flashcards Card */}
          <Card className="transform border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 transition-transform hover:scale-105">
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-600">
                  Total Benar (Bulan Ini)
                </p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-5xl font-bold text-blue-600">
                    {totalCorrectMonth}
                  </h2>
                  <span className="text-xl text-gray-500">soal</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Terus tingkatkan!</p>
              </div>
              <Target className="h-12 w-12 text-blue-500" />
            </div>
          </Card>

          {/* Today's Activity Card */}
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
                <p className="mt-2 text-sm text-gray-500">
                  {todayPlays > 0 ? 'Bagus sekali!' : 'Ayo mulai belajar!'}
                </p>
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
              {winStreakData.map((item, i) => {
                // Hari +1, wrap ke awal jika Sabtu
                const nextDayIdx = (i + 1) % hariMinggu.length;
                const nextDay = hariMinggu[nextDayIdx];
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 transition-transform hover:scale-110"
                  >
                    <span className="text-sm font-semibold text-gray-600">
                      {nextDay}
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
                );
              })}
            </div>
          </div>
        </Card>

        {/* Monthly Calendar + Hari */}
        <Card className="mb-8 overflow-hidden border-2 border-gray-200 p-0">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-white">
              <Calendar className="h-6 w-6" />
              Kalender Aktivitas Bulanan
            </h3>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 p-6">
            <CalendarComponent
              mode="multiple"
              selected={selectedDates}
              className="rounded-md border shadow"
            />
            {/* Tampilkan hari dari tanggal yang sudah +1 */}
            <div className="mt-4 w-full">
              <h4 className="mb-2 text-center text-sm font-semibold text-indigo-700">
                Hari dari tanggal streak (+1):
              </h4>
              <div className="flex flex-wrap justify-center gap-2">
                {selectedDates.map((date, idx) => (
                  <div
                    key={idx}
                    className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-800"
                  >
                    {date.toLocaleDateString('id-ID')} -{' '}
                    {hariIndo[date.getDay()]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Achievements Section */}
        <Card className="overflow-hidden border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50 p-0">
          <div className="bg-gradient-to-r from-yellow-500 to-amber-600 px-6 py-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-white">
              <Target className="h-6 w-6" />
              Pencapaian Streak
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-4">
            {[
              { days: 3, label: 'Pemula', color: 'bg-yellow-500' },
              { days: 7, label: 'Konsisten', color: 'bg-orange-500' },
              { days: 14, label: 'Dedikasi', color: 'bg-purple-500' },
              { days: 30, label: 'Master', color: 'bg-red-500' },
            ].map((milestone) => (
              <div key={milestone.days} className="text-center">
                <div
                  className={cn(
                    'mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full transition-all',
                    currentStreak >= milestone.days
                      ? `bg-gradient-to-br ${milestone.color.replace('bg-', 'from-')} to-${milestone.color.replace('bg-', '')}-700 shadow-md`
                      : 'bg-gray-200 grayscale'
                  )}
                >
                  <Flame
                    className={cn(
                      'h-8 w-8',
                      currentStreak >= milestone.days
                        ? 'text-white'
                        : 'text-gray-400'
                    )}
                  />
                </div>
                <p className="text-xs font-bold text-gray-800">
                  {milestone.days} Hari
                </p>
                <p className="text-xs text-gray-500">{milestone.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
