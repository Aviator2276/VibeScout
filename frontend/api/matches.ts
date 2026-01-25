import { Match } from '@/types/match';
import { apiRequest } from '@/utils/api';
import { db } from '@/utils/db';

export class NoCompetitionCodeError extends Error {
  constructor() {
    super('No competition code set');
    this.name = 'NoCompetitionCodeError';
  }
}

/**
 * Cache matches from API to IndexedDB.
 * Should be called once during app initialization or manually to refresh data.
 * @returns The cached matches
 */
export async function cacheMatches(): Promise<Match[]> {
  const competitionCode = (await db.config.get({ key: 'compCode' }))?.value;

  if (!competitionCode) {
    throw new NoCompetitionCodeError();
  }

  try {
    const matches = await apiRequest<Match[]>(
      `/api/competitions/${competitionCode}/matches`,
    );

    // Clear existing matches for this competition and store new ones
    await db.matches.where('competition.code').equals(competitionCode).delete();
    await db.matches.bulkPut(matches);

    return matches;
  } catch (error) {
    console.error('Failed to cache matches:', error);
    throw error;
  }
}

/**
 * Get matches from IndexedDB cache.
 * @returns Cached matches for the current competition
 */
export async function getMatches(): Promise<Match[]> {
  const competitionCode = (await db.config.get({ key: 'compCode' }))?.value;

  if (!competitionCode) {
    throw new NoCompetitionCodeError();
  }

  try {
    const matches = await db.matches
      .where('competition.code')
      .equals(competitionCode)
      .toArray();

    return matches;
  } catch (error) {
    console.error('Failed to get matches from cache:', error);
    throw error;
  }
}
