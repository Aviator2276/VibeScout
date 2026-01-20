import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScoutingScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <Center className="flex-1 p-4">
        <Heading className="font-bold text-2xl">Scouting</Heading>
        <Text className="p-4 text-center">Scout teams and players</Text>
      </Center>
    </SafeAreaView>
  );
}
