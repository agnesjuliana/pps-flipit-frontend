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
