import { Text } from 'react-native';
import { Stack } from 'expo-router';
import { useAuth } from '~/providers/AuthProvider';

export default function Layout() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
