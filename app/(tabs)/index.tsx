import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { Svg, Circle, Text as SvgText, Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');
const rem = width / 12;

export default function HomeScreen() {
  const circleRadius = rem * 5; // 원의 반지름
  const strokeWidth = rem * 0.5; // 원의 테두리 두께
  const waveHeight = rem * 0.5; // 물결의 높이
  const waveCount = 10; // 물결의 개수

  // 원 둘레를 따라서 물결을 그리기 위한 path 생성
  const wavePath = (cx: number, cy: number, radius: number, waveHeight: number, waveCount: number) => {
    let path = '';
    const angleStep = (2 * Math.PI) / waveCount; // 한 물결의 각도 크기

    for (let i = 0; i <= waveCount; i++) {
      const angle = i * angleStep;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      const controlPointX = cx + (radius + waveHeight) * Math.cos(angle + angleStep / 2);
      const controlPointY = cy + (radius + waveHeight) * Math.sin(angle + angleStep / 2);

      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += `Q ${controlPointX} ${controlPointY} ${x} ${y}`;
      }
    }

    return path;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <Text style={styles.containerTitle}>Today's Goals</Text>
        <ThemedView style={styles.gridContainer}>
          <View style={styles.goalContainer}>
            <Svg
              width={circleRadius * 2 + strokeWidth * 2}
              height={circleRadius * 2 + strokeWidth * 2}
              viewBox={`0 0 ${circleRadius * 2 + strokeWidth * 2} ${circleRadius * 2 + strokeWidth * 2}`}
            >
              {/* 물결 무늬 추가 */}
              <Path
                d={wavePath(circleRadius + strokeWidth, circleRadius + strokeWidth, circleRadius, waveHeight, waveCount)}
                stroke={Colors.light.purple.darkActive}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 원 그리기 */}
              <Circle
                cx={circleRadius + strokeWidth}
                cy={circleRadius + strokeWidth}
                r={circleRadius}
                stroke={Colors.light.purple.darkActive}
                strokeWidth={strokeWidth}
                fill="none"
              />

              {/* 원 안에 텍스트 추가 */}
              <SvgText
                x={circleRadius + strokeWidth}
                y={circleRadius + strokeWidth}
                fontSize={rem * 1.5}
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
                fill={Colors.light.purple.darkActive}
              >
                Goal
              </SvgText>
            </Svg>
          </View>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: rem,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rem,
  },
  goalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.purple.lightActive,
    borderRadius: rem * 0.5,
    padding: rem,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rem * 0.33 },
    shadowOpacity: 0.1,
    shadowRadius: rem * 0.5,
    elevation: 5,
    height: rem * 10,
    width: rem * 10,
  },
  containerTitle: {
    fontSize: rem * 1,
    marginBottom: rem * 0.5,
    color: '#333',
    backgroundColor: "#FFF",
  },
});