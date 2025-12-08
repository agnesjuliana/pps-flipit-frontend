'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

import type { LoginUserType } from './model';

const baseUrl = process.env.BASE_URL;
const login = async (credentials: LoginUserType) => {
  try {
    return await axios
      .post(`${baseUrl}/auth/login`, credentials)
      .then((res) => {
        cookies().set('token', res.data.data.token);
        cookies().set('name', res.data.data.nama);
        return res.data.data;
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
};

export default login;
