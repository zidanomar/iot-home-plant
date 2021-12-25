import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS, FONTS, icons, SIZES } from './constants';
import Tabs from './navigation/tabs';
import PlantProvider from './store/PlantProvider';

const getFonts = () => {
  return Font.loadAsync({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });
};

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title='Go to Details'
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

// function DetailsScreen({ navigation }) {
//   return (
//     <View
//       style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}
//     >
//       <Text>Details Screen</Text>
//       <Button
//         title='Go to Details... again'
//         onPress={() => navigation.push('Details')}
//       />
//       <Button title='Go to Home' onPress={() => navigation.navigate('Home')} />
//       <Button title='Go back' onPress={() => navigation.goBack()} />
//       <Button
//         title='Go back to first screen in stack'
//         onPress={() => navigation.popToTop()}
//       />
//     </View>
//   );
// }

// const Stack = createNativeStackNavigator();

export default function App() {
  const [fontIsLoaded, setFontIsLoaded] = useState(false);

  if (fontIsLoaded) {
    return (
      <PlantProvider>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </PlantProvider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontIsLoaded(true)}
        onError={(e) => console.warn(e)}
      />
    );
  }
}
