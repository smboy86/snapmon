import { Session } from '@supabase/supabase-js';
import { isEmpty } from 'lodash';
import { useContext, createContext, type PropsWithChildren, useEffect, useState } from 'react';
import { useStorageState } from '~/hooks/useStorageState';
import { supabase } from '~/utils/supabase';

const AuthContext = createContext<{
  session?: Session | null;
  isLoading: boolean;
  isLogin: boolean;
}>({
  isLoading: false,
  session: null,
  isLogin: false,
});

// This hook can be used to access the user info.
export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAuth must be wrapped in a <AuthProvider />');
    }
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  // TODO - 왜 isLoading 가 ture 였다가 false로 되는지 이해 필요
  const [[isLoading, session], setSession] = useStorageState('session');
  const [isLogin, setIsLogin] = useState(false); // 로그인 제어용

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLogin(!isEmpty(session));
      setSession(JSON.stringify(session));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // console.log('로그인 이벤트 onAuthStateChange :: ', _event);
      if (_event === 'SIGNED_IN') {
      } else if (_event === 'SIGNED_OUT') {
      }

      setIsLogin(!isEmpty(session));
      setSession(JSON.stringify(session));
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        session: session ? JSON.parse(session) : null,
        isLogin, // useStorage string 'null'로 형변횐 되서 들어온다.. ㅅ
        // isLogin: isEmpty(session), // useStorage string 'null'로 형변횐 되서 들어온다.. ㅅ
        // isLogin: true, // useStorage string 'null'로 형변횐 되서 들어온다.. ㅅ
      }}>
      {children}
    </AuthContext.Provider>
  );
}
