import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

// Helper Header Token
const getAuthHeaders = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) return { Authorization: `Bearer ${token}` };
  }
  return {};
};

// --- Tipe Data Response ---
export interface LeaderboardItem {
  rank: number;
  userId: number;
  userName: string;
  userEmail: string;
  educationLevel: string;
  activeStreak: number;
  longestStreak: number;
  startDate: string;
  endDate: string | null;
}

interface UserRankResponse {
  code: number;
  message: string;
  status: boolean;
  data: LeaderboardItem;
}

interface LeaderboardListResponse {
  code: number;
  message: string;
  status: boolean;
  data: LeaderboardItem[];
}

// --- Fetcher Functions ---

// 1. Get User Rank
const fetchUserRank = async () => {
  const response = await axios.get(`${BASE_URL}/leaderboard/user-rank`, {
    headers: getAuthHeaders(),
  });
  return response.data as UserRankResponse;
};

// 2. Get Leaderboard by Education Level
const fetchLeaderboardByEducation = async (level: string) => {
  // Mengirim parameter level, misal: ?level=Undergraduate
  const response = await axios.get(`${BASE_URL}/leaderboard/by-education`, {
    headers: getAuthHeaders(),
  });
  return response.data as LeaderboardListResponse;
};

export const useUserRank = () => {
  return useQuery({
    queryKey: ['leaderboardUserRank'],
    queryFn: fetchUserRank,
  });
};

export const useLeaderboardByEducation = (level: string) => {
  return useQuery({
    queryKey: ['leaderboardList', level],
    queryFn: () => fetchLeaderboardByEducation(level),
  });
};
