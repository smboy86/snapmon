// import { useCallback, useEffect, useRef, useState } from 'react';
// import { TouchableOpacity, View, StyleSheet, Dimensions, Pressable } from 'react-native';
// import useTestList from '~/api/useTestList';
// import { Wrap } from '~/components/layout/\bwrap';
// import { Container } from '~/components/layout/container';
// import { Header } from '~/components/layout/header';
// import { Text } from '~/components/ui/text';
// import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
// import { Button } from '~/components/ui/button';
// import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
// import Animated, {
//   Extrapolation,
//   interpolate,
//   interpolateColor,
//   SharedValue,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
// import { useToggleButton } from '~/hooks/useToggleButton';

// const PAGE_WIDTH = 60;
// const PAGE_HEIGHT = 40;
// const DATA = ['공부', '챌린지', '인증', '식사', '...'];

// const window = Dimensions.get('screen');
// interface Props {
//   animationValue: SharedValue<number>;
//   label: string;
//   onPress?: () => void;
// }
// ///// ITem
// const Item: React.FC<Props> = (props) => {
//   const { animationValue, label, onPress } = props;

//   const translateY = useSharedValue(0);

//   const containerStyle = useAnimatedStyle(() => {
//     const opacity = interpolate(animationValue.value, [-1, 0, 1], [0.5, 1, 0.5], Extrapolation.CLAMP);

//     return {
//       opacity,
//     };
//   }, [animationValue]);

//   const labelStyle = useAnimatedStyle(() => {
//     const scale = interpolate(animationValue.value, [-1, 0, 1], [1, 1.25, 1], Extrapolation.CLAMP);

//     const color = interpolateColor(animationValue.value, [-1, 0, 1], ['#b6bbc0', '#002a57', '#b6bbc0']);

//     return {
//       transform: [{ scale }, { translateY: translateY.value }],
//       color,
//     };
//   }, [animationValue, translateY]);

//   const onPressIn = useCallback(() => {
//     translateY.value = withTiming(-8, { duration: 250 });
//   }, [translateY]);

//   const onPressOut = useCallback(() => {
//     translateY.value = withTiming(0, { duration: 250 });
//   }, [translateY]);

//   return (
//     <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
//       <Animated.View
//         className='border border-black px-2'
//         style={[
//           {
//             width: 100,
//             height: '100%',
//             alignItems: 'center',
//             justifyContent: 'center',
//           },
//           containerStyle,
//         ]}>
//         <Animated.Text style={[{ fontSize: 18, color: '#26292E' }, labelStyle]}>{label}</Animated.Text>
//       </Animated.View>
//     </Pressable>
//   );
// };

// export default function Screen() {
//   // const { data, isLoading, refetch } = useTestList({});
//   // @ts-ignore: just being lazy with types here
//   const cameraRef = useRef<CameraView>(undefined);
//   const [facing, setFacing] = useState<CameraType>('back');
//   const [permission, requestPermission] = useCameraPermissions();
//   const [pictureSizes, setPictureSizes] = useState<string[]>([]);
//   const [selectedSize, setSelectedSize] = useState(undefined);

//   const r = useRef<ICarouselInstance>(null);
//   const AutoPLay = useToggleButton({
//     defaultValue: false,
//     buttonTitle: 'AutoPlay',
//   });
//   const [loop, setLoop] = useState(false);

//   useEffect(() => {
//     async function getSizes() {
//       console.log('hi!');
//       console.log(permission);
//       if (permission?.granted && cameraRef.current) {
//         console.log('sized!');
//         const sizes = await cameraRef.current.getAvailablePictureSizesAsync();
//         setPictureSizes(sizes);
//         console.log(sizes);
//       }
//     }

//     getSizes();
//   }, [permission, cameraRef]);

//   if (!permission) {
//     // Camera permissions are still loading.
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet.
//     return (
//       <View style={styles.container}>
//         <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission}>
//           <Text>grant permission</Text>
//         </Button>
//       </View>
//     );
//   }

//   function toggleCameraFacing() {
//     setFacing((current) => (current === 'back' ? 'front' : 'back'));
//   }

//   return (
//     <View style={styles.container}>
//       <View style={{ flex: 1, backgroundColor: '#000' }} className=''>
//         <CameraView style={styles.camera} facing={facing} ref={cameraRef} pictureSize={selectedSize}>
//           <Text>.</Text>
//         </CameraView>
//       </View>
//       <View className='border border-red-500'>
//         <View className='py-10'>
//           <View className='pb-2'>
//             <Text>태그</Text>
//           </View>
//           <Carousel
//             key={`${loop}`}
//             ref={r}
//             loop={loop}
//             style={{
//               width: window.width,
//               height: PAGE_HEIGHT,
//               justifyContent: 'flex-start',
//               alignItems: 'center',
//               paddingLeft: 10,

//             }}
//             width={PAGE_WIDTH}
//             height={PAGE_HEIGHT}
//             data={DATA}
//             renderItem={({ item, animationValue }) => {
//               return (
//                 <Item
//                   animationValue={animationValue}
//                   label={item}
//                   onPress={() =>
//                     r.current?.scrollTo({
//                       count: animationValue.value,
//                       animated: true,
//                     })
//                   }
//                 />
//               );
//             }}
//             autoPlay={AutoPLay.status}
//           />
//         </View>
//       </View>
//       <View className='h-24'>
//         <Button
//           onPress={async () => {
//             const photo = await cameraRef.current?.takePictureAsync();
//             alert(`photo captured with dimensions: ${photo!.width} x ${photo!.height}`);
//             console.log(JSON.stringify(photo));
//           }}>
//           <Text>사진 찍기</Text>
//         </Button>
//         <View style={{ height: 1, backgroundColor: '#eee', marginVertical: 20 }} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });
