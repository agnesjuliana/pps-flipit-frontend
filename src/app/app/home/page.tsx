/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */

'use client';
import { Book, Copy, Flame } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import type {
  CreatePlayResponseType,
  CreatePlayType,
} from '@/app/api/Play/model';
import { useCreatePlay } from '@/app/api/Play/service';
import { useUserData } from '@/app/api/Auth/services';
import { useEffect, useState } from 'react';
import { getAllFlashcards, getAllFolders } from '@/lib/data/mockData';
import { cn } from '@/lib/styles/utils';
import Mascot from '@/lib/assets/home-asset-1.svg';
import Fire from '@/lib/assets/fire.svg';
import { Card } from '@/lib/components/Card';

// --- KOMPONEN DIPINDAHKAN KELUAR (Best Practice) ---

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

const SectionTitle = ({
  title,
  subtitle,
  titleColor,
}: {
  title: string;
  subtitle?: string;
  titleColor?: string;
}) => {
  return (
    <div className="mt-2 flex flex-wrap items-baseline gap-1">
      <p
        className={cn(
          `text-lg font-bold sm:text-xl md:text-2xl ${titleColor ?? 'text-black'}`
        )}
      >
        {title}
      </p>
      <p className="text-xs sm:text-sm">{subtitle}</p>
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  const userData = useUserData();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use mock data
  const folderListData = getAllFolders();
  const flashcardListData = getAllFlashcards();

  const { mutate } = useCreatePlay();

  const winStreakData = [
    { keyDay: 'Monday', day: 'Sen', isStreak: false },
    { keyDay: 'Tuesday', day: 'Sel', isStreak: false },
    { keyDay: 'Wednesday', day: 'Rab', isStreak: false },
    { keyDay: 'Thursday', day: 'Kam', isStreak: false },
    { keyDay: 'Friday', day: 'Jum', isStreak: false },
    { keyDay: 'Saturday', day: 'Sab', isStreak: false },
    { keyDay: 'Sunday', day: 'Min', isStreak: false },
  ];

  const handleFlashcardClick = async (flashcardId: number) => {
    const payload: CreatePlayType = {
      flashcardId: Number(flashcardId),
    };
    mutate(payload, {
      onSuccess: (data: CreatePlayResponseType) => {
        router.push(`/app/flashcard/${flashcardId}/${data.play.id}`);
      },
    });
  };

  const handleFolderClick = async (folderId: number, folderTitle: string) => {
    const path = folderTitle.replace(/\s/g, '-');
    router.push(`/app/folder/${folderId}/${path}`);
  };

  const FlashCardRecently = ({
    title,
    subtitle,
    flashcardId,
  }: {
    title: string;
    subtitle: string;
    flashcardId: number;
  }) => {
    return (
      <button
        className="flex-shrink-0 text-left"
        type="button"
        aria-label="flashcard-button"
        onClick={() => handleFlashcardClick(flashcardId)}
      >
        <Card className="w-40 border-[#E4E4E7] sm:w-48 md:w-56">
          <div className="flex flex-col gap-1">
            <p className="line-clamp-2 text-xs font-bold sm:text-sm">{title}</p>
            <p className="line-clamp-1 text-xs text-gray-500">{subtitle}</p>
          </div>
        </Card>
      </button>
    );
  };

  const ClassFolderCard = ({
    title,
    subtitle,
    folderId,
  }: {
    title: string;
    subtitle: string;
    folderId: number;
  }) => {
    return (
      <button
        className="flex-shrink-0 text-left"
        type="button"
        aria-label="folder-button"
        onClick={() => handleFolderClick(folderId, title)}
      >
        <Card className="w-40 border-[#E4E4E7] bg-[#F9FAFB] sm:w-48 md:w-56">
          <div className="flex flex-col gap-1">
            <p className="text-2xl sm:text-3xl md:text-4xl">📁</p>
            <p className="line-clamp-2 text-xs font-bold sm:text-sm">{title}</p>
            <p className="line-clamp-1 text-xs text-gray-500">{subtitle}</p>
          </div>
        </Card>
      </button>
    );
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-gradient-to-b from-brand-base to-brand-base pb-2">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-center pb-3 pt-4">
            <div className="flex items-center gap-6 rounded-full bg-white px-6 py-2.5 shadow-lg sm:gap-8 sm:py-3">
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5 text-brand-base sm:h-6 sm:w-6" />
                <p className="text-sm font-semibold text-gray-800 sm:text-base">
                  {flashcardListData.length}
                </p>
              </div>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500 sm:h-6 sm:w-6" />
                <p className="text-sm font-semibold text-gray-800 sm:text-base">
                  {0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-brand-base sm:text-4xl md:text-5xl">
            Hi, {isMounted ? userData.nama : ''} 👋🏻
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            Selamat datang kembali!
          </p>
        </div>

        <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex flex-col items-center gap-3 p-2 text-center sm:gap-4 sm:p-4">
            <p className="text-sm font-medium text-gray-700 sm:text-base md:text-lg">
              Yuk lanjutin{' '}
              <span className="font-bold text-brand-base">Streak Harian</span>{' '}
              kamu!
            </p>
            <Mascot className="h-20 w-auto sm:h-24 md:h-28" />
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
              {winStreakData?.map((item, i) => (
                <StreakIndicator
                  key={i as number}
                  day={item?.day}
                  isStreak={item?.isStreak}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Access Menu */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <Link href="/app/streak-tracker">
            <Card className="transform cursor-pointer border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 transition-all hover:scale-105 hover:shadow-lg">
              <div className="flex flex-col items-center gap-2 py-4">
                <div className="rounded-full bg-orange-100 p-3">
                  <svg
                    className="h-8 w-8 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <p className="text-center text-sm font-bold text-gray-800">
                  Streak Tracker
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/app/leaderboard">
            <Card className="transform cursor-pointer border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 transition-all hover:scale-105 hover:shadow-lg">
              <div className="flex flex-col items-center gap-2 py-4">
                <div className="rounded-full bg-purple-100 p-3">
                  <svg
                    className="h-8 w-8 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-center text-sm font-bold text-gray-800">
                  Leaderboard
                </p>
              </div>
            </Card>
          </Link>
        </div>

        <div>
          <SectionTitle
            title="Flash Cards"
            titleColor="text-yellow-600"
            subtitle="terbaru kamu!"
          />
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {flashcardListData && flashcardListData.length > 0 ? (
              flashcardListData.map((item) => (
                <button
                  key={item?.id}
                  className="group w-full text-left"
                  type="button"
                  aria-label="flashcard-button"
                  onClick={() => handleFlashcardClick(item?.id)}
                >
                  <Card className="h-full w-full border-gray-200 transition-all duration-200 hover:border-brand-base hover:shadow-lg group-hover:scale-105">
                    <div className="flex flex-col gap-2 p-3 sm:p-4">
                      <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100 sm:h-10 sm:w-10">
                        <Copy className="h-4 w-4 text-yellow-600 sm:h-5 sm:w-5" />
                      </div>
                      <p className="line-clamp-2 text-sm font-bold text-gray-800 sm:text-base">
                        {item?.title}
                      </p>
                      <p className="line-clamp-1 text-xs text-gray-500">
                        {item?.description}
                      </p>
                    </div>
                  </Card>
                </button>
              ))
            ) : (
              <div className="col-span-full flex items-center gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
                <svg
                  className="h-5 w-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="font-medium">
                  Kamu belum membuat Flashcard!
                </span>
              </div>
            )}
          </div>
        </div>

        <div>
          <SectionTitle
            title="Folder"
            titleColor="text-green-600"
            subtitle="kamu ada disini!"
          />
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {folderListData && folderListData.length > 0 ? (
              folderListData.map((item) => (
                <button
                  key={item?.id}
                  className="group w-full text-left"
                  type="button"
                  aria-label="folder-button"
                  onClick={() => handleFolderClick(item?.id, item?.title)}
                >
                  <Card className="h-full w-full border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-200 hover:border-green-400 hover:from-green-50 hover:to-emerald-50 hover:shadow-lg group-hover:scale-105">
                    <div className="flex flex-col gap-2 p-3 sm:p-4">
                      <p className="text-3xl sm:text-4xl">📁</p>
                      <p className="line-clamp-2 text-sm font-bold text-gray-800 sm:text-base">
                        {item?.title}
                      </p>
                      <p className="line-clamp-1 text-xs text-gray-500">
                        {item?.description}
                      </p>
                    </div>
                  </Card>
                </button>
              ))
            ) : (
              <div className="col-span-full flex items-center gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
                <svg
                  className="h-5 w-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="font-medium">Kamu belum membuat Folder!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
