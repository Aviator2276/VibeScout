import React from 'react';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOrientation, isLandscape as checkLandscape } from '@/hooks/use-orientation';

interface AdaptiveSafeAreaProps extends ViewProps {
  children: React.ReactNode;
}

export function AdaptiveSafeArea({ children, style, ...props }: AdaptiveSafeAreaProps) {
  const orientation = useOrientation();
  const insets = useSafeAreaInsets();
  const isLandscapeMode = checkLandscape(orientation);
  
  // In landscape-right (counterclockwise rotation), tab bar is on the right
  // In landscape-left (clockwise rotation), tab bar is on the left
  const isOnRight = orientation === 'landscape-right';
  const tabBarWidth = 70;

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: isLandscapeMode ? insets.bottom : 0,
          paddingLeft: isLandscapeMode ? (isOnRight ? insets.left : tabBarWidth) : insets.left,
          paddingRight: isLandscapeMode ? (isOnRight ? tabBarWidth : insets.right) : insets.right,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
