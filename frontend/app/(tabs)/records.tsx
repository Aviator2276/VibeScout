import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { AdaptiveSafeArea } from '@/components/adaptive-safe-area';

export default function RecordsScreen() {
  return (
    <AdaptiveSafeArea>
      <Center className="h-full">
        <Heading size='3xl'>Records</Heading>
        <Text className="p-4">View your scouting records</Text>
      </Center>
    </AdaptiveSafeArea>
  );
}
