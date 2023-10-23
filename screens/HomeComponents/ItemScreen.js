import React, { useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import {
  StyleSheet, View, Text, Image, ScrollView, Pressable,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { fonts, colors } from '../../styles/GlobalStyles';
import HeartButton from './HeartButton';

const PlaceholderProfile = require('../../assets/profile.jpeg');
// const PlaceholderItem = require('../../assets/shirt.webp');
const emptyStar = require('../../assets/star.png');
const halfStar = require('../../assets/halfstar.png'); // not working right now
const fullStar = require('../../assets/star-1.png');

function ItemScreen({ route, navigation }) {
  const { data } = route.params;

  // get image from firebase
  const [imageUrl, setImageUrl] = useState(undefined);
  // Create a reference with an initial file path and name
  const storage = getStorage();
  // Create a reference from a Google Cloud Storage URI
  const gsReference = ref(storage, `gs://dartpop-firebase.appspot.com/${data.filename}`);
  getDownloadURL(gsReference)
    .then((url) => {
      setImageUrl(url);
    });

  return (
    <SafeAreaView contentContainerStyle={styles.container}>
      <ScrollView showsVerticalScrollIndicator
        style={{ backgroundColor: colors.backgroundWhite }}
      >
        <View style={styles.topbarContainer}>
          <View style={styles.profileContainer}>
            <Pressable onPress={() => navigation.navigate('Profile')}>
              <Image style={styles.profile} source={PlaceholderProfile} />
            </Pressable>
            <View style={styles.usernameContainer}>
              <View style={styles.starContainer}>
                <Image style={styles.star} source={fullStar} />
                <Image style={styles.star} source={fullStar} />
                <Image style={styles.star} source={fullStar} />
                <Image style={styles.star} source={halfStar} />
                <Image style={styles.star} source={emptyStar} />
              </View>
              <Text style={styles.boldText}>{data.username}</Text>
            </View>
          </View>
          <View style={styles.offerBox}>
            <Text style={styles.text}>
              {data.offers}
              {' '}
              offers made
            </Text>
          </View>
        </View>

        <View style={{ justifyContent: 'center', width: '100%' }}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
        </View>

        <View style={styles.iconContainer}>
          <HeartButton />
          <Text style={[styles.text, { paddingLeft: 7 }]}>
            {data.likes}
            {' '}
            likes
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.boldText, { lineHeight: 30 }]}>{data.title}</Text>
          <Text style={[styles.text, { lineHeight: 25 }]}>{data.description}</Text>
          <View style={styles.tagContainer}>
            {data.tags.map((tag) => {
              return (
                <View style={styles.tag} key={tag}>
                  <Text style={{ fontSize: 17 }}>{tag}</Text>
                </View>
              );
            })}
          </View>
          <View style={[styles.wholedetailContainer, { lineHeight: 25 }]}>
            <View style={styles.detailsContainer}>
              <Text style={styles.text}>Price </Text>
              <Text style={styles.boldText}>
                $
                {data.price}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.text}>Condition </Text>
              <Text style={styles.boldText}>{data.condition}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.text}>Size </Text>
              <Text style={styles.boldText}>{data.size}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable onPress={() => navigation.navigate('Chat')}>
            <View style={styles.button}>
              <Text style={styles.text}>chat with seller</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Chat')}>
            <View style={styles.button}>
              <Text style={styles.text}>buy</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Chat')}>
            <View style={styles.button}>
              <Text style={styles.text}>counter offer</Text>
            </View>
          </Pressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    backgroundColor: 'pink',
  },
  topbarContainer: {
    minWidth: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 11.5,
    paddingRight: 11.5,
  },
  boldText: {
    fontSize: fonts.smallText,
    fontWeight: 600,
  },
  text: {
    fontSize: fonts.smallText,
    fontWeight: 300,
  },
  image: {
    flex: 1,
    width: null,
    height: 350,
  },
  profile: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  star: {
    height: 17,
    width: 17,
  },
  offerBox: {
    width: 140,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
  },
  heartButton: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: colors.lightGreen,
  },
  tag: {
    flexDirection: 'row',
    height: 35,
    width: 95,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
    borderRadius: '7',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 40,
    paddingLeft: 11.5,
    backgroundColor: colors.backgroundWhite,
  },
  textContainer: {
    width: '100%',
    paddingRight: 11.5,
    paddingLeft: 11.5,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.backgroundWhite,
  },
  usernameContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: 8,
  },
  profileContainer: {
    width: 160,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tagContainer: {
    minWidth: '100%',
    alignContent: 'space-between',
    flexDirection: 'row',
    rowGap: 10,
    columnGap: 10,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-around',
  },
  detailsContainer: { // contains prompt and input
    flexDirection: 'row',
  },
  wholedetailContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    minWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: colors.backgroundWhite,
  },
  button: {
    width: 110,
    height: 60,
    backgroundColor: colors.lightGreen,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ItemScreen;
