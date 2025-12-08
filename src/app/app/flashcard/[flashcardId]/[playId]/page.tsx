/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */

'use client';

import { Button } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from 'react-icons/io';

import { useFlashcardQuestion } from '@/app/api/Flashcard/services';
import type {
  CreatePlayResponseType,
  CreatePlayResultType,
} from '@/app/api/Play/model';
import { useCreatePlayResult, useFinishPlay } from '@/app/api/Play/service';
import { cn } from '@/lib/styles/utils';

import classes from './page.module.css';

const Page = () => {
  const router = useParams();
  const flashcardId = router.flashcardId.toString();
  const playId = router.playId.toString();
  const route = useRouter();

  const [isFliped, setIsFliped] = useState(false);
  const [position, setPosition] = useState(0);
  const [progress, setProgress] = useState(0);
  const {
    data: flashcardQuestionListData,
    isLoading: isFlashcardQuestionLoading,
    isError: isFlashcardQuestionError,
    error: flashcardQuestionError,
  } = useFlashcardQuestion(Number(flashcardId));

  const calculateWidth = () => {
    const total = flashcardQuestionListData?.length ?? 0;
    setProgress(((position + 1) / (total ?? 0)) * 100);
  };

  useEffect(() => {
    calculateWidth();
  }, [position, flashcardQuestionListData]);

  const {
    mutate,
    isError,
    error: errMessage,
    isPending,
  } = useCreatePlayResult();

  const {
    mutate: mutateFinish,
    isError: isFinishError,
    error: finishErrMessage,
    isPending: finishIsPending,
  } = useFinishPlay();

  const handleFalse = () => {
    const payload: CreatePlayResultType = {
      flashcardItemId: flashcardQuestionListData?.[position]?.id ?? 0,
      playId: Number(playId),
      isTrue: false,
    };

    mutate(payload, {
      onSuccess: (data: CreatePlayResponseType) => {
        setPosition((prev) => prev + 1);
        setIsFliped(!isFliped);
        calculateWidth();
      },
    });

    if (position === (flashcardQuestionListData?.length ?? 0) - 1) {
      mutateFinish(Number(playId), {
        onSuccess: (data: CreatePlayResponseType) => {
          route.push(`/app/flashcard/${flashcardId}/${playId}/result`);
        },
      });
    }
  };

  const handleTrue = () => {
    const payload: CreatePlayResultType = {
      flashcardItemId: flashcardQuestionListData?.[position]?.id ?? 0,
      playId: Number(playId),
      isTrue: true,
    };

    mutate(payload, {
      onSuccess: (data: CreatePlayResponseType) => {
        setPosition((prev) => prev + 1);
        setIsFliped(!isFliped);
        calculateWidth();
      },
    });

    if (position === (flashcardQuestionListData?.length ?? 0) - 1) {
      mutateFinish(Number(playId), {
        onSuccess: (data: CreatePlayResponseType) => {
          route.push(`/app/flashcard/${flashcardId}/${playId}/result`);
        },
      });
    }
  };

  const handleNext = () => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    if (position === (flashcardQuestionListData?.length ?? 0) - 1) {
      mutateFinish(Number(playId), {
        onSuccess: (data: CreatePlayResponseType) => {
          route.push(`/app/flashcard/${flashcardId}/${playId}/result`);
        },
      });
    } else {
      setPosition((prev) => prev + 1);
      setIsFliped(false);
      calculateWidth();
    }
  };

  const handlePrev = () => {
    if (position === 0) return;
    setPosition((prev) => prev - 1);
    setIsFliped(false);
    calculateWidth();
  };

  return (
    <div>
      <div className="flex w-full flex-col gap-8 px-5 pt-5">
        {/* Progress Bar */}
        <div className="flex w-full items-center gap-2">
          {/* <Link href="/"> */}
          <IoMdClose className="text-2xl" />
          {/* </Link> */}
          <div className="relative h-3 w-full rounded-[20px] bg-[#D9D9D9]">
            <div
              className={cn('absolute h-full rounded-[20px] bg-[#6699CC]')}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {/* End Of Progress Bar */}

        {/* Button Next and Prev */}
        <div className="flex justify-between">
          <Button
            color="danger"
            size="sm"
            variant="solid"
            startContent={<IoIosArrowBack />}
            className="flex gap-2 rounded-lg bg-[#FF1F1F] p-2 text-white"
            onClick={() => {
              handlePrev();
            }}
          />
          <Button
            color="danger"
            size="sm"
            variant="solid"
            endContent={<IoIosArrowForward />}
            className="flex gap-2 rounded-lg bg-[#72C287] p-2 text-white"
            onClick={() => {
              handleNext();
            }}
          />
        </div>
        {/* eslint-disable-next-line sonarjs/no-all-duplicated-branches, sonarjs/no-all-duplicated-branches */}
        {!isFliped ? (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className={cn(classes.card, classes.cardUnFlip)}
            onClick={() => {
              setIsFliped(!isFliped);
            }}
          >
            <p className="text-xl font-medium leading-7">
              {flashcardQuestionListData?.[position]?.question ?? ''}
            </p>
          </div>
        ) : (
          <>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
              className={cn(classes.card, classes.cardFliped)}
              onClick={() => {
                setIsFliped(!isFliped);
              }}
            >
              <ul className="ml-5 flex list-disc flex-col text-start">
                <p className="text-xl font-medium leading-7">
                  {flashcardQuestionListData?.[position]?.answer ?? ''}
                </p>
              </ul>
            </div>
            <div className="mt-[30%] flex justify-between">
              <Button
                color="danger"
                size="sm"
                variant="solid"
                startContent={<IoIosArrowBack />}
                className="flex gap-2 rounded-lg bg-[#FF1F1F] p-2 text-white"
                onClick={() => {
                  handleFalse();
                }}
              />
              <div className="flex flex-col items-center">
                <p className="text-sm font-bold text-[#FF1F1F]">
                  Klik Kiri jika <b>Belum Paham</b> 😥
                </p>
                <p className="text-sm font-bold text-[#72C287]">
                  Klik Kanan jika <b>Sudah Paham</b> 🤩
                </p>
              </div>
              <Button
                color="danger"
                size="sm"
                variant="solid"
                startContent={<IoIosArrowForward />}
                className="flex gap-2 rounded-lg bg-[#72C287] p-2 text-white"
                onClick={() => {
                  handleTrue();
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
