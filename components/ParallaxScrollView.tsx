import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

type Props = PropsWithChildren<{}>;

export default function SimpleView({ children }: Props) {
  return (
    <ThemedView style={styles.container}>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});