'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

import type { CreateFolderType } from './model';

const baseUrl = process.env.BASE_URL;

const createFolder = async (folderData: CreateFolderType) => {
  try {
    const token = cookies().get('token')?.value;
    const response = await axios.post(`${baseUrl}/folder`, folderData, {
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

export default createFolder;
