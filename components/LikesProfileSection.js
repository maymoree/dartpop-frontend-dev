import React from 'react';
import {
  StyleSheet, View, Image, TouchableOpacity,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { fonts } from '../styles/GlobalStyles';

const shirtJPG = require('../assets/shirt.webp');
const greenFit = require('../assets/placeholder.jpg');
const greenDress = require('../assets/yHat.avif');
const pong = require('../assets/pong.avif');
const jeanJacket = require('../assets/jeanJacket.avif');
const Bluetshirt = require('../assets/Bluetshirt.avif');
const e = require('../assets/e.avif');
const necklace = require('../assets/necklace.avif');
const boots = require('../assets/boots.avif');

function LikesProfileSection({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageGrid}>
        <TouchableOpacity
          style={styles.imageGrid1}
          onPress={() => navigation.navigate('Item Screen')}
        >
          <Image source={shirtJPG} style={styles.imageGrid1} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageGrid1}>
          <Image source={greenFit} style={styles.imageGrid1} />
        </TouchableOpacity>

        <Image source={greenDress} style={styles.imageGrid1} />
        <Image source={pong} style={styles.imageGrid1} />
        <Image source={jeanJacket} style={styles.imageGrid1} />
        <Image source={Bluetshirt} style={styles.imageGrid1} />
        <Image source={e} style={styles.imageGrid1} />
        <Image source={boots} style={styles.imageGrid1} />
        <Image source={necklace} style={styles.imageGrid1} />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 12,

  },
  text: {
    fontSize: fonts.largeText,
    textAlign: 'center',
  },
  imageGrid: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    gap: 2.5,
    flexWrap: 'wrap',
  },

  imageGrid1: {
    width: 110,
    height: 110,
  },
});

export default LikesProfileSection;
