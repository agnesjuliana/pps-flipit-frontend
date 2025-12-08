import { useMutation } from '@tanstack/react-query';

import { createPlay, createPlayResult, finishPlay } from './action';
import type {
  CreatePlayResponseType,
  CreatePlayResultType,
  CreatePlayType,
} from './model';

export const useCreatePlay = () => {
  // eslint-disable-next-line no-console
  return useMutation<CreatePlayResponseType, Error, CreatePlayType>({
    mutationFn: (payload: CreatePlayType) => createPlay(payload),
    onError: (error: Error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    },
  });
};

export const useCreatePlayResult = () => {
  return useMutation({
    mutationFn: (payload: CreatePlayResultType) => createPlayResult(payload),
    onError: (error: Error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    },
  });
};

export const useFinishPlay = () => {
  return useMutation({
    mutationFn: (playId: number) => finishPlay(playId),
    onError: (error: Error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    },
  });
};
