'use client';

import { Trophy, Medal, Crown, TrendingUp, Flame, Target } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useUserData } from '@/app/api/Auth/services';
import { Card } from '@/lib/components/Card';
import { cn } from '@/lib/styles/utils';

// Mock data - replace with real API when available
const mockLeaderboardData = [
  {
    id: 1,
    rank: 1,
    name: 'Ahmad Zaky',
    avatar: '👨‍💻',
    points: 2850,
    streak: 45,
    flashcardsCompleted: 156,
    accuracyRate: 94,
  },
  {
    id: 2,
    rank: 2,
    name: 'Siti Nurhaliza',
    avatar: '👩‍🎓',
    points: 2640,
    streak: 38,
    flashcardsCompleted: 142,
    accuracyRate: 92,
  },
  {
    id: 3,
    rank: 3,
    name: 'Budi Santoso',
    avatar: '👨‍🎓',
    points: 2420,
    streak: 32,
    flashcardsCompleted: 128,
    accuracyRate: 89,
  },
  {
    id: 4,
    rank: 4,
    name: 'Rina Melati',
    avatar: '👩‍💼',
    points: 2180,
    streak: 28,
    flashcardsCompleted: 115,
    accuracyRate: 88,
  },
  {
    id: 5,
    rank: 5,
    name: 'Andi Wijaya',
    avatar: '👨‍🔬',
    points: 1950,
    streak: 24,
    flashcardsCompleted: 98,
    accuracyRate: 86,
  },
  {
    id: 6,
    rank: 6,
    name: 'Dewi Lestari',
    avatar: '👩‍🏫',
    points: 1820,
    streak: 21,
    flashcardsCompleted: 89,
    accuracyRate: 85,
  },
  {
    id: 7,
    rank: 7,
    name: 'Reza Pahlevi',
    avatar: '👨‍💼',
    points: 1650,
    streak: 18,
    flashcardsCompleted: 76,
    accuracyRate: 83,
  },
  {
    id: 8,
    rank: 8,
    name: 'Maya Sari',
    avatar: '👩‍🔬',
    points: 1480,
    streak: 15,
    flashcardsCompleted: 64,
    accuracyRate: 81,
  },
];

