'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

import type { SaveFlashcard } from './model';

const baseUrl = process.env.BASE_URL;

const generateFlashcard = async (formData: FormData) => {
  try {
    const token = cookies().get('token')?.value;
    const response = await axios.post(
      `${baseUrl}/flashcard/generate`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        'An error occurred while generating the flashcard'
    );
  }
};

export default generateFlashcard;

export const saveFlashcard = async (flashcardData: SaveFlashcard) => {
  try {
    const token = cookies().get('token')?.value;
    const response = await axios.post(`${baseUrl}/flashcard`, flashcardData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || 'An error occurred while creating the folder'
    );
  }
};
//
