import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { AdaptiveSafeArea } from '@/components/adaptive-safe-area';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { MatchCard } from '@/components/match-card';
import { Match } from '@/types/match';
import { getMatches } from '@/api/matches';
import { Center } from '@/components/ui/center';
import { HStack } from '@/components/ui/hstack';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import { getCompetitionCode } from '@/utils/storage';

export default function MatchesScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [competitionCode, setCompetitionCode] = useState<string>('');

  useEffect(() => {
    loadMatches();
    loadCompetitionCode();
  }, []);

  async function loadCompetitionCode() {
    try {
      const code = await getCompetitionCode();
      setCompetitionCode(code || 'N/A');
    } catch (error) {
      console.error('Failed to load competition code:', error);
      setCompetitionCode('N/A');
    }
  }

  async function loadMatches() {
    try {
      setLoading(true);
      const data = await getMatches();
      setMatches(data);
    } catch (error) {
      console.error('Failed to load matches:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleScout(match: Match) {
    // TODO: Navigate to scouting screen with match data
    console.log('Scouting match:', match.id);
  }

  return (
    <AdaptiveSafeArea>
      <Box className="p-4">
        <HStack className="flex justify-between">
          <Heading size="3xl" className="pb-2">Matches</Heading>
          <Badge size="lg" variant='solid' action="info">
            <BadgeText>{competitionCode}</BadgeText>
          </Badge>
        </HStack>
        
        {loading ? (
          <Center className="h-full">
            <ActivityIndicator size="large" />
          </Center>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {matches.length === 0 ? (
              <Text className="text-center text-typography-500 mt-8">
                No matches available
              </Text>
            ) : (
              matches.map((match) => (
                <MatchCard key={match.id} match={match} onScout={handleScout} />
              ))
            )}
          </ScrollView>
        )}
      </Box>
    </AdaptiveSafeArea>
  );
}
