import React from 'react';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Match } from '@/types/match';

interface MatchCardProps {
  match: Match;
  onScout: (match: Match) => void;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function getMatchLabel(match: Match): string {
  const typeAbbrev: Record<string, string> = {
    Qualification: 'Qual',
    Quarterfinal: 'QF',
    Semifinal: 'SF',
    Final: 'Final',
    Practice: 'Practice',
  };
  return `${typeAbbrev[match.matchType] || match.matchType} #${match.matchNumber}`;
}

export function MatchCard({ match, onScout }: MatchCardProps) {
  return (
    <Card variant="outline" size="md" className="mb-3 p-4">
      <VStack space="sm">
        {/* Top row: Match title, time, and Scout button */}
        <HStack className="items-center justify-between">
          <HStack space="md" className="items-center flex-1">
            <Text className="text-lg font-bold text-typography-900">
              {getMatchLabel(match)}
            </Text>
            <Text size="sm" className="text-typography-500">
              {formatTime(match.startTime)}
            </Text>
          </HStack>
          <Button size="sm" action="primary" onPress={() => onScout(match)}>
            <ButtonText>Scout</ButtonText>
          </Button>
        </HStack>

        {/* Bottom row: Team numbers */}
        <HStack space="sm">
          {match.redAlliance.map((team, index) => (
            <Text
              key={`red-${index}`}
              className="text-red-600 font-medium"
            >
              {team}
            </Text>
          ))}
          {match.blueAlliance.map((team, index) => (
            <Text
              key={`blue-${index}`}
              className="text-blue-600 font-medium"
            >
              {team}
            </Text>
          ))}
        </HStack>
      </VStack>
    </Card>
  );
}
