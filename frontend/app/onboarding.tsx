import React, { useState, useEffect } from 'react';
import { setName, setCompetitionCode } from '@/utils/storage';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { useRouter } from 'expo-router';
import { Center } from '@/components/ui/center';
import { Input, InputField } from '@/components/ui/input';
import { FormControl } from '@/components/ui/form-control';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  SelectScrollView,
} from '@/components/ui/select';
import { Icon, ChevronDownIcon } from '@/components/ui/icon';
import { getCompetitions, Competition } from '@/api/competitions';

export default function OnboardingScreen() {
  const [isCompleting, setIsCompleting] = useState(false);
  const [name, setNameState] = useState('');
  const [competitionCode, setCompetitionCodeState] = useState('');
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loadingCompetitions, setLoadingCompetitions] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadCompetitions();
  }, []);

  async function loadCompetitions() {
    try {
      setLoadingCompetitions(true);
      const data = await getCompetitions();
      setCompetitions(data.filter(c => c.code));
    } catch (error) {
      console.error('Failed to load competitions:', error);
    } finally {
      setLoadingCompetitions(false);
    }
  }

  function parseCompetitionCode(code: string): string {
    const match = code.match(/^\d{4}(.+)$/);
    if (match && match[1]) {
      return match[1].toUpperCase();
    }
    return code.toUpperCase();
  }

  function extractYear(code: string): string | null {
    const match = code.match(/^(\d{4})/);
    return match ? match[1] : null;
  }

  async function handleComplete() {
    if (isCompleting) return;
    
    if (!name || !competitionCode) {
      return;
    }
    
    try {
      setIsCompleting(true);
      await setName(name);
      await setCompetitionCode(competitionCode);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Failed to save settings:', error);
      setIsCompleting(false);
    }
  }

  return (
    <Box className="flex-1 bg-background-0">
      <Center className="flex-1">
        <VStack className="flex-1 justify-between p-8 pt-20">
          <VStack space="xl">
            <Box>
              <Heading size="4xl" className="mb-4 text-typography-900">
                Welcome to VScout
              </Heading>
              <Text size="lg" className="text-typography-700 leading-relaxed">
                A comprehensive FRC scouting app. Track matches, analyze teams, and make data-driven decisions.
              </Text>
            </Box>

            <VStack space="md">
              <FormControl>
                <Text className="text-typography-900 font-medium mb-2">Name</Text>
                <Input size="lg">
                  <InputField
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setNameState}
                    autoCapitalize="words"
                  />
                </Input>
              </FormControl>

              <FormControl>
                <Text className="text-typography-900 font-medium mb-2">Competition</Text>
                <Select
                  selectedValue={competitionCode}
                  onValueChange={(value) => setCompetitionCodeState(value)}
                >
                  <SelectTrigger size="lg">
                    <SelectInput placeholder="Select competition" />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectScrollView>
                        {loadingCompetitions ? (
                          <SelectItem label="Loading..." value="" isDisabled />
                        ) : competitions.length === 0 ? (
                          <SelectItem label="No competitions available" value="" isDisabled />
                        ) : (
                          competitions.map((comp) => {
                            const year = extractYear(comp.code);
                            const code = parseCompetitionCode(comp.code);
                            const label = year 
                              ? `${code} (${year}) - ${comp.name}`
                              : `${code} - ${comp.name}`;
                            return (
                              <SelectItem
                                key={comp.code}
                                label={label}
                                value={comp.code}
                              />
                            );
                          })
                        )}
                      </SelectScrollView>
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </FormControl>
            </VStack>
          </VStack>

          <VStack space="lg" className="mb-8">
            <HStack space="sm" className="justify-center">
            </HStack>

            <VStack space="md">
              <Button 
                size="lg" 
                action="primary" 
                onPress={handleComplete}
                isDisabled={!name || !competitionCode || isCompleting}
              >
                <ButtonText>{isCompleting ? 'Setting up...' : 'Get Started'}</ButtonText>
              </Button>
            </VStack>
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
}
