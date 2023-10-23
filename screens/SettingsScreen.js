import React from 'react';
import {
  Text, StyleSheet, View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
// eslint-disable-next-line import/no-cycle
import { fonts } from '../styles/GlobalStyles';

function SettingsScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.text}>Welcome to the Settings Screen</Text>

        {/* <Button color="#453E5B" style={styles.button} title="Delete Account" type="button" onPress={() => setEditor('delete')} /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'flex-start',
  },
  button: {
    flex: 1,
    fontSize: fonts,
    paddingTop: 40,
    alignItems: 'flex-start',
    backgroundColor: 'yellow',
    width: 100,
  },
});

export default SettingsScreen;
