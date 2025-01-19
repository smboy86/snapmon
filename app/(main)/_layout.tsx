import { ActivityIndicator } from 'react-native';
import { SplashScreen, Tabs } from 'expo-router';
import { useAuth } from '~/providers/AuthProvider';
import { useCallback, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Layout() {
  const { isLoading } = useAuth();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        hideSplash();
      }, 100);
    }
  }, [hideSplash, isLoading]);

  if (isLoading) {
    return <ActivityIndicator size='large' color='blue' />;
  }

  return (
    <Tabs
      initialRouteName='index'
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerShown: false,
      }}>
      <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='home' color={color} />,
        }}
      />
      <Tabs.Screen
        name='index'
        options={{
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='camera' color={color} />,
        }}
      />
      <Tabs.Screen
        name='setting'
        options={{
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='user' color={color} />,
        }}
      />
    </Tabs>
  );
}
