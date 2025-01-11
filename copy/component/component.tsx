import { ElementRef, forwardRef } from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '~/lib/utils';

interface ComponentProps extends ViewProps {
  type?: 'default' | 'btn';
  onAction?: () => void;
  // TODO create rightBtn
}

const Component = forwardRef<ElementRef<typeof View>, ComponentProps>(
  ({ type = 'defalut', onAction }, ref) => {
    return <View className={cn('borde flex h-14 w-full flex-row items-center px-5')} ref={ref}></View>;
  },
);
Component.displayName = 'Component';

export { Component };
export type { ComponentProps };
