'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

import {
  CreatePlayResponseSchema,
  type CreatePlayResultType,
  type CreatePlayType,
} from './model';

const baseUrl = process.env.BASE_URL;

export const createPlay = async (playData: CreatePlayType) => {
  try {
    const token = cookies().get('token')?.value;
    const response = await axios.post(`${baseUrl}/play`, playData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return CreatePlayResponseSchema.parse(response.data.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || 'An error occurred while creating the play'
    );
  }
};

export const createPlayResult = async (
  playResultData: CreatePlayResultType
) => {
  try {
    const token = cookies().get('token')?.value;
    const response = await axios.post(
      `${baseUrl}/play/${playResultData.playId}/result`,
      playResultData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message ||
        'An error occurred while creating the play result'
    );
  }
};

export const finishPlay = async (playId: number) => {
  try {
    const token = cookies().get('token')?.value;
    const response = await axios.post(
      `${baseUrl}/play/${playId}/finish`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || 'An error occurred while finishing the play'
    );
  }
};
