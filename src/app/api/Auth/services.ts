/* eslint-disable no-console */
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import login from './action';
import type { CreateUserType, LoginUserType } from './model';

const baseUrl = process.env.BASE_URL;

export const updateProfile = async ({
  name,
  educationLevel,
}: {
  name: string;
  educationLevel: string;
}) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  if (!token) throw new Error('Token tidak ditemukan');
  const response = await axios.put(
    `${baseUrl}/auth/profile`,
    { name, educationLevel },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

const registration = async (
  credentials: Omit<CreateUserType, 'confirm_password'>
): Promise<unknown> => {
  console.log('Registration request payload:', credentials);
  console.log('BASE_URL:', baseUrl);
  const response = await axios.post(`${baseUrl}/auth/register`, credentials);
  return response.data.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginUserType) => login(credentials),
    onError: (error: Error) => {
      console.error(error);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: Omit<CreateUserType, 'confirm_password'>) =>
      registration(payload),
    onError: (error: any) => {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
    },
  });
};

export interface User {
  user_id: number;
  nama: string;
  email: string;
  role: string;
  dateOfBirth: string;
  educationLevel: string;
}

interface UserData {
  user_id: number;
  nama: string;
  email: string;
  role: string;
  educationLevel: string;
}

export const useUserData = (): UserData => {
  const defaultUser: UserData = {
    user_id: 0,
    nama: 'User',
    email: '',
    role: '',
    educationLevel: '',
  };

  if (typeof window !== 'undefined') {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        return JSON.parse(userString);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }

  return defaultUser;
};