export default function LeaderboardPage() {
  const user = useUserData();
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'alltime'>('week');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-8 w-8 text-yellow-500" />;
      case 2:
        return <Medal className="h-8 w-8 text-gray-400" />;
      case 3:
        return <Medal className="h-8 w-8 text-amber-700" />;
      default:
        return <div className="text-2xl font-bold text-gray-500">#{rank}</div>;
    }
  };

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

  const currentUserRank = 15;
  const currentUserData = {
    rank: currentUserRank,
    name: user?.nama || 'User',
    avatar: '😊',
    points: 1250,
    streak: 12,
    flashcardsCompleted: 52,
    accuracyRate: 78,
  };

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
                Lihat ranking pengguna terbaik di Flip It! 🏆
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8 md:px-8">
        {/* Time Period Filter */}
        <div className="mb-6 flex justify-center gap-2 rounded-xl bg-white p-2 shadow-lg">
          <button
            onClick={() => setTimePeriod('week')}
            className={cn(
              'flex-1 rounded-lg px-4 py-2 font-semibold transition-all',
              timePeriod === 'week'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            Minggu Ini
          </button>
          <button
            onClick={() => setTimePeriod('month')}
            className={cn(
              'flex-1 rounded-lg px-4 py-2 font-semibold transition-all',
              timePeriod === 'month'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            Bulan Ini
          </button>
          <button
            onClick={() => setTimePeriod('alltime')}
            className={cn(
              'flex-1 rounded-lg px-4 py-2 font-semibold transition-all',
              timePeriod === 'alltime'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            Sepanjang Waktu
          </button>
        </div>

        {/* Current User Card */}
        <Card className="mb-6 overflow-hidden border-4 border-purple-200 p-0 shadow-xl">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-3 text-white">
            <p className="font-semibold">Ranking Kamu</p>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-2xl">
                {currentUserData.avatar}
              </div>
              <div>
                <p className="font-bold text-gray-800">{currentUserData.name}</p>
                <p className="text-sm text-gray-500">
                  Peringkat #{currentUserData.rank}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">
                {currentUserData.points}
              </p>
              <p className="text-sm text-gray-500">poin</p>
            </div>
          </div>
        </Card>

        {/* Top 3 Podium */}
        <div className="mb-8 grid grid-cols-3 items-end gap-4">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-500 text-3xl shadow-lg mx-auto">
              {mockLeaderboardData[1].avatar}
            </div>
            <div className="rounded-t-xl bg-gradient-to-br from-gray-200 to-gray-400 px-3 py-6 shadow-lg">
              <Medal className="mx-auto mb-2 h-8 w-8 text-white" />
              <p className="mb-1 text-sm font-bold text-gray-800">
                {mockLeaderboardData[1].name.split(' ')[0]}
              </p>
              <p className="text-xl font-extrabold text-white">
                {mockLeaderboardData[1].points}
              </p>
              <p className="text-xs text-gray-700">poin</p>
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-4xl shadow-xl mx-auto ring-4 ring-yellow-200">
              {mockLeaderboardData[0].avatar}
            </div>
            <div className="rounded-t-xl bg-gradient-to-br from-yellow-400 to-yellow-600 px-3 py-8 shadow-xl">
              <Crown className="mx-auto mb-2 h-10 w-10 text-white" />
              <p className="mb-1 text-base font-bold text-gray-800">
                {mockLeaderboardData[0].name.split(' ')[0]}
              </p>
              <p className="text-2xl font-extrabold text-white">
                {mockLeaderboardData[0].points}
              </p>
              <p className="text-xs text-gray-700">poin</p>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-3xl shadow-lg mx-auto">
              {mockLeaderboardData[2].avatar}
            </div>
            <div className="rounded-t-xl bg-gradient-to-br from-amber-600 to-amber-800 px-3 py-6 shadow-lg">
              <Medal className="mx-auto mb-2 h-8 w-8 text-white" />
              <p className="mb-1 text-sm font-bold text-gray-100">
                {mockLeaderboardData[2].name.split(' ')[0]}
              </p>
              <p className="text-xl font-extrabold text-white">
                {mockLeaderboardData[2].points}
              </p>
              <p className="text-xs text-gray-200">poin</p>
            </div>
          </div>
        </div>

        {/* Rankings List */}
        <div className="space-y-3">
          {mockLeaderboardData.slice(3).map((player, index) => (
            <Card
              key={player.id}
              className="transform overflow-hidden p-0 transition-all hover:scale-102 hover:shadow-xl"
            >
              <div className="flex items-center gap-4 p-4">
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', getRankBgColor(player.rank))}>
                  <span className="text-xl font-extrabold text-white">
                    {player.rank}
                  </span>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-2xl">
                  {player.avatar}
                </div>

                <div className="flex-grow">
                  <p className="font-bold text-gray-800">{player.name}</p>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Flame className="h-3 w-3 text-orange-500" />
                      {player.streak}d
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3 text-blue-500" />
                      {player.flashcardsCompleted}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      {player.accuracyRate}%
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-purple-600">
                    {player.points}
                  </p>
                  <p className="text-xs text-gray-500">poin</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Box */}
        <Card className="mt-8 border-2 border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-blue-900">
            <TrendingUp className="h-5 w-5" />
            Cara Mendapat Poin
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>
                <strong>Selesaikan Quiz:</strong> Dapatkan poin berdasarkan
                akurasi jawaban kamu
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>
                <strong>Jaga Streak:</strong> Bonus poin untuk belajar
                konsisten setiap hari
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>
                <strong>Selesaikan Flashcard:</strong> Setiap flashcard yang
                diselesaikan menambah poin
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
