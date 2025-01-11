import { View } from 'react-native';
import { Text } from '~/components/ui/text';

type Props = {
  content: string[];
};

export function ComponentSimple(props: Props) {
  const { content = '' } = props;
  return (
    <View className='flex h-28 items-center justify-end'>
      <Text className='mb-1 text-[#767676]'>하이!, 컴포넌트 {content}</Text>
    </View>
  );
}
