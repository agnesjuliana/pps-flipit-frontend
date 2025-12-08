import { useQuery, type QueryFunctionContext } from '@tanstack/react-query';

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
}

// Fetching API function using react-query
let accessToken = '';
if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('token') || '';
}
const baseUrl = process.env.BASE_URL;

const weeklyStreakQueryOptions = {
  queryKey: ['weeklyStreak'],
  queryFn: async ({
    signal,
  }: QueryFunctionContext): Promise<WeeklyStreakResponse> => {
    const response = await fetch(`${baseUrl}/streak/weekly`, {
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
    const response = await fetch(`${baseUrl}/streak/monthly`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      signal: signal as AbortSignal, // Explicitly type the signal
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    return responseData.data; // Extract the data property
  },
};

export const useMonthlyStreak = () => {
  return useQuery(monthlyStreakQueryOptions);
};
