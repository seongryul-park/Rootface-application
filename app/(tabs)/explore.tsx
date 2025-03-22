import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Platform, Button, View } from 'react-native';
import * as Location from 'expo-location';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const [tracking, setTracking] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Location permission not granted');
      return;
    }

    setTracking(true);
    const id = setInterval(async () => {
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    }, 1000); // 1초마다 업데이트
    setIntervalId(id);
  };

  const stopTracking = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTracking(false);
  };

  return (
    <ParallaxScrollView>

      {/* GPS 트래킹 버튼 */}
      <View style={styles.buttonContainer}>
        <Button title={tracking ? 'Stop Tracking' : 'Start Tracking'} onPress={tracking ? stopTracking : startTracking} />
        {location && (
          <ThemedText>
            Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
          </ThemedText>
        )}
      </View>
      
      {/* 기존 Collapsible 섹션들 */}
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
});