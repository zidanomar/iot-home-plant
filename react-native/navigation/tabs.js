import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { COLORS, icons } from '../constants';

import { Home, ControlScreen } from '../screens';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, icon }) => {
  return (
    <Image
      source={icon}
      resizeMode='contain'
      style={{
        width: 40,
        height: 40,
        tintColor: focused ? COLORS.primary : COLORS.gray,
      }}
    />
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.primary : COLORS.gray;

          switch (route.name) {
            case 'Home':
              return (
                <Image
                  source={icons.heart}
                  resizeMode='contain'
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
            case 'Control':
              return (
                <Image
                  source={icons.flash}
                  resizeMode='contain'
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false, tabBarShowLabel: false }}
        name='Home'
        component={Home}
      />
      <Tab.Screen
        options={{ headerShown: false, tabBarShowLabel: false }}
        name='Control'
        component={ControlScreen}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
