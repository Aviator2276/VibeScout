import { Match } from '@/types/match';
import { apiRequest } from '@/config/api';

export async function getMatches(): Promise<Match[]> {
  try {
    return await apiRequest<Match[]>('/api/matches');
  } catch (error) {
    console.error('Failed to fetch matches:', error);
    throw error;
  }
}