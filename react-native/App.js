import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';

import Tabs from './navigation/tabs';
import PlantProvider from './store/PlantProvider';

const getFonts = () => {
  return Font.loadAsync({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });
};

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
