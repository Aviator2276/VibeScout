import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <Center className="flex-1 p-4">
        <Heading className="font-bold text-2xl">Home</Heading>
        <Text className="p-4 text-center">Welcome to VibeScout</Text>
      </Center>
    </SafeAreaView>
  );
}