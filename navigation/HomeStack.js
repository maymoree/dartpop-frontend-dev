import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ItemScreen from '../screens/HomeComponents/ItemScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const image = require('../assets/dartPop.jpg');

function LogoTitle() {
  return (
    <Image
      style={{ width: 100, height: 35 }}
      source={image}
    />
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
    >
      <Stack.Screen name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: true, headerTitle: LogoTitle }}
      />
      <Stack.Screen name="Item"
        component={ItemScreen}
        options={{ headerBackTitleVisible: false, headerShown: true, headerTitle: LogoTitle }}
      />
      <Stack.Screen name="Chat"
        component={ChatScreen}
      />
      <Stack.Screen name="Profile"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
