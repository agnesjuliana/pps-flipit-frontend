'use server';

import { cookies } from 'next/headers';

import {
  CreatePlayResponseSchema,
  type CreatePlayResultType,
  type CreatePlayType,
} from './model';
import axios from 'axios';
const baseUrl = process.env.BASE_URL;

export const createPlay = async (playData: CreatePlayType) => {
  try {
    // Simulate a successful response with mock data
    const mockResponse = {
      play: {
        id: 1,
        playId: 123,
        flashcardId: playData.flashcardId,
        datePlay: new Date().toISOString(),
        streakId: 10,
        wrong: 2,
        right: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      flashcardItems: [
        {
          id: 1,
          flashcardId: playData.flashcardId,
          question: 'What is phishing?',
          answer: 'A type of cyber attack.',
          imageQuestion: 'https://example.com/question1.png',
          imageAnswer: 'https://example.com/answer1.png',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          flashcardId: playData.flashcardId,
          question: 'How to recognize phishing emails?',
          answer: 'Check for suspicious links and sender details.',
          imageQuestion: 'https://example.com/question2.png',
          imageAnswer: 'https://example.com/answer2.png',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    };

    return CreatePlayResponseSchema.parse(mockResponse);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.message || 'An error occurred while creating the play');
  }
};

export const createPlayResult = async (
  playResultData: CreatePlayResultType
) => {
  try {
    // Simulate a successful response with mock data
    const mockResponse = {
      playId: playResultData.playId,
      flashcardItemId: playResultData.flashcardItemId,
      isTrue: playResultData.isTrue,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log('Mock create play result response:', mockResponse);
    return { data: mockResponse };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error('Create play result error:', e);
    throw new Error(
      e.message || 'An error occurred while creating the play result'
    );
  }
};

export const finishPlay = async (playId: number) => {
  try {
    // Simulate a successful response with mock data
    const mockResponse = {
      playId,
      status: 'completed',
      finishedAt: new Date().toISOString(),
    };

    console.log('Mock finish play response:', mockResponse);
    return { data: mockResponse };
  } catch (e: any) {
    console.error('Finish play error:', e);
    throw new Error(e.message || 'An error occurred while finishing the play');
  }
};

export const finishQuiz = async (
  playId: number,
  totalQuestions: number,
  correctAnswers: number
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  try {
    const payload = {
      totalQuestions,
      correctAnswers,
    };

    console.log('[FINISH PLAY] Submitting:', payload);

    const res = await axios.post(`${baseUrl}/quiz/submit`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    console.error('[FINISH PLAY] Error:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Failed to finish quiz');
  }
};
