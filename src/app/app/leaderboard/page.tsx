'use client';

import { Trophy, Medal, Crown, TrendingUp, Flame, Target } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Card } from '@/lib/components/Card';
import { cn } from '@/lib/styles/utils';

// Import Hook Service Baru
import {
  useUserRank,
  useLeaderboardByEducation,
} from '@/app/api/Leaderboard/services';

export default function LeaderboardPage() {
  // State Filter Education Level (Default: Undergraduate sesuai contoh API)
  const [educationLevel, setEducationLevel] = useState<string>('Undergraduate');

  // 1. Fetch Data User Rank (Posisi saya)
  const { data: userRankResponse, isLoading: isUserLoading } = useUserRank();

  // 2. Fetch Data Leaderboard List (Top Users)
  const { data: leaderboardResponse, isLoading: isListLoading } =
    useLeaderboardByEducation(educationLevel);

  // --- Helpers ---
  const getRankBgColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-600 to-amber-800';
      default:
        return 'bg-gradient-to-r from-brand-500 to-brand-700';
    }
  };

  // Helper avatar generator sederhana (Inisial Nama)
  const getAvatar = (name: string) => {
    // List emoji random biar variatif
    const emojis = ['👨‍💻', '👩‍🎓', '👨‍🎓', '👩‍💼', '👨‍🔬', '👩‍🏫', '🚀', '🔥'];
    // Pilih emoji berdasarkan panjang nama agar konsisten
    return emojis[name.length % emojis.length];
  };

  // --- Data Processing ---
  const currentUser = userRankResponse?.data;
  const leaderboardData = leaderboardResponse?.data || [];

  // Top 3 Users (untuk Podium)
  const top1 = leaderboardData.find((u) => u.rank === 1);
  const top2 = leaderboardData.find((u) => u.rank === 2);
  const top3 = leaderboardData.find((u) => u.rank === 3);

  // Sisanya (List ke bawah)
  const restOfList = leaderboardData.filter((u) => u.rank > 3);

  if (isUserLoading || isListLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-purple-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-24 md:pb-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-yellow-300 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-12 md:px-8">
          <Link
            href="/app/home"
            className="mb-4 inline-flex items-center text-purple-100 transition-colors hover:text-white"
          >
            ← Kembali ke Home
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 flex items-center gap-3 text-4xl font-extrabold md:text-5xl">
                <Trophy className="h-10 w-10" />
                Leaderboard
              </h1>
              <p className="text-purple-100">
                Lihat ranking streak tertinggi berdasarkan jenjang pendidikan!
                🏆
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8 md:px-8">
        {/* Education Level Filter */}
        <div className="mb-6 flex gap-2 overflow-x-auto rounded-xl bg-white p-2 shadow-lg scrollbar-hide">
          {['Undergraduate'].map((level) => (
            <button
              key={level}
              onClick={() => setEducationLevel(level)}
              className={cn(
                'flex-1 whitespace-nowrap rounded-lg px-4 py-2 font-semibold transition-all',
                educationLevel === level
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Current User Card (Posisi Saya) */}
        {currentUser && (
          <Card className="mb-6 overflow-hidden border-4 border-purple-200 p-0 shadow-xl">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-3 text-white">
              <p className="font-semibold">Posisi Kamu Saat Ini</p>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-purple-300 bg-purple-100 text-2xl">
                  {getAvatar(currentUser.userName)}
                </div>
                <div>
                  <p className="font-bold text-gray-800">
                    {currentUser.userName}{' '}
                    <span className="text-xs font-normal text-gray-500">
                      ({currentUser.educationLevel})
                    </span>
                  </p>
                  <p className="text-sm font-bold text-purple-600">
                    Peringkat #{currentUser.rank}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-2xl font-bold text-orange-500">
                  <Flame className="h-6 w-6 fill-orange-500" />
                  {currentUser.activeStreak}
                </div>
                <p className="text-xs text-gray-500">Active Streak</p>
              </div>
            </div>
          </Card>
        )}

        {/* Top 3 Podium (Hanya tampil jika ada data) */}
        {leaderboardData.length > 0 && (
          <div className="mb-8 grid grid-cols-3 items-end gap-2 sm:gap-4">
            {/* 2nd Place */}
            <div className="text-center">
              {top2 ? (
                <>
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-500 text-3xl shadow-lg ring-4 ring-gray-200 sm:h-16 sm:w-16">
                    {getAvatar(top2.userName)}
                  </div>
                  <div className="rounded-t-xl bg-gradient-to-br from-gray-200 to-gray-400 px-2 py-4 shadow-lg sm:py-6">
                    <Medal className="mx-auto mb-2 h-6 w-6 text-white sm:h-8 sm:w-8" />
                    <p className="mb-1 line-clamp-1 text-xs font-bold text-gray-800 sm:text-sm">
                      {top2.userName}
                    </p>
                    <p className="text-lg font-extrabold text-white sm:text-xl">
                      {top2.activeStreak}{' '}
                      <span className="text-xs font-normal">🔥</span>
                    </p>
                  </div>
                </>
              ) : (
                <div className="h-24"></div>
              )}
            </div>

            {/* 1st Place */}
            <div className="text-center">
              {top1 ? (
                <>
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-4xl shadow-xl ring-4 ring-yellow-200 sm:h-20 sm:w-20">
                    <Crown className="absolute -top-6 h-8 w-8 animate-bounce fill-yellow-200 text-yellow-500" />
                    {getAvatar(top1.userName)}
                  </div>
                  <div className="relative z-10 rounded-t-xl bg-gradient-to-br from-yellow-400 to-yellow-600 px-2 py-6 shadow-xl sm:py-8">
                    <Crown className="mx-auto mb-2 h-8 w-8 text-white sm:h-10 sm:w-10" />
                    <p className="mb-1 line-clamp-1 text-sm font-bold text-gray-900 sm:text-base">
                      {top1.userName}
                    </p>
                    <p className="text-2xl font-extrabold text-white sm:text-3xl">
                      {top1.activeStreak}{' '}
                      <span className="text-sm font-normal">🔥</span>
                    </p>
                  </div>
                </>
              ) : null}
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              {top3 ? (
                <>
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-3xl shadow-lg ring-4 ring-amber-200 sm:h-16 sm:w-16">
                    {getAvatar(top3.userName)}
                  </div>
                  <div className="rounded-t-xl bg-gradient-to-br from-amber-600 to-amber-800 px-2 py-4 shadow-lg sm:py-6">
                    <Medal className="mx-auto mb-2 h-6 w-6 text-white sm:h-8 sm:w-8" />
                    <p className="mb-1 line-clamp-1 text-xs font-bold text-gray-100 sm:text-sm">
                      {top3.userName}
                    </p>
                    <p className="text-lg font-extrabold text-white sm:text-xl">
                      {top3.activeStreak}{' '}
                      <span className="text-xs font-normal">🔥</span>
                    </p>
                  </div>
                </>
              ) : (
                <div className="h-24"></div>
              )}
            </div>
          </div>
        )}

        {/* Rankings List (Posisi 4 ke bawah) */}
        <div className="space-y-3">
          {restOfList.map((player) => (
            <Card
              key={player.userId}
              className="hover:scale-102 transform overflow-hidden p-0 transition-all hover:shadow-xl"
            >
              <div className="flex items-center gap-4 p-4">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg shadow-sm sm:h-12 sm:w-12',
                    getRankBgColor(player.rank)
                  )}
                >
                  <span className="text-lg font-extrabold text-white sm:text-xl">
                    {player.rank}
                  </span>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl sm:h-12 sm:w-12 sm:text-2xl">
                  {getAvatar(player.userName)}
                </div>

                <div className="flex-grow">
                  <p className="line-clamp-1 font-bold text-gray-800">
                    {player.userName}
                  </p>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3 text-blue-500" />
                      Longest: {player.longestStreak}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="flex items-center justify-end gap-1 text-lg font-bold text-orange-500 sm:text-xl">
                    <Flame className="h-4 w-4 fill-orange-500" />
                    {player.activeStreak}
                  </p>
                  <p className="text-xs text-gray-500">streak</p>
                </div>
              </div>
            </Card>
          ))}

          {leaderboardData.length === 0 && (
            <div className="py-10 text-center text-gray-500">
              Belum ada data leaderboard untuk kategori ini.
            </div>
          )}
        </div>

        {/* Info Box */}
        <Card className="mt-8 border-2 border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-blue-900">
            <TrendingUp className="h-5 w-5" />
            Sistem Peringkat
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>
                <strong>Ranking berdasarkan Active Streak:</strong> Semakin lama
                kamu mempertahankan streak harianmu, semakin tinggi posisi kamu
                di leaderboard.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>
                <strong>Kategori Pendidikan:</strong> Kamu bersaing dengan
                pengguna lain yang berada di jenjang pendidikan yang sama (
                {educationLevel}).
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
