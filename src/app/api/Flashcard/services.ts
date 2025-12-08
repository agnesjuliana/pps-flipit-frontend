import {
  useMutation,
  useQuery,
  type QueryFunctionContext,
} from '@tanstack/react-query';

import generateFlashcard, { saveFlashcard } from './action';
import type { SaveFlashcard } from './model';

// Define the type for flashcard list items
export interface FlashcardItem {
  id: number;
  folderId: number;
  userId: number;
  title: string;
  description: string;
  pathFile: string;
  sourceId: string;
  createdAt: string;
  updatedAt: string;
}

// Fetching API function using react-query
let accessToken = '';
if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('token') || '';
}
const baseUrl = process.env.BASE_URL;

const flashcardQueryOptions = {
  queryKey: ['flashcard'],
  queryFn: async ({
    signal,
  }: QueryFunctionContext): Promise<FlashcardItem[]> => {
    const response = await fetch(`${baseUrl}/flashcard`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      signal: signal as AbortSignal, // Explicitly type the signal
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    return responseData.data; // Extract the data property
  },
};

export const useFlashcardList = () => {
  return useQuery(flashcardQueryOptions);
};

interface FlashcardQuestions {
  id: number;
  flashcardId: number;
  question: string;
  answer: string;
  imageQuestion: string | null;
  imageAnswer: string | null;
  createdAt: string;
  updatedAt: string;
}

const flashcardQuestionQueryOption = (flashcardId: number) => ({
  queryKey: ['flashcardQuestion', flashcardId],
  queryFn: async ({
    signal,
  }: QueryFunctionContext): Promise<FlashcardQuestions[]> => {
    const response = await fetch(`${baseUrl}/flashcard/${flashcardId}/items`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      signal: signal as AbortSignal,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    return responseData.data;
  },
});

export const useFlashcardQuestion = (flashcardId: number) => {
  return useQuery(flashcardQuestionQueryOption(flashcardId));
};

export const useCreateFlashcard = () => {
  return useMutation({
    mutationFn: (formData: FormData) => generateFlashcard(formData),
    onError: (error: Error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    },
  });
};

export const useSaveFlashcard = () => {
  return useMutation({
    mutationFn: (payload: SaveFlashcard) => saveFlashcard(payload),
    onError: (error: Error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    },
  });
};
