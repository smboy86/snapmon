import { useCallback, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions, Pressable } from 'react-native';
import useTestList from '~/api/useTestList';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Text } from '~/components/ui/text';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button } from '~/components/ui/button';
import Carousel, { TAnimationStyle } from 'react-native-reanimated-carousel';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useToggleButton } from '~/hooks/useToggleButton';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SlideItem } from '~/components/swiper/SlideItem';

const window = Dimensions.get('screen');
const PAGE_WIDTH = window.width;
const DATA = ['공부', '챌린지', '인증', '식사', '...'];

interface Props {
  animationValue: SharedValue<number>;
  label: string;
  onPress?: () => void;
}
///// ITem
const Item: React.FC<{
  index: number;
  animationValue: Animated.SharedValue<number>;
}> = ({ index }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log(index);
      }}
      containerStyle={{ flex: 1 }}
      style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          justifyContent: 'center',
          overflow: 'hidden',
          alignItems: 'center',
        }}>
        <View style={{ width: '100%', height: '100%' }}>
          <SlideItem index={index} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function Screen() {
  // const { data, isLoading, refetch } = useTestList({});
  // @ts-ignore: just being lazy with types here
  const cameraRef = useRef<CameraView>(undefined);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [pictureSizes, setPictureSizes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState(undefined);
  ///
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const itemSize = PAGE_WIDTH / 2;
  const centerOffset = PAGE_WIDTH / 2 - itemSize / 2;

  const dataLength = 18;

  const sideItemCount = 3;
  const sideItemWidth = (PAGE_WIDTH - itemSize) / (2 * sideItemCount);

  const animationStyle: TAnimationStyle = useCallback(
    (value: number) => {
      'worklet';

      const itemOffsetInput = new Array(sideItemCount * 2 + 1)
        .fill(null)
        .map((_, index) => index - sideItemCount);

      const itemOffset = interpolate(
        value,
        // e.g. [0,1,2,3,4,5,6] -> [-3,-2,-1,0,1,2,3]
        itemOffsetInput,
        itemOffsetInput.map((item) => {
          if (item < 0) {
            return (-itemSize + sideItemWidth) * Math.abs(item);
          }

          if (item > 0) {
            return (itemSize - sideItemWidth) * (Math.abs(item) - 1);
          }

          return 0;
        }) as number[],
      );

      const translate = interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) + centerOffset - itemOffset;

      const width = interpolate(
        value,
        [-1, 0, 1],
        [sideItemWidth, itemSize, sideItemWidth],
        Extrapolation.CLAMP,
      );

      return {
        transform: [
          {
            translateX: translate,
          },
        ],
        width,
        overflow: 'hidden',
      };
    },
    [centerOffset, itemSize, sideItemWidth, sideItemCount],
  );

  useEffect(() => {
    async function getSizes() {
      console.log('hi!');
      console.log(permission);
      if (permission?.granted && cameraRef.current) {
        console.log('sized!');
        const sizes = await cameraRef.current.getAvailablePictureSizesAsync();
        setPictureSizes(sizes);
        console.log(sizes);
      }
    }

    getSizes();
  }, [permission, cameraRef]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>
          <Text>grant permission</Text>
        </Button>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: '#000' }} className=''>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef} pictureSize={selectedSize}>
          <Text>.</Text>
        </CameraView>
      </View>
      <View className='px-4'>
        <View className='w-full'>
          <View className='pb-2'>
            <Text className='text-lg font-bold'>태그</Text>
          </View>
          <Carousel
            loop={false}
            autoPlay={false}
            width={PAGE_WIDTH}
            defaultIndex={1}
            height={50}
            data={DATA}
            mode='parallax'
            modeConfig={{
              parallaxScrollingOffset: 220,
              parallaxScrollingScale: 1,
              parallaxAdjacentItemScale: 1,
            }}
            renderItem={({ item, index }) => (
              <View className='items-center justify-center rounded-md'>
                <Text className='text-black'>{item}</Text>
              </View>
            )}></Carousel>
        </View>
      </View>
      <View className='h-52 px-4'>
        <View className='w-full py-10'>
          <View className='pb-2'>
            <Text className='text-lg font-bold'>스킨</Text>
          </View>
          <Carousel
            loop={false}
            autoPlay={false}
            width={PAGE_WIDTH}
            defaultIndex={0}
            height={200}
            data={DATA}
            mode='parallax'
            modeConfig={{
              parallaxScrollingOffset: 220,
              parallaxScrollingScale: 1,
              parallaxAdjacentItemScale: 1,
            }}
            renderItem={({ index }) => (
              <View className='h-24 w-24 items-center justify-center bg-black'>
                <Text className='text-white'>{index.toString()}</Text>
              </View>
            )}></Carousel>
        </View>
      </View>
      <View className='mt-10 h-24 items-center justify-center'>
        <Pressable
          className='h-24 w-24 items-center justify-center rounded-full border border-gray-600 bg-slate-500'
          onPress={async () => {
            const photo = await cameraRef.current?.takePictureAsync();
            alert(`photo captured with dimensions: ${photo!.width} x ${photo!.height}`);
            console.log(JSON.stringify(photo));
          }}></Pressable>
        <View style={{ height: 1, backgroundColor: '#eee', marginVertical: 20 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
