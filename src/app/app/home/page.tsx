/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */

'use client';

import { Fab } from '@mui/material';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useUserData } from '@/app/api/Auth/services';
import { useFlashcardList } from '@/app/api/Flashcard/services';
import { useFolderList } from '@/app/api/Folder/services';
import type {
  CreatePlayResponseType,
  CreatePlayType,
} from '@/app/api/Play/model';
import { useCreatePlay } from '@/app/api/Play/service';
import { useWeeklyStreak } from '@/app/api/Streak/services';
import ModalCreate from '@/app/components/modalcreate';
import Book from '@/lib/assets/book-blue.svg';
import Fire from '@/lib/assets/fire.svg';
import HeaderEllipse from '@/lib/assets/header-ellipse.svg';
import Mascot from '@/lib/assets/home-asset-1.svg';
import { Card } from '@/lib/components/Card';
import { cn } from '@/lib/styles/utils';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useUserData();
  const route = useRouter();
  const {
    data: folderListData,
    isLoading: isFolderLoading,
    isError: isFolderError,
    error: folderError,
  } = useFolderList();
  const {
    data: flashcardListData,
    isLoading: isFlashcardLoading,
    isError: isFlashcardError,
    error: flashcardError,
  } = useFlashcardList();
  const {
    data: weeklyStreakData,
    isLoading: isWeeklyStreakLoading,
    isError: isWeeklyStreakError,
    error: weeklyStreakError,
  } = useWeeklyStreak();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate, isError, error: errMessage, isPending } = useCreatePlay();

  if (isFlashcardLoading) return <div>Loading...</div>;
  if (isFlashcardError) return <div>Error: {flashcardError.message}</div>;

  if (isFolderLoading) return <div>Loading...</div>;
  if (isFolderError) return <div>Error: {folderError.message}</div>;

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

  const handleFlashcardClick = async (flashcardId: number) => {
    const payload: CreatePlayType = {
      flashcardId: Number(flashcardId), // Replace with the actual flashcardId you want to use
    };
    mutate(payload, {
      onSuccess: (data: CreatePlayResponseType) => {
        route.push(`/app/flashcard/${flashcardId}/${data.play.id}`);
      },
    });
  };

  const handleFolderClick = async (folderId: number, folderTitle: string) => {
    const path = folderTitle.replace(/\s/g, '-');
    route.push(`/app/folder/${folderId}/${path}`);
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
      <div className="mt-2 flex items-baseline gap-1">
        <p
          className={cn(`text-[22px] font-bold ${titleColor ?? 'text-black'}`)}
        >
          {title}
        </p>
        <p>{subtitle}</p>
      </div>
    );
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
        className="text-left"
        type="button"
        aria-label="flashcard-button"
        onClick={() => handleFlashcardClick(flashcardId)}
      >
        <Card className="w-[200px] border-[#E4E4E7]">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold">{title}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
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
        className="text-left"
        type="button"
        aria-label="folder-button"
        onClick={() => handleFolderClick(folderId, title)}
      >
        <Card className="w-[170px] border-[#E4E4E7] bg-[#F9FAFB]">
          <div className="flex flex-col gap-1">
            <p className="text-4xl">📁</p>
            <p className="text-sm font-bold">{title}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </Card>
      </button>
    );
  };

  return (
    <div className="min-h-screen">
      <header className="items-center justify-between text-white">
        <div className="relative z-10">
          <div className="fixed left-1/2 flex h-11 w-full -translate-x-1/2 transform items-center justify-center">
            <HeaderEllipse
              style={{
                width: '430px',
                height: '430px',
                position: 'absolute',
                zIndex: '0',
              }}
            />
          </div>
          <div className="fixed left-1/2 top-4 flex h-11 w-full max-w-xs -translate-x-1/2 transform items-center justify-center gap-32 rounded-full bg-white p-4">
            <div className="flex items-center justify-center text-black">
              <Book style={{ width: '24px', height: '24px' }} />
              <p className="text-base font-medium">
                {weeklyStreakData?.flashcardTotal}
              </p>
            </div>
            <div className="flex items-center justify-center text-black">
              <Fire style={{ width: '24px', height: '24px' }} />
              <p className="text-base font-medium">
                {weeklyStreakData?.streakTotal}
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-col gap-3 p-6 pb-24 pt-24">
        <p className="text-4xl font-extrabold text-brand-base">
          Hi, {user.nama} 👋🏻
        </p>
        <Card>
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-sm">
              Yuk lanjutin <b>Streak Harian</b> kamu!
            </p>
            <Mascot style={{ height: '120px', width: '90px' }} />
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
        </Card>
        <SectionTitle
          title="Flash Cards"
          titleColor="text-yellow-500"
          subtitle="terbaru kamu!"
        />
        <div className="bg-base-black container flex gap-6 overflow-auto whitespace-nowrap">
          {flashcardListData && flashcardListData.length > 0 ? (
            flashcardListData.map((item) => (
              <FlashCardRecently
                key={item?.id}
                title={item?.title}
                subtitle={item?.description}
                flashcardId={item?.id}
              />
            ))
          ) : (
            <div
              className="mb-4 flex w-full items-center rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800"
              role="alert"
            >
              <svg
                className="me-3 inline h-4 w-4 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div className="w-full">
                <span className="font-medium">
                  Kamu belum membuat Flashcard!
                </span>
              </div>
            </div>
          )}
        </div>
        <SectionTitle
          title="Folder"
          titleColor="text-green-500"
          subtitle="kamu ada disini!"
        />
        <div className="bg-base-black container flex gap-6 overflow-auto whitespace-nowrap">
          {folderListData && folderListData.length > 0 ? (
            folderListData.map((item) => (
              <ClassFolderCard
                key={item?.id}
                title={item?.title}
                subtitle={item?.description} // Use description as subtitle
                folderId={item?.id}
              />
            ))
          ) : (
            <div
              className="mb-4 flex w-full items-center rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800"
              role="alert"
            >
              <svg
                className="me-3 inline h-4 w-4 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div className="w-full">
                <span className="font-medium">Kamu belum membuat Folder!</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="absolute bottom-28 right-4"
        onClick={() => setIsModalOpen(true)}
      >
        <Fab
          aria-label="add"
          color="info"
          className=" bg-brand-base text-white"
        >
          <Plus />
        </Fab>
      </div>
      <ModalCreate isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default Page;
