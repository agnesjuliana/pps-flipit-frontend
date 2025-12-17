'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

import type { LoginUserType } from './model';

const baseUrl = process.env.BASE_URL;
const login = async (credentials: LoginUserType) => {
  try {
    return await axios
      .post(`${baseUrl}/auth/login`, credentials)
      .then(async (res) => {
        const cookieStore = await cookies();
        cookieStore.set('token', res.data.data.token);
        cookieStore.set('name', res.data.data.nama);
        return res.data.data;
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const errorMessage =
      e.response?.data?.message || e.message || 'An error occurred';
    throw new Error(errorMessage);
  }
};

export default login;
