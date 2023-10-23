/* eslint-disable global-require */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { TouchableOpacity, Image } from 'react-native';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfile from '../components/EditProfile';
import ProfileItemScreen from '../components/ProfileItemScreen';

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

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
    >
      <Stack.Screen
        name="ProfileScreen"
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              style={{ }}
              onPress={() => navigation.navigate('Edit Profile')}
            >
              <Image
                source={require('../assets/settings_icon.png')}
                style={{ height: 30, width: 30, margin: 10 }}
              />
            </TouchableOpacity>
          ),
          headerTintColor: '#FFFFFF',
          headerShown: true,
          headerTitle: LogoTitle,
        })}
        component={ProfileScreen}
      />

      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={({ navigation }) => ({ headerShown: true, headerTitle: LogoTitle, headerLeftLabelVisible: false })}

      />

      <Stack.Screen
        name="Item Screen"
        component={ProfileItemScreen}
        options={({ navigation }) => ({ headerShown: true, headerTitle: LogoTitle, headerLeftLabelVisible: false })}
      />

    </Stack.Navigator>
  );
}

export default ProfileStack;
