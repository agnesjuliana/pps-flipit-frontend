/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from 'react-icons/io';
import { useQueryClient } from '@tanstack/react-query';

import type {
  CreatePlayResponseType,
  CreatePlayResultType,
} from '@/app/api/Play/model';
import { useCreatePlayResult, useFinishPlay } from '@/app/api/Play/service';
import { getFlashcardById } from '@/lib/data/mockData';
import { cn } from '@/lib/styles/utils';

import classes from './page.module.css';

const Page = () => {
  const params = useParams();
  const flashcardId = params.flashcardId.toString();
  const playId = params.playId.toString();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isFliped, setIsFliped] = useState(false);
  const [position, setPosition] = useState(0);
  const [progress, setProgress] = useState<number>(0);

  // Use mock data
  const flashcardData = getFlashcardById(Number(flashcardId));
  const flashcardQuestionListData = flashcardData?.items || [];

  const calculateWidth = () => {
    const total = flashcardQuestionListData.length;
    setProgress(((position + 1) / total) * 100);
  };

  useEffect(() => {
    calculateWidth();
  }, [position]);

  const { mutate } = useCreatePlayResult();
  const { mutate: mutateFinish } = useFinishPlay();

  const handleFalse = () => {
    const payload: CreatePlayResultType = {
      flashcardItemId: flashcardQuestionListData[position]?.id ?? 0,
      playId: Number(playId),
      isTrue: false,
    };

    const isLastCard = position === flashcardQuestionListData.length - 1;

    mutate(payload, {
      onSuccess: (response) => {
        const data = response.data;
        if (isLastCard) {
          mutateFinish(Number(playId), {
            onSuccess: (response) => {
              const finishData = response.data;
              // UPDATE DISINI: Redirect ke interval-menu
              router.push(
                `/app/flashcard/${flashcardId}/${playId}/interval-menu`
              );
            },
          });
        } else {
          setPosition((prev) => prev + 1);
          setIsFliped(!isFliped);
          calculateWidth();
        }
      },
    });
  };

  const handleTrue = () => {
    const payload: CreatePlayResultType = {
      flashcardItemId: flashcardQuestionListData[position]?.id ?? 0,
      playId: Number(playId),
      isTrue: true,
    };

    const isLastCard = position === flashcardQuestionListData.length - 1;

    mutate(payload, {
      onSuccess: (response) => {
        const data = response.data;
        if (isLastCard) {
          mutateFinish(Number(playId), {
            onSuccess: (response) => {
              const finishData = response.data;
              queryClient.invalidateQueries({ queryKey: ['weeklyStreak'] });
              queryClient.invalidateQueries({ queryKey: ['monthlyStreak'] });

              router.push(
                `/app/flashcard/${flashcardId}/${playId}/interval-menu`
              );
            },
          });
        } else {
          setPosition((prev) => prev + 1);
          setIsFliped(!isFliped);
          calculateWidth();
        }
      },
    });
  };

  const handleNext = () => {
    // Prevent going beyond the last card
    if (position >= flashcardQuestionListData.length - 1) {
      return;
    }

    setPosition((prev) => prev + 1);
    setIsFliped(false);
    calculateWidth();
  };

  const handlePrev = () => {
    if (position === 0) return;
    setPosition((prev) => prev - 1);
    setIsFliped(false);
    calculateWidth();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 pb-24 pt-4 sm:gap-6 sm:px-6 sm:pt-6">
        {/* Progress Bar */}
        <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm sm:p-4">
          <button
            onClick={() => router.push('/app/home')}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100 transition-colors hover:bg-gray-200 sm:h-10 sm:w-10"
            aria-label="Close"
          >
            <IoMdClose className="text-lg text-gray-700 sm:text-xl" />
          </button>
          <div className="relative h-2.5 w-full rounded-full bg-gray-200 sm:h-3">
            <div
              className={cn(
                'absolute h-full rounded-full bg-gradient-to-r from-brand-base to-blue-600 transition-all duration-300'
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="min-w-[3rem] flex-shrink-0 text-right text-xs font-semibold text-gray-700 sm:text-sm">
            {position + 1}/{flashcardQuestionListData.length}
          </p>
        </div>
        {/* End Of Progress Bar */}

        {/* Button Next and Prev */}
        <div className="flex justify-between gap-3">
          <button
            onClick={() => handlePrev()}
            disabled={position === 0}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500 text-white shadow-md transition-all hover:bg-red-600 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 sm:h-12 sm:w-12"
            aria-label="Previous"
          >
            <IoIosArrowBack className="text-lg sm:text-xl" />
          </button>
          <button
            onClick={() => handleNext()}
            disabled={position >= flashcardQuestionListData.length - 1}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500 text-white shadow-md transition-all hover:bg-green-600 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 sm:h-12 sm:w-12"
            aria-label="Next"
          >
            <IoIosArrowForward className="text-lg sm:text-xl" />
          </button>
        </div>

        {!isFliped ? (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className={cn(
              classes.card,
              classes.cardUnFlip,
              'min-h-[280px] cursor-pointer transition-transform hover:scale-[1.02] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]'
            )}
            onClick={() => {
              setIsFliped(!isFliped);
            }}
          >
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-medium text-brand-base sm:mb-4">
                Pertanyaan
              </p>
              <p className="text-lg font-semibold leading-relaxed text-gray-800 sm:text-xl md:text-2xl">
                {flashcardQuestionListData[position]?.question ?? ''}
              </p>
              <p className="mt-4 text-xs text-gray-500 sm:mt-6 sm:text-sm">
                Klik untuk melihat jawaban
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
              className={cn(
                classes.card,
                classes.cardFliped,
                'min-h-[280px] cursor-pointer transition-transform hover:scale-[1.02] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]'
              )}
              onClick={() => {
                setIsFliped(!isFliped);
              }}
            >
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-medium text-gray-600 sm:mb-4">
                  Jawaban
                </p>
                <p className="text-lg font-semibold leading-relaxed text-gray-800 sm:text-xl md:text-2xl">
                  {flashcardQuestionListData[position]?.answer ?? ''}
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
                <button
                  onClick={() => handleFalse()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-red-600 hover:shadow-lg active:scale-95 sm:w-auto"
                >
                  <IoIosArrowBack className="text-lg" />
                  <span>Belum Paham 😥</span>
                </button>
                <div className="hidden h-12 w-px bg-gray-200 sm:block" />
                <button
                  onClick={() => handleTrue()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-600 hover:shadow-lg active:scale-95 sm:w-auto"
                >
                  <span>Sudah Paham 🤩</span>
                  <IoIosArrowForward className="text-lg" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
