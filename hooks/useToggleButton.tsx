import * as React from 'react';

///////
import type { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
export interface ISButtonProps {
  visible?: boolean;
  onPress?: () => void;
}

const SButton: React.FC<PropsWithChildren<ISButtonProps>> = (props) => {
  const { children, visible = true, onPress } = props;

  if (!visible) return <></>;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            marginTop: 20,
            backgroundColor: '#26292E',
            borderRadius: 50,
            paddingHorizontal: 20,
            padding: 10,
          }}>
          <Text style={{ color: 'white' }}>{children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

/////

export function useToggleButton(opts: { defaultValue: boolean; buttonTitle: string }) {
  const { buttonTitle, defaultValue = false } = opts;
  const [status, setStatus] = React.useState(defaultValue);

  const button = React.useMemo(() => {
    return (
      <SButton onPress={() => setStatus(!status)}>
        {buttonTitle}: {`${status}`}
      </SButton>
    );
  }, [status, buttonTitle]);

  return {
    status,
    button,
  };
}
