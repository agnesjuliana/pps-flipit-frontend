/* eslint-disable no-console */
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import login from './action';
import type { CreateUserType, LoginUserType } from './model';

const baseUrl = process.env.BASE_URL;

// --- HELPER: Auth Header ---
const getAuthHeaders = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
  }
  return {};
};

// --- 1. FETCHER: Get Me (Real-time User Data) ---
const fetchMe = async () => {
  const response = await axios.get(`${baseUrl}/auth/me`, {
    headers: getAuthHeaders(),
  });
  // Mengembalikan full response (biasanya { code: 200, data: { ... } })
  return response.data;
};

// --- 2. API CALL: Update Profile ---
export const updateProfile = async ({
  name,
  educationLevel,
}: {
  name: string;
  educationLevel: string;
}) => {
  const response = await axios.put(
    `${baseUrl}/auth/profile`,
    { name, educationLevel },
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};

// --- 3. API CALL: Registration ---
const registration = async (
  credentials: Omit<CreateUserType, 'confirm_password'>
): Promise<unknown> => {
  console.log('Registration request payload:', credentials);
  const response = await axios.post(`${baseUrl}/auth/register`, credentials);
  return response.data.data;
};

// ==========================================
// REACT QUERY HOOKS
// ==========================================

// [NEW] Hook untuk ambil data user terbaru
export const useGetMe = () => {
  return useQuery({
    queryKey: ['me'], // Key unik untuk cache data user
    queryFn: fetchMe,
    retry: 1, // Jangan retry terus menerus jika token expired
  });
};

// [NEW] Hook untuk Update Profile + Auto Refresh Data
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      console.log('Update success:', data);
      // INI KUNCINYA: Hapus cache 'me' agar aplikasi mengambil data baru
      queryClient.invalidateQueries({ queryKey: ['me'] });

      // Opsional: Update localStorage juga agar sinkron jika ada komponen legacy yang pakai
      if (typeof window !== 'undefined' && data?.data) {
        localStorage.setItem('user', JSON.stringify(data.data));
      }
    },
    onError: (error: any) => {
      console.error('Update profile error:', error);
    },
  });
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

// --- LEGACY / TYPES ---

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
