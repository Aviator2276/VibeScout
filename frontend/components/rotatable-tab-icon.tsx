import React from 'react';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useOrientation } from '@/hooks/use-orientation';
import { Box } from './ui/box';

type IconSymbolName = 'house.fill' | 'sportscourt.fill' | 'doc.text.magnifyingglass' | 'list.bullet.clipboard.fill';

interface RotatableTabIconProps {
  name: IconSymbolName;
  color: string;
  size?: number;
}

export function RotatableTabIcon({ name, color, size = 28 }: RotatableTabIconProps) {
  const orientation = useOrientation();
  const rotation = orientation === 'landscape' ? '90deg' : '0deg';

  return (
    <Box style={{ transform: [{ rotate: rotation }] }}>
      <IconSymbol name={name} color={color} size={size} />
    </Box>
  );
}
