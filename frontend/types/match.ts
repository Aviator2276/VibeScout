export type MatchType = 'Qualification' | 'Quarterfinal' | 'Semifinal' | 'Final' | 'Practice';

export interface Match {
  id: string;
  matchType: MatchType;
  matchNumber: number;
  startTime: Date;
  redAlliance: [number, number, number];
  blueAlliance: [number, number, number];
}
