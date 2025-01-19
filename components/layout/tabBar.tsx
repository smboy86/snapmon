import { View, StyleSheet, Platform } from 'react-native';
import TabBarButton from './tabBarButton';
import { BottomTabBarProps } from 'expo-router/node_modules/@react-navigation/bottom-tabs/src/types';

type Props = {} & BottomTabBarProps;

const TabBar = ({ state, descriptors, navigation }: Props) => {
  const primaryColor = '#1B2679';
  const greyColor = '#111111';

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        if (route.name === 'index') return null;

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        // 탭 없애기?
        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          // <TabBarButton
          //   key={route.name}
          //   onPress={onPress}
          //   isFocused={isFocused}
          //   routeName={route.name}
          //   color={isFocused ? primaryColor : greyColor}
          //   label={label as string}
          // />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    // left: 122.5,
    alignSelf: 'center',
    bottom: 16 + (Platform.OS === 'ios' ? 34 : 0), // 34 : 아이폰 하단
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    width: 255, // TODO - 반응형 체크
  },
});

export default TabBar;