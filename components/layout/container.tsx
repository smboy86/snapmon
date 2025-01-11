import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';
import { ViewRef } from '@rn-primitives/types';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type ContainerProps = {
  main?: boolean; // main bottom 일때 하단 그라데이션 제어
  gray?: boolean; // background 설정
} & React.ComponentPropsWithoutRef<typeof View>;

const Container = React.forwardRef<ViewRef, ContainerProps>(
  ({ children, className, main = false, gray = false, ...props }, ref) => {
    return (
      <SafeAreaProvider>
        <SafeAreaView className={cn('relative flex flex-1')}>
          <View
            className={cn('flex h-full flex-col items-center', main && 'bg-[#ffffff]', className)}
            ref={ref}
            {...props}>
            {children}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  },
);
Container.displayName = 'Container';

export { Container };
export type { ContainerProps };
