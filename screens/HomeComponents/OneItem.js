import React, { useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import {
  StyleSheet, View, Text, Image,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { fonts } from '../../styles/GlobalStyles';
import HeartButton from './HeartButton';

// const PlaceholderItem = require('../../assets/shirt.webp');

function OneItem({ price, size, filename }) {
  // get image from firebase
  const [imageUrl, setImageUrl] = useState(undefined);
  // Create a reference with an initial file path and name
  const storage = getStorage();
  // Create a reference from a Google Cloud Storage URI
  const gsReference = ref(storage, `gs://dartpop-firebase.appspot.com/${filename}`);
  getDownloadURL(gsReference)
    .then((url) => {
      setImageUrl(url);
    });
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.image} source={{ uri: imageUrl }} />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.heartContainer}>
          <Text style={styles.blackText}>{size}</Text>
          <HeartButton />
        </View>
        <Text style={styles.boldText}>
          $
          {price}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
  },
  textContainer: {
    position: 'absolute',
    width: 160,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 5,
    rowGap: 10,
    top: 135,
  },
  heartContainer: {
    paddingLeft: 5,
    width: 145,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldText: {
    fontSize: fonts.smallText,
    fontWeight: 600,
  },
  text: {
    fontSize: fonts.smallText,
    fontWeight: 300,
  },
  blackText: {
    color: 'black',
    fontSize: fonts.smallText,
    fontWeight: 600,
  },
  image: {
    height: 160,
    width: 160,
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default OneItem;
