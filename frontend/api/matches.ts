import { Match } from '@/types/match';

const DUMMY_MATCHES: Match[] = [
  {
    id: '1',
    matchType: 'Qualification',
    matchNumber: 1,
    startTime: new Date('2026-01-20T09:00:00'),
    redAlliance: [254, 1678, 971],
    blueAlliance: [118, 2056, 3310],
  },
  {
    id: '2',
    matchType: 'Qualification',
    matchNumber: 2,
    startTime: new Date('2026-01-20T09:08:00'),
    redAlliance: [1114, 2910, 4414],
    blueAlliance: [5940, 6328, 7492],
  },
  {
    id: '3',
    matchType: 'Qualification',
    matchNumber: 3,
    startTime: new Date('2026-01-20T09:16:00'),
    redAlliance: [148, 1323, 2767],
    blueAlliance: [3478, 4911, 5172],
  },
  {
    id: '4',
    matchType: 'Qualification',
    matchNumber: 12,
    startTime: new Date('2026-01-20T10:24:00'),
    redAlliance: [987, 2468, 3579],
    blueAlliance: [1357, 4680, 2469],
  },
  {
    id: '5',
    matchType: 'Quarterfinal',
    matchNumber: 1,
    startTime: new Date('2026-01-20T14:00:00'),
    redAlliance: [254, 1678, 118],
    blueAlliance: [971, 2056, 3310],
  },
  {
    id: '6',
    matchType: 'Semifinal',
    matchNumber: 1,
    startTime: new Date('2026-01-20T15:30:00'),
    redAlliance: [254, 1114, 148],
    blueAlliance: [118, 2910, 1323],
  },
  {
    id: '7',
    matchType: 'Final',
    matchNumber: 1,
    startTime: new Date('2026-01-20T16:30:00'),
    redAlliance: [254, 1678, 971],
    blueAlliance: [118, 1114, 148],
  },
];

export async function getMatches(): Promise<Match[]> {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/matches');
  // return response.json();
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return DUMMY_MATCHES;
}

export async function getMatchById(id: string): Promise<Match | undefined> {
  // TODO: Replace with actual API call
  await new Promise((resolve) => setTimeout(resolve, 200));
  return DUMMY_MATCHES.find((match) => match.id === id);
}
