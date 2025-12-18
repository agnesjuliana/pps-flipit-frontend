'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

import type { LoginUserType } from './model';

const baseUrl = process.env.BASE_URL;
const login = async (credentials: LoginUserType) => {
  try {
    console.log('[LOGIN] Attempting login to:', `${baseUrl}/auth/login`);
    console.log('[LOGIN] Credentials:', { email: credentials.email });
    
    return await axios
      .post(`${baseUrl}/auth/login`, credentials)
      .then(async (res) => {
        console.log('[LOGIN] Success, response:', res.data);
        const cookieStore = await cookies();
        cookieStore.set('token', res.data.data.token);
        cookieStore.set('name', res.data.data.nama);
        return res.data.data;
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error('[LOGIN] Error details:', {
      message: e.message,
      response: e.response?.data,
      status: e.response?.status,
      code: e.code,
    });
    const errorMessage =
      e.response?.data?.message || e.message || 'An error occurred';
    throw new Error(errorMessage);
  }
};

export default login;
