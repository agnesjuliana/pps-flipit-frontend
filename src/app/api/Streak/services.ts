import { useQuery, type QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

// Define the type for weekly streak data
interface WeeklyStreak {
  day: string;
  isStreak: boolean;
}

// Define the type for weekly streak response data
interface WeeklyStreakResponse {
  streakTotal: number;
  flashcardTotal: number;
  streakWeek: WeeklyStreak[];
  weekData: Array<{
    day: string;
    attempts: number;
    correctAnswers: number;
  }>;
}

// Fetching API function using react-query
let accessToken = '';
if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('token') || '';
}
const baseUrl = process.env.BASE_URL;

const getAuthHeaders = () => {
  // Cek apakah kode berjalan di browser (Client Side)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return {};
};

const fetchCurrentStreak = async () => {
  const response = await axios.get(`${baseUrl}/streak/current`, {
    headers: getAuthHeaders(), // <--- Tambahkan Header disini
  });
  return response.data;
};

const fetchWeeklyStreak = async () => {
  const response = await axios.get(`${baseUrl}/quiz/weekly`, {
    headers: getAuthHeaders(), // <--- Tambahkan Header disini
  });
  return response.data;
};

const fetchMonthlyStreak = async () => {
  // Endpoint: {baseUrl}/quiz/monthly
  const response = await axios.get(`${baseUrl}/quiz/monthly`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const useCurrentStreak = () => {
  return useQuery({
    queryKey: ['streakCurrent'],
    queryFn: fetchCurrentStreak,
  });
};

export const useWeeklyStreakV2 = () => {
  return useQuery({
    queryKey: ['streakWeekly'],
    queryFn: fetchWeeklyStreak,
  });
};

export const useMonthlyStreakV2 = () => {
  return useQuery({
    queryKey: ['streakMonthly'],
    queryFn: fetchMonthlyStreak,
  });
};

const weeklyStreakQueryOptions = {
  queryKey: ['weeklyStreak'],
  queryFn: async ({
    signal,
  }: QueryFunctionContext): Promise<WeeklyStreakResponse> => {
    const response = await fetch(`${baseUrl}/quiz/weekly`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      signal: signal as AbortSignal,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    return responseData.data;
  },
};

export const useWeeklyStreak = () => {
  return useQuery(weeklyStreakQueryOptions);
};

// Define the type for monthly streak data
interface MonthlyStreakData {
  streakTotal: number;
  todayPlayTotal: number;
  flashcardTotal: number;
  streakMonth: { day: number; isStreak: boolean }[];
}

if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('token') || '';
}

const monthlyStreakQueryOptions = {
  queryKey: ['monthlyStreak'],
  queryFn: async ({
    signal,
  }: QueryFunctionContext): Promise<MonthlyStreakData> => {
    const response = await fetch(`${baseUrl}/quiz/monthly`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      signal: signal as AbortSignal, // Explicitly type the signal
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    const data = responseData.data;

    // Ensure default values for missing properties
    return {
      streakTotal: data.streakTotal || 0,
      todayPlayTotal: data.todayPlayTotal || 0,
      flashcardTotal: data.flashcardTotal || 0,
      streakMonth: data.streakMonth || [],
    };
  },
};

export const useMonthlyStreak = () => {
  return useQuery(monthlyStreakQueryOptions);
};
