import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { AdaptiveSafeArea } from '@/components/adaptive-safe-area';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { MatchCard } from '@/components/match-card';
import { Match } from '@/types/match';
import { getMatches } from '@/api/matches';
import { Center } from '@/components/ui/center';
import { HStack } from '@/components/ui/hstack';
import { Badge, BadgeText, BadgeIcon } from '@/components/ui/badge';

export default function MatchesScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

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
      <View className="p-4">
        <HStack className="flex justify-between">
          <Heading size='3xl' className="pb-2">Matches</Heading>
          <Badge size="lg" variant='solid' action="info">
            <BadgeText>COMPCODE</BadgeText>
            <BadgeIcon className="ml-2" />
          </Badge>
        </HStack>
        
        {loading ? (
          <Center className="h-full">
            <ActivityIndicator size="large" />
          </Center>
        ) : (
          <FlatList
            data={matches}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MatchCard match={item} onScout={handleScout} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <Text className="text-center text-typography-500 mt-8">
                No matches available
              </Text>
            }
          />
        )}
      </View>
    </AdaptiveSafeArea>
  );
}
