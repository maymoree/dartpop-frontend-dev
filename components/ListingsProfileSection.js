import React from 'react';
import {
  StyleSheet, View, Image,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { fonts } from '../styles/GlobalStyles';

const hatJpg = require('../assets/hatPls.avif');
const dress = require('../assets/dress.avif');
const pants = require('../assets/pants.avif');
const shoes = require('../assets/converse.avif');
const longSleeve = require('../assets/longSleeve.avif');
const toteBag = require('../assets/toteBaf.avif');
const shorts = require('../assets/shorts.avif');
const shawl = require('../assets/shawl.avif');
const orangeShirt = require('../assets/orange.avif');

function ListingsProfileSection() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageGrid}>
        <Image source={hatJpg} style={styles.imageGrid1} />
        <Image source={dress} style={styles.imageGrid1} />
        <Image source={pants} style={styles.imageGrid1} />
        <Image source={longSleeve} style={styles.imageGrid1} />
        <Image source={shoes} style={styles.imageGrid1} />
        <Image source={orangeShirt} style={styles.imageGrid1} />
        <Image source={shorts} style={styles.imageGrid1} />
        <Image source={toteBag} style={styles.imageGrid1} />
        <Image source={shawl} style={styles.imageGrid1} />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 8,

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

export default ListingsProfileSection;
