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
import { PiPencilSimpleLine } from 'react-icons/pi';
import { TbArrowsSort } from 'react-icons/tb';
import { TfiMore } from 'react-icons/tfi';

import { useFolderFlashcard } from '@/app/api/Folder/services';
import type {
  CreatePlayResponseType,
  CreatePlayType,
} from '@/app/api/Play/model';
import { useCreatePlay } from '@/app/api/Play/service';

const Page = () => {
  const router = useParams();
  const slugId = router.folderId;
  const slugTitle = router.folderTitle.toString().replace(/-/g, ' ');

  const route = useRouter();

  const {
    data: folderFlashcardListData,
    isLoading: isFolderFlashcardLoading,
    isError: isFolderFlashcardError,
    error: folderFlashcardError,
  } = useFolderFlashcard(Number(slugId));

  const { mutate, isError, error: errMessage, isPending } = useCreatePlay();

  const handleStart = async (flashcardId: number) => {
    const payload: CreatePlayType = {
      flashcardId: Number(flashcardId), // Replace with the actual flashcardId you want to use
    };
    mutate(payload, {
      onSuccess: (data: CreatePlayResponseType) => {
        route.push(`/app/flashcard/${flashcardId}/${data.play.id}`);
      },
    });
  };

  if (isFolderFlashcardLoading) return <div>Loading...</div>;
  if (isFolderFlashcardError)
    return <div>Error: {folderFlashcardError.message}</div>;

  return (
    <div className="flex flex-col px-5 pt-4">
      <Link href="..">
        <IoIosArrowBack className="text-2xl" />
      </Link>
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-1">
          {/* Pathfile/Source Id here */}
          <Image
            src="/assets/app/folder/id/question.png"
            width={120}
            height={120}
            alt=" "
          />
          {/* Title Here */}
          <h1 className="text-lg font-bold leading-7">{slugTitle}</h1>
          <Link href="/" className="flex items-center gap-[6px] text-primary">
            Ubah Folder
            <PiPencilSimpleLine className="text-[18px]" />
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          {/* Short Buttons */}
          <div className="flex cursor-pointer items-center gap-2 self-end text-primary">
            Urutkan
            <TbArrowsSort className="text-[18px]" />
          </div>
          <div className="flex flex-col gap-2">
            {folderFlashcardListData?.map((flashcard) => (
              <button
                key={flashcard.id}
                type="button"
                onClick={() => handleStart(flashcard.id)}
                className="rounded-[7px] border px-3 py-3.5 text-left"
              >
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold">{flashcard.title}</p>
                    <p className="text-xs">{flashcard.description}</p>
                  </div>
                  <TfiMore />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
