/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */

'use client';

import { Image } from '@nextui-org/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { TbArrowsSort } from 'react-icons/tb';
import { TfiMore } from 'react-icons/tfi';

import type {
  CreatePlayResponseType,
  CreatePlayType,
} from '@/app/api/Play/model';
import { useCreatePlay } from '@/app/api/Play/service';
import { getFlashcardsByFolderId, getFolderById } from '@/lib/data/mockData';

const Page = () => {
  const params = useParams();
  const slugId = Number(params.folderId);
  const slugTitle = params.folderTitle.toString().replace(/-/g, ' ');

  const route = useRouter();

  // Use mock data
  const folderData = getFolderById(slugId);
  const folderFlashcardListData = getFlashcardsByFolderId(slugId);

  const { mutate } = useCreatePlay();

  const handleStart = async (flashcardId: number) => {
    const payload: CreatePlayType = {
      flashcardId: Number(flashcardId),
    };
    mutate(payload, {
      onSuccess: (data: CreatePlayResponseType) => {
        route.push(`/app/flashcard/${flashcardId}/${data.play.id}`);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-4 pb-24 sm:px-6 sm:py-6">
        <Link href=".." className="mb-4 inline-block sm:mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition-colors hover:bg-gray-100">
            <IoIosArrowBack className="text-xl text-gray-700" />
          </div>
        </Link>

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 sm:h-32 sm:w-32">
              <Image
                src="/assets/app/folder/id/question.png"
                width={120}
                height={120}
                alt=" "
                className="h-20 w-20 sm:h-28 sm:w-28"
              />
            </div>
            <h1 className="line-clamp-2 text-center text-xl font-bold text-gray-800 sm:text-2xl md:text-3xl">
              {slugTitle}
            </h1>
            {folderData && (
              <p className="text-center text-sm text-gray-600">
                {folderData.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
              Flashcards ({folderFlashcardListData.length})
            </h2>
          </div>
          <div className="flex flex-col gap-2 sm:gap-3">
            {folderFlashcardListData && folderFlashcardListData.length > 0 ? (
              folderFlashcardListData.map((flashcard) => (
                <button
                  key={flashcard.id}
                  type="button"
                  onClick={() => handleStart(flashcard.id)}
                  className="group w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-left transition-all duration-200 hover:border-brand-base hover:shadow-md sm:px-5 sm:py-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <p className="line-clamp-2 text-sm font-bold text-gray-800 transition-colors group-hover:text-brand-base sm:text-base">
                        {flashcard.title}
                      </p>
                      <p className="line-clamp-1 text-xs text-gray-500 sm:text-sm">
                        {flashcard.description}
                      </p>
                    </div>
                    <TfiMore className="mt-1 flex-shrink-0 text-lg text-gray-400 transition-colors group-hover:text-brand-base" />
                  </div>
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
                  Tidak ada flashcard di folder ini!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
