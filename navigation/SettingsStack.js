/* eslint-disable global-require */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import SettingsScreen from '../screens/SettingsScreen';
// import DeleteAccount from '../components/DeleteAccount';
import EditProfile from '../components/Edit Profile';

const Stack = createStackNavigator();

// Stack navigator from the peer's home screen, to view their goals and availability
function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
    >
      <Stack.Screen
        name="SettingsScreen"
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              style={{ }}
              onPress={() => navigation.navigate('Settings')}
            >
              <Text>
                Edit Profile
              </Text>
            </TouchableOpacity>
          ),
        })}
        component={SettingsStack}
      />

      <Stack.Screen name="Settings" component={EditProfile} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default SettingsStack;
