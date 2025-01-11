import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';
import { Database } from '~/types/database.types';

const supabaseUrl = 'https://ejltwptnbyvhxfkadery.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqbHR3cHRuYnl2aHhma2FkZXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxODk2MTgsImV4cCI6MjA1MDc2NTYxOH0.h91ucYakV55ueIft8XWJgojxDFYfH93_7wKdZ3sETZ0';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // storage: AsyncStorage,
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
