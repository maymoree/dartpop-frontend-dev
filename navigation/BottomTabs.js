/* eslint-disable global-require */
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import SellScreen from '../screens/SellScreen';
import ProfileStack from './ProfileStack';
import ChatStack from './ChatStack';

const Tab = createBottomTabNavigator();

const tabBarIcon = (route, focused, color, size) => {
  let iconSource;
  if (route.name === 'Home') {
    iconSource = focused
      ? require('../assets/home-selected-button.png')
      : require('../assets/home-button.png');
  } else if (route.name === 'Sell') {
    iconSource = focused
      ? require('../assets/sell-selected-button.png')
      : require('../assets/sell-button.png');
  } else if (route.name === 'Chat') {
    iconSource = focused
      ? require('../assets/chat-selected-button.png')
      : require('../assets/chat-button.png');
  } else if (route.name === 'Profile') {
    iconSource = focused
      ? require('../assets/profile-selected-button.png')
      : require('../assets/profile-button.png');
  }
  // console.log(iconSource);
  return <Image style={styles.icon} source={iconSource} />;
};

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#5A5A5A',
        tabBarLabelStyle: { fontSize: 10, marginTop: 20 },
        tabBarStyle: { backgroundColor: '#E6E6FA', borderRadius: 18, paddingTop: 10 },
        tabBarIcon: ({ focused, color, size }) => tabBarIcon(route, focused, color, size),
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Sell" component={SellScreen} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Profile" component={ProfileStack}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginTop: 15,
    width: 28,
    height: 28,
  },
});

export default BottomTabs;
