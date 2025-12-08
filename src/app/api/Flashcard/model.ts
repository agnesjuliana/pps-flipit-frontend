import { z } from 'zod';

export const FlashcardItemSchema = z.object({
  id: z.number(),
  flashcardId: z.number(),
  question: z.string(),
  answer: z.string(),
  imageQuestion: z.string().nullable(),
  imageAnswer: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const FileObject = z.object({
  path: z.string(),
  lastModified: z.number(),
  lastModifiedDate: z.date(),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  webkitRelativePath: z.string(),
});

export const CreateFlashcardSchema = z.object({
  title: z
    .string({ required_error: 'Title harus diisi' })
    .nonempty({ message: 'Title tidak boleh kosong' }),
  description: z
    .string({ required_error: 'Deskripsi harus diisi' })
    .nonempty({ message: 'Deskripsi tidak boleh kosong' }),
  folderId: z.string(),
  file: z.array(FileObject),
});

export type CreateFlashcardType = z.infer<typeof CreateFlashcardSchema>;

export interface Flashcard {
  question: string;
  answer: string;
}

export interface GenerateData {
  flashcards: Flashcard[];
  path: string;
  sourceId: string;
  title: string;
  description: string;
  folderId: string;
}

export interface SaveFlashcard {
  title: string | undefined;
  description: string | undefined;
  folderId: number | undefined;
  sourceId: string | undefined;
  path: string | undefined;
  flashcards: Flashcard[] | undefined;
}
