import * as React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '~/lib/utils';
import { ViewRef } from '@rn-primitives/types';
import { ImageBox } from '../ui/imageBox';
import { Text } from '../ui/text';
import { Button } from '../ui/button';

interface HeaderProps extends ViewProps {
  type?: 'default' | 'btn';
  actionBtnText?: string;
  onAction?: () => void;

  // TODO create rightBtn
}

const Header = React.forwardRef<ViewRef, HeaderProps>(
  ({ type = 'defalut', actionBtnText, onAction }, ref) => {
    return (
      <View
        className={cn(
          'flex h-14 w-full flex-row items-center px-5',
          type === 'default' ? 'justify-center' : 'justify-between',
        )}
        ref={ref}>
        <ImageBox className='w-[137px]' source={'icon_grab_new'} />
        {type !== 'default' && (
          <Button variant={'small'} size={'small'} onPress={onAction}>
            <Text>{actionBtnText}</Text>
          </Button>
        )}
      </View>
    );
  },
);
Header.displayName = 'Header';

export { Header };
export type { HeaderProps };
