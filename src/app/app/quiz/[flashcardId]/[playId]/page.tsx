'use client';

import { ArrowLeft, Check, X, Trophy, Target } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useFlashcardQuestion } from '@/app/api/Flashcard/services';
import { createPlayResult, finishPlay } from '@/app/api/Play/action';
import type { CreatePlayResultType } from '@/app/api/Play/model';
import { Card } from '@/lib/components/Card';
import { cn } from '@/lib/styles/utils';

export default function QuizInteractivePage() {
  const params = useParams();
  const router = useRouter();
  const flashcardId = Number(params.flashcardId);
  const playId = Number(params.playId);

  const {
    data: flashcardItems,
    isLoading,
    isError,
  } = useFlashcardQuestion(flashcardId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [answers, setAnswers] = useState<Map<number, boolean>>(new Map());
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-blue-50">
        <div className="text-center">
          <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-brand-base border-t-transparent"></div>
          <p className="text-lg text-gray-600">Memuat quiz...</p>
        </div>
      </div>
    );
  }

  if (isError || !flashcardItems || flashcardItems.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="max-w-md p-8 text-center">
          <X className="mx-auto mb-4 h-16 w-16 text-red-500" />
          <h2 className="mb-2 text-2xl font-bold">Quiz Tidak Tersedia</h2>
          <p className="mb-4 text-gray-600">
            Tidak ada soal dalam flashcard ini.
          </p>
          <Link
            href="/app/home"
            className="inline-block rounded-lg bg-brand-base px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Kembali ke Home
          </Link>
        </Card>
      </div>
    );
  }

  const currentItem = flashcardItems[currentIndex];
  const progress = ((currentIndex + 1) / flashcardItems.length) * 100;
  const correctAnswers = Array.from(answers.values()).filter((v) => v).length;
  const wrongAnswers = answers.size - correctAnswers;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = async (isCorrect: boolean) => {
    setAnswers((prev) => new Map(prev).set(currentItem.id, isCorrect));

    // Submit answer to backend
    try {
      const payload: CreatePlayResultType = {
        playId,
        flashcardItemId: currentItem.id,
        isTrue: isCorrect,
      };
      await createPlayResult(payload);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }

    // Move to next or finish
    if (currentIndex < flashcardItems.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsFlipped(false);
      }, 600);
    } else {
      setTimeout(async () => {
        setIsSubmitting(true);
        try {
          await finishPlay(playId);
          setShowResult(true);
        } catch (error) {
          console.error('Error finishing play:', error);
        } finally {
          setIsSubmitting(false);
        }
      }, 600);
    }
  };

  if (showResult) {
    const score = Math.round((correctAnswers / flashcardItems.length) * 100);
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-blue-50 p-6">
        <Card className="w-full max-w-md overflow-hidden p-0 shadow-2xl">
          <div className="bg-gradient-to-r from-brand-600 to-brand-800 p-8 text-center text-white">
            <Trophy className="mx-auto mb-4 h-24 w-24" />
            <h1 className="mb-2 text-3xl font-extrabold">Quiz Selesai!</h1>
            <p className="text-brand-100">Hasil kamu sudah tersimpan 🎉</p>
          </div>

          <div className="p-8">
            <div className="mb-6 text-center">
              <div className="mb-2 text-6xl font-extrabold text-brand-600">
                {score}%
              </div>
              <p className="text-gray-600">Skor Kamu</p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-green-50 p-4 text-center">
                <div className="mb-1 flex items-center justify-center gap-2 text-green-600">
                  <Check className="h-5 w-5" />
                  <span className="text-3xl font-bold">{correctAnswers}</span>
                </div>
                <p className="text-sm text-gray-600">Benar</p>
              </div>

              <div className="rounded-xl bg-red-50 p-4 text-center">
                <div className="mb-1 flex items-center justify-center gap-2 text-red-600">
                  <X className="h-5 w-5" />
                  <span className="text-3xl font-bold">{wrongAnswers}</span>
                </div>
                <p className="text-sm text-gray-600">Salah</p>
              </div>
            </div>

            <div className="mb-6 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Soal:</span>
                <span className="font-bold">{flashcardItems.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Waktu:</span>
                <span className="font-bold">{formatTime(timer)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/app/home"
                className="rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-center font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Kembali
              </Link>
              <button
                onClick={() =>
                  router.push(`/app/flashcard/${flashcardId}/${playId}/result`)
                }
                className="rounded-lg bg-brand-base px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Lihat Detail
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-blue-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-800 px-6 py-6 text-white shadow-lg">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/app/home"
            className="mb-4 inline-flex items-center gap-2 text-brand-100 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Keluar Quiz
          </Link>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-brand-100">Pertanyaan</p>
              <p className="text-2xl font-bold">
                {currentIndex + 1} / {flashcardItems.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-brand-100">Waktu</p>
              <p className="text-2xl font-bold">{formatTime(timer)}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-3 overflow-hidden rounded-full bg-brand-900">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="perspective-1000">
          <div
            className={cn(
              'relative h-96 w-full transition-transform duration-700',
              isFlipped && 'rotate-y-180'
            )}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front - Question */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
              }}
            >
              <Card className="flex h-full flex-col items-center justify-center border-4 border-brand-200 bg-white p-8 shadow-2xl">
                <div className="mb-4 rounded-full bg-brand-100 p-4">
                  <Target className="h-12 w-12 text-brand-600" />
                </div>
                <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
                  {currentItem.question}
                </h2>
                <button
                  onClick={() => setIsFlipped(true)}
                  className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  Lihat Jawaban
                </button>
              </Card>
            </div>

            {/* Back - Answer */}
            <div
              className="rotate-y-180 absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
              }}
            >
              <Card className="flex h-full flex-col items-center justify-center border-4 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-2xl">
                <div className="mb-4 rounded-full bg-blue-100 p-4">
                  <Check className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="mb-4 text-center text-2xl font-bold text-gray-800">
                  {currentItem.answer}
                </h3>

                <p className="mb-8 text-center text-lg text-gray-600">
                  Apakah jawaban kamu benar?
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleAnswer(false)}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-red-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50"
                  >
                    <X className="h-6 w-6" />
                    Salah
                  </button>
                  <button
                    onClick={() => handleAnswer(true)}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50"
                  >
                    <Check className="h-6 w-6" />
                    Benar
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Score Tracker */}
        <div className="mt-8 flex justify-center gap-4">
          <div className="rounded-xl bg-white px-6 py-3 shadow-lg">
            <div className="flex items-center gap-2 text-green-600">
              <Check className="h-5 w-5" />
              <span className="text-xl font-bold">{correctAnswers}</span>
            </div>
          </div>
          <div className="rounded-xl bg-white px-6 py-3 shadow-lg">
            <div className="flex items-center gap-2 text-red-600">
              <X className="h-5 w-5" />
              <span className="text-xl font-bold">{wrongAnswers}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
