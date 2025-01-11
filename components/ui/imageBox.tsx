import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';
import { ViewRef } from '@rn-primitives/types';
import { Image, ImageProps } from 'expo-image';

interface ImageBoxProps extends ImageProps {
  className: string;
  type?: 'default' | 'btn';
}

const defaultUri = require('~/assets/app/logo.png'); // local

const ImageBox = React.forwardRef<ViewRef, ImageBoxProps>(
  ({ className, type = 'defalut', source = defaultUri }, ref) => {
    // 기본적으로 height 풀
    // 피그마에서 가로 길이를 계산해서 className 에 넣어 그린다. w-[28.8%]
    return (
      <View className={cn('flex h-full w-full', className)} ref={ref}>
        <Image
          style={{ flex: 1 }}
          source={source}
          contentFit='contain' // default
          transition={150}
        />
      </View>
    );
  },
);
ImageBox.displayName = 'ImageBox';

export { ImageBox };
export type { ImageBoxProps };
