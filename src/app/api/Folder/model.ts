import { z } from 'zod';

export const CreateFolderSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .nonempty({
      message: 'Title cannot be empty',
    }),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .nonempty({
      message: 'Description cannot be empty',
    }),
});

export type CreateFolderType = z.infer<typeof CreateFolderSchema>;
