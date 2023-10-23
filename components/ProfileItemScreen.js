/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  StyleSheet, View, Text, Image, ScrollView, Button, Alert,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { fonts, colors } from '../styles/GlobalStyles';
import HeartButton from '../screens/HomeComponents/HeartButton';

const PlaceholderProfile = require('../assets/profile.jpeg');
const PlaceholderItem = require('../assets/shirt.webp');
const emptyStar = require('../assets/star.png');
const halfStar = require('../assets/halfstar.png'); // not working right now
const fullStar = require('../assets/star-1.png');

// should it be a button that leads to home page with filter selected???
const tags = [
  // really = item.tag list
  { title: 'tops' },
  { title: 'M' },
];

// const ratings = [

// ];

function ProfileItemScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator>
        <View style={styles.topbarContainer}>
          <View style={styles.profileContainer}>
            <Image style={styles.profile} source={PlaceholderProfile} />
            <View style={styles.usernameContainer}>
              <View style={styles.starContainer}>
                <Image style={styles.star} source={fullStar} />
                <Image style={styles.star} source={fullStar} />
                <Image style={styles.star} source={fullStar} />
                <Image style={styles.star} source={halfStar} />
                <Image style={styles.star} source={emptyStar} />
              </View>
              <Text style={styles.boldText}>username123</Text>
            </View>
          </View>
          <View style={styles.offerBox}>
            <Text style={styles.text}>3 offers made</Text>
          </View>
        </View>

        <Image style={styles.image} source={PlaceholderItem} />

        <View style={styles.iconContainer}>
          <HeartButton />
          <Text style={[styles.text, { paddingLeft: 7 }]}>10 likes</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.boldText, { lineHeight: 30 }]}>BRAND NEW red t-shirt!</Text>
          <Text style={[styles.text, { lineHeight: 25 }]}>
            how well it fits, why they want to sell it, do they accept offers? how it can by adjusted
          </Text>
          <View style={styles.tagContainer}>
            {tags.map((tag) => {
              return (
                <View style={styles.tag}>
                  <Button
                    title={tag.title}
                    onPress={() => Alert.alert('filter selected')} // actually displays the list according to id on homepage???
                    color="black"
                  />
                </View>
              );
            })}
          </View>
          <View style={[styles.wholedetailContainer, { lineHeight: 25 }]}>
            <View style={styles.detailsContainer}>
              <Text style={styles.text}>Price </Text>
              {/* input from an item */}
              <Text style={styles.boldText}>$15</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.text}>Condition </Text>
              {/* input from an item */}
              <Text style={styles.boldText}>New</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.text}>Size </Text>
              {/* input from an item */}
              <Text style={styles.boldText}>M</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="chat with seller"
              onPress={() => Alert.alert('Chat With Seller')}
              color="black"
            />
          </View>
          <View style={styles.button}>
            <Button
              title="buy"
              onPress={() => Alert.alert('buy the item')}
              color="black"
            />
          </View>
          <View style={styles.button}>
            <Button
              title="counter offer"
              onPress={() => Alert.alert('Make Counter Offer')}
              color="black"
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    backgroundColor: colors.backgroundWhite,
  },
  topbarContainer: {
    flex: 1,
    width: null,
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
    backgroundColor: colors.lightGreen, // as default?
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
    height: 35,
    width: 95,
    justifyContent: 'center',
    alignContent: 'center',
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
  },
  textContainer: {
    paddingRight: 11.5,
    paddingLeft: 11.5,
    paddingBottom: 10,
    flex: 1,
    width: null,
    flexDirection: 'column',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 15,
  },
  button: {
    width: 110,
    height: 60,
    backgroundColor: colors.lightGreen,
    borderRadius: 7,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default ProfileItemScreen;
