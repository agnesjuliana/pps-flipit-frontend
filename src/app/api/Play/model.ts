import { z } from 'zod';

import { FlashcardItemSchema } from '../Flashcard/model';

// Existing schemas and types
export const CreatePlayResultSchema = z.object({
  flashcardItemId: z.number({
    required_error: 'FlashcardItemId is required',
  }),
  playId: z.number({
    required_error: 'PlayId is required',
  }),
  isTrue: z.boolean({
    required_error: 'isTrue is required',
  }),
});

export type CreatePlayResultType = z.infer<typeof CreatePlayResultSchema>;

export const CreatePlaySchema = z.object({
  flashcardId: z.number({
    required_error: 'FlashcardId is required',
  }),
});

export type CreatePlayType = z.infer<typeof CreatePlaySchema>;

export const PlayResponseSchema = z.object({
  id: z.number(),
  flashcardId: z.number(),
  datePlay: z.string(),
  streakId: z.number(),
  wrong: z.number(),
  right: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreatePlayResponseSchema = z.object({
  play: PlayResponseSchema,
  flashcardItems: z.array(FlashcardItemSchema),
});

export type CreatePlayResponseType = z.infer<typeof CreatePlayResponseSchema>;
