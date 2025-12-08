import {
  useMutation,
  useQuery,
  type QueryFunctionContext,
} from '@tanstack/react-query';

import type { FlashcardItem } from '../Flashcard/services';

import createFolder from './action';
import type { CreateFolderType } from './model';

// Define the type for folder list items
interface FolderItem {
  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

// Fetching API function using react-query
let accessToken = '';
if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('token') || '';
}
const baseUrl = process.env.BASE_URL;

const folderQueryOptions = {
  queryKey: ['folder'],
  queryFn: async ({ signal }: QueryFunctionContext): Promise<FolderItem[]> => {
    const response = await fetch(`${baseUrl}/folder`, {
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

const folderFlashcardQuery = (folderId: number) => ({
  queryKey: ['folderFlashcard', folderId],
  queryFn: async ({
    signal,
  }: QueryFunctionContext): Promise<FlashcardItem[]> => {
    const response = await fetch(`${baseUrl}/folder/${folderId}/flashcards`, {
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
});

export const useFolderList = () => {
  return useQuery(folderQueryOptions);
};

export const useFolderFlashcard = (folderId: number) => {
  return useQuery(folderFlashcardQuery(folderId));
};
export const useCreateFolder = () => {
  return useMutation({
    mutationFn: (payload: CreateFolderType) => createFolder(payload),
    onError: (error: Error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    },
  });
};
